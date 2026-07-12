"use client";

import { useState, FormEvent } from "react";
import type { Lookup } from "@/lib/types";

type Props = {
  title: string;
  endpoint: string;
  initial: Lookup[];
};

export function LookupManager({ title, endpoint, initial }: Props) {
  const [items, setItems] = useState(initial);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editError, setEditError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function refresh() {
    const res = await fetch(endpoint);
    if (res.ok) setItems(await res.json());
  }

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setAdding(true);
    setAddError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setAddError(body.error ?? "שגיאה בהוספה");
        return;
      }
      setNewName("");
      await refresh();
    } finally {
      setAdding(false);
    }
  }

  async function handleRename(id: string) {
    setSaving(true);
    setEditError(null);
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editValue }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setEditError(body.error ?? "שגיאה בעדכון");
        return;
      }
      setEditingId(null);
      await refresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setDeleteError(body.error ?? "שגיאה במחיקה");
        return;
      }
      setPendingDeleteId(null);
      await refresh();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>

      <ul className="flex flex-col gap-2">
        {items.length === 0 && (
          <li className="text-sm text-neutral-500">אין ערכים עדיין</li>
        )}
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-2 rounded-md border border-neutral-100 px-3 py-2"
          >
            {editingId === item.id ? (
              <div className="flex flex-1 items-center gap-2">
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 rounded-md border border-neutral-300 px-2 py-1 text-sm focus:border-neutral-500 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => handleRename(item.id)}
                  disabled={saving}
                  className="text-sm font-medium text-neutral-900 hover:underline disabled:opacity-50"
                >
                  שמירה
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditError(null);
                  }}
                  className="text-sm text-neutral-500 hover:underline"
                >
                  ביטול
                </button>
              </div>
            ) : (
              <>
                <span className="text-sm">{item.name}</span>
                {pendingDeleteId === item.id ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-500">למחוק?</span>
                    <button
                      onClick={() => handleDelete(item.id)}
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
                  <div className="flex gap-3 text-sm">
                    <button
                      onClick={() => {
                        setEditingId(item.id);
                        setEditValue(item.name);
                        setEditError(null);
                      }}
                      className="font-medium text-neutral-700 hover:underline"
                    >
                      עריכה
                    </button>
                    <button
                      onClick={() => {
                        setPendingDeleteId(item.id);
                        setDeleteError(null);
                      }}
                      className="font-medium text-red-600 hover:underline"
                    >
                      מחיקה
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>

      {editError && <p className="text-sm text-red-600">{editError}</p>}
      {deleteError && <p className="text-sm text-red-600">{deleteError}</p>}

      <form onSubmit={handleAdd} className="flex items-center gap-2 pt-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="ערך חדש"
          required
          className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={adding}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          הוספה
        </button>
      </form>
      {addError && <p className="text-sm text-red-600">{addError}</p>}
    </section>
  );
}
