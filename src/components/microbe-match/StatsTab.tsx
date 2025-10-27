import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface StatsTabProps {
  swipedRight: number[];
  swipedLeft: number[];
  currentIndex: number;
  totalMicrobes: number;
  superMatches: number[];
}

export default function StatsTab({ swipedRight, swipedLeft, currentIndex, totalMicrobes, superMatches }: StatsTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-center glow">
        Твоя статистика 📊
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur border-primary/30">
          <div className="text-center">
            <Icon name="Heart" className="mx-auto mb-4 text-primary" size={48} />
            <div className="text-4xl font-bold mb-2">{swipedRight.length}</div>
            <p className="text-muted-foreground">Свайпов вправо</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-destructive/20 to-red-500/20 backdrop-blur border-destructive/30">
          <div className="text-center">
            <Icon name="X" className="mx-auto mb-4 text-destructive" size={48} />
            <div className="text-4xl font-bold mb-2">{swipedLeft.length}</div>
            <p className="text-muted-foreground">Свайпов влево</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/20 to-pink-500/20 backdrop-blur border-accent/30">
          <div className="text-center">
            <Icon name="Sparkles" className="mx-auto mb-4 text-accent" size={48} />
            <div className="text-4xl font-bold mb-2">
              {Math.round((swipedRight.length / (swipedRight.length + swipedLeft.length) * 100) || 0)}%
            </div>
            <p className="text-muted-foreground">Процент совместимости</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur border-yellow-500/30">
          <div className="text-center">
            <div className="text-4xl mb-4">💫</div>
            <div className="text-4xl font-bold mb-2">{superMatches.length}</div>
            <p className="text-muted-foreground">Супермэтчей</p>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-card/80 backdrop-blur">
        <h3 className="text-xl font-bold mb-4 text-primary">Уровень эксперта</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Прогресс изучения</span>
            <span className="font-bold">{Math.min(currentIndex + 1, totalMicrobes)}/{totalMicrobes}</span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500 glow"
              style={{ width: `${((currentIndex + 1) / totalMicrobes) * 100}%` }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}