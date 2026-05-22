import { useState, useEffect } from 'react';

const BOOT_LINES = [
  { text: 'BIOS v2.4.1  © 2024 KBOS Foundation', delay: 0, color: '#b3b1ad' },
  { text: 'CPU: Intel Core i9-14900K @ 5.8GHz  [OK]', delay: 120, color: '#7ee787' },
  { text: 'RAM: 64GB DDR5-6000  [OK]', delay: 240, color: '#7ee787' },
  { text: 'SSD: 2TB NVMe PCIe 5.0  [OK]', delay: 360, color: '#7ee787' },
  { text: 'GPU: NVIDIA RTX 4090 24GB  [OK]', delay: 480, color: '#7ee787' },
  { text: '', delay: 600, color: '' },
  { text: 'Loading kernel modules...', delay: 700, color: '#39c5cf' },
  { text: '[    0.000000] Linux version 6.5.0-portfolio (KalyanBabu@dev)', delay: 820, color: '#b3b1ad' },
  { text: '[    0.124831] Initializing portfolio filesystem', delay: 940, color: '#b3b1ad' },
  { text: '[    0.238452] Mounting /dev/projects  [OK]', delay: 1060, color: '#7ee787' },
  { text: '[    0.312109] Mounting /dev/skills    [OK]', delay: 1180, color: '#7ee787' },
  { text: '[    0.398774] Mounting /dev/experience [OK]', delay: 1300, color: '#7ee787' },
  { text: '', delay: 1420, color: '' },
  { text: 'Starting portfolio services...', delay: 1520, color: '#39c5cf' },
  { text: '  → personality.service     started', delay: 1640, color: '#7ee787' },
  { text: '  → creativity.service      started', delay: 1760, color: '#7ee787' },
  { text: '  → coffee-daemon.service   started', delay: 1880, color: '#7ee787' },
  { text: '  → procrastination.service failed  [WARN]', delay: 2000, color: '#f9c74f' },
  { text: '', delay: 2100, color: '' },
  { text: 'KBOS 1.0 — portfolio.local', delay: 2200, color: '#7ee787' },
  { text: 'Type a command below or click a nav item to explore.', delay: 2340, color: '#b3b1ad' },
];

interface Props {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay);
      timers.push(t);
    });

    const finalTimer = setTimeout(() => {
      setDone(true);
    }, 2700);
    timers.push(finalTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-start px-8 md:px-16 lg:px-32 py-12 cursor-pointer"
      onClick={() => done && onComplete()}
    >
      <div className="w-full max-w-3xl space-y-0.5">
        {BOOT_LINES.map((line, i) => (
          visibleLines.includes(i) && (
            <div
              key={i}
              className="boot-line text-sm leading-relaxed"
              style={{ color: line.color || 'transparent', animationDelay: '0ms' }}
            >
              {line.text || '\u00A0'}
            </div>
          )
        ))}

        {done && (
          <div className="mt-8 fade-in">
            <div className="text-sm" style={{ color: '#39c5cf' }}>
              System ready. Press any key or click to continue...
            </div>
            <button
              onClick={onComplete}
              className="mt-4 px-6 py-2 border border-[#7ee787] text-[#7ee787] text-sm hover:bg-[#7ee787] hover:text-[#0a0e14] transition-all duration-200"
              style={{ textShadow: '0 0 8px rgba(126,231,135,0.5)' }}
            >
              ./launch-portfolio.sh
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
