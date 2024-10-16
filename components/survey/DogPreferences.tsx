import React, { useState } from 'react';
import { FormContainer, NavigationButton, Label, ButtonContainer, FormTitle, Blocked } from './commonStyles'; // 공통 스타일을 가져옴

interface Preferences {
  dogSize: string;
  coatType: string;
  playfulnessLevel: string;
}

interface DogPreferencesProps {
  onNext: () => void;
  onPrevious: () => void;
}

const DogPreferences: React.FC<DogPreferencesProps> = ({ onNext, onPrevious }) => {
  const [preferences, setPreferences] = useState<Preferences>({
    dogSize: '',
    coatType: '',
    playfulnessLevel: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('강아지 선호 사항 제출:', preferences);
    onNext(); // 설문 완료 또는 다음 단계로 이동
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Blocked />
        <FormTitle>강아지 선호</FormTitle>

        <Label>어떤 크기의 강아지를 선호하십니까?</Label>
        <select name="dogSize" value={preferences.dogSize} onChange={handleChange}>
          <option value="">선택하세요</option>
          <option value="소형견">소형견</option>
          <option value="중형견">중형견</option>
          <option value="대형견">대형견</option>
          <option value="상관없음">상관없음</option>
        </select>

        <Label>강아지의 털 유형 중 어떤 것을 선호하십니까?</Label>
        <select name="coatType" value={preferences.coatType} onChange={handleChange}>
          <option value="">선택하세요</option>
          <option value="짧은 털">짧고 관리가 쉬운 털</option>
          <option value="중간 털">중간 길이의 털</option>
          <option value="긴 털">긴 털</option>
          <option value="상관없음">상관없음</option>
        </select>

        <Label>강아지의 장난기 수준을 얼마나 원하십니까?</Label>
        <select name="playfulnessLevel" value={preferences.playfulnessLevel} onChange={handleChange}>
          <option value="">선택하세요</option>
          <option value="장난기가 많다">장난기가 많다</option>
          <option value="적당하다">적당히 장난기가 있다</option>
          <option value="조용하다">조용하고 장난기가 적다</option>
          <option value="상관없음">상관없음</option>
        </select>

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
