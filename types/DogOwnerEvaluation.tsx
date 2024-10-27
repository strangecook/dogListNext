export interface DogOwnerEvaluation {
  [key: string]: number | string;
  ownerRate: number;
  smallDogScore: number;
  mediumDogScore: number;
  largeDogScore: number;
  extraLargeDogScore: number;
  suitableForChildren: number;
  goodWithOtherPets: number;
  mentalStimulationNeed: number;
  barkingLevel: number;
  energyLevel: number;
  affectionTowardsFamily: number;
  trainability: number;
  adaptability: number;
  guardInstinct: number;
  coatType: string;
  coatLength: string;
  sheddingLevel: number;
  groomingNeed: number;
  droolingLevel: number;
  opennessToStrangers: number;
  playfulnessLevel: number;
}