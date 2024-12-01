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

  
  // 다른 질문 추가 가능
};
