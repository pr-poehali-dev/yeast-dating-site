import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  rotation: number;
  delay: number;
  color: string;
}

export default function Confetti({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger === 0) return;

    const colors = ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#00CED1', '#9370DB'];
    const newPieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setPieces(newPieces);

    const timer = setTimeout(() => setPieces([]), 3000);
    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
