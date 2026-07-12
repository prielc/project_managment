"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProjectForm, ProjectFormValues } from "@/components/ProjectForm";
import type { Lookups, ProjectWithRelations } from "@/lib/types";

type Props = {
  initialProjects: ProjectWithRelations[];
  lookups: Lookups;
};

type Mode = { kind: "closed" } | { kind: "create" } | { kind: "edit"; project: ProjectWithRelations };

export function ProjectsClient({ initialProjects, lookups }: Props) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [mode, setMode] = useState<Mode>({ kind: "closed" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function refresh() {
    const res = await fetch("/api/projects");
    if (res.ok) {
      setProjects(await res.json());
    }
    router.refresh();
  }

  async function handleSubmit(values: ProjectFormValues) {
    setSubmitting(true);
    setError(null);

    const isEdit = mode.kind === "edit";
    const url = isEdit ? `/api/projects/${mode.project.id}` : "/api/projects";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "שגיאה בשמירת הפרויקט");
        return;
      }

      setMode({ kind: "closed" });
      await refresh();
    } catch {
      setError("שגיאת רשת — נסה שוב");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPendingDeleteId(null);
        await refresh();
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">פרויקטים</h1>
          <p className="text-sm text-neutral-500">
            ניהול הפרויקטים במערכת
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/settings"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            ניהול רשימות
          </Link>
          {mode.kind === "closed" && (
            <button
              onClick={() => setMode({ kind: "create" })}
              className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
            >
              + פרויקט חדש
            </button>
          )}
        </div>
      </header>

      {mode.kind !== "closed" && (
        <ProjectForm
          lookups={lookups}
          initial={mode.kind === "edit" ? mode.project : null}
          submitting={submitting}
          error={error}
          onSubmit={handleSubmit}
          onCancel={() => {
            setMode({ kind: "closed" });
            setError(null);
          }}
        />
      )}

      <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
        {projects.length === 0 ? (
          <p className="p-8 text-center text-sm text-neutral-500">
            אין עדיין פרויקטים. לחצו על &quot;פרויקט חדש&quot; כדי להתחיל.
          </p>
        ) : (
          <table className="w-full text-right text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                <th className="px-4 py-3 font-medium">שם פרויקט</th>
                <th className="px-4 py-3 font-medium">עולם תוכן</th>
                <th className="px-4 py-3 font-medium">אמל&quot;ח מוביל</th>
                <th className="px-4 py-3 font-medium">אנליסט</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t border-neutral-100">
                  <td className="px-4 py-3 font-medium">{project.name}</td>
                  <td className="px-4 py-3 text-neutral-600">
                    {project.contentDomain.name}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {project.weaponSystem.name}
                  </td>
                  <td className="px-4 py-3 text-neutral-600">
                    {project.analyst.name}
                  </td>
                  <td className="px-4 py-3">
                    {pendingDeleteId === project.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-neutral-500">למחוק?</span>
                        <button
                          onClick={() => handleDelete(project.id)}
                          disabled={deleting}
                          className="font-medium text-red-600 hover:underline disabled:opacity-50"
                        >
                          אישור
                        </button>
                        <button
                          onClick={() => setPendingDeleteId(null)}
                          className="text-neutral-500 hover:underline"
                        >
                          ביטול
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setMode({ kind: "edit", project })}
                          className="font-medium text-neutral-700 hover:underline"
                        >
                          עריכה
                        </button>
                        <button
                          onClick={() => setPendingDeleteId(project.id)}
                          className="font-medium text-red-600 hover:underline"
                        >
                          מחיקה
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
