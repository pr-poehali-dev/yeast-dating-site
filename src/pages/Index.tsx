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
            <div className="flex justify-center items-center min-h-[600px]">
              {currentMicrobe && (
                <MicrobeCard 
                  microbe={currentMicrobe}
                  showSwipeAnimation={showSwipeAnimation}
                  onSwipe={handleSwipe}
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
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
