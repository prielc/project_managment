import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const include = {
  contentDomain: true,
  weaponSystem: true,
  analyst: true,
} as const;

export async function GET() {
  const projects = await prisma.project.findMany({
    include,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, contentDomainId, weaponSystemId, analystId } = body ?? {};

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof contentDomainId !== "string" ||
    typeof weaponSystemId !== "string" ||
    typeof analystId !== "string"
  ) {
    return NextResponse.json(
      { error: "שם, עולם תוכן, אמל\"ח מוביל ואנליסט הם שדות חובה" },
      { status: 400 },
    );
  }

  try {
    const project = await prisma.project.create({
      data: { name: name.trim(), contentDomainId, weaponSystemId, analystId },
      include,
    });
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "אחד הערכים שנבחרו אינו תקין" },
      { status: 400 },
    );
  }
}
