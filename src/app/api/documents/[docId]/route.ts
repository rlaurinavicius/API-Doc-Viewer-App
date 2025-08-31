
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: { docId: string } }) {
  const docId = params.docId;
  const { newName } = await request.json();

  if (!newName) {
    return NextResponse.json({ message: "New name is required" }, { status: 400 });
  }

  try {
    const updatedDocument = await prisma.apiDocument.update({
      where: {
        id: docId,
      },
      data: {
        name: newName,
      },
    });
    return NextResponse.json({ message: "Document name updated successfully", updatedDocument }, { status: 200 });
  } catch (error) {
    console.error("Error updating document name:", error);
    return NextResponse.json({ message: "Failed to update document name" }, { status: 500 });
  }
}
