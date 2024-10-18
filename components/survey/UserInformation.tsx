import React, { useState, useEffect } from 'react';
import { FormContainer, NavigationButton, CheckboxContainer, Label, ButtonContainer, Blocked, FormTitle } from './commonStyles'; // 공통 스타일 가져오기
import { SurveyData } from './SurveyDataType';
import { QuestionGroup } from './QuestionGroup';

interface UserInformationProps {
  onNext: () => void; // 다음 단계로 이동하는 함수
  onPrevious: () => void; // 이전 단계로 돌아가는 함수
  userInfo: SurveyData;
  setUserInfo: React.Dispatch<React.SetStateAction<SurveyData>>;
}

const UserInformation: React.FC<UserInformationProps> = ({ onNext, onPrevious, userInfo, setUserInfo }) => {

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value, // 라디오 버튼은 선택된 하나의 값만 배열에 넣음
    });
  };

  // 페이지가 렌더링될 때마다 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('유저 정보 제출:', userInfo); // 제출된 유저 정보를 콘솔에 출력
    onNext(); // 다음 단계로 이동
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Blocked />
        <FormTitle>유저 정보</FormTitle>
        <QuestionGroup
          question="나이가 몇 세이신가요?"
          name="age"
          options={[
            { label: '10대', value: '10대' },
            { label: '20대', value: '20대' },
            { label: '30대', value: '30대' },
            { label: '40대', value: '40대' },
            { label: '50대', value: '50대' },
            { label: '60대 이상', value: '60대' },
          ]}
          selectedValue={userInfo.age}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="정기적인 수입이 있습니까?"
          name="incomeSource"
          options={[
            { label: '정규직으로 일하고 있다', value: '정규직' },
            { label: '아르바이트나 파트타임으로 일하고 있다', value: '파트타임' },
            { label: '현재 수입이 없다', value: '수입없음' },
            { label: '다른 재정적인 지원을 받고 있다', value: '지원받음' },
          ]}
          selectedValue={userInfo.incomeSource}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="현재 살고 있는 곳은 어떤 유형의 주거 형태입니까?"
          name="housingType"
          options={[
            { label: '아파트 또는 고층 빌라', value: '아파트' },
            { label: '주택 (마당이 있는 경우)', value: '주택' },
            { label: '원룸/오피스텔', value: '원룸' },
          ]}
          selectedValue={userInfo.housingType}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="강아지가 안전하게 활동할 수 있는 실내 공간이 있습니까?"
          name="indoorSpace"
          options={[
            { label: '넓은 공간이 충분히 있다', value: '넓은 공간' },
            { label: '어느 정도 공간이 있다', value: '어느 정도 공간' },
            { label: '공간이 부족하다', value: '공간 부족' },
          ]}
          selectedValue={userInfo.indoorSpace}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="1~2년 내에 이사할 가능성이 있습니까?"
          name="movingPossibility"
          options={[
            { label: '없다', value: '없다' },
            { label: '가능성 있다', value: '있다' },
            { label: '자주 이사한다', value: '자주 이사' },
          ]}
          selectedValue={userInfo.movingPossibility}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="이웃이나 집주인과 강아지를 키우는 것에 대한 이야기가 되었나요?"
          name="petDiscussion"
          options={[
            { label: '예, 모두 동의한다', value: '예' },
            { label: '아니오, 반대 의견이 있다', value: '아니오' },
            { label: '아직 논의하지 않았다', value: '논의하지 않음' },
          ]}
          selectedValue={userInfo.petDiscussion}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="가족과 강아지를 키우는 것에 대한 이야기가 되었나요?"
          name="familyDiscussion"
          options={[
            { label: '예, 모두 동의한다', value: '예' },
            { label: '아니오, 반대 의견이 있다', value: '아니오' },
            { label: '아직 논의하지 않았다', value: '논의하지 않음' },
          ]}
          selectedValue={userInfo.familyDiscussion}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="자녀가 있습니까?"
          name="hasChildren"
          options={[
            { label: '예, 어린 자녀가 있다', value: '예' },
            { label: '아니오, 없다', value: '아니오' },
          ]}
          selectedValue={userInfo.hasChildren}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="다른 반려동물을 키우고 있습니까?"
          name="otherPets"
          options={[
            { label: '예', value: '예' },
            { label: '아니오', value: '아니오' },
          ]}
          selectedValue={userInfo.otherPets}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="다른 강아지를 키우고 있습니까?"
          name="otherDogs"
          options={[
            { label: '예, 소형견', value: '소형견' },
            { label: '예, 중형견', value: '중형견' },
            { label: '예, 대형견', value: '대형견' },
            { label: '아니오', value: '아니오' },
          ]}
          selectedValue={userInfo.otherDogs}
          onChange={handleRadioChange}
        />

        <QuestionGroup
          question="현재 거주 중인 곳에 다른 반려동물을 키우는 이웃이 있습니까?"
          name="neighborHasPets"
          options={[
            { label: '예, 많이 있다', value: '많이 있다' },
            { label: '몇 명 있다', value: '몇 명 있다' },
            { label: '없다', value: '없다' },
            { label: '잘 모르겠다', value: '잘 모르겠다' },
          ]}
          selectedValue={userInfo.neighborHasPets}
          onChange={handleRadioChange}
        />

        <ButtonContainer>
          <NavigationButton type="button" onClick={onPrevious} disabled={true}>
            이전
          </NavigationButton>
          <NavigationButton type="submit">다음</NavigationButton>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default UserInformation;
