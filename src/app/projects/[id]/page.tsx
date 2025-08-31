
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Project {
  id: string;
  name: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        setProject(data.project);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return <div className="text-center">Loading project...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!project) {
    return <div className="text-center">Project not found.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Project: {project.name}</h1>
      {/* File upload UI will go here later */}
    </div>
  );
}
