import styled from 'styled-components';

// Props 인터페이스 정의
interface ConsonantButtonProps {
  $selected: boolean; // '$' prefix 사용
}

export const Container = styled.div`
  padding: 80px;
  background-color: #f7f7f7;
  font-family: 'Nanum Gothic', sans-serif;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;


export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;


export const Card = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &:hover .hide-on-hover {
    opacity: 0;
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Dropdown = styled.select`
  padding: 10px;
  margin: 0 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #FFD700;
    outline: none;
  }
`;

export const SearchBar = styled.input`
  padding: 10px;
  font-size: 1em;
  border: none;
  background-color: #f0f0f0; /* 회색 배경 */
  border-radius: 8px 0 0 8px;
  width: 100%;
  outline: none;


  @media (max-width: 768px) {
    width: 70%;
    border-radius: 8px 0 0 8px;
    font-size: 0.8em;

    &::placeholder {
      font-size: 0.8em;
    }
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; /* 버튼의 너비 */
  height: 40px; /* 버튼의 높이 */
  border: none;
  border-radius: 50%; /* 둥근 버튼 */
  cursor: pointer;

  .SearchButton-Image {
    width: 20px; /* 아이콘 크기 */
    height: 20px;
  }
`;


export const AutocompleteList = styled.ul`
  position: absolute; // 변경된 부분
  top: 100%; // 변경된 부분
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0 0 8px 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const AutocompleteItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }

  @media (max-width: 768px) {
    font-size: 0.6em;
    padding: 8px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e0e0e0;
`;

export const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  object-position: center;
  border-radius: 12px 12px 0 0;
`;

export const CardContentTopLeft = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  transition: opacity 0.2s ease-in-out;
`;

export const CardContentBottomRight = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  text-align: right;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.8em;
  font-weight: 700;
  font-family: 'Nanum Gothic', sans-serif;
`;

export const Text = styled.p`
  margin: 0;
  font-size: 1.2em;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: black;
  color: #f5f5f5;
  font-family: 'Nanum Gothic', sans-serif;
  @media (max-width: 768px) {
    font-size: 0.6em;
  }
`;


export const ConsonantButton = styled.button<ConsonantButtonProps>`
  padding: 10px 20px;
  font-size: 1em;
  font-weight: 600;
  color: black;
  background-color: ${props => (props.$selected ? '#black' : 'white')};
  border: none;
  border-radius: 8px;
  margin: 0 5px;
  width: 85px;
  cursor: pointer;
  
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const FilterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 1em;
  color: #333;
  font-weight: bold;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: row;
    width: 70%;
    font-size: 0.8em;
  }
`;

export const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 10px 20px;
  font-size: 1.2em;
  color: white;
  background-color: #FFD700;
  border: none;
  border-radius: 30%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #FFD000;
  }
`;

export const SingleLineText = styled(Text)`
  font-size: 1em;
  margin: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 0.6em;
    span {
      display: none;
    }
  }
`;

export const ConsonantFilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 5px;
  justify-items: center;
  margin-bottom: 20px;

`;

export const WhiteBackground = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;

  @media (max-width: 768px) {
    padding: 15px;
    margin: 10px;
  }
`;


export const SearchAndThemeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap; /* 화면 크기에 따라 줄바꿈 */
  gap: 10px; /* 검색창과 버튼 간의 간격 */
  border-bottom: 2px #f0f0f0 solid;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #f0f0f0; /* 회색 배경 */
`;

export const ThemeFilterContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap; /* 화면이 좁아질 경우 버튼들이 줄바꿈 */
  justify-content: flex-start;
  width: 65%; /* 테마 버튼의 비율 */
  height: 40px;
  margin: 0 auto 20px auto; /* 중앙 정렬 및 하단 간격 */
  @media (max-width: 768px) {
    width: 100%; /* 모바일에서는 전체 너비 */
  }
`;

export const ThemeButton = styled.button<ConsonantButtonProps>`
  padding: 10px 20px;
  font-size: 0.9em;
  color: ${(props) => (props.$selected ? '#FFD000' : 'black')};
  background-color: #ffffff;
  border: 1px solid ${(props) => (props.$selected ? '#FFD000' : '#ccc')};
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.8em;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* 회색 배경 */
  border-radius: 8px; /* 모서리를 둥글게 */
  padding: 10px; /* 내부 여백 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 */
  margin: 0 auto 20px 5px; /* 중앙 정렬 및 하단 간격 */
  width: 33%; /* 검색창의 비율 */
  height: 40px;
`;

export const FilterInfoContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 양 끝으로 배치 */
  align-items: center;
  margin-bottom: 5px;
  padding: 10px 20px;


  @media (max-width: 768px) {
    flex-direction: row; /* 모바일에서도 가로 정렬 */
    padding: 5px 10px;
  }
`;

export const FilterLabel = styled.div`
  font-size: 1em;
  font-weight: bold;
  color: #333;
`;

export const ResetButton = styled.button`
  display: flex; /* Flexbox 적용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  gap: 8px; /* 이미지와 텍스트 사이 간격 */
  padding: 10px 20px;
  font-size: 0.8em;
  color: black;
  background-color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  align-items: center;

  &:hover {
    background-color: #d32f2f;
    color: white;

    .ResetButton-Image {
      transform: rotate(360deg); /* 360도 회전 */
      transition: transform 0.5s ease-in-out; /* 회전 애니메이션 */
    }
  }

  @media (max-width: 768px) {
    font-size: 0.8em;
    padding: 8px 16px;
  }

  .ResetButton-Image {
    width: 16px; /* 이미지 너비 */
    height: 16px; /* 이미지 높이 */
    align-items: center;
  }
`;

export const Divider = styled.div`
  width: 100%; /* 가로로 길게 */
  height: 1px; /* 선의 두께 */
  background-color: #ddd; /* 선 색상 */
  margin: 20px 0; /* 위아래 여백 */
`;
