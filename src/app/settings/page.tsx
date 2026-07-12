import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LookupManager } from "@/components/LookupManager";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [contentDomains, weaponSystems, analysts] = await Promise.all([
    prisma.contentDomain.findMany({ orderBy: { name: "asc" } }),
    prisma.weaponSystem.findMany({ orderBy: { name: "asc" } }),
    prisma.analyst.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
      <header>
        <Link href="/" className="text-sm text-neutral-500 hover:underline">
          → חזרה לפרויקטים
        </Link>
        <h1 className="mt-1 text-2xl font-bold">ניהול רשימות</h1>
        <p className="text-sm text-neutral-500">
          עריכת הערכים הזמינים לבחירה בטופס הפרויקט
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <LookupManager
          title="עולם תוכן"
          endpoint="/api/content-domains"
          initial={contentDomains}
        />
        <LookupManager
          title='אמל"ח מוביל'
          endpoint="/api/weapon-systems"
          initial={weaponSystems}
        />
        <LookupManager
          title="אנליסט"
          endpoint="/api/analysts"
          initial={analysts}
        />
      </div>
    </div>
  );
}
