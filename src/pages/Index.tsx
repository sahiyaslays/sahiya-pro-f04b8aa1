import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import SchemaMarkup from "@/components/SchemaMarkup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Sahiya Slays | Hair Extensions, Silk Press & Braiding in London E3"
        description="Premium hair salon in East London specializing in silk press, extensions, braids & natural hair care for textured hair 3c-4c. Book your transformation today!"
        canonical="/"
        ogType="website"
        keywords="hair salon London, silk press East London, hair extensions Bow, braiding London E3, textured hair specialist, 4c hair salon"
      />
      <SchemaMarkup type="LocalBusiness" />
      <SchemaMarkup type="Organization" />
      <SchemaMarkup type="WebSite" />
      
      {/* SEO-visible content for crawlers (visually hidden) */}
      <div className="sr-only">
        <h1>Sahiya Slays - Premium Hair Salon in East London</h1>
        <p>Located at 415 Wick Lane, Tradestars Block G, Bow, London E3 2JG</p>
        <p>Services: Silk Press, Hair Extensions, Braiding, Locs, Natural Hair Care for textured hair 3c-4c</p>
        <p>Contact: 07809 441074 | 07943 115966 | contact@sahiyaslays.com</p>
        <p>Book your hair transformation today at our premium salon in Bow, East London.</p>
      </div>
      
      <main role="main">
        <Header />
        <Hero />
      </main>
    </div>
  );
};

export default Index;
