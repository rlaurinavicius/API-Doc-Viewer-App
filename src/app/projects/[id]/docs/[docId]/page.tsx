
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import * as jsyaml from "js-yaml";

interface ApiDocument {
  id: string;
  name: string;
  content: string;
}

export default function ApiDocumentDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const docId = params.docId as string;
  const [apiDocument, setApiDocument] = useState<ApiDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [spec, setSpec] = useState<any>(null);

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
          if (data.apiDocument.name.endsWith(".yaml") || data.apiDocument.name.endsWith(".yml")) {
            parsedSpec = jsyaml.load(data.apiDocument.content);
          } else if (data.apiDocument.name.endsWith(".json")) {
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
      <h1 className="text-3xl font-bold mb-4">API Document: {apiDocument.name}</h1>
      <SwaggerUI spec={spec} />
    </div>
  );
}
