
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { projectName } = await request.json();

  try {
    const project = await prisma.project.create({
      data: {
        name: projectName,
      },
    });
    console.log("Project saved to DB:", project);
    return NextResponse.json({ message: "Project created and saved to database", project }, { status: 201 });
  } catch (error) {
    console.error("Error saving project to DB:", error);
    return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
  }
}
