import React, { useState, useEffect } from 'react';
import { FormContainer, NavigationButton, ButtonContainer, FormTitle, Blocked } from './commonStyles'; // 공통 스타일을 가져옴
import { SurveyData } from './SurveyDataType';
import { QuestionGroup } from './QuestionGroup';
import { calculateScore } from './UserTest';
import { recommendDogsBasedOnUserInput } from './recommendDogBasedOnUserInput';

interface DogPreferencesProps {
  onNext: () => void; // 다음 단계로 이동하는 함수
  onPrevious: () => void; // 이전 단계로 돌아가는 함수
  userInfo: SurveyData;
  setUserInfo: React.Dispatch<React.SetStateAction<SurveyData>>;
}

const DogPreferences: React.FC<DogPreferencesProps> = ({ onNext, onPrevious, userInfo, setUserInfo }) => {

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // 페이지가 렌더링될 때마다 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('강아지 선호 사항 제출:', userInfo);
    console.log( "실험하기" ,calculateScore(userInfo))
    console.log( "추천강아지" ,recommendDogsBasedOnUserInput(userInfo));
    onNext(); // 다음 단계로 이동
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Blocked />
        <FormTitle>강아지 선호</FormTitle>

        <QuestionGroup
          question="강아지를 처음 키우시나요?"
          name="firstTimeOwner"
          options={[
            { label: '예', value: '예' },
            { label: '아니오', value: '아니오' },
          ]}
          selectedValue={userInfo.firstTimeOwner}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지를 입양하거나 구입할 수 있는 예산이 얼마입니까?"
          name="budgetForAdoption"
          options={[
            { label: '10만 원 미만', value: '10만 원 미만' },
            { label: '10만 원 ~ 50만 원', value: '10만 원 ~ 50만 원' },
            { label: '50만 원 ~ 100만 원', value: '50만 원 ~ 100만 원' },
            { label: '100만 원 이상', value: '100만 원 이상' },
          ]}
          selectedValue={userInfo.budgetForAdoption}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="매달 강아지의 사료, 병원비, 용품비 등을 지출할 수 있는 금액은 얼마입니까?"
          name="monthlyExpense"
          options={[
            { label: '5만 원 이하', value: '5만 원 이하' },
            { label: '5만 원 ~ 10만 원', value: '5만 원 ~ 10만 원' },
            { label: '10만 원 ~ 20만 원', value: '10만 원 ~ 20만 원' },
            { label: '20만 원 이상', value: '20만 원 이상' },
          ]}
          selectedValue={userInfo.monthlyExpense}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지가 얼마나 주인을 따르길 원하십니까?"
          name="obedienceLevel"
          options={[
            { label: '독립적인 성향을 원한다', value: '독립적인 성향을 원한다' },
            { label: '가끔은 독립적이고 가끔은 따랐으면 좋겠다', value: '가끔은 독립적이고 가끔은 따랐으면 좋겠다' },
            { label: '주인을 잘 따르면서도 독립적인 성향을 가졌으면 좋겠다', value: '주인을 잘 따르면서도 독립적인 성향을 가졌으면 좋겠다' },
            { label: '주인을 거의 항상 따르길 원한다', value: '주인을 거의 항상 따르길 원한다' },
          ]}
          selectedValue={userInfo.obedienceLevel}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지가 낯선 사람을 얼마나 경계하길 원하십니까?"
          name="strangerCaution"
          options={[
            { label: '거의 경계하지 않길 원한다', value: '거의 경계하지 않길 원한다' },
            { label: '적당히 경계심을 가졌으면 좋겠다', value: '적당히 경계심을 가졌으면 좋겠다' },
            { label: '낯선 사람에게 경계심을 가졌으면 좋겠다', value: '낯선 사람에게 경계심을 가졌으면 좋겠다' },
          ]}
          selectedValue={userInfo.strangerCaution}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지와 얼마나 자주 소통을 하고 싶은가요?"
          name="interactionFrequency"
          options={[
            { label: '거의 시간이 없다', value: '거의 시간이 없다' },
            { label: '하루에 한두 번 짧게 상호작용한다', value: '하루에 한두 번 짧게 상호작용한다' },
            { label: '정기적으로 상호작용하지만 독립적인 시간도 필요하다', value: '정기적으로 상호작용하지만 독립적인 시간도 필요하다' },
            { label: '자주 상호작용하며, 많이 시간을 보낼 수 있다', value: '자주 상호작용하며, 많이 시간을 보낼 수 있다' },
          ]}
          selectedValue={userInfo.interactionFrequency}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지가 훈련에 얼마나 빠르게 적응하길 원하십니까?"
          name="trainingSpeed"
          options={[
            { label: '느리게 배워도 상관없다', value: '느리게 배워도 상관없다' },
            { label: '적당한 시간 내에 배웠으면 좋겠다', value: '적당한 시간 내에 배웠으면 좋겠다' },
            { label: '빠르게 배웠으면 좋겠다', value: '빠르게 배웠으면 좋겠다' },
          ]}
          selectedValue={userInfo.trainingSpeed}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="훈련 도중 인내심을 얼마나 유지할 수 있습니까?"
          name="patienceLevel"
          options={[
            { label: '인내심이 거의 없다', value: '인내심이 거의 없다' },
            { label: '짧은 시간은 참을 수 있다', value: '짧은 시간은 참을 수 있다' },
            { label: '평균적인 인내심이 있다', value: '평균적인 인내심이 있다' },
            { label: '오랜 시간 참을 수 있다', value: '오랜 시간 참을 수 있다' },
          ]}
          selectedValue={userInfo.patienceLevel}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지를 훈련시킨 경험이 얼마나 있습니까?"
          name="trainingExperience"
          options={[
            { label: '전혀 없다', value: '전혀 없다' },
            { label: '기본적인 훈련만 시켜본 적이 있다', value: '기본적인 훈련만 시켜본 적이 있다' },
            { label: '몇 가지 명령어를 가르쳐본 적이 있다', value: '몇 가지 명령어를 가르쳐본 적이 있다' },
            { label: '정기적으로 훈련을 시켜본 경험이 있다', value: '정기적으로 훈련을 시켜본 경험이 있다' },
            { label: '전문적인 훈련 경험이 있다', value: '전문적인 훈련 경험이 있다' },
          ]}
          selectedValue={userInfo.trainingExperience}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지와의 상호작용에서 무엇을 더 중요하게 생각하십니까?"
          name="interactionImportance"
          options={[
            { label: '운동 및 활동적인 상호작용', value: '운동 및 활동적인 상호작용' },
            { label: '감정적인 상호작용', value: '감정적인 상호작용' },
            { label: '독립적인 성향을 존중', value: '독립적인 성향을 존중' },
          ]}
          selectedValue={userInfo.interactionImportance}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="털 알레르기가 있거나 알레르기 걱정이 되십니까?"
          name="allergyConcern"
          options={[
            { label: '예', value: '예' },
            { label: '아니오', value: '아니오' },
          ]}
          selectedValue={userInfo.allergyConcern}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지가 침을 많이 흘린다면, 얼마나 신경 쓰일 것 같습니까?"
          name="droolingConcern"
          options={[
            { label: '전혀 신경 쓰이지 않는다', value: '전혀 신경 쓰이지 않는다' },
            { label: '약간 신경 쓰이지만 감수할 수 있다', value: '약간 신경 쓰이지만 감수할 수 있다' },
            { label: '자주 닦아야 한다면 불편할 것 같다', value: '자주 닦아야 한다면 불편할 것 같다' },
          ]}
          selectedValue={userInfo.droolingConcern}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지의 털 빠짐을 얼마나 감당할 수 있습니까?"
          name="sheddingTolerance"
          options={[
            { label: '털 빠짐이 심해도 상관없다', value: '털 빠짐이 심해도 상관없다' },
            { label: '약간의 털 빠짐은 감수할 수 있다', value: '약간의 털 빠짐은 감수할 수 있다' },
            { label: '털 빠짐이 적은 강아지를 원한다', value: '털 빠짐이 적은 강아지를 원한다' },
          ]}
          selectedValue={userInfo.sheddingTolerance}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지를 얼마나 자주 목욕시킬 의향이 있습니까?"
          name="bathingFrequency"
          options={[
            { label: '매주', value: '매주' },
            { label: '매달', value: '매달' },
            { label: '필요할 때만', value: '필요할 때만' },
            { label: '가능하면 자주 하지 않기를 원한다', value: '가능하면 자주 하지 않기를 원한다' },
          ]}
          selectedValue={userInfo.bathingFrequency}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지의 털을 얼마나 자주 손질할 의향이 있으십니까?"
          name="groomingFrequency"
          options={[
            { label: '매일 빗질 및 관리', value: '매일 빗질 및 관리' },
            { label: '일주일에 2~3회 빗질', value: '일주일에 2~3회 빗질' },
            { label: '가끔 빗질 (일주일에 1회 이하)', value: '가끔 빗질 (일주일에 1회 이하)' },
            { label: '털 관리가 적게 필요했으면 좋겠다', value: '털 관리가 적게 필요했으면 좋겠다' },
          ]}
          selectedValue={userInfo.groomingFrequency}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지의 털 유형 중 어떤 것을 선호하십니까?"
          name="coatPreference"
          options={[
            { label: '짧고 관리가 쉬운 털', value: '짧고 관리가 쉬운 털' },
            { label: '부드럽고 길게 자라는 털', value: '부드럽고 길게 자라는 털' },
            { label: '털이 거의 없는 무모견', value: '털이 거의 없는 무모견' },
          ]}
          selectedValue={userInfo.coatPreference}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지의 털 길이 중 어느 것을 선호하십니까?"
          name="coatLength"
          options={[
            { label: '짧은 털', value: '짧은 털' },
            { label: '중간 길이의 털', value: '중간 길이의 털' },
            { label: '긴 털', value: '긴 털' },
          ]}
          selectedValue={userInfo.coatLength}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="어떤 크기의 강아지를 선호하십니까?"
          name="dogSize"
          options={[
            { label: '소형견', value: '소형견' },
            { label: '중형견', value: '중형견' },
            { label: '대형견', value: '대형견' },
          ]}
          selectedValue={userInfo.dogSize}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지가 언제 짖으면 좋겠나요?"
          name="barkingPreference"
          options={[
            { label: '필요한 경우에만 짖는다', value: '필요한 경우에만 짖는다' },
            { label: '경고나 흥분할 때만 짖는다', value: '경고나 흥분할 때만 짖는다' },
            { label: '다양한 상황에서 짖는다', value: '다양한 상황에서 짖는다' },
          ]}
          selectedValue={userInfo.barkingPreference}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지의 장난기 수준을 얼마나 원하십니까?"
          name="playfulnessPreference"
          options={[
            { label: '장난기가 많아 자주 놀고 싶다', value: '장난기가 많아 자주 놀고 싶다' },
            { label: '적당히 장난기가 있다', value: '적당히 장난기가 있다' },
            { label: '조용하고 장난기가 적다', value: '조용하고 장난기가 적다' },
          ]}
          selectedValue={userInfo.playfulnessPreference}
          onChange={handleRadioChange}
        />

        <ButtonContainer>
          <NavigationButton type="button" onClick={onPrevious}>
            이전
          </NavigationButton>
          <NavigationButton type="submit">설문 완료</NavigationButton>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default DogPreferences;
