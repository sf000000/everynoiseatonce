import { ComponentProps } from "react";
import { Project } from "./projects";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps extends ComponentProps<"div"> {
  project: Project;
}

export default function ProjectCard({
  project,
  className,
  ...props
}: ProjectCardProps) {
  return (
    <div className={cn("mt-5", className)} {...props}>
      <Link target="_blank" rel="noopener noreferrer" href={project.html_url}>
        <div className="hover:underline">
          <h6 className="text-sm mb-1 font-medium">{project.name}</h6>
          <p className="max-w-xs text-sm font-normal text-muted-foreground">
            {project.description === null
              ? "No description"
              : project.description}
          </p>
        </div>
      </Link>
      {project.homepage !== "" && project.homepage !== null && (
        <div className="flex flex-row items-center gap-1 mt-2">
          <ExternalLink size={16} />
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={project.homepage}
          >
            <p className="hover:underline text-sm font-normal">
              {project.homepage}
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
