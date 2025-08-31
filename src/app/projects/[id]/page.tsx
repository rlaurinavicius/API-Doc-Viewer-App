
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select files to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    try {
      const response = await fetch(`/api/projects/${projectId}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed.");
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      alert("Files uploaded successfully!");
      setSelectedFiles(null); // Clear selected files
    } catch (err: any) {
      console.error("Error uploading files:", err);
      alert(`Error uploading files: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Project: {project.name}</h1>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Upload API Documentation</CardTitle>
          <CardDescription>Upload your .yaml or .json API specification files here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input id="picture" type="file" multiple accept=".yaml,.json" onChange={handleFileChange} />
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpload} disabled={uploading || !selectedFiles}>
            {uploading ? "Uploading..." : "Upload Files"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
