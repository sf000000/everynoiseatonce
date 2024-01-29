import { ComponentPropsWithRef, useRef, useState } from "react";
import { Project } from "./projects";
import { ExternalLink, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CardSpotlightProps extends ComponentPropsWithRef<"div"> {
  project: Project;
}

export const ProjectCard = ({
  project,
  className,
  ...props
}: CardSpotlightProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex flex-col justify-between w-full md:max-w-xs rounded-lg border p-8",
        className
      )}
      {...props}
    >
      <div>
        <div
          className="pointer-events-none rounded-lg absolute -inset-px opacity-0 transition duration-500"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.10), transparent 40%)`,
          }}
        />

        <h3 className="mb-2 font-medium tracking-tight">{project.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {project.description || "No description."}
        </p>
      </div>

      {project.homepage && (
        <Link className="flex items-center gap-x-2" href={project.homepage}>
          <ExternalLink size={16} />
          <span className="text-sm line-clamp-1">Demo</span>
        </Link>
      )}
    </div>
  );
};
