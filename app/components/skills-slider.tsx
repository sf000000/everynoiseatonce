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
  <SiFigma className="text-white w-12 h-12" />,
  <SiNextdotjs className="text-white w-12 h-12" />,
  <SiNodedotjs className="text-white w-12 h-12" />,
  <SiReact className="text-white w-12 h-12" />,
  <SiTypescript className="text-white w-12 h-12" />,
  <SiAmazonaws className="text-white w-12 h-12" />,
  <SiTailwindcss className="text-white w-12 h-12" />,
  <SiPrisma className="text-white w-12 h-12" />,
  <SiSupabase className="text-white w-12 h-12" />,
  <SiPostgresql className="text-white w-12 h-12" />,
  <SiPython className="text-white w-12 h-12" />,
  <SiDjango className="text-white w-12 h-12" />,
  <SiFlask className="text-white w-12 h-12" />,
  <SiSocketdotio className="text-white w-12 h-12" />,
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
