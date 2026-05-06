"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { CollectionId } from "@/data/collections";
import { audioTracks } from "@/lib/audioTracks";

/* ─── Config ─── */
const TARGET_VOL = 0.25;   // volume par défaut (0–1)
const FADE_MS    = 2000;   // durée du crossfade en ms

/* ─── Types ─── */
export type AudioCtxValue = {
  isEnabled:    boolean;
  currentTrack: CollectionId | null;
  instrument:   string | null;
  toggle:       () => void;
  playTrack:    (id: CollectionId) => void;
};

/* ─── Context ─── */
const Ctx = createContext<AudioCtxValue>({
  isEnabled: false, currentTrack: null, instrument: null,
  toggle: () => {}, playTrack: () => {},
});

export const useAudio = () => useContext(Ctx);

/* ─── Provider ─── */
export function AudioProvider({ children }: { children: ReactNode }) {
  const [isEnabled,    setIsEnabled]    = useState(false);
  const [currentTrack, setCurrentTrack] = useState<CollectionId | null>(null);

  // Deux éléments audio pour le crossfade
  const elA    = useRef<HTMLAudioElement | null>(null);
  const elB    = useRef<HTMLAudioElement | null>(null);
  const active = useRef<0 | 1>(0); // 0 = A joue, 1 = B joue
  const raf    = useRef(0);

  /* Init côté client uniquement */
  useEffect(() => {
    elA.current = new Audio();
    elB.current = new Audio();
    [elA.current, elB.current].forEach((el) => {
      el.loop   = true;
      el.volume = 0;
    });
    return () => {
      cancelAnimationFrame(raf.current);
      elA.current?.pause();
      elB.current?.pause();
    };
  }, []);

  /* Fade animé via rAF — opère sur transform + opacity (GPU) */
  const animateFade = useCallback(
    (el: HTMLAudioElement, from: number, to: number, onDone?: () => void) => {
      const start = performance.now();
      const tick  = (now: number) => {
        const t    = Math.min((now - start) / FADE_MS, 1);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        el.volume  = Math.max(0, Math.min(1, from + (to - from) * ease));
        if (t < 1) {
          raf.current = requestAnimationFrame(tick);
        } else {
          if (to === 0) { el.pause(); el.src = ""; }
          onDone?.();
        }
      };
      raf.current = requestAnimationFrame(tick);
    },
    [],
  );

  /* Démarrage d'une piste avec crossfade */
  const playTrack = useCallback(
    (id: CollectionId) => {
      if (!elA.current || !elB.current) return;
      cancelAnimationFrame(raf.current);

      const outgoing = active.current === 0 ? elA.current : elB.current;
      const incoming = active.current === 0 ? elB.current : elA.current;

      incoming.src    = audioTracks[id].src;
      incoming.volume = 0;
      // Silencieux si le fichier est absent — pas d'erreur console
      incoming.play().catch(() => {});

      animateFade(incoming, 0, TARGET_VOL);
      if (outgoing.src && !outgoing.paused) {
        animateFade(outgoing, outgoing.volume, 0);
      }

      active.current = active.current === 0 ? 1 : 0;
      setCurrentTrack(id);
    },
    [animateFade],
  );

  /* Arrêt total */
  const stopAll = useCallback(() => {
    cancelAnimationFrame(raf.current);
    [elA.current, elB.current].forEach((el) => {
      if (!el || el.paused) return;
      animateFade(el, el.volume, 0);
    });
    setCurrentTrack(null);
  }, [animateFade]);

  /* Toggle ON/OFF */
  const toggle = useCallback(() => setIsEnabled((p) => !p), []);

  /* Réaction au toggle */
  useEffect(() => {
    if (!isEnabled) stopAll();
    // Si isEnabled passe à true, le hook useCollectionAudio dans la page
    // détecte le changement et appelle playTrack automatiquement.
  }, [isEnabled, stopAll]);

  const instrument = currentTrack ? audioTracks[currentTrack].instrument : null;

  return (
    <Ctx.Provider value={{ isEnabled, currentTrack, instrument, toggle, playTrack }}>
      {children}
    </Ctx.Provider>
  );
}
