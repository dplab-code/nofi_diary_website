"use client";

import { useState } from "react";
import styles from "./NoFiElsewhere.module.css";

export function ElsewhereThought({ thoughts, label }: { thoughts: readonly string[]; label: string }) {
  const [index, setIndex] = useState(0);
  return <div className={styles.thought}>
    <div className={styles.thoughtText}>
      {/* Reserve the tallest translation without announcing the measuring copies. */}
      {thoughts.map(thought => <p className={styles.measure} aria-hidden="true" key={thought}>{thought}</p>)}
      <p aria-live="polite" aria-atomic="true">{thoughts[index]}</p>
    </div>
    <button type="button" onClick={() => setIndex(value => (value + 1) % thoughts.length)}>{label} <span aria-hidden="true">→</span></button>
  </div>;
}
