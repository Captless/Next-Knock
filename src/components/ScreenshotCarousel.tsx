import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';

type FrameKind = 'phone' | 'desktop';

type Slide = {
  frame: FrameKind;
  node: ReactNode;
};

const scrollHidden = '[&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]';

function Frame({ frame, children }: { frame: FrameKind; children: ReactNode }) {
  const shell = 'border border-line bg-surface shadow-[0_20px_45px_-12px_rgba(10,10,10,0.22)]';
  if (frame === 'phone') {
    return (
      <div className={`mx-auto flex h-[440px] w-[264px] flex-col overflow-hidden rounded-[2rem] ${shell}`}>
        <div className="flex h-5 items-center justify-center">
          <div className="h-1 w-12 rounded-full bg-line" />
        </div>
        <div className={`flex-1 overflow-y-auto px-2 pb-3 ${scrollHidden}`}>{children}</div>
      </div>
    );
  }
  return (
    <div className={`mx-auto flex h-[420px] w-full max-w-[520px] flex-col overflow-hidden rounded-xl ${shell}`}>
      <div className={`flex-1 overflow-y-auto p-3 ${scrollHidden}`}>{children}</div>
    </div>
  );
}

export function ScreenshotCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reduce || paused) return;
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [reduce, paused, slides.length]);

  if (reduce) {
    const slide = slides[index] ?? slides[0]!;
    return (
      <div className="relative">
        <Frame frame={slide.frame}>{slide.node}</Frame>
        <Dots slides={slides} index={index} setIndex={setIndex} />
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative flex h-[540px] items-center justify-center overflow-hidden [perspective:1200px]">
        {slides.map((s, i) => {
          const offset = i - index;
          const abs = Math.abs(offset);
          const style: CSSProperties = {
            transform: `translateX(${offset * 56}%) scale(${1 - abs * 0.16}) translateZ(${-abs * 90}px)`,
            opacity: abs > 1 ? 0 : 1 - abs * 0.35,
            zIndex: 10 - abs,
            filter: abs > 0 ? 'blur(0.4px)' : 'none',
          };
          return (
            <div
              key={i}
              role="button"
              tabIndex={0}
              aria-label={`Show screen ${i + 1}`}
              onClick={() => setIndex(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setIndex(i);
              }}
              className="absolute cursor-pointer transition-all duration-700 ease-out"
              style={style}
              aria-hidden={abs > 0}
            >
              <Frame frame={s.frame}>{s.node}</Frame>
            </div>
          );
        })}
      </div>
      <Dots slides={slides} index={index} setIndex={setIndex} />
    </div>
  );
}

function Dots({
  slides,
  index,
  setIndex,
}: {
  slides: Slide[];
  index: number;
  setIndex: (i: number) => void;
}) {
  return (
    <div className="mt-5 flex justify-center gap-2">
      {slides.map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setIndex(i)}
          aria-label={`Show screen ${i + 1}`}
          className={`h-2 w-2 rounded-full transition-colors ${
            i === index ? 'bg-ink' : 'bg-line hover:bg-ink-subtle'
          }`}
        />
      ))}
    </div>
  );
}
