import styled from 'styled-components';

export const DetailContainer = styled.div`
  max-width: 800px;
  margin: 80px auto 20px auto;
  padding: 20px;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const SliderContainer = styled.div`
  .slick-slide img {
    display: block;
    margin: auto;
  }
`;

export const SingleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

export const LoaderDiv = styled.div`
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const BarContainer = styled.div`
  display: grid;
  grid-template-columns: 40px 120px 1fr;
  gap: 8px;
  align-items: center;
  margin: 8px 0;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 0.8em;
`;

export const Emoji = styled.span`
  text-align: center;
`;

export const Label = styled.span`
  text-align: left;
  white-space: nowrap; 
`;

export const BarWrapper = styled.div`
  width: 100%;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
`;

export const Bar = styled.div<{ width: string; reverse?: string }>`
  width: ${props => props.width};
  height: 12px;
  background-color: ${props => {
    const numericWidth = parseFloat(props.width);
    if (props.reverse === "true") {
      if (numericWidth <= 40) return '#4caf50';
      if (numericWidth <= 75) return '#FFC924';
      return '#FF4742';
    } else {
      if (numericWidth <= 20) return '#FF4742';
      if (numericWidth <= 50) return '#FFC924';
      return '#4caf50';
    }
  }};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: width 0.5s ease-in-out;
`;

export const BarSection = styled.div`
  width: 100%;
  margin: 10px 0;
  padding: 0 5px;
`;

export const CoatTypeWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3열 그리드 */
  gap: 10px;
  font-family: 'Nanum Gothic', sans-serif;
`;

export const CoatTypeItem = styled.div<{ selected: boolean }>`
  padding: 15px;
  border: 2px solid ${(props) => (props.selected ? '#0056b3' : '#ddd')};
  color: ${(props) => (props.selected ? '#0056b3' : '#ccc')};
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#e6f0ff' : '#fff')};
  text-align: center;
  font-size: 1em;
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selected ? '#dce9ff' : '#f9f9f9')};
  }
`;

// 털 타입 목록을 보여줄 제목
export const CoatTypeTitle = styled.h3`
  font-size: 1.2em;
  color: #333;
  margin-bottom: 10px;
`;

// 털 타입에 대한 설명 스타일링
export const CoatTypeDescription = styled.p`
  font-size: 1em;
  color: #555;
  margin-top: 20px;
`;

// 털 타입 목록을 상수로 정의
export const coatTypes = [
  '뻣뻣한 털',
  '무모',
  '매끈한 털',
  '거친 털',
  '꼬인 털',
  '이중 털',
  '곱슬 털',
  '물결 털',
  '비단 털'
] as const; // 'as const'로 배열을 리터럴 타입으로 설정

// CoatType 타입 정의 (위의 coatTypes 값들을 자동으로 타입으로 만듦)
type CoatType = typeof coatTypes[number];

// 털 타입에 대한 설명 데이터
export const coatTypeDescriptions: Record<CoatType, string> = {
  '뻣뻣한 털': "뻣뻣하고 거친 질감의 털로 주기적인 그루밍이 필요하며, 대부분의 경우 털 빠짐이 적습니다.",
  '무모': "털이 거의 없거나 없는 강아지로, 피부 관리가 매우 중요합니다.",
  '매끈한 털': "매끈하고 짧은 털로 관리가 쉬우며 털 빠짐이 적습니다.",
  '거친 털': "거칠고 길이가 긴 털로, 주기적인 그루밍과 빗질이 필요합니다.",
  '꼬인 털': "꼬인 형태의 털로 관리가 복잡하며, 빗질보다는 털 가닥을 형성하는 관리가 필요합니다.",
  '이중 털': "이중 털로, 속털과 겉털이 따로 있으며, 계절별로 털갈이가 많이 발생합니다.",
  '곱슬 털': "곱슬거리는 형태의 털로, 주기적인 빗질과 그루밍이 필요합니다.",
  '물결 털': "물결 모양의 털로, 관리가 필요하며 때때로 털 빠짐이 있을 수 있습니다.",
  '비단 털': "매우 부드럽고 비단처럼 얇은 털로 주기적인 그루밍이 요구됩니다."
};