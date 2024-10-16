import React, { useState } from 'react';
import { FormContainer, NavigationButton, CheckboxContainer, Label, ButtonContainer, Blocked, FormTitle, QuestionGroup } from './commonStyles'; // 공통 스타일 가져오기

interface UserInfo {
  [key: string]: string[]; // 유저 정보는 문자열 배열로 저장됨
  age: string[]; // 나이
  incomeSource: string[]; // 수입원
  housingType: string[]; // 주거 형태
  movingPossibility: string[]; // 이사 가능성
  petDiscussion: string[]; // 이웃/집주인과 강아지를 키우는 것에 대한 논의
  familyDiscussion: string[]; // 가족과 강아지를 키우는 것에 대한 논의
  hasChildren: string[]; // 자녀 여부
  otherPets: string[]; // 다른 반려동물 여부
  otherDogs: string[]; // 다른 강아지 여부
  neighborHasPets: string[]; // 이웃이 반려동물을 키우는지 여부
}

interface UserInformationProps {
  onNext: () => void; // 다음 단계로 이동하는 함수
  onPrevious: () => void; // 이전 단계로 돌아가는 함수
}

const UserInformation: React.FC<UserInformationProps> = ({ onNext, onPrevious }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    age: [], // 나이 선택 초기값
    incomeSource: [], // 수입원 선택 초기값
    housingType: [], // 주거 형태 선택 초기값
    movingPossibility: [], // 이사 가능성 선택 초기값
    petDiscussion: [], // 이웃/집주인 논의 초기값
    familyDiscussion: [], // 가족 논의 초기값
    hasChildren: [], // 자녀 여부 초기값
    otherPets: [], // 다른 반려동물 여부 초기값
    otherDogs: [], // 다른 강아지 여부 초기값
    neighborHasPets: [], // 이웃의 반려동물 여부 초기값
  });


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setUserInfo({
        ...userInfo,
        [name]: [...userInfo[name], value], // 선택된 값을 배열에 추가
      });
    } else {
      setUserInfo({
        ...userInfo,
        [name]: userInfo[name].filter((item) => item !== value), // 선택 해제 시 배열에서 제거
      });
    }
  };

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
        <QuestionGroup>

        <Label>나이가 몇 세이신가요?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="age"
            value="10대"
            onChange={handleCheckboxChange}
          />
          <label>10대</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="age"
            value="20대"
            onChange={handleCheckboxChange}
          />
          <label>20대</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="age"
            value="30대"
            onChange={handleCheckboxChange}
          />
          <label>30대</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="age"
            value="40대"
            onChange={handleCheckboxChange}
          />
          <label>40대</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="age"
            value="50대"
            onChange={handleCheckboxChange}
          />
          <label>50대</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="age"
            value="60대"
            onChange={handleCheckboxChange}
          />
          <label>60대이상</label>
        </CheckboxContainer>
                  
        </QuestionGroup>

        <Label>정기적인 수입이 있습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="incomeSource"
            value="정규직"
            onChange={handleCheckboxChange}
          />
          <label>정규직으로 일하고 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="incomeSource"
            value="파트타임"
            onChange={handleCheckboxChange}
          />
          <label>아르바이트나 파트타임으로 일하고 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="incomeSource"
            value="수입없음"
            onChange={handleCheckboxChange}
          />
          <label>현재 수입이 없다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="incomeSource"
            value="지원받음"
            onChange={handleCheckboxChange}
          />
          <label>다른 재정적인 지원을 받고 있다</label>
        </CheckboxContainer>

        <QuestionGroup/>

        <Label>현재 살고 있는 곳은 어떤 유형의 주거 형태입니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="housingType"
            value="아파트"
            onChange={handleCheckboxChange}
          />
          <label>아파트 또는 고층 빌라</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="housingType"
            value="주택"
            onChange={handleCheckboxChange}
          />
          <label>주택 (마당이 있는 경우)</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="housingType"
            value="원룸"
            onChange={handleCheckboxChange}
          />
          <label>원룸/오피스텔</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>1~2년 내에 이사할 가능성이 있습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="movingPossibility"
            value="없다"
            onChange={handleCheckboxChange}
          />
          <label>없다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="movingPossibility"
            value="있다"
            onChange={handleCheckboxChange}
          />
          <label>가능성 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="movingPossibility"
            value="자주 이사"
            onChange={handleCheckboxChange}
          />
          <label>자주 이사한다</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>이웃이나 집주인과 강아지를 키우는 것에 대한 이야기가 되었나요?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="petDiscussion"
            value="예"
            onChange={handleCheckboxChange}
          />
          <label>예, 모두 동의한다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="petDiscussion"
            value="아니오"
            onChange={handleCheckboxChange}
          />
          <label>아니오, 반대 의견이 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="petDiscussion"
            value="논의하지 않음"
            onChange={handleCheckboxChange}
          />
          <label>아직 논의하지 않았다</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>가족과 강아지를 키우는 것에 대한 이야기가 되었나요?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="familyDiscussion"
            value="예"
            onChange={handleCheckboxChange}
          />
          <label>예, 모두 동의한다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="familyDiscussion"
            value="아니오"
            onChange={handleCheckboxChange}
          />
          <label>아니오, 반대 의견이 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="familyDiscussion"
            value="논의하지 않음"
            onChange={handleCheckboxChange}
          />
          <label>아직 논의하지 않았다</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>자녀가 있습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="hasChildren"
            value="예"
            onChange={handleCheckboxChange}
          />
          <label>예, 어린 자녀가 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="hasChildren"
            value="아니오"
            onChange={handleCheckboxChange}
          />
          <label>아니오, 없다</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>다른 반려동물을 키우고 있습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="otherPets"
            value="예"
            onChange={handleCheckboxChange}
          />
          <label>예</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="otherPets"
            value="아니오"
            onChange={handleCheckboxChange}
          />
          <label>아니오</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>다른 강아지를 키우고 있습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="otherDogs"
            value="소형견"
            onChange={handleCheckboxChange}
          />
          <label>예, 소형견</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="otherDogs"
            value="중형견"
            onChange={handleCheckboxChange}
          />
          <label>예, 중형견</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="otherDogs"
            value="대형견"
            onChange={handleCheckboxChange}
          />
          <label>예, 대형견</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="otherDogs"
            value="아니오"
            onChange={handleCheckboxChange}
          />
          <label>아니오</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>현재 거주 중인 곳에 다른 반려동물을 키우는 이웃이 있습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="neighborHasPets"
            value="예, 많이 있다"
            onChange={handleCheckboxChange}
          />
          <label>예, 많이 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="neighborHasPets"
            value="몇 명 있다"
            onChange={handleCheckboxChange}
          />
          <label>몇 명 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="neighborHasPets"
            value="없다"
            onChange={handleCheckboxChange}
          />
          <label>없다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="neighborHasPets"
            value="잘 모르겠다"
            onChange={handleCheckboxChange}
          />
          <label>잘 모르겠다</label>
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
