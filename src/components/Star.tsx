export default function Star({ size = 12 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 1 L13.2 10 L22 11 L13.2 12 L12 23 L10.8 12 L2 11 L10.8 10 Z" />
    </svg>
  );
}
