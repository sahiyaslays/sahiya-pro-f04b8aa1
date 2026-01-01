import { Helmet } from 'react-helmet';

interface SchemaMarkupProps {
  type: 'LocalBusiness' | 'Organization' | 'WebSite' | 'BreadcrumbList' | 'Product' | 'Service' | 'FAQPage';
  data?: any;
}

const BASE_URL = 'https://sahiyaslays.com';

// Local Business Schema
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["HairSalon", "BeautySalon", "NailSalon"],
  "@id": `${BASE_URL}/#business`,
  "name": "Sahiya Slays",
  "alternateName": "Sahiya Slays Hair Beauty Nails",
  "description": "Premium hair salon in East London specializing in silk press, hair extensions, braiding, keratin treatments and natural hair care for textured hair types 3c-4c.",
  "url": BASE_URL,
  "telephone": "+447809441074",
  "email": "contact@sahiyaslays.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "415 Wick Lane, Tradestars Block G",
    "addressLocality": "Bow",
    "addressRegion": "London",
    "postalCode": "E3 2JG",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 51.5387,
    "longitude": -0.0234
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "priceRange": "££",
  "currenciesAccepted": "GBP",
  "paymentAccepted": "Cash, Credit Card, Debit Card",
  "image": `${BASE_URL}/lovable-uploads/ab3846e2-d8b3-4cac-99bf-c43a3d7fd10d.png`,
  "logo": `${BASE_URL}/lovable-uploads/57d4284b-6e51-42fd-93a0-cfc1a8afc314.png`,
  "sameAs": [
    "https://www.instagram.com/sahiyaslays/"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Hair & Beauty Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Silk Press",
          "description": "Silky straight results for textured hair 3c-4c using safe heat techniques"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hair Extensions",
          "description": "Tape-ins, sew-ins, mesh and track installations"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hair Braiding",
          "description": "Box braids, cornrows, knotless braids, and loc services"
        }
      }
    ]
  }
};

// Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sahiya Slays",
  "url": BASE_URL,
  "logo": `${BASE_URL}/lovable-uploads/57d4284b-6e51-42fd-93a0-cfc1a8afc314.png`,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+447809441074",
    "contactType": "customer service",
    "availableLanguage": "English"
  }
};

// WebSite Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sahiya Slays",
  "url": BASE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE_URL}/shop?search={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

// Breadcrumb Generator
const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${BASE_URL}${item.url}`
  }))
});

export const SchemaMarkup = ({ type, data }: SchemaMarkupProps) => {
  let schema;

  switch (type) {
    case 'LocalBusiness':
      schema = localBusinessSchema;
      break;
    case 'Organization':
      schema = organizationSchema;
      break;
    case 'WebSite':
      schema = websiteSchema;
      break;
    case 'BreadcrumbList':
      schema = generateBreadcrumbSchema(data?.items || []);
      break;
    case 'Product':
      schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        ...data
      };
      break;
    case 'Service':
      schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        ...data
      };
      break;
    case 'FAQPage':
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data?.questions || []
      };
      break;
    default:
      return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup;
