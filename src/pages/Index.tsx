import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BubbleAnimation from '@/components/BubbleAnimation';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface Microbe {
  id: number;
  name: string;
  scientificName: string;
  age: string;
  occupation: string;
  about: string;
  hobby: string;
  hates: string;
  products: string;
  temperature: string;
  energy: string;
  status: string;
  emoji: string;
  gradient: string;
  animation: string;
}

const microbes: Microbe[] = [
  {
    id: 1,
    name: 'Саша Ромные',
    scientificName: 'Saccharomyces',
    age: '15 млн лет',
    occupation: 'Алкогольный инженер',
    about: 'Глюкозу для анаэробных отношений',
    hobby: 'Превращать сахар в этанол, производить CO₂',
    hates: 'Кислород, антисептики, высокие температуры',
    products: 'Спирт, углекислый газ',
    temperature: '25-30°C',
    energy: '2 ATP с молекулы глюкозы',
    status: 'Готов к брожению! 🍷',
    emoji: '🍷',
    gradient: 'gradient-purple',
    animation: 'animate-pulse-glow'
  },
  {
    id: 2,
    name: 'Лакта Acidophilus',
    scientificName: 'Lactobacillus',
    age: '2 млн лет',
    occupation: 'Молочный сомелье',
    about: 'Лактозу для кислых отношений',
    hobby: 'Сквашивать молоко, создавать йогурты',
    hates: 'Антибиотики, щелочную среду',
    products: 'Молочная кислота',
    temperature: '37-40°C',
    energy: '2 ATP с молекулы глюкозы',
    status: 'Ищу молоко для вечной дружбы! 🥛',
    emoji: '🥛',
    gradient: 'gradient-blue',
    animation: 'animate-float'
  },
  {
    id: 3,
    name: 'Пропион Пропионовые',
    scientificName: 'Propionibacterium',
    age: '1.5 млн лет',
    occupation: 'Сырный архитектор',
    about: 'Лактат для создания дырок',
    hobby: 'Создавать CO₂ для дырок в сыре',
    hates: 'Низкие температуры, конкуренцию',
    products: 'Пропионовая кислота, уксусная кислота, CO₂',
    temperature: '30-37°C',
    energy: 'Меньше 2 ATP',
    status: 'Ищу лактат для создания идеальных дырок! 🧀',
    emoji: '🧀',
    gradient: 'gradient-orange',
    animation: 'animate-pulse-glow'
  },
  {
    id: 4,
    name: 'Ацет Уксуснокислый',
    scientificName: 'Acetobacter',
    age: '3 млн лет',
    occupation: 'Кислотный мастер',
    about: 'Этанол для окисления',
    hobby: 'Превращать алкоголь в уксус',
    hates: 'Отсутствие кислорода, низкий pH',
    products: 'Уксусная кислота',
    temperature: '25-30°C',
    energy: '2 ATP с молекулы этанола',
    status: 'Ищу этанол для создания уксуса! 🍶',
    emoji: '🍶',
    gradient: 'gradient-pink',
    animation: 'animate-float'
  },
  {
    id: 5,
    name: 'Масло Клостридиум',
    scientificName: 'Clostridium butyricum',
    age: '2.5 млн лет',
    occupation: 'Масляный производитель',
    about: 'Глюкозу для масляной реакции',
    hobby: 'Создавать масляную кислоту и водород',
    hates: 'Кислород, высокий pH',
    products: 'Масляная кислота, CO₂, H₂',
    temperature: '35-40°C',
    energy: '3 ATP с молекулы глюкозы',
    status: 'Строго анаэробный режим! 🧈',
    emoji: '🧈',
    gradient: 'from-yellow-400 to-amber-600',
    animation: 'animate-pulse-glow'
  },
  {
    id: 6,
    name: 'Мета Археи',
    scientificName: 'Methanobacterium',
    age: '3.5 млрд лет',
    occupation: 'Газовый инженер',
    about: 'CO₂ и H₂ для метаногенеза',
    hobby: 'Производить метан из углекислого газа',
    hates: 'Кислород, низкие температуры',
    products: 'Метан (CH₄)',
    temperature: '35-45°C',
    energy: '1 ATP с молекулы CO₂',
    status: 'Древнейший на планете! 💨',
    emoji: '💨',
    gradient: 'from-green-400 to-emerald-600',
    animation: 'animate-float'
  }
];

const matches = [
  { pair: 'Дрожжи + Глюкоза', result: 'Идеальный сидр! 🍎', success: true },
  { pair: 'Лактобактерии + Молоко', result: 'Самый кремовый йогурт! 🥛', success: true },
  { pair: 'Пропионовые + Лактат', result: 'Сыр с идеальными дырками! 🧀', success: true },
  { pair: 'Уксуснокислые + Этанол', result: 'Ароматный уксус! 🍶', success: true },
  { pair: 'Клостридии + Глюкоза', result: 'Масляная кислота и водород! 🧈', success: true },
  { pair: 'Археи + CO₂ + H₂', result: 'Биометан для энергии! 💨', success: true },
  { pair: 'Дрожжи + Кислород', result: 'Окисление вместо брожения 😞', success: false },
  { pair: 'Лактобактерии + Антибиотики', result: 'Уничтожена колония 💀', success: false },
  { pair: 'Клостридии + Кислород', result: 'Гибель колонии 💀', success: false }
];

const fermentationTypes = [
  {
    type: 'Спиртовое',
    equation: 'Глюкоза → 2 Этанол + 2 CO₂ + 2 ATP',
    products: 'Этанол, CO₂',
    microbes: 'Дрожжи (Saccharomyces)',
    temp: '25-30°C',
    atp: '2 ATP',
    application: 'Алкоголь, хлебопечение',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    type: 'Молочнокислое',
    equation: 'Глюкоза → 2 Молочная кислота + 2 ATP',
    products: 'Молочная кислота',
    microbes: 'Лактобактерии (Lactobacillus)',
    temp: '37-40°C',
    atp: '2 ATP',
    application: 'Йогурты, сыры, квашеные овощи',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    type: 'Пропионовокислое',
    equation: '3 Лактат → 2 Пропионовая кислота + 1 Уксусная кислота + CO₂',
    products: 'Пропионовая кислота, уксусная кислота, CO₂',
    microbes: 'Пропионовокислые бактерии (Propionibacterium)',
    temp: '30-37°C',
    atp: '< 2 ATP',
    application: 'Швейцарские сыры',
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    type: 'Уксуснокислое',
    equation: 'Этанол + O₂ → Уксусная кислота + H₂O',
    products: 'Уксусная кислота',
    microbes: 'Уксуснокислые бактерии (Acetobacter)',
    temp: '25-30°C',
    atp: '2 ATP',
    application: 'Уксус, комбуча',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    type: 'Маслянокислое',
    equation: 'Глюкоза → Масляная кислота + 2 CO₂ + 2 H₂ + 3 ATP',
    products: 'Масляная кислота, CO₂, H₂',
    microbes: 'Маслянокислые бактерии (Clostridium)',
    temp: '35-40°C',
    atp: '3 ATP',
    application: 'Производство масляной кислоты',
    gradient: 'from-yellow-500 to-amber-500'
  },
  {
    type: 'Метановое',
    equation: 'CO₂ + 4 H₂ → CH₄ + 2 H₂O',
    products: 'Метан (CH₄)',
    microbes: 'Метаногенные археи (Methanobacterium)',
    temp: '35-45°C',
    atp: '1 ATP',
    application: 'Биогаз, очистка сточных вод',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    type: 'Гомоацетатное',
    equation: 'Глюкоза → 3 Уксусная кислота',
    products: 'Уксусная кислота',
    microbes: 'Гомоацетатные бактерии (Clostridium aceticum)',
    temp: '30-37°C',
    atp: '3 ATP',
    application: 'Производство ацетата',
    gradient: 'from-indigo-500 to-purple-500'
  }
];

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
                <Card 
                  className={`w-full max-w-md bg-card/80 backdrop-blur border-2 border-primary/30 overflow-hidden relative ${
                    showSwipeAnimation === 'right' ? 'animate-slide-in' : 
                    showSwipeAnimation === 'left' ? 'animate-slide-out' : ''
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-2 ${currentMicrobe.gradient}`} />
                  
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <div className={`text-8xl mb-4 ${currentMicrobe.animation}`}>
                        {currentMicrobe.emoji}
                      </div>
                      <h2 className="text-3xl font-bold mb-2">{currentMicrobe.name}</h2>
                      <p className="text-muted-foreground italic">{currentMicrobe.scientificName}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" className="text-primary" size={20} />
                        <span className="text-sm"><strong>Возраст:</strong> {currentMicrobe.age}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Briefcase" className="text-primary" size={20} />
                        <span className="text-sm"><strong>Род занятий:</strong> {currentMicrobe.occupation}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6 bg-muted/20 p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Icon name="Target" className="text-secondary mt-1" size={18} />
                        <div>
                          <strong className="text-secondary">Ищу:</strong>
                          <p className="text-sm">{currentMicrobe.about}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Heart" className="text-accent mt-1" size={18} />
                        <div>
                          <strong className="text-accent">Мои хобби:</strong>
                          <p className="text-sm">{currentMicrobe.hobby}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="X" className="text-destructive mt-1" size={18} />
                        <div>
                          <strong className="text-destructive">Не выношу:</strong>
                          <p className="text-sm">{currentMicrobe.hates}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <Badge variant="outline" className="w-full justify-start">
                        <Icon name="Flask" className="mr-2" size={14} />
                        Продукты: {currentMicrobe.products}
                      </Badge>
                      <Badge variant="outline" className="w-full justify-start">
                        <Icon name="Thermometer" className="mr-2" size={14} />
                        Температура: {currentMicrobe.temperature}
                      </Badge>
                      <Badge variant="outline" className="w-full justify-start">
                        <Icon name="Zap" className="mr-2" size={14} />
                        Энергия: {currentMicrobe.energy}
                      </Badge>
                    </div>

                    <div className="text-center text-lg font-semibold mb-6 text-primary">
                      {currentMicrobe.status}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        onClick={() => handleSwipe('left')}
                        variant="outline"
                        className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-white"
                        size="lg"
                      >
                        <Icon name="X" className="mr-2" size={20} />
                        Не совместимы
                      </Button>
                      <Button
                        onClick={() => handleSwipe('right')}
                        className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                        size="lg"
                      >
                        <Icon name="Heart" className="mr-2" size={20} />
                        Подходит
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-center glow">
              Твоя статистика 📊
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </div>

            <Card className="p-6 bg-card/80 backdrop-blur">
              <h3 className="text-xl font-bold mb-4 text-primary">Уровень эксперта</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Прогресс изучения</span>
                  <span className="font-bold">{Math.min(currentIndex + 1, microbes.length)}/{microbes.length}</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500 glow"
                    style={{ width: `${((currentIndex + 1) / microbes.length) * 100}%` }}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}