import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';
import type { Appointment, AppointmentInsert, Database, ServiceType, TimeSlot } from '@/lib/supabase/types';

// Validation helpers
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string) => /^[\d\s\-+()]{10,}$/.test(phone);
const isValidService = (service: string): service is ServiceType =>
  ['ortho', 'sports', 'neuro', 'manual', 'senior', 'surgery', 'online', 'others'].includes(service);

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

    // Insert the appointment
    const appointmentData: AppointmentInsert = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      service: service as ServiceType,
      appointment_date: date,
      time_slot: timeSlot as TimeSlot,
      message: message?.trim() || null,
      status: 'pending',
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: appointment, error: insertError } = await (supabase.from('appointments') as any)
      .insert(appointmentData)
      .select()
      .single();

    const typedAppointment = appointment as Appointment | null;

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
        { success: false, errors: [insertError.message || 'Failed to book appointment. Please try again.'] },
        { status: 500 }
      );

    }

    return NextResponse.json({
      success: true,
      message: 'Appointment booked successfully!',
      data: {
        id: typedAppointment?.id,
        name: typedAppointment?.name,
        email: typedAppointment?.email,
        service: typedAppointment?.service,
        date: typedAppointment?.appointment_date,
        timeSlot: typedAppointment?.time_slot,
        status: typedAppointment?.status,
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

// GET endpoint to check available slots (Hard-coded for now)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const service = searchParams.get('service');

    if (!date || !service) {
      return NextResponse.json(
        { success: false, errors: ['Date and service are required'] },
        { status: 400 }
      );
    }

    // Hard-coded all slots as available
    const allSlots: TimeSlot[] = ['morning', 'afternoon', 'evening'];

    const availability = allSlots.map(slot => ({
      slot,
      available: true, // Always available
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
