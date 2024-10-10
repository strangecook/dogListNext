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

export const SectionTitle = styled.h2`
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

// 털 타입에 대한 설명 데이터
export const coatTypeDescriptions: { [key: string]: string } = {
  '뻣뻣한 털': '뻣뻣하고 거친 질감의 털은 대체로 털 빠짐이 적지만, 주기적인 빗질이 필요합니다. 특히 엉킬 가능성이 있어 꼼꼼한 관리가 요구됩니다. 이 견종들은 대체로 외부 활동에 강하며, 털이 더러워지거나 먼지가 붙는 일이 적습니다.',
  '무모': '무모는 털이 거의 없거나 아예 없는 견종으로, 피부 관리가 매우 중요합니다. 피부가 직접적으로 외부 환경에 노출되기 때문에 자외선 차단제 사용과 보습 관리가 필수적입니다. 또한, 무모 견종은 추위에 민감할 수 있어 겨울철에 특별한 보호가 필요합니다.',
  '매끈한 털': '매끈하고 짧은 털을 가진 견종은 유지 관리가 매우 쉽습니다. 털이 짧아 엉키지 않으며 털 빠짐이 적어, 실내에서 기르기에 적합합니다. 털 자체에 윤기가 있어 외관상 깔끔한 인상을 주며, 가벼운 그루밍으로 충분합니다.',
  '거친 털': '거친 털은 길고 뻣뻣한 질감을 가지며, 주기적인 빗질과 그루밍이 필요합니다. 엉킴을 방지하기 위해 매일 손질해주는 것이 좋으며, 장기간 방치할 경우 털이 뭉칠 수 있습니다. 이런 견종들은 보통 외부 활동을 즐기는 경우가 많으며, 털이 방어막 역할을 합니다.',
  '꼬인 털': '꼬인 형태의 털은 유지 관리가 까다로우며, 정기적인 손질이 필요합니다. 빗질보다는 털을 한 가닥씩 풀어주는 관리가 필수적이며, 전문가의 손길이 요구됩니다. 털이 엉키기 쉽고 피부에 자극을 줄 수 있어 세심한 관리가 필요합니다.',
  '이중 털': '이중 털을 가진 견종들은 속털과 겉털을 가지고 있어 계절별로 털갈이가 심하게 일어납니다. 특히 봄과 가을에 털갈이가 집중되며, 이 시기에는 털이 많이 빠져 주기적인 빗질이 필수적입니다. 이중 털은 체온 조절에 도움을 주며, 더운 날씨와 추운 날씨 모두에서 방어막 역할을 합니다.',
  '곱슬 털': '곱슬거리는 형태의 털은 정기적인 빗질과 손질이 필요하며, 털 빠짐이 적은 편입니다. 그러나 곱슬 털은 잘 엉킬 수 있어 관리가 매우 중요합니다. 꾸준한 그루밍과 다듬기가 필요하며, 습도나 환경에 따라 털 상태가 달라질 수 있습니다.',
  '물결 털': '물결 모양의 털은 특유의 부드러운 텍스처를 가지고 있으며, 관리가 필요합니다. 물결 털은 정기적인 빗질로 관리해줘야 하며, 엉킴을 방지하기 위한 세심한 손질이 요구됩니다. 털이 얇고 부드러워 더러움이 쉽게 쌓일 수 있습니다.',
  '비단 털': '비단처럼 부드러운 털을 가진 견종은 매우 얇고 고운 털을 가지고 있어 주기적인 그루밍이 필요합니다. 이러한 털은 환경에 민감하고 엉키기 쉬워 지속적인 관리가 필수적입니다. 또한, 비단 털은 외부 자극에 민감해 쉽게 더러워질 수 있어 자주 손질해줘야 합니다.',
};

export const BreedGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
`;

export const BreedGroupItem = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.selected ? '#f0a500' : '#f5f5f5')};
  color: ${(props) => (props.selected ? '#fff' : '#333')};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? '#d88f00' : '#e0e0e0')};
  }
`;

export const CoatLengthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px 0;
`;

export const CoatLengthItem = styled.div<{ selected: boolean }>`
width: 66px;
  padding: 8px 16px;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.selected ? '#4CAF50' : '#f5f5f5')};
  color: ${(props) => (props.selected ? '#fff' : '#333')};
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? '#388E3C' : '#e0e0e0')};
  }
`;

export const CoatLengthVisualizer = styled.div<{ selected: boolean, lengthCm: number }>`
  width: ${(props) => props.lengthCm * 37.8}px;
  height: 10px;
  background: ${(props) => (props.selected ? 
    '#FF9800' :  /* 선택 시 밝은 주황색 */
    '#f5f5f5')};  /* 선택되지 않았을 때 기본 색상 */
  background-size: cover;
  border-radius: 10px;
  margin: 10px 0;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? '#FF5722' : '#d88f00')}; /* 선택되었을 때 짙은 주황색, 선택되지 않았을 때 따뜻한 주황색 */
  }

  @media (max-width: 768px) {
    // 모바일에서 10cm만 예외 처리하여 100% 너비로 설정
    width: ${(props) => (props.lengthCm === 10 ? '100%' : `${props.lengthCm * 37.8}px`)};
  }
`;

export const breedGroupDescriptions: { [key: string]: string } = {
  '허딩': '주로 가축을 몰고 관리하는 목양견들로, 높은 지능과 순발력을 자랑하며 훈련이 용이합니다. 사람들과 강한 유대감을 형성하며, 작업 능력이 뛰어납니다.',
  '하운드': '사냥을 위한 견종으로, 후각이나 시각을 이용해 사냥감을 추적합니다. 독립적이면서도 활발한 성향이 강하며, 긴 거리 이동에 적합한 체력을 가졌습니다.',
  '워킹': '경비, 구조 등 중요한 역할을 맡는 견종으로, 튼튼한 체구와 근육질의 몸을 가지고 있습니다. 신뢰성과 인내심이 뛰어나며, 큰 몸집을 가진 경우가 많습니다.',
  '테리어': '작은 동물을 잡거나 해충을 퇴치하기 위한 용도로 길러진 견종으로, 용감하고 끈질긴 성격을 가졌습니다. 매우 활동적이고 강한 독립심을 가집니다.',
  '토이': '반려견으로서 사랑받는 작은 견종으로, 작고 귀여운 외모를 가졌지만 에너지 넘치는 성격을 지닙니다. 주로 실내 생활에 적합하며 사람과의 상호작용을 즐깁니다.',
  '스포팅': '사냥을 보조하는 견종으로, 후각과 시각이 뛰어나며 주로 물새나 작은 동물을 사냥하는 데 도움을 줍니다. 매우 활발하고 훈련에 잘 반응합니다.',
  '논스포팅': '특정한 작업 기능 없이 다양한 목적을 위해 길러진 견종들로, 크기와 성격이 매우 다양합니다. 주로 반려견이나 다목적 견종으로 활용됩니다.',
  '스피츠': '추운 기후에서 자란 견종으로 두꺼운 이중모를 가졌으며, 독립적이고 강한 성격을 지닙니다. 북극과 고산지대에서 일한 역사를 가지고 있으며, 경계심이 강한 편입니다.',
};


export const GroupDescriptionContainer = styled.div`
  margin: 30px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  line-height: 1.6;
`;

export const GroupDescriptionTitle = styled.h4`
  margin-top: 10px;
  font-weight: bold;
  color: #333;
`;

export const GroupDescriptionText = styled.p`
  margin: 0;
  color: #555;
`;

export const coatLengthDescriptions: { [key: string]: string } = {
  '짧은': '짧은 털을 가진 견종은 유지 관리가 용이하며 그루밍 빈도가 적습니다. 주로 실내 생활에 적합합니다.',
  '중간': '중간 길이의 털을 가진 견종은 적당한 그루밍이 필요하며 털 빠짐이 어느 정도 있을 수 있습니다.',
  '긴': '긴 털을 가진 견종은 정기적인 그루밍이 필수이며 털 관리가 매우 중요합니다. 실내외 활동 모두 적합합니다.',
};

export const Divider = styled.div`
  border-bottom: 1px solid #ddd;
  margin: 20px 0;
`;

export const StyledGroupDescriptionTitle = styled.h3`
  font-size: 1.5em; /* 제목의 크기를 좀 더 크게 */
  margin-bottom: 12px; /* 제목과 내용 사이에 여백 */
  color: #333; /* 좀 더 진한 글씨 색상 */
`;

export const StyledSection = styled.section`
  margin-bottom: 20px; /* 각 섹션 간의 여백 */
  line-height: 1.6;    /* 텍스트의 줄 간격 */
`;

// 텍스트 스타일 정의
export const StyledText = styled.p`
  font-size: 1em; /* 기본 텍스트 크기 */
  margin-bottom: 12px; /* 문단 사이 여백 */
  color: #555; /* 부드러운 글씨 색상 */
  letter-spacing: 0.5px; /* 글자 간격 조정 */
  line-height: 1.8; /* 행간을 넉넉히 */
`;

// 강조 텍스트 (strong) 스타일 정의
export const StyledStrongText = styled.strong`
  font-weight: bold;
  color: #000; /* 강조된 글씨 색상 */
`;

export const TooltipContainer = styled.div`
  position: relative;
`;

export const TooltipButton = styled.button`
  background-color: #4caf50;
  color: white; /* 텍스트 색상을 흰색으로 */
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease; /* 부드러운 전환 효과 */

  &:hover {
    background-color: #388e3c; /* hover 상태에서 더 진한 초록색 */
  }
`;

export const TooltipContent = styled.div`
  position: absolute;
  right: 100%; /* 툴팁이 버튼의 왼쪽에 위치하도록 설정 */
  top: 0;
  margin-right: 10px; /* 버튼과 툴팁 사이의 간격 */
  background-color: #f9f9f9;
  padding: 10px 4px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 250px;
  border-radius: 4px;
`;
export const GroupTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
`;

export const GroupDescription = styled.p`
  font-size: 14px;
  margin-top: 5px;
`;