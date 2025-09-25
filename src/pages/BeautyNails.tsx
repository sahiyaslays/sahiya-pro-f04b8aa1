import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

const BeautyNails = () => {
  const beautyServices = [
    { name: "Makeup Application", price: "from £60" },
    { name: "Eyebrow Shaping", price: "from £12" },
    { name: "Eyebrow Colouring", price: "from £15" },
    { name: "Wedding Services", price: "by consultation" }
  ];

  const nailServices = [
    { name: "Classic Manicure", price: "from £25" },
    { name: "Gel Manicure", price: "from £35" },
    { name: "Pedicure", price: "from £40" },
    { name: "Gel Pedicure", price: "from £50" },
    { name: "Nail Art & Design", price: "from £45" },
    { name: "French Manicure", price: "from £30" }
  ];

  const galleryImages = [
    {
      src: "/lovable-uploads/cd31cb0b-e8f6-453f-8291-3e14f20d0994.png",
      alt: "Colorful nail art with gold accents"
    },
    {
      src: "/lovable-uploads/8083105a-56c1-478e-92f8-6424fb55f2d1.png",
      alt: "Elegant gold and blue nail design"
    },
    {
      src: "/lovable-uploads/7657c8d2-1f54-4097-aa56-7735e2dfb2ea.png",
      alt: "Yellow French tip nails with star details"
    },
    {
      src: "/lovable-uploads/fd5b798a-51de-4b44-8082-4b52a5fa564a.png",
      alt: "Gold French tip with floral accents"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-abel">
      <Header />
      
      {/* Hero Section */}
      <section className="h-[34vh] md:h-[40vh] bg-white flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Brand tagline */}
          <div className="text-primary text-xs md:text-sm tracking-widest mb-4 uppercase">
            SS • HAIR • BEAUTY • NAILS
          </div>
          
          <h1 className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-[#121212] uppercase">
            BEAUTY & NAILS
          </h1>
          
          {/* Thin gold hairline */}
          <div className="w-10 h-[2px] bg-primary mx-auto mb-6"></div>
          
          <p className="text-base md:text-lg text-[#5D6776] tracking-wide leading-relaxed">
            Complete your look with expert care.
          </p>
        </div>
      </section>

      {/* Intro line */}
      <section className="py-8 px-4">
        <div className="max-w-[820px] mx-auto text-center">
          <p className="text-base md:text-lg text-[#6A7383] leading-relaxed">
            From beauty treatments to nails, we've got you covered. Our skilled technicians provide premium services in a relaxing environment.
          </p>
        </div>
      </section>

      {/* NAILS Category */}
      <section className="py-12 px-4">
        <div className="max-w-[1140px] mx-auto">
          {/* Category Bar: NAILS */}
          <div className="bg-[#0B0F17] text-white text-center py-4 mb-12">
            <h2 className="text-lg font-bold tracking-[0.2em] uppercase">NAILS</h2>
          </div>

          {/* GEL Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-6 tracking-[0.15em] uppercase">GEL</h3>
            <p className="text-center text-[#6A7383] mb-8 text-sm">Inc: File and cuticle care</p>
            
            <div className="max-w-4xl mx-auto space-y-0">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">CLEAR COATING NAILIST</span>
                <span className="text-[#111]">£55 / SENIOR NAILIST - £63 / TOP NAILIST - £73</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">ONE COLOUR NAILIST</span>
                <span className="text-[#111]">£60 / SENIOR NAILIST - £74 / TOP NAILIST - £84</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">GRADATION (CLEAR BASE) NAILIST</span>
                <span className="text-[#111]">£65 / SENIOR NAILIST - £77 / TOP NAILIST - £87</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">FRENCH (CLEAR BASE) NAILIST</span>
                <span className="text-[#111]">£65 / SENIOR NAILIST - £77 / TOP NAILIST - £87</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">GEL EXTENSION (FULL SET)</span>
                <span className="text-[#D6AF59] uppercase">£55</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">APRES GEL EXTENSION (FULL SET)</span>
                <span className="text-[#D6AF59] uppercase">£33</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">REPAIR</span>
                <span className="text-[#D6AF59] uppercase">£3</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">NAIL ART</span>
                <span className="text-[#D6AF59] uppercase">FROM £1</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Additional £10 for all Foot Gel Nail services</span>
                <span className="text-[#D6AF59] uppercase">+£10</span>
              </div>
            </div>
          </div>

          {/* REMOVAL Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 tracking-[0.15em] uppercase">REMOVAL</h3>
            <div className="max-w-2xl mx-auto space-y-0">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">GEL FROM OUR SALON</span>
                <span className="text-[#D6AF59] uppercase">£20 ~ £25</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">SOFT GEL FROM OTHER SALON</span>
                <span className="text-[#D6AF59] uppercase">£22 ~ £28</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">HARDGEL</span>
                <span className="text-[#D6AF59] uppercase">£40</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">ACRYLICS</span>
                <span className="text-[#D6AF59] uppercase">£40</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">NAIL POLISH</span>
                <span className="text-[#D6AF59] uppercase">£3</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">REFILL</span>
                <span className="text-[#D6AF59] uppercase">£25</span>
              </div>
            </div>
          </div>

          {/* MANICURE & PEDICURE CARE Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 tracking-[0.15em] uppercase">MANICURE & PEDICURE CARE</h3>
            <div className="max-w-2xl mx-auto space-y-0">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">HAND NAIL CARE</span>
                <span className="text-[#D6AF59] uppercase">£33</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">FOOT NAIL CARE</span>
                <span className="text-[#D6AF59] uppercase">£44</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">FULL CALLOUS REMOVAL</span>
                <span className="text-[#D6AF59] uppercase">£22</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">FOOT SCRUB</span>
                <span className="text-[#D6AF59] uppercase">£11</span>
              </div>
            </div>
          </div>

          {/* SHELLAC Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-6 tracking-[0.15em] uppercase">SHELLAC</h3>
            <p className="text-center text-[#6A7383] mb-8 text-sm">Inc: File and cuticle care</p>
            <div className="max-w-2xl mx-auto space-y-0">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">HAND (inc Shellac removal)</span>
                <span className="text-[#D6AF59] uppercase">£61</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">FOOT (inc Shellac removal)</span>
                <span className="text-[#D6AF59] uppercase">£77</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">SHELLAC REMOVAL ONLY</span>
                <span className="text-[#D6AF59] uppercase">£13</span>
              </div>
            </div>
            
            {/* Notes */}
            <div className="text-center mt-8 space-y-2 text-xs text-[#6A7383]">
              <p>Additional £10 will be charged to the above price for all Foot Gel Nail</p>
              <p>ADDITIONAL £10 WILL BE CHARGED WITH TOP NAILIST</p>
              <p>ADDITIONAL £7 WILL BE CHARGED WITH SENIOR NAILIST</p>
            </div>
          </div>
        </div>
      </section>

      {/* EYELASHES EXTENSION Category */}
      <section className="py-12 px-4">
        <div className="max-w-[1140px] mx-auto">
          {/* Category Bar: EYELASHES EXTENSION */}
          <div className="bg-[#0B0F17] text-white text-center py-4 mb-12">
            <h2 className="text-lg font-bold tracking-[0.2em] uppercase">EYELASHES EXTENSION</h2>
          </div>

          {/* CLASSIC Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 tracking-[0.15em] uppercase">CLASSIC</h3>
            <h4 className="text-lg font-semibold text-center mb-6 tracking-[0.1em] uppercase">New Set / Classic</h4>
            <div className="max-w-2xl mx-auto space-y-0">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Mini ~80(40/40) 1h</span>
                <span className="text-[#D6AF59] uppercase">£80</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Natural ~150(75/75) 1h 15m</span>
                <span className="text-[#D6AF59] uppercase">£105</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Full ~200(100/100) 1h 30m</span>
                <span className="text-[#D6AF59] uppercase">£120</span>
              </div>
            </div>
          </div>

          {/* CLASSIC INFILL Section */}
          <div className="mb-16">
            <h4 className="text-lg font-semibold text-center mb-4 tracking-[0.1em] uppercase">CLASSIC INFILL WITHIN 2-3 WEEKS</h4>
            <p className="text-center text-[#6A7383] mb-6 text-sm">INCLUDING TIDY UP</p>
            <div className="max-w-2xl mx-auto space-y-0">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Mini Infill ~60(30/30) 45m</span>
                <span className="text-[#D6AF59] uppercase">£45</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Regular Infill ~80(40/40) 1h</span>
                <span className="text-[#D6AF59] uppercase">£65</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Full Infill ~140(70/70) 1h 15m</span>
                <span className="text-[#D6AF59] uppercase">£90</span>
              </div>
            </div>
          </div>

          {/* HYBRID Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 tracking-[0.15em] uppercase">HYBRID</h3>
            <h4 className="text-lg font-semibold text-center mb-6 tracking-[0.1em] uppercase">New Set / Hybrid (50% Classic, 50% Volume 3-4D)</h4>
            <div className="max-w-2xl mx-auto space-y-0 mb-8">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Natural ~150(75/75) 1h30m</span>
                <span className="text-[#D6AF59] uppercase">£120</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Full ~200(100/100) 2h</span>
                <span className="text-[#D6AF59] uppercase">£145</span>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-center mb-4 tracking-[0.1em] uppercase">Hybrid Infill Within 2-3 Weeks</h4>
            <p className="text-center text-[#6A7383] mb-6 text-sm">INCLUDING TIDY UP</p>
            <div className="max-w-2xl mx-auto space-y-0">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Regular Infill ~80(40/40) 1h</span>
                <span className="text-[#D6AF59] uppercase">£75</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Full Infill ~140(70/70) 1h 30m</span>
                <span className="text-[#D6AF59] uppercase">£110</span>
              </div>
            </div>
          </div>

          {/* VOLUME Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 tracking-[0.15em] uppercase">VOLUME</h3>
            <h4 className="text-lg font-semibold text-center mb-6 tracking-[0.1em] uppercase">New Set / Volume (Based on 3-4D, 5D is extra £15)</h4>
            <div className="max-w-2xl mx-auto space-y-0 mb-8">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Natural ~150(75/75) 1h45m</span>
                <span className="text-[#D6AF59] uppercase">£135</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Full ~200(100/100) 2h</span>
                <span className="text-[#D6AF59] uppercase">£160</span>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-center mb-4 tracking-[0.1em] uppercase">Volume Infill Within 2-3 Weeks (5D is extra £15)</h4>
            <p className="text-center text-[#6A7383] mb-6 text-sm">INCLUDING TIDY UP</p>
            <div className="max-w-2xl mx-auto space-y-0">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Regular Infill ~80(40/40) 1h</span>
                <span className="text-[#D6AF59] uppercase">£85</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Full Infill ~140(70/70) 1h 30m</span>
                <span className="text-[#D6AF59] uppercase">£120</span>
              </div>
            </div>
          </div>

          {/* EYELASH LIFT Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 tracking-[0.15em] uppercase">EYELASH LIFT</h3>
            <div className="max-w-2xl mx-auto space-y-0">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Without Tint (1h)</span>
                <span className="text-[#D6AF59] uppercase">£80</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">With Tint (1h 15m)</span>
                <span className="text-[#D6AF59] uppercase">£85</span>
              </div>
            </div>
          </div>

          {/* REMOVAL Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 tracking-[0.15em] uppercase">REMOVAL</h3>
            <div className="max-w-2xl mx-auto space-y-0">
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">With a new set</span>
                <span className="text-[#D6AF59] uppercase">£15 (+15m)</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">With a new set, from other salons</span>
                <span className="text-[#D6AF59] uppercase">£25 (+15-30m)</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">Removal only</span>
                <span className="text-[#D6AF59] uppercase">£35 (30m)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPA Category */}
      <section className="py-12 px-4">
        <div className="max-w-[1140px] mx-auto">
          {/* Category Bar: SPA */}
          <div className="bg-[#0B0F17] text-white text-center py-4 mb-12">
            <h2 className="text-lg font-bold tracking-[0.2em] uppercase">SPA</h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-8">
            {/* BODY MASSAGE */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-4 tracking-[0.15em] uppercase">BODY MASSAGE</h3>
              <p className="text-center text-[#6A7383] mb-6 text-sm">(DEEP TISSUE / SWEDISH / SHIATSU)</p>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">30 MINS £66 / 45 MINS £94 / 60 MINS £110 / 90 MINS £160</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-center mb-4 tracking-[0.1em] uppercase">HEAD TO TOE FACE & BODY MASSAGE</h4>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">120 MINS</span>
                <span className="text-[#D6AF59] uppercase">£203</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-center mb-4 tracking-[0.1em] uppercase">FOOT MASSAGE (REFLEXOLOGY)</h4>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">45 MINS</span>
                <span className="text-[#D6AF59] uppercase">£94</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-center mb-4 tracking-[0.1em] uppercase">INDIAN HEAD MASSAGE</h4>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">45 MINS £94 / 60 MINS £110</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-center mb-4 tracking-[0.1em] uppercase">DERMALOGICA FACIAL MASSAGE</h4>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">60 MINS</span>
                <span className="text-[#D6AF59] uppercase">£88</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-center mb-4 tracking-[0.1em] uppercase">FACIAL WITH BACK MASSAGE</h4>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">90 MINS</span>
                <span className="text-[#D6AF59] uppercase">£143</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-center mb-4 tracking-[0.1em] uppercase">FACIAL AND BODY MASSAGE</h4>
              <div className="flex justify-between items-center py-4 border-b border-[#ECEFF3]">
                <span className="text-[#111]">120 MINS</span>
                <span className="text-[#D6AF59] uppercase">£183</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cancellation Policy */}
      <section className="py-16 px-4">
        <div className="max-w-[1040px] mx-auto text-center space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-normal tracking-[0.15em] mb-6 text-foreground uppercase">
              CANCELLATION POLICY
            </h2>
            <div className="text-base md:text-lg text-foreground leading-relaxed max-w-4xl mx-auto text-left space-y-6">
              <p><strong>Dear Customers</strong></p>
              <p>
                At Sahiya Slays, we aim to provide the best services to our guests; therefore, we kindly request at least 48 hours notice for cancellations or rescheduling as a courtesy to both our stylists and other guests who are on the cancellation list. Since the services are reserved for you personally, a cancellation fee will apply.
              </p>
              <p>
                Our <strong>cancellation policy</strong> is strictly <strong>48 hours</strong> for all guests. We ask all guests wishing to book appointments for services provide their payment information to secure booking with us. If we do not receive 48 hours notice to cancel your appointment, you will be charged £20 per service hour you reserve with us.
              </p>
              <p>
                Please note that we may ask you to pay your deposit in advance. All deposits will be used as part payment towards your final bill. The deposit will not be refunded for late cancellation or failure to attend.
              </p>
              <p>
                Regrettably, we have had to put these measures in place because of the sheer volume of non-arrivals we have had.
              </p>
              <p>
                Thank you for understanding and supporting our policies criteria.
              </p>
              <p><strong>Sahiya Slays</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-4">
        <div className="max-w-[1140px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="aspect-square overflow-hidden">
              <img 
                src="/lovable-uploads/2b027922-7899-439a-b980-764731d1f0f5.png" 
                alt="Salon detail 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img 
                src="/lovable-uploads/3a22372c-d3b0-4263-896e-35edf5f6581c.png" 
                alt="Salon detail 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img 
                src="/lovable-uploads/43f793dd-ec38-4c65-903e-36b7d3327cc9.png" 
                alt="Salon detail 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img 
                src="/lovable-uploads/6413e9bf-74ee-458e-867e-fb003a47aa81.png" 
                alt="Salon detail 4"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img 
                src="/lovable-uploads/67347769-c536-471a-bab6-06fa5183b14a.png" 
                alt="Salon detail 5"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden">
              <img 
                src="/lovable-uploads/7657c8d2-1f54-4097-aa56-7735e2dfb2ea.png" 
                alt="Salon detail 6"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BeautyNails;