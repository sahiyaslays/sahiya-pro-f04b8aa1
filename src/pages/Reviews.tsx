import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { SchemaMarkup } from '@/components/SchemaMarkup';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Amara J.',
    rating: 5,
    service: 'Silk Press',
    text: 'Absolutely stunning results! My hair has never looked this healthy and shiny after a silk press. Sahiya really knows how to work with 4c hair.',
    date: '2025-11-15',
  },
  {
    id: 2,
    name: 'Tiana M.',
    rating: 5,
    service: 'Knotless Braids',
    text: 'Best braiding experience I\'ve ever had. No tension, no pain, and the braids lasted for 8 weeks! Will definitely be back.',
    date: '2025-11-08',
  },
  {
    id: 3,
    name: 'Keisha W.',
    rating: 5,
    service: 'Hair Extensions',
    text: 'The sew-in was flawless. Sahiya took her time to blend everything perfectly and the quality of the hair is amazing.',
    date: '2025-10-28',
  },
  {
    id: 4,
    name: 'Destiny R.',
    rating: 4,
    service: 'Deep Conditioning Treatment',
    text: 'My damaged hair feels so much healthier now. Great products and very knowledgeable about natural hair care.',
    date: '2025-10-20',
  },
  {
    id: 5,
    name: 'Jasmine C.',
    rating: 5,
    service: 'Loc Maintenance',
    text: 'Finally found someone who really understands locs! My retwist looks neat and my locs are thriving.',
    date: '2025-10-12',
  },
  {
    id: 6,
    name: 'Zara A.',
    rating: 5,
    service: 'Wig Install',
    text: 'The glueless wig install was seamless. Looked so natural that everyone thought it was my real hair!',
    date: '2025-09-30',
  },
  {
    id: 7,
    name: 'Nicole P.',
    rating: 5,
    service: 'Cornrows',
    text: 'Quick, professional, and the cornrows were done perfectly. Very reasonable pricing too!',
    date: '2025-09-22',
  },
  {
    id: 8,
    name: 'Ebony T.',
    rating: 5,
    service: 'Keratin Treatment',
    text: 'My curls are so defined and frizz-free now. The keratin treatment was exactly what my hair needed.',
    date: '2025-09-15',
  },
  {
    id: 9,
    name: 'Maya S.',
    rating: 4,
    service: 'Box Braids',
    text: 'Beautiful braids that were done in good time. The salon atmosphere is lovely and welcoming.',
    date: '2025-09-05',
  },
  {
    id: 10,
    name: 'Aaliyah D.',
    rating: 5,
    service: 'Nail Art',
    text: 'The nail designs were absolutely gorgeous! Such attention to detail and the polish lasted for weeks.',
    date: '2025-08-28',
  },
];

const aggregateRating = {
  ratingValue: 4.8,
  reviewCount: 163,
  bestRating: 5,
  worstRating: 1,
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? 'fill-primary text-primary'
              : 'fill-muted text-muted-foreground'
          }`}
        />
      ))}
    </div>
  );
};

export default function Reviews() {
  // Schema data for LocalBusiness with AggregateRating
  const localBusinessWithRating = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Sahiya Slays",
    "image": "https://sahiyaslays.com/lovable-uploads/57d4284b-6e51-42fd-93a0-cfc1a8afc314.png",
    "url": "https://sahiyaslays.com",
    "telephone": "+447809441074",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "415 Wick Lane, Tradestars Block G",
      "addressLocality": "Bow",
      "addressRegion": "London",
      "postalCode": "E3 2JG",
      "addressCountry": "GB"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount,
      "bestRating": aggregateRating.bestRating,
      "worstRating": aggregateRating.worstRating
    },
    "review": testimonials.map((t) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "datePublished": t.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": t.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": t.text
    }))
  };

  return (
    <>
      <SEO
        title="Customer Reviews & Testimonials"
        description={`Read ${aggregateRating.reviewCount} genuine reviews from our satisfied clients. Sahiya Slays has a ${aggregateRating.ratingValue}/5 rating for hair styling, braiding, and beauty services in East London.`}
        canonical="/reviews"
        ogType="website"
        keywords="hair salon reviews London, Sahiya Slays testimonials, silk press reviews, braiding reviews East London, hair extensions reviews, customer feedback"
      />
      
      {/* Custom schema with AggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessWithRating) }}
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          <Breadcrumbs />
          
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Customer Reviews
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Don't just take our word for it. See what our amazing clients have to say about their experience at Sahiya Slays.
              </p>
              
              {/* Aggregate Rating Display */}
              <div className="inline-flex flex-col items-center bg-card border border-border rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-5xl font-bold text-primary">
                    {aggregateRating.ratingValue}
                  </span>
                  <Star className="h-10 w-10 fill-primary text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Based on <strong>{aggregateRating.reviewCount}</strong> reviews
                </p>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= Math.round(aggregateRating.ratingValue)
                          ? 'fill-primary text-primary'
                          : 'fill-muted text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          {/* Reviews Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <Card 
                    key={testimonial.id} 
                    className="bg-card border-border hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <Quote className="h-8 w-8 text-primary/30 mb-4" />
                      <p className="text-foreground mb-4 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="border-t border-border pt-4 mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-foreground">
                            {testimonial.name}
                          </span>
                          <StarRating rating={testimonial.rating} />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.service} • {new Date(testimonial.date).toLocaleDateString('en-GB', { 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Had a Great Experience?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                We'd love to hear from you! Share your experience and help others discover Sahiya Slays.
              </p>
              <Button 
                asChild
                size="lg"
                className="gap-2"
              >
                <a 
                  href="https://g.page/r/sahiyaslays/review" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Write a Review on Google
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
