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

        <Label>정기적인 수입이 있습니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="incomeSource"
              value="정규직"
              onChange={handleRadioChange}
            />
            정규직으로 일하고 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="incomeSource"
              value="파트타임"
              onChange={handleRadioChange}
            />
            아르바이트나 파트타임으로 일하고 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="incomeSource"
              value="수입없음"
              onChange={handleRadioChange}
            />
            현재 수입이 없다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="incomeSource"
              value="지원받음"
              onChange={handleRadioChange}
            />
            다른 재정적인 지원을 받고 있다
          </label>
        </CheckboxContainer>


        <Label>현재 살고 있는 곳은 어떤 유형의 주거 형태입니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="housingType"
              value="아파트"
              onChange={handleRadioChange}
            />
            아파트 또는 고층 빌라
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="housingType"
              value="주택"
              onChange={handleRadioChange}
            />
            주택 (마당이 있는 경우)
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="housingType"
              value="원룸"
              onChange={handleRadioChange}
            />
            원룸/오피스텔
          </label>
        </CheckboxContainer>


        <Label>강아지가 안전하게 활동할 수 있는 실내 공간이 있습니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="indoorSpace"
              value="넓은 공간이 충분히 있다"
              onChange={handleRadioChange}
            />
            넓은 공간이 충분히 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="indoorSpace"
              value="어느 정도 공간이 있다"
              onChange={handleRadioChange}
            />
            어느 정도 공간이 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="indoorSpace"
              value="공간이 부족하다"
              onChange={handleRadioChange}
            />
            공간이 부족하다
          </label>
        </CheckboxContainer>


        <Label>1~2년 내에 이사할 가능성이 있습니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="movingPossibility"
              value="없다"
              onChange={handleRadioChange}
            />
            없다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="movingPossibility"
              value="있다"
              onChange={handleRadioChange}
            />
            가능성 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="movingPossibility"
              value="자주 이사"
              onChange={handleRadioChange}
            />
            자주 이사한다
          </label>
        </CheckboxContainer>


        <Label>이웃이나 집주인과 강아지를 키우는 것에 대한 이야기가 되었나요?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="petDiscussion"
              value="예"
              onChange={handleRadioChange}
            />
            예, 모두 동의한다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="petDiscussion"
              value="아니오"
              onChange={handleRadioChange}
            />
            아니오, 반대 의견이 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="petDiscussion"
              value="논의하지 않음"
              onChange={handleRadioChange}
            />
            아직 논의하지 않았다
          </label>
        </CheckboxContainer>


        <Label>가족과 강아지를 키우는 것에 대한 이야기가 되었나요?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="familyDiscussion"
              value="예"
              onChange={handleRadioChange}
            />
            예, 모두 동의한다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="familyDiscussion"
              value="아니오"
              onChange={handleRadioChange}
            />
            아니오, 반대 의견이 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="familyDiscussion"
              value="논의하지 않음"
              onChange={handleRadioChange}
            />
            아직 논의하지 않았다
          </label>
        </CheckboxContainer>


        <Label>자녀가 있습니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="hasChildren"
              value="예"
              onChange={handleRadioChange}
            />
            예, 어린 자녀가 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="hasChildren"
              value="아니오"
              onChange={handleRadioChange}
            />
            아니오, 없다
          </label>
        </CheckboxContainer>


        <Label>다른 반려동물을 키우고 있습니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="otherPets"
              value="예"
              onChange={handleRadioChange}
            />
            예
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="otherPets"
              value="아니오"
              onChange={handleRadioChange}
            />
            아니오
          </label>
        </CheckboxContainer>


        <Label>다른 강아지를 키우고 있습니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="otherDogs"
              value="소형견"
              onChange={handleRadioChange}
            />
            예, 소형견
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="otherDogs"
              value="중형견"
              onChange={handleRadioChange}
            />
            예, 중형견
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="otherDogs"
              value="대형견"
              onChange={handleRadioChange}
            />
            예, 대형견
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="otherDogs"
              value="아니오"
              onChange={handleRadioChange}
            />
            아니오
          </label>
        </CheckboxContainer>

        <Label>현재 거주 중인 곳에 다른 반려동물을 키우는 이웃이 있습니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="neighborHasPets"
              value="예, 많이 있다"
              onChange={handleRadioChange}
            />
            예, 많이 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="neighborHasPets"
              value="몇 명 있다"
              onChange={handleRadioChange}
            />
            몇 명 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="neighborHasPets"
              value="없다"
              onChange={handleRadioChange}
            />
            없다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="neighborHasPets"
              value="잘 모르겠다"
              onChange={handleRadioChange}
            />
            잘 모르겠다
          </label>
        </CheckboxContainer>

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
