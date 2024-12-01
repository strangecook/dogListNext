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
  
  // 다른 질문 추가 가능
};
