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
  ownerRate: 0,                // 주인 점수 (전반적인 책임감 평가)
  smallDogScore: 0,            // 소형견에 적합한 점수
  mediumDogScore: 0,           // 중형견에 적합한 점수
  largeDogScore: 0,            // 대형견에 적합한 점수
  extraLargeDogScore: 0,       // 초대형견에 적합한 점수
  suitableForChildren: 0,      // 어린 자녀와의 적합성 점수
  goodWithOtherPets: 0,        // 다른 반려동물과의 상호작용 능력
  mentalStimulationNeed: 0,    // 정신적 자극 필요성 (머리를 쓰는 활동 필요 여부)
  barkingLevel: 0,             // 짖는 수준 (짖음의 빈도나 강도)
  energyLevel: 0,              // 에너지 수준 (활동량과 운동 필요성)
  affectionTowardsFamily: 0,   // 가족에 대한 애정도
  trainability: 0,             // 훈련 가능성 (배우는 속도와 능력)
  adaptability: 0,             // 환경 적응 능력
  guardInstinct: 0,            // 감시견 또는 보호견 본능 (경계심)
  coatType: '',                // 코트 유형 (털의 종류, 예: 짧은 털, 중간 털, 긴 털)
  coatLength: '',              // 코트 길이 (털의 길이)
  sheddingLevel: 0,            // 털 빠짐 정도
  groomingNeed: 0,             // 털 관리 필요성 (빗질, 미용 필요도)
  droolingLevel: 0,            // 침 흘림 수준
  opennessToStrangers: 0,      // 낯선 사람에 대한 개방성 (사회성)
  playfulnessLevel: 0          // 장난기 수준
};

// 점수 조정 설정 데이터
const controlSettings: ControlSettings = {
  // 1. 나이가 몇 세이신가요?
  age: {
    '10대': { energyLevel: 1, affectionTowardsFamily: 0, trainability: 0 },
    '20대': { energyLevel: 1.5, affectionTowardsFamily: 0.5, trainability: 1 },
    '30대': { energyLevel: -0.5, affectionTowardsFamily: 1, trainability: 0.5 },
    '40대': { energyLevel: -2, affectionTowardsFamily: 2, trainability: 0.5 },
    '50대': { energyLevel: -2, affectionTowardsFamily: 2, trainability: -0.5 },
    '60대': { energyLevel: -3, affectionTowardsFamily: 3, trainability: -2 }
  },

  // 2. 정기적인 수입이 있습니까?
  incomeSource: {
    '정규직으로 일하고 있다': { ownerRate: 5 },
    '아르바이트나 파트타임으로 일하고 있다': { ownerRate: 4 },
    '현재 수입이 없다': { ownerRate: -1 },
    '다른 재정적인 지원을 받고 있다': { ownerRate: 4 }
  },

  // 3. 현재 살고 있는 곳은 어떤 유형의 주거 형태입니까?
  housingType: {
    '아파트 또는 고층 빌라': {
      smallDogScore: 5,
      mediumDogScore: 3,
      largeDogScore: 1,
      extraLargeDogScore: 1,
      barkingLevel: -1,
      energyLevel: -1
    },
    '주택 (마당이 있는 경우)': {
      smallDogScore: 4,
      mediumDogScore: 5,
      largeDogScore: 5,
      extraLargeDogScore: 4,
      barkingLevel: 1,
      energyLevel: 1
    },
    '원룸/오피스텔': {
      smallDogScore: 5,
      mediumDogScore: 2.5,
      largeDogScore: 1,
      extraLargeDogScore: 1,
      barkingLevel: -1,
      energyLevel: -1
    }
  },

  // 4. 강아지가 안전하게 활동할 수 있는 실내 공간이 있습니까?
  indoorSpace: {
    '넓은 공간이 충분히 있다': {
      smallDogScore: 3, mediumDogScore: 3, largeDogScore: 4, extraLargeDogScore: 2, energyLevel: 1.5
    },
    '어느 정도 공간이 있다': {
      smallDogScore: 3, mediumDogScore: 2, largeDogScore: 2, extraLargeDogScore: 1, energyLevel: 0.5
    },
    '공간이 부족하다': {
      smallDogScore: 3, mediumDogScore: 2, largeDogScore: 1, extraLargeDogScore: 1, energyLevel: -0.5
    }
  },

  // 5. 1~2년 내에 이사할 가능성이 있습니까?
  movingPossibility: {
    '없다': { adaptability: 0 },
    '가능성 있다': { adaptability: 0.5, opennessToStrangers: 0.5 },
    '자주 이사한다': { adaptability: 1, opennessToStrangers: 1 }
  },

  // 6. 이웃이나 집주인과 강아지를 키우는 것에 대한 이야기가 되었나요?
  petDiscussion: {
    '예, 모두 동의한다': { ownerRate: 5 },
    '아니오, 반대 의견이 있다': { ownerRate: 1 },
    '아직 논의하지 않았다': { ownerRate: 3 }
  },

  // 7. 가족과 강아지를 키우는 것에 대한 이야기가 되었나요?
  familyDiscussion: {
    '예, 모두 동의한다': { ownerRate: 5, affectionTowardsFamily: 1 },
    '아니오, 반대 의견이 있다': { ownerRate: 1, affectionTowardsFamily: -0.5 },
    '아직 논의하지 않았다': { ownerRate: 3, affectionTowardsFamily: 0 }
  },

  // 8. 자녀가 있습니까?
  hasChildren: {
    '예, 어린 자녀가 있다': { suitableForChildren: 1.5 },
    '아니오, 없다': { suitableForChildren: 0 }
  },

  // 9. 다른 반려동물을 키우고 있습니까?
  otherPets: {
    '예': { goodWithOtherPets: 1.5, ownerRate: 1.5 },
    '아니오': { goodWithOtherPets: 0, ownerRate: 0 }
  },

  // 10. 다른 강아지를 키우고 있습니까?
  otherDogs: {
    '예, 소형견': { smallDogScore: 2, ownerRate: 1 },
    '예, 중형견': { mediumDogScore: 2, ownerRate: 1 },
    '예, 대형견': { largeDogScore: 2, ownerRate: 1 },
    '아니오': { smallDogScore: 0, mediumDogScore: 0, largeDogScore: 0, ownerRate: 0 }
  },

  // 11. 현재 거주 중인 곳에 다른 반려동물을 키우는 이웃이 있습니까?
  neighborHasPets: {
    '예, 많이 있다': { opennessToStrangers: 1.5, goodWithOtherPets: 1.5 },
    '몇 명 있다': { opennessToStrangers: 1, goodWithOtherPets: 1 },
    '없다': { opennessToStrangers: 0, goodWithOtherPets: 0 },
    '잘 모르겠다': { opennessToStrangers: 0.5, goodWithOtherPets: 0 }
  },

  // 12. 하루 중 강아지에게 할애할 수 있는 시간은 얼마입니까?
  dogSpentTime: {
    '30분 이하': { energyLevel: -1.5, affectionTowardsFamily: -1.5 , mentalStimulationNeed:-1.5 , ownerRate: -1, adaptability: 1 },
    '30분 ~ 1시간': { energyLevel: 0, affectionTowardsFamily: 0 , mentalStimulationNeed: 0.25 , ownerRate: 0 , adaptability: 0.5 },
    '1시간 이상': { energyLevel: 1, affectionTowardsFamily: 1 , mentalStimulationNeed:1 , ownerRate: 1 }
  },

  // 13. 거주하는 집의 소음 수준은 어떻습니까?
  noiseLevel: {
    '매우 조용하다': { barkingLevel: -1, adaptability: 0 },
    '적당하다': { barkingLevel: 0, adaptability: 0.5 },
    '소음이 많다': { barkingLevel: -1, adaptability: 1 }
  },

  // 14. 주로 어떤 음악을 듣습니까?
  musicPreference: {
    '클래식': { energyLevel: -0.25, playfulnessLevel: 0, adaptability: 0.25 },
    '팝': { energyLevel: 0, playfulnessLevel: 0.25, affectionTowardsFamily: 0.25 },
    '록': { energyLevel: 0.25, playfulnessLevel: 0.5, adaptability: -0.25 },
    '힙합': { energyLevel: 0.5, playfulnessLevel: 0.5, adaptability: -0.5 },
    '발라드': { energyLevel: 0, playfulnessLevel: 0, affectionTowardsFamily: 0.25 }
  },

  // 15. 강아지와 가족이 함께 보내는 시간은 얼마나 되나요?
  familyTime: {
    '1시간 미만': { affectionTowardsFamily: -0.75 },
    '1~2시간': { affectionTowardsFamily: -0.25 },
    '2~4시간': { affectionTowardsFamily: 0.25 },
    '4~6시간': { affectionTowardsFamily: 0.75 },
    '6시간 이상': { affectionTowardsFamily: 1.25 }
  },

  // 16. 강아지가 혼자 있는 시간이 얼마나 될까요?
  aloneTime: {
    '6시간 이상': { adaptability: 1.5, mentalStimulationNeed: 0.5, energyLevel: -0.5, opennessToStrangers: 0.5 },
    '3~6시간': { adaptability: 1, mentalStimulationNeed: 0.25, energyLevel: -0.25, opennessToStrangers: 0.25 },
    '1~3시간': { adaptability: 0.5 },    // 짧게 혼자 있을 때 적응이 되는 강아지
    '거의 혼자 있지 않음': { adaptability: 0 } // 항상 사람과 함께 있을 때 적응성의 변화 없음
  },

  // 17. 강아지가 혼자 있는 시간이 많을 경우, 어떻게 대처할 계획이 있으십니까?
  aloneTimeSolution: {
    '펫 시터 이용': { adaptability: -1, ownerRate: 1 },
    '가족/이웃 맡김': { adaptability: -0.5, ownerRate: 0.5 },
    '특별 계획 없음': { adaptability: 1, ownerRate: -1 }
  },

  // 18. 집 청소를 얼마나 자주 하시나요?
  cleaningFrequency: {
    '거의 청소하지 않음': { sheddingLevel: -1.5, groomingNeed: -1.5, ownerRate: -1 }, // 털 관리 부족
    '주 1~2회': { sheddingLevel: -0.5, groomingNeed: -0.5, ownerRate: 0 },             // 기본적인 관리 수준
    '매일': { sheddingLevel: 0.5, groomingNeed: 0.5, ownerRate: 1 },                   // 높은 수준의 관리 가능
    '하루에 여러 번': { sheddingLevel: 1.5, groomingNeed: 1.5, ownerRate: 2 }          // 매우 높은 관리 가능
  },

  // 19. 강아지를 산책시킬 수 있는 공원이나 산책로가 집 근처에 있습니까?
  walkingPark: {
    '매우 가깝다': { energyLevel: 1.5, opennessToStrangers: 0.5 },
    '적당히 가깝다': { energyLevel: 0.5, opennessToStrangers: 0.25 },
    '멀리 있다': { energyLevel: -0.5 },
    '없다': { energyLevel: -1 }
  },

  // 20. 강아지가 매일 산책을 얼마나 자주 해야 하길 원하십니까?
  walkingFrequency: {
    '필요하지 않음': { 
      energyLevel: -2,         // 에너지 소모가 적음
      playfulnessLevel: -1,    // 장난감보다는 조용함을 선호
      adaptability: -0.5       // 외부 자극에 덜 적응
    },
    '하루에 한 번': { 
      energyLevel: 0,          // 보통 수준의 에너지
      playfulnessLevel: 0,     // 적당한 장난기
      adaptability: 0          // 평균 수준의 적응력
    },
    '하루에 두 번 이상': { 
      energyLevel: 2,          // 높은 에너지 수준
      playfulnessLevel: 1,     // 장난기가 많음
      adaptability: 0.5        // 외부 환경에 잘 적응함
    }
  },

  // 21. 요리하는 것을 좋아합니까?
  cookingPreference: {
    '매우 좋아함': { 
      adaptability: 0.25,             // 소폭의 적응성 증가
      mentalStimulationNeed: 0.1,     // 소폭의 호기심 증가
      opennessToStrangers: 0.1        // 소폭의 외부 자극 반응 증가
    },
    '가끔 함': { 
      adaptability: 0,                // 기본 적응성 유지
      mentalStimulationNeed: 0,       // 기본 호기심 유지
      opennessToStrangers: 0          // 기본 외부 자극 반응 유지
    },
    '별로 하지 않음': { 
      adaptability: -0.25,            // 소폭의 적응성 감소
      mentalStimulationNeed: -0.1,    // 소폭의 호기심 감소
      opennessToStrangers: -0.1       // 소폭의 외부 자극 반응 감소
    },
    '거의 하지 않음': { 
      adaptability: -0.5,             // 적응성 소폭 감소
      mentalStimulationNeed: -0.2,    // 호기심 소폭 감소
      opennessToStrangers: -0.2       // 외부 자극 반응 소폭 감소
    }
  },
  

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

// 기본 점수표
const baseScores: DogOwnerEvaluation = {
  ownerRate: 0, energyLevel: 3, affectionTowardsFamily: 3, trainability: 3,
  smallDogScore: 0, mediumDogScore: 0, largeDogScore: 0, extraLargeDogScore: 0,
  suitableForChildren: 3, goodWithOtherPets: 3, mentalStimulationNeed: 3,
  barkingLevel: 3, adaptability: 3, guardInstinct: 3, coatType: '', coatLength: '',
  sheddingLevel: 3, groomingNeed: 3, droolingLevel: 3, opennessToStrangers: 3,
  playfulnessLevel: 3
};
