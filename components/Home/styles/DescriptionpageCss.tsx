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
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  z-index: 2; /* 텍스트가 위 레이어 */
  text-align: center;
  width: 100%;

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
    line-height: 0.8;
    color: #333;
    span {
      color: #FFD000;
    }
  }

  p {
    margin-top: 20px;
    font-size: 1rem;
    color: #666;
  }
`;

export const SubscribeForm = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 10px;

  input {
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #ffa500;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #cc8400;
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
    border: 5px solid #FFD000;
    transition: transform 0.3s ease, opacity 0.3s ease;

    &:hover {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  .image1 {
    top: -50px;
    left: 10%;
    width: 120px;
    height: 120px;
  }

  .image2 {
    top: 0;
    right: 10%;
    width: 150px;
    height: 150px;
  }

  .image3 {
    bottom: 60px;
    left: 15%;
    width: 100px;
    height: 100px;
  }

  .image4 {
    bottom: 20px;
    right: 15%;
    width: 140px;
    height: 140px;
  }


  .image5 {
    top: 160px;
    left: 10%;
    width: 40px;
    height: 40px;
  }

  .image6 {
    top: 200px;
    right: 10%;
    width: 150px;
    height: 150px;
  }
`;