import { fetchAndStoreBreeds, getBreedsData } from '../../dataFetch/fetchAndStoreBreeds';
import { calculateScore } from './UserTest'; // 사용자 점수 계산 함수 불러오기
import { DogOwnerEvaluation } from '../../types/DogOwnerEvaluation';
import { Breed } from '../../types/Breed';
import { SurveyData } from './SurveyDataType';

// 속성 매핑 정의
const attributeMapping: { [key in keyof DogOwnerEvaluation]?: keyof Breed } = {
    adaptability: 'adaptabilityLevel',
    affectionTowardsFamily: 'affectionWithFamily',
    barkingLevel: 'barkingLevel',
    droolingLevel: 'droolingLevel',
    energyLevel: 'energyLevel',
    suitableForChildren: 'goodWithYoungChildren',
    goodWithOtherPets: 'goodWithOtherDogs',
    mentalStimulationNeed: 'needsMentalStimulation',
    opennessToStrangers: 'opennessToStrangers',
    playfulnessLevel: 'playfulnessLevel',
    trainability: 'trainabilityLevel',
    guardInstinct: 'guardProtectiveInstinct',
    sheddingLevel: 'sheddingLevel',
    groomingNeed: 'groomingLevel',
  };
  


// 사용자와 강아지 점수 비교 로직
const findBestMatchingDog = (userScores: DogOwnerEvaluation): Breed | null => {
    const breedsData = getBreedsData();
  
    if (!breedsData) {
      console.error('로컬 스토리지에 강아지 데이터가 없습니다.');
      return null;
    }
  
    let bestMatch: Breed | null = null;
    let lowestDifference = Infinity;
  
    // 강아지 데이터를 순회하며 차이 계산
    Object.values(breedsData).forEach((breed: Breed) => {
      let difference = 0;
  
      // 사용자 점수와 강아지 데이터의 속성을 매핑하여 비교
      Object.keys(attributeMapping).forEach((key) => {
        const dogKey = attributeMapping[key as keyof DogOwnerEvaluation];
        const userScoreValue = userScores[key as keyof DogOwnerEvaluation];
        const breedScoreValue = dogKey ? breed[dogKey] : null;
  
        // 점수 계산 (number로 명시적 단언)
        if (typeof userScoreValue === 'number' && typeof breedScoreValue === 'number') {
          difference += Math.abs(userScoreValue - breedScoreValue);
        }
      });
  
      // 현재 강아지가 더 적합한 경우 업데이트
      if (difference < lowestDifference) {
        lowestDifference = difference;
        bestMatch = breed;
      }
    });
  
    return bestMatch;
  };
  
  export const recommendDogBasedOnUserInput = async (userInfoData: SurveyData) => {
    // 1. Firebase에서 강아지 데이터 가져오기 및 로컬 스토리지에 저장
    await fetchAndStoreBreeds();
  
    // 2. 사용자 점수 계산
    let userScores: DogOwnerEvaluation = calculateScore(userInfoData);
  
    // 3. 점수 조정 (최소값 1, 최대값 5로 제한)
    (Object.keys(userScores) as Array<keyof DogOwnerEvaluation>).forEach((key) => {
      const scoreValue = userScores[key];
  
      // number 타입으로 확인 후 최소/최대값 조정
      if (typeof scoreValue === 'number') {
        userScores[key] = Math.max(1, Math.min(5, Math.round(scoreValue))) as number;
      }
    });
  
    // 4. 가장 적합한 강아지 찾기
    const bestDog = findBestMatchingDog(userScores);
  
    if (bestDog) {
      console.log('추천 강아지:', bestDog.koreanName, bestDog.englishName);
    } else {
      console.log('추천할 강아지가 없습니다.');
    }
  
    return bestDog;
  };