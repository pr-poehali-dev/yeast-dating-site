export interface Microbe {
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

export interface Match {
  pair: string;
  result: string;
  success: boolean;
}

export interface FermentationType {
  type: string;
  equation: string;
  products: string;
  microbes: string;
  temp: string;
  atp: string;
  application: string;
  gradient: string;
}
