"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import styles from "./coming-soon.module.css";

function formatTime(value: number) { const seconds = Math.max(0, Math.floor(value)); return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`; }

export function FragmentAudio({ src, duration, labels, fragment, gain = 1 }: { src: string; duration: number; labels: { play: string; pause: string; timeline: string }; fragment: string; gain?: number }) {
  const audio = useRef<HTMLAudioElement>(null); const tracked = useRef(false); const context = useRef<AudioContext | null>(null); const [playing, setPlaying] = useState(false); const [position, setPosition] = useState(0);
  useEffect(() => { const player = audio.current; return () => { player?.pause(); void context.current?.close(); }; }, []);
  const prepareAudio = async () => {
    if (!audio.current || gain <= 1) return;
    if (!context.current) {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audio.current);
      const boost = audioContext.createGain();
      const limiter = audioContext.createDynamicsCompressor();
      boost.gain.value = gain;
      limiter.threshold.value = -8;
      limiter.knee.value = 12;
      limiter.ratio.value = 8;
      limiter.attack.value = 0.003;
      limiter.release.value = 0.2;
      source.connect(boost).connect(limiter).connect(audioContext.destination);
      context.current = audioContext;
    }
    if (context.current.state === "suspended") await context.current.resume();
  };
  const toggle = async () => { if (!audio.current) return; if (audio.current.paused) { await prepareAudio(); await audio.current.play(); } else audio.current.pause(); };
  return <div className={`${styles.audio} ${playing ? styles.playing : ""}`}>
    <audio ref={audio} src={src} preload="metadata" onPlay={() => { setPlaying(true); if (!tracked.current) { tracked.current = true; track("gallery_interaction", { interaction_type: "audio_start", gallery: "coming_soon_fragments", fragment }); } }} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setPosition(0); }} onTimeUpdate={event => setPosition(event.currentTarget.currentTime)} />
    <button type="button" onClick={toggle} aria-label={playing ? labels.pause : labels.play}>{playing ? "Ⅱ" : "▶"}</button>
    <div className={styles.wave} aria-hidden="true">{Array.from({ length: 22 }, (_, index) => <i key={index} />)}</div>
    <input aria-label={labels.timeline} type="range" min="0" max={duration} step="0.1" value={Math.min(position, duration)} onChange={event => { const value = Number(event.target.value); if (audio.current) { audio.current.currentTime = value; setPosition(value); } }} />
    <time>{formatTime(position)} / {formatTime(duration)}</time>
  </div>;
}
