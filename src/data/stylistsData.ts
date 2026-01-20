export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export const stylists: Stylist[] = [
  {
    id: 'sahiya',
    name: 'Sahiya',
    role: 'Master Stylist & Owner',
    bio: 'With over 10 years of experience in hair and beauty, Sahiya specializes in transformative styling and color techniques.',
  },
  {
    id: 'maya',
    name: 'Maya',
    role: 'Senior Stylist',
    bio: 'Expert in modern cuts and balayage techniques, Maya brings creativity and precision to every appointment.',
  },
  {
    id: 'aisha',
    name: 'Aisha',
    role: 'Beauty Specialist',
    bio: 'Specialized in facial treatments and skincare, Aisha creates personalized beauty experiences for each client.',
  },
  {
    id: 'no-preference',
    name: 'No Preference',
    role: 'Any Available Stylist',
    bio: 'Let us match you with the perfect stylist based on your service and availability.',
  },
];