"use client";

import { ComponentProps, useEffect, useState } from "react";

import axios from "axios";

import { cn } from "@/lib/utils";
import { ProjectCard } from "@/app/components/project-card";

export interface Project {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  fork: boolean;
}

export default function Projects({
  className,
  ...props
}: ComponentProps<"div">) {
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get<Project[]>(
          "https://api.github.com/users/sf000000/repos"
        );
        const userProjects = response.data.filter((project) => !project.fork);
        setProjects(userProjects);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div {...props} className={cn("mt-8 w-full", className)}>
      <h1 className="font-medium mb-4 text-lg">Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects?.slice(0, 6).map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            className="w-full select-none"
          />
        ))}
      </div>
    </div>
  );
}
