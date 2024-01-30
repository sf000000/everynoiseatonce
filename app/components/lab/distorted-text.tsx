import { useRef } from "react";
import { motion } from "framer-motion";

export const DistortedText = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={ref}
        className="relative h-[220px] w-full border rounded-lg overflow-hidden"
      >
        <div className="mb-1 inline-block text-sm sm:hidden">
          Doesn&apos;t work as well on mobile, sorry!
        </div>
        <div className="flex h-full overflow-y-scroll text-2xl p-3">
          Death Note (2006-2007) - IMDb - Death Note: Created by Tsugumi Ohba
          and Takeshi Obata. With Mamoru Miyano, Kappei Yamaguchi, Shidou
          Nakamura, Aya Hirano. Light Yagami is an ace student with great
          prospects, who stumbles upon a mysterious notebook that has the power
          to kill anyone whose name is written in it. Intent on cleansing the
          world of criminals, Light takes on the persona of &quot;Kira&quot; to
          enact his brand of justice. But as his moral boundaries blur, a
          relentless detective known as L becomes determined to stop his reign.
          The cat-and-mouse game that unfolds challenges the very notions of
          right and wrong, justice and retribution. As Light and L engage in a
          battle of wits, the question arises: can one person hold the power to
          decide life and death without becoming a tyrant? The fate of humanity
          hangs in the balance as ideologies clash, with the concept of justice
          being redefined by each character&apos;s perspective. This is the
          gripping tale of Death Note, where intellect and morality are tested
          in the face of ultimate power.
        </div>

        <div
          className="glassmorphism-effect pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform backdrop-blur-0 will-change-transform"
          style={{
            filter: "url(#distord-text)",
          }}
        />
        <svg>
          <defs>
            <filter id="distord-text">
              <motion.feTurbulence
                animate={{
                  baseFrequency: [0.001, 0.02],
                }}
                transition={{
                  ease: "linear",
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                type="fractalNoise"
                numOctaves="1"
                result="warp"
              ></motion.feTurbulence>
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="30"
                in="SourceGraphic"
                in2="warp"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </>
  );
};
