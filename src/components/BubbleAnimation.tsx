import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export default function BubbleAnimation() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < 20; i++) {
      newBubbles.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 30 + 10,
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 2
      });
    }
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 rounded-full bg-primary/10 border border-primary/20 animate-bubble"
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animation: `rise ${bubble.duration}s linear ${bubble.delay}s infinite`,
            filter: 'blur(1px)'
          }}
        />
      ))}
      <style>{`
        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
