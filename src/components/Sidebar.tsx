
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Project {
  id: string;
  name: string;
}

export function Sidebar() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects/list");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="w-64 border-r bg-gray-50 p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Projects</h2>
      <ScrollArea className="flex-grow">
        <nav className="space-y-1">
          {projects.length === 0 ? (
            <p className="text-sm text-gray-500">No projects yet.</p>
          ) : (
            projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                {project.name}
              </Link>
            ))
          )}
        </nav>
      </ScrollArea>
    </div>
  );
}
