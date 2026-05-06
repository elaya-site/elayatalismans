export default function Arrow({ width = 24, height = 10 }: { width?: number; height?: number }) {
  return (
    <svg viewBox="0 0 24 10" width={width} height={height} aria-hidden="true">
      <path d="M0 5 L22 5 M17 0 L23 5 L17 10" stroke="currentColor" fill="none" strokeWidth="1" />
    </svg>
  );
}
