export default function LandingPage() {
    return (
      <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-50 overflow-hidden">
        {/* Blurred Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-blue-500/30 blur-3xl opacity-50"></div>
  
        {/* Glowing Text Effect */}
        <h1 className="relative text-[10vw] font-extrabold uppercase text-transparent 
                       bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500
                       before:absolute before:inset-0 before:text-transparent before:bg-clip-text 
                       before:bg-gradient-to-r before:from-indigo-500 before:to-blue-500 before:opacity-30 
                       before:-webkit-text-stroke-2 before:-webkit-text-stroke-color rgba(255,255,255,0.2) 
                       tracking-tight drop-shadow-lg">
          Project101
        </h1>
  
        {/* Subtext */}
        <p className="mt-4 text-lg text-gray-600 text-center">
          Innovate. Collaborate. Build something amazing.
        </p>
  
        {/* Call-to-Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 rounded-md border border-indigo-500 text-indigo-500 
                             bg-transparent hover:bg-indigo-500 hover:text-white transition">
            Learn More
          </button>
          <button className="px-6 py-3 rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 
                             text-white hover:scale-105 transition-transform">
            Get Started
          </button>
        </div>
      </div>
    );
  }
  