import { prisma } from "@/lib/prisma";
import { ProjectsClient } from "@/components/ProjectsClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [projects, contentDomains, weaponSystems, analysts] =
    await Promise.all([
      prisma.project.findMany({
        include: { contentDomain: true, weaponSystem: true, analyst: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.contentDomain.findMany({ orderBy: { name: "asc" } }),
      prisma.weaponSystem.findMany({ orderBy: { name: "asc" } }),
      prisma.analyst.findMany({ orderBy: { name: "asc" } }),
    ]);

  return (
    <ProjectsClient
      initialProjects={projects}
      lookups={{ contentDomains, weaponSystems, analysts }}
    />
  );
}
