import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export interface UserProfile {
  name: string;
  age: string;
  goal: string;
  interests: string;
  favoriteType: string;
}

interface ProfileFormProps {
  onComplete: (profile: UserProfile) => void;
}

export default function ProfileForm({ onComplete }: ProfileFormProps) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: '',
    goal: '',
    interests: '',
    favoriteType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(profile);
  };

  const isValid =
    profile.name.trim() &&
    profile.age.trim() &&
    profile.goal.trim() &&
    profile.interests.trim() &&
    profile.favoriteType.trim();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-card/90 backdrop-blur">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🦠</div>
          <h1 className="text-4xl font-bold mb-2 glow">Добро пожаловать в MicrobeMatch!</h1>
          <p className="text-muted-foreground">
            Заполни анкету, чтобы найти идеальные микроорганизмы для знакомства
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">
              <Icon name="User" size={18} className="inline mr-2" />
              Как тебя зовут?
            </Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Твое имя"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-base">
              <Icon name="Calendar" size={18} className="inline mr-2" />
              Сколько тебе лет?
            </Label>
            <Input
              id="age"
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: e.target.value })}
              placeholder="Возраст"
              className="bg-background/50"
              min="1"
              max="150"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal" className="text-base">
              <Icon name="Target" size={18} className="inline mr-2" />
              Цель знакомства с микроорганизмами
            </Label>
            <Input
              id="goal"
              value={profile.goal}
              onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
              placeholder="Например: изучение биологии, научная работа, любопытство"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests" className="text-base">
              <Icon name="Sparkles" size={18} className="inline mr-2" />
              Твои интересы
            </Label>
            <Input
              id="interests"
              value={profile.interests}
              onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
              placeholder="Например: наука, медицина, экология"
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="favoriteType" className="text-base">
              <Icon name="Heart" size={18} className="inline mr-2" />
              Любимый тип микроорганизмов
            </Label>
            <Input
              id="favoriteType"
              value={profile.favoriteType}
              onChange={(e) => setProfile({ ...profile, favoriteType: e.target.value })}
              placeholder="Например: бактерии, вирусы, грибы"
              className="bg-background/50"
            />
          </div>

          <Button
            type="submit"
            disabled={!isValid}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg py-6 glow"
          >
            <Icon name="ArrowRight" size={24} className="mr-2" />
            Начать знакомство с микромиром
          </Button>
        </form>
      </Card>
    </div>
  );
}
