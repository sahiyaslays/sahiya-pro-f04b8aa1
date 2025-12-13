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
          },
          {
            id: 'ombre-highlights',
            name: 'Ombre Highlights',
            options: [
              { label: 'Short', duration: 150, price: 95 },
              { label: 'Medium', duration: 165, price: 115 },
              { label: 'Long', duration: 180, price: 135 }
            ]
          },
          {
            id: 'partial-balayage',
            name: 'Partial Balayage',
            options: [
              { label: 'Short', duration: 120, price: 75 },
              { label: 'Medium', duration: 135, price: 90 },
              { label: 'Long', duration: 150, price: 105 }
            ]
          },
          {
            id: 'root-shadow-smudge',
            name: 'Root Shadow/Smudge',
            options: [
              { label: 'Short', duration: 90, price: 60 },
              { label: 'Medium', duration: 105, price: 70 },
              { label: 'Long', duration: 120, price: 80 }
            ]
          },
          {
            id: 'foilayage',
            name: 'Foilayage',
            options: [
              { label: 'Short', duration: 180, price: 115 },
              { label: 'Medium', duration: 195, price: 135 },
              { label: 'Long', duration: 210, price: 155 }
            ]
          },
          {
            id: 'baby-lights',
            name: 'Baby Lights',
            options: [
              { label: 'Short', duration: 150, price: 100 },
              { label: 'Medium', duration: 165, price: 120 },
              { label: 'Long', duration: 180, price: 140 }
            ]
          },
          {
            id: 'money-piece-highlights',
            name: 'Money Piece Highlights',
            options: [
              { label: 'Short', duration: 90, price: 55 },
              { label: 'Medium', duration: 105, price: 65 },
              { label: 'Long', duration: 120, price: 75 }
            ]
          },
          {
            id: 'face-framing-highlights',
            name: 'Face-Framing Highlights',
            options: [
              { label: 'Short', duration: 75, price: 50 },
              { label: 'Medium', duration: 90, price: 60 },
              { label: 'Long', duration: 105, price: 70 }
            ]
          },
          {
            id: 'ribbon-highlights',
            name: 'Ribbon Highlights',
            options: [
              { label: 'Short', duration: 120, price: 85 },
              { label: 'Medium', duration: 135, price: 100 },
              { label: 'Long', duration: 150, price: 115 }
            ]
          },
          {
            id: 'colour-melt',
            name: 'Colour Melt',
            options: [
              { label: 'Short', duration: 150, price: 105 },
              { label: 'Medium', duration: 165, price: 125 },
              { label: 'Long', duration: 180, price: 145 }
            ]
          },
          {
            id: 'lowlights',
            name: 'Lowlights',
            options: [
              { label: 'Short', duration: 120, price: 80 },
              { label: 'Medium', duration: 135, price: 95 },
              { label: 'Long', duration: 150, price: 110 }
            ]
          },
          {
            id: 'root-stretch',
            name: 'Root Stretch',
            options: [
              { label: 'Short', duration: 90, price: 65 },
              { label: 'Medium', duration: 105, price: 75 },
              { label: 'Long', duration: 120, price: 85 }
            ]
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
        id: 'hair-extensions-removal-fitting',
        title: 'Hair Extensions Removal & Fitting Services',
        services: [
          {
            id: 'tape-in-extensions-fitting',
            name: 'Tape-In Extensions Fitting',
            options: [
              { label: 'Long Hair', duration: 120, price: 150 },
              { label: 'Medium Hair', duration: 105, price: 130 },
              { label: 'Short Hair', duration: 90, price: 110 }
            ]
          },
          {
            id: 'tape-in-extensions-removal',
            name: 'Tape-In Extensions Removal',
            options: [
              { label: 'Long Hair', duration: 60, price: 50 },
              { label: 'Medium Hair', duration: 50, price: 42 },
              { label: 'Short Hair', duration: 40, price: 35 }
            ]
          },
          {
            id: 'clip-in-extensions-fitting',
            name: 'Clip-In Extensions Fitting',
            options: [
              { label: 'Long Hair', duration: 45, price: 45 },
              { label: 'Medium Hair', duration: 35, price: 38 },
              { label: 'Short Hair', duration: 25, price: 30 }
            ]
          },
          {
            id: 'micro-ring-extensions-fitting',
            name: 'Micro Ring Extensions Fitting',
            options: [
              { label: 'Long Hair', duration: 180, price: 200 },
              { label: 'Medium Hair', duration: 150, price: 170 },
              { label: 'Short Hair', duration: 120, price: 140 }
            ]
          },
          {
            id: 'micro-ring-extensions-removal',
            name: 'Micro Ring Extensions Removal',
            options: [
              { label: 'Long Hair', duration: 90, price: 70 },
              { label: 'Medium Hair', duration: 75, price: 60 },
              { label: 'Short Hair', duration: 60, price: 50 }
            ]
          },
          {
            id: 'nano-ring-extensions-fitting',
            name: 'Nano Ring Extensions Fitting',
            options: [
              { label: 'Long Hair', duration: 210, price: 220 },
              { label: 'Medium Hair', duration: 180, price: 190 },
              { label: 'Short Hair', duration: 150, price: 160 }
            ]
          },
          {
            id: 'nano-ring-extensions-removal',
            name: 'Nano Ring Extensions Removal',
            options: [
              { label: 'Long Hair', duration: 90, price: 75 },
              { label: 'Medium Hair', duration: 75, price: 65 },
              { label: 'Short Hair', duration: 60, price: 55 }
            ]
          },
          {
            id: 'sew-in-extensions-fitting',
            name: 'Sew-In Extensions Fitting',
            options: [
              { label: 'Long Hair', duration: 240, price: 180 },
              { label: 'Medium Hair', duration: 210, price: 160 },
              { label: 'Short Hair', duration: 180, price: 140 }
            ]
          },
          {
            id: 'sew-in-extensions-removal',
            name: 'Sew-In Extensions Removal',
            options: [
              { label: 'Long Hair', duration: 75, price: 60 },
              { label: 'Medium Hair', duration: 60, price: 50 },
              { label: 'Short Hair', duration: 45, price: 40 }
            ]
          },
          {
            id: 'pre-bonded-extensions-fitting',
            name: 'Pre-Bonded Extensions Fitting',
            options: [
              { label: 'Long Hair', duration: 180, price: 190 },
              { label: 'Medium Hair', duration: 150, price: 165 },
              { label: 'Short Hair', duration: 120, price: 140 }
            ]
          },
          {
            id: 'pre-bonded-extensions-removal',
            name: 'Pre-Bonded Extensions Removal',
            options: [
              { label: 'Long Hair', duration: 90, price: 75 },
              { label: 'Medium Hair', duration: 75, price: 65 },
              { label: 'Short Hair', duration: 60, price: 55 }
            ]
          },
          {
            id: 'extensions-maintenance',
            name: 'Extensions Maintenance',
            options: [
              { label: 'Long Hair', duration: 90, price: 80 },
              { label: 'Medium Hair', duration: 75, price: 70 },
              { label: 'Short Hair', duration: 60, price: 60 }
            ]
          },
          {
            id: 'extensions-color-match',
            name: 'Extensions Color Match Consultation',
            options: [
              { label: 'Long Hair', duration: 30, price: 25 },
              { label: 'Medium Hair', duration: 30, price: 25 },
              { label: 'Short Hair', duration: 30, price: 25 }
            ]
          }
        ]
      },
      {
        id: 'hair-extensions-application-only',
        title: 'Hair Extensions Application Only Services',
        services: [
          {
            id: 'fusion-extensions-application',
            name: 'Fusion Extensions Application',
            options: [
              { label: 'Long Hair', duration: 240, price: 250 },
              { label: 'Medium Hair', duration: 210, price: 220 },
              { label: 'Short Hair', duration: 180, price: 190 }
            ]
          },
          {
            id: 'keratin-bond-extensions-application',
            name: 'Keratin Bond Extensions Application',
            options: [
              { label: 'Long Hair', duration: 210, price: 230 },
              { label: 'Medium Hair', duration: 180, price: 200 },
              { label: 'Short Hair', duration: 150, price: 170 }
            ]
          },
          {
            id: 'i-tip-extensions-application',
            name: 'I-Tip Extensions Application',
            options: [
              { label: 'Long Hair', duration: 180, price: 190 },
              { label: 'Medium Hair', duration: 150, price: 165 },
              { label: 'Short Hair', duration: 120, price: 140 }
            ]
          },
          {
            id: 'u-tip-extensions-application',
            name: 'U-Tip Extensions Application',
            options: [
              { label: 'Long Hair', duration: 180, price: 195 },
              { label: 'Medium Hair', duration: 150, price: 170 },
              { label: 'Short Hair', duration: 120, price: 145 }
            ]
          },
          {
            id: 'flat-tip-extensions-application',
            name: 'Flat Tip Extensions Application',
            options: [
              { label: 'Long Hair', duration: 150, price: 175 },
              { label: 'Medium Hair', duration: 120, price: 150 },
              { label: 'Short Hair', duration: 90, price: 125 }
            ]
          },
          {
            id: 'halo-extensions-application',
            name: 'Halo Extensions Application',
            options: [
              { label: 'Long Hair', duration: 30, price: 40 },
              { label: 'Medium Hair', duration: 25, price: 35 },
              { label: 'Short Hair', duration: 20, price: 30 }
            ]
          },
          {
            id: 'weft-extensions-application',
            name: 'Weft Extensions Application',
            options: [
              { label: 'Long Hair', duration: 150, price: 160 },
              { label: 'Medium Hair', duration: 120, price: 140 },
              { label: 'Short Hair', duration: 90, price: 120 }
            ]
          },
          {
            id: 'ponytail-extensions-application',
            name: 'Ponytail Extensions Application',
            options: [
              { label: 'Long Hair', duration: 45, price: 55 },
              { label: 'Medium Hair', duration: 35, price: 45 },
              { label: 'Short Hair', duration: 25, price: 35 }
            ]
          },
          {
            id: 'volume-extensions-application',
            name: 'Volume Extensions Application',
            options: [
              { label: 'Long Hair', duration: 120, price: 140 },
              { label: 'Medium Hair', duration: 105, price: 125 },
              { label: 'Short Hair', duration: 90, price: 110 }
            ]
          },
          {
            id: 'length-extensions-application',
            name: 'Length Extensions Application',
            options: [
              { label: 'Long Hair', duration: 150, price: 165 },
              { label: 'Medium Hair', duration: 120, price: 145 },
              { label: 'Short Hair', duration: 90, price: 125 }
            ]
          },
          {
            id: 'root-boost-extensions-application',
            name: 'Root Boost Extensions Application',
            options: [
              { label: 'Long Hair', duration: 90, price: 110 },
              { label: 'Medium Hair', duration: 75, price: 95 },
              { label: 'Short Hair', duration: 60, price: 80 }
            ]
          },
          {
            id: 'invisible-tape-extensions-application',
            name: 'Invisible Tape Extensions Application',
            options: [
              { label: 'Long Hair', duration: 135, price: 155 },
              { label: 'Medium Hair', duration: 120, price: 140 },
              { label: 'Short Hair', duration: 105, price: 125 }
            ]
          },
          {
            id: 'double-drawn-extensions-application',
            name: 'Double Drawn Extensions Application',
            options: [
              { label: 'Long Hair', duration: 180, price: 200 },
              { label: 'Medium Hair', duration: 150, price: 175 },
              { label: 'Short Hair', duration: 120, price: 150 }
            ]
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
            id: 'nail-ext-full-set-acrylic-naked',
            name: 'Nail Extensions - Full Set Acrylic (Naked Full Set)',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          },
          {
            id: 'nail-ext-full-set-acrylic-naked-toes',
            name: 'Nail Extensions - Full Set Acrylic (Naked Full Set Toes)',
            options: [{ label: '1h 15min', duration: 75, price: 45 }]
          },
          {
            id: 'nail-ext-full-set-acrylic-french-tip',
            name: 'Nail Extensions - Full Set Acrylic (French Tip)',
            options: [{ label: '1h 15min', duration: 75, price: 45 }]
          },
          {
            id: 'nail-ext-full-set-acrylic-with-design',
            name: 'Nail Extensions - Full Set Acrylic with Design',
            options: [{ label: '1h 30min', duration: 90, price: 50 }]
          },
          {
            id: 'nail-ext-full-set-gel-biab',
            name: 'Nail Extensions - Full Set Gel / BIAB',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          },
          {
            id: 'nail-ext-full-set-pink-white',
            name: 'Nail Extensions - Full Set Pink & White',
            options: [{ label: '1h 15min', duration: 75, price: 48 }]
          },
          {
            id: 'nail-ext-full-set-ombre',
            name: 'Nail Extensions - Full Set Ombre',
            options: [{ label: '1h 15min', duration: 75, price: 48 }]
          },
          {
            id: 'nail-ext-gel-white-tips',
            name: 'Nail Extensions - Gel White Tips',
            options: [{ label: '1h 15min', duration: 75, price: 45 }]
          },
          {
            id: 'nail-ext-acrylic-big-toes',
            name: 'Nail Extensions - Acrylic - Big Toes',
            options: [{ label: '20 min', duration: 20, price: 10 }]
          },
          {
            id: 'nail-ext-acrylic-removal-reapplication',
            name: 'Nail Extensions - Acrylic Removal & Reapplication',
            options: [{ label: '1h 45min', duration: 105, price: 65 }]
          },
          {
            id: 'nail-ext-gel-removal-reapplication',
            name: 'Nail Extensions - Gel Removal & Reapplication',
            options: [{ label: '1h 30min', duration: 90, price: 55 }]
          },
          {
            id: 'nail-ext-full-set-bio-sculpture-gel',
            name: 'Nail Extensions - Full Set Bio Sculpture Gel',
            options: [{ label: '1h 15min', duration: 75, price: 45 }]
          },
          {
            id: 'nail-ext-gel-sculpture-infills',
            name: 'Nail Extensions - GEL Sculpture Infills',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          },
          {
            id: 'nail-ext-acrylic-infills',
            name: 'Nail Extensions - Acrylic Infills',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          },
          {
            id: 'nail-ext-gel-biab-infills',
            name: 'Nail Extensions - Gel / BIAB Infills',
            options: [{ label: '50 min', duration: 50, price: 30 }]
          },
          {
            id: 'nail-ext-pink-white-infills',
            name: 'Nail Extensions - Pink & White Infills',
            options: [{ label: '1 hour', duration: 60, price: 38 }]
          },
          {
            id: 'nail-ext-ombre-infills',
            name: 'Nail Extensions - Ombre Infills',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          },
          {
            id: 'nail-ext-removal',
            name: 'Nail Extensions - Removal',
            options: [{ label: '20 min', duration: 20, price: 15 }]
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
            id: 'facial-classic',
            name: 'Facial- Classic',
            options: [{ label: '1h 30min', duration: 90, price: 145 }]
          },
          {
            id: 'facial-eye-treatment',
            name: 'Facial- Eye Treatment',
            options: [{ label: '1h 15min', duration: 75, price: 120 }]
          },
          {
            id: 'facial-dermalogica',
            name: 'Facial - Dermalogica',
            options: [{ label: '1h 30min', duration: 90, price: 150 }]
          },
          {
            id: 'facial-skin-peel',
            name: 'Facial - Skin Peel',
            options: [{ label: '45 min', duration: 45, price: 75 }]
          },
          {
            id: 'facial-microdermabrasion',
            name: 'Facial - Microdermabrasion',
            options: [{ label: '1h 15min', duration: 75, price: 120 }]
          },
          {
            id: 'facial-dermaplaning',
            name: 'Facial- Dermaplaning',
            options: [{ label: '1 hour', duration: 60, price: 95 }]
          },
          {
            id: 'facial-radio-frequency-skin-tightening',
            name: 'Facial - Radio Frequency Skin Tightening',
            options: [{ label: '2h 30min', duration: 150, price: 350 }]
          },
          {
            id: 'facial-led-light-therapy',
            name: 'Facial - LED Light Therapy',
            options: [{ label: '1 hour', duration: 60, price: 110 }]
          },
          {
            id: 'facial-skin-rejuvenation',
            name: 'Facial - Skin Rejuvenation',
            options: [{ label: '2 hours', duration: 120, price: 290 }]
          },
          {
            id: 'facial-laser-skin-rejuvenation',
            name: 'Facial - Laser Skin Rejuvenation',
            options: [{ label: '2 hours', duration: 120, price: 290 }]
          },
          {
            id: 'facial-pigmentation-treatment',
            name: 'Facial - Pigmentation Treatment',
            options: [{ label: '1h 30min', duration: 90, price: 150 }]
          },
          {
            id: 'facial-dermapen',
            name: 'Facial - Dermapen',
            options: [{ label: '1h 30min', duration: 90, price: 150 }]
          },
          {
            id: 'facial-micro-needling',
            name: 'Facial - Micro Needling',
            options: [{ label: '1h 30min', duration: 90, price: 145 }]
          },
          {
            id: 'facial-anti-ageing',
            name: 'Facial - Anti-Ageing',
            options: [{ label: '2 hours', duration: 120, price: 220 }]
          },
          {
            id: 'facial-deep-cleansing',
            name: 'Facial-Deep Cleansing',
            options: [{ label: '1h 45min', duration: 105, price: 180 }]
          },
          {
            id: 'facial-gold',
            name: 'Facial - Gold',
            options: [{ label: '1h 30min', duration: 90, price: 140 }]
          },
          {
            id: 'facial-hydrating',
            name: 'Facial- Hydrating',
            options: [{ label: '1 hour', duration: 60, price: 95 }]
          },
          {
            id: 'facial-acne-treatment',
            name: 'Facial-Acne Treatment',
            options: [{ label: '1 hour', duration: 60, price: 95 }]
          },
          {
            id: 'facial-high-frequency',
            name: 'Facial- High Frequency',
            options: [{ label: '45 min', duration: 45, price: 60 }]
          },
          {
            id: 'facial-caci-non-surgical-face-lift',
            name: 'Facial-CACI Non-Surgical Face Lift',
            options: [{ label: '1 hour', duration: 60, price: 95 }]
          },
          {
            id: 'facial-caci-jowl-lift',
            name: 'Facial- CACI Jowl Lift',
            options: [{ label: '30 min', duration: 30, price: 45 }]
          },
          {
            id: 'facial-caci-eye-revive',
            name: 'Facial - CACI Eye Revive',
            options: [{ label: '40 min', duration: 40, price: 55 }]
          },
          {
            id: 'facial-caci-hydratone',
            name: 'Facial - CACI Hydratone',
            options: [{ label: '30 min', duration: 30, price: 40 }]
          },
          {
            id: 'facial-caci-skin-rejuvenation',
            name: 'Facial- CACI Skin Rejuvenation',
            options: [{ label: '1 hour', duration: 60, price: 110 }]
          },
          {
            id: 'facials-chemical-peel',
            name: 'Facials - Chemical Peel',
            options: [{ label: '45 min', duration: 45, price: 70 }]
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
            id: 'threading-chin',
            name: 'Chin',
            options: [{ label: '15 min', duration: 15, price: 20 }]
          },
          {
            id: 'threading-lower-lip',
            name: 'Lower Lip',
            options: [{ label: '15 min', duration: 15, price: 20 }]
          },
          {
            id: 'threading-upper-lip',
            name: 'Upper Lip',
            options: [{ label: '15 min', duration: 15, price: 20 }]
          },
          {
            id: 'threading-eyebrows',
            name: 'Eyebrows',
            options: [{ label: '20 min', duration: 20, price: 25 }]
          },
          {
            id: 'threading-forehead',
            name: 'Forehead',
            options: [{ label: '20 min', duration: 20, price: 25 }]
          },
          {
            id: 'threading-lip-chin',
            name: 'Lip & Chin',
            options: [{ label: '25 min', duration: 25, price: 30 }]
          },
          {
            id: 'threading-sides',
            name: 'Sides',
            options: [{ label: '25 min', duration: 25, price: 30 }]
          },
          {
            id: 'threading-full-face',
            name: 'Full Face',
            options: [{ label: '45 min', duration: 45, price: 65 }]
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
            id: 'makeup',
            name: 'Makeup',
            options: [{ label: '45 min', duration: 45, price: 45 }]
          },
          {
            id: 'day-makeup',
            name: 'Day Makeup',
            options: [{ label: '45 min', duration: 45, price: 45 }]
          },
          {
            id: 'party-makeup',
            name: 'Party Makeup',
            options: [{ label: '1 hour', duration: 60, price: 75 }]
          },
          {
            id: 'festival-makeup',
            name: 'Festival Makeup',
            options: [{ label: '1 hour', duration: 60, price: 80 }]
          },
          {
            id: 'evening-makeup',
            name: 'Evening Makeup',
            options: [{ label: '1h 15min', duration: 75, price: 95 }]
          },
          {
            id: 'makeup-incl-strip-lashes',
            name: 'Makeup incl. Strip Lashes',
            options: [{ label: '1 hour', duration: 60, price: 85 }]
          },
          {
            id: 'eye-makeup',
            name: 'Eye Makeup',
            options: [{ label: '30 min', duration: 30, price: 30 }]
          },
          {
            id: 'eye-makeup-incl-strip-lashes',
            name: 'Eye Makeup incl. Strip Lashes',
            options: [{ label: '40 min', duration: 40, price: 40 }]
          },
          {
            id: 'wedding-makeup-bridesmaid',
            name: 'Wedding Makeup (Bridesmaid)',
            options: [{ label: '1h 30min', duration: 90, price: 120 }]
          },
          {
            id: 'wedding-makeup-mother-of-bride',
            name: 'Wedding Makeup (Mother of The Bride)',
            options: [{ label: '1h 30min', duration: 90, price: 145 }]
          },
          {
            id: 'wedding-makeup-bride',
            name: 'Wedding Makeup (Bride)',
            options: [{ label: '2 hours', duration: 120, price: 150 }]
          },
          {
            id: 'bridal-makeup',
            name: 'Bridal Makeup',
            options: [{ label: '2 hours', duration: 120, price: 150 }]
          },
          {
            id: 'bridal-hair-and-makeup',
            name: 'Bridal Hair & Makeup',
            options: [{ label: '4 hours', duration: 240, price: 450 }]
          },
          {
            id: 'makeup-and-hair-up',
            name: 'Makeup & Hair Up',
            options: [{ label: '3 hours', duration: 180, price: 360 }]
          },
          {
            id: 'bridal-hair-and-makeup-trial',
            name: 'Bridal Hair & Makeup - Trial',
            options: [{ label: '2h 30min', duration: 150, price: 250 }]
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
