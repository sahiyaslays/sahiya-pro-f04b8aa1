import Header from "@/components/Header";
import { useEffect } from "react";
import { Instagram, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { EditableText } from "@/components/EditableText";

const Contact = () => {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background font-abel">
      <Header />
      
      {/* Hero Section */}
      <section className="h-[34vh] md:h-[40vh] bg-background flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Small label */}
          <div className="text-primary text-xs md:text-sm tracking-widest mb-4 uppercase">
            <EditableText id="contact-page-label">SS • HAIR • BEAUTY • NAILS</EditableText>
          </div>
          
          <EditableText 
            id="contact-page-title" 
            as="h1" 
            className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-foreground uppercase"
          >
            CONTACT
          </EditableText>
          
          {/* Thin gold hairline */}
          <div className="w-10 h-[2px] bg-primary mx-auto mb-6"></div>
          
          <EditableText 
            id="contact-page-subtitle" 
            as="p" 
            className="text-base md:text-lg text-muted-foreground tracking-wide leading-relaxed"
          >
            Get in touch with us today.
          </EditableText>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full">
        <div className="w-full h-[400px] md:h-[500px] bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.1234567890123!2d-0.0311523!3d51.5267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761d3c8b1234567%3A0x1234567890abcdef!2s415%20Wick%20Ln%2C%20Bow%2C%20London%20E3%202JG%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890123!5m2!1sen!2suk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sahiya Slays Location"
          ></iframe>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16 md:py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center">
            {/* Address */}
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-normal tracking-wide uppercase text-foreground">
                ADDRESS
              </h3>
              <div className="text-sm leading-relaxed text-muted-foreground space-y-1">
                <EditableText id="contact-address-line1" as="div">415 WICK LANE</EditableText>
                <EditableText id="contact-address-line2" as="div">TRADESTARS BLOCK G</EditableText>
                <EditableText id="contact-address-line3" as="div">BOW</EditableText>
                <EditableText id="contact-address-line4" as="div">LONDON E3 2JG</EditableText>
              </div>
            </div>
            
            {/* Hours */}
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-normal tracking-wide uppercase text-foreground">
                HOURS
              </h3>
              <div className="text-sm leading-relaxed text-muted-foreground space-y-1">
                <EditableText id="contact-hours-days" as="div" className="font-medium">MONDAY - SUNDAY</EditableText>
                <EditableText id="contact-hours-time" as="div">9:30am - 8:00pm</EditableText>
                <EditableText id="contact-hours-note1" as="div">Open 7 days a week</EditableText>
                <EditableText id="contact-hours-note2" as="div">Closed Bank Holidays</EditableText>
              </div>
            </div>
            
            {/* Contact */}
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-normal tracking-wide uppercase text-foreground">
                CONTACT
              </h3>
              <div className="text-sm leading-relaxed text-muted-foreground space-y-2">
                <a 
                  href="tel:07809441074"
                  className="block hover:text-primary transition-colors duration-300"
                >
                  <EditableText id="contact-phone">07809441074</EditableText>
                </a>
                <a 
                  href="mailto:contact@sahiyaslays.com"
                  className="block hover:text-primary transition-colors duration-300"
                >
                  <EditableText id="contact-email">contact@sahiyaslays.com</EditableText>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;