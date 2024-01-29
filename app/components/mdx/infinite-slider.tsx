import {
  FigmaLogoIcon,
  FramerLogoIcon,
  SketchLogoIcon,
  TwitterLogoIcon,
  GitHubLogoIcon,
  VercelLogoIcon,
  NotionLogoIcon,
  DiscordLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

const LOGOS = [
  <FigmaLogoIcon className="text-white w-8 h-8" />,
  <FramerLogoIcon className="text-white w-8 h-8" />,
  <SketchLogoIcon className=" text-white w-8 h-8" />,
  <TwitterLogoIcon className="text-white w-8 h-8" />,
  <GitHubLogoIcon className="text-white w-8 h-8" />,
  <VercelLogoIcon className="text-white w-8 h-8" />,
  <NotionLogoIcon className="text-white w-8 h-8" />,
  <DiscordLogoIcon className="text-white w-8 h-8" />,
  <InstagramLogoIcon className="text-white w-8 h-8" />,
  <LinkedInLogoIcon className="text-white w-8 h-8" />,
];

export const InfiniteSlider = () => {
  return (
    <div className="not-prose relative flex items-center justify-center rounded-xl border px-4 py-12 bg-secondary/5">
      <div className="relative m-auto w-[500px] overflow-hidden bg-secondary/5 before:absolute before:left-0 before:top-0 before:z-[2] before:h-full before:w-[100px] before:bg-[linear-gradient(to_right,#0b0b0c_0%,rgba(11,11,12,0)_100%)] before:content-[''] after:absolute after:right-0 after:top-0 after:z-[2] after:h-full after:w-[100px] after:-scale-x-100 after:bg-[linear-gradient(to_right,#0b0b0c_0%,rgba(11,11,12,0)_100%)] after:content-['']">
        <div className="animate-infinite-slider flex w-[calc(250px*10)]">
          {LOGOS.map((logo, index) => (
            <div
              className="slide flex w-[125px] items-center justify-center"
              key={`first-${index}`}
            >
              {logo}
            </div>
          ))}
          {LOGOS.map((logo, index) => (
            <div
              className="slide flex w-[125px] items-center justify-center"
              key={`second-${index}`}
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
