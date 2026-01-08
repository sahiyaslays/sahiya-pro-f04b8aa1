export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  specialties?: string[];
}

export const stylists: Stylist[] = [
  {
    id: 'sahiya',
    name: 'Sahiya',
    role: 'Master Stylist & Owner',
    bio: 'With over 10 years of experience in hair and beauty, Sahiya specializes in transformative styling and color techniques.',
    image: '/lovable-uploads/sahiya-new-2.jpeg',
    specialties: ['Hair Colouring', 'Styling', 'Extensions'],
  },
  {
    id: 'shelese',
    name: 'Shelese',
    role: 'Nail Technician',
    bio: 'Expert in nail art and extensions, Shelese brings creativity and precision to every manicure and pedicure.',
    image: '/lovable-uploads/shelese-nail-tech.jpeg',
    specialties: ['Nail Extensions', 'Nail Art', 'Manicures', 'Pedicures'],
  },
  {
    id: 'hiba',
    name: 'Hiba',
    role: 'Braids Specialist',
    bio: 'Specialized in all types of braids and protective styles, Hiba creates stunning looks that protect and enhance your natural hair.',
    image: '/lovable-uploads/hiba-new.jpeg',
    specialties: ['Braids', 'Protective Styles', 'Natural Hair'],
  },
  {
    id: 'sarah',
    name: 'Sarah',
    role: 'Senior Stylist - Loc Specialist',
    bio: 'Experienced in loc creation and maintenance, Sarah helps clients achieve beautiful, healthy locs at every stage.',
    image: '/lovable-uploads/sarah-loc-specialist.jpeg',
    specialties: ['Locs', 'Loc Maintenance', 'Natural Hair'],
  },
  {
    id: 'no-preference',
    name: 'No Preference',
    role: 'Any Available Stylist',
    bio: 'Let us match you with the perfect stylist based on your service and availability.',
    specialties: [],
  },
];
