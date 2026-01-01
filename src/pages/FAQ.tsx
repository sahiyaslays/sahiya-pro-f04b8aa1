import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EditableText } from "@/components/EditableText";
import SEO from "@/components/SEO";
import SchemaMarkup from "@/components/SchemaMarkup";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "Where is Sahiya Slays located?",
    answer: "Sahiya Slays is located at 415 Wick Lane, Tradestars Block G, Bow, London E3 2JG. We're easily accessible from Hackney Wick station, about a 5-minute walk."
  },
  {
    question: "What is a silk press and how long does it last?",
    answer: "A silk press is a heat styling technique that transforms textured hair (3c-4c) into silky straight hair using safe amounts of heat with one pass. It typically lasts 2-4 weeks depending on your hair care routine and whether you expose it to moisture."
  },
  {
    question: "Do you work with textured and afro hair?",
    answer: "Yes! We specialize in textured hair types including 3c, 4a, 4b, and 4c. Our techniques and products are specifically chosen to work beautifully with afro and natural hair textures."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book online 24/7 through our website booking system, call us on +44 7809 441074, or message us on WhatsApp. We recommend booking in advance for weekend appointments as they fill up quickly."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We require 48 hours notice for cancellations. Late cancellations or no-shows may be charged a fee of up to 50% of the service cost. Please contact us as soon as possible if you need to reschedule."
  },
  {
    question: "Do you offer mobile hairdressing services?",
    answer: "Yes, we offer mobile hairdressing services across East, South, West and North London. On exceptions, we may travel further depending on the services required. Contact us for availability and pricing."
  },
  {
    question: "What hair extensions do you use?",
    answer: "We use premium Raw Cambodian hair which is 100% virgin human hair. It can be coloured up to 10 shades lighter and has a lifespan of 4-5 years with proper care. We offer tape-ins, sew-ins, mesh and track installations."
  },
  {
    question: "Is a patch test required before colour services?",
    answer: "Yes, a patch test is required 48 hours before any colour service. This is for your safety to check for allergic reactions. Please book your patch test appointment when booking your colour service."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, all major credit and debit cards (Visa, Mastercard, Amex), and PayPal. For bookings, a deposit may be required to secure your appointment."
  },
  {
    question: "How long do hair extensions last?",
    answer: "Our Raw Cambodian hair extensions can last 4-5 years with proper care. However, the installation method affects maintenance frequency: tape-ins need repositioning every 6-8 weeks, sew-ins every 8-12 weeks."
  },
  {
    question: "Do you offer bridal and event styling?",
    answer: "Yes! We offer bridal hair, makeup, and nail services. We recommend booking a trial session 2-4 weeks before your event. Group bookings for bridal parties are available."
  },
  {
    question: "What are your opening hours?",
    answer: "We're open Monday to Friday 9:00am - 7:00pm, Saturday 9:00am - 6:00pm, and Sunday 10:00am - 4:00pm. We're closed on Bank Holidays."
  }
];

const FAQ = () => {
  // Generate FAQ schema data
  const faqSchemaQuestions = faqData.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }));

  return (
    <div className="min-h-screen bg-background font-abel">
      <SEO 
        title="FAQs | Hair Services, Extensions & Booking | Sahiya Slays London"
        description="Frequently asked questions about our hair services, extensions, booking process, aftercare & products. Everything you need to know about Sahiya Slays."
        canonical="/faq"
        ogType="article"
        keywords="hair salon FAQ, booking questions, hair extensions care, silk press FAQ"
      />
      <SchemaMarkup type="FAQPage" data={{ questions: faqSchemaQuestions }} />
      <Header />
      
      {/* Hero Section */}
      <section className="h-[34vh] md:h-[40vh] bg-white flex items-center justify-center px-4 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-4">
            <Breadcrumbs />
          </div>
          
          <div className="text-primary text-xs md:text-sm tracking-widest mb-4 uppercase">
            <EditableText id="faq-page-label">SS • HAIR • BEAUTY • NAILS</EditableText>
          </div>
          
          <EditableText 
            id="faq-page-title" 
            as="h1" 
            className="text-[27px] md:text-[37px] font-normal tracking-[0.2em] mb-6 text-[#121212] uppercase"
          >
            FAQ
          </EditableText>
          
          <div className="w-10 h-[2px] bg-primary mx-auto mb-6"></div>
          
          <EditableText 
            id="faq-page-subtitle" 
            as="p" 
            className="text-base md:text-lg text-[#5D6776] tracking-wide leading-relaxed"
          >
            Answers to your most common questions.
          </EditableText>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6 data-[state=open]:bg-gray-50"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <h2 className="text-base md:text-lg font-medium text-foreground pr-4">
                    {item.question}
                  </h2>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
            <h2 className="text-xl md:text-2xl font-normal tracking-wide mb-4 text-foreground">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              We're here to help. Get in touch with us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="outline" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
              <Link to="/booking">
                <Button className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
