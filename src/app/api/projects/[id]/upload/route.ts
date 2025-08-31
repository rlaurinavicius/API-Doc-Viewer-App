
import { NextResponse } from "next/server";
import * as jsyaml from "js-yaml";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const projectId = params.id;
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  const uploadedDocuments = [];

  for (const file of files) {
    try {
      const fileContent = await file.text();
      let parsedContent: any;

      if (file.name.endsWith(".yaml") || file.name.endsWith(".yml")) {
        parsedContent = jsyaml.load(fileContent);
      } else if (file.name.endsWith(".json")) {
        parsedContent = JSON.parse(fileContent);
      } else {
        console.warn(`Skipping unsupported file type: ${file.name}`);
        continue;
      }

      const apiDocument = await prisma.apiDocument.create({
        data: {
          name: file.name,
          content: fileContent,
          projectId: projectId,
        },
      });
      uploadedDocuments.push(apiDocument);
    } catch (error) {
      console.error(`Error processing file ${file.name}:`, error);
      return NextResponse.json({ message: `Failed to process file ${file.name}` }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Files uploaded successfully", uploadedDocuments }, { status: 200 });
}
