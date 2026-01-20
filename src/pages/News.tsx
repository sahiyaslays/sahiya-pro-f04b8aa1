import { Instagram } from "lucide-react";
import Header from "@/components/Header";
import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import { EditableText } from "@/components/EditableText";

const News = () => {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-abel">
      <Header />
      
      {/* Hero Section */}
      <section className="h-[30vh] bg-white flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <EditableText 
            id="news-page-title" 
            as="h1" 
            className="text-[32px] md:text-[42px] font-normal tracking-[0.2em] text-[#121212] uppercase"
          >
            NEWS
          </EditableText>
          <div className="w-12 h-[2px] bg-primary mx-auto mt-6"></div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
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

export default News;