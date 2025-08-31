
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        apiDocuments: {
          include: {
            apiEndpoints: true,
          },
        },
      },
    });
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ message: "Failed to fetch projects" }, { status: 500 });
  }
}
