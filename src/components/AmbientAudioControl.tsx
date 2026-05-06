"use client";

import { useAudio } from "@/components/AudioProvider";

/* Icônes SVG inline — pas de dépendance externe */
function SpeakerOn() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function SpeakerOff() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export default function AmbientAudioControl() {
  const { isEnabled, instrument, toggle } = useAudio();

  return (
    <button
      className={`audio-ctrl${isEnabled ? " audio-ctrl--on" : ""}`}
      onClick={toggle}
      title={isEnabled ? "Couper l'ambiance sonore" : "Activer l'ambiance sonore"}
      aria-pressed={isEnabled}
    >
      <span className="audio-ctrl__icon">
        {isEnabled ? <SpeakerOn /> : <SpeakerOff />}
      </span>
      <span className="audio-ctrl__label">
        {isEnabled && instrument ? instrument : "Ambiance"}
      </span>
    </button>
  );
}
