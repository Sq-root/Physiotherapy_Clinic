import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/client';
import { Resend } from 'resend';
import type { Appointment, AppointmentInsert, ServiceType, TimeSlot } from '@/lib/supabase/types';

const NOTIFICATION_EMAIL = "prabodhamtech369@gmail.com";

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

    // @ts-expect-error - Supabase type inference issue with handwritten Database interface
    const { data: appointment, error: insertError } = await supabase.from('appointments').insert(appointmentData).select().single();

    if (insertError) {
      console.error('Supabase Insert Error:', {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint
      });

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

    const typedAppointment = appointment as Appointment;

    // Send email notification via Resend
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        
        const serviceLabels: Record<string, string> = {
          ortho: 'Orthopedic Physiotherapy',
          sports: 'Sports Injury Rehab',
          neuro: 'Neurological Rehab',
          manual: 'Manual Therapy',
          senior: 'Geriatric Care',
          surgery: 'Post-Surgical Rehab',
          online: 'Online Consultation',
          others: 'Other Services'
        };

        const htmlContent = `
          <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px;">
            <h2 style="color: #1a5653; margin-bottom: 24px; text-align: center;">New Appointment Booking</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; font-weight: bold; width: 140px; color: #666;">Patient Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">${typedAppointment.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; font-weight: bold; color: #666;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">
                    <a href="mailto:${typedAppointment.email}" style="color: #0b9e86; text-decoration: none;">${typedAppointment.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; font-weight: bold; color: #666;">Phone</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">${typedAppointment.phone || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; font-weight: bold; color: #666;">Service</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">
                    <span style="background: #f0fdf4; padding: 4px 10px; border-radius: 99px; text-transform: capitalize; font-size: 14px; border: 1px solid #bbf7d0; color: #166534;">
                      ${serviceLabels[typedAppointment.service] || typedAppointment.service}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; font-weight: bold; color: #666;">Date</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">${typedAppointment.appointment_date}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; font-weight: bold; color: #666;">Time Slot</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; text-transform: capitalize;">${typedAppointment.time_slot}</td>
                </tr>
              </tbody>
            </table>
            
            ${typedAppointment.message ? `
            <div style="margin-top: 24px;">
              <p style="font-weight: bold; color: #666; margin-bottom: 8px;">Message from Patient:</p>
              <div style="background-color: #f9f9f9; padding: 16px; border-radius: 6px; border: 1px solid #eaeaea; white-space: pre-wrap;">${typedAppointment.message}</div>
            </div>
            ` : ''}
            
            <div style="margin-top: 32px; font-size: 12px; color: #999; text-align: center;">
              <p>This is an automated notification for a new appointment booked via your clinic website.</p>
            </div>
          </div>
        `;

        await resend.emails.send({
          from: "Clinic Appointments <onboarding@resend.dev>",
          to: [NOTIFICATION_EMAIL],
          subject: `New Appointment: ${typedAppointment.name} - ${serviceLabels[typedAppointment.service] || typedAppointment.service}`,
          html: htmlContent,
          replyTo: typedAppointment.email,
        });
      }
    } catch (emailError) {
      // We don't want to fail the whole request if email notification fails
      console.error('Failed to send appointment notification email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment booked successfully!',
      data: {
        id: typedAppointment.id,
        name: typedAppointment.name,
        email: typedAppointment.email,
        service: typedAppointment.service,
        date: typedAppointment.appointment_date,
        timeSlot: typedAppointment.time_slot,
        status: typedAppointment.status,
      },
    });

  } catch (error: unknown) {
    const err = error as Error;
    console.error('Detailed Appointment Booking Error:', {
      message: err.message,
      stack: err.stack,
    });
    return NextResponse.json(
      { success: false, errors: [err.message || 'An unexpected error occurred. Please try again.'] },
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

  } catch (_error) {
    console.error('Error checking availability:', _error);
    return NextResponse.json(
      { success: false, errors: ['An unexpected error occurred'] },
      { status: 500 }
    );
  }
}
