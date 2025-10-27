import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Microbe } from './types';

interface MicrobeCardProps {
  microbe: Microbe;
  showSwipeAnimation: 'left' | 'right' | null;
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function MicrobeCard({ microbe, showSwipeAnimation, onSwipe }: MicrobeCardProps) {
  return (
    <Card 
      className={`w-full max-w-md bg-card/80 backdrop-blur border-2 border-primary/30 overflow-hidden relative ${
        showSwipeAnimation === 'right' ? 'animate-slide-in' : 
        showSwipeAnimation === 'left' ? 'animate-slide-out' : ''
      }`}
    >
      <div className={`absolute top-0 left-0 right-0 h-2 ${microbe.gradient}`} />
      
      <div className="p-8">
        <div className="text-center mb-6">
          <div className={`text-8xl mb-4 ${microbe.animation}`}>
            {microbe.emoji}
          </div>
          <h2 className="text-3xl font-bold mb-2">{microbe.name}</h2>
          <p className="text-muted-foreground italic">{microbe.scientificName}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" className="text-primary" size={20} />
            <span className="text-sm"><strong>Возраст:</strong> {microbe.age}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Briefcase" className="text-primary" size={20} />
            <span className="text-sm"><strong>Род занятий:</strong> {microbe.occupation}</span>
          </div>
        </div>

        <div className="space-y-3 mb-6 bg-muted/20 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Icon name="Target" className="text-secondary mt-1" size={18} />
            <div>
              <strong className="text-secondary">Ищу:</strong>
              <p className="text-sm">{microbe.about}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Heart" className="text-accent mt-1" size={18} />
            <div>
              <strong className="text-accent">Мои хобби:</strong>
              <p className="text-sm">{microbe.hobby}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="X" className="text-destructive mt-1" size={18} />
            <div>
              <strong className="text-destructive">Не выношу:</strong>
              <p className="text-sm">{microbe.hates}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <Badge variant="outline" className="w-full justify-start">
            <Icon name="Flask" className="mr-2" size={14} />
            Продукты: {microbe.products}
          </Badge>
          <Badge variant="outline" className="w-full justify-start">
            <Icon name="Thermometer" className="mr-2" size={14} />
            Температура: {microbe.temperature}
          </Badge>
          <Badge variant="outline" className="w-full justify-start">
            <Icon name="Zap" className="mr-2" size={14} />
            Энергия: {microbe.energy}
          </Badge>
        </div>

        <div className="text-center text-lg font-semibold mb-6 text-primary">
          {microbe.status}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => onSwipe('left')}
            variant="outline"
            className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
            size="lg"
          >
            <Icon name="X" className="mr-2" size={20} />
            Не совместимы
          </Button>
          <Button
            onClick={() => onSwipe('right')}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            size="lg"
          >
            <Icon name="Heart" className="mr-2" size={20} />
            Подходит
          </Button>
        </div>
      </div>
    </Card>
  );
}
