import { Microbe } from '@/components/microbe-match/types';
import { UserProfile } from '@/components/microbe-match/ProfileForm';

export function calculateCompatibility(microbe: Microbe, profile: UserProfile): number {
  let score = 0;

  const favoriteTypeLower = profile.favoriteType.toLowerCase();
  const microbeNameLower = microbe.scientificName.toLowerCase();
  const microbeOccupationLower = microbe.occupation.toLowerCase();

  if (favoriteTypeLower.includes('бактер') && 
      (microbeNameLower.includes('bacteri') || 
       microbeNameLower.includes('lactobacillus') || 
       microbeNameLower.includes('propion') ||
       microbeNameLower.includes('clostridium') ||
       microbeNameLower.includes('acetobacter'))) {
    score += 40;
  }

  if (favoriteTypeLower.includes('дрожж') && 
      microbeNameLower.includes('saccharomyces')) {
    score += 40;
  }

  if (favoriteTypeLower.includes('гриб') && 
      (microbeNameLower.includes('saccharomyces') || 
       microbeNameLower.includes('myces'))) {
    score += 40;
  }

  const goalLower = profile.goal.toLowerCase();
  
  if (goalLower.includes('алкогол') || goalLower.includes('вино') || goalLower.includes('пив')) {
    if (microbeOccupationLower.includes('алкогол') || microbe.emoji === '🍷') {
      score += 30;
    }
  }

  if (goalLower.includes('молоч') || goalLower.includes('йогурт') || goalLower.includes('кефир')) {
    if (microbeOccupationLower.includes('молоч') || microbe.emoji === '🥛') {
      score += 30;
    }
  }

  if (goalLower.includes('сыр')) {
    if (microbeOccupationLower.includes('сыр') || microbe.emoji === '🧀') {
      score += 30;
    }
  }

  if (goalLower.includes('хлеб') || goalLower.includes('выпечк')) {
    if (microbe.emoji === '🍞' || microbeOccupationLower.includes('хлеб')) {
      score += 30;
    }
  }

  if (goalLower.includes('уксус')) {
    if (microbeOccupationLower.includes('уксус') || microbe.products?.includes('уксусная')) {
      score += 30;
    }
  }

  if (goalLower.includes('биогаз') || goalLower.includes('энерг')) {
    if (microbeOccupationLower.includes('биогаз') || microbe.products?.includes('метан')) {
      score += 30;
    }
  }

  if (goalLower.includes('масл')) {
    if (microbeOccupationLower.includes('масл') || microbe.products?.includes('бутанол')) {
      score += 30;
    }
  }

  const age = parseInt(profile.age);
  if (!isNaN(age)) {
    if (age < 18) {
      if (microbe.emoji === '🥛' || microbe.emoji === '🍞' || microbe.emoji === '🧀') {
        score += 10;
      }
    } else if (age >= 18) {
      if (microbe.emoji === '🍷' || microbeOccupationLower.includes('алкогол')) {
        score += 10;
      }
    }
  }

  return Math.min(score, 100);
}

export function isSuperMatchWorthy(microbe: Microbe, profile: UserProfile): boolean {
  const compatibility = calculateCompatibility(microbe, profile);
  return compatibility >= 60;
}
