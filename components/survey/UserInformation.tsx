import React, { useState } from 'react';
import styled from 'styled-components';

interface UserInfo {
  [key: string]: string[]; // 모든 문자열 키에 대해 string[] 타입을 허용
  age: string[];
  incomeSource: string[];
  housingType: string[];
  movingPossibility: string[];
}

interface UserInformationProps {
  onNext: () => void;
}

// 스타일드 컴포넌트 정의
const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px; /* 폼의 너비를 더 넓게 조정 */
  margin: 40px auto; /* 페이지가 확장되도록 위 아래 여백 */
  font-family: Arial, sans-serif;
  width: 100%;
  min-height: 100vh; /* 페이지 전체 높이를 설정해 자연스럽게 확장되도록 함 */

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
    margin: 20px;
  }
`;

const HeaderImage = styled.div`
  background-image: url('/path-to-your-image.jpg');
  background-size: cover;
  background-position: center;
  height: 200px; /* 더 큰 이미지 설정 */
  border-radius: 8px 8px 0 0;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const FormTitle = styled.h2`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  margin: -20px -20px 20px -20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CheckboxContainer = styled.div`
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
    margin-top: 15px;
  }
`;

const UserInformation: React.FC<UserInformationProps> = ({ onNext }) => {
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
    onNext(); // 다음 단계로 이동
  };

  return (
    <FormContainer>
      <HeaderImage />
      <form onSubmit={handleSubmit}>
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

        <Button type="submit">다음 단계</Button>
      </form>
    </FormContainer>
  );
};

export default UserInformation;
