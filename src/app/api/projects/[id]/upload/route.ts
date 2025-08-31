
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const projectId = params.id;
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  console.log(`Received ${files.length} files for project ${projectId}:`);
  for (const file of files) {
    console.log(`- ${file.name} (${file.size} bytes)`);
    // In a real application, you would process and save the file here.
  }

  return NextResponse.json({ message: "Files uploaded successfully" }, { status: 200 });
}
