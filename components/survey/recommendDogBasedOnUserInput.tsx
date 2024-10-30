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
  // 사용자가 선호하는 크기를 배열에 저장
  const preferredSizes: string[] = [];

  // 0점 이상일 때 선호하는 강아지 크기를 포함
  if (userScores.smallDogScore >= 0) preferredSizes.push('소형견');
  if (userScores.mediumDogScore >= 0) preferredSizes.push('중형견');
  if (userScores.largeDogScore >= 0) preferredSizes.push('대형견');
  if (userScores.extraLargeDogScore >= 0) preferredSizes.push('초대형견');

  // 강아지 크기에 따른 필터링
  return breedsData.filter((breed: Breed) => preferredSizes.includes(breed.size));
};

// 사용자와 강아지 점수 비교 로직
const findBestMatchingDogs = (userScores: DogOwnerEvaluation, topN: number = 3): Breed[] => {
  const breedsData = getBreedsData();

  if (!breedsData) {
    console.error('로컬 스토리지에 강아지 데이터가 없습니다.');
    return [];
  }

  // 강아지 크기에 따른 필터링
  const filteredBreeds = filterDogsBySize(Object.values(breedsData), userScores);

  // 중간 결과를 콘솔에 출력
  console.log('사용자 점수:', userScores);

  // 강아지 데이터와 차이 계산
  const differences = filteredBreeds.map((breed: Breed) => {
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

    // 각 강아지의 차이 출력
    // console.log(`강아지: ${breed.koreanName}, 차이: ${difference}`);

    return { breed, difference };
  });

  // 차이를 기준으로 오름차순 정렬하여 상위 N개 반환
  const bestMatches = differences
    .sort((a, b) => a.difference - b.difference)
    .slice(0, topN)
    .map((match) => match.breed);

  // 추천된 강아지 목록 출력
  console.log('추천된 강아지 목록:', bestMatches.map(dog => dog.koreanName));

  return bestMatches;
};

// 사용자 입력 기반 강아지 추천 함수
export const recommendDogsBasedOnUserInput = async (userInfoData: SurveyData) => {
  // 1. Firebase에서 강아지 데이터 가져오기 및 로컬 스토리지에 저장
  await fetchAndStoreBreeds();

  // 2. 사용자 점수 계산
  let userScores: DogOwnerEvaluation = calculateScore(userInfoData);

// 3. 점수 조정 (최소값 1, 최대값 5로 제한)
(Object.keys(userScores) as Array<keyof DogOwnerEvaluation>).forEach((key) => {
  const scoreValue = userScores[key];

  // 제외할 속성 정의
  const excludedKeys: Array<keyof DogOwnerEvaluation> = [
    'smallDogScore',
    'mediumDogScore',
    'largeDogScore',
    'extraLargeDogScore',
    'ownerRate'
  ];

  // 제외할 속성이 아닐 때만 최소/최대값 조정
  if (typeof scoreValue === 'number' && !excludedKeys.includes(key)) {
    userScores[key] = Math.max(1, Math.min(5, scoreValue)) as number;
  }
});

  // 4. 가장 적합한 3마리 강아지 찾기
  const bestDogs = findBestMatchingDogs(userScores, 3);

  if (bestDogs.length > 0) {
    bestDogs.forEach((dog, index) => {
      console.log(`추천 강아지 ${index + 1}:`, dog.koreanName, dog.englishName);
    });
  } else {
    console.log('추천할 강아지가 없습니다.');
  }

  return bestDogs;
};
