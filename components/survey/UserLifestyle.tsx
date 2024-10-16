import React, { useState, useEffect } from 'react';
import { FormContainer, NavigationButton, Label, CheckboxContainer, ButtonContainer, FormTitle, Blocked, QuestionGroup } from './commonStyles'; // 공통 스타일 가져옴

interface Lifestyle {
  familyTime: string[]; // 가족과 보내는 시간
  aloneTime: string[]; // 혼자 있는 시간
  aloneTimeSolution: string[]; // 혼자 있는 시간 대처 방안
  cleaningFrequency: string[]; // 청소 빈도
  walkingPark: string[]; // 산책할 수 있는 공원 여부
  walkingFrequency: string[]; // 산책 빈도
  cookingPreference: string[]; // 요리 선호도
}

interface UserLifestyleProps {
  onNext: () => void;
  onPrevious: () => void;
}

const UserLifestyle: React.FC<UserLifestyleProps> = ({ onNext, onPrevious }) => {
  const [lifestyle, setLifestyle] = useState<Lifestyle>({
    familyTime: [],
    aloneTime: [],
    aloneTimeSolution: [],
    cleaningFrequency: [],
    walkingPark: [],
    walkingFrequency: [],
    cookingPreference: [],
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setLifestyle((prevLifestyle) => {
      const currentValues = prevLifestyle[name as keyof Lifestyle];
      const updatedValues = Array.isArray(currentValues) ? currentValues : [];
      
      if (checked) {
        return {
          ...prevLifestyle,
          [name]: [...updatedValues, value],
        };
      } else {
        return {
          ...prevLifestyle,
          [name]: updatedValues.filter((item) => item !== value),
        };
      }
    });
  };

    // 페이지가 렌더링될 때마다 스크롤을 최상단으로 이동
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('유저 생활 패턴 제출:', lifestyle);
    onNext();
  };


  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Blocked />
        <FormTitle>유저 생활 패턴</FormTitle>

        <Label>하루 중 강아지에게 할애할 수 있는 시간은 얼마입니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="availableTime"
            value="30분 이하"
            onChange={handleCheckboxChange}
          />
          <label>30분 이하</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="availableTime"
            value="30분 ~ 1시간"
            onChange={handleCheckboxChange}
          />
          <label>30분 ~ 1시간</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="availableTime"
            value="1시간 이상"
            onChange={handleCheckboxChange}
          />
          <label>1시간 이상</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>거주하는 집의 소음 수준은 어떻습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="noiseLevel"
            value="매우 조용하다"
            onChange={handleCheckboxChange}
          />
          <label>매우 조용하다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="noiseLevel"
            value="적당하다"
            onChange={handleCheckboxChange}
          />
          <label>적당하다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="noiseLevel"
            value="소음이 많다"
            onChange={handleCheckboxChange}
          />
          <label>소음이 많다</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>주로 어떤 음악을 듣습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="musicPreference"
            value="클래식"
            onChange={handleCheckboxChange}
          />
          <label>클래식</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="musicPreference"
            value="팝"
            onChange={handleCheckboxChange}
          />
          <label>팝</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="musicPreference"
            value="록"
            onChange={handleCheckboxChange}
          />
          <label>록</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="musicPreference"
            value="힙합"
            onChange={handleCheckboxChange}
          />
          <label>힙합</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="musicPreference"
            value="발라드"
            onChange={handleCheckboxChange}
          />
          <label>발라드</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>강아지와 가족이 함께 보내는 시간은 얼마나 되나요?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="familyTime"
            value="1시간 미만"
            onChange={handleCheckboxChange}
          />
          <label>1시간 미만</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="familyTime"
            value="1~2시간"
            onChange={handleCheckboxChange}
          />
          <label>1~2시간</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="familyTime"
            value="2~4시간"
            onChange={handleCheckboxChange}
          />
          <label>2~4시간</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="familyTime"
            value="4~6시간"
            onChange={handleCheckboxChange}
          />
          <label>4~6시간</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="familyTime"
            value="6시간 이상"
            onChange={handleCheckboxChange}
          />
          <label>6시간 이상</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>강아지가 혼자 있는 시간이 얼마나 될까요?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="aloneTime"
            value="6시간 이상"
            onChange={handleCheckboxChange}
          />
          <label>6시간 이상</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="aloneTime"
            value="3~6시간"
            onChange={handleCheckboxChange}
          />
          <label>3~6시간</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="aloneTime"
            value="1~3시간"
            onChange={handleCheckboxChange}
          />
          <label>1~3시간</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="aloneTime"
            value="거의 혼자 있지 않음"
            onChange={handleCheckboxChange}
          />
          <label>거의 혼자 있지 않음</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>강아지가 혼자 있는 시간이 많을 경우, 어떻게 대처할 계획이 있으십니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="aloneTimeSolution"
            value="펫 시터 이용"
            onChange={handleCheckboxChange}
          />
          <label>펫 시터나 돌봄 서비스를 이용할 것이다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="aloneTimeSolution"
            value="가족/이웃 맡김"
            onChange={handleCheckboxChange}
          />
          <label>가족이나 이웃에게 맡길 것이다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="aloneTimeSolution"
            value="특별 계획 없음"
            onChange={handleCheckboxChange}
          />
          <label>특별한 계획이 없다</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>집 청소를 얼마나 자주 하시나요?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="cleaningFrequency"
            value="거의 청소하지 않음"
            onChange={handleCheckboxChange}
          />
          <label>거의 청소하지 않는다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="cleaningFrequency"
            value="주 1~2회"
            onChange={handleCheckboxChange}
          />
          <label>일주일에 한두 번 청소한다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="cleaningFrequency"
            value="매일"
            onChange={handleCheckboxChange}
          />
          <label>매일 청소할 수 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="cleaningFrequency"
            value="하루에 여러 번"
            onChange={handleCheckboxChange}
          />
          <label>하루에 여러 번 청소할 수 있다</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>강아지를 산책시킬 수 있는 공원이나 산책로가 집 근처에 있습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="walkingPark"
            value="매우 가깝다"
            onChange={handleCheckboxChange}
          />
          <label>매우 가깝다 (5분 거리)</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="walkingPark"
            value="적당히 가깝다"
            onChange={handleCheckboxChange}
          />
          <label>적당히 가깝다 (10~20분 거리)</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="walkingPark"
            value="멀리 있다"
            onChange={handleCheckboxChange}
          />
          <label>멀리 있다 (20분 이상)</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="walkingPark"
            value="없다"
            onChange={handleCheckboxChange}
          />
          <label>없다</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>강아지가 매일 산책을 얼마나 자주 해야 하길 원하십니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="walkingFrequency"
            value="필요하지 않음"
            onChange={handleCheckboxChange}
          />
          <label>매일 산책이 필요하지 않길 원한다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="walkingFrequency"
            value="하루에 한 번"
            onChange={handleCheckboxChange}
          />
          <label>하루에 한 번 정도 산책했으면 좋겠다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="walkingFrequency"
            value="하루에 두 번 이상"
            onChange={handleCheckboxChange}
          />
          <label>하루에 두 번 이상 산책이 필요하다</label>
        </CheckboxContainer>
        <QuestionGroup/>
        <Label>요리하는 것을 좋아합니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="cookingPreference"
            value="매우 좋아함"
            onChange={handleCheckboxChange}
          />
          <label>매우 좋아한다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="cookingPreference"
            value="가끔 함"
            onChange={handleCheckboxChange}
          />
          <label>가끔 한다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="cookingPreference"
            value="별로 하지 않음"
            onChange={handleCheckboxChange}
          />
          <label>별로 하지 않는다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="cookingPreference"
            value="거의 하지 않음"
            onChange={handleCheckboxChange}
          />
          <label>거의 하지 않는다</label>
        </CheckboxContainer>

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
