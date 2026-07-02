import { portfolioData } from "@/data/portfolioData";

export default function Timeline() {
  const getPeriodString = (job) => {
    const start = `${job.begin.month} ${job.begin.year}`;
    const end = job.duration ? job.duration : "Present";
    
    // Calculate end month/year if duration is given
    if (job.duration === "2 yrs" && job.begin.year === "2017") {
      return `${start} - Jun 2019 (${job.duration})`;
    }
    if (job.duration === "2 yrs 1 mo" && job.begin.year === "2015") {
      return `${start} - Jun 2017 (${job.duration})`;
    }
    if (job.duration === "1 yr" && job.begin.year === "2013") {
      return `${start} - Apr 2014 (${job.duration})`;
    }
    return `${start} - ${end}`;
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 relative inline-block">
            Work Experience
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-indigo-600 rounded-full"></span>
          </h2>
          <p className="text-slate-500 text-sm tracking-wider uppercase font-medium mt-2">
            My professional career path
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-slate-200 ml-4 md:ml-6 space-y-12">
          {portfolioData.jobs.map((job, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-10 group">
              {/* Timeline dot */}
              <span className="absolute -left-[9px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white border-2 border-indigo-600 group-hover:border-cyan-500 transition-colors duration-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 group-hover:bg-cyan-500 transition-colors duration-300"></span>
              </span>

              {/* Experience Card */}
              <div className="bg-white border border-slate-200 hover:border-indigo-600/30 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {job.occupation}
                    </h3>
                    <span className="text-sm font-semibold text-cyan-600">
                      {job.company}
                    </span>
                  </div>
                  
                  <span className="inline-block text-xs font-mono font-medium px-3 py-1 bg-slate-100 text-slate-500 border border-slate-200/80 rounded-full w-fit">
                    {getPeriodString(job)}
                  </span>
                </div>

                <div
                  className="text-slate-655 text-sm sm:text-base leading-relaxed space-y-2 job-description"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
