"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "./project-card";

export interface Project {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);

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
    <div className="mt-8">
      <h1 className="font-medium mb-4 text-lg">Projects</h1>
      {projects === undefined ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-x-10">
          {projects.map((project) => (
            <div key={project.name}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
