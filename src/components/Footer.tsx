import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] py-12 px-4">
      <div className="max-w-[1040px] mx-auto">
        <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Address */}
          <div>
            <h4 className="text-sm font-normal tracking-wide uppercase mb-4 text-gold">
              ADDRESS
            </h4>
            <div className="text-sm leading-relaxed text-[#EDEDED]">
              <div>415 Wick Lane</div>
              <div>Tradestars Block G</div>
              <div>Bow, London E3 2JG</div>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-sm font-normal tracking-wide uppercase mb-4 text-gold">
              CONTACT
            </h4>
            <a 
              href="tel:07943115966"
              className="text-sm text-[#EDEDED] hover:text-primary transition-colors duration-300"
            >
              07943 115966
            </a>
          </div>
          
          {/* Email */}
          <div>
            <h4 className="text-sm font-normal tracking-wide uppercase mb-4 text-gold">
              E-MAIL
            </h4>
            <a 
              href="mailto:contact@sahiyaslays.com"
              className="text-sm text-[#EDEDED] hover:text-primary transition-colors duration-300 block mb-4"
            >
              contact@sahiyaslays.com
            </a>
            
            {/* Instagram Icon */}
            <a
              href="https://instagram.com/sahiyaslays"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-6 h-6 text-white hover:text-primary transition-colors duration-300"
            >
              <Instagram size={20} />
            </a>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-normal tracking-wide uppercase mb-4 text-gold">
              LEGAL
            </h4>
            <div className="space-y-2">
              <Link 
                to="/terms-and-conditions" 
                className="text-sm text-[#EDEDED] hover:text-primary transition-colors duration-300 block"
              >
                Terms & Conditions
              </Link>
              <Link 
                to="/privacy-policy" 
                className="text-sm text-[#EDEDED] hover:text-primary transition-colors duration-300 block"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};