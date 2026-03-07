export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type ServiceType = 'ortho' | 'sports' | 'neuro' | 'manual' | 'senior' | 'surgery';
export type TimeSlot = 'morning' | 'afternoon' | 'evening';

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          service: ServiceType;
          appointment_date: string;
          time_slot: TimeSlot;
          message: string | null;
          status: AppointmentStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          service: ServiceType;
          appointment_date: string;
          time_slot: TimeSlot;
          message?: string | null;
          status?: AppointmentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          service?: ServiceType;
          appointment_date?: string;
          time_slot?: TimeSlot;
          message?: string | null;
          status?: AppointmentStatus;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      appointment_status: AppointmentStatus;
      service_type: ServiceType;
      time_slot: TimeSlot;
    };
  };
}

// Helper types for easier usage
export type Appointment = Database['public']['Tables']['appointments']['Row'];
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];
export type AppointmentUpdate = Database['public']['Tables']['appointments']['Update'];
