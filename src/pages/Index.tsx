import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import BubbleAnimation from '@/components/BubbleAnimation';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import MicrobeCard from '@/components/microbe-match/MicrobeCard';
import MatchesTab from '@/components/microbe-match/MatchesTab';
import ComparisonTab from '@/components/microbe-match/ComparisonTab';
import StatsTab from '@/components/microbe-match/StatsTab';
import { microbes, matches, fermentationTypes } from '@/components/microbe-match/data';

export default function Index() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedRight, setSwipedRight] = useState<number[]>([]);
  const [swipedLeft, setSwipedLeft] = useState<number[]>([]);
  const [showSwipeAnimation, setShowSwipeAnimation] = useState<'left' | 'right' | null>(null);
  const [superMatches, setSuperMatches] = useState<number[]>([]);
  const { playSwipeSound, playBubbleSound } = useSoundEffects();

  const currentMicrobe = microbes[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        playBubbleSound();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [playBubbleSound]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handleSwipe('left');
      } else if (event.key === 'ArrowRight') {
        handleSwipe('right');
      } else if (event.key === 'ArrowUp') {
        handleSuperMatch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, swipedRight, swipedLeft, superMatches]);

  const handleSwipe = (direction: 'left' | 'right') => {
    playSwipeSound(direction);
    setShowSwipeAnimation(direction);
    
    setTimeout(() => {
      if (direction === 'right') {
        setSwipedRight([...swipedRight, currentMicrobe.id]);
      } else {
        setSwipedLeft([...swipedLeft, currentMicrobe.id]);
      }
      
      if (currentIndex < microbes.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setShowSwipeAnimation(null);
    }, 300);
  };

  const handleSuperMatch = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1047, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.type = 'triangle';
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);

    setShowSwipeAnimation('right');
    
    setTimeout(() => {
      setSuperMatches([...superMatches, currentMicrobe.id]);
      setSwipedRight([...swipedRight, currentMicrobe.id]);
      
      if (currentIndex < microbes.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setShowSwipeAnimation(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#221F26] to-[#1A1F2C] text-white relative">
      <BubbleAnimation />
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        <header className="text-center mb-12 animate-float">
          <h1 className="text-6xl font-bold mb-4 glow-strong text-primary">
            MICROBE MATCH
          </h1>
          <p className="text-xl text-muted-foreground">
            Найди свою идеальную химическую пару! 🧪
          </p>
        </header>

        <Tabs defaultValue="swipe" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card/50 backdrop-blur">
            <TabsTrigger value="swipe" className="data-[state=active]:bg-primary">
              <Icon name="Heart" className="mr-2" size={16} />
              Свайпы
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-primary">
              <Icon name="Sparkles" className="mr-2" size={16} />
              Мэтчи
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-primary">
              <Icon name="BarChart3" className="mr-2" size={16} />
              Сравнение
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-primary">
              <Icon name="TrendingUp" className="mr-2" size={16} />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="swipe" className="space-y-6">
            <div className="text-center mb-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                <kbd className="px-2 py-1 bg-muted/30 rounded text-xs">←</kbd> Не совместимы • 
                <kbd className="px-2 py-1 bg-muted/30 rounded text-xs">→</kbd> Подходит • 
                <kbd className="px-2 py-1 bg-muted/30 rounded text-xs">↑</kbd> Супермэтч 💫
              </p>
            </div>
            <div className="flex justify-center items-center min-h-[600px]">
              {currentMicrobe && (
                <MicrobeCard 
                  microbe={currentMicrobe}
                  showSwipeAnimation={showSwipeAnimation}
                  onSwipe={handleSwipe}
                  onSuperMatch={handleSuperMatch}
                  isSuperMatch={superMatches.includes(currentMicrobe.id)}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="matches">
            <MatchesTab matches={matches} />
          </TabsContent>

          <TabsContent value="comparison">
            <ComparisonTab fermentationTypes={fermentationTypes} />
          </TabsContent>

          <TabsContent value="stats">
            <StatsTab 
              swipedRight={swipedRight}
              swipedLeft={swipedLeft}
              currentIndex={currentIndex}
              totalMicrobes={microbes.length}
              superMatches={superMatches}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}