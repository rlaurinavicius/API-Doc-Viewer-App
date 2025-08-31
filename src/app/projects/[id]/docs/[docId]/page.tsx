"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import * as jsyaml from "js-yaml";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ApiDocument {
  id: string;
  name: string;
  content: string;
  fileType?: string; // Add fileType to the interface
}

export default function ApiDocumentDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const docId = params.docId as string;
  const [apiDocument, setApiDocument] = useState<ApiDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [spec, setSpec] = useState<any>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    if (!projectId || !docId) return;

    const fetchApiDocument = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}/docs/${docId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch API document");
        }
        const data = await response.json();
        setApiDocument(data.apiDocument);

        // Parse the content for SwaggerUI
        let parsedSpec: any;
        try {
          const docFileType = data.apiDocument.fileType || data.apiDocument.name.split(".").pop(); // Fallback to extension if fileType is null

          if (docFileType === "yaml" || docFileType === "yml") {
            parsedSpec = jsyaml.load(data.apiDocument.content);
          } else if (docFileType === "json") {
            parsedSpec = JSON.parse(data.apiDocument.content);
          } else {
            throw new Error("Unsupported file format");
          }
          setSpec(parsedSpec);
        } catch (parseError) {
          console.error("Error parsing API document content:", parseError);
          setError("Error parsing API document content.");
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApiDocument();
  }, [projectId, docId]);

  useEffect(() => {
    if (apiDocument) {
      setEditedName(apiDocument.name);
    }
  }, [apiDocument]);

  const handleSaveName = async () => {
    if (!editedName.trim()) {
      alert("Document name cannot be empty.");
      return;
    }
    try {
      const response = await fetch(`/api/documents/${docId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newName: editedName }),
      });

      if (!response.ok) {
        throw new Error("Failed to update document name.");
      }

      const result = await response.json();
      console.log("Name update successful:", result);
      setApiDocument((prevDoc) => (prevDoc ? { ...prevDoc, name: editedName } : null));
      setIsEditingName(false);
    } catch (err: any) {
      console.error("Error updating name:", err);
      alert(`Error updating name: ${err.message}`);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    if (apiDocument) {
      setEditedName(apiDocument.name);
    }
  };

  if (loading) {
    return <div className="text-center">Loading API document...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!apiDocument || !spec) {
    return <div className="text-center">API document not found or could not be parsed.</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {isEditingName ? (
          <Input
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="flex-grow"
          />
        ) : (
          <h1 className="text-3xl font-bold">API Document: {apiDocument.name}</h1>
        )}
        {!isEditingName && (
          <Button onClick={() => setIsEditingName(true)} size="sm" variant="outline">
            Edit
          </Button>
        )}
        {isEditingName && (
          <div className="flex gap-2">
            <Button onClick={handleSaveName} size="sm">Save</Button>
            <Button onClick={handleCancelEdit} size="sm" variant="outline">Cancel</Button>
          </div>
        )}
      </div>
      <SwaggerUI spec={spec} />
    </div>
  );
}