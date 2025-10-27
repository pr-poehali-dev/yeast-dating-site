import { Card } from '@/components/ui/card';
import { Match } from './types';

interface MatchesTabProps {
  matches: Match[];
}

export default function MatchesTab({ matches }: MatchesTabProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-6 text-center glow">
        Химические пары 💘
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map((match, index) => (
          <Card
            key={index}
            className={`p-6 ${
              match.success 
                ? 'bg-green-950/30 border-green-500/30' 
                : 'bg-red-950/30 border-red-500/30'
            } backdrop-blur`}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">
                {match.success ? '✅' : '❌'}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{match.pair}</h3>
                <p className="text-muted-foreground">{match.result}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
