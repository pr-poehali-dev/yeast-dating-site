import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Microbe } from './types';

interface SwipeHistoryItem {
  microbe: Microbe;
  direction: 'left' | 'right';
  isSuperMatch: boolean;
  timestamp: number;
}

interface HistoryTabProps {
  history: SwipeHistoryItem[];
  onUndo: (index: number) => void;
}

export default function HistoryTab({ history, onUndo }: HistoryTabProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="History" className="mx-auto mb-4 text-muted-foreground" size={64} />
        <p className="text-muted-foreground text-lg">История свайпов пуста</p>
        <p className="text-sm text-muted-foreground mt-2">
          Начни свайпать микроорганизмы, чтобы увидеть историю
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-6 text-center glow">
        История свайпов 📜
      </h2>
      <div className="space-y-3">
        {[...history].reverse().map((item, index) => {
          const originalIndex = history.length - 1 - index;
          return (
            <Card
              key={`${item.microbe.id}-${item.timestamp}`}
              className={`p-4 backdrop-blur transition-all hover:scale-[1.02] ${
                item.isSuperMatch
                  ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
                  : item.direction === 'right'
                  ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30'
                  : 'bg-destructive/20 border-destructive/30'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-4xl">{item.microbe.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.microbe.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.microbe.scientificName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {item.isSuperMatch && (
                        <span className="text-xs bg-yellow-500/30 text-yellow-200 px-2 py-0.5 rounded">
                          💫 Супермэтч
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.timestamp).toLocaleTimeString('ru-RU', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    {item.direction === 'right' ? (
                      <Icon name="Heart" className="text-primary" size={32} />
                    ) : (
                      <Icon name="X" className="text-destructive" size={32} />
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => onUndo(originalIndex)}
                  variant="outline"
                  size="sm"
                  className="hover:bg-primary/20"
                >
                  <Icon name="Undo2" size={18} className="mr-1" />
                  Отменить
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
