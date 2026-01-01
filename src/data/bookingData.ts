import { Service, Stylist } from '@/types/booking';

export const services: Service[] = [
  // Hair Cut & Finish
  {
    id: 'ladies-cut-blow',
    name: 'Ladies Cut & Blow Dry',
    category: 'Hair Cut & Finish',
    duration: 75,
    price: 'from £55',
    description: 'Professional cut and styling'
  },
  {
    id: 'gents-cut-blow',
    name: 'Gents Cut & Blow Dry',
    category: 'Hair Cut & Finish',
    duration: 45,
    price: 'from £35',
    description: 'Professional cut and styling'
  },
  {
    id: 'shampoo-quick-dry',
    name: 'Shampoo & Quick Dry',
    category: 'Hair Cut & Finish',
    duration: 25,
    price: 'from £20',
    description: 'Wash and quick dry'
  },
  {
    id: 'shampoo-blow-dry',
    name: 'Shampoo & Blow Dry',
    category: 'Hair Cut & Finish',
    duration: 45,
    price: 'from £30',
    description: 'Wash and full blow dry'
  },
  {
    id: 'hair-set',
    name: 'Hair Set (Upstyle)',
    category: 'Hair Cut & Finish',
    duration: 60,
    price: 'from £45',
    description: 'Elegant upstyle'
  },
  {
    id: 'children-cut-under10',
    name: "Children's Cut (Under 10)",
    category: 'Hair Cut & Finish',
    duration: 30,
    price: 'from £20',
    description: 'Cut for children under 10'
  },
  {
    id: 'children-cut-11-15',
    name: "Children's Cut (Age 11-15)",
    category: 'Hair Cut & Finish',
    duration: 40,
    price: 'from £25',
    description: 'Cut for children 11-15'
  },

  // Colouring
  {
    id: 'root-touch-up',
    name: 'Root Touch Up',
    category: 'Colouring',
    duration: 90,
    price: 'from £45',
    description: 'Touch up roots',
    requiresFinish: true
  },
  {
    id: 'full-head-colour',
    name: 'Full Head Colour',
    category: 'Colouring',
    duration: 120,
    price: 'from £80',
    description: 'Complete colour change',
    requiresFinish: true
  },
  {
    id: 't-section-highlight',
    name: 'T-Section Highlight',
    category: 'Colouring',
    duration: 105,
    price: 'from £65',
    description: 'Highlights on top section',
    requiresFinish: true
  },
  {
    id: 'half-highlight',
    name: 'Half Highlight',
    category: 'Colouring',
    duration: 120,
    price: 'from £85',
    description: 'Half head highlights',
    requiresFinish: true
  },
  {
    id: 'full-highlight',
    name: 'Full Highlight',
    category: 'Colouring',
    duration: 150,
    price: 'from £120',
    description: 'Full head highlights',
    requiresFinish: true
  },
  {
    id: 'full-bleach',
    name: 'Full Bleach',
    category: 'Colouring',
    duration: 180,
    price: 'from £140',
    description: 'Complete bleaching',
    requiresFinish: true
  },

  // Add-ons
  {
    id: 'toner',
    name: 'Toner',
    category: 'Add-ons',
    duration: 30,
    price: 'from £25',
    description: 'Hair toning treatment'
  },

  // Hair & Scalp Treatment
  {
    id: 'scalp-treatment',
    name: 'Scalp Treatment',
    category: 'Hair & Scalp Treatment',
    duration: 45,
    price: 'from £30',
    description: 'Deep scalp care'
  },
  {
    id: 'head-spa',
    name: 'Head Spa',
    category: 'Hair & Scalp Treatment',
    duration: 60,
    price: 'from £45',
    description: 'Relaxing head treatment'
  },
  {
    id: 'quick-treatment',
    name: 'Quick Treatment',
    category: 'Hair & Scalp Treatment',
    duration: 20,
    price: 'from £20',
    description: 'Quick conditioning'
  },

  // Beauty
  {
    id: 'makeup',
    name: 'Make Up',
    category: 'Beauty',
    duration: 60,
    price: 'from £60',
    description: 'Professional makeup application'
  },
  {
    id: 'eyebrow-shaping',
    name: 'Eyebrow Shaping',
    category: 'Beauty',
    duration: 20,
    price: 'from £12',
    description: 'Professional eyebrow shaping'
  },
  {
    id: 'eyebrow-colouring',
    name: 'Eyebrow Colouring',
    category: 'Beauty',
    duration: 30,
    price: 'from £15',
    description: 'Eyebrow tinting'
  },

  // Nails
  {
    id: 'gel-manicure',
    name: 'Gel Manicure',
    category: 'Nails',
    duration: 60,
    price: 'from £35',
    description: 'Long-lasting gel polish'
  },
  {
    id: 'classic-manicure',
    name: 'Classic Manicure',
    category: 'Nails',
    duration: 45,
    price: 'from £25',
    description: 'Traditional manicure'
  },
  {
    id: 'pedicure',
    name: 'Pedicure',
    category: 'Nails',
    duration: 60,
    price: 'from £40',
    description: 'Complete foot care'
  },
  {
    id: 'gel-pedicure',
    name: 'Gel Pedicure',
    category: 'Nails',
    duration: 75,
    price: 'from £50',
    description: 'Long-lasting gel polish for feet'
  },
  {
    id: 'nail-art',
    name: 'Nail Art & Design',
    category: 'Nails',
    duration: 90,
    price: 'from £45',
    description: 'Creative nail art'
  },

  // Other Services
  {
    id: 'fringe-cut',
    name: 'Fringe Cut',
    category: 'Other Services',
    duration: 15,
    price: 'from £10',
    description: 'Fringe trim'
  },
  {
    id: 'wedding-services',
    name: 'Wedding Services',
    category: 'Other Services',
    duration: 180,
    price: 'by consultation',
    description: 'Complete bridal package'
  }
];

export const stylists: Stylist[] = [
  {
    id: 'sahiya',
    name: 'Sahiya',
    role: 'Master Stylist & Owner',
    bio: 'With over 10 years of experience in hair and beauty, Sahiya specializes in transformative styling and color techniques.'
  },
  {
    id: 'shelese',
    name: 'Shelese',
    role: 'Nail Technician',
    bio: 'Expert in nail art and extensions, Shelese brings creativity and precision to every manicure and pedicure.'
  },
  {
    id: 'hiba',
    name: 'Hiba',
    role: 'Braids Specialist',
    bio: 'Specialized in all types of braids and protective styles, Hiba creates stunning looks that protect and enhance your natural hair.'
  },
  {
    id: 'sarah',
    name: 'Sarah',
    role: 'Senior Stylist - Loc Specialist',
    bio: 'Experienced in loc creation and maintenance, Sarah helps clients achieve beautiful, healthy locs at every stage.'
  }
];

export const serviceCategories = [
  'Hair Cut & Finish',
  'Colouring',
  'Hair & Scalp Treatment',
  'Beauty',
  'Nails',
  'Other Services'
];

export const hearAboutUsOptions = [
  'Google Search',
  'Social Media',
  'Friend/Family Recommendation',
  'Passing By',
  'Online Reviews',
  'Other'
];
