// 질문과 점수 항목 매핑 데이터
export const surveyQuestionMapping: Record<
  string,
  {
    question: string; // 질문 텍스트
    explanation: (answer: string) => { key: string; description: string }[]; // 점수 항목과 설명 리스트 반환
  }
> = {
  age: {
    question: "// 1. 나이가 몇 세이신가요?",
    explanation: (answer) => {
      if (answer === "20대") {
        return [
          { key: "energyLevel", description: "20대는 높은 에너지를 가진 강아지를 추천합니다." },
          { key: "trainability", description: "훈련이 빠르게 가능한 강아지를 추천합니다." },
        ];
      } else if (answer === "50대") {
        return [
          { key: "energyLevel", description: "50대는 낮은 에너지를 가진 강아지를 추천합니다." },
          { key: "affectionTowardsFamily", description: "가족과의 애정도가 높은 강아지를 추천합니다." },
        ];
      }
      return [
        { key: "energyLevel", description: "연령에 따라 적절한 에너지를 가진 강아지를 추천합니다." },
      ];
    },
  },
  // 다른 질문 추가 가능
};
