import { Card } from '@/components/ui/card';
import { FermentationType } from './types';

interface ComparisonTabProps {
  fermentationTypes: FermentationType[];
}

export default function ComparisonTab({ fermentationTypes }: ComparisonTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6 text-center glow">
        Типы брожения 🧪
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {fermentationTypes.map((fermentation, index) => (
          <Card
            key={index}
            className="p-6 bg-card/80 backdrop-blur border-2 border-primary/20 overflow-hidden relative"
          >
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${fermentation.gradient}`} />
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">{fermentation.type} брожение</h3>
              
              <div className="bg-muted/20 p-4 rounded-lg font-mono text-sm">
                {fermentation.equation}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Продукты:</p>
                  <p className="font-semibold">{fermentation.products}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Микроорганизмы:</p>
                  <p className="font-semibold">{fermentation.microbes}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Температура:</p>
                  <p className="font-semibold">{fermentation.temp}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Выход ATP:</p>
                  <p className="font-semibold">{fermentation.atp}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Применение:</p>
                <p className="text-secondary font-semibold">{fermentation.application}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
