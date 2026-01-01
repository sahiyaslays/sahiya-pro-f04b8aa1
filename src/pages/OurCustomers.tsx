import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EditableText } from "@/components/EditableText";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

const OurCustomers = () => {
  const customerImages = [
    { id: 1, image: "/lovable-uploads/9f3c8291-f5be-4fc2-9cb7-2fa4c09db5e3.png", caption: "Gorgeous curls and highlights" },
    { id: 2, image: "/lovable-uploads/9982da7a-337a-43d5-a3e2-6c201eb68265.png", caption: "Beautiful burgundy transformation" },
    { id: 3, image: "/lovable-uploads/72df689a-ddfe-4884-964e-e97cf42f283e.png", caption: "Stunning layered styling" },
    { id: 4, image: "/lovable-uploads/e6507cd7-23d2-4134-a150-000d4a740e2b.png", caption: "Glamorous dark waves" },
    { id: 5, image: "/lovable-uploads/d25ee085-2d8f-4640-9863-3807ea889c43.png", caption: "Perfect blonde highlights" },
    { id: 6, image: "/lovable-uploads/1981ae3f-6d16-4ee0-aebf-efa8fdaa4a36.png", caption: "Elegant blonde styling" },
  ];

  return (
    <div className="min-h-screen bg-background font-abel">
      <SEO 
        title="Hair Transformations Gallery | Before & After | Sahiya Slays London"
        description="View stunning hair transformations: silk press, extensions, braids, balayage & colour work. Real results from our East London salon. Get inspired!"
        canonical="/our-customers"
        ogType="article"
        keywords="hair transformations London, before after hair, silk press results, hair extensions gallery"
      />
      <Header />
      
      <section className="h-[34vh] md:h-[40vh] bg-white flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-4"><Breadcrumbs /></div>
          <div className="text-primary text-xs md:text-sm tracking-widest mb-4 uppercase">
            <EditableText id="customers-page-label">SS • HAIR • BEAUTY • NAILS</EditableText>
          </div>
          <EditableText id="customers-page-title" as="h1" className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-[#121212] uppercase">Our Customers</EditableText>
          <div className="w-10 h-[2px] bg-primary mx-auto mb-6"></div>
          <EditableText id="customers-page-subtitle" as="p" className="text-base md:text-lg text-[#5D6776] tracking-wide leading-relaxed">Trusted by amazing people who choose Sahiya for beauty and care.</EditableText>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {customerImages.map((customer) => (
              <article key={customer.id} className="group relative overflow-hidden">
                <div className="relative h-[400px] md:h-[450px] overflow-hidden rounded-lg shadow-elegant">
                  <img src={customer.image} alt={`Hair transformation at Sahiya Slays - ${customer.caption}`} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" loading="lazy" width="400" height="450" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurCustomers;
