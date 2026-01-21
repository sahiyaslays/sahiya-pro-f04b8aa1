import { Instagram, MessageCircle } from "lucide-react";
import { EditableText } from "@/components/EditableText";

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center font-abel">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/ab3846e2-d8b3-4cac-99bf-c43a3d7fd10d.png')`
        }}
        aria-label="Modern black-and-gold salon interior at Sahiya Slays"
      />
      
      {/* Darker Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Main Content - Compact Vertical Spacing */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Logo */}
        <div className="mb-6">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3">
            <img 
              src="/lovable-uploads/57d4284b-6e51-42fd-93a0-cfc1a8afc314.png" 
              alt="Sahiya Slays Logo" 
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
          <EditableText 
            id="hero-title" 
            as="h1" 
            className="text-5xl md:text-6xl font-normal tracking-widest mb-2 text-white"
          >
            SAHIYA SLAYS
          </EditableText>
          <EditableText 
            id="hero-subtitle" 
            as="p" 
            className="text-primary text-xl md:text-2xl tracking-wider"
          >
            HAIR • BEAUTY • NAILS
          </EditableText>
        </div>
      </div>

      {/* Footer Contact Info - Compact Spacing */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 px-4">
        <div className="text-center text-white">
          {/* Social Icons */}
          <div className="flex justify-center space-x-4 mb-4">
            <a
              href="https://instagram.com/sahiyaslays"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://wa.me/447943115966"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <MessageCircle size={18} />
            </a>
          </div>

          {/* Address */}
          <div className="text-base md:text-lg tracking-wide leading-relaxed mb-3 text-white">
            <div className="uppercase">
              <EditableText id="address-line1" as="div">415 WICK LANE</EditableText>
              <EditableText id="address-line2" as="div">TRADESTARS BLOCK G</EditableText>
              <EditableText id="address-line3" as="div">BOW, LONDON E3 2JG</EditableText>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-base md:text-lg">
            <a 
              href="tel:07943115966"
              className="text-primary hover:text-white transition-colors duration-300 tracking-wide"
            >
              <EditableText id="phone-number">07809 441074</EditableText>
            </a>
            <a 
              href="mailto:contact@sahiyaslays.com"
              className="text-primary hover:text-white transition-colors duration-300 tracking-wide"
            >
              <EditableText id="email-address">contact@sahiyaslays.com</EditableText>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;