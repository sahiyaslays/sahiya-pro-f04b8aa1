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
  // 1. CONSULTATION/PATCH TEST
  {
    id: 'consultation-patch-test',
    title: 'CONSULTATION/PATCH TEST',
    subcategories: [
      {
        id: 'consultations',
        title: 'Consultations',
        services: [
          {
            id: 'patch-test',
            name: 'Patch Test',
            options: [{ label: '30 min', duration: 30, price: 30 }]
          },
          {
            id: 'colour-consultation',
            name: 'Consultation - Colour',
            options: [{ label: '1 hour', duration: 60, price: 30 }]
          },
          {
            id: 'hair-extensions-consultation-coloured',
            name: 'Hair Extensions Consultation - Coloured Hair',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          },
          {
            id: 'hair-extensions-consultation-cambodian',
            name: 'Hair Extension Consultation - Cambodian Hair',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          },
          {
            id: 'video-consultation',
            name: 'Video Consultation',
            options: [{ label: '1 hour', duration: 60, price: 30 }]
          },
          {
            id: 'hair-therapy-consultation',
            name: 'Hair Therapy Consultation',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          }
        ]
      }
    ]
  },

  // 2. HAIR
  {
    id: 'hair',
    title: 'HAIR',
    subcategories: [
      // Hair Extensions Applications
      {
        id: 'hollywood-weave-application',
        title: 'Hollywood Weave Applications',
        services: [
          {
            id: 'hollywood-weave-1-row',
            name: 'Hollywood Weave 1 Row Application Only',
            options: [{ label: '45 min', duration: 45, price: 90 }]
          },
          {
            id: 'hollywood-weave-2-3-rows',
            name: 'Hollywood Weave 2-3 Rows Application Only',
            options: [{ label: '1h 30min', duration: 90, price: 170 }]
          },
          {
            id: 'hollywood-weave-4-5-rows',
            name: 'Hollywood Weave 4-5 Rows Application Only',
            options: [{ label: '1h 30min', duration: 90, price: 210 }]
          },
          {
            id: 'hollywood-weave-5-7-rows',
            name: 'Hollywood Weave 5-7 Rows Application Only',
            options: [{ label: '2h 30min', duration: 150, price: 250 }]
          }
        ]
      },
      {
        id: 'tape-extensions-application',
        title: 'Tape Hair Extensions Applications',
        services: [
          {
            id: 'tape-extensions-6-tapes',
            name: 'Tape Hair Extensions Application Only - Up To 6 Tapes',
            options: [{ label: '45 min', duration: 45, price: 120 }]
          },
          {
            id: 'tape-extensions-12-tapes',
            name: 'Tape Hair Extensions Application Only - Up To 12 Tapes',
            options: [{ label: '1h 30min', duration: 90, price: 180 }]
          },
          {
            id: 'tape-extensions-20-tapes',
            name: 'Tape Hair Extensions Application Only - Up To 20 Tapes',
            options: [{ label: '2h 30min', duration: 150, price: 210 }]
          }
        ]
      },
      {
        id: 'keratin-bond-application',
        title: 'Keratin Bond Applications',
        services: [
          {
            id: 'keratin-bond-50gr',
            name: 'Keratin Bond Application Only - Up To 50gr',
            options: [{ label: '1h 30min', duration: 90, price: 200 }]
          },
          {
            id: 'keratin-bond-100gr',
            name: 'Keratin Bond Application Only - Up To 100gr',
            options: [{ label: '2 hours', duration: 120, price: 260 }]
          },
          {
            id: 'keratin-bond-200gr',
            name: 'Keratin Bond Application Only - Up To 200gr',
            options: [{ label: '2h 30min', duration: 150, price: 380 }]
          }
        ]
      },
      {
        id: 'micro-ring-application',
        title: 'Micro Ring Applications',
        services: [
          {
            id: 'micro-ring-150gr',
            name: 'Micro Ring Application Only - Up To 150gr',
            options: [{ label: '1h 30min', duration: 90, price: 220 }]
          }
        ]
      },
      {
        id: 'other-extensions-application',
        title: 'Other Extensions',
        services: [
          {
            id: 'enhanced-weave-application',
            name: 'Enhanced Weave Application Only',
            options: [{ label: '3 hours', duration: 180, price: 260 }]
          },
          {
            id: 'clip-ins-8-piece',
            name: 'Clip Ins Installation (8 piece) Wash, Cut & Blowdry',
            options: [{ label: '1h 50min', duration: 110, price: 120 }]
          },
          {
            id: 'clip-ins-15-piece',
            name: 'Clip Ins Installation (15 piece) Wash, Cut & Blowdry',
            options: [{ label: '2 hours', duration: 121, price: 145 }]
          },
          {
            id: 'clip-ins-20-piece',
            name: 'Clip Ins Installation (20 piece) Wash, Cut & Blowdry',
            options: [{ label: '2h 15min', duration: 135, price: 155 }]
          }
        ]
      },
      // Hair Extension Removal & Refitting
      {
        id: 'hollywood-weave-refit',
        title: 'Hollywood Weave Refit',
        services: [
          {
            id: 'hollywood-weave-refit-1-row',
            name: 'Hollywood Weave Refit - 1 Row',
            options: [{ label: '2 hours', duration: 120, price: 140 }]
          },
          {
            id: 'hollywood-weave-refit-2-3-rows',
            name: 'Hollywood Weave Refit - 2-3 Rows',
            options: [{ label: '1 hour', duration: 60, price: 200 }]
          },
          {
            id: 'hollywood-weave-refit-4-5-rows',
            name: 'Hollywood Weave Refit - 4-5 Rows',
            options: [{ label: '1 hour', duration: 60, price: 240 }]
          },
          {
            id: 'hollywood-weave-refit-6-7-rows',
            name: 'Hollywood Weave Refit - 6-7 Rows',
            options: [{ label: '1 hour', duration: 60, price: 280 }]
          }
        ]
      },
      {
        id: 'enhanced-weave-refit',
        title: 'Enhanced Weave Refit',
        services: [
          {
            id: 'enhanced-weave-refit',
            name: 'Enhanced Weave Refit',
            options: [{ label: '1 hour', duration: 60, price: 200 }]
          },
          {
            id: 'enhanced-weave-refit-mini',
            name: 'Enhanced Weave Refit - Mini',
            options: [{ label: '1 hour', duration: 60, price: 300 }]
          }
        ]
      },
      {
        id: 'tape-extensions-refit',
        title: 'Tape Hair Extension Refit',
        services: [
          {
            id: 'tape-refit-6-tapes',
            name: 'Tape Hair Extension Refit - Up To 6 Tapes',
            options: [{ label: '1 hour', duration: 60, price: 140 }]
          },
          {
            id: 'tape-refit-12-tapes',
            name: 'Tape Hair Extension Refit - Up To 12 Tapes',
            options: [{ label: '1 hour', duration: 60, price: 200 }]
          },
          {
            id: 'tape-refit-20-tapes',
            name: 'Tape Hair Extension Refit - Up To 20 Tapes',
            options: [{ label: '1 hour', duration: 60, price: 270 }]
          },
          {
            id: 'tape-removal',
            name: 'Tape Removal',
            options: [{ label: '1 hour', duration: 60, price: 50 }]
          }
        ]
      },
      {
        id: 'keratin-bond-refit-removal',
        title: 'Keratin Bond Refit & Removal',
        services: [
          {
            id: 'keratin-removal-150plus',
            name: 'Keratin Bond Hair Extension Removal - 150+ Pcs',
            options: [{ label: '1h 30min', duration: 90, price: 130 }]
          },
          {
            id: 'keratin-removal-up-to-150',
            name: 'Keratin Bond Hair Extension Removal - Up To 150 Pcs',
            options: [{ label: '1h 30min', duration: 90, price: 80 }]
          },
          {
            id: 'keratin-refit-50gr',
            name: 'Keratin Bond Refit - Up To 50gr',
            options: [{ label: '2 hours', duration: 120, price: 270 }]
          },
          {
            id: 'keratin-refit-100gr',
            name: 'Keratin Bond Refit - Up To 100gr',
            options: [{ label: '2 hours', duration: 120, price: 340 }]
          },
          {
            id: 'keratin-refit-200gr',
            name: 'Keratin Bond Refit - Up To 200gr',
            options: [{ label: '2 hours', duration: 120, price: 460 }]
          }
        ]
      },
      {
        id: 'micro-ring-refit-removal',
        title: 'Micro Ring Refit & Removal',
        services: [
          {
            id: 'micro-ring-refit',
            name: 'Micro Ring Refit',
            options: [{ label: '2 hours', duration: 120, price: 10 }]
          },
          {
            id: 'micro-ring-removal',
            name: 'Micro Ring Hair Extension Removal',
            options: [{ label: '1 hour', duration: 60, price: 50 }]
          },
          {
            id: 'micro-ring-refit-100gr',
            name: 'Micro Ring Refit - 100 Grams',
            options: [{ label: '2 hours', duration: 120, price: 220 }]
          },
          {
            id: 'micro-ring-refit-150gr',
            name: 'Micro Ring Refit - Up To 150gr',
            options: [{ label: '2 hours', duration: 120, price: 270 }]
          }
        ]
      },
      {
        id: 'other-removal-services',
        title: 'Other Removal Services',
        services: [
          {
            id: 'enhanced-weave-removal',
            name: 'Enhanced Weave Removal',
            options: [{ label: '15 min', duration: 15, price: 70 }]
          },
          {
            id: 'hollywood-weave-removal',
            name: 'Hollywood Weave Hair Extension Removal',
            options: [{ label: '30 min', duration: 30, price: 50 }]
          },
          {
            id: 'extension-removal-nutrition',
            name: 'Hair Extension Removal & Essential Nutrition',
            options: [{ label: '2 hours', duration: 120, price: 135 }]
          },
          {
            id: 'made-to-measure-clip-ins',
            name: 'Made-to-measure Clip Ins',
            options: [{ label: '2 hours', duration: 120, price: 75 }]
          },
          {
            id: 'extension-removal-services',
            name: 'Hair Extension Removal Services',
            options: [{ label: '2 hours', duration: 120, price: 50 }]
          }
        ]
      },
      // Hair Extensions, Weaves & Wigs
      {
        id: 'weaves',
        title: 'Weaves',
        services: [
          {
            id: 'traditional-weave',
            name: "Ladies' - Traditional Weave (signature look)",
            options: [{ label: '10 min', duration: 10, price: 125 }]
          },
          {
            id: 'versatile-weave',
            name: "Ladies' - Versatile Weave (signature look)",
            options: [{ label: '2 hours', duration: 120, price: 165 }]
          },
          {
            id: 'weave-3-part-sew-in',
            name: "Ladies' - Weave - 3 part Sew-in",
            options: [{ label: '2 hours', duration: 120, price: 185 }]
          },
          {
            id: 'weave-maintenance',
            name: 'Ladies - Weave maintenance',
            options: [{ label: '3 hours', duration: 180, price: 95 }]
          },
          {
            id: 'closure-sew-in',
            name: 'Ladies - Closure Sew-in',
            options: [{ label: '2h 30min', duration: 150, price: 180 }]
          },
          {
            id: 'frontal-sew-in',
            name: 'Ladies - Frontal Sew-in',
            options: [{ label: '3h 30min', duration: 210, price: 195 }]
          }
        ]
      },
      {
        id: 'closure-installs',
        title: 'Closure Installs',
        services: [
          {
            id: 'closure-install',
            name: 'Closure Install',
            options: [{ label: '3h 30min', duration: 210, price: 160 }]
          },
          {
            id: '2x5-closure-install',
            name: '2x5 Closure Install',
            options: [{ label: '3h 15min', duration: 195, price: 180 }]
          },
          {
            id: '2x5-closure-behind-hairline',
            name: '2x5 Closure Install (behind the hairline)',
            options: [{ label: '3h 15min', duration: 195, price: 180 }]
          }
        ]
      },
      // Hair Colour & Treatments
      {
        id: 'highlights',
        title: 'Highlights',
        services: [
          {
            id: 'full-head-highlights-toner-cut-blow',
            name: 'Full Head Highlights, Toner with Haircut & Blow Dry',
            options: [
              { label: 'Short', duration: 135, price: 270 },
              { label: 'Medium', duration: 150, price: 290 },
              { label: 'Long', duration: 180, price: 310 }
            ]
          },
          {
            id: 'half-head-highlights-cut-blow',
            name: 'Half Head Highlights with Haircut & Blow Dry',
            options: [
              { label: 'Short', duration: 120, price: 190 },
              { label: 'Medium', duration: 120, price: 210 },
              { label: 'Long', duration: 120, price: 230 }
            ]
          },
          {
            id: 't-section-highlights-cut-blow',
            name: 'T-Section Highlights with Haircut & Blow Dry',
            options: [
              { label: 'Short', duration: 90, price: 130 },
              { label: 'Medium', duration: 90, price: 130 },
              { label: 'Long', duration: 120, price: 170 }
            ]
          },
          {
            id: 'full-head-babylights',
            name: "Ladies' - Full Head Babylights",
            options: [
              { label: 'Short', duration: 150, price: 250 },
              { label: 'Medium', duration: 180, price: 270 },
              { label: 'Long', duration: 210, price: 300 }
            ]
          }
        ]
      },
      {
        id: 'balayage',
        title: 'Balayage',
        services: [
          {
            id: 'balayage-treatment-cut-blow',
            name: 'Balayage & Treatment with Haircut & Blow Dry',
            options: [
              { label: 'Short', duration: 135, price: 220 },
              { label: 'Medium', duration: 135, price: 360 },
              { label: 'Long', duration: 135, price: 400 }
            ]
          },
          {
            id: 'air-touch-balayage-cut-blow',
            name: 'Air Touch Balayage, Cut and Blowdry',
            options: [
              { label: 'Short', duration: 135, price: 450 },
              { label: 'Medium', duration: 150, price: 550 },
              { label: 'Long', duration: 180, price: 650 }
            ]
          }
        ]
      },
      {
        id: 'colour-tint',
        title: 'Colour & Tint',
        services: [
          {
            id: 'root-bleach',
            name: "Ladies' - Root Bleach",
            options: [{ label: '2 hours', duration: 120, price: 85 }]
          },
          {
            id: 'root-bleach-tone',
            name: 'Ladies - Root Bleach & Tone',
            options: [{ label: '1h 30min', duration: 90, price: 150 }]
          },
          {
            id: 'colour-correction',
            name: 'Ladies - Colour Correction',
            options: [{ label: '2h 15min', duration: 135, price: 600 }]
          },
          {
            id: 'afro-hair-colouring-treatment',
            name: 'Ladies - Afro Hair Colouring & Treatment',
            options: [
              { label: 'Short', duration: 120, price: 250 },
              { label: 'Medium', duration: 120, price: 270 },
              { label: 'Long', duration: 120, price: 300 }
            ]
          },
          {
            id: 'toner-blow-dry',
            name: "Ladies' - Toner with Blow Dry",
            options: [
              { label: 'Short', duration: 90, price: 115 },
              { label: 'Medium', duration: 90, price: 125 },
              { label: 'Long', duration: 90, price: 135 }
            ]
          },
          {
            id: 'add-on-toner',
            name: "Ladies' - Add on Toner",
            options: [{ label: '1h 30min', duration: 90, price: 65 }]
          },
          {
            id: 'toner-cut-blow-dry',
            name: "Ladies' - Toner with Haircut & Blow Dry",
            options: [{ label: '1h 30min', duration: 90, price: 75 }]
          },
          {
            id: 'full-tint-permanent-cut-blow',
            name: 'Full Tint Permanent Colour with Haircut & Blow Dry',
            options: [
              { label: 'Short', duration: 135, price: 120 },
              { label: 'Medium', duration: 135, price: 140 },
              { label: 'Long', duration: 135, price: 160 }
            ]
          },
          {
            id: 'full-tint-semi-permanent-cut-blow',
            name: 'Full Tint Semi-Permanent Colour, Haircut & Blow Dry',
            options: [
              { label: 'Short', duration: 105, price: 120 },
              { label: 'Medium', duration: 105, price: 140 },
              { label: 'Long', duration: 105, price: 160 }
            ]
          }
        ]
      },
      // Ladies Haircut & Hairdressing
      {
        id: 'wash-cut-blow',
        title: 'Wash, Cut & Blow Dry',
        services: [
          {
            id: 'wash-haircut-blow-dry',
            name: "Ladies' - Wash, Haircut & Blow Dry",
            options: [
              { label: 'Short', duration: 60, price: 85 },
              { label: 'Medium', duration: 75, price: 95 },
              { label: 'Long', duration: 90, price: 105 }
            ]
          },
          {
            id: 'wash-cut-blow-afro',
            name: 'Wash, Cut & Blowdry (Afro)',
            options: [
              { label: 'Short', duration: 45, price: 75 },
              { label: 'Medium', duration: 60, price: 85 },
              { label: 'Long', duration: 75, price: 95 }
            ]
          }
        ]
      },
      {
        id: 'blow-dry',
        title: 'Blow Dry',
        services: [
          {
            id: 'blow-dry',
            name: "Ladies' - Blow Dry",
            options: [
              { label: 'Short', duration: 30, price: 35 },
              { label: 'Medium', duration: 30, price: 45 },
              { label: 'Long', duration: 30, price: 55 }
            ]
          },
          {
            id: 'wash-blow-dry',
            name: "Ladies' - Wash & Blow Dry",
            options: [
              { label: 'Short', duration: 30, price: 65 },
              { label: 'Medium', duration: 50, price: 75 },
              { label: 'Long', duration: 60, price: 85 }
            ]
          },
          {
            id: 'curly-blow-dry',
            name: "Ladies' - Curly Blow Dry",
            options: [
              { label: 'Short', duration: 30, price: 65 },
              { label: 'Medium', duration: 30, price: 75 },
              { label: 'Long', duration: 30, price: 85 }
            ]
          },
          {
            id: 'bouncy-blow-dry',
            name: "Ladies' - Bouncy Blow Dry",
            options: [
              { label: 'Short', duration: 30, price: 65 },
              { label: 'Medium', duration: 30, price: 75 },
              { label: 'Long', duration: 30, price: 85 }
            ]
          },
          {
            id: 'wash-blow-dry-afro',
            name: "Ladies' - Wash & Blow Dry (Afro Hair)",
            options: [
              { label: 'Short', duration: 60, price: 55 },
              { label: 'Medium', duration: 60, price: 65 },
              { label: 'Long', duration: 60, price: 75 }
            ]
          }
        ]
      },
      {
        id: 'styling',
        title: 'Styling',
        services: [
          {
            id: 'ghd-curls',
            name: "Ladies' - GHD Curls",
            options: [
              { label: 'Short', duration: 15, price: 25 },
              { label: 'Medium', duration: 30, price: 35 },
              { label: 'Long', duration: 30, price: 45 }
            ]
          },
          {
            id: 'ghd-straightening',
            name: "Ladies' - GHD Straightening",
            options: [
              { label: 'Short', duration: 30, price: 55 },
              { label: 'Medium', duration: 30, price: 65 },
              { label: 'Long', duration: 30, price: 75 }
            ]
          },
          {
            id: 'rollers-pin-curl',
            name: "Ladies' - Rollers Or Pin Curl",
            options: [
              { label: 'Short', duration: 30, price: 25 },
              { label: 'Medium', duration: 45, price: 35 },
              { label: 'Long', duration: 45, price: 45 }
            ]
          }
        ]
      },
      {
        id: 'haircut',
        title: 'Haircut',
        services: [
          {
            id: 'wet-haircut',
            name: "Ladies' - Wet Haircut",
            options: [
              { label: 'Short', duration: 30, price: 35 },
              { label: 'Medium', duration: 30, price: 45 },
              { label: 'Long', duration: 30, price: 55 }
            ]
          },
          {
            id: 'dry-haircut',
            name: "Ladies' - Dry Haircut",
            options: [
              { label: 'Short', duration: 30, price: 25 },
              { label: 'Medium', duration: 30, price: 35 },
              { label: 'Long', duration: 30, price: 45 }
            ]
          }
        ]
      },
      // Hair Treatments
      {
        id: 'brazilian-keratin',
        title: 'Brazilian & Keratin Treatments',
        services: [
          {
            id: 'brazilian-blow-dry',
            name: "Ladies' - Brazilian Blow Dry",
            options: [
              { label: 'Short', duration: 90, price: 95 },
              { label: 'Medium', duration: 105, price: 135 },
              { label: 'Long', duration: 120, price: 155 }
            ]
          },
          {
            id: 'keratin-treatment',
            name: "Ladies' - Keratin Treatment",
            options: [
              { label: 'Short', duration: 90, price: 125 },
              { label: 'Medium', duration: 120, price: 145 },
              { label: 'Long', duration: 105, price: 185 }
            ]
          },
          {
            id: 'keratin-straightening-trim',
            name: "Ladies' - Keratin Straightening & Trim",
            options: [
              { label: 'Short', duration: 180, price: 225 },
              { label: 'Medium', duration: 180, price: 245 },
              { label: 'Long', duration: 180, price: 265 }
            ]
          }
        ]
      },
      {
        id: 'hydration-treatments',
        title: 'Hydration & Bond Repair',
        services: [
          {
            id: 'hair-hydration-blowdry',
            name: "Ladies' - Hair Hydration Treatment & Blowdry",
            options: [
              { label: 'Short', duration: 15, price: 95 },
              { label: 'Medium', duration: 15, price: 125 },
              { label: 'Long', duration: 15, price: 145 }
            ]
          },
          {
            id: 'hair-bond-repair-blowdry',
            name: 'Hair Bond Repair Treatment & Blowdry',
            options: [
              { label: 'Short', duration: 30, price: 125 },
              { label: 'Medium', duration: 30, price: 145 },
              { label: 'Long', duration: 30, price: 155 }
            ]
          }
        ]
      },
      {
        id: 'olaplex-treatments',
        title: 'Olaplex Treatments',
        services: [
          {
            id: 'olaplex-addon-blowdry',
            name: 'Add On - Olaplex Treatment with blowdry',
            options: [
              { label: 'Short', duration: 15, price: 145 },
              { label: 'Medium', duration: 15, price: 165 },
              { label: 'Long', duration: 15, price: 185 }
            ]
          },
          {
            id: 'olaplex-cut-blow-dry',
            name: "Ladies' - Olaplex Treatment with Haircut & Blow Dry",
            options: [
              { label: 'Short', duration: 60, price: 165 },
              { label: 'Medium', duration: 60, price: 185 },
              { label: 'Long', duration: 60, price: 205 }
            ]
          }
        ]
      },
      {
        id: 'relaxer-straightening',
        title: 'Relaxer & Straightening',
        services: [
          {
            id: 'afro-relaxer-blowdry-trim',
            name: "Ladies' - Afro Relaxer, Blow dry & Trim",
            options: [
              { label: 'Short', duration: 30, price: 145 },
              { label: 'Medium', duration: 30, price: 150 },
              { label: 'Long', duration: 30, price: 165 }
            ]
          },
          {
            id: 'japanese-momoko-straightening',
            name: "Ladies' - Japanese Momoko Hair Straightening",
            options: [
              { label: 'Short', duration: 180, price: 325 },
              { label: 'Medium', duration: 180, price: 345 },
              { label: 'Long', duration: 180, price: 355 }
            ]
          },
          {
            id: 'japanese-straightening',
            name: 'Japanese Straightening',
            options: [
              { label: 'Short', duration: 180, price: 450 },
              { label: 'Medium', duration: 15, price: 550 },
              { label: 'Long', duration: 240, price: 650 }
            ]
          }
        ]
      },
      // Silk Press & Treatments
      {
        id: 'silk-press',
        title: 'Silk Press',
        services: [
          {
            id: 'silk-press-trim',
            name: 'Silk Press + Trim',
            options: [
              { label: 'Short', duration: 90, price: 105 },
              { label: 'Medium', duration: 90, price: 120 },
              { label: 'Long', duration: 75, price: 135 }
            ]
          },
          {
            id: 'trim',
            name: "Ladies' - Trim",
            options: [{ label: '1h 30min', duration: 90, price: 25 }]
          }
        ]
      },
      {
        id: 'hydration-scalp-silk-press',
        title: 'Hydration & Scalp Treatment + Silk Press',
        services: [
          {
            id: 'hydration-scalp-silk-press',
            name: "Ladies' - Hydration, Scalp Treatment, Silk Press",
            options: [
              { label: 'Short', duration: 105, price: 115 },
              { label: 'Medium', duration: 120, price: 145 },
              { label: 'Long', duration: 135, price: 165 }
            ]
          },
          {
            id: 'hydration-protein-scalp-silk-press',
            name: "Ladies' - Hydration, Protein, Scalp Treatment, Silk Press",
            options: [
              { label: 'Short', duration: 15, price: 280 },
              { label: 'Medium', duration: 15, price: 300 },
              { label: 'Long', duration: 15, price: 320 }
            ]
          },
          {
            id: 'protein-hydration-silk-press',
            name: 'Protein, Hydration Treatment & Silk press',
            options: [
              { label: 'Short', duration: 60, price: 225 },
              { label: 'Medium', duration: 60, price: 245 },
              { label: 'Long', duration: 60, price: 265 }
            ]
          }
        ]
      },
      // Braids, Cornrows & Twists - Ladies
      {
        id: 'cornrows-stitch',
        title: 'Cornrows Stitch Braids',
        services: [
          {
            id: 'cornrows-stitch-large',
            name: "Ladies' - Cornrows Stitch Braids (large 4+)",
            options: [{ label: '1h 30min', duration: 90, price: 65 }]
          },
          {
            id: 'cornrows-stitch-medium',
            name: "Ladies' - Cornrows Stitch Braids (medium 8+)",
            options: [{ label: '1h 30min', duration: 90, price: 75 }]
          },
          {
            id: 'cornrows-stitch-small',
            name: "Ladies' - Cornrows Stitch Braids (small 10+)",
            options: [{ label: '1h 30min', duration: 90, price: 85 }]
          }
        ]
      },
      {
        id: 'fulani-braids',
        title: 'Fulani Braids',
        services: [
          {
            id: 'fulani-braids',
            name: "Ladies' - Fulani Braids",
            options: [
              { label: 'Large', duration: 180, price: 95 },
              { label: 'Medium', duration: 180, price: 125 },
              { label: 'Small', duration: 180, price: 145 }
            ]
          }
        ]
      },
      {
        id: 'box-braids-knotless',
        title: 'Box Braids / Knotless Braids',
        services: [
          {
            id: 'medium-box-braids-knotless',
            name: "Ladies' - Medium length Box Braids/Knotless Braids",
            options: [
              { label: 'Large', duration: 180, price: 115 },
              { label: 'Medium', duration: 180, price: 145 },
              { label: 'Small', duration: 180, price: 185 },
              { label: 'Extra Small', duration: 180, price: 200 }
            ]
          },
          {
            id: 'long-box-braids-knotless',
            name: "Ladies' - Long length Box Braids/Knotless Braids",
            options: [
              { label: 'Large', duration: 180, price: 125 },
              { label: 'Medium', duration: 180, price: 195 },
              { label: 'Small', duration: 180, price: 195 },
              { label: 'Extra Small', duration: 180, price: 215 }
            ]
          }
        ]
      },
      {
        id: 'freestyle-cornrows',
        title: 'Freestyle Cornrows',
        services: [
          {
            id: 'freestyle-cornrows',
            name: "Ladies' - Freestyle Cornrows",
            options: [
              { label: 'Short', duration: 90, price: 95 },
              { label: 'Medium', duration: 90, price: 105 },
              { label: 'Long', duration: 90, price: 115 }
            ]
          }
        ]
      },
      // Braids, Cornrows & Twists - Men
      {
        id: 'men-afro-braids',
        title: 'Men - Afro Braids',
        services: [
          {
            id: 'men-afro-braids',
            name: 'Men - Afro Braids',
            options: [
              { label: 'Short', duration: 180, price: 55 },
              { label: 'Small', duration: 180, price: 65 },
              { label: 'Medium', duration: 180, price: 75 }
            ]
          }
        ]
      },
      {
        id: 'men-stitch-cornrows',
        title: 'Men - Stitch Cornrows Braids',
        services: [
          {
            id: 'men-stitch-cornrows',
            name: 'Men - Stitch Cornrows Braids',
            options: [
              { label: 'Extra Short', duration: 90, price: 75 },
              { label: 'Short', duration: 90, price: 85 },
              { label: 'Medium', duration: 90, price: 95 }
            ]
          }
        ]
      },
      {
        id: 'men-twists',
        title: 'Men - Twists',
        services: [
          {
            id: 'men-twists',
            name: 'Men - Twists',
            options: [
              { label: 'Extra Short', duration: 180, price: 45 },
              { label: 'Short', duration: 180, price: 55 },
              { label: 'Medium', duration: 180, price: 65 }
            ]
          }
        ]
      },
      // Children Haircuts
      {
        id: 'children-cuts',
        title: 'Children Haircuts',
        services: [
          {
            id: 'children-wash-cut-blow-dry',
            name: 'Children - Wash Haircut & Blow-Dry',
            options: [{ label: '30 min', duration: 30, price: 35 }]
          },
          {
            id: 'children-dry-haircut',
            name: 'Children - Dry Haircut',
            options: [{ label: '20 min', duration: 20, price: 25 }]
          }
        ]
      },
      // Children Braids
      {
        id: 'children-braids',
        title: 'Children Braids, Cornrows & Twists',
        services: [
          {
            id: 'children-cornrows',
            name: 'Children - Cornrows',
            options: [
              { label: 'Short', duration: 30, price: 55 },
              { label: 'Medium', duration: 30, price: 65 },
              { label: 'Long', duration: 40, price: 75 }
            ]
          },
          {
            id: 'children-twists',
            name: 'Children - Twists',
            options: [
              { label: 'Short', duration: 25, price: 25 },
              { label: 'Medium', duration: 30, price: 35 },
              { label: 'Long', duration: 30, price: 45 }
            ]
          },
          {
            id: 'children-afro-braids',
            name: 'Children - Afro Braids',
            options: [
              { label: 'Short', duration: 25, price: 25 },
              { label: 'Medium', duration: 25, price: 35 },
              { label: 'Long', duration: 30, price: 45 }
            ]
          }
        ]
      },
      // Locs & Interlock
      {
        id: 'starter-locs',
        title: 'Starting / Starter Locs',
        services: [
          {
            id: 'starter-locs',
            name: 'Starting / Starter Locs',
            options: [
              { label: 'Small', duration: 120, price: 0 },
              { label: 'Medium', duration: 90, price: 0 },
              { label: 'Large', duration: 60, price: 0 }
            ]
          }
        ]
      },
      {
        id: 'retwist-style',
        title: 'Re-twist & Style',
        services: [
          {
            id: 'retwist-style',
            name: 'Re-twist & Style',
            options: [
              { label: 'Small', duration: 120, price: 0 },
              { label: 'Medium', duration: 90, price: 0 },
              { label: 'Large', duration: 75, price: 0 }
            ]
          },
          {
            id: 'retwist-two-strand',
            name: 'Re-twist (with two-strand/rope twists)',
            options: [
              { label: 'Small', duration: 150, price: 0 },
              { label: 'Medium', duration: 120, price: 0 },
              { label: 'Large', duration: 90, price: 0 }
            ]
          },
          {
            id: 'wash-retwist-style',
            name: 'Wash, Retwist & Style',
            options: [
              { label: 'Small', duration: 150, price: 0 },
              { label: 'Medium', duration: 120, price: 0 },
              { label: 'Large', duration: 90, price: 0 }
            ]
          },
          {
            id: 'wash-retwist',
            name: 'Wash & Retwist',
            options: [
              { label: 'Small', duration: 120, price: 0 },
              { label: 'Medium', duration: 90, price: 0 },
              { label: 'Large', duration: 75, price: 0 }
            ]
          }
        ]
      },
      {
        id: 'interlock',
        title: 'Interlock',
        services: [
          {
            id: 'interlock',
            name: 'Interlock',
            options: [
              { label: 'Small', duration: 150, price: 0 },
              { label: 'Medium', duration: 120, price: 0 },
              { label: 'Large', duration: 90, price: 0 }
            ]
          },
          {
            id: 'interlock-styling',
            name: 'Interlock & Styling',
            options: [
              { label: 'Small', duration: 165, price: 0 },
              { label: 'Medium', duration: 120, price: 0 },
              { label: 'Large', duration: 90, price: 0 }
            ]
          },
          {
            id: 'wash-interlock',
            name: 'Wash & Interlock',
            options: [
              { label: 'Small', duration: 180, price: 0 },
              { label: 'Medium', duration: 150, price: 0 },
              { label: 'Large', duration: 120, price: 0 }
            ]
          },
          {
            id: 'wash-interlock-style',
            name: 'Wash, Interlock & Style',
            options: [
              { label: 'Small', duration: 210, price: 0 },
              { label: 'Medium', duration: 180, price: 0 },
              { label: 'Large', duration: 150, price: 0 }
            ]
          }
        ]
      },
      {
        id: 'acv-detox',
        title: 'ACV Detox',
        services: [
          {
            id: 'acv-detox-treatment',
            name: 'ACV Detox Treatment',
            options: [{ label: '30 min', duration: 30, price: 0 }]
          },
          {
            id: 'retwist-acv-detox',
            name: 'Retwist & ACV Detox Treatment',
            options: [
              { label: 'Small', duration: 180, price: 0 },
              { label: 'Medium', duration: 150, price: 0 },
              { label: 'Large', duration: 90, price: 0 }
            ]
          }
        ]
      },
      // Training Days
      {
        id: 'training',
        title: 'Training Courses',
        services: [
          {
            id: 'hair-extensions-training',
            name: 'Hair Extensions Day Training',
            options: [{ label: '6h 15min', duration: 375, price: 1000 }]
          },
          {
            id: 'highlight-training',
            name: 'Highlight Day Training',
            options: [{ label: '6h 15min', duration: 375, price: 550 }]
          },
          {
            id: 'silk-press-training',
            name: 'Silk Press Day Training',
            options: [{ label: '4h 15min', duration: 255, price: 350 }]
          },
          {
            id: 'balayage-training',
            name: 'Balayage Day Training',
            options: [{ label: '6h 30min', duration: 390, price: 500 }]
          }
        ]
      },
      // Hair & Nails Combo
      {
        id: 'combo',
        title: 'Combo',
        services: [
          {
            id: 'hair-nails-combo',
            name: 'Hair and Nails Combo',
            options: [{ label: '4 hours', duration: 240, price: 180 }]
          }
        ]
      }
    ]
  },

  // 3. NAILS
  {
    id: 'nails',
    title: 'NAILS',
    subcategories: [
      {
        id: 'manicures',
        title: 'Manicures',
        services: [
          {
            id: 'gel-shellac-manicure',
            name: 'GEL - Shellac Manicure',
            options: [{ label: '1h 30min', duration: 90, price: 25 }]
          },
          {
            id: 'biab-gel-hands',
            name: 'BIAB Gel Hands',
            options: [{ label: '1h 30min', duration: 90, price: 30 }]
          }
        ]
      },
      {
        id: 'pedicures',
        title: 'Pedicures',
        services: [
          {
            id: 'standard-pedicure-gel-dry',
            name: 'Standard Pedicure gel - DRY',
            options: [{ label: '1h 20min', duration: 80, price: 25 }]
          },
          {
            id: 'advanced-pedicure-gel-dry',
            name: 'Advanced Pedicure gel - DRY',
            options: [{ label: '1h 20min', duration: 80, price: 44 }]
          },
          {
            id: 'deluxe-pedicure',
            name: 'Deluxe Pedicure',
            options: [{ label: '2 hours', duration: 120, price: 50 }]
          },
          {
            id: 'standard-pedicure',
            name: 'Standard Pedicure',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          }
        ]
      },
      {
        id: 'acrylic-extensions',
        title: 'Acrylic Extensions',
        services: [
          {
            id: 'acrylic-full-set-naked',
            name: 'Nail Extensions - Full Set Acrylic (naked full set)',
            options: [{ label: '1h 30min', duration: 90, price: 35 }]
          },
          {
            id: 'acrylic-full-set-toes',
            name: 'Nail Extensions - Full Set Acrylic (Naked Full set Toes)',
            options: [{ label: '1h 15min', duration: 75, price: 45 }]
          },
          {
            id: 'acrylic-french-tip',
            name: 'Nail Extensions - Full Set Acrylic (French Tip)',
            options: [{ label: '1h 40min', duration: 100, price: 45 }]
          },
          {
            id: 'acrylic-with-design',
            name: 'Nail Extensions - Full Set Acrylic with design',
            options: [{ label: '1 hour', duration: 60, price: 50 }]
          },
          {
            id: 'acrylic-big-toes',
            name: 'Nail Extensions - Acrylic - Big Toes',
            options: [{ label: '45 min', duration: 45, price: 10 }]
          },
          {
            id: 'acrylic-infills',
            name: 'Nail Extensions - Acrylic Infills',
            options: [{ label: '45 min', duration: 45, price: 35 }]
          },
          {
            id: 'acrylic-removal-reapplication',
            name: 'Nail Extensions - Acrylic Removal & Reapplication',
            options: [{ label: '1 hour', duration: 60, price: 65 }]
          }
        ]
      },
      {
        id: 'gel-extensions',
        title: 'Gel Extensions',
        services: [
          {
            id: 'gel-biab-full-set',
            name: 'Nail Extensions - Full Set Gel / Biab',
            options: [{ label: '1 hour', duration: 60, price: 35 }]
          },
          {
            id: 'gel-white-tips',
            name: 'Nail Extensions - Gel White Tips',
            options: [{ label: '1 hour', duration: 60, price: 45 }]
          },
          {
            id: 'gel-removal-reapplication',
            name: 'Nail Extensions - Gel Removal & Reapplication',
            options: [{ label: '1 hour', duration: 60, price: 55 }]
          },
          {
            id: 'bio-sculpture-gel-full-set',
            name: 'Nail Extensions - Full Set Bio Sculpture Gel',
            options: [{ label: '1 hour', duration: 60, price: 45 }]
          },
          {
            id: 'gel-sculpture-infills',
            name: 'Nail Extensions - GEL Sculpture Infills',
            options: [{ label: '45 min', duration: 45, price: 35 }]
          },
          {
            id: 'gel-biab-infills',
            name: 'Nail Extensions - Gel/ Biab Infills',
            options: [{ label: '45 min', duration: 45, price: 30 }]
          }
        ]
      },
      {
        id: 'specialty-extensions',
        title: 'Specialty Extensions',
        services: [
          {
            id: 'pink-white-full-set',
            name: 'Nail Extensions - Full Set Pink & White',
            options: [{ label: '1 hour', duration: 60, price: 48 }]
          },
          {
            id: 'ombre-full-set',
            name: 'Nail Extensions - Full Set Ombre',
            options: [{ label: '1 hour', duration: 60, price: 48 }]
          },
          {
            id: 'pink-white-infills',
            name: 'Nail Extensions - Pink & White Infills',
            options: [{ label: '45 min', duration: 45, price: 38 }]
          },
          {
            id: 'ombre-infills',
            name: 'Nail Extensions - Ombre Infills',
            options: [{ label: '45 min', duration: 45, price: 35 }]
          }
        ]
      },
      {
        id: 'nail-removal',
        title: 'Nail Removal',
        services: [
          {
            id: 'nail-removal',
            name: 'Nail Extensions - Removal',
            options: [{ label: '30 min', duration: 30, price: 15 }]
          }
        ]
      }
    ]
  },

  // 4. FACIALS
  {
    id: 'facials',
    title: 'FACIALS',
    subcategories: [
      {
        id: 'signature-facials',
        title: 'Signature Facials',
        services: [
          {
            id: 'facial-classic',
            name: 'Facial - Classic',
            options: [{ label: '1 hour', duration: 60, price: 145 }]
          },
          {
            id: 'facial-eye-treatment',
            name: 'Facial - Eye Treatment',
            options: [{ label: '1 hour', duration: 60, price: 120 }]
          },
          {
            id: 'facial-dermalogica',
            name: 'Facial - Dermalogica',
            options: [{ label: '1h 50min', duration: 110, price: 150 }]
          },
          {
            id: 'facial-gold',
            name: 'Facial - Gold',
            options: [{ label: '1 hour', duration: 60, price: 140 }]
          },
          {
            id: 'facial-hydrating',
            name: 'Facial - Hydrating',
            options: [{ label: '1 hour', duration: 60, price: 95 }]
          },
          {
            id: 'facial-deep-cleansing',
            name: 'Facial - Deep Cleansing',
            options: [{ label: '2 hours', duration: 120, price: 180 }]
          },
          {
            id: 'facial-anti-ageing',
            name: 'Facial - Anti-Ageing',
            options: [{ label: '2 hours', duration: 120, price: 220 }]
          }
        ]
      },
      {
        id: 'skin-treatments',
        title: 'Skin Treatments',
        services: [
          {
            id: 'facial-skin-peel',
            name: 'Facial - Skin Peel',
            options: [{ label: '1 hour', duration: 60, price: 75 }]
          },
          {
            id: 'facial-microdermabrasion',
            name: 'Facial - Microdermabrasion',
            options: [{ label: '1h 30min', duration: 90, price: 120 }]
          },
          {
            id: 'facial-dermaplaning',
            name: 'Facial - Dermaplaning',
            options: [{ label: '1h 45min', duration: 105, price: 95 }]
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
            id: 'facial-chemical-peel',
            name: 'Facial - Chemical Peel',
            options: [{ label: '1 hour', duration: 60, price: 70 }]
          }
        ]
      },
      {
        id: 'advanced-facials',
        title: 'Advanced Facials',
        services: [
          {
            id: 'facial-radio-frequency',
            name: 'Facial - Radio Frequency Skin Tightening',
            options: [{ label: '2h 50min', duration: 170, price: 350 }]
          },
          {
            id: 'facial-led-light',
            name: 'Facial - LED Light Therapy',
            options: [{ label: '1h 20min', duration: 80, price: 110 }]
          },
          {
            id: 'facial-skin-rejuvenation',
            name: 'Facial - Skin Rejuvenation',
            options: [{ label: '2h 45min', duration: 165, price: 290 }]
          },
          {
            id: 'facial-laser-rejuvenation',
            name: 'Facial - Laser Skin Rejuvenation',
            options: [{ label: '2h 45min', duration: 165, price: 290 }]
          },
          {
            id: 'facial-pigmentation',
            name: 'Facial - Pigmentation Treatment',
            options: [{ label: '1h 45min', duration: 105, price: 150 }]
          }
        ]
      },
      {
        id: 'caci-facials',
        title: 'CACI Facials',
        services: [
          {
            id: 'facial-caci-face-lift',
            name: 'Facial - CACI Non-Surgical Face Lift',
            options: [{ label: '1h 30min', duration: 90, price: 95 }]
          },
          {
            id: 'facial-caci-jowl-lift',
            name: 'Facial - CACI Jowl Lift',
            options: [{ label: '1 hour', duration: 60, price: 45 }]
          },
          {
            id: 'facial-caci-eye-revive',
            name: 'Facial - CACI Eye Revive',
            options: [{ label: '1h 15min', duration: 75, price: 55 }]
          },
          {
            id: 'facial-caci-hydratone',
            name: 'Facial - CACI Hydratone',
            options: [{ label: '1 hour', duration: 60, price: 40 }]
          },
          {
            id: 'facial-caci-rejuvenation',
            name: 'Facial - CACI Skin Rejuvenation',
            options: [{ label: '1 hour', duration: 60, price: 110 }]
          }
        ]
      },
      {
        id: 'acne-treatments',
        title: 'Acne & Specialized',
        services: [
          {
            id: 'facial-acne-treatment',
            name: 'Facial - Acne Treatment',
            options: [{ label: '1 hour', duration: 60, price: 95 }]
          },
          {
            id: 'facial-high-frequency',
            name: 'Facial - High Frequency',
            options: [{ label: '1 hour', duration: 60, price: 60 }]
          }
        ]
      }
    ]
  },

  // 5. WAXING AND THREADING
  {
    id: 'waxing-threading',
    title: 'WAXING AND THREADING',
    subcategories: [
      {
        id: 'threading-services',
        title: 'Threading Services',
        services: [
          {
            id: 'chin-threading',
            name: 'Chin',
            options: [{ label: '10 min', duration: 10, price: 20 }]
          },
          {
            id: 'lower-lip-threading',
            name: 'Lower Lip',
            options: [{ label: '10 min', duration: 10, price: 20 }]
          },
          {
            id: 'upper-lip-threading',
            name: 'Upper Lip',
            options: [{ label: '10 min', duration: 10, price: 20 }]
          },
          {
            id: 'forehead-threading',
            name: 'Forehead',
            options: [{ label: '10 min', duration: 10, price: 25 }]
          },
          {
            id: 'lip-chin-threading',
            name: 'Lip & Chin',
            options: [{ label: '15 min', duration: 15, price: 30 }]
          },
          {
            id: 'sides-threading',
            name: 'Sides',
            options: [{ label: '10 min', duration: 10, price: 30 }]
          },
          {
            id: 'full-face-threading',
            name: 'Full Face',
            options: [{ label: '30 min', duration: 30, price: 65 }]
          }
        ]
      }
    ]
  },

  // 6. BROWS AND LASHES
  {
    id: 'brows-lashes',
    title: 'BROWS AND LASHES',
    subcategories: [
      {
        id: 'eyebrow-services',
        title: 'Eyebrow Services',
        services: [
          {
            id: 'eyebrows-threading',
            name: 'Eyebrows Threading',
            options: [{ label: '10 min', duration: 10, price: 25 }]
          }
        ]
      }
    ]
  },

  // 7. MAKE UP
  {
    id: 'makeup',
    title: 'MAKE UP',
    subcategories: [
      {
        id: 'everyday-makeup',
        title: 'Everyday & Party Makeup',
        services: [
          {
            id: 'makeup-standard',
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
            options: [{ label: '1h 30min', duration: 90, price: 75 }]
          },
          {
            id: 'festival-makeup',
            name: 'Festival Makeup',
            options: [{ label: '1h 45min', duration: 105, price: 80 }]
          },
          {
            id: 'evening-makeup',
            name: 'Evening Makeup',
            options: [{ label: '1h 30min', duration: 90, price: 95 }]
          },
          {
            id: 'makeup-strip-lashes',
            name: 'Makeup incl. Strip Lashes',
            options: [{ label: '1h 20min', duration: 80, price: 85 }]
          }
        ]
      },
      {
        id: 'eye-makeup',
        title: 'Eye Makeup',
        services: [
          {
            id: 'eye-makeup',
            name: 'Eye Makeup',
            options: [{ label: '30 min', duration: 30, price: 30 }]
          },
          {
            id: 'eye-makeup-strip-lashes',
            name: 'Eye Makeup incl. Strip Lashes',
            options: [{ label: '45 min', duration: 45, price: 40 }]
          }
        ]
      },
      {
        id: 'bridal-makeup',
        title: 'Bridal Makeup',
        services: [
          {
            id: 'wedding-makeup-bridesmaid',
            name: 'Wedding Makeup (Bridesmaid)',
            options: [{ label: '2h 10min', duration: 130, price: 120 }]
          },
          {
            id: 'wedding-makeup-mother',
            name: 'Wedding Makeup (Mother of The Bride)',
            options: [{ label: '2h 45min', duration: 165, price: 145 }]
          },
          {
            id: 'wedding-makeup-bride',
            name: 'Wedding Makeup (Bride)',
            options: [{ label: '2h 30min', duration: 150, price: 150 }]
          },
          {
            id: 'bridal-makeup',
            name: 'Bridal Makeup',
            options: [{ label: '2h 45min', duration: 165, price: 150 }]
          },
          {
            id: 'bridal-hair-makeup',
            name: 'Bridal Hair & Makeup',
            options: [{ label: '4h 30min', duration: 270, price: 450 }]
          },
          {
            id: 'makeup-hair-up',
            name: 'Makeup & Hair Up',
            options: [{ label: '4 hours', duration: 240, price: 360 }]
          },
          {
            id: 'bridal-hair-makeup-trial',
            name: 'Bridal Hair & Makeup - Trial',
            options: [{ label: '4h 30min', duration: 270, price: 250 }]
          }
        ]
      }
    ]
  },

  // 8. TANNING
  {
    id: 'tanning',
    title: 'TANNING',
    subcategories: [
      {
        id: 'tanning-services',
        title: 'Tanning Services',
        services: [
          {
            id: 'spray-tan',
            name: 'Spray Tan',
            options: [{ label: '30 min', duration: 30, price: 30 }]
          }
        ]
      }
    ]
  },

  // 9. PIERCING
  {
    id: 'piercing',
    title: 'PIERCING',
    subcategories: [
      {
        id: 'piercing-services',
        title: 'Piercing Services',
        services: [
          {
            id: 'ear-piercing',
            name: 'Ear Piercing',
            options: [{ label: '15 min', duration: 15, price: 25 }]
          },
          {
            id: 'nose-piercing',
            name: 'Nose Piercing',
            options: [{ label: '15 min', duration: 15, price: 30 }]
          }
        ]
      }
    ]
  },

  // 10. BODY
  {
    id: 'body',
    title: 'BODY',
    subcategories: [
      {
        id: 'body-treatments',
        title: 'Body Treatments',
        services: [
          {
            id: 'body-massage',
            name: 'Body Massage',
            options: [
              { label: '30 min', duration: 30, price: 45 },
              { label: '60 min', duration: 60, price: 75 },
              { label: '90 min', duration: 90, price: 105 }
            ]
          }
        ]
      }
    ]
  }
];
