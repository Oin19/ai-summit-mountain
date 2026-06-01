import { useMemo } from "react";

export function Snowfall({ count = 40 }: { count?: number }) {
  const flakes = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 10,
        size: 1 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.6,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-snow"
          style={{
            left: `${f.left}%`,
            top: "-10px",
            width: `${f.size}px`,
            height: `${f.size}px`,
            opacity: f.opacity,
            animation: `snowfall ${f.duration}s linear ${f.delay}s infinite`,
            boxShadow: "0 0 4px oklch(0.98 0.01 240 / 0.8)",
          }}
        />
      ))}
    </div>
  );
}
