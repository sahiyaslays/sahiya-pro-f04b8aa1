import { Product } from '@/types/shop';

// Import product images
const boneStraightCambodian1 = '/lovable-uploads/6c6cc110-9f8e-4a33-bd20-5b9697aa8aeb.png';
const premiumVirginProcessed1 = '/lovable-uploads/7d5d1f5e-e10f-4ba5-8e94-9ecda625139e.png';
const rawCambodian4x4Closure1 = '/lovable-uploads/1c6e9a82-c288-4e51-a558-a7aa20f124e3.png';
const rawCambodian5x5Closure1 = '/lovable-uploads/e156a528-3835-46d5-ba78-c7bc57354c0d.png';
const rawCambodianKinkyStraightClosure1 = '/lovable-uploads/1da75a51-729c-4a8c-a682-040691e1c55b.png';
const rawCambodianKinkyStraightHair1 = '/lovable-uploads/d3fbebba-0431-4b52-a98d-64f767caf425.png';
const rawCambodianWavyHairBundle1 = '/lovable-uploads/6c4890c4-6e79-4553-8820-085066cf3a5d.png';
const rawCambodianTapeIn1 = '/lovable-uploads/6486dcc8-ca8b-457d-a1d8-7ca9b16de818.png';
import rawCambodianBodyWave1 from '@/assets/raw-cambodian-body-wave-1.jpg';
const hdLaceClosure4x41 = '/lovable-uploads/6b1156dd-0738-4e94-8c58-d5eef3351bbe.png';
import hdLaceClosure5x51 from '@/assets/hd-lace-closure-5x5-1.jpg';
import laceFrontal13x41 from '@/assets/lace-frontal-13x4-1.jpg';
import laceFrontal13x61 from '@/assets/lace-frontal-13x6-1.jpg';
import edgeControlAccessory1 from '@/assets/edge-control-accessory-1.jpg';
import colourTheory1 from '@/assets/colour-theory-1.png';

export const PRODUCTS: Product[] = [
  {
    id: "p_colour_theory_01",
    slug: "colour-theory-transformations",
    title: "COLOUR THEORY — Professional Hair Colour Transformations",
    category: "Colour Theory",
    short_description: "Expert colour theory application for stunning transformations from blonde to pink, natural tones to vibrant highlights.",
    images: [colourTheory1],
    variants: [
      {"length":"Consultation","price":0,"in_stock":true},
      {"length":"Single Process","price":85,"in_stock":true},
      {"length":"Double Process","price":150,"in_stock":true},
      {"length":"Balayage","price":180,"in_stock":true},
      {"length":"Full Highlights","price":165,"in_stock":true},
      {"length":"Creative Colour","price":200,"in_stock":true}
    ],
    processing_time_note: "BOOKING REQUIRED: Schedule your colour consultation to discuss your desired transformation",
    description_long: "<p>Professional colour theory services at The Slays Room. Our expert colourists create stunning transformations using advanced colour theory techniques. From natural blonde balayage to vibrant fashion colours, we deliver results that enhance your natural beauty. All services include a complimentary consultation to determine the perfect colour for your hair type and lifestyle.</p>",
    price_min: 0,
    price_max: 200
  },
  {
    id: "p01",
    slug: "bone-straight-raw-cambodian",
    title: "BONE STRAIGHT — Raw Cambodian Hair",
    category: "Bundles",
    short_description: "Raw Cambodian, one-donor, minimal frizz. Natural brown, can be lightened up to 5 shades.",
    images: [boneStraightCambodian1],
    variants: [
      {"length":"12\"","price":92,"in_stock":true},
      {"length":"14\"","price":105,"in_stock":true},
      {"length":"16\"","price":118,"in_stock":true},
      {"length":"18\"","price":132,"in_stock":true},
      {"length":"20\"","price":148,"in_stock":true},
      {"length":"22\"","price":165,"in_stock":true},
      {"length":"24\"","price":185,"in_stock":true},
      {"length":"26\"","price":215,"in_stock":true},
      {"length":"28\"","price":275,"in_stock":true},
      {"length":"30\"","price":345,"in_stock":true}
    ],
    processing_time_note: "PROCESSING TIME: 7–10 business days",
    description_long: "<p>Cut directly from one donor. Double wefted, minimal shedding. For best results, co-wash before install and air-dry.</p>",
    related_slugs: ["premium-hair-bundle-virgin-processed","raw-cambodian-4x4-closure-ss","raw-cambodian-5x5-closure-ss"],
    price_min: 92,
    price_max: 345
  },
  {
    id: "p02",
    slug: "premium-hair-bundle-virgin-processed",
    title: "Premium Hair Bundle — Virgin Processed",
    category: "Bundles",
    short_description: "Silky texture, consistent from root to tip. Perfect for everyday glam.",
    images: [premiumVirginProcessed1],
    variants: [
      {"length":"12\"","price":40,"in_stock":true},
      {"length":"14\"","price":50,"in_stock":true},
      {"length":"16\"","price":60,"in_stock":true},
      {"length":"18\"","price":70,"in_stock":true},
      {"length":"20\"","price":80,"in_stock":true},
      {"length":"22\"","price":95,"in_stock":true}
    ],
    description_long: "<p>Soft, manageable hair with a natural luster. Heat style and color as desired with professional care.</p>",
    related_slugs: ["bone-straight-raw-cambodian"],
    price_min: 40,
    price_max: 95
  },
  {
    id: "p03",
    slug: "raw-cambodian-4x4-closure-ss",
    title: "Raw Cambodian 4×4 Swiss Lace Closure — SS Limited Edition",
    category: "Closures",
    short_description: "Natural density 4×4 closure for a flawless finish.",
    images: [rawCambodian4x4Closure1],
    variants: [
      {"length":"12\"","price":48,"in_stock":true},
      {"length":"14\"","price":60,"in_stock":true},
      {"length":"16\"","price":75,"in_stock":true},
      {"length":"18\"","price":110,"in_stock":true},
      {"length":"20\"","price":150,"in_stock":true},
      {"length":"22\"","price":200,"in_stock":true}
    ],
    description_long: "<p>SS Limited Edition Swiss lace for a natural hairline. Bleach knots carefully. Handle lace gently to extend life.</p>",
    related_slugs: ["bone-straight-raw-cambodian","raw-cambodian-5x5-closure-ss"],
    price_min: 48,
    price_max: 200
  },
  {
    id: "p04",
    slug: "raw-cambodian-5x5-closure-ss",
    title: "Raw Cambodian 5×5 Swiss Lace Closure — SS Edition",
    category: "Closures",
    short_description: "Wider 5×5 area for more styling flexibility and a seamless blend.",
    images: [rawCambodian5x5Closure1],
    variants: [
      {"length":"12\"","price":84,"in_stock":true},
      {"length":"14\"","price":95,"in_stock":true},
      {"length":"16\"","price":120,"in_stock":true},
      {"length":"18\"","price":150,"in_stock":true},
      {"length":"20\"","price":175,"in_stock":true},
      {"length":"22\"","price":200,"in_stock":true}
    ],
    description_long: "<p>Soft Swiss lace with natural density. Pair with Raw Cambodian bundles for best texture match.</p>",
    related_slugs: ["bone-straight-raw-cambodian"],
    price_min: 84,
    price_max: 200
  },
  {
    id: "p06",
    slug: "raw-cambodian-kinky-straight-hair",
    title: "Raw Cambodian KINKY STRAIGHT Hair",
    category: "Bundles",
    short_description: "Premium kinky straight texture that blends perfectly with natural hair.",
    images: [rawCambodianKinkyStraightHair1],
    variants: [
      {"length":"12\"","price":82,"in_stock":true},
      {"length":"14\"","price":105,"in_stock":true},
      {"length":"16\"","price":128,"in_stock":true},
      {"length":"18\"","price":155,"in_stock":true},
      {"length":"20\"","price":185,"in_stock":true},
      {"length":"22\"","price":220,"in_stock":true},
      {"length":"24\"","price":260,"in_stock":true}
    ],
    description_long: "<p>Raw Cambodian kinky straight hair with natural texture. Perfect for blending with relaxed or silk-pressed hair. Minimal processing for maximum durability.</p>",
    price_min: 82,
    price_max: 260
  },
  {
    id: "p07",
    slug: "raw-cambodian-wavy-hair-bundle-ss-edition",
    title: "Raw Cambodian Wavy Hair Bundle – SS Edition",
    category: "Bundles",
    short_description: "Premium wavy texture with natural movement and body for stunning styles.",
    images: [rawCambodianWavyHairBundle1],
    variants: [
      {"length":"12\"","price":84,"in_stock":true},
      {"length":"14\"","price":105,"in_stock":true},
      {"length":"16\"","price":125,"in_stock":true},
      {"length":"18\"","price":145,"in_stock":true},
      {"length":"20\"","price":165,"in_stock":true},
      {"length":"22\"","price":185,"in_stock":true},
      {"length":"24\"","price":200,"in_stock":true}
    ],
    description_long: "<p>Raw Cambodian wavy hair bundle with beautiful natural wave pattern. SS Edition features enhanced quality and durability. Perfect for creating voluminous, bouncy styles that last.</p>",
    price_min: 84,
    price_max: 200
  },
  {
    id: "p08",
    slug: "raw-cambodian-tape-in-hair-extensions",
    title: "Raw Cambodian – Tape In Hair extensions",
    category: "Bundles",
    short_description: "Premium tape-in extensions for seamless, temporary length and volume.",
    images: [rawCambodianTapeIn1],
    variants: [
      {"length":"12\"","price":84.50,"in_stock":true},
      {"length":"14\"","price":105.20,"in_stock":true},
      {"length":"16\"","price":125.80,"in_stock":true},
      {"length":"18\"","price":145.60,"in_stock":true},
      {"length":"20\"","price":165.40,"in_stock":true},
      {"length":"22\"","price":185.20,"in_stock":true},
      {"length":"24\"","price":204.80,"in_stock":true},
      {"length":"26\"","price":224.20,"in_stock":true}
    ],
    description_long: "<p>Raw Cambodian tape-in hair extensions with strong adhesive for secure, comfortable wear. Easy application and removal. Reusable with replacement tape. Perfect for adding instant length and volume.</p>",
    price_min: 84.50,
    price_max: 224.20
  },
  {
    id: "p09",
    slug: "burmese-hair-bundle",
    title: "Burmese",
    category: "Bundles",
    short_description: "Premium Burmese hair with natural deep wave texture and beautiful curl pattern.",
    images: ['/lovable-uploads/a51b313e-2486-453b-a9cc-34678f7da716.png'],
    variants: [
      {"length":"12\"","price":115,"in_stock":true},
      {"length":"14\"","price":135,"in_stock":true},
      {"length":"16\"","price":155,"in_stock":true},
      {"length":"18\"","price":175,"in_stock":true},
      {"length":"20\"","price":195,"in_stock":true},
      {"length":"22\"","price":215,"in_stock":true},
      {"length":"24\"","price":235,"in_stock":true},
      {"length":"26\"","price":255,"in_stock":true}
    ],
    description_long: "<p>Premium Burmese hair with natural deep wave texture. Soft, luxurious curls that maintain their pattern beautifully. Perfect for creating voluminous, bouncy styles with natural movement.</p>",
    price_min: 115,
    price_max: 255
  },
  {
    id: "p10",
    slug: "raw-cambodian-swiss-lace-frontal-ss-edition",
    title: "Raw Cambodian Swiss Lace Frontal – SS Edition",
    category: "Frontals",
    short_description: "Premium SS Edition Swiss lace frontal with raw Cambodian hair for natural-looking hairlines.",
    images: ['/lovable-uploads/13d175b5-0fb1-42d4-a0c7-5191b24885d1.png'],
    variants: [
      {"length":"12\"","price":96,"in_stock":true},
      {"length":"14\"","price":125,"in_stock":true},
      {"length":"16\"","price":155,"in_stock":true},
      {"length":"18\"","price":185,"in_stock":true},
      {"length":"20\"","price":225,"in_stock":true}
    ],
    description_long: "<p>SS Edition Swiss lace frontal with raw Cambodian hair. Ultra-fine lace construction for invisible hairline. Perfect for creating seamless, natural-looking styles with maximum versatility.</p>",
    price_min: 96,
    price_max: 225
  },
  {
    id: "p13",
    slug: "raw-cambodian-kinky-straight-closure",
    title: "Raw Cambodian KINKY STRAIGHT Closure",
    category: "Closures",
    short_description: "Kinky straight texture closure that perfectly matches natural hair.",
    images: [rawCambodianKinkyStraightClosure1],
    variants: [
      {"length":"12\"","price":74,"in_stock":true},
      {"length":"14\"","price":88,"in_stock":true},
      {"length":"16\"","price":105,"in_stock":true},
      {"length":"18\"","price":125,"in_stock":true},
      {"length":"20\"","price":154,"in_stock":true}
    ],
    description_long: "<p>Premium kinky straight closure with natural texture that blends seamlessly with silk-pressed or relaxed hair. Swiss lace construction for comfortable wear.</p>",
    related_slugs: ["raw-cambodian-kinky-straight"],
    price_min: 74,
    price_max: 154
  },
  {
    id: "p12",
    slug: "ss-hair-oil-ss-edition",
    title: "SS Hair Oil – SS Edition",
    category: "Accessories",
    short_description: "Premium nourishing hair oil for shine, strength, and protection.",
    images: ['/lovable-uploads/0671dfa7-f6a6-4467-9ca8-323be7949d36.png'],
    variants: [
      {"length":"30ml","price":20,"in_stock":true},
      {"length":"50ml","price":30,"in_stock":true},
      {"length":"100ml","price":45,"in_stock":true}
    ],
    description_long: "<p>SS Edition premium hair oil formulated with natural ingredients to nourish, strengthen, and add brilliant shine to your hair. Apply a few drops to damp or dry hair for instant hydration and protection.</p>",
    price_min: 20,
    price_max: 45
  },
  {
    id: "p13b",
    slug: "ss-white-head-band-ss-edition",
    title: "SS White Head Band – SS Edition",
    category: "Accessories",
    short_description: "Premium white headband with SS logo for comfortable wear during styling.",
    images: ['/lovable-uploads/8a595ead-eef3-4edb-9e5d-0ca75a62b6b3.png'],
    variants: [
      {"length":"One Size","price":49.99,"sale_price":25.99,"in_stock":true}
    ],
    description_long: "<p>SS Edition premium white headband featuring the signature SS logo. Perfect for keeping hair secure during styling sessions or as a fashionable accessory. Comfortable elastic band ensures all-day wear.</p>",
    price_min: 25.99,
    price_max: 25.99
  },
  {
    id: "p14",
    slug: "ash-beige-straight-premium-color-weft",
    title: "ASH & BEIGE STRAIGHT — Premium Color Weft",
    category: "Bundles",
    short_description: "Silky straight, salon-toned ash/beige shades. Double-wefted, minimal shedding.",
    images: ['/lovable-uploads/fcc9a5fb-f700-4112-a801-ae45a6537fc3.png'],
    variants: [
      {"length":"12\"","price":95,"in_stock":true},
      {"length":"14\"","price":110,"in_stock":true},
      {"length":"16\"","price":125,"in_stock":true},
      {"length":"18\"","price":140,"in_stock":true},
      {"length":"20\"","price":160,"in_stock":true},
      {"length":"22\"","price":180,"in_stock":true},
      {"length":"24\"","price":205,"in_stock":true},
      {"length":"26\"","price":235,"in_stock":true},
      {"length":"28\"","price":285,"in_stock":true},
      {"length":"30\"","price":355,"in_stock":true}
    ],
    processing_time_note: "PROCESSING TIME: 7–10 business days",
    description_long: "<p>Cut from single donors and professionally toned for cool ash and beige finishes. Bone-straight texture with natural luster. Double-wefted construction for minimal shedding. Co-wash before install, air-dry, and use heat protectant for styling.</p>",
    price_min: 95,
    price_max: 355
  },
  {
    id: "p15",
    slug: "natural-brunette-straight-premium-color-weft",
    title: "NATURAL & BRUNETTE STRAIGHT — Premium Color Weft",
    category: "Bundles",
    short_description: "Rich natural tones from jet black to warm brunettes. Smooth, double-wefted.",
    images: ['/lovable-uploads/ede77023-689a-474a-8ac3-c280d99d65ca.png'],
    variants: [
      {"length":"12\"","price":90,"in_stock":true},
      {"length":"14\"","price":105,"in_stock":true},
      {"length":"16\"","price":120,"in_stock":true},
      {"length":"18\"","price":135,"in_stock":true},
      {"length":"20\"","price":155,"in_stock":true},
      {"length":"22\"","price":175,"in_stock":true},
      {"length":"24\"","price":200,"in_stock":true},
      {"length":"26\"","price":230,"in_stock":true},
      {"length":"28\"","price":280,"in_stock":true},
      {"length":"30\"","price":350,"in_stock":true}
    ],
    processing_time_note: "PROCESSING TIME: 7–10 business days",
    description_long: "<p>Seamless straight bundles in salon-favorite brunette spectrum. Shades cover natural black through medium browns. Double-wefted with low frizz and minimal shedding. Co-wash before install with gentle, sulfate-free care only.</p>",
    price_min: 90,
    price_max: 350
  },
  {
    id: "p16",
    slug: "caramel-mocha-straight-premium-color-weft",
    title: "CARAMEL & MOCHA STRAIGHT — Premium Color Weft",
    category: "Bundles",
    short_description: "Warm caramels to deep mocha blends. Sleek straight, salon-toned.",
    images: ['/lovable-uploads/ec2045b3-cb18-4069-b967-3cd824c63d1e.png'],
    variants: [
      {"length":"12\"","price":95,"in_stock":true},
      {"length":"14\"","price":110,"in_stock":true},
      {"length":"16\"","price":125,"in_stock":true},
      {"length":"18\"","price":140,"in_stock":true},
      {"length":"20\"","price":160,"in_stock":true},
      {"length":"22\"","price":180,"in_stock":true},
      {"length":"24\"","price":205,"in_stock":true},
      {"length":"26\"","price":235,"in_stock":true},
      {"length":"28\"","price":285,"in_stock":true},
      {"length":"30\"","price":355,"in_stock":true}
    ],
    processing_time_note: "PROCESSING TIME: 7–10 business days",
    description_long: "<p>Hand-selected straight bundles in rich warm tones for subtle dimension. Double-wefted construction for fullness. Heat-friendly with protectant and moderate temperatures. Co-wash and air-dry for best longevity.</p>",
    price_min: 95,
    price_max: 355
  },
  {
    id: "p17",
    slug: "blonde-platinum-straight-premium-color-weft",
    title: "BLONDE & PLATINUM STRAIGHT — Premium Color Weft",
    category: "Bundles",
    short_description: "Salon-lifted blondes from beige to icy platinum. Smooth, double-wefted.",
    images: ['/lovable-uploads/ec2045b3-cb18-4069-b967-3cd824c63d1e.png'],
    variants: [
      {"length":"12\"","price":105,"in_stock":true},
      {"length":"14\"","price":125,"in_stock":true},
      {"length":"16\"","price":145,"in_stock":true},
      {"length":"18\"","price":165,"in_stock":true},
      {"length":"20\"","price":190,"in_stock":true},
      {"length":"22\"","price":215,"in_stock":true},
      {"length":"24\"","price":245,"in_stock":true},
      {"length":"26\"","price":275,"in_stock":true},
      {"length":"28\"","price":325,"in_stock":true},
      {"length":"30\"","price":395,"in_stock":true}
    ],
    processing_time_note: "PROCESSING TIME: 7–10 business days",
    description_long: "<p>Bright, even blondes with multi-shade options for perfect matches. Includes beige, butter, pearl and icy tones. Double-wefted with minimal shedding. Maintain with purple/blue toning as needed; avoid high heat.</p>",
    price_min: 105,
    price_max: 395
  },
  {
    id: "p18",
    slug: "machine-weft-installation-bundle",
    title: "Machine Weft Installation Bundle",
    category: "Weft Installation",
    short_description: "Machine or hand-tied wefts for longer, fuller hair with premium comfort and durability.",
    images: ['/lovable-uploads/e2611553-0699-4238-ba82-eb220c64214c.png'],
    variants: [
      {"length":"16\"","price":63,"in_stock":true},
      {"length":"18\"","price":75,"in_stock":true},
      {"length":"20\"","price":90,"in_stock":true},
      {"length":"22\"","price":105,"in_stock":true},
      {"length":"24\"","price":125,"in_stock":true},
      {"length":"26\"","price":145,"in_stock":true},
      {"length":"28\"","price":165,"in_stock":true}
    ],
    processing_time_note: "PROCESSING TIME: 7–10 business days",
    description_long: "<p>Our <strong>weft bundles</strong> are crafted from 100% human hair, carefully coloured and prepared in Cambodia. Each bundle is 50–100g, delivering a high-quality, long-lasting experience.</p><p><strong>Machine Wefts</strong><br>• Reinforced stitched wefts, durable and strong<br>• Can be trimmed or cut without damage<br>• Best for versatile styling</p><p><strong>Hand-Tied Wefts</strong><br>• Slimmer, sit closer to the head for comfort<br>• Reduced shedding, extended lifespan<br>• Not designed to be cut into smaller pieces</p><p>Perfect for installs with <strong>micro rings, weft installation, or weave methods</strong>, our wefts give fuller, longer styles while maintaining softness and shine.</p><p><strong>Price Guide:</strong><br>Multiply the unit price ×3 (e.g., 16\" = £63 × 3 = £189). Lengths available from 16\" to 28\".</p>",
    price_min: 63,
    price_max: 165
  },
  {
    id: "p19",
    slug: "k-tip-natural",
    title: "K-Tip Extensions — Natural Shades",
    category: "Extensions",
    short_description: "Keratin-bond (fusion) extensions in rich natural/brunette tones.",
    images: ['/lovable-uploads/2629ec27-43bd-4333-86d2-8e0f13fb6015.png'],
    variants: [
      {"length":"16\" (#1-6)","price":46,"in_stock":true},
      {"length":"16\" (Light)","price":58,"in_stock":true},
      {"length":"16\" (Ombre/Balayage)","price":63,"in_stock":true},
      {"length":"18\" (#1-6)","price":53,"in_stock":true},
      {"length":"18\" (Light)","price":70,"in_stock":true},
      {"length":"18\" (Ombre/Balayage)","price":74,"in_stock":true},
      {"length":"20\" (#1-6)","price":63,"in_stock":true},
      {"length":"20\" (Light)","price":84,"in_stock":true},
      {"length":"20\" (Ombre/Balayage)","price":89,"in_stock":true},
      {"length":"22\" (#1-6)","price":71,"in_stock":true},
      {"length":"22\" (Light)","price":91,"in_stock":true},
      {"length":"22\" (Ombre/Balayage)","price":96,"in_stock":true},
      {"length":"24\" (#1-6)","price":84,"in_stock":true},
      {"length":"24\" (Light)","price":108,"in_stock":true},
      {"length":"24\" (Ombre/Balayage)","price":112,"in_stock":true},
      {"length":"26\" (#1-6)","price":96,"in_stock":true},
      {"length":"26\" (Light)","price":115,"in_stock":true},
      {"length":"26\" (Ombre/Balayage)","price":119,"in_stock":true},
      {"length":"28\" (#1-6)","price":103,"in_stock":true},
      {"length":"28\" (Light)","price":126,"in_stock":true},
      {"length":"28\" (Ombre/Balayage)","price":131,"in_stock":true}
    ],
    processing_time_note: "PROCESSING TIME: 7–10 business days",
    description_long: "<p>Also known as keratin bond or fusion extensions, K-tips use keratin (the hair's natural protein) to bond strands for a seamless, natural look.</p><ul><li>Applied strand-by-strand for precision and movement</li><li>Comfortable, discreet and long-lasting with pro installation</li><li>Multiple shade numbers available; custom mixes on request</li></ul><p><strong>Price list (95–100g):</strong></p><p><em>ST, Others +£10 | U-Tip/Flat-Tip +£4 per 100g</em></p>",
    price_min: 46,
    price_max: 131
  },
  {
    id: "p20",
    slug: "k-tip-blonde",
    title: "K-Tip Extensions — Blonde Shades",
    category: "Extensions",
    short_description: "Keratin-bond extensions in beige, butter, pearl and icy blondes.",
    images: ['/lovable-uploads/e63301f0-97fa-4ce6-96e1-14d9558c1cc1.png'],
    variants: [
      {"length":"16\" (#1-6)","price":46,"in_stock":true},
      {"length":"16\" (Light)","price":58,"in_stock":true},
      {"length":"16\" (Ombre/Balayage)","price":63,"in_stock":true},
      {"length":"18\" (#1-6)","price":53,"in_stock":true},
      {"length":"18\" (Light)","price":70,"in_stock":true},
      {"length":"18\" (Ombre/Balayage)","price":74,"in_stock":true},
      {"length":"20\" (#1-6)","price":63,"in_stock":true},
      {"length":"20\" (Light)","price":84,"in_stock":true},
      {"length":"20\" (Ombre/Balayage)","price":89,"in_stock":true},
      {"length":"22\" (#1-6)","price":71,"in_stock":true},
      {"length":"22\" (Light)","price":91,"in_stock":true},
      {"length":"22\" (Ombre/Balayage)","price":96,"in_stock":true},
      {"length":"24\" (#1-6)","price":84,"in_stock":true},
      {"length":"24\" (Light)","price":108,"in_stock":true},
      {"length":"24\" (Ombre/Balayage)","price":112,"in_stock":true},
      {"length":"26\" (#1-6)","price":96,"in_stock":true},
      {"length":"26\" (Light)","price":115,"in_stock":true},
      {"length":"26\" (Ombre/Balayage)","price":119,"in_stock":true},
      {"length":"28\" (#1-6)","price":103,"in_stock":true},
      {"length":"28\" (Light)","price":126,"in_stock":true},
      {"length":"28\" (Ombre/Balayage)","price":131,"in_stock":true}
    ],
    processing_time_note: "PROCESSING TIME: 7–10 business days",
    description_long: "<p>Premium blonde K-tips toned for even, salon-grade finishes.</p><ul><li>Seamless blend; minimal visibility at bonds</li><li>Heat-style with protectant; maintain tone with purple/blue care</li><li>Shade numbers as labeled; custom blends available</li></ul><p><strong>Price list (95–100g):</strong></p><p><em>ST, Others +£10 | U-Tip/Flat-Tip +£4 per 100g</em></p>",
    price_min: 46,
    price_max: 131
  },
  {
    id: "p21",
    slug: "k-tip-balayage",
    title: "K-Tip Extensions — Balayage & Mixed",
    category: "Extensions",
    short_description: "Fusion K-tips in balayage/ombre and mixed shade combinations.",
    images: ['/lovable-uploads/d3b16038-88c5-4678-85a6-1b817ea82c36.png'],
    variants: [
      {"length":"16\" (#1-6)","price":46,"in_stock":true},
      {"length":"16\" (Light)","price":58,"in_stock":true},
      {"length":"16\" (Ombre/Balayage)","price":63,"in_stock":true},
      {"length":"18\" (#1-6)","price":53,"in_stock":true},
      {"length":"18\" (Light)","price":70,"in_stock":true},
      {"length":"18\" (Ombre/Balayage)","price":74,"in_stock":true},
      {"length":"20\" (#1-6)","price":63,"in_stock":true},
      {"length":"20\" (Light)","price":84,"in_stock":true},
      {"length":"20\" (Ombre/Balayage)","price":89,"in_stock":true},
      {"length":"22\" (#1-6)","price":71,"in_stock":true},
      {"length":"22\" (Light)","price":91,"in_stock":true},
      {"length":"22\" (Ombre/Balayage)","price":96,"in_stock":true},
      {"length":"24\" (#1-6)","price":84,"in_stock":true},
      {"length":"24\" (Light)","price":108,"in_stock":true},
      {"length":"24\" (Ombre/Balayage)","price":112,"in_stock":true},
      {"length":"26\" (#1-6)","price":96,"in_stock":true},
      {"length":"26\" (Light)","price":115,"in_stock":true},
      {"length":"26\" (Ombre/Balayage)","price":119,"in_stock":true},
      {"length":"28\" (#1-6)","price":103,"in_stock":true},
      {"length":"28\" (Light)","price":126,"in_stock":true},
      {"length":"28\" (Ombre/Balayage)","price":131,"in_stock":true}
    ],
    processing_time_note: "PROCESSING TIME: 7–10 business days",
    description_long: "<p>Dimensional K-tips with soft transitions and rooted blends for a natural grow-out.</p><ul><li>Strand-by-strand install for perfect placement</li><li>Works with highlights, lowlights and lived-in colour looks</li><li>Choose by shade number on bundles; custom orders welcome</li></ul><p><strong>Price list (95–100g):</strong></p><p><em>ST, Others +£10 | U-Tip/Flat-Tip +£4 per 100g</em></p>",
    price_min: 46,
    price_max: 131
  },
  
  {
    id: "tape-ins-genius-weft",
    slug: "tape-ins-genius-weft",
    title: "Tape Ins / Genius Weft",
    category: "Extensions",
    short_description: "Ultra-slender, high-end virgin tape-ins for a seamless, comfortable install.",
    images: ["/lovable-uploads/d7aaccb7-00d2-4bbc-8e03-a4ef99b14398.png"],
    variants: [
      // Natural shades (#99J / #NB / #2A / #1 / #2 / #3 / #4 / #5 / #6 / #1B / #2B / #3B)
      { length: '16"', price: 27, in_stock: true, sku: "TAPE-16-NAT" },
      { length: '18"', price: 31, in_stock: true, sku: "TAPE-18-NAT" },
      { length: '20"', price: 36, in_stock: true, sku: "TAPE-20-NAT" },
      { length: '22"', price: 40, in_stock: true, sku: "TAPE-22-NAT" },
      { length: '24"', price: 46, in_stock: true, sku: "TAPE-24-NAT" },
      { length: '26"', price: 52, in_stock: true, sku: "TAPE-26-NAT" },
      { length: '28"', price: 56, in_stock: true, sku: "TAPE-28-NAT" },
      // Blonde & Light shades (#7 / #8 / #9.1 / #18 / #22 / #613 / ICE / Silver)
      { length: '16" (Blonde)', price: 33, in_stock: true, sku: "TAPE-16-BLN" },
      { length: '18" (Blonde)', price: 39, in_stock: true, sku: "TAPE-18-BLN" },
      { length: '20" (Blonde)', price: 46, in_stock: true, sku: "TAPE-20-BLN" },
      { length: '22" (Blonde)', price: 50, in_stock: true, sku: "TAPE-22-BLN" },
      { length: '24" (Blonde)', price: 58, in_stock: true, sku: "TAPE-24-BLN" },
      { length: '26" (Blonde)', price: 62, in_stock: true, sku: "TAPE-26-BLN" },
      { length: '28" (Blonde)', price: 67, in_stock: true, sku: "TAPE-28-BLN" },
      // Balayage & Mix shades (B2/60A, B2/5, B3/9.1, B4/60, B7/60A, H4/H4/ICE)
      { length: '16" (Balayage)', price: 36, in_stock: true, sku: "TAPE-16-BAL" },
      { length: '18" (Balayage)', price: 41, in_stock: true, sku: "TAPE-18-BAL" },
      { length: '20" (Balayage)', price: 49, in_stock: true, sku: "TAPE-20-BAL" },
      { length: '22" (Balayage)', price: 52, in_stock: true, sku: "TAPE-22-BAL" },
      { length: '24" (Balayage)', price: 60, in_stock: true, sku: "TAPE-24-BAL" },
      { length: '26" (Balayage)', price: 64, in_stock: true, sku: "TAPE-26-BAL" },
      { length: '28" (Balayage)', price: 70, in_stock: true, sku: "TAPE-28-BAL" }
    ],
    price_min: 27,
    price_max: 70,
    processing_time_note: "Usually ships within 3-5 business days",
    description_long: "<p>Our revolutionary Tape Ins / Genius Weft system delivers a full head of hair in under an hour.</p><ul><li>High-end virgin hair, dense yet lightweight</li><li>Polyurethane adhesive tape for secure, comfortable wear</li><li>Double-stitched base for durability and reuse</li><li>Easy removal & reapplication with professional care</li></ul><p><strong>Shade groups (choose by shade number on bundles):</strong></p><ul><li><strong>Natural:</strong> #99J / #NB / #2A / #1 / #2 / #3 / #4 / #5 / #6 / #1B / #2B / #3B</li><li><strong>Blonde & Light:</strong> #7 / #8 / #9.1 / #18 / #22 / #613 / ICE / Silver</li><li><strong>Balayage & Mix:</strong> B2/60A, B2/5, B3/9.1, B4/60, B7/60A, H4/H4/ICE</li></ul><p><em>ST, other shades +£10.</em></p>",
    related_slugs: ["k-tip-natural", "k-tip-blonde", "k-tip-balayage"]
  },

  {
    id: "curly-brown-highlights",
    slug: "curly-brown-highlights",
    title: "CURLY — Brown Highlights Weft",
    category: "Bundles",
    short_description: "Tight, bouncy curls in rich brown with warm highlights. Double-wefted, lightweight, minimal shedding.",
    images: ["/lovable-uploads/4324851c-f10c-4dc9-907d-829896c07c21.png"],
    variants: [
      { length: '12"', price: 52, in_stock: true, sku: "CURLY-BH-12" },
      { length: '14"', price: 58, in_stock: true, sku: "CURLY-BH-14" },
      { length: '16"', price: 65, in_stock: true, sku: "CURLY-BH-16" },
      { length: '18"', price: 72, in_stock: true, sku: "CURLY-BH-18" },
      { length: '20"', price: 82, in_stock: true, sku: "CURLY-BH-20" },
      { length: '22"', price: 92, in_stock: true, sku: "CURLY-BH-22" },
      { length: '24"', price: 105, in_stock: true, sku: "CURLY-BH-24" },
      { length: '26"', price: 118, in_stock: true, sku: "CURLY-BH-26" },
      { length: '28"', price: 132, in_stock: true, sku: "CURLY-BH-28" },
      { length: '30"', price: 148, in_stock: true, sku: "CURLY-BH-30" }
    ],
    price_min: 52,
    price_max: 148,
    processing_time_note: "Processing time: 7–10 business days",
    description_long: "<p>Salon-grade curly wefts with multi-tone brown highlights for natural dimension.</p><ul><li>Texture: Tight, springy curls; soft hand feel</li><li>Construction: Double-wefted for fullness, low shedding</li><li>Styling: Refresh with water + curl cream; diffuse on low heat</li><li>Care: Co-wash before install, air-dry; sleep in a satin bonnet</li></ul>",
    related_slugs: ["curly-natural-black", "curly-golden-brown"]
  },

  {
    id: "curly-natural-black",
    slug: "curly-natural-black",
    title: "CURLY — Natural Black Weft",
    category: "Bundles",
    short_description: "Classic natural-black curls with glossy definition. Double-wefted, soft and full.",
    images: ["/lovable-uploads/5feb195f-94b6-4d09-bdf4-1a786e004824.png"],
    variants: [
      { length: '12"', price: 50, in_stock: true, sku: "CURLY-NB-12" },
      { length: '14"', price: 56, in_stock: true, sku: "CURLY-NB-14" },
      { length: '16"', price: 62, in_stock: true, sku: "CURLY-NB-16" },
      { length: '18"', price: 68, in_stock: true, sku: "CURLY-NB-18" },
      { length: '20"', price: 78, in_stock: true, sku: "CURLY-NB-20" },
      { length: '22"', price: 88, in_stock: true, sku: "CURLY-NB-22" },
      { length: '24"', price: 100, in_stock: true, sku: "CURLY-NB-24" },
      { length: '26"', price: 112, in_stock: true, sku: "CURLY-NB-26" },
      { length: '28"', price: 125, in_stock: true, sku: "CURLY-NB-28" },
      { length: '30"', price: 140, in_stock: true, sku: "CURLY-NB-30" }
    ],
    price_min: 50,
    price_max: 140,
    processing_time_note: "Processing time: 7–10 business days",
    description_long: "<p>Timeless jet/soft black curly wefts designed to blend seamlessly and hold definition.</p><ul><li>Texture: Uniform curls with natural sheen</li><li>Construction: Double-wefted; durable, low frizz with proper care</li><li>Styling: Define with leave-in + gel; scrunch to activate curl pattern</li><li>Care: Sulfate-free products; avoid excessive heat; air-dry preferred</li></ul>",
    related_slugs: ["curly-brown-highlights", "curly-golden-brown"]
  },

  {
    id: "curly-golden-brown",
    slug: "curly-golden-brown",
    title: "CURLY — Golden Brown Mix Weft",
    category: "Bundles",
    short_description: "Golden-brown highlighted curls for sun-kissed dimension. Full, lightweight, salon-toned.",
    images: ["/lovable-uploads/1c2ce3ab-d328-433f-b7dc-ee543dc917f5.png"],
    variants: [
      { length: '12"', price: 55, in_stock: true, sku: "CURLY-GB-12" },
      { length: '14"', price: 62, in_stock: true, sku: "CURLY-GB-14" },
      { length: '16"', price: 68, in_stock: true, sku: "CURLY-GB-16" },
      { length: '18"', price: 75, in_stock: true, sku: "CURLY-GB-18" },
      { length: '20"', price: 85, in_stock: true, sku: "CURLY-GB-20" },
      { length: '22"', price: 95, in_stock: true, sku: "CURLY-GB-22" },
      { length: '24"', price: 108, in_stock: true, sku: "CURLY-GB-24" },
      { length: '26"', price: 122, in_stock: true, sku: "CURLY-GB-26" },
      { length: '28"', price: 138, in_stock: true, sku: "CURLY-GB-28" },
      { length: '30"', price: 155, in_stock: true, sku: "CURLY-GB-30" }
    ],
    price_min: 55,
    price_max: 155,
    processing_time_note: "Processing time: 7–10 business days",
    description_long: "<p>Multi-shade golden browns blended through tight curls for a bright, dimensional finish.</p><ul><li>Texture: Defined tight curls; moves naturally</li><li>Construction: Double-wefted for volume; minimal shedding</li><li>Styling: Refresh with spray bottle; seal with lightweight oil</li><li>Care: Co-wash, deep-condition weekly; protect at night</li></ul>",
    related_slugs: ["curly-brown-highlights", "curly-natural-black"]
  }
];

export const formatPrice = (price: number): string => {
  return price % 1 === 0 ? `£${price}` : `£${price.toFixed(2)}`;
};

export const formatPriceRange = (min: number, max: number): string => {
  if (min === max) return formatPrice(min);
  return `${formatPrice(min)} – ${formatPrice(max)}`;
};