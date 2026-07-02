"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt, FaFolder } from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  // Curated fallback repositories in case GitHub API fails/rate-limits
  const fallbackRepos = [
    {
      id: "fallback-1",
      name: "gotruckster",
      description: "Catering food truck ordering and booking website in the US. Built using React, Next.js, and Google Maps API.",
      html_url: "https://gotruckster.com/",
      stargazers_count: 12,
      forks_count: 3,
      language: "JavaScript",
    },
    {
      id: "fallback-2",
      name: "tickettamer",
      description: "Law ticket clearing web application helping users resolve traffic tickets and legal issues in various states.",
      html_url: "https://tickettamer.com/",
      stargazers_count: 8,
      forks_count: 2,
      language: "React",
    },
    {
      id: "fallback-3",
      name: "urgentadmin",
      description: "Healthcare emergency dispatch coordination platform and mobile app with real-time tracking and scheduling.",
      html_url: "https://urgentadmin.com/preview",
      stargazers_count: 15,
      forks_count: 4,
      language: "Angular",
    },
    {
      id: "fallback-4",
      name: "gatsby-starter-cv",
      description: "A clean and modern CV/Resume static website starter theme built using Gatsby, React, and styled-components.",
      html_url: `https://github.com/${portfolioData.githubUsername}/gatsby-starter-cv`,
      stargazers_count: 24,
      forks_count: 9,
      language: "JavaScript",
    },
    {
      id: "fallback-5",
      name: "honey-farm-manager",
      description: "Mobile application to manage honey from farm harvesting, laboratory analysis, to packaging tracking.",
      html_url: `https://github.com/${portfolioData.githubUsername}`,
      stargazers_count: 5,
      forks_count: 1,
      language: "TypeScript",
    }
  ];

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${portfolioData.githubUsername}/repos?sort=updated&per_page=30`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();
        
        // Filter out fork repositories and sort by star count descending
        const filtered = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6); // Show top 6 repos
          
        if (filtered.length === 0) {
          setRepos(fallbackRepos);
          setIsFallback(true);
        } else {
          setRepos(filtered);
          setIsFallback(false);
        }
      } catch (err) {
        console.error("GitHub API error, using static fallback:", err);
        setRepos(fallbackRepos);
        setIsFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const getLanguageColor = (lang) => {
    switch (lang?.toLowerCase()) {
      case "javascript":
        return "bg-yellow-500";
      case "typescript":
        return "bg-blue-500";
      case "react":
      case "react native":
        return "bg-cyan-400";
      case "html":
        return "bg-orange-500";
      case "css":
        return "bg-indigo-500";
      case "angular":
        return "bg-red-600";
      case "php":
        return "bg-purple-600";
      case "c#":
        return "bg-green-600";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <section id="projects" className="py-24 bg-slate-900/10 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative inline-block">
            Projects & Portfolio
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-500 rounded-full"></span>
          </h2>
          <p className="text-slate-400 text-sm tracking-wider uppercase font-medium mt-2">
            Some of my recent work {isFallback && "(Curated List)"}
          </p>
        </div>

        {loading ? (
          /* Skeleton Loader */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-slate-900/20 border border-slate-900 p-6 rounded-3xl h-60 animate-pulse flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-slate-800 rounded-xl"></div>
                  <div className="w-2/3 h-5 bg-slate-800 rounded-md"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-slate-800 rounded-md"></div>
                    <div className="w-5/6 h-3 bg-slate-800 rounded-md"></div>
                  </div>
                </div>
                <div className="w-full h-4 bg-slate-800 rounded-md"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="bg-slate-900/30 border border-slate-800/80 hover:border-indigo-500/30 p-6 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-950/20 flex flex-col justify-between group h-64"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-slate-950/60 rounded-2xl text-indigo-400 group-hover:text-cyan-400 transition-colors duration-300">
                      <FaFolder size={22} />
                    </div>
                    
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-white transition-colors duration-200"
                      aria-label="Visit project"
                    >
                      <FaExternalLinkAlt size={16} />
                    </a>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-indigo-400 transition-colors">
                    {repo.name}
                  </h3>

                  {/* Project Description */}
                  <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
                    {repo.description || "No description available for this repository."}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-900 mt-4 text-xs font-mono text-slate-500">
                  {/* Language */}
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-3 h-3 rounded-full ${getLanguageColor(
                        repo.language
                      )}`}
                    ></span>
                    <span className="font-semibold text-slate-400">
                      {repo.language || "Web"}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <FaStar size={12} className="text-amber-500" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaCodeBranch size={12} className="text-indigo-400" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
