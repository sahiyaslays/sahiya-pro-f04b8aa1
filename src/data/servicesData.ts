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
    title: 'CONSULTATION / PATCH TEST',
    subcategories: [
      {
        id: 'consultation-services',
        title: 'Consultation Services',
        services: [
          {
            id: 'patch-test',
            name: 'Patch Test',
            options: [{ label: '15 min', duration: 15, price: 10 }]
          },
          {
            id: 'colour-consult',
            name: 'Colour Consult',
            options: [{ label: '15 min', duration: 15, price: 20 }]
          },
          {
            id: 'extensions-consult-coloured-hair',
            name: 'Extensions Consult (Coloured Hair)',
            options: [{ label: '20 min', duration: 20, price: 25 }]
          },
          {
            id: 'extensions-consult-cambodian-hair',
            name: 'Extensions Consult (Cambodian Hair)',
            options: [{ label: '20 min', duration: 20, price: 25 }]
          },
          {
            id: 'video-consult',
            name: 'Video Consult',
            options: [{ label: '15 min', duration: 15, price: 15 }]
          },
          {
            id: 'hair-therapy-consult',
            name: 'Hair Therapy Consult',
            options: [{ label: '20 min', duration: 20, price: 25 }]
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
            id: 'hair-wash-haircut-blowdry-afro',
            name: 'Hair - Wash Haircut and Blowdry (Afro Hair)',
            options: [
              { label: 'Long Hair', duration: 90, price: 95 },
              { label: 'Medium Hair', duration: 75, price: 85 },
              { label: 'Short Hair', duration: 60, price: 75 }
            ]
          },
          {
            id: 'hair-wash-and-blow-dry',
            name: 'Hair - Wash & Blow-dry',
            options: [
              { label: 'Long Hair', duration: 60, price: 75 },
              { label: 'Medium Hair', duration: 50, price: 65 },
              { label: 'Short Hair', duration: 40, price: 55 }
            ]
          },
          {
            id: 'ladies-wash-cut-blow-dry',
            name: 'Ladies - Wash, Cut and Blow-dry',
            options: [
              { label: 'Long Hair', duration: 75, price: 85 },
              { label: 'Medium Hair', duration: 60, price: 75 },
              { label: 'Short Hair', duration: 45, price: 65 }
            ]
          },
          {
            id: 'hair-updo-occasion',
            name: 'Hair - Updo / Occasion',
            options: [
              { label: 'Long Hair', duration: 90, price: 165 },
              { label: 'Medium Hair', duration: 75, price: 145 },
              { label: 'Short Hair', duration: 60, price: 125 }
            ]
          },
          {
            id: 'ladies-wash-cut-blowdry-curl-styling',
            name: 'Ladies - Wash, Cut and Blowdry Hair - Curl Styling',
            options: [
              { label: 'Long Hair', duration: 60, price: 140 },
              { label: 'Medium Hair', duration: 50, price: 135 },
              { label: 'Short Hair', duration: 40, price: 130 }
            ]
          },
          {
            id: 'ladies-curl-only-add-on',
            name: 'Ladies Hair - Curl Only / Add On',
            options: [
              { label: 'Long Hair', duration: 45, price: 45 },
              { label: 'Medium Hair', duration: 35, price: 35 },
              { label: 'Short Hair', duration: 25, price: 25 }
            ]
          },
          {
            id: 'ladies-ghd-straightening',
            name: 'Ladies - Hair - GHD Straightening',
            options: [
              { label: 'Long Hair', duration: 60, price: 75 },
              { label: 'Medium Hair', duration: 50, price: 65 },
              { label: 'Short Hair', duration: 40, price: 55 }
            ]
          },
          {
            id: 'ladies-rollers-pin-curl',
            name: 'Ladies - Rollers or Pin Curl',
            options: [
              { label: 'Long Hair', duration: 60, price: 55 },
              { label: 'Medium Hair', duration: 45, price: 45 },
              { label: 'Short Hair', duration: 30, price: 25 }
            ]
          },
          {
            id: 'ladies-wet-cut',
            name: 'Ladies - Wet Cut',
            options: [
              { label: 'Long Hair', duration: 45, price: 55 },
              { label: 'Medium Hair', duration: 35, price: 45 },
              { label: 'Short Hair', duration: 25, price: 35 }
            ]
          },
          {
            id: 'ladies-dry-haircut',
            name: 'Ladies - Dry Haircut',
            options: [
              { label: 'Long Hair', duration: 40, price: 45 },
              { label: 'Medium Hair', duration: 30, price: 35 },
              { label: 'Short Hair', duration: 20, price: 25 }
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
            id: 'hair-silk-press-and-trim',
            name: 'Silk Press and Trim',
            options: [
              { label: 'Long Hair', duration: 120, price: 125 },
              { label: 'Medium Hair', duration: 105, price: 110 },
              { label: 'Short Hair', duration: 90, price: 95 }
            ]
          },
          {
            id: 'ladies-hydration-treatment-blow-dry',
            name: 'Ladies - Hydration Treatment and Blow Dry',
            options: [
              { label: 'Long Hair', duration: 90, price: 110 },
              { label: 'Medium Hair', duration: 75, price: 100 },
              { label: 'Short Hair', duration: 60, price: 95 }
            ]
          },
          {
            id: 'ladies-hydration-scalp-treatment-silk-press',
            name: 'Ladies - Hydration, Scalp Treatment, Silk Press',
            options: [
              { label: 'Long Hair', duration: 150, price: 185 },
              { label: 'Medium Hair', duration: 135, price: 165 },
              { label: 'Short Hair', duration: 120, price: 145 }
            ]
          },
          {
            id: 'ladies-protein-hydration-treatment-silk-press',
            name: 'Ladies - Protein, Hydration Treatment & Silk Press',
            options: [
              { label: 'Long Hair', duration: 180, price: 265 },
              { label: 'Medium Hair', duration: 165, price: 245 },
              { label: 'Short Hair', duration: 150, price: 225 }
            ]
          },
          {
            id: 'ladies-hair-bond-repair-treatment-blow-dry',
            name: 'Ladies - Hair Bond Repair Treatment & Blow-Dry',
            options: [
              { label: 'Long Hair', duration: 120, price: 155 },
              { label: 'Medium Hair', duration: 105, price: 145 },
              { label: 'Short Hair', duration: 90, price: 125 }
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
            id: 'olaplex-treatment-blow-dry',
            name: 'Olaplex Treatment with Blow-Dry',
            options: [
              { label: 'Long Hair', duration: 120, price: 185 },
              { label: 'Medium Hair', duration: 105, price: 165 },
              { label: 'Short Hair', duration: 90, price: 145 }
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
              { label: 'Long Hair', duration: 30, price: 65 },
              { label: 'Medium Hair', duration: 25, price: 55 },
              { label: 'Short Hair', duration: 20, price: 45 }
            ]
          },
          {
            id: 'children-cornrows',
            name: 'Children - Cornrows',
            options: [
              { label: 'Long Hair', duration: 40, price: 55 },
              { label: 'Medium Hair', duration: 35, price: 45 },
              { label: 'Short Hair', duration: 30, price: 35 }
            ]
          },
          {
            id: 'children-twists',
            name: 'Children - Twists',
            options: [
              { label: 'Long Hair', duration: 45, price: 65 },
              { label: 'Medium Hair', duration: 40, price: 55 },
              { label: 'Short Hair', duration: 35, price: 45 }
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
            id: 'full-head-hl-cut-blow-dry',
            name: 'Full Head HL + Cut & Blow Dry',
            options: [
              { label: 'Long', duration: 180, price: 260 },
              { label: 'Medium', duration: 150, price: 240 },
              { label: 'Short', duration: 120, price: 220 }
            ]
          },
          {
            id: 'half-head-hl-cut-blow-dry',
            name: 'Half Head HL + Cut & Blow Dry',
            options: [
              { label: 'Long', duration: 150, price: 220 },
              { label: 'Medium', duration: 120, price: 200 },
              { label: 'Short', duration: 90, price: 180 }
            ]
          },
          {
            id: 't-section-hl-cut-blow-dry',
            name: 'T-Section HL + Cut & Blow Dry',
            options: [
              { label: 'Long', duration: 120, price: 160 },
              { label: 'Medium', duration: 90, price: 120 },
              { label: 'Short', duration: 90, price: 120 }
            ]
          },
          {
            id: 'full-head-babylights',
            name: 'Full Head Babylights',
            options: [
              { label: 'Long', duration: 210, price: 290 },
              { label: 'Medium', duration: 180, price: 260 },
              { label: 'Short', duration: 150, price: 240 }
            ]
          },
          {
            id: 'balayage-treat-cut-blow-dry',
            name: 'Balayage + Treat + Cut & Blow Dry',
            options: [
              { label: 'Long', duration: 180, price: 280 },
              { label: 'Medium', duration: 150, price: 240 },
              { label: 'Short', duration: 120, price: 220 }
            ]
          },
          {
            id: 'root-bleach',
            name: 'Root Bleach',
            options: [{ label: 'Standard', duration: 60, price: 75 }]
          },
          {
            id: 'colour-correction',
            name: 'Colour Correction',
            options: [{ label: 'Standard', duration: 240, price: 380 }]
          },
          {
            id: 'afro-colour-treat',
            name: 'Afro Colour + Treat',
            options: [
              { label: 'Short', duration: 150, price: 240 },
              { label: 'Medium', duration: 180, price: 260 },
              { label: 'Long', duration: 210, price: 290 }
            ]
          },
          {
            id: 'toner-blow-dry',
            name: 'Toner + Blow Dry',
            options: [{ label: 'Standard', duration: 60, price: 60 }]
          },
          {
            id: 'add-on-toner',
            name: 'Add-on Toner',
            options: [{ label: 'Standard', duration: 30, price: 35 }]
          },
          {
            id: 'toner-cut-blow-dry',
            name: 'Toner + Cut & Blow Dry',
            options: [{ label: 'Standard', duration: 75, price: 65 }]
          },
          {
            id: 'root-bleach-tone',
            name: 'Root Bleach + Tone',
            options: [{ label: 'Standard', duration: 90, price: 95 }]
          },
          {
            id: 'full-tint-perm-cut-blow-dry',
            name: 'Full Tint Perm + Cut & Blow Dry',
            options: [
              { label: 'Short', duration: 90, price: 110 },
              { label: 'Medium', duration: 75, price: 80 },
              { label: 'Long', duration: 75, price: 80 }
            ]
          },
          {
            id: 'full-tint-semi-cut-blow-dry',
            name: 'Full Tint Semi + Cut & Blow Dry',
            options: [
              { label: 'Medium', duration: 75, price: 80 },
              { label: 'Short', duration: 90, price: 100 },
              { label: 'Long', duration: 60, price: 70 }
            ]
          },
          {
            id: 'airtouch-balayage-cut-blow-dry',
            name: 'AirTouch Balayage + Cut & Blow Dry',
            options: [
              { label: 'Medium', duration: 180, price: 325 },
              { label: 'Short', duration: 150, price: 300 },
              { label: 'Long', duration: 210, price: 350 }
            ]
          },
          {
            id: 'hair-nails-combo',
            name: 'Hair & Nails Combo',
            options: [{ label: 'Standard', duration: 120, price: 180 }]
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
        id: 'hair-extension-removal-refitting',
        title: 'Hair Extension Removal & Refitting Services',
        services: [
          {
            id: 'hollywood-weave-refit-1-row',
            name: 'Hollywood Weave Refit 1 Row',
            options: [{ label: 'Standard', duration: 60, price: 140 }]
          },
          {
            id: 'hollywood-weave-refit-2-3-rows',
            name: 'Hollywood Weave Refit 2–3 Rows',
            options: [{ label: 'Standard', duration: 90, price: 200 }]
          },
          {
            id: 'hollywood-weave-refit-4-5-rows',
            name: 'Hollywood Weave Refit 4–5 Rows',
            options: [{ label: 'Standard', duration: 120, price: 240 }]
          },
          {
            id: 'hollywood-weave-refit-6-7-rows',
            name: 'Hollywood Weave Refit 6–7 Rows',
            options: [{ label: 'Standard', duration: 150, price: 280 }]
          },
          {
            id: 'enhanced-weave-refit',
            name: 'Enhanced Weave Refit',
            options: [{ label: 'Standard', duration: 90, price: 200 }]
          },
          {
            id: 'enhanced-weave-refit-mini',
            name: 'Enhanced Weave Refit Mini',
            options: [{ label: 'Standard', duration: 120, price: 300 }]
          },
          {
            id: 'tape-refit-up-to-6',
            name: 'Tape Refit Up to 6',
            options: [{ label: 'Standard', duration: 60, price: 140 }]
          },
          {
            id: 'tape-refit-up-to-12',
            name: 'Tape Refit Up to 12',
            options: [{ label: 'Standard', duration: 90, price: 200 }]
          },
          {
            id: 'tape-refit-up-to-20',
            name: 'Tape Refit Up to 20',
            options: [{ label: 'Standard', duration: 120, price: 270 }]
          },
          {
            id: 'tape-removal',
            name: 'Tape Removal',
            options: [{ label: 'Standard', duration: 30, price: 50 }]
          },
          {
            id: 'keratin-removal-150-plus',
            name: 'Keratin Removal 150+ pcs',
            options: [{ label: 'Standard', duration: 90, price: 130 }]
          },
          {
            id: 'keratin-removal-up-to-150',
            name: 'Keratin Removal Up to 150',
            options: [{ label: 'Standard', duration: 60, price: 80 }]
          },
          {
            id: 'enhanced-weave-removal',
            name: 'Enhanced Weave Removal',
            options: [{ label: 'Standard', duration: 45, price: 70 }]
          },
          {
            id: 'hollywood-weave-removal',
            name: 'Hollywood Weave Removal',
            options: [{ label: 'Standard', duration: 30, price: 50 }]
          },
          {
            id: 'micro-ring-quick-fix',
            name: 'Micro Ring Quick Fix',
            options: [{ label: 'Standard', duration: 15, price: 10 }]
          },
          {
            id: 'micro-ring-removal',
            name: 'Micro Ring Removal',
            options: [{ label: 'Standard', duration: 30, price: 50 }]
          },
          {
            id: 'micro-ring-refit-100g',
            name: 'Micro Ring Refit 100g',
            options: [{ label: 'Standard', duration: 120, price: 220 }]
          },
          {
            id: 'micro-ring-refit-up-to-150g',
            name: 'Micro Ring Refit Up to 150g',
            options: [{ label: 'Standard', duration: 150, price: 270 }]
          },
          {
            id: 'keratin-refit-up-to-50g',
            name: 'Keratin Refit Up to 50g',
            options: [{ label: 'Standard', duration: 120, price: 270 }]
          },
          {
            id: 'keratin-refit-up-to-100g',
            name: 'Keratin Refit Up to 100g',
            options: [{ label: 'Standard', duration: 150, price: 340 }]
          },
          {
            id: 'keratin-refit-up-to-200g',
            name: 'Keratin Refit Up to 200g',
            options: [{ label: 'Standard', duration: 180, price: 460 }]
          },
          {
            id: 'removal-plus-nutrition',
            name: 'Removal + Nutrition',
            options: [{ label: 'Standard', duration: 60, price: 135 }]
          },
          {
            id: 'custom-clip-ins',
            name: 'Custom Clip-ins',
            options: [{ label: 'Standard', duration: 45, price: 75 }]
          },
          {
            id: 'extension-removal-service',
            name: 'Extension Removal Service',
            options: [{ label: 'Standard', duration: 30, price: 50 }]
          }
        ]
      },
      {
        id: 'hair-extensions-application-only',
        title: 'Hair Extensions Application Only Services',
        services: [
          {
            id: 'hollywood-weave-application-only',
            name: 'Hollywood Weave Application Only',
            options: [
              { label: '1 Row', duration: 60, price: 90 },
              { label: '2–3 Rows', duration: 90, price: 170 },
              { label: '4–5 Rows', duration: 120, price: 210 },
              { label: '5–7 Rows', duration: 150, price: 250 }
            ]
          },
          {
            id: 'tape-extensions-application-only',
            name: 'Tape Extensions Application Only',
            options: [
              { label: 'Up to 6', duration: 45, price: 120 },
              { label: 'Up to 12', duration: 60, price: 180 },
              { label: 'Up to 20', duration: 90, price: 210 }
            ]
          },
          {
            id: 'keratin-bond-application-only',
            name: 'Keratin Bond Application Only',
            options: [
              { label: 'Up to 50g', duration: 90, price: 200 },
              { label: 'Up to 100g', duration: 120, price: 260 },
              { label: 'Up to 200g', duration: 180, price: 380 }
            ]
          },
          {
            id: 'micro-ring-application-only',
            name: 'Micro Ring Application Only',
            options: [
              { label: 'Up to 150g', duration: 120, price: 220 }
            ]
          },
          {
            id: 'enhanced-weave-application-only',
            name: 'Enhanced Weave Application Only',
            options: [{ label: 'Standard', duration: 120, price: 260 }]
          },
          {
            id: 'clip-ins-install-wcbd',
            name: 'Clip-ins Install + W/C/BD',
            options: [
              { label: '8pc', duration: 60, price: 120 },
              { label: '15pc', duration: 75, price: 145 },
              { label: '20pc', duration: 90, price: 155 }
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
