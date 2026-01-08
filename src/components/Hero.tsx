import { Instagram, MessageCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center font-abel">
      {/* Background Image - Using img for SEO alt text */}
      <img 
        src="/lovable-uploads/ab3846e2-d8b3-4cac-99bf-c43a3d7fd10d.png"
        alt="Sahiya Slays salon interior - premium hair salon specializing in silk press and extensions in East London"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
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
              alt="Sahiya Slays Logo - Hair Beauty Nails Salon" 
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-normal tracking-widest mb-2 text-white">
            SAHIYA SLAYS
          </h1>
          <h2 className="text-primary text-xl md:text-2xl tracking-wider">
            HAIR • BEAUTY • NAILS
          </h2>
        </div>
      </div>

      {/* Footer Contact Info - Compact Spacing */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 pb-6 px-4">
        <div className="text-center text-white">
          {/* Social Icons */}
          <nav className="flex justify-center space-x-4 mb-4" aria-label="Social media links">
            <a
              href="https://instagram.com/sahiyaslays"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
              aria-label="Follow Sahiya Slays on Instagram"
            >
              <Instagram size={18} aria-hidden="true" />
              <span className="sr-only">Follow us on Instagram</span>
            </a>
            <a
              href="https://wa.me/447943115966"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
              aria-label="Contact Sahiya Slays on WhatsApp"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span className="sr-only">Contact us on WhatsApp</span>
            </a>
          </nav>

          {/* Address */}
          <address className="text-base md:text-lg tracking-wide leading-relaxed mb-3 text-white not-italic">
            <div className="uppercase">
              <div>415 WICK LANE</div>
              <div>TRADESTARS BLOCK G</div>
              <div>BOW, LONDON E3 2JG</div>
            </div>
          </address>

          {/* Contact */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 text-base md:text-lg">
            <a 
              href="tel:07809441074"
              className="text-primary hover:text-white transition-colors duration-300 tracking-wide"
            >
              07809 441074
            </a>
            <a 
              href="mailto:contact@sahiyaslays.com"
              className="text-primary hover:text-white transition-colors duration-300 tracking-wide"
            >
              contact@sahiyaslays.com
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Hero;