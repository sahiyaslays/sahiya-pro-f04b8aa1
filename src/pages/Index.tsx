import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { EditableText } from "@/components/EditableText";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      {/* About Section */}
      <section className="py-20 md:py-24 px-4 bg-white font-abel">
        <div className="max-w-[1040px] mx-auto text-center">
          <div className="text-primary text-xs md:text-sm tracking-widest mb-4 uppercase">
            <EditableText id="home-about-label">SS • HAIR • BEAUTY • NAILS</EditableText>
          </div>
          <EditableText
            id="home-about-title"
            as="h2"
            className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-[#121212] uppercase"
          >
            ABOUT
          </EditableText>
          <div className="w-10 h-[2px] bg-primary mx-auto mb-8"></div>
          <EditableText
            id="home-about-description"
            as="p"
            className="text-base leading-[1.7] text-[#121212] max-w-[920px] mx-auto"
          >
            Sahiya Slays blends quality, care, and style in the heart of East London. Our talented team of hair, beauty, and nail professionals deliver an exclusive salon experience in a warm, welcoming environment. Combining experience and creativity, we provide a personal service tailored to your natural beauty. Book your appointment today and enjoy cutting-edge style with effortless elegance.
          </EditableText>
        </div>
      </section>

      {/* News / Instagram Section */}
      <section className="py-16 px-4 bg-white font-abel">
        <div className="max-w-2xl mx-auto text-center">
          <EditableText
            id="home-news-title"
            as="h2"
            className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] text-[#121212] uppercase"
          >
            NEWS
          </EditableText>
          <div className="w-10 h-[2px] bg-primary mx-auto mt-6 mb-10"></div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <iframe
              src="https://www.instagram.com/sahiyaslays/embed"
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              title="Sahiya Slays Instagram Profile"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
