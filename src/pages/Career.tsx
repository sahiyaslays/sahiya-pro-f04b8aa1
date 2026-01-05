import Header from "@/components/Header";
import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import { EditableText } from "@/components/EditableText";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const Career = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-abel">
      <SEO 
        title="Careers at Sahiya Slays | Hair Stylist Jobs London"
        description="Join our talented team at Sahiya Slays. We're looking for experienced hair stylists, nail technicians and beauty professionals in East London."
        canonical="/career"
        ogType="article"
        keywords="hair stylist jobs London, salon careers East London, beauty jobs"
      />
      <Header />
      
      <section className="h-[34vh] md:h-[40vh] bg-white flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-4"><Breadcrumbs /></div>
          <div className="text-primary text-xs md:text-sm tracking-widest mb-4 uppercase">
            <EditableText id="career-page-label">SS • HAIR • BEAUTY • NAILS</EditableText>
          </div>
          <EditableText id="career-page-title" as="h1" className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-[#121212] uppercase">CAREER</EditableText>
          <div className="w-10 h-[2px] bg-primary mx-auto mb-6"></div>
          <EditableText id="career-page-subtitle" as="p" className="text-base md:text-lg text-[#5D6776] tracking-wide leading-relaxed">Join our talented team.</EditableText>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-stretch mb-16">
            <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[600px] overflow-hidden">
              <img src="/lovable-uploads/e02c98e3-5757-4d74-8473-f6078fca7283.png" alt="Sahiya Slays salon workspace in Bow, East London" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-8 pt-4 flex flex-col justify-center lg:min-h-[600px]">
              <div className="space-y-4">
                <p className="text-[15px] leading-relaxed text-[#121212] font-light">Sahiya Slays is a modern beauty and hair salon dedicated to providing luxury services in a welcoming and professional environment. We are looking for enthusiastic and talented individuals to join our growing team.</p>
                <p className="text-[15px] leading-relaxed text-[#121212] font-light">We are looking for staff who would like to join our team. Verbal communication skills in English is essential.</p>
              </div>
              <div>
                <h2 className="text-[16px] font-medium text-[#121212] mb-3 uppercase tracking-wide">Requirements of the candidates:</h2>
                <ul className="space-y-1 text-[15px] text-[#121212] font-light">
                  <li>- Previous experience in hair cutting, styling, or beauty services</li>
                  <li>- Passion for customer care and teamwork</li>
                  <li>- Strong communication skills in English</li>
                </ul>
              </div>
              <div>
                <h2 className="text-[16px] font-medium text-[#121212] mb-3 uppercase tracking-wide">Visa Status</h2>
                <p className="text-[15px] text-[#121212] font-light">Applicants must have eligibility to work in the UK.</p>
              </div>
              <div className="pt-4">
                <p className="text-[15px] text-[#121212] font-light">To apply please email your CV to <a href="mailto:contact@sahiyaslays.com" className="text-primary hover:underline font-medium">contact@sahiyaslays.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="grid grid-cols-2">
          <div className="aspect-[5/3] overflow-hidden"><img src="/lovable-uploads/64fa994d-81d2-4c98-a871-64a3a8af377f.png" alt="Sahiya Slays salon workspace" className="w-full h-full object-cover" loading="lazy" /></div>
          <div className="aspect-[5/3] overflow-hidden"><img src="/lovable-uploads/ec59e6d7-c316-47e1-99db-3b412fee9a9a.png" alt="Sahiya Slays salon environment" className="w-full h-full object-cover" loading="lazy" /></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Career;
