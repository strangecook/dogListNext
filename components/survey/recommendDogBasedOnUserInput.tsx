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

// 강아지 크기 필터링 로직 추가
const filterDogsBySize = (breedsData: Breed[], userScores: DogOwnerEvaluation): Breed[] => {
  const preferredSizes: string[] = [];

  if (userScores.smallDogScore >= 0) preferredSizes.push('소형견');
  if (userScores.mediumDogScore >= 0) preferredSizes.push('중형견');
  if (userScores.largeDogScore >= 0) preferredSizes.push('대형견');
  if (userScores.extraLargeDogScore >= 0) preferredSizes.push('초대형견');

  const filtered = breedsData.filter((breed: Breed) => preferredSizes.includes(breed.size));
  console.log('필터링된 강아지 크기:', filtered.map(dog => dog.koreanName));
  return filtered;
};

// 사용자와 강아지 점수 비교 로직
const findBestMatchingDogs = (userScores: DogOwnerEvaluation, topN: number = 3): Breed[] => {
  const breedsData = getBreedsData();

  if (!breedsData) {
    console.error('로컬 스토리지에 강아지 데이터가 없습니다.');
    return [];
  }

  const filteredBreeds = filterDogsBySize(Object.values(breedsData), userScores);
  console.log('사용자 점수 (전체 강아지 대상):', userScores);

  const differences = filteredBreeds.map((breed: Breed) => {
    let difference = 0;

    Object.keys(attributeMapping).forEach((key) => {
      const dogKey = attributeMapping[key as keyof DogOwnerEvaluation];
      const userScoreValue = userScores[key as keyof DogOwnerEvaluation];
      const breedScoreValue = dogKey ? breed[dogKey] : null;

      if (typeof userScoreValue === 'number' && typeof breedScoreValue === 'number') {
        difference += Math.abs(userScoreValue - breedScoreValue);
      }
    });

    console.log(`강아지: ${breed.koreanName}, 차이: ${difference}`);
    return { breed, difference };
  });

  const bestMatches = differences
    .sort((a, b) => a.difference - b.difference)
    .slice(0, topN)
    .map((match) => match.breed);

  console.log('추천된 강아지 목록 (전체 대상):', bestMatches.map(dog => dog.koreanName));
  return bestMatches;
};

// 인기 100위 이내의 강아지를 대상으로 추천
const findBestMatchingDogsForTop100 = (userScores: DogOwnerEvaluation, topN: number = 3): Breed[] => {
  const breedsData = getBreedsData();

  if (!breedsData) {
    console.error('로컬 스토리지에 강아지 데이터가 없습니다.');
    return [];
  }

  const top100Breeds = Object.values(breedsData).filter((breed: Breed) => breed.popularity && breed.popularity <= 100);
  console.log('인기 100위 이내 강아지 목록:', top100Breeds.map(dog => dog.koreanName));

  const filteredBreeds = filterDogsBySize(top100Breeds, userScores);
  console.log('사용자 점수 (Top 100 강아지 대상):', userScores);

  const differences = filteredBreeds.map((breed: Breed) => {
    let difference = 0;

    Object.keys(attributeMapping).forEach((key) => {
      const dogKey = attributeMapping[key as keyof DogOwnerEvaluation];
      const userScoreValue = userScores[key as keyof DogOwnerEvaluation];
      const breedScoreValue = dogKey ? breed[dogKey] : null;

      if (typeof userScoreValue === 'number' && typeof breedScoreValue === 'number') {
        difference += Math.abs(userScoreValue - breedScoreValue);
      }
    });

    console.log(`강아지 (Top 100): ${breed.koreanName}, 차이: ${difference}`);
    return { breed, difference };
  });

  const bestMatches = differences
    .sort((a, b) => a.difference - b.difference)
    .slice(0, topN)
    .map((match) => match.breed);

  console.log('추천된 Top 100 내 강아지 목록:', bestMatches.map(dog => dog.koreanName));
  return bestMatches;
};

// 사용자 입력 기반 강아지 추천 함수
export const recommendDogsBasedOnUserInput = async (userInfoData: SurveyData) => {
  await fetchAndStoreBreeds();
  console.log("userInfo datar",userInfoData)
  console.log("fetchAndStoreBreeds();",fetchAndStoreBreeds())

  const breedsData = getBreedsData();

  console.log("breedsData",breedsData)
  if (!breedsData || Object.keys(breedsData).length === 0) {
    console.error('강아지 데이터를 가져오지 못했습니다. 데이터가 비어 있습니다.');
    return;
  } else {
    console.log('가져온 강아지 데이터:', breedsData);
  }

  let userScores: DogOwnerEvaluation = calculateScore(userInfoData);
  console.log('계산된 사용자 점수:', userScores);

  (Object.keys(userScores) as Array<keyof DogOwnerEvaluation>).forEach((key) => {
    const scoreValue = userScores[key];

    const excludedKeys: Array<keyof DogOwnerEvaluation> = [
      'smallDogScore',
      'mediumDogScore',
      'largeDogScore',
      'extraLargeDogScore',
      'ownerRate'
    ];

    if (typeof scoreValue === 'number' && !excludedKeys.includes(key)) {
      userScores[key] = Math.max(1, Math.min(5, scoreValue)) as number;
    }
  });

  const bestDogs = findBestMatchingDogs(userScores, 3);
  const top100Dogs = findBestMatchingDogsForTop100(userScores, 3);

  console.log('1번 방식 추천 강아지 (전체 대상):', bestDogs.map(dog => dog.koreanName));
  console.log('2번 방식 Top 100 추천 강아지:', top100Dogs.map(dog => dog.koreanName));

  return {
    bestDogs,
    top100Dogs
  };
};
