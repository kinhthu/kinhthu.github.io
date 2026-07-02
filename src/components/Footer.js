import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900 bg-slate-950/40 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright info */}
        <p className="text-sm text-slate-500 text-center md:text-left">
          &copy; {currentYear} {portfolioData.authorName}. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center space-x-6">
          <a
            href={portfolioData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-indigo-400 transition-colors duration-200"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={portfolioData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-indigo-400 transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={portfolioData.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-indigo-400 transition-colors duration-200"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href={`mailto:${portfolioData.social.email}`}
            className="text-slate-500 hover:text-indigo-400 transition-colors duration-200"
            aria-label="Email"
          >
            <FaEnvelope size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
