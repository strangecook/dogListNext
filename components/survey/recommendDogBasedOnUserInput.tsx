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

  const top100Breeds = Object.values(breedsData).filter((breed: Breed) => breed.popularity && breed.popularity <= 50);

  const filteredBreeds = filterDogsBySize(top100Breeds, userScores);

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

    return { breed, difference };
  });

  const bestMatches = differences
    .sort((a, b) => a.difference - b.difference)
    .slice(0, topN)
    .map((match) => match.breed);

  console.log('추천된 Top 100 내 강아지 목록:', bestMatches.map(dog => dog.koreanName));
  return bestMatches;
};

// **3번 방식**: 사용자 선호 조건에 따른 필터링
const filterDogsByUserPreferences = (breedsData: Breed[], surveyData: SurveyData): Breed[] => {
  const filterCriteria: { [key: string]: any } = {};
  const userSelections = surveyData.selectedPreferences || []; // `selectedPreferences` 사용

  // 사용자 입력에 따라 필터 조건 생성
  userSelections.forEach((selection) => {
    switch (selection) {
        // 적응성 및 독립성
        case '다양한 환경에 잘 적응했으면 좋겠다':
            filterCriteria.adaptabilityLevel = [4, 5];
            break;
        case '자주 놀아주거나 많은 활동을 하지 않아도 괜찮았으면 좋겠다.':
            filterCriteria.energyLevel = [1, 2];
            break;
        case '손이 많이 가지 않는 강아지를 원한다.':
          filterCriteria.mentalStimulationNeed = [1, 2]; // 정신적 자극 요구도가 낮음
          filterCriteria.affectionWithFamily = [1, 2]; // 독립적인 성향
            break;

        // 가족 및 아이 친화성
        case '가족과 친밀하게 지냈으면 좋겠다':
            filterCriteria.affectionWithFamily = [4, 5];
            break;
        case '아이와 함께 잘 놀아줄 수 있는 강아지를 원한다':
            filterCriteria.goodWithYoungChildren = [4, 5];
            break;

        // 소음 및 침 흘림
        case '짖는 소리가 적었으면 좋겠다':
            filterCriteria.barkingLevel = [1, 2];
            break;
        case '침 흘림이 적었으면 좋겠다':
            filterCriteria.droolingLevel = [1, 2];
            break;

        // 에너지 및 운동 수준
        case '자주 함께 뛰놀거나 운동할 수 있는 강아지를 원한다':
            filterCriteria.energyLevel = [4, 5];
            break;
        case '적은 산책량으로도 만족할 수 있는 강아지를 원한다':
          filterCriteria.energyLevel = [1, 2];
            break;
        case '장난기가 많아 자주 놀았으면 좋겠다':
            filterCriteria.playfulnessLevel = [4, 5];
            break;

        // 다른 반려동물 및 낯선 사람과의 친화성
        case '다른 반려동물과도 잘 지냈으면 좋겠다':
            filterCriteria.goodWithOtherDogs = [4, 5];
            break;
        case '외부 사람에 대해 경계심이 있으면 좋겠다':
            filterCriteria.guardProtectiveInstinct = [4, 5];
            break;
        case '외부 사람이나 손님에 대해 친화적이었으면 좋겠다':
            filterCriteria.opennessToStrangers = [4, 5];
            break;

        // 훈련 가능성 및 경계심
        case '훈련을 경험해본 적이 있어 상급 훈련도 가능했으면 좋겠다':
            filterCriteria.trainabilityLevel = [4, 5];
            filterCriteria.mentalStimulationNeed = [4, 5];
            break;
        case '기본 훈련에 잘 적응하고 쉽게 배우는 강아지를 원한다':
            filterCriteria.trainabilityLevel = [2, 3, 4];
            filterCriteria.mentalStimulationNeed = [3, 4]; // 과하지 않은 정신적 자극 요구
            break;
        case '경계심이 강했으면 좋겠다':
            filterCriteria.guardProtectiveInstinct = [4, 5];
            break;

        // 털 빠짐 및 관리
        case '털이 거의 없거나 관리가 쉬운 견종을 선호한다':
            filterCriteria.sheddingLevel = [1, 2];
            filterCriteria.groomingLevel = [1, 2];
            break;
        case '털 관리가 간편했으면 좋겠다':
            filterCriteria.groomingLevel = [1, 2];
            break;
        case '긴 털을 선호한다':
            filterCriteria.coatType = ['긴 털'];
            break;
        case '짧은 털을 선호한다':
            filterCriteria.coatType = ['짧은 털'];
            break;

        // 크기
        case '소형견을 선호한다':
            filterCriteria.size = ['소형견'];
            break;
        case '중형견을 선호한다':
            filterCriteria.size = ['중형견'];
            break;
        case '대형견을 선호한다':
            filterCriteria.size = ['대형견'];
            break;
        case '초대형견을 선호한다':
            filterCriteria.size = ['초대형견'];
            break;

        // 사교성
        case '사람들과 잘 어울리는 강아지를 원한다':
            filterCriteria.opennessToStrangers = [4, 5];
            break;
        case '때로는 독립적이고 혼자 있는 시간을 즐길 수 있는 강아지를 원한다':
            filterCriteria.opennessToStrangers = [1, 2];
            break;

        default:
            console.log(`Unknown selection: ${selection}`);
    }
});

  console.log('적용된 필터 조건:', filterCriteria);

  // 필터 조건에 따라 강아지 필터링
  const filteredDogs = breedsData.filter((breed) => {
    return Object.keys(filterCriteria).every((key) => {
      const criteriaValues = filterCriteria[key];
      const breedValue = breed[key as keyof Breed];

      if (Array.isArray(criteriaValues)) {
        // 점수 범위 조건
        return criteriaValues.includes(breedValue);
      } else {
        // 단일 값 조건
        return criteriaValues === breedValue;
      }
    });
  });

  console.log('사용자 선호 조건에 맞는 강아지 목록:', filteredDogs.map(dog => dog.koreanName));
  return filteredDogs;
};

// 3번 방식: 인기순위와 점수를 조합하여 추천
const findBestMatchingDogsWithPopularity = (
  filteredBreeds: Breed[], // 필터링된 강아지 목록
  userScores: DogOwnerEvaluation, // 사용자 점수
  topN: number = 3 // 추천할 강아지 수
): Breed[] => {
  const withPopularity = filteredBreeds.filter((breed) => breed.popularity !== undefined);
  const withoutPopularity = filteredBreeds.filter((breed) => breed.popularity === undefined);

  // 인기순위가 있는 강아지들 정렬
  const sortedByPopularity = withPopularity.sort((a, b) => a.popularity! - b.popularity!);

  // 인기순위가 없는 강아지들의 점수 차이 계산
  const scoredWithoutPopularity = withoutPopularity.map((breed) => {
    let difference = 0;

    Object.keys(attributeMapping).forEach((key) => {
      const dogKey = attributeMapping[key as keyof DogOwnerEvaluation];
      const userScoreValue = userScores[key as keyof DogOwnerEvaluation];
      const breedScoreValue = dogKey ? breed[dogKey] : null;

      if (typeof userScoreValue === 'number' && typeof breedScoreValue === 'number') {
        difference += Math.abs(userScoreValue - breedScoreValue);
      }
    });

    return { breed, difference };
  });

  // 점수 차이가 작은 순으로 정렬
  const sortedByScore = scoredWithoutPopularity
    .sort((a, b) => a.difference - b.difference)
    .map((match) => match.breed);

  // 인기순위 기반 + 점수 기반 병합
  const combinedRecommendations = [...sortedByPopularity, ...sortedByScore].slice(0, topN);

  console.log(
    '3번 방식 (인기순위 + 점수) 추천 강아지:',
    combinedRecommendations.map((dog) => dog.koreanName)
  );

  return combinedRecommendations;
};



// 사용자 입력 기반 강아지 추천 함수 (전체 통합)
export const recommendDogsBasedOnUserInput = async (surveyData: SurveyData) => {
  await fetchAndStoreBreeds();

  const breedsData = getBreedsData();
  if (!breedsData || Object.keys(breedsData).length === 0) {
    console.error('강아지 데이터를 가져오지 못했습니다. 데이터가 비어 있습니다.');
    return;
  }

  console.log('가져온 강아지 데이터:', breedsData);

  // 사용자 점수 계산
  let userScores: DogOwnerEvaluation = calculateScore(surveyData);
  (Object.keys(userScores) as Array<keyof DogOwnerEvaluation>).forEach((key) => {
    const scoreValue = userScores[key];
    if (typeof scoreValue === 'number') {
      userScores[key] = Math.max(1, Math.min(5, scoreValue)) as number;
    }
  });

  // 기존 방식 1, 2번 실행
  const bestDogs = findBestMatchingDogs(userScores, 3);
  const top100Dogs = findBestMatchingDogsForTop100(userScores, 3);

  // **3번 방식 실행**: 사용자 선호 조건 필터링
  const filteredDogsByPreferences = filterDogsByUserPreferences(Object.values(breedsData), surveyData);

  // **3번 방식 수정**: 인기순위 + 점수 기반 추천
  const bestMatchesFromFiltered = findBestMatchingDogsWithPopularity(filteredDogsByPreferences, userScores, 3);

  console.log('1번 방식 추천 강아지 (전체 대상):', bestDogs.map(dog => dog.koreanName));
  console.log('2번 방식 Top 100 추천 강아지:', top100Dogs.map(dog => dog.koreanName));
  console.log('3번 방식 최종 추천 (인기순위 + 점수):', bestMatchesFromFiltered.map(dog => dog.koreanName));

  return {
    bestDogs,
    top100Dogs,
    bestMatchesFromFiltered, // 3번 방식 최종 추천 결과 추가
  };
};
