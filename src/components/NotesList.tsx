"use client";

import { useState } from "react";
import { NoteCard } from "./NoteCard";
import { t, type Locale } from "@/lib/i18n";
import type { LocalizedNote } from "@/lib/notes";
import styles from "./NotesList.module.css";

const PAGE_SIZE = 10;

export function NotesList({
  locale,
  initialItems,
  initialRemaining,
}: {
  locale: Locale;
  initialItems: LocalizedNote[];
  initialRemaining: number;
}) {
  const dict = t(locale);
  const [items, setItems] = useState(initialItems);
  const [remaining, setRemaining] = useState(initialRemaining);
  const [loading, setLoading] = useState(false);

  async function handleLoadMore() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/notes?locale=${locale}&offset=${items.length}&limit=${PAGE_SIZE}`
      );
      if (!res.ok) throw new Error("Failed to load notes");
      const data: { items: LocalizedNote[]; remaining: number } =
        await res.json();
      setItems((prev) => [...prev, ...data.items]);
      setRemaining(data.remaining);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.list}>
      {items.map((note, index) => (
        <NoteCard key={note.id} note={note} priorityImage={index === 0} />
      ))}
      {remaining > 0 ? (
        <button
          type="button"
          className={styles.loadMore}
          onClick={handleLoadMore}
          disabled={loading}
        >
          {dict.loadMore(remaining)}
        </button>
      ) : null}
    </div>
  );
}
