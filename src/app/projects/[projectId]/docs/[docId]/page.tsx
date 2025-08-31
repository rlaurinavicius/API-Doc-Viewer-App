
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface ApiDocument {
  id: string;
  name: string;
  content: string;
}

export default function ApiDocumentDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const docId = params.docId as string;
  const [apiDocument, setApiDocument] = useState<ApiDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (!apiDocument) {
    return <div className="text-center">API document not found.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">API Document: {apiDocument.name}</h1>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
        <code>{apiDocument.content}</code>
      </pre>
    </div>
  );
}
