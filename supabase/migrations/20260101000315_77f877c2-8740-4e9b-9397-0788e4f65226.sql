-- Clear existing services and insert all services from servicesData.ts
-- This restores all 200+ services across 10 categories

TRUNCATE TABLE services;

-- CONSULTATION / PATCH TEST
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Patch Test', 'CONSULTATION / PATCH TEST', 'Consultation Services', 20, 15, '[{"name": "15 min", "duration": 15, "price": 20}]'::jsonb, true),
('Colour Consult', 'CONSULTATION / PATCH TEST', 'Consultation Services', 30, 15, '[{"name": "15 min", "duration": 15, "price": 30}]'::jsonb, true),
('Extensions Consult (Coloured Hair)', 'CONSULTATION / PATCH TEST', 'Consultation Services', 35, 20, '[{"name": "20 min", "duration": 20, "price": 35}]'::jsonb, true),
('Extensions Consult (Cambodian Hair)', 'CONSULTATION / PATCH TEST', 'Consultation Services', 35, 20, '[{"name": "20 min", "duration": 20, "price": 35}]'::jsonb, true),
('Video Consult', 'CONSULTATION / PATCH TEST', 'Consultation Services', 25, 15, '[{"name": "15 min", "duration": 15, "price": 25}]'::jsonb, true),
('Hair Therapy Consult', 'CONSULTATION / PATCH TEST', 'Consultation Services', 35, 20, '[{"name": "20 min", "duration": 20, "price": 35}]'::jsonb, true);

-- HAIR - Styling
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Hair - Wash Haircut and Blowdry (Afro Hair)', 'HAIR', 'Styling', 85, 60, '[{"name": "Short Hair", "duration": 60, "price": 85}, {"name": "Medium Hair", "duration": 75, "price": 95}, {"name": "Long Hair", "duration": 90, "price": 105}]'::jsonb, true),
('Hair - Wash & Blow-dry', 'HAIR', 'Styling', 65, 40, '[{"name": "Short Hair", "duration": 40, "price": 65}, {"name": "Medium Hair", "duration": 50, "price": 75}, {"name": "Long Hair", "duration": 60, "price": 85}]'::jsonb, true),
('Ladies - Wash, Cut and Blow-dry', 'HAIR', 'Styling', 75, 45, '[{"name": "Short Hair", "duration": 45, "price": 75}, {"name": "Medium Hair", "duration": 60, "price": 85}, {"name": "Long Hair", "duration": 75, "price": 95}]'::jsonb, true),
('Hair - Updo / Occasion', 'HAIR', 'Styling', 135, 60, '[{"name": "Short Hair", "duration": 60, "price": 135}, {"name": "Medium Hair", "duration": 75, "price": 155}, {"name": "Long Hair", "duration": 90, "price": 175}]'::jsonb, true),
('Ladies - Wash, Cut and Blowdry Hair - Curl Styling', 'HAIR', 'Styling', 140, 40, '[{"name": "Short Hair", "duration": 40, "price": 140}, {"name": "Medium Hair", "duration": 50, "price": 145}, {"name": "Long Hair", "duration": 60, "price": 150}]'::jsonb, true),
('Ladies Hair - Curl Only / Add On', 'HAIR', 'Styling', 35, 25, '[{"name": "Short Hair", "duration": 25, "price": 35}, {"name": "Medium Hair", "duration": 35, "price": 45}, {"name": "Long Hair", "duration": 45, "price": 55}]'::jsonb, true),
('Ladies - Hair - GHD Straightening', 'HAIR', 'Styling', 65, 40, '[{"name": "Short Hair", "duration": 40, "price": 65}, {"name": "Medium Hair", "duration": 50, "price": 75}, {"name": "Long Hair", "duration": 60, "price": 85}]'::jsonb, true),
('Ladies - Rollers or Pin Curl', 'HAIR', 'Styling', 35, 30, '[{"name": "Short Hair", "duration": 30, "price": 35}, {"name": "Medium Hair", "duration": 45, "price": 55}, {"name": "Long Hair", "duration": 60, "price": 65}]'::jsonb, true),
('Ladies - Wet Cut', 'HAIR', 'Styling', 45, 25, '[{"name": "Short Hair", "duration": 25, "price": 45}, {"name": "Medium Hair", "duration": 35, "price": 55}, {"name": "Long Hair", "duration": 45, "price": 65}]'::jsonb, true),
('Ladies - Dry Haircut', 'HAIR', 'Styling', 35, 20, '[{"name": "Short Hair", "duration": 20, "price": 35}, {"name": "Medium Hair", "duration": 30, "price": 45}, {"name": "Long Hair", "duration": 40, "price": 55}]'::jsonb, true),
('Hair - Deep Wave Styling', 'HAIR', 'Styling', 45, 45, '[{"name": "Short Hair", "duration": 45, "price": 45}, {"name": "Medium Hair", "duration": 60, "price": 52}, {"name": "Long Hair", "duration": 75, "price": 60}]'::jsonb, true),
('Silk Press and Trim', 'HAIR', 'Styling', 105, 90, '[{"name": "Short Hair", "duration": 90, "price": 105}, {"name": "Medium Hair", "duration": 105, "price": 120}, {"name": "Long Hair", "duration": 120, "price": 135}]'::jsonb, true),
('Ladies - Hydration Treatment and Blow Dry', 'HAIR', 'Styling', 105, 60, '[{"name": "Short Hair", "duration": 60, "price": 105}, {"name": "Medium Hair", "duration": 75, "price": 110}, {"name": "Long Hair", "duration": 90, "price": 120}]'::jsonb, true),
('Ladies - Hydration, Scalp Treatment, Silk Press', 'HAIR', 'Styling', 155, 120, '[{"name": "Short Hair", "duration": 120, "price": 155}, {"name": "Medium Hair", "duration": 135, "price": 175}, {"name": "Long Hair", "duration": 150, "price": 195}]'::jsonb, true),
('Ladies - Protein, Hydration Treatment & Silk Press', 'HAIR', 'Styling', 235, 150, '[{"name": "Short Hair", "duration": 150, "price": 235}, {"name": "Medium Hair", "duration": 165, "price": 255}, {"name": "Long Hair", "duration": 180, "price": 275}]'::jsonb, true),
('Ladies - Hair Bond Repair Treatment & Blow-Dry', 'HAIR', 'Styling', 135, 90, '[{"name": "Short Hair", "duration": 90, "price": 135}, {"name": "Medium Hair", "duration": 105, "price": 155}, {"name": "Long Hair", "duration": 120, "price": 165}]'::jsonb, true),
('Hair - Beach Waves', 'HAIR', 'Styling', 40, 40, '[{"name": "Short Hair", "duration": 40, "price": 40}, {"name": "Medium Hair", "duration": 50, "price": 46}, {"name": "Long Hair", "duration": 60, "price": 52}]'::jsonb, true),
('Hair - Vintage Waves', 'HAIR', 'Styling', 45, 45, '[{"name": "Short Hair", "duration": 45, "price": 45}, {"name": "Medium Hair", "duration": 60, "price": 50}, {"name": "Long Hair", "duration": 75, "price": 58}]'::jsonb, true),
('Hair - Ponytail Styling', 'HAIR', 'Styling', 35, 25, '[{"name": "Short Hair", "duration": 25, "price": 35}, {"name": "Medium Hair", "duration": 35, "price": 40}, {"name": "Long Hair", "duration": 45, "price": 45}]'::jsonb, true),
('Olaplex Treatment with Blow-Dry', 'HAIR', 'Styling', 155, 90, '[{"name": "Short Hair", "duration": 90, "price": 155}, {"name": "Medium Hair", "duration": 105, "price": 175}, {"name": "Long Hair", "duration": 120, "price": 195}]'::jsonb, true),
('Olaplex Treatment with Haircut and Blow-Dry', 'HAIR', 'Styling', 175, 120, '[{"name": "Short Hair", "duration": 120, "price": 175}, {"name": "Medium Hair", "duration": 135, "price": 195}, {"name": "Long Hair", "duration": 150, "price": 215}]'::jsonb, true),
('Ladies'' - Afro Relaxer, Blow dry & Trim', 'HAIR', 'Styling', 75, 30, '[{"name": "Short Hair", "duration": 30, "price": 75}, {"name": "Medium Hair", "duration": 30, "price": 85}, {"name": "Long Hair", "duration": 30, "price": 95}]'::jsonb, true),
('Ladies'' - Japanese Momoko HAIR Straightening', 'HAIR', 'Styling', 460, 180, '[{"name": "Short Length", "duration": 180, "price": 460}, {"name": "Medium Length", "duration": 180, "price": 510}, {"name": "Long Length", "duration": 180, "price": 560}]'::jsonb, true);

-- HAIR - Ladies Hair Colouring
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Full Head HL + Cut & Blow Dry', 'HAIR', 'Ladies'' - Hair Colouring', 270, 120, '[{"name": "Short", "duration": 120, "price": 270}, {"name": "Medium", "duration": 150, "price": 290}, {"name": "Long", "duration": 180, "price": 310}]'::jsonb, true),
('Half Head HL + Cut & Blow Dry', 'HAIR', 'Ladies'' - Hair Colouring', 190, 90, '[{"name": "Short", "duration": 90, "price": 190}, {"name": "Medium", "duration": 120, "price": 210}, {"name": "Long", "duration": 150, "price": 230}]'::jsonb, true),
('T-Section HL + Cut & Blow Dry', 'HAIR', 'Ladies'' - Hair Colouring', 130, 90, '[{"name": "Short", "duration": 90, "price": 130}, {"name": "Medium", "duration": 90, "price": 130}, {"name": "Long", "duration": 120, "price": 170}]'::jsonb, true),
('Full Head Babylights', 'HAIR', 'Ladies'' - Hair Colouring', 250, 150, '[{"name": "Short", "duration": 150, "price": 250}, {"name": "Medium", "duration": 180, "price": 270}, {"name": "Long", "duration": 210, "price": 300}]'::jsonb, true),
('Balayage + Treat + Cut & Blow Dry', 'HAIR', 'Ladies'' - Hair Colouring', 230, 120, '[{"name": "Short", "duration": 120, "price": 230}, {"name": "Medium", "duration": 150, "price": 250}, {"name": "Long", "duration": 180, "price": 290}]'::jsonb, true),
('Root Bleach', 'HAIR', 'Ladies'' - Hair Colouring', 85, 60, '[{"name": "Standard", "duration": 60, "price": 85}]'::jsonb, true),
('Colour Correction', 'HAIR', 'Ladies'' - Hair Colouring', 600, 240, '[{"name": "Standard", "duration": 240, "price": 600}]'::jsonb, true),
('Afro Colour + Treat', 'HAIR', 'Ladies'' - Hair Colouring', 250, 150, '[{"name": "Short", "duration": 150, "price": 250}, {"name": "Medium", "duration": 180, "price": 270}, {"name": "Long", "duration": 210, "price": 300}]'::jsonb, true),
('Toner + Blow Dry', 'HAIR', 'Ladies'' - Hair Colouring', 70, 60, '[{"name": "Standard", "duration": 60, "price": 70}]'::jsonb, true),
('Add-on Toner', 'HAIR', 'Ladies'' - Hair Colouring', 65, 30, '[{"name": "Standard", "duration": 30, "price": 65}]'::jsonb, true),
('Toner + Cut & Blow Dry', 'HAIR', 'Ladies'' - Hair Colouring', 75, 75, '[{"name": "Standard", "duration": 75, "price": 75}]'::jsonb, true),
('Root Bleach + Tone', 'HAIR', 'Ladies'' - Hair Colouring', 150, 90, '[{"name": "Standard", "duration": 90, "price": 150}]'::jsonb, true),
('Full Tint Perm + Cut & Blow Dry', 'HAIR', 'Ladies'' - Hair Colouring', 120, 75, '[{"name": "Short", "duration": 90, "price": 120}, {"name": "Medium", "duration": 75, "price": 140}, {"name": "Long", "duration": 75, "price": 160}]'::jsonb, true),
('Full Tint Semi + Cut & Blow Dry', 'HAIR', 'Ladies'' - Hair Colouring', 80, 60, '[{"name": "Long", "duration": 60, "price": 80}, {"name": "Medium", "duration": 75, "price": 90}, {"name": "Short", "duration": 90, "price": 110}]'::jsonb, true),
('AirTouch Balayage + Cut & Blow Dry', 'HAIR', 'Ladies'' - Hair Colouring', 760, 150, '[{"name": "Short", "duration": 150, "price": 760}, {"name": "Medium", "duration": 180, "price": 780}, {"name": "Long", "duration": 210, "price": 800}]'::jsonb, true);

-- HAIR - Ladies Hair Treatments
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Olaplex Standalone', 'HAIR', 'Ladies'' - Hair Treatments', 155, 45, '[{"name": "Short", "duration": 45, "price": 155}, {"name": "Medium", "duration": 60, "price": 165}, {"name": "Long", "duration": 75, "price": 175}]'::jsonb, true),
('Deep Conditioning Mask', 'HAIR', 'Ladies'' - Hair Treatments', 135, 30, '[{"name": "Short", "duration": 30, "price": 135}, {"name": "Medium", "duration": 45, "price": 140}, {"name": "Long", "duration": 60, "price": 145}]'::jsonb, true),
('Scalp Treatment', 'HAIR', 'Ladies'' - Hair Treatments', 145, 45, '[{"name": "Standard", "duration": 45, "price": 145}]'::jsonb, true),
('Protein Treatment', 'HAIR', 'Ladies'' - Hair Treatments', 145, 45, '[{"name": "Standard", "duration": 45, "price": 145}]'::jsonb, true),
('Hot Oil Treatment', 'HAIR', 'Ladies'' - Hair Treatments', 145, 45, '[{"name": "Standard", "duration": 45, "price": 145}]'::jsonb, true),
('Hair Repair Package', 'HAIR', 'Ladies'' - Hair Treatments', 185, 90, '[{"name": "Short", "duration": 90, "price": 185}, {"name": "Medium", "duration": 105, "price": 195}, {"name": "Long", "duration": 120, "price": 205}]'::jsonb, true),
('Split End Treatment', 'HAIR', 'Ladies'' - Hair Treatments', 135, 30, '[{"name": "Standard", "duration": 30, "price": 135}]'::jsonb, true),
('Detox Treatment', 'HAIR', 'Ladies'' - Hair Treatments', 145, 45, '[{"name": "Standard", "duration": 45, "price": 145}]'::jsonb, true),
('Shine Gloss', 'HAIR', 'Ladies'' - Hair Treatments', 140, 30, '[{"name": "Standard", "duration": 30, "price": 140}]'::jsonb, true),
('Anti-Frizz Treatment', 'HAIR', 'Ladies'' - Hair Treatments', 170, 60, '[{"name": "Standard", "duration": 60, "price": 170}]'::jsonb, true),
('Post-Colour Treatment', 'HAIR', 'Ladies'' - Hair Treatments', 130, 30, '[{"name": "Standard", "duration": 30, "price": 130}]'::jsonb, true);

-- HAIR - Children Braids Cornrows Twists
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Children - Afro Braids', 'HAIR', 'Children - Braids, Cornrows & Twists', 55, 20, '[{"name": "Short Hair", "duration": 20, "price": 55}, {"name": "Medium Hair", "duration": 25, "price": 65}, {"name": "Long Hair", "duration": 30, "price": 75}]'::jsonb, true),
('Children - Cornrows', 'HAIR', 'Children - Braids, Cornrows & Twists', 45, 30, '[{"name": "Short Hair", "duration": 30, "price": 45}, {"name": "Medium Hair", "duration": 35, "price": 55}, {"name": "Long Hair", "duration": 40, "price": 65}]'::jsonb, true),
('Children - Twists', 'HAIR', 'Children - Braids, Cornrows & Twists', 55, 35, '[{"name": "Short Hair", "duration": 35, "price": 55}, {"name": "Medium Hair", "duration": 40, "price": 65}, {"name": "Long Hair", "duration": 45, "price": 75}]'::jsonb, true);

-- HAIR - Children Haircuts
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Children - Dry Haircut', 'HAIR', 'Children - Haircuts & Hairdressing', 22, 20, '[{"name": "Short", "duration": 20, "price": 22}, {"name": "Medium", "duration": 25, "price": 25}, {"name": "Long", "duration": 30, "price": 28}]'::jsonb, true),
('Children - Wash, Cut & Blow Dry', 'HAIR', 'Children - Haircuts & Hairdressing', 30, 30, '[{"name": "Short", "duration": 30, "price": 30}, {"name": "Medium", "duration": 35, "price": 35}, {"name": "Long", "duration": 40, "price": 40}]'::jsonb, true);

-- HAIR - Hair Extras
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Hair - Half-Up Half-Down', 'HAIR', 'Hair Extras', 42, 40, '[{"name": "Short Hair", "duration": 40, "price": 42}, {"name": "Medium Hair", "duration": 50, "price": 48}, {"name": "Long Hair", "duration": 60, "price": 55}]'::jsonb, true),
('Hair - Braided Updo', 'HAIR', 'Hair Extras', 58, 60, '[{"name": "Short Hair", "duration": 60, "price": 58}, {"name": "Medium Hair", "duration": 75, "price": 65}, {"name": "Long Hair", "duration": 90, "price": 75}]'::jsonb, true),
('Hair - Sleek Bun', 'HAIR', 'Hair Extras', 38, 25, '[{"name": "Short Hair", "duration": 25, "price": 38}, {"name": "Medium Hair", "duration": 35, "price": 42}, {"name": "Long Hair", "duration": 45, "price": 48}]'::jsonb, true);

-- HAIR - Ladies Braids Cornrows Twists
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Braids (Single)', 'HAIR', 'Ladies'' - Braids, Cornrows & Twists', 65, 60, '[{"name": "Short Hair", "duration": 60, "price": 65}, {"name": "Medium Hair", "duration": 75, "price": 75}, {"name": "Long Hair", "duration": 90, "price": 85}]'::jsonb, true),
('Cornrows', 'HAIR', 'Ladies'' - Braids, Cornrows & Twists', 40, 30, '[{"name": "Short Hair", "duration": 30, "price": 40}, {"name": "Medium Hair", "duration": 45, "price": 50}, {"name": "Long Hair", "duration": 60, "price": 60}]'::jsonb, true),
('Twists', 'HAIR', 'Ladies'' - Braids, Cornrows & Twists', 70, 60, '[{"name": "Short Hair", "duration": 60, "price": 70}, {"name": "Medium Hair", "duration": 75, "price": 80}, {"name": "Long Hair", "duration": 90, "price": 90}]'::jsonb, true);

-- HAIR - Ladies Haircuts & Hairdressing
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Dry Trim', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 28, 20, '[{"name": "Short", "duration": 20, "price": 28}, {"name": "Medium", "duration": 25, "price": 32}, {"name": "Long", "duration": 30, "price": 36}]'::jsonb, true),
('Wash & Blow Dry', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 32, 30, '[{"name": "Short", "duration": 30, "price": 32}, {"name": "Medium", "duration": 40, "price": 38}, {"name": "Long", "duration": 50, "price": 45}]'::jsonb, true),
('Cut & Blow Dry', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 45, 45, '[{"name": "Short", "duration": 45, "price": 45}, {"name": "Medium", "duration": 60, "price": 52}, {"name": "Long", "duration": 75, "price": 59}]'::jsonb, true),
('Restyle Cut', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 55, 60, '[{"name": "Short", "duration": 60, "price": 55}, {"name": "Medium", "duration": 75, "price": 62}, {"name": "Long", "duration": 90, "price": 70}]'::jsonb, true),
('Curly Blow Dry', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 38, 45, '[{"name": "Short", "duration": 45, "price": 38}, {"name": "Medium", "duration": 55, "price": 44}, {"name": "Long", "duration": 65, "price": 50}]'::jsonb, true),
('Hair Up (Updo)', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 55, 60, '[{"name": "Short", "duration": 60, "price": 55}, {"name": "Medium", "duration": 75, "price": 65}, {"name": "Long", "duration": 90, "price": 75}]'::jsonb, true),
('Fringe Trim', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 16, 10, '[{"name": "Standard", "duration": 10, "price": 16}]'::jsonb, true),
('Roller Set', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 32, 45, '[{"name": "Short", "duration": 45, "price": 32}, {"name": "Medium", "duration": 55, "price": 38}, {"name": "Long", "duration": 65, "price": 44}]'::jsonb, true),
('GHD Curls', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 35, 30, '[{"name": "Short", "duration": 30, "price": 35}, {"name": "Medium", "duration": 40, "price": 40}, {"name": "Long", "duration": 50, "price": 45}]'::jsonb, true),
('Pin Curls', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 35, 30, '[{"name": "Short", "duration": 30, "price": 35}, {"name": "Medium", "duration": 40, "price": 40}, {"name": "Long", "duration": 50, "price": 45}]'::jsonb, true),
('Straightening', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 32, 30, '[{"name": "Short", "duration": 30, "price": 32}, {"name": "Medium", "duration": 40, "price": 38}, {"name": "Long", "duration": 50, "price": 45}]'::jsonb, true),
('Hair Wash Only', 'HAIR', 'Ladies'' - Haircuts & Hairdressing', 20, 15, '[{"name": "Standard", "duration": 15, "price": 20}]'::jsonb, true);

-- HAIR - Ladies Weaves & Wigs
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Ladies - Traditional Weave (Signature Service)', 'HAIR', 'Ladies'' - Weaves & Wigs', 125, 120, '[{"name": "Standard", "duration": 120, "price": 125}]'::jsonb, true),
('Ladies - Versatile Weave', 'HAIR', 'Ladies'' - Weaves & Wigs', 165, 150, '[{"name": "Standard", "duration": 150, "price": 165}]'::jsonb, true),
('Ladies - Weave - 3 Part Sew In', 'HAIR', 'Ladies'' - Weaves & Wigs', 185, 150, '[{"name": "Standard", "duration": 150, "price": 185}]'::jsonb, true),
('Ladies Weave Maintenance', 'HAIR', 'Ladies'' - Weaves & Wigs', 95, 60, '[{"name": "Standard", "duration": 60, "price": 95}]'::jsonb, true),
('Weft Installation (Per Row)', 'HAIR', 'Ladies'' - Weaves & Wigs', 65, 30, '[{"name": "Standard", "duration": 30, "price": 65}]'::jsonb, true),
('Weft Installation 2-3 Rows', 'HAIR', 'Ladies'' - Weaves & Wigs', 125, 60, '[{"name": "Standard", "duration": 60, "price": 125}]'::jsonb, true),
('Weft Installation Full Head', 'HAIR', 'Ladies'' - Weaves & Wigs', 165, 90, '[{"name": "Standard", "duration": 90, "price": 165}]'::jsonb, true),
('Wig Install', 'HAIR', 'Ladies'' - Weaves & Wigs', 85, 90, '[{"name": "Standard", "duration": 90, "price": 85}]'::jsonb, true),
('Wig Styling', 'HAIR', 'Ladies'' - Weaves & Wigs', 45, 60, '[{"name": "Standard", "duration": 60, "price": 45}]'::jsonb, true),
('Wig Braid Down', 'HAIR', 'Ladies'' - Weaves & Wigs', 35, 30, '[{"name": "Standard", "duration": 30, "price": 35}]'::jsonb, true);

-- HAIR - Extension Removal & Refitting
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Hollywood Weave Refit 1 Row', 'HAIR', 'Hair Extension Removal & Refitting Services', 150, 60, '[{"name": "Standard", "duration": 60, "price": 150}]'::jsonb, true),
('Hollywood Weave Refit 2–3 Rows', 'HAIR', 'Hair Extension Removal & Refitting Services', 210, 90, '[{"name": "Standard", "duration": 90, "price": 210}]'::jsonb, true),
('Hollywood Weave Refit 4–5 Rows', 'HAIR', 'Hair Extension Removal & Refitting Services', 250, 120, '[{"name": "Standard", "duration": 120, "price": 250}]'::jsonb, true),
('Hollywood Weave Refit 6–7 Rows', 'HAIR', 'Hair Extension Removal & Refitting Services', 290, 150, '[{"name": "Standard", "duration": 150, "price": 290}]'::jsonb, true),
('Enhanced Weave Refit', 'HAIR', 'Hair Extension Removal & Refitting Services', 210, 90, '[{"name": "Standard", "duration": 90, "price": 210}]'::jsonb, true),
('Enhanced Weave Refit Mini', 'HAIR', 'Hair Extension Removal & Refitting Services', 310, 120, '[{"name": "Standard", "duration": 120, "price": 310}]'::jsonb, true),
('Tape Refit Up to 6', 'HAIR', 'Hair Extension Removal & Refitting Services', 150, 60, '[{"name": "Standard", "duration": 60, "price": 150}]'::jsonb, true),
('Tape Refit Up to 12', 'HAIR', 'Hair Extension Removal & Refitting Services', 210, 90, '[{"name": "Standard", "duration": 90, "price": 210}]'::jsonb, true),
('Tape Refit Up to 20', 'HAIR', 'Hair Extension Removal & Refitting Services', 280, 120, '[{"name": "Standard", "duration": 120, "price": 280}]'::jsonb, true),
('Tape Removal', 'HAIR', 'Hair Extension Removal & Refitting Services', 60, 30, '[{"name": "Standard", "duration": 30, "price": 60}]'::jsonb, true),
('Keratin Removal 150+ pcs', 'HAIR', 'Hair Extension Removal & Refitting Services', 140, 90, '[{"name": "Standard", "duration": 90, "price": 140}]'::jsonb, true),
('Keratin Removal Up to 150', 'HAIR', 'Hair Extension Removal & Refitting Services', 90, 60, '[{"name": "Standard", "duration": 60, "price": 90}]'::jsonb, true),
('Enhanced Weave Removal', 'HAIR', 'Hair Extension Removal & Refitting Services', 80, 45, '[{"name": "Standard", "duration": 45, "price": 80}]'::jsonb, true),
('Hollywood Weave Removal', 'HAIR', 'Hair Extension Removal & Refitting Services', 60, 30, '[{"name": "Standard", "duration": 30, "price": 60}]'::jsonb, true),
('Micro Ring Quick Fix', 'HAIR', 'Hair Extension Removal & Refitting Services', 20, 15, '[{"name": "Standard", "duration": 15, "price": 20}]'::jsonb, true),
('Micro Ring Removal', 'HAIR', 'Hair Extension Removal & Refitting Services', 60, 30, '[{"name": "Standard", "duration": 30, "price": 60}]'::jsonb, true),
('Micro Ring Refit 100g', 'HAIR', 'Hair Extension Removal & Refitting Services', 230, 120, '[{"name": "Standard", "duration": 120, "price": 230}]'::jsonb, true),
('Micro Ring Refit Up to 150g', 'HAIR', 'Hair Extension Removal & Refitting Services', 280, 150, '[{"name": "Standard", "duration": 150, "price": 280}]'::jsonb, true),
('Keratin Refit Up to 50g', 'HAIR', 'Hair Extension Removal & Refitting Services', 280, 120, '[{"name": "Standard", "duration": 120, "price": 280}]'::jsonb, true),
('Keratin Refit Up to 100g', 'HAIR', 'Hair Extension Removal & Refitting Services', 350, 150, '[{"name": "Standard", "duration": 150, "price": 350}]'::jsonb, true),
('Keratin Refit Up to 200g', 'HAIR', 'Hair Extension Removal & Refitting Services', 470, 180, '[{"name": "Standard", "duration": 180, "price": 470}]'::jsonb, true),
('Removal + Nutrition', 'HAIR', 'Hair Extension Removal & Refitting Services', 145, 60, '[{"name": "Standard", "duration": 60, "price": 145}]'::jsonb, true),
('Custom Clip-ins', 'HAIR', 'Hair Extension Removal & Refitting Services', 85, 45, '[{"name": "Standard", "duration": 45, "price": 85}]'::jsonb, true),
('Extension Removal Service', 'HAIR', 'Hair Extension Removal & Refitting Services', 60, 30, '[{"name": "Standard", "duration": 30, "price": 60}]'::jsonb, true);

-- HAIR - Extension Application
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Hollywood Weave Application Only', 'HAIR', 'Hair Extensions Application Only Services', 100, 60, '[{"name": "1 Row", "duration": 60, "price": 100}, {"name": "2–3 Rows", "duration": 90, "price": 180}, {"name": "4–5 Rows", "duration": 120, "price": 220}, {"name": "5–7 Rows", "duration": 150, "price": 260}]'::jsonb, true),
('Tape Extensions Application Only', 'HAIR', 'Hair Extensions Application Only Services', 130, 45, '[{"name": "Up to 6", "duration": 45, "price": 130}, {"name": "Up to 12", "duration": 60, "price": 190}, {"name": "Up to 20", "duration": 90, "price": 220}]'::jsonb, true),
('Keratin Bond Application Only', 'HAIR', 'Hair Extensions Application Only Services', 210, 90, '[{"name": "Up to 50g", "duration": 90, "price": 210}, {"name": "Up to 100g", "duration": 120, "price": 270}, {"name": "Up to 200g", "duration": 180, "price": 390}]'::jsonb, true),
('Micro Ring Application Only', 'HAIR', 'Hair Extensions Application Only Services', 230, 120, '[{"name": "Up to 150g", "duration": 120, "price": 230}]'::jsonb, true),
('Enhanced Weave Application Only', 'HAIR', 'Hair Extensions Application Only Services', 270, 120, '[{"name": "Standard", "duration": 120, "price": 270}]'::jsonb, true),
('Clip-ins Install + W/C/BD', 'HAIR', 'Hair Extensions Application Only Services', 130, 60, '[{"name": "8pc", "duration": 60, "price": 130}, {"name": "15pc", "duration": 75, "price": 155}, {"name": "20pc", "duration": 90, "price": 165}]'::jsonb, true);

-- HAIR - Men Braids
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Men - Braids', 'HAIR', 'Men - Braids, Cornrows & Twists', 70, 60, '[{"name": "Short Hair", "duration": 60, "price": 70}, {"name": "Medium Hair", "duration": 75, "price": 80}, {"name": "Long Hair", "duration": 90, "price": 90}]'::jsonb, true),
('Men - Cornrows', 'HAIR', 'Men - Braids, Cornrows & Twists', 45, 30, '[{"name": "Short Hair", "duration": 30, "price": 45}, {"name": "Medium Hair", "duration": 45, "price": 55}, {"name": "Long Hair", "duration": 60, "price": 65}]'::jsonb, true),
('Men - Twists', 'HAIR', 'Men - Braids, Cornrows & Twists', 75, 60, '[{"name": "Short Hair", "duration": 60, "price": 75}, {"name": "Medium Hair", "duration": 75, "price": 85}, {"name": "Long Hair", "duration": 90, "price": 95}]'::jsonb, true);

-- NAILS - Hands & Feet
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Hands - Manicure (Classic)', 'NAILS', 'Hands & Feet', 30, 45, '[{"name": "45 min", "duration": 45, "price": 30}]'::jsonb, true),
('Hands - Gel Manicure', 'NAILS', 'Hands & Feet', 40, 60, '[{"name": "1 hour", "duration": 60, "price": 40}]'::jsonb, true),
('Feet - Pedicure (Classic)', 'NAILS', 'Hands & Feet', 40, 60, '[{"name": "1 hour", "duration": 60, "price": 40}]'::jsonb, true),
('Feet - Gel Pedicure', 'NAILS', 'Hands & Feet', 45, 60, '[{"name": "1 hour", "duration": 60, "price": 45}]'::jsonb, true);

-- NAILS - Extensions & Enhancements
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Nail Extensions - Full Set Acrylic (Naked Full Set)', 'NAILS', 'Extensions & Enhancements', 45, 60, '[{"name": "1 hour", "duration": 60, "price": 45}]'::jsonb, true),
('Nail Extensions - Full Set Acrylic (Naked Full Set Toes)', 'NAILS', 'Extensions & Enhancements', 55, 75, '[{"name": "1h 15min", "duration": 75, "price": 55}]'::jsonb, true),
('Nail Extensions - Full Set Acrylic (French Tip)', 'NAILS', 'Extensions & Enhancements', 55, 75, '[{"name": "1h 15min", "duration": 75, "price": 55}]'::jsonb, true),
('Nail Extensions - Full Set Acrylic with Design', 'NAILS', 'Extensions & Enhancements', 60, 90, '[{"name": "1h 30min", "duration": 90, "price": 60}]'::jsonb, true),
('Nail Extensions - Full Set Gel / BIAB', 'NAILS', 'Extensions & Enhancements', 45, 60, '[{"name": "1 hour", "duration": 60, "price": 45}]'::jsonb, true),
('Nail Extensions - Full Set Pink & White', 'NAILS', 'Extensions & Enhancements', 58, 75, '[{"name": "1h 15min", "duration": 75, "price": 58}]'::jsonb, true),
('Nail Extensions - Full Set Ombre', 'NAILS', 'Extensions & Enhancements', 58, 75, '[{"name": "1h 15min", "duration": 75, "price": 58}]'::jsonb, true),
('Nail Extensions - Gel White Tips', 'NAILS', 'Extensions & Enhancements', 55, 75, '[{"name": "1h 15min", "duration": 75, "price": 55}]'::jsonb, true),
('Nail Extensions - Acrylic - Big Toes', 'NAILS', 'Extensions & Enhancements', 20, 20, '[{"name": "20 min", "duration": 20, "price": 20}]'::jsonb, true),
('Nail Extensions - Acrylic Removal & Reapplication', 'NAILS', 'Extensions & Enhancements', 75, 105, '[{"name": "1h 45min", "duration": 105, "price": 75}]'::jsonb, true),
('Nail Extensions - Gel Removal & Reapplication', 'NAILS', 'Extensions & Enhancements', 65, 90, '[{"name": "1h 30min", "duration": 90, "price": 65}]'::jsonb, true),
('Nail Extensions - Full Set Bio Sculpture Gel', 'NAILS', 'Extensions & Enhancements', 55, 75, '[{"name": "1h 15min", "duration": 75, "price": 55}]'::jsonb, true),
('Nail Extensions - GEL Sculpture Infills', 'NAILS', 'Extensions & Enhancements', 45, 60, '[{"name": "1 hour", "duration": 60, "price": 45}]'::jsonb, true),
('Nail Extensions - Acrylic Infills', 'NAILS', 'Extensions & Enhancements', 45, 60, '[{"name": "1 hour", "duration": 60, "price": 45}]'::jsonb, true),
('Nail Extensions - Gel / BIAB Infills', 'NAILS', 'Extensions & Enhancements', 40, 50, '[{"name": "50 min", "duration": 50, "price": 40}]'::jsonb, true),
('Nail Extensions - Pink & White Infills', 'NAILS', 'Extensions & Enhancements', 48, 60, '[{"name": "1 hour", "duration": 60, "price": 48}]'::jsonb, true),
('Nail Extensions - Ombre Infills', 'NAILS', 'Extensions & Enhancements', 45, 60, '[{"name": "1 hour", "duration": 60, "price": 45}]'::jsonb, true),
('Nail Extensions - Removal', 'NAILS', 'Extensions & Enhancements', 25, 20, '[{"name": "20 min", "duration": 20, "price": 25}]'::jsonb, true);

-- FACIALS
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Facial- Classic', 'FACIALS', 'Facial Treatments', 155, 90, '[{"name": "1h 30min", "duration": 90, "price": 155}]'::jsonb, true),
('Facial- Eye Treatment', 'FACIALS', 'Facial Treatments', 130, 75, '[{"name": "1h 15min", "duration": 75, "price": 130}]'::jsonb, true),
('Facial - Dermalogica', 'FACIALS', 'Facial Treatments', 160, 90, '[{"name": "1h 30min", "duration": 90, "price": 160}]'::jsonb, true),
('Facial - Skin Peel', 'FACIALS', 'Facial Treatments', 85, 45, '[{"name": "45 min", "duration": 45, "price": 85}]'::jsonb, true),
('Facial - Microdermabrasion', 'FACIALS', 'Facial Treatments', 130, 75, '[{"name": "1h 15min", "duration": 75, "price": 130}]'::jsonb, true),
('Facial- Dermaplaning', 'FACIALS', 'Facial Treatments', 105, 60, '[{"name": "1 hour", "duration": 60, "price": 105}]'::jsonb, true),
('Facial - Radio Frequency Skin Tightening', 'FACIALS', 'Facial Treatments', 360, 150, '[{"name": "2h 30min", "duration": 150, "price": 360}]'::jsonb, true),
('Facial - LED Light Therapy', 'FACIALS', 'Facial Treatments', 120, 60, '[{"name": "1 hour", "duration": 60, "price": 120}]'::jsonb, true),
('Facial - Skin Rejuvenation', 'FACIALS', 'Facial Treatments', 300, 120, '[{"name": "2 hours", "duration": 120, "price": 300}]'::jsonb, true),
('Facial - Laser Skin Rejuvenation', 'FACIALS', 'Facial Treatments', 300, 120, '[{"name": "2 hours", "duration": 120, "price": 300}]'::jsonb, true),
('Facial - Pigmentation Treatment', 'FACIALS', 'Facial Treatments', 160, 90, '[{"name": "1h 30min", "duration": 90, "price": 160}]'::jsonb, true),
('Facial - Dermapen', 'FACIALS', 'Facial Treatments', 160, 90, '[{"name": "1h 30min", "duration": 90, "price": 160}]'::jsonb, true),
('Facial - Micro Needling', 'FACIALS', 'Facial Treatments', 155, 90, '[{"name": "1h 30min", "duration": 90, "price": 155}]'::jsonb, true),
('Facial - Anti-Ageing', 'FACIALS', 'Facial Treatments', 230, 120, '[{"name": "2 hours", "duration": 120, "price": 230}]'::jsonb, true),
('Facial-Deep Cleansing', 'FACIALS', 'Facial Treatments', 190, 105, '[{"name": "1h 45min", "duration": 105, "price": 190}]'::jsonb, true),
('Facial - Gold', 'FACIALS', 'Facial Treatments', 150, 90, '[{"name": "1h 30min", "duration": 90, "price": 150}]'::jsonb, true),
('Facial- Hydrating', 'FACIALS', 'Facial Treatments', 105, 60, '[{"name": "1 hour", "duration": 60, "price": 105}]'::jsonb, true),
('Facial-Acne Treatment', 'FACIALS', 'Facial Treatments', 105, 60, '[{"name": "1 hour", "duration": 60, "price": 105}]'::jsonb, true),
('Facial- High Frequency', 'FACIALS', 'Facial Treatments', 70, 45, '[{"name": "45 min", "duration": 45, "price": 70}]'::jsonb, true),
('Facial-CACI Non-Surgical Face Lift', 'FACIALS', 'Facial Treatments', 105, 60, '[{"name": "1 hour", "duration": 60, "price": 105}]'::jsonb, true),
('Facial- CACI Jowl Lift', 'FACIALS', 'Facial Treatments', 55, 30, '[{"name": "30 min", "duration": 30, "price": 55}]'::jsonb, true),
('Facial - CACI Eye Revive', 'FACIALS', 'Facial Treatments', 65, 40, '[{"name": "40 min", "duration": 40, "price": 65}]'::jsonb, true),
('Facial - CACI Hydratone', 'FACIALS', 'Facial Treatments', 50, 30, '[{"name": "30 min", "duration": 30, "price": 50}]'::jsonb, true),
('Facial- CACI Skin Rejuvenation', 'FACIALS', 'Facial Treatments', 120, 60, '[{"name": "1 hour", "duration": 60, "price": 120}]'::jsonb, true),
('Facials - Chemical Peel', 'FACIALS', 'Facial Treatments', 80, 45, '[{"name": "45 min", "duration": 45, "price": 80}]'::jsonb, true);

-- WAXING AND THREADING - Body Waxing
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Waxing - Half Leg', 'WAXING AND THREADING', 'Body Waxing', 28, 20, '[{"name": "20 min", "duration": 20, "price": 28}]'::jsonb, true),
('Waxing - Full Leg', 'WAXING AND THREADING', 'Body Waxing', 35, 30, '[{"name": "30 min", "duration": 30, "price": 35}]'::jsonb, true),
('Waxing - Underarm', 'WAXING AND THREADING', 'Body Waxing', 18, 10, '[{"name": "10 min", "duration": 10, "price": 18}]'::jsonb, true),
('Waxing - Bikini', 'WAXING AND THREADING', 'Body Waxing', 28, 20, '[{"name": "20 min", "duration": 20, "price": 28}]'::jsonb, true),
('Waxing - Hollywood', 'WAXING AND THREADING', 'Body Waxing', 40, 30, '[{"name": "30 min", "duration": 30, "price": 40}]'::jsonb, true),
('Waxing - Brazilian', 'WAXING AND THREADING', 'Body Waxing', 38, 30, '[{"name": "30 min", "duration": 30, "price": 38}]'::jsonb, true);

-- WAXING AND THREADING - Threading
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Chin', 'WAXING AND THREADING', 'Threading', 30, 15, '[{"name": "15 min", "duration": 15, "price": 30}]'::jsonb, true),
('Lower Lip', 'WAXING AND THREADING', 'Threading', 30, 15, '[{"name": "15 min", "duration": 15, "price": 30}]'::jsonb, true),
('Upper Lip', 'WAXING AND THREADING', 'Threading', 30, 15, '[{"name": "15 min", "duration": 15, "price": 30}]'::jsonb, true),
('Eyebrows', 'WAXING AND THREADING', 'Threading', 35, 20, '[{"name": "20 min", "duration": 20, "price": 35}]'::jsonb, true),
('Forehead', 'WAXING AND THREADING', 'Threading', 35, 20, '[{"name": "20 min", "duration": 20, "price": 35}]'::jsonb, true),
('Lip & Chin', 'WAXING AND THREADING', 'Threading', 40, 25, '[{"name": "25 min", "duration": 25, "price": 40}]'::jsonb, true),
('Sides', 'WAXING AND THREADING', 'Threading', 40, 25, '[{"name": "25 min", "duration": 25, "price": 40}]'::jsonb, true),
('Full Face', 'WAXING AND THREADING', 'Threading', 75, 45, '[{"name": "45 min", "duration": 45, "price": 75}]'::jsonb, true);

-- BROWS AND LASHES - Brows
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Brows - Lamination', 'BROWS AND LASHES', 'Brows', 45, 45, '[{"name": "45 min", "duration": 45, "price": 45}]'::jsonb, true),
('Brows - Tint', 'BROWS AND LASHES', 'Brows', 20, 15, '[{"name": "15 min", "duration": 15, "price": 20}]'::jsonb, true),
('Brows - Shape (Wax/Thread)', 'BROWS AND LASHES', 'Brows', 20, 15, '[{"name": "15 min", "duration": 15, "price": 20}]'::jsonb, true),
('Brows - Shape & Tint', 'BROWS AND LASHES', 'Brows', 28, 25, '[{"name": "25 min", "duration": 25, "price": 28}]'::jsonb, true);

-- BROWS AND LASHES - Lashes
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Lashes - Classic', 'BROWS AND LASHES', 'Lashes', 55, 90, '[{"name": "1h 30min", "duration": 90, "price": 55}]'::jsonb, true),
('Lashes - Hybrid', 'BROWS AND LASHES', 'Lashes', 65, 105, '[{"name": "1h 45min", "duration": 105, "price": 65}]'::jsonb, true),
('Lashes - Volume', 'BROWS AND LASHES', 'Lashes', 75, 120, '[{"name": "2 hours", "duration": 120, "price": 75}]'::jsonb, true),
('Lashes - Mega Volume', 'BROWS AND LASHES', 'Lashes', 85, 135, '[{"name": "2h 15min", "duration": 135, "price": 85}]'::jsonb, true),
('Lashes - Removal', 'BROWS AND LASHES', 'Lashes', 25, 20, '[{"name": "20 min", "duration": 20, "price": 25}]'::jsonb, true);

-- MAKE UP
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Makeup', 'MAKE UP', 'Makeup Services', 55, 45, '[{"name": "45 min", "duration": 45, "price": 55}]'::jsonb, true),
('Day Makeup', 'MAKE UP', 'Makeup Services', 55, 45, '[{"name": "45 min", "duration": 45, "price": 55}]'::jsonb, true),
('Party Makeup', 'MAKE UP', 'Makeup Services', 85, 60, '[{"name": "1 hour", "duration": 60, "price": 85}]'::jsonb, true),
('Festival Makeup', 'MAKE UP', 'Makeup Services', 90, 60, '[{"name": "1 hour", "duration": 60, "price": 90}]'::jsonb, true),
('Evening Makeup', 'MAKE UP', 'Makeup Services', 105, 75, '[{"name": "1h 15min", "duration": 75, "price": 105}]'::jsonb, true),
('Makeup incl. Strip Lashes', 'MAKE UP', 'Makeup Services', 95, 60, '[{"name": "1 hour", "duration": 60, "price": 95}]'::jsonb, true),
('Eye Makeup', 'MAKE UP', 'Makeup Services', 40, 30, '[{"name": "30 min", "duration": 30, "price": 40}]'::jsonb, true),
('Eye Makeup incl. Strip Lashes', 'MAKE UP', 'Makeup Services', 50, 40, '[{"name": "40 min", "duration": 40, "price": 50}]'::jsonb, true),
('Wedding Makeup (Bridesmaid)', 'MAKE UP', 'Makeup Services', 130, 90, '[{"name": "1h 30min", "duration": 90, "price": 130}]'::jsonb, true),
('Wedding Makeup (Mother of The Bride)', 'MAKE UP', 'Makeup Services', 155, 90, '[{"name": "1h 30min", "duration": 90, "price": 155}]'::jsonb, true),
('Wedding Makeup (Bride)', 'MAKE UP', 'Makeup Services', 160, 120, '[{"name": "2 hours", "duration": 120, "price": 160}]'::jsonb, true),
('Bridal Makeup', 'MAKE UP', 'Makeup Services', 160, 120, '[{"name": "2 hours", "duration": 120, "price": 160}]'::jsonb, true),
('Bridal Hair & Makeup', 'MAKE UP', 'Makeup Services', 460, 240, '[{"name": "4 hours", "duration": 240, "price": 460}]'::jsonb, true),
('Makeup & Hair Up', 'MAKE UP', 'Makeup Services', 370, 180, '[{"name": "3 hours", "duration": 180, "price": 370}]'::jsonb, true),
('Bridal Hair & Makeup - Trial', 'MAKE UP', 'Makeup Services', 260, 150, '[{"name": "2h 30min", "duration": 150, "price": 260}]'::jsonb, true);

-- TANNING
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Spray Tan - Full Body', 'TANNING', 'Spray Tan', 30, 20, '[{"name": "20 min", "duration": 20, "price": 30}]'::jsonb, true);

-- PIERCING
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Ear Piercing (Single)', 'PIERCING', 'Ear Piercing', 25, 15, '[{"name": "15 min", "duration": 15, "price": 25}]'::jsonb, true),
('Ear Piercing (Pair)', 'PIERCING', 'Ear Piercing', 35, 20, '[{"name": "20 min", "duration": 20, "price": 35}]'::jsonb, true);

-- BODY - Massage
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Massage - Back, Neck & Shoulders', 'BODY', 'Massage', 45, 30, '[{"name": "30 min", "duration": 30, "price": 45}]'::jsonb, true),
('Massage - Full Body', 'BODY', 'Massage', 65, 60, '[{"name": "1 hour", "duration": 60, "price": 65}]'::jsonb, true),
('Massage - Full Body (90 min)', 'BODY', 'Massage', 85, 90, '[{"name": "1h 30min", "duration": 90, "price": 85}]'::jsonb, true);

-- BODY - Treatments
INSERT INTO services (name, category, subcategory, price, duration, options, active) VALUES
('Body - Scrub & Polish', 'BODY', 'Treatments', 50, 45, '[{"name": "45 min", "duration": 45, "price": 50}]'::jsonb, true),
('Body - Slimming Wrap', 'BODY', 'Treatments', 70, 60, '[{"name": "1 hour", "duration": 60, "price": 70}]'::jsonb, true);