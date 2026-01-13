import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EditableText } from "@/components/EditableText";

const OurCustomers = () => {
  const customerImages = [
    {
      id: 1,
      image: "/lovable-uploads/9f3c8291-f5be-4fc2-9cb7-2fa4c09db5e3.png",
      caption: "Gorgeous curls and highlights"
    },
    {
      id: 2,
      image: "/lovable-uploads/9982da7a-337a-43d5-a3e2-6c201eb68265.png",
      caption: "Beautiful burgundy transformation"
    },
    {
      id: 3,
      image: "/lovable-uploads/72df689a-ddfe-4884-964e-e97cf42f283e.png",
      caption: "Stunning layered styling"
    },
    {
      id: 4,
      image: "/lovable-uploads/e6507cd7-23d2-4134-a150-000d4a740e2b.png",
      caption: "Glamorous dark waves"
    },
    {
      id: 5,
      image: "/lovable-uploads/d25ee085-2d8f-4640-9863-3807ea889c43.png",
      caption: "Perfect blonde highlights"
    },
    {
      id: 6,
      image: "/lovable-uploads/1981ae3f-6d16-4ee0-aebf-efa8fdaa4a36.png",
      caption: "Elegant blonde styling"
    },
    {
      id: 7,
      image: "/lovable-uploads/3838c52a-ad89-4942-a83a-08d89fbcf8ce.png",
      caption: "Beautiful layered cut"
    },
    {
      id: 8,
      image: "/lovable-uploads/2d2d5f94-386d-4677-a7f8-6399259c8988.png",
      caption: "Gorgeous dark waves and styling"
    },
    {
      id: 9,
      image: "/lovable-uploads/d5d355cf-a301-4577-a639-e33954f13c93.png",
      caption: "Stunning rose gold curls"
    },
    {
      id: 10,
      image: "/lovable-uploads/1a084eb1-3a20-4659-aba8-45b6e19edbe5.png",
      caption: "Beautiful pink bob with bangs"
    },
    {
      id: 11,
      image: "/lovable-uploads/7d4ba061-f440-4bbd-b253-8fa71cc2c369.png",
      caption: "Rich brunette layered styling"
    },
    {
      id: 12,
      image: "/lovable-uploads/48333025-fd18-482d-991d-cbbf3e337a3a.png",
      caption: "Voluminous dark chocolate curls"
    },
    {
      id: 13,
      image: "/lovable-uploads/d7ec8cf3-367f-4e7d-ace1-90a8275a427f.png",
      caption: "Caramel highlighted layers"
    },
    {
      id: 14,
      image: "/lovable-uploads/5414e1c3-a22e-4bea-96bc-2f2ef49cae18.png",
      caption: "Golden brown dimensional color"
    },
    {
      id: 15,
      image: "/lovable-uploads/7a73fdef-76f6-4c9d-8cd1-6f63cbe87da3.png",
      caption: "Honey blonde bouncy curls"
    },
    {
      id: 16,
      image: "/lovable-uploads/63d0e1ab-395b-43dc-bc26-101fbba38293.png",
      caption: "Textured blonde layered cut"
    },
    {
      id: 17,
      image: "/lovable-uploads/e82ed543-94cd-46b7-9718-3f55a9829c72.png",
      caption: "Gorgeous layered blonde styling"
    },
    {
      id: 18,
      image: "/lovable-uploads/8a602255-0db9-4941-96de-f311983f20e2.png",
      caption: "Sleek dark brown bob"
    },
    {
      id: 19,
      image: "/lovable-uploads/921f0701-5736-4a0d-a06d-8a271bb91081.png",
      caption: "Natural dark layered cut"
    },
    {
      id: 20,
      image: "/lovable-uploads/b6ed6266-8dc0-47ff-a6ff-e9395032da71.png",
      caption: "Beautiful ombre styling"
    },
    {
      id: 22,
      image: "/lovable-uploads/fddab357-919e-4d45-bc30-f46bed26260a.png",
      caption: "Chic textured bob"
    },
    {
      id: 23,
      image: "/lovable-uploads/bd69df20-7ca2-4127-bc0d-31a2f05d465e.png",
      caption: "Warm brown waves"
    },
    {
      id: 24,
      image: "/lovable-uploads/1ab2f898-351b-49f6-8c87-7b53a61ca22e.png",
      caption: "Voluminous brown curls"
    },
    {
      id: 25,
      image: "/lovable-uploads/a83d558e-05ba-4903-a85b-136f38ff1d00.png",
      caption: "Sleek dark bob styling"
    },
    {
      id: 26,
      image: "/lovable-uploads/c28dca0f-7513-44cf-8b48-9287d60d843f.png",
      caption: "Natural textured bob"
    },
    {
      id: 27,
      image: "/lovable-uploads/0ea786dc-341b-47f3-bee2-129628eb3be2.png",
      caption: "Voluminous dark layered waves"
    },
    {
      id: 28,
      image: "/lovable-uploads/e4f3ecde-ced3-467c-87ad-e2b5c63941bd.png",
      caption: "Layered dark hair with bangs"
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
            <EditableText id="customers-page-label">SS • HAIR • BEAUTY • NAILS</EditableText>
          </div>
          
          <EditableText 
            id="customers-page-title" 
            as="h1" 
            className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-[#121212] uppercase"
          >
            Our Customers
          </EditableText>
          
          {/* Thin gold hairline */}
          <div className="w-10 h-[2px] bg-primary mx-auto mb-6"></div>
          
          <EditableText 
            id="customers-page-subtitle" 
            as="p" 
            className="text-base md:text-lg text-[#5D6776] tracking-wide leading-relaxed"
          >
            Trusted by amazing people who choose Sahiya for beauty and care.
          </EditableText>
        </div>
      </section>

      {/* Customer Gallery */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {customerImages.map((customer) => (
              <div key={customer.id} className="group relative overflow-hidden">
                {/* Customer Image */}
                <div className="relative h-[400px] md:h-[450px] overflow-hidden rounded-lg shadow-elegant">
                  <img 
                    src={customer.image}
                    alt={`Customer styling result - ${customer.caption}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurCustomers;