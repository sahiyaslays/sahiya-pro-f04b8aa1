export interface ServiceOption {
  label: string;
  duration: number; // in minutes
  price: number; // in pounds
}

export interface Service {
  id: string;
  name: string;
  options: ServiceOption[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  subcategories: ServiceSubcategory[];
}

export interface ServiceSubcategory {
  id: string;
  title: string;
  services: Service[];
}

export const servicesData: ServiceCategory[] = [
  {
    id: 'consultation-patch-test',
    title: 'CONSULTATION/PATCH TEST',
    subcategories: [
      {
        id: 'consultation-services',
        title: 'Consultation Services',
        services: [
          {
            id: 'consultation',
            name: 'Consultation',
            options: [{ label: '15 min', duration: 15, price: 0 }]
          },
          {
            id: 'patch-test',
            name: 'Patch Test',
            options: [{ label: '15 min', duration: 15, price: 0 }]
          },
          {
            id: 'colour-patch-test',
            name: 'Colour Patch Test',
            options: [{ label: '15 min', duration: 15, price: 0 }]
          },
          {
            id: 'hair-extensions-consultation',
            name: 'Hair Extensions Consultation',
            options: [{ label: 'Standard', duration: 15, price: 0 }]
          },
          {
            id: 'colour-correction-consultation',
            name: 'Colour Correction Consultation',
            options: [{ label: 'Standard', duration: 30, price: 0 }]
          },
          {
            id: 'keratin-smoothing-consultation',
            name: 'Keratin Smoothing Consultation',
            options: [{ label: 'Standard', duration: 30, price: 0 }]
          },
          {
            id: 'men-consultation',
            name: 'Men - Consultation',
            options: [{ label: 'Standard', duration: 15, price: 0 }]
          }
        ]
      }
    ]
  },
  {
    id: 'hair',
    title: 'HAIR',
    subcategories: [
      {
        id: 'hair-styling',
        title: 'Styling',
        services: [
          {
            id: 'hair-wash-and-blow-dry',
            name: 'Hair - Wash & Blow-dry',
            options: [
              { label: 'Long Hair', duration: 60, price: 40 },
              { label: 'Medium Hair', duration: 50, price: 35 },
              { label: 'Short Hair', duration: 40, price: 30 }
            ]
          },
          {
            id: 'hair-updo-occasion',
            name: 'Hair - Updo / Occasion',
            options: [
              { label: 'Long Hair', duration: 90, price: 60 },
              { label: 'Medium Hair', duration: 75, price: 52 },
              { label: 'Short Hair', duration: 60, price: 45 }
            ]
          },
          {
            id: 'hair-curl-styling',
            name: 'Hair - Curl Styling',
            options: [
              { label: 'Long Hair', duration: 60, price: 40 },
              { label: 'Medium Hair', duration: 50, price: 35 },
              { label: 'Short Hair', duration: 40, price: 30 }
            ]
          },
          {
            id: 'hair-straightening',
            name: 'Hair - Straightening',
            options: [
              { label: 'Long Hair', duration: 60, price: 40 },
              { label: 'Medium Hair', duration: 50, price: 35 },
              { label: 'Short Hair', duration: 40, price: 30 }
            ]
          },
          {
            id: 'hair-deep-wave-styling',
            name: 'Hair - Deep Wave Styling',
            options: [
              { label: 'Long Hair', duration: 75, price: 50 },
              { label: 'Medium Hair', duration: 60, price: 42 },
              { label: 'Short Hair', duration: 45, price: 35 }
            ]
          },
          {
            id: 'hair-silk-press',
            name: 'Hair - Silk Press',
            options: [
              { label: 'Long Hair', duration: 120, price: 80 },
              { label: 'Medium Hair', duration: 105, price: 70 },
              { label: 'Short Hair', duration: 90, price: 60 }
            ]
          },
          {
            id: 'hair-beach-waves',
            name: 'Hair - Beach Waves',
            options: [
              { label: 'Long Hair', duration: 60, price: 42 },
              { label: 'Medium Hair', duration: 50, price: 36 },
              { label: 'Short Hair', duration: 40, price: 30 }
            ]
          },
          {
            id: 'hair-vintage-waves',
            name: 'Hair - Vintage Waves',
            options: [
              { label: 'Long Hair', duration: 75, price: 48 },
              { label: 'Medium Hair', duration: 60, price: 40 },
              { label: 'Short Hair', duration: 45, price: 35 }
            ]
          },
          {
            id: 'hair-ponytail-styling',
            name: 'Hair - Ponytail Styling',
            options: [
              { label: 'Long Hair', duration: 45, price: 35 },
              { label: 'Medium Hair', duration: 35, price: 30 },
              { label: 'Short Hair', duration: 25, price: 25 }
            ]
          },
          {
            id: 'hair-half-up-half-down',
            name: 'Hair - Half-Up Half-Down',
            options: [
              { label: 'Long Hair', duration: 60, price: 45 },
              { label: 'Medium Hair', duration: 50, price: 38 },
              { label: 'Short Hair', duration: 40, price: 32 }
            ]
          },
          {
            id: 'hair-braided-updo',
            name: 'Hair - Braided Updo',
            options: [
              { label: 'Long Hair', duration: 90, price: 65 },
              { label: 'Medium Hair', duration: 75, price: 55 },
              { label: 'Short Hair', duration: 60, price: 48 }
            ]
          },
          {
            id: 'hair-sleek-bun',
            name: 'Hair - Sleek Bun',
            options: [
              { label: 'Long Hair', duration: 45, price: 38 },
              { label: 'Medium Hair', duration: 35, price: 32 },
              { label: 'Short Hair', duration: 25, price: 28 }
            ]
          }
        ]
      },
      {
        id: 'children-braids-cornrows-twists',
        title: 'Children - Braids, Cornrows & Twists',
        services: [
          {
            id: 'children-afro-braids',
            name: 'Children - Afro Braids',
            options: [
              { label: 'Long Hair', duration: 30, price: 45 },
              { label: 'Medium Hair', duration: 25, price: 35 },
              { label: 'Short Hair', duration: 20, price: 25 }
            ]
          },
          {
            id: 'children-cornrows',
            name: 'Children - Cornrows',
            options: [
              { label: 'Long Hair', duration: 40, price: 45 },
              { label: 'Medium Hair', duration: 35, price: 35 },
              { label: 'Short Hair', duration: 30, price: 25 }
            ]
          },
          {
            id: 'children-twists',
            name: 'Children - Twists',
            options: [
              { label: 'Long Hair', duration: 45, price: 50 },
              { label: 'Medium Hair', duration: 40, price: 40 },
              { label: 'Short Hair', duration: 35, price: 30 }
            ]
          }
        ]
      },
      {
        id: 'children-haircuts-hairdressing',
        title: 'Children - Haircuts & Hairdressing',
        services: [
          {
            id: 'children-dry-haircut',
            name: 'Children - Dry Haircut',
            options: [
              { label: 'Short', duration: 20, price: 12 },
              { label: 'Medium', duration: 25, price: 15 },
              { label: 'Long', duration: 30, price: 18 }
            ]
          },
          {
            id: 'children-wash-cut-blow-dry',
            name: 'Children - Wash, Cut & Blow Dry',
            options: [
              { label: 'Short', duration: 30, price: 20 },
              { label: 'Medium', duration: 35, price: 25 },
              { label: 'Long', duration: 40, price: 30 }
            ]
          }
        ]
      },
      {
        id: 'hair-extras',
        title: 'Hair Extras',
        services: [
          {
            id: 'olaplex-addon',
            name: 'Olaplex Add-on',
            options: [{ label: 'Standard', duration: 15, price: 25 }]
          }
        ]
      },
      {
        id: 'ladies-highlights-balayage',
        title: 'Ladies - Highlights & Balayage',
        services: [
          {
            id: 't-section-highlights',
            name: 'T-Section Highlights',
            options: [
              { label: 'Short', duration: 90, price: 65 },
              { label: 'Medium', duration: 105, price: 75 },
              { label: 'Long', duration: 120, price: 85 }
            ]
          },
          {
            id: 'half-head-highlights',
            name: 'Half Head Highlights',
            options: [
              { label: 'Short', duration: 120, price: 80 },
              { label: 'Medium', duration: 135, price: 90 },
              { label: 'Long', duration: 150, price: 100 }
            ]
          },
          {
            id: 'full-head-highlights',
            name: 'Full Head Highlights',
            options: [
              { label: 'Short', duration: 150, price: 95 },
              { label: 'Medium', duration: 165, price: 110 },
              { label: 'Long', duration: 180, price: 125 }
            ]
          },
          {
            id: 'balayage',
            name: 'Balayage',
            options: [
              { label: 'Short', duration: 180, price: 110 },
              { label: 'Medium', duration: 195, price: 130 },
              { label: 'Long', duration: 210, price: 150 }
            ]
          },
          {
            id: 'toner',
            name: 'Toner',
            options: [{ label: 'Standard', duration: 30, price: 25 }]
          }
        ]
      },
      {
        id: 'ladies-braids-cornrows-twists',
        title: "Ladies' - Braids, Cornrows & Twists",
        services: [
          {
            id: 'ladies-braids',
            name: 'Braids',
            options: [
              { label: 'Long Hair', duration: 90, price: 75 },
              { label: 'Medium Hair', duration: 75, price: 65 },
              { label: 'Short Hair', duration: 60, price: 55 }
            ]
          },
          {
            id: 'ladies-cornrows',
            name: 'Cornrows',
            options: [
              { label: 'Long Hair', duration: 60, price: 50 },
              { label: 'Medium Hair', duration: 45, price: 40 },
              { label: 'Short Hair', duration: 30, price: 30 }
            ]
          },
          {
            id: 'ladies-twists',
            name: 'Twists',
            options: [
              { label: 'Long Hair', duration: 90, price: 80 },
              { label: 'Medium Hair', duration: 75, price: 70 },
              { label: 'Short Hair', duration: 60, price: 60 }
            ]
          }
        ]
      },
      {
        id: 'ladies-hair-colouring',
        title: "Ladies' - Hair Colouring",
        services: [
          {
            id: 'root-tint',
            name: 'Root Tint',
            options: [
              { label: 'Short', duration: 75, price: 45 },
              { label: 'Medium', duration: 90, price: 55 },
              { label: 'Long', duration: 105, price: 65 }
            ]
          },
          {
            id: 'full-head-tint',
            name: 'Full Head Tint',
            options: [
              { label: 'Short', duration: 90, price: 55 },
              { label: 'Medium', duration: 105, price: 65 },
              { label: 'Long', duration: 120, price: 75 }
            ]
          },
          {
            id: 'semi-permanent-colour',
            name: 'Semi-Permanent Colour',
            options: [
              { label: 'Short', duration: 60, price: 45 },
              { label: 'Medium', duration: 75, price: 55 },
              { label: 'Long', duration: 90, price: 65 }
            ]
          },
          {
            id: 'glossing',
            name: 'Glossing',
            options: [
              { label: 'Short', duration: 45, price: 35 },
              { label: 'Medium', duration: 60, price: 45 },
              { label: 'Long', duration: 75, price: 55 }
            ]
          },
          {
            id: 'bleach-bath',
            name: 'Bleach Bath',
            options: [{ label: 'Standard', duration: 60, price: 60 }]
          }
        ]
      },
      {
        id: 'ladies-hair-treatments',
        title: "Ladies' - Hair Treatments",
        services: [
          {
            id: 'olaplex-standalone',
            name: 'Olaplex Standalone',
            options: [
              { label: 'Short', duration: 45, price: 45 },
              { label: 'Medium', duration: 60, price: 55 },
              { label: 'Long', duration: 75, price: 65 }
            ]
          },
          {
            id: 'deep-conditioning-mask',
            name: 'Deep Conditioning Mask',
            options: [
              { label: 'Short', duration: 30, price: 25 },
              { label: 'Medium', duration: 45, price: 30 },
              { label: 'Long', duration: 60, price: 35 }
            ]
          },
          {
            id: 'scalp-treatment',
            name: 'Scalp Treatment',
            options: [{ label: 'Standard', duration: 45, price: 35 }]
          },
          {
            id: 'protein-treatment',
            name: 'Protein Treatment',
            options: [{ label: 'Standard', duration: 45, price: 35 }]
          },
          {
            id: 'hot-oil-treatment',
            name: 'Hot Oil Treatment',
            options: [{ label: 'Standard', duration: 45, price: 35 }]
          },
          {
            id: 'hair-repair-package',
            name: 'Hair Repair Package',
            options: [
              { label: 'Short', duration: 90, price: 75 },
              { label: 'Medium', duration: 105, price: 85 },
              { label: 'Long', duration: 120, price: 95 }
            ]
          },
          {
            id: 'split-end-treatment',
            name: 'Split End Treatment',
            options: [{ label: 'Standard', duration: 30, price: 25 }]
          },
          {
            id: 'detox-treatment',
            name: 'Detox Treatment',
            options: [{ label: 'Standard', duration: 45, price: 35 }]
          },
          {
            id: 'shine-gloss',
            name: 'Shine Gloss',
            options: [{ label: 'Standard', duration: 30, price: 30 }]
          },
          {
            id: 'anti-frizz-treatment',
            name: 'Anti-Frizz Treatment',
            options: [{ label: 'Standard', duration: 60, price: 60 }]
          },
          {
            id: 'post-colour-treatment',
            name: 'Post-Colour Treatment',
            options: [{ label: 'Standard', duration: 30, price: 20 }]
          }
        ]
      },
      {
        id: 'ladies-haircuts-hairdressing',
        title: "Ladies' - Haircuts & Hairdressing",
        services: [
          {
            id: 'dry-trim',
            name: 'Dry Trim',
            options: [
              { label: 'Short', duration: 20, price: 18 },
              { label: 'Medium', duration: 25, price: 22 },
              { label: 'Long', duration: 30, price: 26 }
            ]
          },
          {
            id: 'wash-blow-dry',
            name: 'Wash & Blow Dry',
            options: [
              { label: 'Short', duration: 30, price: 22 },
              { label: 'Medium', duration: 40, price: 28 },
              { label: 'Long', duration: 50, price: 35 }
            ]
          },
          {
            id: 'cut-blow-dry',
            name: 'Cut & Blow Dry',
            options: [
              { label: 'Short', duration: 45, price: 35 },
              { label: 'Medium', duration: 60, price: 42 },
              { label: 'Long', duration: 75, price: 49 }
            ]
          },
          {
            id: 'restyle-cut',
            name: 'Restyle Cut',
            options: [
              { label: 'Short', duration: 60, price: 45 },
              { label: 'Medium', duration: 75, price: 52 },
              { label: 'Long', duration: 90, price: 60 }
            ]
          },
          {
            id: 'curly-blow-dry',
            name: 'Curly Blow Dry',
            options: [
              { label: 'Short', duration: 45, price: 28 },
              { label: 'Medium', duration: 55, price: 34 },
              { label: 'Long', duration: 65, price: 40 }
            ]
          },
          {
            id: 'hair-up-updo',
            name: 'Hair Up (Updo)',
            options: [
              { label: 'Short', duration: 60, price: 45 },
              { label: 'Medium', duration: 75, price: 55 },
              { label: 'Long', duration: 90, price: 65 }
            ]
          },
          {
            id: 'fringe-trim',
            name: 'Fringe Trim',
            options: [{ label: 'Standard', duration: 10, price: 6 }]
          },
          {
            id: 'roller-set',
            name: 'Roller Set',
            options: [
              { label: 'Short', duration: 45, price: 22 },
              { label: 'Medium', duration: 55, price: 28 },
              { label: 'Long', duration: 65, price: 34 }
            ]
          },
          {
            id: 'ghd-curls',
            name: 'GHD Curls',
            options: [
              { label: 'Short', duration: 30, price: 25 },
              { label: 'Medium', duration: 40, price: 30 },
              { label: 'Long', duration: 50, price: 35 }
            ]
          },
          {
            id: 'pin-curls',
            name: 'Pin Curls',
            options: [
              { label: 'Short', duration: 30, price: 25 },
              { label: 'Medium', duration: 40, price: 30 },
              { label: 'Long', duration: 50, price: 35 }
            ]
          },
          {
            id: 'straightening',
            name: 'Straightening',
            options: [
              { label: 'Short', duration: 30, price: 22 },
              { label: 'Medium', duration: 40, price: 28 },
              { label: 'Long', duration: 50, price: 35 }
            ]
          },
          {
            id: 'hair-wash-only',
            name: 'Hair Wash Only',
            options: [{ label: 'Standard', duration: 15, price: 8 }]
          }
        ]
      },
      {
        id: 'ladies-weaves-wigs',
        title: "Ladies' - Weaves & Wigs",
        services: [
          {
            id: 'weave-per-row',
            name: 'Weave (Per Row)',
            options: [{ label: 'Standard', duration: 30, price: 25 }]
          },
          {
            id: 'weave-half-head',
            name: 'Weave (Half Head)',
            options: [{ label: 'Standard', duration: 90, price: 80 }]
          },
          {
            id: 'weave-full-head',
            name: 'Weave (Full Head)',
            options: [{ label: 'Standard', duration: 120, price: 120 }]
          },
          {
            id: 'wig-install',
            name: 'Wig Install',
            options: [{ label: 'Standard', duration: 90, price: 75 }]
          },
          {
            id: 'wig-styling',
            name: 'Wig Styling',
            options: [{ label: 'Standard', duration: 60, price: 35 }]
          }
        ]
      },
      {
        id: 'men-braids-cornrows-twists',
        title: 'Men - Braids, Cornrows & Twists',
        services: [
          {
            id: 'men-braids',
            name: 'Men - Braids',
            options: [
              { label: 'Long Hair', duration: 90, price: 80 },
              { label: 'Medium Hair', duration: 75, price: 70 },
              { label: 'Short Hair', duration: 60, price: 60 }
            ]
          },
          {
            id: 'men-cornrows',
            name: 'Men - Cornrows',
            options: [
              { label: 'Long Hair', duration: 60, price: 55 },
              { label: 'Medium Hair', duration: 45, price: 45 },
              { label: 'Short Hair', duration: 30, price: 35 }
            ]
          },
          {
            id: 'men-twists',
            name: 'Men - Twists',
            options: [
              { label: 'Long Hair', duration: 90, price: 85 },
              { label: 'Medium Hair', duration: 75, price: 75 },
              { label: 'Short Hair', duration: 60, price: 65 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'nails',
    title: 'NAILS',
    subcategories: [
      {
        id: 'manicures-pedicures',
        title: 'Hands & Feet',
        services: [
          {
            id: 'hands-manicure-classic',
            name: 'Hands - Manicure (Classic)',
            options: [{ label: '45 min', duration: 45, price: 20 }]
          },
          {
            id: 'hands-gel-manicure',
            name: 'Hands - Gel Manicure',
            options: [{ label: '1 hour', duration: 60, price: 30 }]
          },
          {
            id: 'feet-pedicure-classic',
            name: 'Feet - Pedicure (Classic)',
            options: [{ label: '1 hour', duration: 60, price: 30 }]
          },
          {
            id: 'feet-gel-pedicure',
            name: 'Feet - Gel Pedicure',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          }
        ]
      },
      {
        id: 'nail-extensions-enhancements',
        title: 'Extensions & Enhancements',
        services: [
          {
            id: 'nails-biab-infill',
            name: 'Nails - BIAB Infill',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          },
          {
            id: 'nails-biab-overlay',
            name: 'Nails - BIAB Overlay',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          },
          {
            id: 'nails-acrylic-full-set',
            name: 'Nails - Acrylic Full Set',
            options: [{ label: '1h 15min', duration: 75, price: 45 }]
          },
          {
            id: 'nails-acrylic-infill',
            name: 'Nails - Acrylic Infill',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          },
          {
            id: 'nails-removal',
            name: 'Nails - Removal',
            options: [{ label: '20 min', duration: 20, price: 10 }]
          }
        ]
      }
    ]
  },
  {
    id: 'facials',
    title: 'FACIALS',
    subcategories: [
      {
        id: 'facial-treatments',
        title: 'Facial Treatments',
        services: [
          {
            id: 'facial-micro-needling',
            name: 'Facial - Micro-needling',
            options: [{ label: '45 min', duration: 45, price: 100 }]
          },
          {
            id: 'facial-hydrafacial-luxury',
            name: 'Facial - HydraFacial (Luxury)',
            options: [{ label: '1h 15min', duration: 75, price: 125 }]
          },
          {
            id: 'facial-million-dollar',
            name: 'Facial - Million Dollar Facial',
            options: [{ label: '1h 15min', duration: 75, price: 125 }]
          },
          {
            id: 'facial-anti-ageing',
            name: 'Facial - Anti-Ageing',
            options: [{ label: '2 hours', duration: 120, price: 220 }]
          },
          {
            id: 'facial-dermalux-led',
            name: 'Facial - Dermalux LED Light Therapy',
            options: [{ label: '20 min', duration: 20, price: 25 }]
          },
          {
            id: 'facial-express-cleanse',
            name: 'Facial - Express Cleanse',
            options: [{ label: '30 min', duration: 30, price: 35 }]
          },
          {
            id: 'facial-caci-jowl-lift',
            name: 'Facial - CACI Jowl Lift',
            options: [{ label: '45 min', duration: 45, price: 40 }]
          },
          {
            id: 'facial-express-dermaplane',
            name: 'Facial - Express Dermaplane',
            options: [{ label: '30 min', duration: 30, price: 45 }]
          },
          {
            id: 'facial-mini-eco',
            name: 'Facial - Mini ECO',
            options: [{ label: '30 min', duration: 30, price: 45 }]
          },
          {
            id: 'facial-mini-hydrating',
            name: 'Facial - Mini Hydrating',
            options: [{ label: '30 min', duration: 30, price: 45 }]
          },
          {
            id: 'facial-full-eco',
            name: 'Facial - Full ECO',
            options: [{ label: '1 hour', duration: 60, price: 75 }]
          },
          {
            id: 'facial-full-hydrating',
            name: 'Facial - Full Hydrating',
            options: [{ label: '1 hour', duration: 60, price: 75 }]
          },
          {
            id: 'dermaplaning-express',
            name: 'Dermaplaning - Express',
            options: [{ label: '30 min', duration: 30, price: 45 }]
          },
          {
            id: 'dermaplaning-full',
            name: 'Dermaplaning - Full',
            options: [{ label: '1 hour', duration: 60, price: 75 }]
          }
        ]
      }
    ]
  },
  {
    id: 'waxing-threading',
    title: 'WAXING AND THREADING',
    subcategories: [
      {
        id: 'facial-waxing',
        title: 'Facial Waxing',
        services: [
          {
            id: 'waxing-brows',
            name: 'Waxing - Brows',
            options: [{ label: '10 min', duration: 10, price: 8 }]
          },
          {
            id: 'waxing-upper-lip',
            name: 'Waxing - Upper Lip',
            options: [{ label: '10 min', duration: 10, price: 6 }]
          },
          {
            id: 'waxing-chin',
            name: 'Waxing - Chin',
            options: [{ label: '10 min', duration: 10, price: 6 }]
          },
          {
            id: 'waxing-full-face',
            name: 'Waxing - Full Face',
            options: [{ label: '30 min', duration: 30, price: 25 }]
          }
        ]
      },
      {
        id: 'body-waxing',
        title: 'Body Waxing',
        services: [
          {
            id: 'waxing-half-leg',
            name: 'Waxing - Half Leg',
            options: [{ label: '20 min', duration: 20, price: 18 }]
          },
          {
            id: 'waxing-full-leg',
            name: 'Waxing - Full Leg',
            options: [{ label: '30 min', duration: 30, price: 25 }]
          },
          {
            id: 'waxing-underarm',
            name: 'Waxing - Underarm',
            options: [{ label: '10 min', duration: 10, price: 8 }]
          },
          {
            id: 'waxing-bikini',
            name: 'Waxing - Bikini',
            options: [{ label: '20 min', duration: 20, price: 18 }]
          },
          {
            id: 'waxing-hollywood',
            name: 'Waxing - Hollywood',
            options: [{ label: '30 min', duration: 30, price: 30 }]
          },
          {
            id: 'waxing-brazilian',
            name: 'Waxing - Brazilian',
            options: [{ label: '30 min', duration: 30, price: 28 }]
          }
        ]
      },
      {
        id: 'threading',
        title: 'Threading',
        services: [
          {
            id: 'threading-brows',
            name: 'Threading - Brows',
            options: [{ label: '10 min', duration: 10, price: 7 }]
          },
          {
            id: 'threading-upper-lip',
            name: 'Threading - Upper Lip',
            options: [{ label: '10 min', duration: 10, price: 5 }]
          }
        ]
      }
    ]
  },
  {
    id: 'brows-lashes',
    title: 'BROWS AND LASHES',
    subcategories: [
      {
        id: 'brows',
        title: 'Brows',
        services: [
          {
            id: 'brows-lamination',
            name: 'Brows - Lamination',
            options: [{ label: '45 min', duration: 45, price: 35 }]
          },
          {
            id: 'brows-tint',
            name: 'Brows - Tint',
            options: [{ label: '15 min', duration: 15, price: 10 }]
          },
          {
            id: 'brows-shape-wax-thread',
            name: 'Brows - Shape (Wax/Thread)',
            options: [{ label: '15 min', duration: 15, price: 10 }]
          },
          {
            id: 'brows-shape-tint',
            name: 'Brows - Shape & Tint',
            options: [{ label: '25 min', duration: 25, price: 18 }]
          }
        ]
      },
      {
        id: 'lashes',
        title: 'Lashes',
        services: [
          {
            id: 'lashes-classic',
            name: 'Lashes - Classic',
            options: [{ label: '1h 30min', duration: 90, price: 45 }]
          },
          {
            id: 'lashes-hybrid',
            name: 'Lashes - Hybrid',
            options: [{ label: '1h 45min', duration: 105, price: 55 }]
          },
          {
            id: 'lashes-volume',
            name: 'Lashes - Volume',
            options: [{ label: '2 hours', duration: 120, price: 65 }]
          },
          {
            id: 'lashes-mega-volume',
            name: 'Lashes - Mega Volume',
            options: [{ label: '2h 15min', duration: 135, price: 75 }]
          },
          {
            id: 'lashes-removal',
            name: 'Lashes - Removal',
            options: [{ label: '20 min', duration: 20, price: 15 }]
          }
        ]
      }
    ]
  },
  {
    id: 'makeup',
    title: 'MAKE UP',
    subcategories: [
      {
        id: 'makeup-services',
        title: 'Makeup Services',
        services: [
          {
            id: 'makeup-soft-glam',
            name: 'Makeup - Soft Glam',
            options: [{ label: '1 hour', duration: 60, price: 45 }]
          },
          {
            id: 'makeup-full-glam',
            name: 'Makeup - Full Glam',
            options: [{ label: '1h 15min', duration: 75, price: 60 }]
          },
          {
            id: 'makeup-bridal-trial',
            name: 'Makeup - Bridal Trial',
            options: [{ label: '1h 30min', duration: 90, price: 70 }]
          },
          {
            id: 'makeup-bridal-event-day',
            name: 'Makeup - Bridal (Event Day)',
            options: [{ label: '2 hours', duration: 120, price: 120 }]
          }
        ]
      }
    ]
  },
  {
    id: 'tanning',
    title: 'TANNING',
    subcategories: [
      {
        id: 'spray-tan',
        title: 'Spray Tan',
        services: [
          {
            id: 'spray-tan-full-body',
            name: 'Spray Tan - Full Body',
            options: [{ label: '20 min', duration: 20, price: 20 }]
          }
        ]
      }
    ]
  },
  {
    id: 'piercing',
    title: 'PIERCING',
    subcategories: [
      {
        id: 'ear-piercing',
        title: 'Ear Piercing',
        services: [
          {
            id: 'ear-piercing-single',
            name: 'Ear Piercing (Single)',
            options: [{ label: '15 min', duration: 15, price: 15 }]
          },
          {
            id: 'ear-piercing-pair',
            name: 'Ear Piercing (Pair)',
            options: [{ label: '20 min', duration: 20, price: 25 }]
          }
        ]
      }
    ]
  },
  {
    id: 'body',
    title: 'BODY',
    subcategories: [
      {
        id: 'massage',
        title: 'Massage',
        services: [
          {
            id: 'massage-back-neck-shoulders',
            name: 'Massage - Back, Neck & Shoulders',
            options: [{ label: '30 min', duration: 30, price: 35 }]
          },
          {
            id: 'massage-full-body',
            name: 'Massage - Full Body',
            options: [{ label: '1 hour', duration: 60, price: 55 }]
          },
          {
            id: 'massage-full-body-90-min',
            name: 'Massage - Full Body (90 min)',
            options: [{ label: '1h 30min', duration: 90, price: 75 }]
          }
        ]
      },
      {
        id: 'body-treatments',
        title: 'Treatments',
        services: [
          {
            id: 'body-scrub-and-polish',
            name: 'Body - Scrub & Polish',
            options: [{ label: '45 min', duration: 45, price: 40 }]
          },
          {
            id: 'body-slimming-wrap',
            name: 'Body - Slimming Wrap',
            options: [{ label: '1 hour', duration: 60, price: 60 }]
          }
        ]
      }
    ]
  }
];
