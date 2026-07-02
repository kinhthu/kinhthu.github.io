import { portfolioData } from "@/data/portfolioData";

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 relative inline-block">
            About Me
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-600 rounded-full"></span>
          </h2>
          <p className="text-slate-500 text-sm tracking-wider uppercase font-medium mt-2">
            My background and education
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Avatar side */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group">
              {/* Radial gradient background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              {/* Outer frame */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-white border border-slate-200 rounded-2xl overflow-hidden p-3 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                {/* Image element */}
                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-50 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={portfolioData.authorAvatar}
                    alt={portfolioData.authorName}
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="md:col-span-8 space-y-6">
            <div className="bg-white/80 border border-slate-200/80 p-8 rounded-3xl backdrop-blur-xl shadow-md">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                Full-Stack Frontend & Mobile Developer
              </h3>
              
              <div
                className="text-slate-600 leading-relaxed space-y-4 font-normal text-sm sm:text-base about-description"
                dangerouslySetInnerHTML={{ __html: portfolioData.authorDescription }}
              />
            </div>
            
            {/* Quick stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
              <div className="bg-white/65 border border-slate-200/60 p-4 rounded-2xl text-center shadow-sm">
                <span className="block text-2xl font-extrabold text-indigo-600">9+</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Years Experience</span>
              </div>
              <div className="bg-white/65 border border-slate-200/60 p-4 rounded-2xl text-center shadow-sm">
                <span className="block text-2xl font-extrabold text-cyan-600">10+</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Major Projects</span>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-white/65 border border-slate-200/60 p-4 rounded-2xl text-center shadow-sm">
                <span className="block text-2xl font-extrabold text-purple-600">GPA 8.52</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">BS in IT (Honors)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
