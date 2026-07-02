"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const fullQuote = "Do WHAT you LOVE, and LOVE what you DO";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullQuote.charAt(index));
      index++;
      if (index >= fullQuote.length) {
        clearInterval(interval);
      }
    }, 85);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-16 relative overflow-hidden"
    >
      {/* Background blobs for a premium ambient glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left column: Text content */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-center md:text-left">
          <span className="text-sm font-semibold tracking-widest text-indigo-400 uppercase">
            Welcome to my space
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              {portfolioData.authorName}
            </span>
          </h1>

          <div className="h-8 flex items-center justify-center md:justify-start">
            <span className="text-base sm:text-lg md:text-xl font-mono text-cyan-400 border-r-2 border-indigo-500 pr-1 animate-pulse">
              {typedText}
            </span>
          </div>

          <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto md:mx-0 leading-relaxed">
            I am a passionate Frontend and Mobile Developer with over 9 years of experience 
            building highly interactive web applications and native mobile apps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <a
              href="#projects"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-md shadow-indigo-950/20 hover:shadow-indigo-500/20 hover:-translate-y-0.5"
            >
              View My Work
              <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#experience"
              className="flex items-center justify-center bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5"
            >
              My Experience
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 pt-6 text-slate-500">
            <a
              href={portfolioData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              <FaGithub size={24} />
            </a>
            <a
              href={portfolioData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Right column: Glassmorphic Visual Component */}
        <div className="md:col-span-5 flex justify-center items-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            {/* Ambient shadow backing */}
            <div className="absolute inset-0 bg-indigo-500/10 rounded-3xl blur-2xl animate-float"></div>
            
            {/* Glass box decoration */}
            <div className="w-[85%] h-[85%] bg-slate-900/40 border border-slate-800/80 rounded-3xl backdrop-blur-xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-700/80 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className="text-xs font-mono text-slate-600">index.js</span>
              </div>
              
              <div className="font-mono text-xs sm:text-sm text-slate-300 space-y-2 mt-4 flex-grow select-none">
                <p><span className="text-indigo-400">const</span> developer = &#123;</p>
                <p className="pl-4">name: <span className="text-emerald-400">"{portfolioData.authorName}"</span>,</p>
                <p className="pl-4">role: <span className="text-emerald-400">"Frontend & Mobile"</span>,</p>
                <p className="pl-4">skills: [</p>
                <p className="pl-8"><span className="text-cyan-400">"React"</span>, <span className="text-cyan-400">"Next.js"</span>,</p>
                <p className="pl-8"><span className="text-cyan-400">"TailwindCSS"</span>, <span className="text-cyan-400">"Native"</span></p>
                <p className="pl-4">],</p>
                <p className="pl-4">passionate: <span className="text-indigo-400">true</span></p>
                <p>&#125;;</p>
              </div>

              <div className="border-t border-slate-800/80 pt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">// Made with ❤️</span>
                <span className="text-xs font-mono text-indigo-400">9+ Yrs Exp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
