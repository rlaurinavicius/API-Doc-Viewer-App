
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { projectId: string; docId: string } }) {
  const { projectId, docId } = params;

  try {
    const apiDocument = await prisma.apiDocument.findUnique({
      where: {
        id: docId,
        projectId: projectId,
      },
    });

    if (!apiDocument) {
      return NextResponse.json({ message: "API Document not found" }, { status: 404 });
    }

    return NextResponse.json({ apiDocument }, { status: 200 });
  } catch (error) {
    console.error("Error fetching API document:", error);
    return NextResponse.json({ message: "Failed to fetch API document" }, { status: 500 });
  }
}
