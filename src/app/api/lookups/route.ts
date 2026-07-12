import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [contentDomains, weaponSystems, analysts] = await Promise.all([
    prisma.contentDomain.findMany({ orderBy: { name: "asc" } }),
    prisma.weaponSystem.findMany({ orderBy: { name: "asc" } }),
    prisma.analyst.findMany({ orderBy: { name: "asc" } }),
  ]);

  return NextResponse.json({ contentDomains, weaponSystems, analysts });
}
