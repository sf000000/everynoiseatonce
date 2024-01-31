import {
  SiFigma,
  SiNextdotjs,
  SiPython,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiSupabase,
  SiPostgresql,
  SiDjango,
  SiFlask,
  SiSocketdotio,
  SiAmazonaws,
  SiNodedotjs,
} from "react-icons/si";

const logos = [
  <SiFigma key="figma" className="text-white w-12 h-12" />,
  <SiNextdotjs key="nextjs" className="text-white w-12 h-12" />,
  <SiNodedotjs key="nodejs" className="text-white w-12 h-12" />,
  <SiReact key="react" className="text-white w-12 h-12" />,
  <SiTypescript key="typescript" className="text-white w-12 h-12" />,
  <SiAmazonaws key="aws" className="text-white w-12 h-12" />,
  <SiTailwindcss key="tailwindcss" className="text-white w-12 h-12" />,
  <SiPrisma key="prisma" className="text-white w-12 h-12" />,
  <SiSupabase key="supabase" className="text-white w-12 h-12" />,
  <SiPostgresql key="postgresql" className="text-white w-12 h-12" />,
  <SiPython key="python" className="text-white w-12 h-12" />,
  <SiDjango key="django" className="text-white w-12 h-12" />,
  <SiFlask key="flask" className="text-white w-12 h-12" />,
  <SiSocketdotio key="socketio" className="text-white w-12 h-12" />,
];

const SkillsSlider = () => {
  return (
    <div>
      <h1 className="font-medium mb-4 text-lg">Skills</h1>
      <div className="not-prose relative flex items-center justify-center rounded-xl border px-4 py-12">
        <div className="relative m-auto w-[600px] overflow-hidden before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,#09090b_0%,rgba(11,11,12,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,#09090b_0%,rgba(11,11,12,0)_100%)] after:content-['']">
          <div className="animate-infinite-slider flex w-[calc(250px*12)]">
            {logos.map((logo, index) => (
              <div
                className="slide flex w-[125px] items-center justify-center"
                key={index}
              >
                {logo}
              </div>
            ))}
            {logos.map((logo, index) => (
              <div
                className="slide flex w-[125px] items-center justify-center"
                key={index}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSlider;
