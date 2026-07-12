import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const include = {
  contentDomain: true,
  weaponSystem: true,
  analyst: true,
} as const;

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/projects/[id]">,
) {
  const { id } = await ctx.params;
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
    const project = await prisma.project.update({
      where: { id },
      data: { name: name.trim(), contentDomainId, weaponSystemId, analystId },
      include,
    });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: "הפרויקט לא נמצא, או שאחד הערכים שנבחרו אינו תקין" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/projects/[id]">,
) {
  const { id } = await ctx.params;

  try {
    await prisma.project.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "הפרויקט לא נמצא" }, { status: 404 });
  }
}
