import React, { useState, useEffect } from 'react';
import { FormContainer, NavigationButton, ButtonContainer, FormTitle, Blocked } from './commonStyles'; // 공통 스타일 가져옴
import { SurveyData } from './SurveyDataType';
import { QuestionGroup } from './QuestionGroup';

interface UserLifestyleProps {
  onNext: () => void; // 다음 단계로 이동하는 함수
  onPrevious: () => void; // 이전 단계로 돌아가는 함수
  userInfo: SurveyData;
  setUserInfo: React.Dispatch<React.SetStateAction<SurveyData>>;
}
const UserLifestyle: React.FC<UserLifestyleProps> = ({ onNext, onPrevious, userInfo, setUserInfo }) => {

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
    console.log('유저 생활 패턴 제출:', userInfo);
    onNext();
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Blocked />
        <FormTitle>유저 생활 패턴</FormTitle>

        <QuestionGroup
          question="하루 중 강아지에게 할애할 수 있는 시간은 얼마입니까?"
          name="dogSpentTime"
          options={[
            { label: '30분 이하', value: '30분 이하' },
            { label: '30분 ~ 1시간', value: '30분 ~ 1시간' },
            { label: '1시간 이상', value: '1시간 이상' },
          ]}
          selectedValue={userInfo.dogSpentTime}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="거주하는 집의 소음 수준은 어떻습니까?"
          name="noiseLevel"
          options={[
            { label: '매우 조용하다', value: '매우 조용하다' },
            { label: '적당하다', value: '적당하다' },
            { label: '소음이 많다', value: '소음이 많다' },
          ]}
          selectedValue={userInfo.noiseLevel}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="주로 어떤 음악을 듣습니까?"
          name="musicPreference"
          options={[
            { label: '클래식', value: '클래식' },
            { label: '팝', value: '팝' },
            { label: '록', value: '록' },
            { label: '힙합', value: '힙합' },
            { label: '발라드', value: '발라드' },
          ]}
          selectedValue={userInfo.musicPreference}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지와 가족이 함께 보내는 시간은 얼마나 되나요?"
          name="familyTime"
          options={[
            { label: '1시간 미만', value: '1시간 미만' },
            { label: '1~2시간', value: '1~2시간' },
            { label: '2~4시간', value: '2~4시간' },
            { label: '4~6시간', value: '4~6시간' },
            { label: '6시간 이상', value: '6시간 이상' },
          ]}
          selectedValue={userInfo.familyTime}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지가 혼자 있는 시간이 얼마나 될까요?"
          name="aloneTime"
          options={[
            { label: '6시간 이상', value: '6시간 이상' },
            { label: '3~6시간', value: '3~6시간' },
            { label: '1~3시간', value: '1~3시간' },
            { label: '거의 혼자 있지 않음', value: '거의 혼자 있지 않음' },
          ]}
          selectedValue={userInfo.aloneTime}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지가 혼자 있는 시간이 많을 경우, 어떻게 대처할 계획이 있으십니까?"
          name="aloneTimeSolution"
          options={[
            { label: '펫 시터나 돌봄 서비스를 이용할 것이다', value: '펫 시터 이용' },
            { label: '가족이나 이웃에게 맡길 것이다', value: '가족/이웃 맡김' },
            { label: '특별한 계획이 없다', value: '특별 계획 없음' },
          ]}
          selectedValue={userInfo.aloneTimeSolution}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="집 청소를 얼마나 자주 하시나요?"
          name="cleaningFrequency"
          options={[
            { label: '거의 청소하지 않는다', value: '거의 청소하지 않음' },
            { label: '일주일에 한두 번 청소한다', value: '주 1~2회' },
            { label: '매일 청소할 수 있다', value: '매일' },
            { label: '하루에 여러 번 청소할 수 있다', value: '하루에 여러 번' },
          ]}
          selectedValue={userInfo.cleaningFrequency}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지를 산책시킬 수 있는 공원이나 산책로가 집 근처에 있습니까?"
          name="walkingPark"
          options={[
            { label: '매우 가깝다 (5분 거리)', value: '매우 가깝다' },
            { label: '적당히 가깝다 (10~20분 거리)', value: '적당히 가깝다' },
            { label: '멀리 있다 (20분 이상)', value: '멀리 있다' },
            { label: '없다', value: '없다' },
          ]}
          selectedValue={userInfo.walkingPark}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지가 매일 산책을 얼마나 자주 해야 하길 원하십니까?"
          name="walkingFrequency"
          options={[
            { label: '매일 산책이 필요하지 않길 원한다', value: '필요하지 않음' },
            { label: '하루에 한 번 정도 산책했으면 좋겠다', value: '하루에 한 번' },
            { label: '하루에 두 번 이상 산책이 필요하다', value: '하루에 두 번 이상' },
          ]}
          selectedValue={userInfo.walkingFrequency}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="요리하는 것을 좋아합니까?"
          name="cookingPreference"
          options={[
            { label: '매우 좋아한다', value: '매우 좋아함' },
            { label: '가끔 한다', value: '가끔 함' },
            { label: '별로 하지 않는다', value: '별로 하지 않음' },
            { label: '거의 하지 않는다', value: '거의 하지 않음' },
          ]}
          selectedValue={userInfo.cookingPreference}
          onChange={handleRadioChange}
        />

        <ButtonContainer>
          <NavigationButton type="button" onClick={onPrevious}>
            이전
          </NavigationButton>
          <NavigationButton type="submit">다음</NavigationButton>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default UserLifestyle;
