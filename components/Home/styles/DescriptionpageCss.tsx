import styled from 'styled-components';

export const DescriptionCover = styled.div`
  width: 100%;
  padding: 50px 20px;
  background-color: #F6F6F6;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 680px;
`;


export const Context = styled.div`
  position: relative; /* 겹치기 위해 부모를 relative로 설정 */
  width: 100%;
  height: 400px; /* 필요한 높이 설정 */
`;


export const TitleText = styled.div`
  position: absolute; /* CircleImageContainer 위에 배치 */
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  z-index: 2; /* 텍스트가 위 레이어 */
  text-align: center;
  width: 100%;

  h1 {
    font-size: 3.6rem;
    font-weight: 700;
    line-height: 0.8;
    color: #333;
    span {
      color: #FFD000;
    }
    @media (max-width: 768px) {
      font-size: 2em;
      font-weight: 500;
    }
  }


  p {
    margin-top: 20px;
    font-size: 1.1rem;
    font-weight: 400;
    color: #666;

    @media (max-width: 768px) {
    font-size: 1rem;
    font-weight: 600;
    }
  }
  
  .TextGap{
    height: 40px;
  }

  @media (max-width: 768px) {
    top: 70%;
    }
`;

export const SubscribeForm = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    width: 330px;
    height: 60px;
    padding: 10px 20px;
    font-size: 0.9rem;
    font-weight: 900;
    background-color: #FFD000;
    color: black;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #cc8400;
      color: white;

      .button_rightArrow{
      filter: invert(100%); /* 흰색으로 변경 */
    }
    }

    .button_rightArrow{
      width: 10px;
      height: 10px;
      vertical-align: middle; /* 텍스트와 정렬 유지 */
  position: relative; /* 상대적인 위치 조정 */
  top: -2px; /* 위로 2px 이동 */
    }


    @media (max-width: 768px) {
      font-size: 1rem;
      width: 280px;
      height: 60px;
    }
  }
`;

export const CircleImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1; /* 이미지가 아래 레이어 */
  
  .circle-image {
    position: absolute;
    border-radius: 50%;
    border: 5px solid #FDC000;
  }

  .image1 {
    top: 12px;
    left: 13%;
    width: 160px;
    height: 160px;
    border: 8px solid #FDC000;

    @media (max-width: 768px) {
    top: 42px;
    left: 0%;
    width: 100px;
    height: 100px;
    border: 5px solid #FDC000;
    }
  }

  .image2 {
    top: 20px;
    right: 13%;
    width: 150px;
    height: 150px;
    border: 8px solid #FDC000;

    @media (max-width: 768px) {
    top: 80px;
    right: 0%;
    width: 100px;
    height: 100px;
    border: 5px solid #FDC000;
    }
  }

  .image3 {
    bottom: -186px;
    left: 19%;
    width: 140px;
    height: 140px;
    border: 7px solid #A0E06D;

    @media (max-width: 768px) {
      bottom: -200px;
      left: 10%;
    width: 80px;
    height: 80px;
    border: 5px solid #A0E06D;
    }
  }
  
  .image4 {
    bottom: 35px;
    right: 10.8%;
    width: 88px;
    height: 88px;
    border: 7px solid #A0E06D;

    @media (max-width: 768px) {
      display: none;
    }
  }
  
  
  .image5 {
    top: 282px;
    left: 10.5%;
    width: 84px;
    height: 84px;
    border: 7px solid #8FB5F7; 

    @media (max-width: 768px) {
      display: none;
    }

  }

  .image6 {
    bottom: -190px;
    right: 19.3%;
    width: 166px;
    height: 166px;
    border: 7px solid #8FB5F7;  

    @media (max-width: 768px) {
      bottom: -230px;
      right: 10.3%;
    width: 100px;
    height: 100px;
    border: 5px solid #8FB5F7;
    }
  }

  .color-circle {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  position: absolute;
  background-color: red; /* 기본 색 */
  z-index: 1;
}

/* 각 동그라미의 위치 조정 */
.circle1 {
  top: 88px;
  left: 532px;
  background-color: #96EDB9;

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
    top: 120px;
    left: 124px;
  }
}

.circle2 {
  top: 22px;
  right: 586px;
  background-color: #96C3ED;
  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
    top: 52px;
    right: 150px;
  }
}

.circle3 {
  bottom: -68px;
  left: 141px;
  width: 16px;
  height: 16px;
  background-color: #FF9B8E;

  @media (max-width: 768px) {
    bottom: 0px;
    left: 10px;
    width: 10px;
    height: 10px;
    background-color: #FF9B8E;
  }
}

.circle4 {
  bottom: 67px;
  right: 342px;
  width: 10px;
  height: 10px;
  background-color: #FFDB00;

  @media (max-width: 768px) {
    bottom: 130px;
    right: 0px;
    width: 10px;
    height: 10px;
    background-color: #FFDB00;
  }
}

`;