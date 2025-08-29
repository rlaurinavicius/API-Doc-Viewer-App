
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { projectName } = await request.json();

  console.log("Project name from API:", projectName);

  // For now, just return a success message.
  // Later, we will add the database logic here.
  return NextResponse.json({ message: "Project created successfully" }, { status: 201 });
}
