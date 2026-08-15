import React from 'react';
import { Users, Printer, Handshake, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Users,
      title: 'Experienced Team',
      description: 'Skilled professionals committed to excellence.',
    },
    {
      icon: Printer,
      title: 'Modern Equipment',
      description: 'State-of-the-art machines for perfect results.',
    },
    {
      icon: Handshake,
      title: 'Customer Focused',
      description: 'We listen, we care, and we deliver beyond expectations.',
    },
    {
      icon: ShieldCheck,
      title: 'Satisfaction Guaranteed',
      description: 'Your satisfaction is our top priority.',
    },
  ];

  return (
    <section id="about" className="relative py-16 lg:py-20 text-white bg-gradient-to-r from-[#0d21a1] via-[#4f1896] to-[#e11278] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Intro */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-4 font-heading leading-tight">
              WHY CHOOSE EKO PRINTS?
            </h2>
            <p className="text-white/85 text-sm leading-relaxed mb-6 font-normal">
              We combine creativity, technology and passion to deliver exceptional results for your business.
            </p>
            <div>
              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white hover:bg-white hover:text-blue-900 transition-all duration-300 shadow-sm"
              >
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Right Column: 4 Feature Highlights */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="flex flex-col items-start text-left">
                  <div className="mb-4 text-white/90">
                    <Icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
