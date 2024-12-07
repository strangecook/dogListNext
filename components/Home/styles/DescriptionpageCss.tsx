import styled from 'styled-components';
import Image from 'next/image';

export const DescriptionCover = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const CombinedImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const MainImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

export const OverlayImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5; /* 투명도를 조정하여 겹치는 효과 */
  z-index: 2;
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
`;


export const Context = styled.div`
  position: relative;
  text-align: center;
  color: #fff;
  z-index: 3; /* 이미지 위에 표시되도록 설정 */
  top: 220px;
  right: 230px;

  .contextH1 {
    white-space: pre-wrap;
    font-size: 3vw;
    line-height: 1.2em;
    -webkit-text-stroke-width: 1.5px;
    -webkit-text-stroke-color: black;
    margin-bottom: 20px; /* 아래 여백 추가 */
  }

  .contextH3 {
    white-space: pre-wrap;
    font-size: 1.5vw;
    margin-top: 0;
    margin-bottom: 20px;
    -webkit-text-stroke-width: 0.3px;
    -webkit-text-stroke-color: black;
  }

  .emailcontainer {
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    align-items: center;
    border: 1px solid #ccc;
    max-width: 400px;
    margin: 0 auto; /* 중앙 정렬 */
    opacity: 0.8;
  }

  .emaildiv {
    width: 100%;

    .emailInput {
      width: 100%;
      padding: 10px;
      border: 0;
      border-bottom: 2px solid #ccc;
      font-size: 1rem;
    }

    .emailInput:focus {
      border-color: #4caf50;
      outline: none;
      transition: border-color 0.3s ease;
    }
  }

  .buttonNormal,
  .buttonHovered {
    padding: 10px 20px;
    border-radius: 10px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .buttonNormal {
    background-color: #4caf50;
    color: white;
    border: solid 1px;
  }

  .buttonHovered {
    background-color: white;
    color: #4caf50;
    border: solid 1px;
  }

  @media (max-width: 768px) {
    margin-top: 70vh;
    right: 0;
    top: 0px;

    .emailcontainer {
      display: none;
    }
    .contextH1 {
      font-size: 6vw;
    }

    .contextH3 {
      font-size: 3vw;
    }

    .emailcontainer {
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .buttonNormal,
    .buttonHovered {
      width: 100%;
    }
  }
`;

export const Notification = styled.p<{ $isError: boolean }>`
  color: ${(props) => (props.$isError ? 'red' : 'green')};
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  width: 50%;
  max-width: 350px;
  padding: 7px;
  z-index: 3; /* 이미지 위에 표시되도록 설정 */

  @media (max-width: 768px) {
    width: 100%;
  }
`;
