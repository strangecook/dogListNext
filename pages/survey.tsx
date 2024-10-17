import React, { useState } from 'react';
import styled from 'styled-components';
import UserInformation from '../components/survey/UserInformation'; // 유저 정보 페이지
import UserLifestyle from '../components/survey/UserLifestyle'; // 유저 생활 패턴 페이지
import DogPreferences from '../components/survey/DogPreferences'; // 강아지 선호 페이지
import dogLogoImage from '../public/mainwebImage.webp'; // 데스크탑 배경 이미지
import dogMediaImage from '../public/mediaImage.webp'; // 모바일 배경 이미지
import { SurveyData } from '../components/survey/SurveyDataType';

const SurveyIntro: React.FC = () => {
  const [step, setStep] = useState<number>(0); // 0: 시작, 1: 유저 정보, 2: 유저 생활 패턴, 3: 강아지 선호
  const [userInfo, setUserInfo] = useState<SurveyData>({
    age: '', 
    incomeSource: '',
    housingType: '',
    indoorSpace: '',
    movingPossibility: '',
    petDiscussion: '',
    familyDiscussion: '',
    hasChildren: '',
    otherPets: '',
    otherDogs: '',
    neighborHasPets: '',
    familyTime: '',
    aloneTime: '',
    aloneTimeSolution: '',
    cleaningFrequency: '',
    walkingPark: '',
    walkingFrequency: '',
    cookingPreference: '',
    monthlyExpenses: '',
    loyalty: '',
    strangerCaution: '',
    interactionFrequency: '',
    trainingSpeed: '',
    patienceLevel: '',
    firstTimeOwner: '',
    interactionImportance: '',
    allergyConcern: '',
    droolingConcern: '',
    sheddingTolerance: '',
    bathingFrequency: '',
    groomingFrequency: '',
    coatPreference: '',
    coatLength: '',
    barkingPreference: '',
    playfulnessPreference: '',
    trainingExperience: '',
    dogSize: '', 
    coatType: '',
  });

  const handleStartClick = () => {
    setStep(1); // 첫 번째 단계로 이동 (유저 정보)
  };

  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 3)); // 마지막 단계를 넘지 않도록
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0)); // 첫 번째 단계 아래로 내려가지 않도록
  };


  return (
    <SurveyContainer step={step}>
      {step === 0 && (
        <IntroContainer>
          <Title>강아지 맞춤 설문조사</Title>
          <Description>
            이 설문조사는 당신의 생활 패턴과 선호에 맞는 강아지를 추천하기 위한 것입니다.
            <br /> 각 항목에 대한 질문에 성실히 답변해 주세요.
          </Description>
          <StartButton onClick={handleStartClick}>시작하기</StartButton>
        </IntroContainer>
      )}

{step === 1 && (
  <UserInformation 
    onNext={handleNextStep} 
    onPrevious={handlePreviousStep} 
    userInfo={userInfo} 
    setUserInfo={setUserInfo}
  />
)}
   {/* 유저 정보 페이지 */}
   {step === 2 && (
  <UserLifestyle 
    onNext={handleNextStep} 
    onPrevious={handlePreviousStep} 
    userInfo={userInfo} 
    setUserInfo={setUserInfo}
  />
)} {/* 유저 생활 패턴 페이지 */}
      {step === 3 && 
      <DogPreferences 
      onNext={handleNextStep} 
      onPrevious={handlePreviousStep} 
      userInfo={userInfo} 
      setUserInfo={setUserInfo}
      />} {/* 강아지 선호 페이지 */}
    </SurveyContainer>
  );
};

// 스타일 정의
const SurveyContainer = styled.div<{ step: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.step === 0
      ? `url(${dogLogoImage.src}) no-repeat center center`
      : '#E2EEE0'};
  background-size: cover;
  min-height: ${(props) => (props.step === 0 ? '100vh' : 'auto')}; /* 처음 페이지만 100vh 적용 */

  // 모바일 화면에서는 첫 단계(인트로)에서 다른 배경 이미지로 변경
  @media (max-width: 768px) {
    background: ${(props) =>
      props.step === 0
        ? `url(${dogMediaImage.src}) no-repeat center center`
        : '#E2EEE0'};
    background-size: cover;
    min-height: ${(props) => (props.step === 0 ? '100vh' : 'auto')}; /* 모바일에서도 첫 페이지만 100vh 적용 */
  }
`;

const IntroContainer = styled.div`
  text-align: center;
  color: white;

  @media (max-width: 768px) {
    padding: 0 20px; /* 모바일에서 좌우 여백 추가 */
  }
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  -webkit-text-stroke-width: 1.5px;
  -webkit-text-stroke-color: black;

  @media (max-width: 768px) {
    font-size: 28px; /* 모바일에서는 폰트 크기를 작게 조정 */
    -webkit-text-stroke-width: 1px; /* 모바일에서는 글자 테두리를 약간 줄임 */
  }
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  -webkit-text-stroke-width: 0.1px;
  -webkit-text-stroke-color: black;

  @media (max-width: 768px) {
    font-size: 16px; /* 모바일에서는 글자 크기를 줄임 */
  }
`;

const StartButton = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    font-size: 18px; /* 모바일에서는 버튼 크기를 약간 작게 조정 */
  }
`;

export default SurveyIntro;
