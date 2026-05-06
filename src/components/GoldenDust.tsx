/**
 * Santa Fe signature — floating golden dust particles.
 * Pure CSS animations; positions/durations are deterministic so SSR matches client.
 */
export default function GoldenDust({ count = 22 }: { count?: number }) {
  const dots = Array.from({ length: count }, (_, i) => {
    const left = Math.round((i * 137.5) % 100);
    const top = Math.round((i * 53.7) % 100);
    const size = 1 + (i % 3);
    const dur = 26 + (i % 9) * 3;
    const delay = -((i * 1.3) % dur);
    return (
      <span
        key={i}
        className="dust"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${dur}s`,
          animationDelay: `${delay}s`,
          opacity: 0.18 + (i % 5) * 0.06,
        }}
      />
    );
  });
  return <div className="dust-layer" aria-hidden="true">{dots}</div>;
}
