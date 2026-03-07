import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';
import type { ServiceType, TimeSlot } from '@/lib/supabase/types';

// Validation helpers
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string) => /^[\d\s\-+()]{10,}$/.test(phone);
const isValidService = (service: string): service is ServiceType => 
  ['ortho', 'sports', 'neuro', 'manual', 'senior', 'surgery'].includes(service);
const isValidTimeSlot = (slot: string): slot is TimeSlot => 
  ['morning', 'afternoon', 'evening'].includes(slot);

interface AppointmentRequest {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date: string;
  timeSlot: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AppointmentRequest = await request.json();
    const { name, email, phone, service, date, timeSlot, message } = body;

    // Validation
    const errors: string[] = [];

    if (!name || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    if (!email || !isValidEmail(email)) {
      errors.push('Please provide a valid email address');
    }

    if (phone && !isValidPhone(phone)) {
      errors.push('Please provide a valid phone number');
    }

    if (!service || !isValidService(service)) {
      errors.push('Please select a valid service');
    }

    if (!date) {
      errors.push('Please select an appointment date');
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.push('Appointment date cannot be in the past');
      }
      
      // Check if date is within next 90 days
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 90);
      if (selectedDate > maxDate) {
        errors.push('Appointment date must be within the next 90 days');
      }
    }

    if (!timeSlot || !isValidTimeSlot(timeSlot)) {
      errors.push('Please select a valid time slot');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Check for existing appointment (double-booking prevention)
    const { data: existingAppointment, error: checkError } = await supabase
      .from('appointments')
      .select('id')
      .eq('appointment_date', date)
      .eq('time_slot', timeSlot as TimeSlot)
      .eq('service', service as ServiceType)
      .neq('status', 'cancelled')
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is what we want
      console.error('Check error:', checkError);
      return NextResponse.json(
        { success: false, errors: ['Failed to check availability. Please try again.'] },
        { status: 500 }
      );
    }

    if (existingAppointment) {
      return NextResponse.json(
        { 
          success: false, 
          errors: ['This time slot is already booked. Please choose a different time or date.'] 
        },
        { status: 409 }
      );
    }

    // Insert the appointment
    const { data: appointment, error: insertError } = await supabase
      .from('appointments')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        service: service as ServiceType,
        appointment_date: date,
        time_slot: timeSlot as TimeSlot,
        message: message?.trim() || null,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      
      // Handle unique constraint violation (double booking)
      if (insertError.code === '23505') {
        return NextResponse.json(
          { 
            success: false, 
            errors: ['This time slot was just booked. Please choose a different time.'] 
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { success: false, errors: ['Failed to book appointment. Please try again.'] },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment booked successfully!',
      data: {
        id: appointment.id,
        name: appointment.name,
        email: appointment.email,
        service: appointment.service,
        date: appointment.appointment_date,
        timeSlot: appointment.time_slot,
        status: appointment.status,
      },
    });

  } catch (error) {
    console.error('Appointment booking error:', error);
    return NextResponse.json(
      { success: false, errors: ['An unexpected error occurred. Please try again.'] },
      { status: 500 }
    );
  }
}

// GET endpoint to check available slots
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const service = searchParams.get('service');

    if (!date || !service || !isValidService(service)) {
      return NextResponse.json(
        { success: false, errors: ['Date and service are required'] },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Get booked slots for the date and service
    const { data: bookedSlots, error } = await supabase
      .from('appointments')
      .select('time_slot')
      .eq('appointment_date', date)
      .eq('service', service as ServiceType)
      .neq('status', 'cancelled');

    if (error) {
      console.error('Error fetching slots:', error);
      return NextResponse.json(
        { success: false, errors: ['Failed to fetch available slots'] },
        { status: 500 }
      );
    }

    const bookedTimeSlots = bookedSlots?.map(s => s.time_slot) || [];
    const allSlots: TimeSlot[] = ['morning', 'afternoon', 'evening'];
    
    const availability = allSlots.map(slot => ({
      slot,
      available: !bookedTimeSlots.includes(slot),
      label: slot === 'morning' ? 'Morning (9AM-12PM)' 
           : slot === 'afternoon' ? 'Afternoon (12PM-5PM)' 
           : 'Evening (5PM-10PM)',
    }));

    return NextResponse.json({
      success: true,
      data: {
        date,
        service,
        slots: availability,
      },
    });

  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { success: false, errors: ['An unexpected error occurred'] },
      { status: 500 }
    );
  }
}
