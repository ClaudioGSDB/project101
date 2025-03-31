"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import rocketAnimation from "./rocket-animation.json";
import { 
  Code, 
  Lightbulb, 
  Users, 
  ChevronDown
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const features = [
    {
      icon: Lightbulb,
      title: "Project Ideation",
      description: "Transform your creative sparks into structured project concepts with our intelligent guided form."
    },
    {
      icon: Code,
      title: "Tech Stack Visualization",
      description: "Explore and design your project's technology landscape with interactive, intuitive visualizations."
    },
    {
      icon: Users,
      title: "Collaborative Planning",
      description: "Break down features, map dependencies, and create a clear roadmap for your project."
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-blue-500/30 blur-3xl opacity-50"></div>

      {/* Hero Section with Centered Logo */}
      <main className="relative z-10 flex-grow flex flex-col justify-center items-center min-h-screen px-6 py-16">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-[12vw] md:text-[15rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 tracking-tighter text-center">
            Project101
          </h1>
        </div>

        {/* Scroll Down Button */}
        <div className="absolute bottom-20 top-1/2 left-1/2 transform -translate-x-1/2">
          <Button 
            variant="outline" 
            size="icon" 
            className="animate-bounce bg-white/20 backdrop-blur-sm border-indigo-300 hover:bg-white/30"
            onClick={scrollToContent}
          >
            <ChevronDown className="h-6 w-6 text-indigo-500" />
          </Button>
        </div>

        <div ref={contentRef} className="max-w-4xl text-center mt-[100vh] pt-16">
          <h2 className="text-[4vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 tracking-tight mb-6">
            Transform Your Project Ideas into Reality
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Project101 is an AI-powered platform that helps developers, entrepreneurs, and innovators turn their project concepts into structured, actionable plans.
          </p>
          <div className="flex justify-center items-center">
          <Button 
  className="w-[158px] bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transition-transform duration-300 flex items-center justify-center"
  onClick={() => router.push("/form")}
  onMouseEnter={() => lottieRef.current?.play()}
  onMouseLeave={() => lottieRef.current?.stop()}
>
  <div className="w-10 h-10 mr-2 flex items-center justify-center">
    <Lottie 
      lottieRef={lottieRef}
      animationData={rocketAnimation} 
      loop={false}
      autoplay={false}
      style={{ 
        width: '100%', 
        height: '100%', 
        transform: 'scale(35) translateY(-.25%) translateX(5%)', 
        transformOrigin: 'center'
      }}
    />
  </div>
  Start Your Project
</Button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              What Makes Project101 Unique
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive toolkit designed to streamline your project development journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="mb-4 flex items-center justify-center">
                  <feature.icon className="h-12 w-12 text-indigo-500" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm">
            © 2024 Project101. All rights reserved.
          </p>
          <div className="space-x-4">
            <a href="#" className="hover:text-indigo-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}