import React, { useState } from 'react';
import styled from 'styled-components';
import UserInformation from '../components/survey/UserInformation'; // 유저 정보 페이지
import UserLifestyle from '../components/survey/UserLifestyle'; // 유저 생활 패턴 페이지
import DogPreferences from '../components/survey/DogPreferences'; // 강아지 선호 페이지
import DogPreferencePriority from '../components/survey/DogPreferencePriority';
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
    dogSpentTime: '',
    familyTime: '',
    noiseLevel:'',
    musicPreference:'',
    aloneTime: '',
    aloneTimeSolution: '',
    cleaningFrequency: '',
    walkingPark: '',
    walkingFrequency: '',
    cookingPreference: '',
    monthlyExpenses: '',
    budgetForAdoption: '',
    monthlyExpense: '',
    obedienceLevel: '',
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
    selectedPreferences: [],
  });

  const handleStartClick = () => setStep(1);
  const handleNextStep = () => setStep((prevStep) => Math.min(prevStep + 1, 4));
  const handlePreviousStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  return (
    <SurveyContainer step={step}>
      {/* 프로그래스 바 */}
      {step > 0 && <ProgressBar step={step} totalSteps={4} />}
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
      {step === 2 && (
        <UserLifestyle 
          onNext={handleNextStep} 
          onPrevious={handlePreviousStep} 
          userInfo={userInfo} 
          setUserInfo={setUserInfo}
        />
      )}
      {step === 3 && (
        <DogPreferences 
          onNext={handleNextStep} 
          onPrevious={handlePreviousStep} 
          userInfo={userInfo} 
          setUserInfo={setUserInfo}
        />
      )}
      {step === 4 && (
        <DogPreferencePriority 
          onNext={handleNextStep} 
          onPrevious={handlePreviousStep} 
          userInfo={userInfo} 
          setUserInfo={setUserInfo}
        />
      )}
    </SurveyContainer>
  );
};

// 프로그래스 바 컴포넌트
const ProgressBar: React.FC<{ step: number; totalSteps: number }> = ({ step, totalSteps }) => {
  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <ProgressBarContainer>
      <ProgressFill style={{ width: `${progressPercentage}%` }} />
      <ProgressText>{`Step ${step} of ${totalSteps}`}</ProgressText>
    </ProgressBarContainer>
  );
};

// 스타일 정의
const SurveyContainer = styled.div<{ step: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically */
  background: ${(props) =>
    props.step === 0
      ? `url(${dogLogoImage.src}) no-repeat center center`
      : '#E2EEE0'};
  background-size: cover;
  min-height: 100vh; /* Cover entire viewport */
  width: 100vw; /* Ensure full-width */
  margin: 0; /* Remove any default margin */

  @media (max-width: 768px) {
    background: ${(props) =>
      props.step === 0
        ? `url(${dogMediaImage.src}) no-repeat center center`
        : '#E2EEE0'};
    background-size: cover;
    min-height: 100vh;
  }
`;

const IntroContainer = styled.div`
  text-align: center;
  color: white;
  padding: 20px; /* Add padding to center content better */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const ProgressBarContainer = styled.div`
  position: fixed;
  top: 60px; /* 네비게이션 바 아래 */
  width: 100%;
  max-width: 800px;
  background: #dcdcdc;
  border-radius: 5px;
  overflow: hidden;
  height: 10px;
  margin: 0 auto;

  @media (max-width: 768px) {
    top: 50px; /* 모바일에 맞춰 네비게이션 위치 조정 */
  }
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  text-align: center;
  font-size: 12px;
  color: #333;
  padding: 5px 0;
  position: relative;
  top: -10px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  -webkit-text-stroke-width: 1.5px;
  -webkit-text-stroke-color: black;
  @media (max-width: 768px) {
    font-size: 28px;
    -webkit-text-stroke-width: 1px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
  -webkit-text-stroke-width: 0.1px;
  -webkit-text-stroke-color: black;
  @media (max-width: 768px) {
    font-size: 16px;
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
    font-size: 18px;
  }
`;

export default SurveyIntro;
