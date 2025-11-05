// components/home/CTASection.tsx
import React from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

const CTASection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="text-sm font-semibold text-white">
              🚀 Limited Time Offer
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful companies using Bizone to streamline operations, 
            boost productivity, and drive growth. Start your journey today.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">14-day</div>
              <div className="text-blue-200 text-sm">free trial</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">No credit</div>
              <div className="text-blue-200 text-sm">card required</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">Setup in</div>
              <div className="text-blue-200 text-sm">5 minutes</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold min-w-[200px]"
              onClick={() => router.push(ROUTES.AUTH.REGISTER)}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 font-semibold min-w-[200px]"
              onClick={() => router.push(ROUTES.AUTH.LOGIN)}
            >
              Book a Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col items-center space-y-4">
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-white font-medium">4.9/5</span>
              <span className="text-blue-200">from 2,000+ reviews</span>
            </div>

            {/* Security badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-blue-200 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Enterprise-grade security</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>SOC 2 Compliant</span>
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <p className="text-blue-200 text-sm mt-8">
            No setup fees • No hidden charges • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;