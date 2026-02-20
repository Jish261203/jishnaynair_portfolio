// "use client";

// import SectionHeading from "@/components/section-heading";
// import HeadingLine from "@/components/ui/heading-line";
// import { cn } from "@/lib/utils";
// import { motion } from "motion/react";
// import { Badge } from "@/components/ui/badge";
// import { Terminal, Briefcase, Calendar } from "lucide-react";

// const WorkExperience = () => {
//   const experiences = [
//     {
//       id: 1,
//       position: "Software Consultant",
//       company: "The Bombay Group",
//       duration: "AUG 2025 - JAN 2026",
//       description: [
//         "Developed a real-time trading dashboard to visualize financial data and key metrics, enabling structured analysis and performance monitoring.",
//         "Implemented live video streaming functionality for an education platform, enhancing user engagement and real-time content delivery.",
//         "Led end-to-end development of a visa management platform with scalable, responsive UI/UX and integrated backend workflows.",
//         "Built and deployed an AI-powered data extraction system using Gemini AI, enabling image-based data ingestion and full CRUD operations.",
//       ],
//       skills: [
//         "Real-time Dashboard",
//         "Video Streaming",
//         "Visa Management",
//         "AI/Gemini",
//         "UI/UX",
//         "Backend",
//         "DigitalOcean",
//       ],
//     },
//   ];

//   return (
//     <SectionHeading id="experience" text="Experience">
//       <div className="relative divide-y border-b">
//         {experiences.map((exp, index) => (
//           <motion.div
//             key={exp.id}
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//             className="group grid lg:grid-cols-12"
//           >
//             {/* Left Sidebar: Metadata (Matches the Stats/About layout) */}
//             <div className="bg-muted/5 relative border-b p-8 lg:col-span-4 lg:border-r lg:border-b-0">
//               <div className="sticky top-24 space-y-4">

//                 <h3 className="font-incognito text-3xl leading-tight font-bold">
//                   {exp.company}
//                 </h3>

//                 <div className="text-foreground/60 flex flex-col gap-2 font-mono text-sm">
//                   <div className="flex items-center gap-2">
//                     <Briefcase className="size-4" />
//                     {exp.position}
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Calendar className="size-4" />
//                     {exp.duration}
//                   </div>
//                 </div>

//                 {/* Decorative Terminal Line */}
//                 <div className="mt-8 hidden lg:block">
//                   <div className="h-px w-full bg-linear-to-r from-blue-500/50 to-transparent" />
//                   <p className="text-foreground/30 mt-2 font-mono text-[10px]">
//                     &gt; system_role:{" "}
//                     {exp.position.toLowerCase().replace(" ", "_")}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side: Detailed Descriptions */}
//             <div className="relative p-8 md:p-12 lg:col-span-8 lg:p-16">
//               {/* Grid Pattern Overlay (Consistent with your Hero/Stats) */}
//               <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] dark:opacity-[0.07]" />

//               <div className="relative space-y-6">
//                 <div className="space-y-4">
//                   {exp.description.map((point, idx) => (
//                     <div key={idx} className="group/item flex gap-4">
//                       <span className="mt-1.5 font-mono text-xs text-blue-500">
//                         [{idx + 1}]
//                       </span>
//                       <p className="text-foreground/70 group-hover/item:text-foreground text-sm leading-relaxed transition-colors md:text-base">
//                         {point}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Skill Tags: Mono Styled */}
//                 <div className="pt-8">
//                   <div className="mb-4 flex items-center gap-2">
//                     <div className="bg-border h-px flex-1" />
//                     <span className="text-foreground/40 font-mono text-[10px] tracking-tighter uppercase">
//                       Tech_Stack_Deployed
//                     </span>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {exp.skills.map((skill) => (
//                       <Badge
//                         key={skill}
//                         variant="outline"
//                         className="border-foreground/10 bg-muted/30 rounded-none px-3 py-1 font-mono text-[11px] transition-colors hover:border-blue-500/50 hover:bg-blue-500/5"
//                       >
//                         {skill}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Decorative Corner (Matches your Project cards) */}
//               <div className="absolute right-0 bottom-0 h-12 w-12 opacity-10">
//                 <div className="border-foreground absolute right-2 bottom-2 h-4 w-4 border-r-2 border-b-2" />
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </SectionHeading>
//   );
// };

// export default WorkExperience;

"use client";

import SectionHeading from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar, Terminal, Cpu } from "lucide-react";

const WorkExperience = () => {
  const experiences = [
    {
      id: "01",
      position: "Software Consultant",
      company: "The Bombay Group",
      duration: "AUG 2025 - JAN 2026",
      description: [
        "Developed a real-time trading dashboard to visualize financial data and key metrics, enabling structured analysis and performance monitoring.",
        "Implemented live video streaming functionality for an education platform, enhancing user engagement and real-time content delivery.",
        "Led end-to-end development of a visa management platform with scalable, responsive UI/UX and integrated backend workflows.",
        "Built and deployed an AI-powered data extraction system using Gemini AI, enabling image-based data ingestion and full CRUD operations.",
      ],
      skills: [
        "Real-time Dashboard",
        "Video Streaming",
        "Visa Management",
        "AI/Gemini",
        "UI/UX",
        "Backend",
        "DigitalOcean",
      ],
    },
  ];

  return (
    // Changed "Experience" to "Work Experience" and ensured no clipping in SectionHeading
    <SectionHeading id="experience" text="Work Experience">
      <div className="border-foreground/10 relative divide-y border-t border-b">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group grid lg:grid-cols-12"
          >
            {/* CORRECTION: Added 'min-h-[400px] flex flex-col justify-center' 
                to ensure the content is vertically centered in the left column.
            */}
            <div className="bg-muted/5 lg:border-foreground/10 relative flex min-h-[400px] flex-col justify-center overflow-hidden p-8 lg:col-span-4 lg:border-r">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 mt-4 -mr-4 rotate-12 font-mono text-[10px] leading-tight opacity-[0.03] select-none">
                {`const deploy = async () => {\n  await cloud.provision();\n  console.log("Success");\n}`}
              </div>

              {/* ID Side Label */}
              <div className="absolute top-1/2 left-2 hidden -translate-y-1/2 -rotate-90 lg:block">
                <span className="text-foreground/5 font-mono text-4xl font-black tracking-tighter">
                  EXP_{exp.id}
                </span>
              </div>

              <div className="relative z-10 space-y-6 lg:pl-10">
                {/* Status Tab */}
                <div className="inline-flex items-center gap-2 rounded-sm border border-blue-500/20 bg-blue-500/5 px-2 py-1">
                  <Terminal className="size-3 text-blue-500" />
                  <span className="font-mono text-[10px] tracking-widest text-blue-500/80 uppercase">
                    Deployed_Session
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-incognito text-foreground text-4xl font-bold tracking-tight">
                    {exp.company}
                  </h3>
                  <div className="h-1 w-12 bg-blue-500" />
                </div>

                <div className="text-foreground/60 space-y-3 font-mono text-sm">
                  <div className="group-hover:text-foreground flex items-center gap-3 transition-colors">
                    <Briefcase className="size-4 text-blue-500/50" />
                    <span className="border-foreground/20 border-b border-dotted">
                      {exp.position}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="size-4 text-blue-500/50" />
                    <span className="bg-foreground/5 rounded px-2 py-0.5 text-xs">
                      {exp.duration}
                    </span>
                  </div>
                </div>

                <div className="pt-4 opacity-20 transition-opacity group-hover:opacity-40">
                  <Cpu className="size-12 stroke-[1px]" />
                </div>
              </div>
            </div>

            {/* Right Side: Detailed Descriptions */}
            <div className="relative flex flex-col justify-center p-8 md:p-12 lg:col-span-8 lg:p-16">
              <div className="border-foreground/20 absolute top-4 left-4 size-2 border-t border-l" />
              <div className="border-foreground/20 absolute top-4 right-4 size-2 border-t border-r" />
              <div className="border-foreground/20 absolute bottom-4 left-4 size-2 border-b border-l" />
              <div className="border-foreground/20 absolute right-4 bottom-4 size-2 border-r border-b" />

              <div className="relative">
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-blue-500" />
                  <span className="text-foreground/40 font-mono text-xs tracking-[0.2em] uppercase">
                    Task_Manifest
                  </span>
                </div>

                <div className="space-y-6">
                  {exp.description.map((point, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="group/item flex gap-4 border-l-2 border-transparent pl-4 transition-all duration-300 hover:border-blue-500"
                    >
                      <span className="mt-1 font-mono text-xs text-blue-500/40">
                        0{idx + 1}
                      </span>
                      <p className="text-foreground/70 group-hover/item:text-foreground text-sm leading-relaxed md:text-base">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="border-foreground/10 bg-muted/5 mt-12 rounded-lg border border-dashed p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-foreground/40 font-mono text-[10px] uppercase underline underline-offset-4">
                      Environmental_Variables
                    </span>
                    <span className="font-mono text-[10px] text-blue-500/50">
                      v1.0.4
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-foreground/5 text-foreground/70 rounded-none border-none px-3 py-1 font-mono text-[11px] transition-all hover:bg-blue-500 hover:text-white"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionHeading>
  );
};

export default WorkExperience;