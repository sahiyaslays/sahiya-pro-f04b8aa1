import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { EditableText } from '@/components/EditableText';

export default function TermsConditions() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | Sahiya Slays</title>
        <meta name="description" content="Terms and conditions for Sahiya Slays hair salon and beauty services." />
        <link rel="canonical" href="/terms-and-conditions" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <EditableText 
              id="terms-page-title" 
              as="h1" 
              className="text-3xl font-bold mb-2"
            >
              Terms & Conditions
            </EditableText>
            <EditableText 
              id="terms-page-date" 
              as="p" 
              className="text-muted-foreground mb-8"
            >
              Last updated: 27 Aug 2025
            </EditableText>
            
            <div className="space-y-8 text-foreground">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-4">Welcome to Sahiya Slays. These terms and conditions outline the rules and regulations for the use of our website and services.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Use of Website</h2>
                <p className="mb-4">By accessing this website, we assume you accept these terms and conditions. Do not continue to use our website if you do not agree to take all of the terms and conditions stated on this page.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Products & Pricing</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>All prices are subject to change without notice</li>
                  <li>Product availability is not guaranteed</li>
                  <li>We reserve the right to limit quantities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Orders & Payments</h2>
                <p className="mb-4">Payment is required at the time of booking or purchase. We accept various payment methods as indicated on our website.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Shipping</h2>
                <p className="mb-4">Shipping times and costs vary depending on location and product type. Details will be provided at checkout.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Returns & Refunds</h2>
                <p className="mb-4">Returns and refunds are subject to our return policy. Please contact us within 14 days of receipt for return authorization.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
                <p className="mb-4">All content on this website is the property of Sahiya Slays and is protected by copyright laws.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Liability</h2>
                <p className="mb-4">Sahiya Slays shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
                <p className="mb-4">These terms are governed by the laws of England and Wales.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
                <p className="mb-4">For questions about these terms, please contact us at contact@sahiyaslays.com</p>
              </section>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#0B0B0B] py-12 px-4">
          <div className="max-w-[1040px] mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
              {/* Address */}
              <div className="text-white">
                <h3 className="text-sm font-normal tracking-wide uppercase mb-3 text-primary">Address</h3>
                <p className="text-sm leading-relaxed">
                  415 WICK LANE<br />
                  TRADESTARS BLOCK G<br />
                  BOW, LONDON E3 2JG
                </p>
              </div>
              
              {/* Contact */}
              <div className="text-white">
                <h3 className="text-sm font-normal tracking-wide uppercase mb-3 text-primary">Contact</h3>
                <a 
                  href="tel:07809441074"
                  className="text-sm hover:text-primary transition-colors duration-300 block mb-1"
                >
                  07809441074
                </a>
              </div>
              
              {/* Email & Social */}
              <div className="text-white">
                <h3 className="text-sm font-normal tracking-wide uppercase mb-3 text-primary">Email</h3>
                <a 
                  href="mailto:contact@sahiyaslays.com"
                  className="text-sm hover:text-primary transition-colors duration-300 block mb-3"
                >
                  contact@sahiyaslays.com
                </a>
                <a
                  href="https://instagram.com/sahiyaslays"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 text-white hover:text-primary transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>

              {/* Legal */}
              <div className="text-white">
                <h3 className="text-sm font-normal tracking-wide uppercase mb-3 text-primary">Legal</h3>
                <div className="space-y-1">
                  <a 
                    href="/terms-and-conditions"
                    className="text-sm hover:text-primary transition-colors duration-300 block min-h-[44px] flex items-center"
                  >
                    Terms & Conditions
                  </a>
                  <a 
                    href="/privacy-policy"
                    className="text-sm hover:text-primary transition-colors duration-300 block min-h-[44px] flex items-center"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}