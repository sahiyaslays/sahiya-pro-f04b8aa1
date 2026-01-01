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
      <Header />
      <Hero />
    </div>
  );
};

export default Index;
