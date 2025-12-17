import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EditableText } from "@/components/EditableText";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sahiya",
      role: "Founder & CEO",
      image: "/lovable-uploads/f0976d91-79f6-4699-b301-2ad6b3b93aab.png"
    },
    {
      id: 2,
      name: "Shelese",
      role: "Nail Technician",
      image: "/lovable-uploads/shelese-nail-tech.jpeg"
    },
    {
      id: 3,
      name: "Isla",
      role: "Social Media & Admin",
      image: "/lovable-uploads/7ce2fdd8-9a67-425e-822c-1ca15d355af9.png"
    },
    {
      id: 4,
      name: "Sarah",
      role: "Senior Stylist - Loc Specialist",
      image: "/lovable-uploads/sarah-loc-specialist.jpeg"
    },
    {
      id: 5,
      name: "Florence",
      role: "Acrylic/ design nail tech",
      image: "/lovable-uploads/019f7acf-1146-41d6-8444-31ad109929bc.png"
    },
    {
      id: 6,
      name: "Ryan",
      role: "Senior Hair Stylist",
      image: "/lovable-uploads/090793d1-fe57-4a91-9ace-d9fd511c322d.png"
    },
    {
      id: 7,
      name: "Hassan Manzoor",
      role: "Web Designer",
      image: "/src/assets/hassan-manzoor.jpg"
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
            <EditableText id="team-page-label">SS • HAIR • BEAUTY • NAILS</EditableText>
          </div>
          
          <EditableText 
            id="team-page-title" 
            as="h1" 
            className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-[#121212] uppercase"
          >
            TEAM
          </EditableText>
          
          {/* Thin gold hairline */}
          <div className="w-10 h-[2px] bg-primary mx-auto mb-6"></div>
          
          <EditableText 
            id="team-page-subtitle" 
            as="p" 
            className="text-base md:text-lg text-[#5D6776] tracking-wide leading-relaxed"
          >
            Meet our talented team of experienced professionals dedicated to elevating your beauty through artistic excellence.
          </EditableText>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">

          {/* Team Grid - 3 columns desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className="group text-center">
                {/* Team Member Image - Smaller circular style */}
                <div className="aspect-square max-w-[220px] mx-auto mb-3 overflow-hidden rounded-full">
                  <img 
                    src={member.image}
                    alt={`${member.name} - ${member.role} at Sahiya Slays`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                
                {/* Member Info */}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 tracking-wide text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-base text-muted-foreground font-light tracking-wide">
                    {member.role}
                  </p>
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

export default Team;