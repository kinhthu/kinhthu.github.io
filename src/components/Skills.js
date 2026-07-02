import { 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaNodeJs, 
  FaReact, 
  FaGitAlt, 
  FaAngular, 
  FaDatabase,
  FaMobileAlt,
  FaCode
} from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";

export default function Skills() {
  const getSkillIcon = (name) => {
    switch (name.toLowerCase()) {
      case "html":
        return <FaHtml5 className="text-orange-500" size={24} />;
      case "css":
        return <FaCss3Alt className="text-blue-500" size={24} />;
      case "javascript":
        return <FaJs className="text-yellow-500" size={24} />;
      case "nodejs":
        return <FaNodeJs className="text-green-500" size={24} />;
      case "react":
        return <FaReact className="text-cyan-400" size={24} />;
      case "react native":
        return <FaMobileAlt className="text-cyan-400" size={24} />;
      case "git":
        return <FaGitAlt className="text-orange-600" size={24} />;
      case "angular 4":
        return <FaAngular className="text-red-600" size={24} />;
      case ".net":
        return <FaCode className="text-purple-500" size={24} />;
      case "sql server":
        return <FaDatabase className="text-blue-600" size={24} />;
      default:
        return <FaCode className="text-slate-400" size={24} />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-slate-950/20 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative inline-block">
            Skills & Expertise
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-500 rounded-full"></span>
          </h2>
          <p className="text-slate-400 text-sm tracking-wider uppercase font-medium mt-2">
            My technology stack proficiency
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-slate-900/30 border border-slate-800/80 hover:border-indigo-500/30 p-6 rounded-3xl backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-950/10 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-950/60 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {getSkillIcon(skill.name)}
                  </div>
                  <span className="font-bold text-white text-base">
                    {skill.name}
                  </span>
                </div>
                <span className="text-sm font-semibold font-mono text-indigo-400">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-[1px] border border-slate-900">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
