import { Instagram } from "lucide-react";
import Header from "@/components/Header";
import { useEffect } from "react";
import { Footer } from "@/components/Footer";

const About = () => {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-abel">
      <Header />
      
      {/* Hero Section - Short, White */}
      <section className="h-[34vh] md:h-[40vh] bg-white flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Optional small label */}
          <div className="text-primary text-xs md:text-sm tracking-widest mb-4 uppercase">
            SS • HAIR • BEAUTY • NAILS
          </div>
          
          <h1 className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-[#121212] uppercase">
            ABOUT
          </h1>
          
          {/* Thin gold hairline */}
          <div className="w-10 h-[2px] bg-primary mx-auto mb-6"></div>
          
          <p className="text-base md:text-lg text-[#5D6776] tracking-wide leading-relaxed">
            Elevating beauty through artistry.
          </p>
        </div>
      </section>

      {/* Large Banner Image Strip */}
      <section className="w-full">
        <div className="w-full h-[400px] md:h-[500px] overflow-hidden">
          <img 
            src="/lovable-uploads/ab3846e2-d8b3-4cac-99bf-c43a3d7fd10d.png"
            alt="Sahiya Slays salon interior"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Centered Intro Block */}
      <section className="py-20 md:py-24 px-4">
        <div className="max-w-[1040px] mx-auto text-center">
          <h2 className="text-[24px] md:text-[32px] font-normal tracking-wider mb-12 text-[#121212] uppercase">
            SAHIYA SLAYS
          </h2>
          
          <div className="max-w-[920px] mx-auto">
            <p className="text-base leading-[1.7] text-[#121212]">
              Sahiya Slays blends quality, care, and style in the heart of East London. Our talented team of hair, beauty, and nail professionals deliver an exclusive salon experience in a warm, welcoming environment. Combining experience and creativity, we provide a personal service tailored to your natural beauty. Book your appointment today and enjoy cutting-edge style with effortless elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Services Icon Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-[1040px] mx-auto text-center">
          {/* Simple circle icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#121212] flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-[#121212]"></div>
          </div>
          
          <h3 className="text-sm md:text-base font-normal tracking-widest mb-6 text-[#121212] uppercase">
            SERVICES
          </h3>
          
          <p className="text-[17px] md:text-[18px] font-medium text-[#121212] leading-[1.6] max-w-[800px] mx-auto">
            We offer highly skilled specialists for all your hairdressing, beauty, nail, and spa treatments. Bridal and event services available.
          </p>
        </div>
      </section>

      {/* Long-form Body - Three Centered Paragraphs */}
      <section className="py-20 md:py-24 px-4">
        <div className="max-w-[1040px] mx-auto text-center">
          <h3 className="text-[22px] md:text-[28px] font-normal tracking-wider mb-16 text-[#121212]">
            Sahiya Slays
          </h3>
          
          <div className="max-w-[980px] mx-auto space-y-12">
            <p className="text-base leading-[1.7] text-[#121212]">
              Sahiya Slays is a total beauty destination in Bow, East London. We offer not only hair and nail services, but also makeup, brow treatments, and a variety of rejuvenating services to enhance your look.
            </p>
            
            <p className="text-base leading-[1.7] text-[#121212]">
              Our team's meticulous attention to detail and sophisticated techniques bring out your inner self — not just your appearance — and provide you with a natural, refined style.
            </p>
            
            <p className="text-base leading-[1.7] text-[#121212]">
              Our bright, modern studio is designed as a relaxing space where you can forget about the rush of everyday life for a while. We provide high-quality services that go beyond the scope of a typical salon experience.
            </p>
          </div>
        </div>
      </section>

      {/* Second Full-Width Image */}
      <section className="w-full">
        <div className="w-full h-[400px] md:h-[500px] overflow-hidden">
          <img 
            src="/lovable-uploads/2b027922-7899-439a-b980-764731d1f0f5.png"
            alt="Sahiya Slays salon interior"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;