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
  // 다른 질문 추가 가능
};
