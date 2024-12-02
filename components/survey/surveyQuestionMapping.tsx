// 질문과 점수 항목 매핑 데이터
export const surveyQuestionMapping: Record<
  string,
  {
    key: string; // surveyData에서 사용할 실제 데이터 키
    question: string; // 질문 텍스트
    index: number; // 몇 번째 질문인지
    explanation: (answer: string) => { key: string; description: string }[]; // 점수 항목과 설명 리스트 반환
  }
> = {
  age: {
    key: "age", // 실제 데이터 키
    question: "1. 나이가 몇 세이신가요?", // 질문 텍스트
    index: 1, // 몇 번째 질문인지
    explanation: (answer) => {
        const descriptions: Record<string, { key: string; description: string }[]> = {
          "10대": [
            { key: "energyLevel", description: "10대는 활동적인 라이프스타일에 맞춰 높은 에너지를 가진 강아지가 적합합니다." },
          ],
          "20대": [
            { key: "energyLevel", description: "20대는 활동량이 많아 높은 에너지를 가진 강아지가 잘 어울립니다." },
          ],
          "30대": [
            { key: "affectionTowardsFamily", description: "30대는 가족과의 유대가 중요한 시기이며, 친근한 강아지가 적합합니다." },
          ],
          "40대": [
            { key: "affectionTowardsFamily", description: "40대는 가족과 함께 시간을 보내는 데 적합한 강아지를 추천합니다." },
          ],
          "50대": [
            { key: "energyLevel", description: "50대는 활동량이 줄어들어 낮은 에너지를 가진 강아지가 적합합니다." },
          ],
          "60대": [
            { key: "affectionTowardsFamily", description: "60대는 정서적 유대가 중요한 시기이므로, 애정 깊은 강아지를 추천합니다." },
          ],
        };
      
        return descriptions[answer] || [
          { key: "energyLevel", description: "연령에 따라 적합한 에너지를 가진 강아지를 추천합니다." },
        ];
      },      
  },
  incomeSource: {
    key: "incomeSource",
    question: "정기적인 수입이 있습니까?",
    index: 2, // 질문 번호 추가
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        정규직: [
          {
            key: "ownerRate",
            description: "정규직으로 안정적인 수입이 있으므로, 강아지를 책임감 있게 돌볼 여건이 충분해 보입니다. 계획적으로 준비하세요.",
          },
        ],
        파트타임: [
          {
            key: "ownerRate",
            description: "파트타임 수입으로도 강아지를 키울 수 있지만, 재정적 여유와 계획이 중요합니다.",
          },
        ],
        수입없음: [
          {
            key: "ownerRate",
            description: "현재 수입이 없으므로, 강아지를 돌보는 데 필요한 비용을 충분히 고려하세요.",
          },
        ],
        지원받음: [
          {
            key: "ownerRate",
            description: "재정적인 지원이 있다면, 강아지를 키우는 데 필요한 자원을 신중히 관리하세요.",
          },
        ],
      };

      return descriptions[answer] || [
        { key: "ownerRate", description: "경제적 상황에 따라 강아지를 돌볼 준비를 계획하세요." },
      ];
    },
  },
  housingType: {
    key: "housingType",
    question: "3. 현재 살고 있는 곳은 어떤 유형의 주거 형태입니까?",
    index: 3,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        아파트: [
          {
            key: "ownerRate",
            description: "아파트 환경에서는 소형견이 적합하며, 공간 제약으로 에너지가 낮은 강아지를 추천합니다.",
          },
          {
            key: "barkingLevel",
            description: "아파트에서는 짖음이 적은 강아지가 이웃과의 불화를 줄일 수 있습니다.",
          },
        ],
        주택: [
          {
            key: "ownerRate",
            description: "주택은 마당이 있어 대형견도 키우기에 적합하며, 활동적인 강아지가 잘 적응할 수 있습니다.",
          },
          {
            key: "energyLevel",
            description: "활동량이 높은 강아지는 넓은 마당을 가진 주택에서 스트레스를 덜 받을 수 있습니다.",
          },
        ],
        원룸: [
          {
            key: "ownerRate",
            description: "원룸에서는 소형견이 적합하며, 활동량이 적은 품종을 고려해야 합니다.",
          },
          {
            key: "barkingLevel",
            description: "조용한 환경을 유지하기 위해 짖음이 적은 강아지를 추천합니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        { key: "ownerRate", description: "주거 형태에 따라 적합한 강아지를 신중히 선택하세요." },
      ];
    },
  },

  indoorSpace: {
    key: "indoorSpace",
    question: "4. 강아지가 안전하게 활동할 수 있는 실내 공간이 있습니까?",
    index: 4,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "넓은 공간": [
          {
            key: "energyLevel",
            description: "넓은 공간에서는 활동량이 높은 강아지도 스트레스를 덜 받고 잘 적응할 수 있습니다.",
          },
          {
            key: "extraLargeDogScore",
            description: "넓은 공간은 대형견과 초대형견이 자유롭게 활동하기에 적합합니다.",
          },
        ],
        "어느 정도 공간": [
          {
            key: "energyLevel",
            description: "활동량이 중간 정도인 강아지가 적합하며, 소형견과 중형견은 잘 적응할 수 있습니다.",
          },
        ],
        "공간 부족": [
          {
            key: "energyLevel",
            description: "활동량이 적은 강아지를 추천하며, 공간 부족은 스트레스를 유발할 수 있습니다.",
          },
          {
            key: "extraLargeDogScore",
            description: "대형견이나 초대형견은 공간 부족으로 인해 적응이 어렵습니다. 신중히 고려하세요.",
          },
        ],
      };
  
      return descriptions[answer] || [
        { key: "energyLevel", description: "실내 공간에 맞는 강아지의 활동량을 신중히 고려하세요." },
      ];
    },
  },
  
  movingPossibility: {
    key: "movingPossibility",
    question: "5. 1~2년 내에 이사할 가능성이 있습니까?",
    index: 5,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "없다": [
          {
            key: "adaptability",
            description: "이사 가능성이 없으므로, 적응력이 특별히 높은 강아지가 필요하지 않습니다.",
          },
        ],
        "있다": [
          {
            key: "adaptability",
            description: "이사 가능성이 있으므로, 환경 변화에 적응할 수 있는 강아지를 고려하세요.",
          },
        ],
        "자주 이사": [
          {
            key: "adaptability",
            description: "이사를 자주 한다면, 환경 변화에 민감하지 않은 강아지가 필요합니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        { key: "adaptability", description: "환경 변화에 따라 적응력이 필요한 강아지를 고려하세요." },
      ];
    },
  },
  
  petDiscussion: {
    key: "petDiscussion",
    question: "6. 이웃이나 집주인과 강아지를 키우는 것에 대한 이야기가 되었나요?",
    index: 6,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "예": [
          {
            key: "ownerRate",
            description: "이웃이나 집주인과 강아지를 키우는 것에 대해 동의가 이루어졌다면, 강아지를 키우는 데 있어 안정적인 환경을 기대할 수 있습니다.",
          },
        ],
        "아니오": [
          {
            key: "ownerRate",
            description: "반대 의견이 있다면, 갈등을 줄이기 위해 강아지 입양 전에 충분한 소통과 협의가 필요합니다.",
          },
        ],
        "논의하지 않음": [
          {
            key: "ownerRate",
            description: "아직 논의하지 않았다면, 강아지 입양 전에 집주인이나 이웃과의 대화를 통해 환경적 준비를 확인하세요.",
          },
        ],
      };
  
      return descriptions[answer] || [
        { key: "ownerRate", description: "강아지를 키우기 전에 주변 환경과의 조화를 위해 논의가 필요합니다." },
      ];
    },
  },
  
  familyDiscussion: {
    key: "familyDiscussion",
    question: "7. 가족과 강아지를 키우는 것에 대한 이야기가 되었나요?",
    index: 7,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "예": [
          {
            key: "affectionTowardsFamily",
            description: "가족과 강아지의 정서적 유대감이 형성될 가능성이 높아, 가족 친화도가 높은 점수를 부여했습니다.",
          },
        ],
        "아니오": [
          {
            key: "ownerRate",
            description: "가족 내 반대 의견이 있다면, 갈등을 줄이기 위해 충분한 대화와 합의를 도출하는 것이 중요합니다.",
          },
        ],
        "논의하지 않음": [
          {
            key: "ownerRate",
            description: "아직 논의하지 않았다면, 입양 전 가족과의 충분한 대화가 필수적입니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        { key: "ownerRate", description: "가족과 강아지 양육에 대해 충분히 논의하세요." },
      ];
    },
  },

  hasChildren: {
    key: "hasChildren",
    question: "8. 어린 자녀가 있습니까?",
    index: 8,
    explanation: (answer: string) => {
      if (answer === "예, 어린 자녀가 있다") {
        return [
          {
            key: "suitableForChildren",
            description: "어린 자녀가 있는 경우, 아이들과 친화력이 높은 강아지를 선택하는 것이 중요합니다.",
          },
        ];
      }
      // 다른 응답에 대해 설명을 반환하지 않음
      return [];
    },
  },
  
  otherPets: {
    key: "otherPets",
    question: "9. 다른 반려동물을 키우고 있습니까?",
    index: 9,
    explanation: (answer: string) => {
      if (answer === "예") {
        return [
          {
            key: "goodWithOtherPets",
            description: "다른 반려동물을 키우고 있다면, 반려동물 간의 상호작용이 원활한 강아지를 선택하는 것이 중요합니다.",
          },
          {
            key: "ownerRate",
            description: "기존 반려동물의 복지와 새로운 강아지의 적응을 고려해 신중히 준비하세요.",
          },
        ];
      }
      // "아니오" 선택지에 대해서는 설명 생략
      return [];
    },
  },
  
  otherDogs: {
    key: "otherDogs",
    question: "10. 다른 강아지를 키우고 있습니까?",
    index: 10,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "예, 소형견": [
          {
            key: "ownerRate",
            description: "소형견과 어울리는 크기와 성격의 강아지를 선택하세요.",
          },
        ],
        "예, 중형견": [
          {
            key: "ownerRate",
            description: "중형견과 상호작용이 조화로운 강아지를 고려하세요.",
          },
        ],
        "예, 대형견": [
          {
            key: "ownerRate",
            description: "대형견과 활동 수준이 비슷한 강아지를 선택하세요.",
          },
        ],
        "아니오": [
          {
            key: "ownerRate",
            description: "첫 강아지로 적응하기 쉬운 성격의 강아지를 고려하세요.",
          },
        ],
      };
  
      return descriptions[answer] || [
        { key: "ownerRate", description: "환경과 어울리는 강아지를 신중히 선택하세요." },
      ];
    },
  },
  
  neighborHasPets: {
    key: "neighborHasPets",
    question: "11. 현재 거주 중인 곳에 다른 반려동물을 키우는 이웃이 있습니까?",
    index: 11,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "예, 많이 있다": [
          {
            key: "opennessToStrangers",
            description: "주변에 반려동물을 키우는 이웃이 많다면, 낯선 사람과 잘 어울릴 수 있는 강아지가 적합합니다.",
          },
          {
            key: "goodWithOtherPets",
            description: "다른 반려동물과의 사회성이 좋은 강아지를 고려하세요.",
          },
        ],
        "몇 명 있다": [
          {
            key: "goodWithOtherPets",
            description: "몇 명의 이웃이 반려동물을 키운다면, 다른 반려동물과 적절히 어울릴 수 있는 강아지가 좋습니다.",
          },
        ],
        "없다": [
          {
            key: "ownerRate",
            description: "다른 반려동물이 없는 환경에 적응하기 쉬운 강아지를 선택하세요.",
          },
        ],
        "잘 모르겠다": [
          {
            key: "opennessToStrangers",
            description: "강아지도 대인관계처럼 사회성이 중요합니다. 주변 환경을 더 알아보고, 강아지가 새로운 관계를 형성하기 쉬운 품종을 선택해 보세요.",
          },
        ],
      };
  
      return descriptions[answer] || [
        { key: "ownerRate", description: "이웃 환경에 적합한 강아지를 신중히 선택하세요." },
      ];
    },
  },
  
  dogSpentTime: {
    key: "dogSpentTime",
    question: "12. 하루 중 강아지에게 할애할 수 있는 시간은 얼마입니까?",
    index: 12,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "30분 이하": [
          {
            key: "affectionTowardsFamily",
            description: "강아지가 가족과의 교감 시간을 제한적으로 가질 수 있으므로, 독립성이 강한 품종을 고려하세요.",
          },
        ],
        "30분 ~ 1시간": [
          {
            key: "mentalStimulationNeed",
            description: "강아지와 적절한 시간 동안 상호작용이 가능하며, 중간 수준의 정신적 자극을 필요로 하는 강아지가 적합합니다.",
          },
        ],
        "1시간 이상": [
          {
            key: "affectionTowardsFamily",
            description: "강아지와의 교감 시간이 많아 애정이 깊은 품종이 잘 어울립니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        { key: "ownerRate", description: "강아지에게 할애할 수 있는 시간에 맞춰 품종을 선택하세요." },
      ];
    },
  },
  
  noiseLevel: {
    key: "noiseLevel",
    question: "13. 거주하는 집의 소음 수준은 어떻습니까?",
    index: 13,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "매우 조용하다": [
          {
            key: "barkingLevel",
            description: "조용한 환경에서는 짖는 소리가 적은 품종이 적합합니다.",
          },
        ],
        "적당하다": [
          {
            key: "adaptability",
            description: "적당한 소음 수준에 적응할 수 있는 강아지를 추천합니다.",
          },
        ],
        "소음이 많다": [
          {
            key: "adaptability",
            description: "소음에 민감하지 않은 강아지가 적합합니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        { key: "ownerRate", description: "주거 환경의 소음 수준을 고려하여 품종을 선택하세요." },
      ];
    },
  },

  musicPreference: {
    key: "musicPreference",
    question: "14. 주로 어떤 음악을 듣습니까?",
    index: 14,
    explanation: (answer: string) => {
        return [
          {
            key: "ownerRate",
            description: "음악 취향은 강아지 선택에 중요한 요소가 아닙니다. 그러나 취향과 생활 습관에 따라 강아지와의 조화가 달라질 수 있습니다.",
          },
        ];
      },
      
  },
  
  familyTime: {
    key: "familyTime",
    question: "15. 강아지와 가족이 함께 보내는 시간은 얼마나 되나요?",
    index: 15,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "1시간 미만": [
          {
            key: "affectionTowardsFamily",
            description: "가족과 보내는 시간이 부족하면 강아지가 정서적 스트레스를 받을 수 있습니다. 강아지의 외로움을 해소할 방법을 미리 계획해보세요.",
          },
        ],
        "1~2시간": [
          {
            key: "affectionTowardsFamily",
            description: "짧은 시간이지만 규칙적으로 강아지와 상호작용한다면, 강아지가 안정감을 느낄 수 있습니다.",
          },
        ],
        "2~4시간": [
          {
            key: "affectionTowardsFamily",
            description: "적당한 시간 동안 강아지와 함께할 수 있어 유대감을 쌓기에 충분합니다.",
          },
        ],
        "4~6시간": [
          {
            key: "affectionTowardsFamily",
            description: "강아지와 긴 시간을 함께 보내며 강한 유대감을 형성할 수 있습니다.",
          },
        ],
        "6시간 이상": [
          {
            key: "affectionTowardsFamily",
            description: "강아지와의 충분한 시간이 보장되어, 깊은 신뢰와 정서적 안정을 줄 수 있습니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "강아지와 보내는 시간은 유대감과 정서적 안정에 큰 영향을 미칩니다. 시간을 적절히 계획하는 것이 중요합니다.",
        },
      ];
    },
  },

  aloneTime: {
    key: "aloneTime",
    question: "16. 강아지가 혼자 있는 시간이 얼마나 될까요?",
    index: 16,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "6시간 이상": [
          {
            key: "adaptability",
            description: "혼자 있는 시간이 길다면, 독립적이고 적응력이 높은 강아지가 적합합니다.",
          },
          {
            key: "mentalStimulationNeed",
            description: "혼자 있는 동안 강아지가 지루하지 않도록 장난감같은 놀이감을 준비하세요.",
          },
        ],
        "3~6시간": [
          {
            key: "adaptability",
            description: "적당히 혼자 있는 시간을 가지는 강아지에게 안정적인 공간을 제공하세요.",
          },
        ],
        "1~3시간": [
          {
            key: "adaptability",
            description: "짧은 시간 혼자 있어도 잘 적응할 수 있는 강아지를 선택하는 것이 좋습니다.",
          },
        ],
        "거의 혼자 있지 않음": [
          {
            key: "adaptability",
            description: "항상 함께 있는 환경에서는 가족과의 유대감이 높은 강아지가 적합합니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "강아지가 혼자 있는 시간을 고려해 적합한 환경과 상호작용을 계획하세요.",
        },
      ];
    },
  },
  
  aloneTimeSolution: {
    key: "aloneTimeSolution",
    question: "17. 강아지가 혼자 있는 시간이 많을 경우, 어떻게 대처할 계획이 있으십니까?",
    index: 17,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "펫 시터 이용": [
          {
            key: "ownerRate",
            description: "펫 시터를 이용하는 것은 혼자 있는 강아지의 스트레스를 줄이는 좋은 방법입니다.",
          },
        ],
        "특별 계획 없음": [
          {
            key: "ownerRate",
            description: "특별한 계획이 없다면, 강아지가 느낄 수 있는 스트레스를 고려해 대안을 마련하는 것이 중요합니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "강아지가 혼자 있는 시간을 줄이고, 적합한 환경을 제공하기 위한 계획이 필요합니다.",
        },
      ];
    },
  },
  
  cleaningFrequency: {
    key: "cleaningFrequency",
    question: "18. 집 청소를 얼마나 자주 하시나요?",
    index: 18,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "거의 청소하지 않음": [
          {
            key: "ownerRate",
            description: "강아지의 털 빠짐이나 털 관리를 감당하기 어려울 수 있으니 털 빠짐이 적은 품종을 고려하세요.",
          },
        ],
        "주 1~2회": [
          {
            key: "ownerRate",
            description: "기본적인 털 관리가 가능하므로, 적당히 털 빠짐이 있는 강아지와도 잘 지낼 수 있습니다.",
          },
        ],
        "매일": [
          {
            key: "ownerRate",
            description: "매일 청소가 가능하면 털 관리가 필요한 강아지도 문제없을 것입니다.",
          },
        ],
        "하루에 여러 번": [
          {
            key: "ownerRate",
            description: "청소 빈도가 높아 털 빠짐이 많거나 관리가 까다로운 품종도 잘 돌볼 수 있습니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "청소 빈도는 강아지의 털 관리와 관련이 있으며, 자신의 생활 방식에 맞는 품종을 선택하세요.",
        },
      ];
    },
  },

  walkingPark: {
    key: "walkingPark",
    question: "19. 강아지를 산책시킬 수 있는 공원이나 산책로가 집 근처에 있습니까?",
    index: 19,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "매우 가깝다": [
          {
            key: "energyLevel",
            description: "산책로가 가깝다면 활동량이 높은 강아지와도 잘 어울릴 수 있습니다.",
          },
        ],
        "적당히 가깝다": [
          {
            key: "energyLevel",
            description: "적당히 가깝다면 중간 수준의 활동량을 가진 강아지를 고려할 수 있습니다.",
          },
        ],
        "멀리 있다": [
          {
            key: "energyLevel",
            description: "산책로가 멀다면 활동량이 적은 강아지가 더 적합할 수 있습니다.",
          },
        ],
        "없다": [
          {
            key: "energyLevel",
            description: "근처에 산책로가 없다면 강아지의 운동 부족을 실내 놀이로 보충하는 것이 중요합니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "산책로 접근성은 강아지의 운동과 활동량에 영향을 미칠 수 있습니다.",
        },
      ];
    },
  },

  walkingFrequency: {
    key: "walkingFrequency",
    question: "20. 강아지가 매일 산책을 얼마나 자주 해야 하길 원하십니까?",
    index: 20,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "필요하지 않음": [
          {
            key: "energyLevel",
            description: "산책이 필요하지 않길 원한다면 에너지가 낮은 강아지가 적합합니다.",
          },
        ],
        "하루에 한 번": [
          {
            key: "energyLevel",
            description: "하루 한 번 산책은 보통 에너지 수준의 강아지와 잘 맞습니다.",
          },
        ],
        "하루에 두 번 이상": [
          {
            key: "energyLevel",
            description: "하루 두 번 이상의 산책이 필요하다면 높은 에너지 수준의 강아지를 고려하세요.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "산책 빈도는 강아지의 에너지 수준과 라이프스타일에 적합하게 선택해야 합니다.",
        },
      ];
    },
  },

  cookingPreference: {
    key: "cookingPreference",
    question: "21. 요리하는 것을 좋아합니까?",
    index: 21,
    explanation: (answer: string) => {
      return [
        {
          key: "ownerRate",
          description:
            "요리는 강아지 선택에 중요하게 평가되지 않습니다. 하지만 강아지에게 직접 요리를 해준다면 좋은 유대관계를 형성할 수 있습니다.",
        },
      ];
    },
  },
  
  firstTimeOwner: {
    key: "firstTimeOwner",
    question: "22. 강아지를 처음 키우시나요?",
    index: 22,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "예": [
          {
            key: "ownerRate",
            description: "처음 강아지를 키우는 경우, 책임감과 준비가 중요합니다. 소형견이나 훈련이 쉬운 강아지부터 시작하는 것이 좋습니다.",
          },
          {
            key: "trainability",
            description: "훈련 경험이 없으므로, 훈련이 쉬운 강아지를 선택하는 것이 도움이 될 수 있습니다.",
          },
        ],
        "아니오": [
          {
            key: "ownerRate",
            description: "강아지를 키운 경험이 있어 책임감과 적응력이 높은 것으로 보입니다. 더 다양한 견종을 고려할 수 있습니다.",
          },
        ],
      };
  
      return descriptions[answer] || [];
    },
  },
  
  budgetForAdoption: {
    key: "budgetForAdoption",
    question: "23. 강아지를 입양하거나 구입할 수 있는 예산이 얼마입니까?",
    index: 23,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "10만 원 미만": [
          {
            key: "ownerRate",
            description: "예산이 부족할 경우, 강아지의 기본적인 필요를 충족하기 어렵거나 추가 비용이 부담스러울 수 있습니다. 신중히 계획하세요.",
          },
        ],
      };
  
      return descriptions[answer] || [];
    },
  },
  
  monthlyExpense: {
    key: "monthlyExpense",
    question: "24. 매달 강아지의 사료, 병원비, 용품비 등을 지출할 수 있는 금액은 얼마입니까?",
    index: 24,
    explanation: (answer: string) => {

      // 공통 설명 추가
      const generalInfo = {
        key: "ownerRate",
        description: "2024년 기준, 반려견 한 마리의 월평균 양육 비용은 약 16만 6,000원으로 조사되었습니다. 이 금액은 사료, 병원비, 용품비 등을 포함합니다. (출처: 아시아투데이)",
      };
  
      // 선택에 따른 설명과 공통 설명을 결합
      return [generalInfo];
    },
  },
  
  obedienceLevel: {
    key: "obedienceLevel",
    question: "25. 강아지가 얼마나 주인을 따르길 원하십니까?",
    index: 25,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "독립적인 성향을 원한다": [
          {
            key: "trainability",
            description: "독립적인 강아지는 훈련이 다소 어려울 수 있습니다. 충분한 인내와 노력이 필요합니다.",
          },
        ],
        "가끔은 독립적이고 가끔은 따랐으면 좋겠다": [
          {
            key: "trainability",
            description: "균형 잡힌 성향의 강아지는 적당한 훈련과 독립성을 유지할 수 있습니다.",
          },
        ],
        "주인을 잘 따르면서도 독립적인 성향을 가졌으면 좋겠다": [
          {
            key: "affectionTowardsFamily",
            description: "강아지가 가족과 유대감을 형성하면서도 적절히 독립적인 성향을 보일 것입니다.",
          },
        ],
        "주인을 거의 항상 따르길 원한다": [
          {
            key: "trainability",
            description: "훈련 가능성이 높은 강아지는 주인의 지시에 잘 따릅니다.",
          },
        ],
      };
  
      return descriptions[answer] || [];
    },
  },
  
  strangerCaution: {
    key: "strangerCaution",
    question: "26. 강아지가 낯선 사람을 얼마나 경계하길 원하십니까?",
    index: 26,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "거의 경계하지 않길 원한다": [
          {
            key: "opennessToStrangers",
            description: "낯선 사람에게도 친화적인 강아지는 새로운 환경에 적응하기 쉽습니다. 낯선 사람에게 친화적인 강아지는 손님이 자주 방문하거나 외부 활동이 많은 가정에 잘 어울립니다.",
          },
        ],
        "적당히 경계심을 가졌으면 좋겠다": [
          {
            key: "guardInstinct",
            description: "적당한 경계심은 가족을 보호하면서도 외부 환경에 쉽게 적응할 수 있는 강아지와의 균형을 제공합니다.",
          },
        ],
        "낯선 사람에게 경계심을 가졌으면 좋겠다": [
          {
            key: "guardInstinct",
            description: "높은 경계심을 가진 강아지는 보호자의 안전을 중요하게 여기며 방어적 성향을 보일 수 있습니다. 과도한 경계심이 사회화 과정에 영향을 미칠 수 있으니 훈련이 중요합니다.",
          },
        ],
      };
  
      return descriptions[answer] || [];
    },
  },
  
  interactionFrequency: {
    key: "interactionFrequency",
    question: "27. 강아지와 얼마나 자주 소통을 하고 싶은가요?",
    index: 27,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "거의 시간이 없다": [
          {
            key: "affectionTowardsFamily",
            description: "강아지와의 교류 시간이 적을 경우, 독립적이고 혼자서도 잘 지내는 강아지를 고려하세요.",
          },
        ],
        "자주 상호작용하며, 많이 시간을 보낼 수 있다": [
          {
            key: "mentalStimulationNeed",
            description: "강아지와 자주 교류한다면, 높은 정신적 자극과 에너지를 필요로 하는 강아지가 적합합니다.",
          },
        ],
      };
  
      return descriptions[answer] || [];
    },
  },
  
  trainingSpeed: {
    key: "trainingSpeed",
    question: "28. 강아지가 훈련에 얼마나 빠르게 적응하길 원하십니까?",
    index: 28,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "느리게 배워도 상관없다": [
          {
            key: "trainability",
            description: "훈련 속도가 느려도 괜찮다면, 차분하고 독립적인 성향의 강아지가 적합합니다.",
          },
        ],
        "적당한 시간 내에 배웠으면 좋겠다": [
          {
            key: "trainability",
            description: "적당한 훈련 시간을 원하면, 보통 수준의 학습 능력을 가진 강아지를 고려하세요.",
          },
        ],
        "빠르게 배웠으면 좋겠다": [
          {
            key: "trainability",
            description: "빠른 학습 능력을 원한다면, 훈련에 민감하고 높은 지능을 가진 강아지가 적합합니다.",
          },
        ],
      };
  
      return descriptions[answer] || [];
    },
  },
  patienceLevel: {
    key: "patienceLevel",
    question: "29. 훈련 도중 인내심을 얼마나 유지할 수 있습니까?",
    index: 29,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "인내심이 거의 없다": [
          {
            key: "trainability",
            description: "인내심이 부족할 경우, 간단한 훈련이나 독립적인 성향의 강아지가 적합합니다.",
          },
        ],
        "짧은 시간은 참을 수 있다": [
          {
            key: "trainability",
            description: "짧은 훈련 세션에 적응할 수 있는 강아지를 고려하세요.",
          },
        ],
        "평균적인 인내심이 있다": [
          {
            key: "trainability",
            description: "평균적인 인내심이 있다면, 훈련에 대한 강아지의 유연성과 상호작용이 중요합니다.",
          },
        ],
        "오랜 시간 참을 수 있다": [
          {
            key: "trainability",
            description: "오랜 인내심을 가지고 있다면, 높은 훈련 요구를 가진 강아지를 선택할 수 있습니다.",
          },
        ],
      };
  
      return descriptions[answer] || [];
    },
  },
    
  trainingExperience: {
    key: "trainingExperience",
    question: "30. 강아지를 훈련시킨 경험이 얼마나 있습니까?",
    index: 30,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "전혀 없다": [
          {
            key: "trainability",
            description: "훈련 경험이 없다면, 훈련이 쉬운 강아지를 선택하는 것이 좋습니다.",
          },
        ],
        "기본적인 훈련만 시켜본 적이 있다": [
          {
            key: "trainability",
            description: "기본 훈련 경험은 중간 수준의 강아지와 잘 어울립니다.",
          },
        ],
        "정기적으로 훈련을 시켜본 경험이 있다": [
          {
            key: "trainability",
            description: "정기적인 훈련 경험은 까다로운 성격의 강아지도 잘 다룰 수 있습니다.",
          },
        ],
        "전문적인 훈련 경험이 있다": [
          {
            key: "trainability",
            description: "전문적인 훈련 경험은 복잡한 훈련 요구를 가진 강아지와도 잘 어울립니다.",
          },
        ],
      };
  
      return descriptions[answer] || [];
    },
  },
  
  interactionImportance: {
    key: "interactionImportance",
    question: "31. 강아지와의 상호작용에서 무엇을 더 중요하게 생각하십니까?",
    index: 31,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "운동 및 활동적인 상호작용": [
          {
            key: "energyLevel",
            description: "활동적이고 운동을 좋아하는 강아지가 적합합니다. 함께 산책이나 운동을 즐길 수 있습니다.",
          },
          {
            key: "playfulnessLevel",
            description: "장난기 많고 활발한 강아지와의 상호작용이 즐거움을 더할 수 있습니다.",
          },
        ],
        "감정적인 상호작용": [
          {
            key: "affectionTowardsFamily",
            description: "가족과의 유대감이 강한 강아지가 적합합니다. 감정적인 안정감을 제공합니다.",
          },
          {
            key: "opennessToStrangers",
            description: "낯선 사람에게도 친근한 강아지가 감정적인 상호작용을 확대할 수 있습니다.",
          },
        ],
        "독립적인 성향을 존중": [
          {
            key: "trainability",
            description: "독립적인 성향을 가진 강아지는 혼자서도 잘 적응할 수 있습니다.",
          },
          {
            key: "mentalStimulationNeed",
            description: "정신적 자극이 적게 필요한 강아지가 독립적으로 시간을 보내기 좋습니다.",
          },
        ],
      };
  
      return descriptions[answer] || [];
    },
  },
  allergyConcern: {
    key: "allergyConcern",
    question: "32. 털 알레르기가 있거나 알레르기 걱정이 되십니까?",
    index: 32,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "예": [
          {
            key: "sheddingLevel",
            description: "털 알레르기가 있는 경우, 털 빠짐이 적은 강아지를 추천합니다.",
          },
          {
            key: "groomingNeed",
            description: "알레르기를 줄이기 위해 적은 털 관리가 필요한 강아지를 선택하는 것이 좋습니다.",
          },
        ],
      };
  
      return descriptions[answer] || [];
    },
  },
  droolingConcern: {
    key: "droolingConcern",
    question: "33. 강아지가 침을 많이 흘린다면, 얼마나 신경 쓰일 것 같습니까?",
    index: 33,
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "전혀 신경 쓰이지 않는다": [
          {
            key: "droolingLevel",
            description: "침 흘림에 민감하지 않으므로 강아지 선택에 큰 제약이 없습니다. 일부 강아지는 침이 많아도 건강에 이상이 없으니 선택 범위가 넓습니다.",
          },
        ],
        "약간 신경 쓰이지만 감수할 수 있다": [
          {
            key: "droolingLevel",
            description: "침 흘림이 많을 경우 바닥이나 가구를 자주 닦아야 할 수 있습니다. 적당히 침이 적은 강아지를 선택하면 관리 부담을 줄일 수 있습니다.",
          },
        ],
        "자주 닦아야 한다면 불편할 것 같다": [
          {
            key: "droolingLevel",
            description: "침 흘림이 적은 강아지를 추천해드렸습니다.",
          },
        ],
      };
  
      return descriptions[answer] || [];
    },
  },
  
  bathingFrequency: {
    key: "bathingFrequency",
    question: "34. 강아지를 얼마나 자주 목욕시킬 의향이 있습니까?",
    index: 34, // 순차적인 번호
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "매주": [
          {
            key: "groomingNeed",
            description: "매주 목욕은 필요 이상으로 강아지 피부를 건조하게 만들 수 있습니다. 목욕 후 보습 관리가 중요합니다.",
          },
        ],
        "매달": [
          {
            key: "groomingNeed",
            description: "매달 한 번 목욕은 대부분의 강아지에게 적합합니다. 강아지의 털과 피부 상태를 주기적으로 확인하세요.",
          },
        ],
        "필요할 때만": [
          {
            key: "groomingNeed",
            description: "강아지를 필요할 때만 목욕시키면, 냄새나 피부 질환의 원인이 될 수 있습니다. 적어도 2~3달에 한 번은 목욕을 권장합니다.",
          },
        ],
        "가능하면 자주 하지 않기를 원한다": [
          {
            key: "groomingNeed",
            description: "목욕 빈도가 너무 낮으면 피부 상태가 나빠질 수 있습니다. 필요시 물티슈나 드라이 샴푸를 활용하세요.",
          },
          {
            key: "ownerRate",
            description: "목욕을 최소화하려면 강아지의 환경과 털 상태를 더 세심히 관리해야 합니다.",
          },
        ],
      };
  
      // 기본 설명 반환
      return descriptions[answer] || [
        {
          key: "general",
          description: "강아지의 건강과 털 상태에 맞는 적절한 목욕 빈도를 유지하세요.",
        },
      ];
    },
  },

  groomingFrequency: {
    key: "groomingFrequency",
    question: "35. 강아지의 털을 얼마나 자주 손질할 의향이 있으십니까?",
    index: 35, // 순차적인 번호
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "매일 빗질 및 관리": [
          {
            key: "groomingNeed",
            description: "매일 털을 관리하면 털 엉킴 방지와 피부 건강 유지에 매우 유리합니다. 털이 길거나 이중모를 가진 강아지에게 적합합니다.",
          },
        ],
        "일주일에 2~3회 빗질": [
          {
            key: "groomingNeed",
            description: "일주일에 2~3회 빗질은 일반적으로 털이 짧거나 관리가 쉬운 강아지에게 적합합니다.",
          },
        ],
        "가끔 빗질 (일주일에 1회 이하)": [
          {
            key: "groomingNeed",
            description: "빗질 빈도가 낮으면 털 엉킴이나 피부 문제 발생 가능성이 높습니다. 털 관리가 적은 품종을 선택하는 것이 좋습니다.",
          },
        ],
        "털 관리가 적게 필요했으면 좋겠다": [
          {
            key: "groomingNeed",
            description: "털 관리가 적은 강아지는 일반적으로 짧은 털을 가진 품종이 적합합니다. 그러나 털갈이 시기에는 추가 관리가 필요할 수 있습니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "강아지의 털 관리 빈도는 품종과 생활 방식에 맞게 신중히 결정하세요.",
        },
      ];
    },
  },
  
  coatPreference: {
    key: "coatPreference",
    question: "36. 강아지의 털 유형 중 어떤 것을 선호하십니까?",
    index: 36, // 순차적인 번호
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "짧고 관리가 쉬운 털": [
          {
            key: "groomingNeed",
            description: "짧고 관리가 쉬운 털은 빗질과 목욕 빈도가 적어도 청결을 유지할 수 있습니다. 바쁜 생활을 하는 사람들에게 적합합니다.",
          },
          {
            key: "sheddingLevel",
            description: "짧은 털은 털 빠짐이 평균 수준으로, 청소와 관리를 적절히 신경 써야 합니다.",
          },
        ],
        "부드럽고 길게 자라는 털": [
          {
            key: "groomingNeed",
            description: "부드럽고 긴 털은 엉킴 방지를 위해 자주 빗질과 정기적인 미용이 필요합니다. 시간이 더 들지만 외모 관리에 적합합니다.",
          },
          {
            key: "sheddingLevel",
            description: "긴 털은 털 빠짐이 많을 수 있으므로, 정기적인 청소와 추가적인 털 관리가 필요합니다.",
          },
        ],
        "털이 거의 없는 무모견": [
          {
            key: "groomingNeed",
            description: "무모견은 털 관리가 거의 필요하지 않으나, 피부 보호를 위해 보습제나 자외선 차단제가 필요할 수 있습니다.",
          },
          {
            key: "sheddingLevel",
            description: "무모견은 털 빠짐이 거의 없으므로, 청소와 관리 부담이 적습니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "강아지의 털 유형은 생활 방식과 선호도에 맞춰 신중히 선택하세요.",
        },
      ];
    },
  },
  
  coatLength: {
    key: "coatLength",
    question: "37. 강아지의 털 길이 중 어느 것을 선호하십니까?",
    index: 37, // 순차적인 번호
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "짧은 털": [
          {
            key: "groomingNeed",
            description: "짧은 털은 빗질과 관리가 비교적 간단하며, 청소 부담도 적습니다. 관리 시간이 부족한 사람들에게 적합합니다.",
          },
        ],
        "중간 길이의 털": [
          {
            key: "groomingNeed",
            description: "중간 길이의 털은 주기적인 빗질이 필요하며, 엉킴 방지와 털 빠짐 관리를 위해 약간의 시간을 투자해야 합니다.",
          },
        ],
        "긴 털": [
          {
            key: "groomingNeed",
            description: "긴 털은 자주 빗질과 정기적인 미용이 필요합니다. 털 엉킴 방지와 깔끔한 외모 유지를 위해 시간과 노력이 요구됩니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "강아지의 털 길이는 선호도와 관리 가능성에 따라 신중히 결정하세요.",
        },
      ];
    },
  },
  
  dogSize: {
    key: "dogSize",
    question: "어떤 크기의 강아지를 선호하십니까?",
    index: 38, // 순차적인 번호
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "소형견": [
          {
            key: "smallDogScore",
            description: "소형견은 작은 공간에서도 잘 적응하며, 관리와 이동이 용이합니다. 그러나 부주의로 인한 부상의 위험이 있어 주의가 필요합니다.",
          },
        ],
        "중형견": [
          {
            key: "mediumDogScore",
            description: "중형견은 적당한 운동량과 공간이 필요하며, 가족과의 활동에 적합합니다. 다양한 생활 환경에 잘 적응할 수 있습니다.",
          },
        ],
        "대형견": [
          {
            key: "largeDogScore",
            description: "대형견은 더 넓은 공간과 많은 운동량이 필요하며, 충분한 훈련과 사육 경험이 중요합니다. 대형견은 가족 보호 본능이 강할 수 있습니다.",
          },
          {
            key: "extraLargeDogScore",
            description: "대형견 이상은 큰 공간과 추가적인 관리 노력이 필요하니, 생활 환경을 신중히 고려하세요.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "강아지 크기는 선호도뿐만 아니라 생활 환경과 관리 가능성에 맞춰 신중히 결정하세요.",
        },
      ];
    },
  },
  
  barkingPreference: {
    key: "barkingPreference",
    question: "강아지가 언제 짖으면 좋겠나요?",
    index: 39, // 순차적인 번호
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "필요한 경우에만 짖는다": [
          {
            key: "barkingLevel",
            description: "짖음이 적은 강아지는 조용한 환경에서 이상적이며, 이웃과의 갈등을 줄일 수 있습니다.",
          },
        ],
        "경고나 흥분할 때만 짖는다": [
          {
            key: "barkingLevel",
            description: "경고나 흥분 상황에서만 짖는 강아지는 적당한 경계 본능을 가지고 있으며, 가족을 보호하는 데 적합합니다.",
          },
          {
            key: "guardInstinct",
            description: "이러한 강아지는 보호 본능을 발휘하며, 지나친 짖음은 훈련을 통해 조절 가능합니다.",
          },
        ],
        "다양한 상황에서 짖는다": [
          {
            key: "barkingLevel",
            description: "짖음이 많은 강아지는 외부 소음에 민감하며, 경고 및 의사소통을 위해 자주 짖습니다.",
          },
          {
            key: "guardInstinct",
            description: "높은 경계 본능을 가진 강아지는 보호자와 가족을 보호하는 데 탁월하지만, 짖음 관리를 위한 훈련이 필요합니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "강아지의 짖음은 가족의 생활 방식과 주변 환경에 적합하도록 선택해야 합니다.",
        },
      ];
    },
  },
  
  playfulnessPreference: {
    key: "playfulnessPreference",
    question: "강아지의 장난기 수준을 얼마나 원하십니까?",
    index: 40, // 순차적인 번호
    explanation: (answer: string) => {
      const descriptions: Record<string, { key: string; description: string }[]> = {
        "장난기가 많아 자주 놀고 싶다": [
          {
            key: "playfulnessLevel",
            description:
              "장난기가 많은 강아지는 에너지 넘치는 활동과 놀이를 즐기며, 주인의 적극적인 상호작용이 필요합니다.",
          },
          {
            key: "mentalStimulationNeed",
            description:
              "놀이를 통해 정신적 자극을 제공하면 강아지의 스트레스를 줄이고, 유대감을 강화할 수 있습니다.",
          },
        ],
        "적당히 장난기가 있다": [
          {
            key: "playfulnessLevel",
            description:
              "적당한 장난기를 가진 강아지는 균형 잡힌 성향을 보이며, 주기적인 놀이와 활동에 적응하기 좋습니다.",
          },
          {
            key: "mentalStimulationNeed",
            description:
              "정기적인 놀이와 산책으로 강아지와의 관계를 유지하고 긍정적인 행동을 강화할 수 있습니다.",
          },
        ],
        "조용하고 장난기가 적다": [
          {
            key: "playfulnessLevel",
            description:
              "조용하고 장난기가 적은 강아지는 독립적인 성향을 보이며, 차분한 환경에 잘 어울립니다.",
          },
          {
            key: "energyLevel",
            description:
              "낮은 에너지 수준을 가진 강아지는 활동 요구가 적어, 조용한 생활 방식을 선호하는 가족에게 적합합니다.",
          },
        ],
      };
  
      return descriptions[answer] || [
        {
          key: "general",
          description: "강아지의 장난기 수준은 가족의 생활 방식과 에너지 수준에 따라 고려해야 합니다.",
        },
      ];
    },
  },
  
  
  // 다른 질문 추가 가능
};
