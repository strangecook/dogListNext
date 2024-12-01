export const getScoreExplanation = (scoreKey: string, userScore: number): string => {
  switch (scoreKey) {
    case 'adaptability':
      return adaptabilityExplanation(userScore);
    case 'affectionTowardsFamily':
      return affectionExplanation(userScore);
    case 'goodWithOtherPets':
      return otherDogsExplanation(userScore);
    case 'suitableForChildren':
      return youngChildrenExplanation(userScore);
    case 'energyLevel':
      return energyExplanation(userScore);
    case 'trainability':
      return trainabilityExplanation(userScore);
    case 'barkingLevel':
      return barkingExplanation(userScore);
    case 'sheddingLevel':
      return sheddingExplanation(userScore);
    case 'groomingNeed':
      return groomingExplanation(userScore);
    case 'droolingLevel':
      return droolingExplanation(userScore);
    case 'opennessToStrangers':
      return opennessToStrangersExplanation(userScore);
    case 'playfulnessLevel':
      return playfulnessExplanation(userScore);
    case 'guardInstinct':
      return guardInstinctExplanation(userScore);
    case 'mentalStimulationNeed':
      return mentalStimulationExplanation(userScore);
    default:
      return '이 항목에 대한 설명은 준비 중입니다.';
  }
};
  
  // 각 항목에 대한 세부 함수 정의
  const adaptabilityExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '환경 변화에 매우 민감하며, 지속적인 관리와 세심한 주의가 필요합니다.';
      case 2:
        return '변화에 민감하며, 적응 과정에서 약간의 스트레스를 받을 수 있습니다.';
      case 3:
        return '환경 변화에 다소 시간이 필요하지만, 대부분 큰 문제는 없습니다.';
      case 4:
        return '환경 변화에 비교적 잘 적응하며, 새로운 환경에 빠르게 익숙해질 수 있습니다.';
      case 5:
        return '다양한 환경에서도 빠르게 적응하며, 안정적이고 차분한 모습을 보입니다.';
      default:
        return '적응력 점수에 대한 정보가 없습니다.';
    }
  };
  
  // 다른 항목도 동일하게 정의
  const affectionExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '가족과의 애정이 적으며, 독립적인 성향을 보입니다.';
      case 2:
        return '가족과의 애정이 제한적이며, 간단한 상호작용만 즐깁니다.';
      case 3:
        return '가족과의 애정이 보통이며, 적당한 상호작용을 즐깁니다.';
      case 4:
        return '가족과의 애정이 많으며, 지속적인 상호작용을 즐깁니다.';
      case 5:
        return '가족과의 애정이 매우 많으며, 끊임없는 애정을 필요로 합니다.';
      default:
        return '가족과의 애정 점수에 대한 정보가 없습니다.';
    }
  };
  
  const otherDogsExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '다른 반려견과 잘 어울리지 않으며, 공격적일 수 있습니다.';
      case 2:
        return '다른 반려견과의 상호작용이 제한적이며, 주의가 필요합니다.';
      case 3:
        return '다른 반려견과 무난히 상호작용하며, 관찰이 필요합니다.';
      case 4:
        return '다른 반려견과의 상호작용이 좋으며, 우호적입니다.';
      case 5:
        return '모든 반려견과 잘 어울리며, 매우 친화적인 성격입니다.';
      default:
        return '다른 개와의 친화력 점수에 대한 정보가 없습니다.';
    }
  };
  
  const youngChildrenExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '자녀와의 상호작용에 민감하거나 공격적인 성향을 보일 수 있습니다.';
      case 2:
        return '자녀와의 상호작용이 제한적이며, 관찰이 필요합니다.';
      case 3:
        return '자녀와의 상호작용이 무난하며, 적절한 관찰이 필요합니다.';
      case 4:
        return '자녀와 우호적이며, 안전하게 어울릴 수 있습니다.';
      case 5:
        return '자녀와 매우 친밀하게 지낼 수 있으며, 안전한 관계를 형성합니다.';
      default:
        return '아이와의 친화력 점수에 대한 정보가 없습니다.';
    }
  };
  
  const energyExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '매우 낮은 에너지 수준으로, 대부분의 시간을 조용히 보냅니다.';
      case 2:
        return '낮은 에너지 수준으로, 간단한 활동으로도 만족합니다.';
      case 3:
        return '보통 수준의 에너지로, 정기적인 운동이 필요합니다.';
      case 4:
        return '높은 에너지 수준으로, 많은 운동과 활동을 요구합니다.';
      case 5:
        return '매우 높은 에너지 수준으로, 지속적인 활동이 필요합니다.';
      default:
        return '에너지 수준 점수에 대한 정보가 없습니다.';
    }
  };
  
  const trainabilityExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '훈련이 매우 어려우며, 많은 인내심이 필요합니다.';
      case 2:
        return '훈련이 어렵지만, 반복 연습을 통해 개선될 수 있습니다.';
      case 3:
        return '보통 수준의 훈련 가능성을 가지며, 기본 훈련은 가능합니다.';
      case 4:
        return '훈련이 쉬운 편이며, 명령을 잘 따릅니다.';
      case 5:
        return '훈련이 매우 쉽고, 빠르게 학습할 수 있습니다.';
      default:
        return '훈련 가능성 점수에 대한 정보가 없습니다.';
    }
  };
  
  const barkingExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '거의 짖지 않으며, 매우 조용한 편입니다.';
      case 2:
        return '필요한 경우에만 짖으며, 대체로 조용합니다.';
      case 3:
        return '보통 수준으로, 특정 상황에서만 짖습니다.';
      case 4:
        return '자주 짖으며, 주의를 끌거나 경고의 목적으로 짖을 수 있습니다.';
      case 5:
        return '매우 자주 짖으며, 통제가 필요할 수 있습니다.';
      default:
        return '짖는 수준 점수에 대한 정보가 없습니다.';
    }
  };
  
  const sheddingExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '털 빠짐이 거의 없으며, 관리가 매우 쉽습니다.';
      case 2:
        return '가끔씩 털이 빠지며, 적당한 관리가 필요합니다.';
      case 3:
        return '보통 수준으로 털이 빠지며, 정기적인 관리가 필요합니다.';
      case 4:
        return '자주 털이 빠지며, 청소와 관리가 필요합니다.';
      case 5:
        return '매우 자주 털이 빠지며, 빈번한 관리가 필요합니다.';
      default:
        return '털 빠짐 정도 점수에 대한 정보가 없습니다.';
    }
  };
  
  const groomingExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '손질이 거의 필요하지 않으며, 매우 관리가 쉽습니다.';
      case 2:
        return '간단한 손질만 필요하며, 주기적인 관리를 통해 유지할 수 있습니다.';
      case 3:
        return '보통 수준의 손질이 필요하며, 정기적인 관리를 권장합니다.';
      case 4:
        return '자주 손질이 필요하며, 꾸준한 관리가 요구됩니다.';
      case 5:
        return '매우 빈번한 손질이 필요하며, 전문가의 관리가 필요할 수 있습니다.';
      default:
        return '손질 필요 점수에 대한 정보가 없습니다.';
    }
  };
  
  const droolingExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '침 흘림이 거의 없으며, 깔끔한 편입니다.';
      case 2:
        return '드물게 침을 흘리며, 관리가 간단합니다.';
      case 3:
        return '보통 수준의 침 흘림으로, 간단한 관리가 필요합니다.';
      case 4:
        return '자주 침을 흘리며, 지속적인 청결 관리가 필요합니다.';
      case 5:
        return '매우 자주 침을 흘리며, 빈번한 청소와 관리가 필요합니다.';
      default:
        return '침 흘림 점수에 대한 정보가 없습니다.';
    }
  };
  
  const opennessToStrangersExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '낯선 사람을 매우 경계하며, 시간이 많이 필요합니다.';
      case 2:
        return '낯선 사람에게 다소 경계하지만, 적응할 수 있습니다.';
      case 3:
        return '보통 수준으로 낯선 사람에게 친근하게 다가갑니다.';
      case 4:
        return '낯선 사람과 빠르게 친해질 수 있으며, 우호적입니다.';
      case 5:
        return '낯선 사람과 매우 친밀하게 지낼 수 있으며, 사교적입니다.';
      default:
        return '낯선 사람에 대한 개방성 점수에 대한 정보가 없습니다.';
    }
  };
  
  const playfulnessExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '놀이에 거의 관심이 없으며, 조용한 활동을 선호합니다.';
      case 2:
        return '가끔씩 놀이를 즐기며, 간단한 활동을 좋아합니다.';
      case 3:
        return '보통 수준으로 놀이를 즐기며, 적당한 활동이 필요합니다.';
      case 4:
        return '활발하게 놀이를 즐기며, 많은 활동을 요구합니다.';
      case 5:
        return '매우 활발하게 놀이를 즐기며, 지속적인 활동이 필요합니다.';
      default:
        return '놀이 성향 점수에 대한 정보가 없습니다.';
    }
  };
  
  const guardInstinctExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '경비 본능이 거의 없으며, 친근한 성향을 보입니다.';
      case 2:
        return '약간의 경비 본능이 있으며, 특정 상황에서 경계합니다.';
      case 3:
        return '보통 수준의 경비 본능으로, 낯선 상황에서 반응합니다.';
      case 4:
        return '강한 경비 본능이 있으며, 보호자 역할을 잘 수행합니다.';
      case 5:
        return '매우 강한 경비 본능으로, 뛰어난 경계심을 보입니다.';
      default:
        return '경비 본능 점수에 대한 정보가 없습니다.';
    }
  };
  
  const mentalStimulationExplanation = (score: number): string => {
    switch (score) {
      case 1:
        return '정신적 자극이 거의 필요하지 않으며, 간단한 활동으로도 만족합니다.';
      case 2:
        return '적당한 정신적 자극이 필요하며, 가벼운 놀이를 좋아합니다.';
      case 3:
        return '보통 수준의 정신적 자극이 필요하며, 다양한 활동을 즐깁니다.';
      case 4:
        return '많은 정신적 자극이 필요하며, 복잡한 활동을 좋아합니다.';
      case 5:
        return '매우 높은 정신적 자극이 필요하며, 지속적으로 새로운 활동을 요구합니다.';
      default:
        return '정신적 자극 점수에 대한 정보가 없습니다.';
    }
  };
  
  // 나머지도 동일한 방식으로 분리
  