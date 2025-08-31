
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ApiDocument {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  apiDocuments?: ApiDocument[];
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
              <div key={project.id}>
                <Link
                  href={`/projects/${project.id}`}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  {project.name}
                </Link>
                {project.apiDocuments && project.apiDocuments.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {project.apiDocuments.map((doc) => (
                      <li key={doc.id}>
                        <Link
                          href={`/projects/${project.id}/docs/${doc.id}`}
                          className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-200"
                        >
                          {doc.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </nav>
      </ScrollArea>
    </div>
  );
}
