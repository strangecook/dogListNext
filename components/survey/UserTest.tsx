import React from 'react';
import { SurveyData } from './SurveyDataType';

// 기본 점수 객체 타입
interface DogOwnerEvaluation {
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

// 사용자 입력 데이터 타입
interface UserInfoData {
  [key: string]: string; // 사용자가 입력한 값은 문자열로 받아옴
}

// 점수 조정 설정 타입
interface ControlSettings {
  [key: string]: {
    [key: string]: Partial<Omit<DogOwnerEvaluation, 'coatType' | 'coatLength'>>;
  };
}

// 기본 점수 객체 생성
const dogOwnerEvaluation: DogOwnerEvaluation = {
  ownerRate: 0,
  smallDogScore: 0,
  mediumDogScore: 0,
  largeDogScore: 0,
  extraLargeDogScore: 0,
  suitableForChildren: 0,
  goodWithOtherPets: 0,
  mentalStimulationNeed: 0,
  barkingLevel: 0,
  energyLevel: 0,
  affectionTowardsFamily: 0,
  trainability: 0,
  adaptability: 0,
  guardInstinct: 0,
  coatType: '',
  coatLength: '',
  sheddingLevel: 0,
  groomingNeed: 0,
  droolingLevel: 0,
  opennessToStrangers: 0,
  playfulnessLevel: 0,
};

// 점수 조정 설정 데이터
const controlSettings: ControlSettings = {
  age: {
    '10대': { energyLevel: 1, affectionTowardsFamily: 0, trainability: 0 },
    '20대': { energyLevel: 1.5, affectionTowardsFamily: 0.5, trainability: 1 },
    '30대': { energyLevel: -0.5, affectionTowardsFamily: 1, trainability: 0.5 },
    '40대': { energyLevel: -2, affectionTowardsFamily: 2, trainability: 0.5 },
    '50대': { energyLevel: -2, affectionTowardsFamily: 2, trainability: -0.5 },
    '60대': { energyLevel: -3, affectionTowardsFamily: 3, trainability: -2 }
  },
  housingType: {
    '아파트': { smallDogScore: 1 },
    '주택': { largeDogScore: 1 },
    '원룸': { smallDogScore: 1 }
  }
};

// 점수 계산 함수 (동적 적용)
export const calculateScore = (
    userInfoData: SurveyData, 
  ): DogOwnerEvaluation => {
    let updatedScores = { ...baseScores }; // 기본 점수 복사
    
    // userInfoData에 해당하는 값을 순회하며 점수 조정
    (Object.keys(userInfoData) as Array<keyof SurveyData>).forEach((key) => {
      const userValue = userInfoData[key]; // 설문조사 값 (예: '20대')
      
      if (controlSettings[key] && controlSettings[key][userValue]) {
        const adjustments = controlSettings[key][userValue]; // 해당 값의 점수 조정
  
        // 해당 값에 대한 점수 조정 적용
        (Object.keys(adjustments) as Array<keyof Omit<DogOwnerEvaluation, 'coatType' | 'coatLength'>>).forEach((scoreKey) => {
          updatedScores[scoreKey] += adjustments[scoreKey] || 0;
        });
      }
    });
  
    return updatedScores;
  };

// // 설문조사 데이터 예시
// const userInfoData: SurveyData = {
//   age: '20대',              // 설문조사에서 받은 값
//   housingType: '아파트' ,    // 설문조사에서 받은 값
//   incomeSource: "string",
//   housingType: "string",
//   indoorSpace: "string",
//   movingPossibility:"string",
//   petDiscussion: "string",
//   familyDiscussion: "string",
//   hasChildren: "string",
//   otherDogs: "string",
//   neighborHasPets: "string",

//   // Lifestyle
//   dogSpentTime: "string",
//   familyTime: "string",
//   noiseLevel: "string",
//   aloneTime: "string",
//   musicPreference: "string",
//   aloneTimeSolution: "string",
//   cleaningFrequency: "string",
//   walkingPark: string;
//   walkingFrequency: string;
//   cookingPreference: string;

//   // Dog Preferences
//   dogSize: string;
//   monthlyExpenses: string;
//   budgetForAdoption: string;
//   monthlyExpense: string;
//   obedienceLevel: string;
//   strangerCaution: string;
//   interactionFrequency: string;
//   trainingSpeed: string;
//   patienceLevel: string;
//   firstTimeOwner: string;
//   interactionImportance: string;
//   allergyConcern: string;
//   droolingConcern: string;
//   sheddingTolerance: string;
//   bathingFrequency: string;
//   groomingFrequency: string;
//   coatPreference: string;
//   coatLength: string;
//   barkingPreference: string;
//   playfulnessPreference: string;
//   trainingExperience: string;
// };

// 기본 점수표
const baseScores: DogOwnerEvaluation = {
  ownerRate: 0, energyLevel: 3, affectionTowardsFamily: 3, trainability: 3,
  smallDogScore: 0, mediumDogScore: 0, largeDogScore: 0, extraLargeDogScore: 0,
  suitableForChildren: 3, goodWithOtherPets: 3, mentalStimulationNeed: 3,
  barkingLevel: 3, adaptability: 3, guardInstinct: 3, coatType: '', coatLength: '',
  sheddingLevel: 3, groomingNeed: 3, droolingLevel: 3, opennessToStrangers: 3,
  playfulnessLevel: 3
};

// 점수 계산
// const finalScores = calculateScore(userInfoData);

// console.log(finalScores);
// 결과: { energyLevel: 4.5, affectionTowardsFamily: 3.5, trainability: 4, smallDogScore: 1, ... }


