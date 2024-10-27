import React from 'react';
import { SurveyData } from './SurveyDataType';
import { DogOwnerEvaluation } from '../../types/DogOwnerEvaluation';

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
    '30분 이하': { energyLevel: -1.5, affectionTowardsFamily: -1.5, mentalStimulationNeed: -1.5, ownerRate: -1, adaptability: 1 },
    '30분 ~ 1시간': { energyLevel: 0, affectionTowardsFamily: 0, mentalStimulationNeed: 0.25, ownerRate: 0, adaptability: 0.5 },
    '1시간 이상': { energyLevel: 1, affectionTowardsFamily: 1, mentalStimulationNeed: 1, ownerRate: 1 }
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

  // 22. 강아지를 처음 키우시나요?
  firstTimeOwner: {
    '예': {
      trainability: -2,         // 훈련 경험이 적어 훈련 가능성 감소
      ownerRate: -0.5,          // 책임감 평가에서 약간 낮은 점수
      adaptability: -0.5,       // 적응성에 소폭 영향
      mentalStimulationNeed: 0.25, // 강아지의 관심을 끌어야 하므로 약간 증가
      affectionTowardsFamily: -0.25 // 가족과의 관계 형성이 느려질 수 있음
    },
    '아니오': {
      trainability: 1,          // 훈련 경험이 있어 훈련 가능성 증가
      ownerRate: 0.5,           // 책임감 평가에서 약간 높은 점수
      adaptability: 0.5,        // 적응성 증가
      mentalStimulationNeed: -0.25, // 훈련 경험이 많아 정신적 자극이 덜 필요할 수 있음
      affectionTowardsFamily: 0.25  // 가족과의 애정 형성이 빠를 수 있음
    }
  },

  // 23. 강아지를 입양하거나 구입할 수 있는 예산이 얼마입니까?
budgetForAdoption: {
  '10만 원 미만': { 
    ownerRate: -1,           // 재정적 부담이 클 수 있어 낮은 점수
    groomingNeed: -0.5,      // 미용에 많은 투자가 어려울 수 있음
    adaptability: -0.5       // 환경 적응에 제한적일 수 있음
  },
  '10만 원 ~ 50만 원': { 
    ownerRate: 0,            // 기본적인 관리 가능
    groomingNeed: 0,         // 기본적인 미용 가능
    adaptability: 0          // 기본 적응력 유지
  },
  '50만 원 ~ 100만 원': { 
    ownerRate: 1,          // 재정적 여유로 더 나은 관리 가능
    groomingNeed: 0.25,       // 추가 미용 가능
    adaptability: 0.25       // 더 나은 환경 적응 가능
  },
  '100만 원 이상': { 
    ownerRate: 2,            // 매우 안정적인 관리 가능
    groomingNeed: 0.5,         // 고급 미용 가능
    adaptability: 0.5          // 최상의 환경 적응 가능
  }
},

// 24. 매달 강아지의 사료, 병원비, 용품비 등을 지출할 수 있는 금액은 얼마입니까?
monthlyExpense: {
  '5만 원 이하': { 
    ownerRate: -1,       // 경제적 부담으로 인한 낮은 점수
    energyLevel: -0.25,     // 낮은 에너지 강아지를 선호할 가능성
    groomingNeed: -0.25     // 기본적인 털 관리 가능성만
  },
  '5만 원 ~ 10만 원': { 
    ownerRate: 0,           // 기본 관리 가능
    energyLevel: 0,         // 보통 수준의 에너지 관리 가능
    groomingNeed: 0         // 기본적인 미용 가능
  },
  '10만 원 ~ 20만 원': { 
    ownerRate: 1,        // 여유로운 관리 가능
    energyLevel: 0.25,      // 활동적인 강아지와의 상호작용 가능성
    groomingNeed: 0.25      // 추가적인 미용 가능
  },
  '20만 원 이상': { 
    ownerRate: 2,         // 매우 안정적인 관리 가능
    energyLevel: 0.5,       // 높은 에너지 강아지와의 상호작용 가능성
    groomingNeed: 0.5       // 고급 미용 가능
  }
},

obedienceLevel: {
  '독립적인 성향을 원한다': { trainability: -2, affectionTowardsFamily: -2 },
  '가끔은 독립적이고 가끔은 따랐으면 좋겠다': { trainability: -1, affectionTowardsFamily: -1 },
  '주인을 잘 따르면서도 독립적인 성향을 가졌으면 좋겠다': { trainability: 1, affectionTowardsFamily: 1 },
  '주인을 거의 항상 따르길 원한다': { trainability: 2, affectionTowardsFamily: 2 }
},

// 26. 강아지가 낯선 사람을 얼마나 경계하길 원하십니까?
strangerCaution: {
  '거의 경계하지 않길 원한다': { 
    guardInstinct: -2,      // 낮은 경계심의 강아지 추천
    opennessToStrangers: 2  // 외부인에 대한 개방성 증가
  },
  '적당히 경계심을 가졌으면 좋겠다': { 
    guardInstinct: 0,       // 중간 수준의 경계심
    opennessToStrangers: 0  // 평균적인 개방성
  },
  '낯선 사람에게 경계심을 가졌으면 좋겠다': { 
    guardInstinct: 2,       // 높은 경계심의 강아지 추천
    opennessToStrangers: -2 // 외부인에 대한 낮은 개방성
  }
},

// 27. 강아지와 얼마나 자주 소통을 하고 싶은가요?
interactionFrequency: {
  '거의 시간이 없다': { 
    affectionTowardsFamily: -1.5,    // 가족과의 애정도가 낮음
    energyLevel: -1,                 // 에너지 수준이 낮음
    mentalStimulationNeed: -1.5      // 정신적 자극이 적음
  },
  '하루에 한두 번 짧게 상호작용한다': { 
    affectionTowardsFamily: -0.5,    // 가족과의 애정도가 약간 낮음
    energyLevel: -0.5,               // 에너지 수준이 약간 낮음
    mentalStimulationNeed: -0.5      // 정신적 자극이 약간 낮음
  },
  '정기적으로 상호작용하지만 독립적인 시간도 필요하다': { 
    affectionTowardsFamily: 0.5,     // 가족과의 애정도가 적당함
    energyLevel: 0,                  // 에너지 수준이 보통
    mentalStimulationNeed: 0         // 정신적 자극이 보통
  },
  '자주 상호작용하며, 많이 시간을 보낼 수 있다': { 
    affectionTowardsFamily: 1.5,     // 가족과의 애정도가 높음
    energyLevel: 1,                  // 에너지 수준이 높음
    mentalStimulationNeed: 1.5       // 정신적 자극이 높음
  }
},

// 28. 강아지가 훈련에 얼마나 빠르게 적응하길 원하십니까?
trainingSpeed: {
  '느리게 배워도 상관없다': { 
    trainability: -1          // 훈련 가능성이 낮은 강아지 선호
  },
  '적당한 시간 내에 배웠으면 좋겠다': { 
    trainability: 0.5           // 보통 수준의 훈련 가능성
  },
  '빠르게 배웠으면 좋겠다': { 
    trainability: 2           // 훈련 가능성이 높은 강아지 선호
  }
},

patienceLevel: {
  '인내심이 거의 없다': { trainability: -2 }, // 훈련 가능성만 낮음
  '짧은 시간은 참을 수 있다': { trainability: -1 }, // 중간 이하의 훈련 가능성
  '평균적인 인내심이 있다': { trainability: 0.75 }, // 중간 이상의 훈련 가능성
  '오랜 시간 참을 수 있다': { trainability: 1.5 } // 높은 훈련 가능성
},
// 29. 강아지를 훈련시킨 경험이 얼마나 있습니까?
trainingExperience: {
  '전혀 없다': { trainability: -1, ownerRate: 1 },
  '기본적인 훈련만 시켜본 적이 있다': { trainability: 0, ownerRate: 2 },
  '몇 가지 명령어를 가르쳐본 적이 있다': { trainability: 1, ownerRate: 3 },
  '정기적으로 훈련을 시켜본 경험이 있다': { trainability: 2, ownerRate: 4 },
  '전문적인 훈련 경험이 있다': { trainability: 3, ownerRate: 5 }
},
// 30. 강아지와의 상호작용에서 무엇을 더 중요하게 생각하십니까?
interactionImportance: {
  '운동 및 활동적인 상호작용': {
    energyLevel: 2,         // 에너지 수준을 높게 반영
    playfulnessLevel: 1.5   // 장난기 있는 강아지를 선호
  },
  '감정적인 상호작용': {
    affectionTowardsFamily: 2,  // 가족과의 애정도를 높게 반영
    opennessToStrangers: 1      // 외부 사람과의 개방성도 증가
  },
  '독립적인 성향을 존중': {
    trainability: -1,          // 독립적인 성향을 가진 강아지를 선호
    mentalStimulationNeed: -1  // 정신적 자극 필요가 적은 강아지를 선호
  }
},

// 31. 털 알레르기가 있거나 알레르기 걱정이 되십니까?
allergyConcern: {
  '예': {
    sheddingLevel: -2,  // 털 빠짐이 적은 강아지를 선호
    groomingNeed: -1,   // 적은 털 관리 필요
  },
  '아니오': {
    sheddingLevel: 0,   // 털 빠짐에 대한 제약이 없음
    groomingNeed: 0,    // 털 관리에 대한 제약이 없음
  }
},
// 32. 강아지가 침을 많이 흘린다면, 얼마나 신경 쓰일 것 같습니까?
droolingConcern: {
  '전혀 신경 쓰이지 않는다': {
    droolingLevel: 0  // 침 흘림에 대한 제약 없음
  },
  '약간 신경 쓰이지만 감수할 수 있다': {
    droolingLevel: -1  // 적당히 침 흘림이 적은 강아지를 선호
  },
  '자주 닦아야 한다면 불편할 것 같다': {
    droolingLevel: -2  // 침 흘림이 적은 강아지를 선호
  }
},

// 33. 강아지의 털 빠짐을 얼마나 감당할 수 있습니까?
sheddingTolerance: {
  '털 빠짐이 심해도 상관없다': {
    sheddingLevel: 0  // 털 빠짐에 제약이 없음
  },
  '약간의 털 빠짐은 감수할 수 있다': {
    sheddingLevel: -1  // 털 빠짐이 적은 강아지를 약간 더 선호
  },
  '털 빠짐이 적은 강아지를 원한다': {
    sheddingLevel: -2  // 털 빠짐이 매우 적은 강아지를 강하게 선호
  }
},
// 34. 강아지를 얼마나 자주 목욕시킬 의향이 있습니까?
bathingFrequency: {
  '매주': {
    groomingNeed: 0.75,  // 높은 털 관리 가능성
    ownerRate: 1        // 주인 점수 소폭 증가
  },
  '매달': {
    groomingNeed: 0.5,    // 보통 수준의 털 관리 가능성
    ownerRate: 0        // 주인 점수 유지
  },
  '필요할 때만': {
    groomingNeed: 0,    // 기본 수준의 털 관리
    ownerRate: -1       // 주인 점수 약간 감소
  },
  '가능하면 자주 하지 않기를 원한다': {
    groomingNeed: -0.5,   // 낮은 털 관리 가능성
    ownerRate: -2       // 주인 점수 감소
  }
},
// 35. 강아지의 털을 얼마나 자주 손질할 의향이 있으십니까?
groomingFrequency: {
  '매일 빗질 및 관리': {
    groomingNeed: 2,  // 높은 털 관리 가능성
    ownerRate: 2      // 주인 점수 크게 증가
  },
  '일주일에 2~3회 빗질': {
    groomingNeed: 1,  // 보통 수준의 털 관리 가능성
    ownerRate: 1      // 주인 점수 증가
  },
  '가끔 빗질 (일주일에 1회 이하)': {
    groomingNeed: 0,  // 기본 수준의 털 관리
    ownerRate: 0      // 주인 점수 변화 없음
  },
  '털 관리가 적게 필요했으면 좋겠다': {
    groomingNeed: -1, // 낮은 털 관리 가능성
    ownerRate: -1     // 주인 점수 감소
  }
},
// 36. 강아지의 털 유형 중 어떤 것을 선호하십니까?
coatPreference: {
  '짧고 관리가 쉬운 털': {
    groomingNeed: -1,       // 낮은 털 관리 필요성
    sheddingLevel: 0        // 평균 수준의 털 빠짐
  },
  '부드럽고 길게 자라는 털': {
    groomingNeed: 2,        // 높은 털 관리 필요성
    sheddingLevel: 1        // 털 빠짐 가능성 증가
  },
  '털이 거의 없는 무모견': {
    groomingNeed: -2,       // 거의 관리가 필요하지 않음
    sheddingLevel: -1       // 매우 낮은 털 빠짐
  }
},
// 37. 어떤 크기의 강아지를 선호하십니까?
dogSize: {
  '소형견': {
    smallDogScore: 2,       // 소형견에 대한 높은 선호도
    mediumDogScore: 0,      // 중립적 선호
    largeDogScore: -1       // 대형견에 대한 낮은 선호도
  },
  '중형견': {
    smallDogScore: 0,       // 소형견에 대한 중립적 선호
    mediumDogScore: 2,      // 중형견에 대한 높은 선호도
    largeDogScore: 0        // 대형견에 대한 중립적 선호
  },
  '대형견': {
    smallDogScore: -1,      // 소형견에 대한 낮은 선호도
    mediumDogScore: 0,      // 중형견에 대한 중립적 선호
    largeDogScore: 2        // 대형견에 대한 높은 선호도
  }
},

// 38. 강아지가 언제 짖으면 좋겠나요?
barkingPreference: {
  '필요한 경우에만 짖는다': {
    barkingLevel: -2,        // 짖음이 적은 강아지 선호
    guardInstinct: 0         // 감시 본능에 영향 없음
  },
  '경고나 흥분할 때만 짖는다': {
    barkingLevel: 0,         // 중간 정도의 짖음 선호
    guardInstinct: 0.5         // 경계 본능이 있는 강아지 선호
  },
  '다양한 상황에서 짖는다': {
    barkingLevel: 2,         // 짖음이 많은 강아지 선호
    guardInstinct: 1         // 경계 본능이 높은 강아지 선호
  }
},

};

// 점수 계산 함수 (동적 적용)
export const calculateScore = (
  userInfoData: SurveyData,
): DogOwnerEvaluation => {
  // 기본 점수 복사
  let updatedScores: DogOwnerEvaluation = { ...baseScores };

  // userInfoData에 해당하는 값을 순회하며 점수 조정
  (Object.keys(userInfoData) as Array<keyof SurveyData>).forEach((key) => {
    const userValue = userInfoData[key]; // 설문조사 값 (예: '20대')

    if (controlSettings[key] && controlSettings[key][userValue]) {
      const adjustments = controlSettings[key][userValue];

      // 해당 값에 대한 점수 조정 적용
      (Object.keys(adjustments) as Array<keyof Omit<DogOwnerEvaluation, 'coatType' | 'coatLength'>>).forEach((scoreKey) => {
        // 'number' 타입인 경우에만 += 연산을 수행
        if (typeof updatedScores[scoreKey] === 'number' && typeof adjustments[scoreKey] === 'number') {
          updatedScores[scoreKey] += adjustments[scoreKey] || 0;
        }
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
