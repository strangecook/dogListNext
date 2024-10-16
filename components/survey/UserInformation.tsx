import React, { useState } from 'react';
import { FormContainer, NavigationButton, CheckboxContainer, Label, ButtonContainer, Blocked, FormTitle } from './commonStyles';

interface UserInfo {
  [key: string]: string[];
  age: string[];
  incomeSource: string[];
  housingType: string[];
  movingPossibility: string[];
}

interface UserInformationProps {
  onNext: () => void;
  onPrevious: () => void;
}

const UserInformation: React.FC<UserInformationProps> = ({ onNext, onPrevious }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    age: [],
    incomeSource: [],
    housingType: [],
    movingPossibility: [],
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setUserInfo({
        ...userInfo,
        [name]: [...userInfo[name], value],
      });
    } else {
      setUserInfo({
        ...userInfo,
        [name]: userInfo[name].filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('유저 정보 제출:', userInfo);
    onNext();
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Blocked />
        <FormTitle>유저 정보</FormTitle>

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
        {/* 나머지 체크박스 항목 생략 */}

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
