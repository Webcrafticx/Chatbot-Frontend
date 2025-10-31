// App.jsx
import React from 'react';
import Navbar from '../../../pages/landingpage/navbar';
import Banner from '../../../pages/landingpage/banner';
import WhyChooseUs from '../../../pages/landingpage/whyus';
import Features from '../../../pages/landingpage/feature';
import PricingPlans from '../../../pages/landingpage/pricePlan';
import ContactUs from '../../../pages/landingpage/contactUs';
import Footer from '../../../pages/landingpage/footer';
import ParticleBackground from '../../../pages/landingpage/particelBackground';
import MagneticElements from '../../../pages/landingpage/magneticElement';

function HomePage() {
  return (
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
            <ParticleBackground />
            <MagneticElements />
              <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-500/5 to-transparent"></div>
      </div>
         <div className="relative z-10">
      <Navbar />
      <Banner />
      <WhyChooseUs />
      <Features />
      <PricingPlans />
      <ContactUs />
      <Footer />
      </div>
    </div>
  );
}

export default HomePage;