"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { track } from "@vercel/analytics";
import styles from "./coming-soon.module.css";

export function HoldToRemember({ children, label, confirmation }: { children: ReactNode; label: string; confirmation: string }) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [holding, setHolding] = useState(false);
  const [kept, setKept] = useState(false);
  const cancel = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; setHolding(false); };
  const complete = () => { timer.current = null; setHolding(false); setKept(true); track("gallery_interaction", { interaction_type: "memory_kept", gallery: "coming_soon_hero" }); window.setTimeout(() => setKept(false), 1500); };
  const start = () => { if (kept || timer.current) return; setHolding(true); timer.current = setTimeout(complete, 650); };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => { event.currentTarget.setPointerCapture(event.pointerId); start(); };
  return <button className={`${styles.holdMemory} ${holding ? styles.holding : ""} ${kept ? styles.kept : ""}`} type="button" aria-label={label} onPointerDown={onPointerDown} onPointerUp={cancel} onPointerCancel={cancel} onKeyDown={event => { if ((event.key === " " || event.key === "Enter") && !event.repeat) { event.preventDefault(); start(); } }} onKeyUp={event => { if (event.key === " " || event.key === "Enter") cancel(); }}>
    {children}<span className={styles.holdInstruction} aria-hidden="true">{label}</span><span className={styles.keptConfirmation} role="status" aria-live="polite">{kept ? confirmation : ""}</span>
  </button>;
}
