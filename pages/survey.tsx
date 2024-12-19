import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserInformation from '../components/survey/UserInformation'; // 유저 정보 페이지
import UserLifestyle from '../components/survey/UserLifestyle'; // 유저 생활 패턴 페이지
import DogPreferences from '../components/survey/DogPreferences'; // 강아지 선호 페이지
import DogPreferencePriority from '../components/survey/DogPreferencePriority';
import dogLogoImage from '../public/mainwebImage.webp'; // 데스크탑 배경 이미지
import dogMediaImage from '../public/mediaImage.webp'; // 모바일 배경 이미지
import { SurveyData } from '../components/survey/SurveyDataType';
import ProgressBar from '../components/survey/ProgressBar';
import { DescriptionCover, Context, CircleImageContainer, TitleText } from "../components/Home/styles/DescriptionpageCss";
import dog1 from '../public/dogPic5@.webp';
import dog2 from '../public/dogPic14@.webp';
import dog3 from '../public/dogPic20@.webp';
import dog4 from '../public/dogPic23@.webp';
import dog5 from '../public/dogPic21@.webp';
import dog6 from '../public/dogPic16@.webp';
import Image from 'next/image';

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
    noiseLevel: '',
    musicPreference: '',
    aloneTime: '',
    aloneTimeSolution: '',
    cleaningFrequency: '',
    walkingPark: '',
    walkingFrequency: '',
    cookingPreference: '',
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
  const calculateRemainingQuestions = (userInfo: SurveyData): number => {
    return Object.entries(userInfo).filter(([key, value]) => {
      if (key === 'selectedPreferences') {
        return Array.isArray(value) && value.length === 0; // 배열이고 비어있는 경우
      }
      if (Array.isArray(value)) {
        return value.length === 0; // 다른 배열도 비어있다면
      }
      return value === ''; // 문자열이고 비어있는 경우
    }).length;
  };

  const totalQuestions = Object.keys(userInfo).length; // 총 질문 개수
  const answeredQuestions = totalQuestions - calculateRemainingQuestions(userInfo); // 응답한 질문 개수

  return (
    <SurveyContainer step={step}>
      {/* 프로그래스 바 */}
      {step > 0 && (
        <ProgressBar
          answered={answeredQuestions}
          total={totalQuestions}
        />
      )}

      {step === 0 && (
        <DescriptionCover>
          <Context>
            <CircleImageContainer>
              {/* 겹쳐 보이는 원형 이미지들 */}
              <Image src={dog1} alt="강아지 1" className="circle-image image1" />
              <Image src={dog2} alt="강아지 2" className="circle-image image2" />
              <Image src={dog3} alt="강아지 3" className="circle-image image3" />
              <Image src={dog4} alt="강아지 4" className="circle-image image4" />
              <Image src={dog5} alt="강아지 5" className="circle-image image5" />
              <Image src={dog6} alt="강아지 6" className="circle-image image6" />
              <div className="color-circle circle1"></div>
              <div className="color-circle circle2"></div>
              <div className="color-circle circle3"></div>
              <div className="color-circle circle4"></div>
            </CircleImageContainer>

            {/* 텍스트 */}
            <TitleText>
              <IntroContainer>
                <Title>강아지 맞춤 설문조사</Title>
                <Description>
                  이 설문조사는 당신의 생활 패턴과 선호에 맞는 강아지를 추천하기 위한 것입니다.
                  <br /> 각 항목에 대한 질문에 성실히 답변해 주세요.
                </Description>
                <StartButton onClick={handleStartClick}>시작하기</StartButton>
              </IntroContainer>
            </TitleText>
          </Context>
        </DescriptionCover>
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

// 스타일 정의
const SurveyContainer = styled.div<{ step: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center content vertically */
  background-size: cover;
  min-height: 100vh; /* Cover entire viewport */
  margin: 0; /* Remove any default margin */
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

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
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
