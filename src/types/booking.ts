export interface Service {
  id: string;
  name: string;
  category: string;
  duration: number; // in minutes
  price: string;
  description?: string;
  requiresFinish?: boolean;
}

export interface SelectedService extends Service {
  quantity: number;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface BookingData {
  services: SelectedService[];
  stylist?: Stylist;
  date?: string;
  time?: string;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    hearAboutUs?: string;
    notes?: string;
    agreesToPolicy: boolean;
    wantsReminders?: boolean;
  };
  paymentMethod?: 'stripe-full' | 'stripe-deposit' | 'salon';
}

export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6;