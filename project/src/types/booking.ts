export interface BookingDetails {
  id: string;
  serviceTitle: string;
  date: Date;
  time: string;
  duration: number; // in minutes
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface ValidationErrors {
  date?: string;
  time?: string;
  notes?: string;
}