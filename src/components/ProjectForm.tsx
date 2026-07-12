"use client";

import { useState, FormEvent } from "react";
import type { Lookups, ProjectWithRelations } from "@/lib/types";

export type ProjectFormValues = {
  name: string;
  contentDomainId: string;
  weaponSystemId: string;
  analystId: string;
};

type Props = {
  lookups: Lookups;
  initial?: ProjectWithRelations | null;
  submitting: boolean;
  error: string | null;
  onSubmit: (values: ProjectFormValues) => void;
  onCancel: () => void;
};

export function ProjectForm({
  lookups,
  initial,
  submitting,
  error,
  onSubmit,
  onCancel,
}: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [contentDomainId, setContentDomainId] = useState(
    initial?.contentDomainId ?? lookups.contentDomains[0]?.id ?? "",
  );
  const [weaponSystemId, setWeaponSystemId] = useState(
    initial?.weaponSystemId ?? lookups.weaponSystems[0]?.id ?? "",
  );
  const [analystId, setAnalystId] = useState(
    initial?.analystId ?? lookups.analysts[0]?.id ?? "",
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({ name, contentDomainId, weaponSystemId, analystId });
  }

  const missingLookups =
    lookups.contentDomains.length === 0 ||
    lookups.weaponSystems.length === 0 ||
    lookups.analysts.length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-semibold">
        {initial ? "עריכת פרויקט" : "פרויקט חדש"}
      </h2>

      {missingLookups && (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
          יש להוסיף לפחות ערך אחד לכל אחת מהרשימות (עולם תוכן, אמל&quot;ח
          מוביל, אנליסט) בעמוד הניהול לפני יצירת פרויקט.
        </p>
      )}

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-neutral-700">שם פרויקט</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
          placeholder="לדוגמה: מבצע כוכב"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-neutral-700">עולם תוכן</span>
        <select
          value={contentDomainId}
          onChange={(e) => setContentDomainId(e.target.value)}
          required
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        >
          {lookups.contentDomains.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-neutral-700">אמל&quot;ח מוביל</span>
        <select
          value={weaponSystemId}
          onChange={(e) => setWeaponSystemId(e.target.value)}
          required
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        >
          {lookups.weaponSystems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-neutral-700">אנליסט</span>
        <select
          value={analystId}
          onChange={(e) => setAnalystId(e.target.value)}
          required
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        >
          {lookups.analysts.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting || missingLookups}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "שומר..." : initial ? "שמירה" : "יצירה"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          ביטול
        </button>
      </div>
    </form>
  );
}
