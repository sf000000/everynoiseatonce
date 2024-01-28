"use client";

import React, { ComponentProps, useEffect, useState } from "react";
import axios from "axios";
import { HoverEffect } from "@/components/card-hover-effect";
import { cn } from "@/lib/utils";

export interface Project {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
}

export default function Projects({
  className,
  ...props
}: ComponentProps<"div">) {
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);

  const projectList =
    projects?.map((project) => ({
      title: project.name,
      description: project.description,
      link: project.html_url,
    })) || [];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get<Project[]>(
          "https://api.github.com/users/notjawad/repos"
        );
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div {...props} className={cn("mt-8 w-full", className)}>
      <h1 className="font-medium mb-4 text-lg">Projects</h1>
      {projects === undefined ? (
        <p>Loading...</p>
      ) : (
        <HoverEffect className="w-full" items={projectList.slice(0, 6)} />
      )}
    </div>
  );
}
