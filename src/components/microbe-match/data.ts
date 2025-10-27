import { Microbe, Match, FermentationType } from './types';

export const microbes: Microbe[] = [
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

export const matches: Match[] = [
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

export const fermentationTypes: FermentationType[] = [
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
