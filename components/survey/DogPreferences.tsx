import React, { useState } from 'react';
import { FormContainer, NavigationButton, Label, ButtonContainer, FormTitle, Blocked, CheckboxContainer } from './commonStyles'; // 공통 스타일을 가져옴

interface Preferences {
  dogSize: string[];
  coatType: string[];
  playfulnessLevel: string[];
  budget: string[];
  monthlyExpenses: string[];
  loyalty: string[];
  strangerCaution: string[];
  interactionFrequency: string[];
  trainingSpeed: string[];
  patienceLevel: string[];
  firstTimeOwner: string[];
  interactionImportance: string[];
  allergyConcern: string[];
  droolingConcern: string[];
  sheddingTolerance: string[];
  bathingFrequency: string[];
  groomingFrequency: string[];
  coatPreference: string[];
  coatLength: string[];
  barkingPreference: string[];
  playfulnessPreference: string[];
}

interface DogPreferencesProps {
  onNext: () => void;
  onPrevious: () => void;
}

const DogPreferences: React.FC<DogPreferencesProps> = ({ onNext, onPrevious }) => {
  const [preferences, setPreferences] = useState<Preferences>({
    dogSize: [],
    coatType: [],
    playfulnessLevel: [],
    budget: [],
    monthlyExpenses: [],
    loyalty: [],
    strangerCaution: [],
    interactionFrequency: [],
    trainingSpeed: [],
    patienceLevel: [],
    firstTimeOwner: [],
    interactionImportance: [],
    allergyConcern: [],
    droolingConcern: [],
    sheddingTolerance: [],
    bathingFrequency: [],
    groomingFrequency: [],
    coatPreference: [],
    coatLength: [],
    barkingPreference: [],
    playfulnessPreference: [],
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        [name]: [...prevPreferences[name as keyof Preferences], value], // 체크된 값을 배열에 추가
      }));
    } else {
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        [name]: prevPreferences[name as keyof Preferences].filter((item: string) => item !== value), // 체크 해제된 값 제거
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('강아지 선호 사항 제출:', preferences);
    onNext(); // 다음 단계로 이동
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Blocked />
        <FormTitle>강아지 선호</FormTitle>

        <Label>강아지를 처음 키우시나요?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="firstTimeOwner"
            value="예"
            onChange={handleCheckboxChange}
          />
          <label>예</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="firstTimeOwner"
            value="아니오"
            onChange={handleCheckboxChange}
          />
          <label>아니오</label>
        </CheckboxContainer>

        <Label>강아지가 낯선 사람을 얼마나 경계하길 원하십니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="strangerCaution"
            value="거의 경계하지 않길 원한다"
            onChange={handleCheckboxChange}
          />
          <label>거의 경계하지 않길 원한다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="strangerCaution"
            value="적당히 경계심을 가졌으면 좋겠다"
            onChange={handleCheckboxChange}
          />
          <label>적당히 경계심을 가졌으면 좋겠다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="strangerCaution"
            value="낯선 사람에게 강하게 경계심을 가졌으면 좋겠다"
            onChange={handleCheckboxChange}
          />
          <label>낯선 사람에게 강하게 경계심을 가졌으면 좋겠다</label>
        </CheckboxContainer>

        <Label>강아지와 얼마나 자주 소통을 하고 싶은가요?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="interactionFrequency"
            value="거의 시간이 없다"
            onChange={handleCheckboxChange}
          />
          <label>거의 시간이 없다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="interactionFrequency"
            value="하루에 한두 번 짧게 상호작용한다"
            onChange={handleCheckboxChange}
          />
          <label>하루에 한두 번 짧게 상호작용한다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="interactionFrequency"
            value="정기적으로 상호작용하지만 독립적인 시간도 필요하다"
            onChange={handleCheckboxChange}
          />
          <label>정기적으로 상호작용하지만 독립적인 시간도 필요하다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="interactionFrequency"
            value="자주 상호작용하며, 많이 시간을 보낼 수 있다"
            onChange={handleCheckboxChange}
          />
          <label>자주 상호작용하며, 많이 시간을 보낼 수 있다</label>
        </CheckboxContainer>

        <Label>강아지가 훈련에 얼마나 빠르게 적응하길 원하십니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="trainingSpeed"
            value="느리게 배워도 상관없다"
            onChange={handleCheckboxChange}
          />
          <label>느리게 배워도 상관없다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="trainingSpeed"
            value="적당한 시간 내에 배웠으면 좋겠다"
            onChange={handleCheckboxChange}
          />
          <label>적당한 시간 내에 배웠으면 좋겠다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="trainingSpeed"
            value="빠르게 배웠으면 좋겠다"
            onChange={handleCheckboxChange}
          />
          <label>빠르게 배웠으면 좋겠다</label>
        </CheckboxContainer>

        <Label>훈련 도중 인내심을 얼마나 유지할 수 있습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="patienceLevel"
            value="인내심이 거의 없다"
            onChange={handleCheckboxChange}
          />
          <label>인내심이 거의 없다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="patienceLevel"
            value="짧은 시간은 참을 수 있다"
            onChange={handleCheckboxChange}
          />
          <label>짧은 시간은 참을 수 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="patienceLevel"
            value="평균적인 인내심이 있다"
            onChange={handleCheckboxChange}
          />
          <label>평균적인 인내심이 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="patienceLevel"
            value="오랜 시간 참을 수 있다"
            onChange={handleCheckboxChange}
          />
          <label>오랜 시간 참을 수 있다</label>
        </CheckboxContainer>

        <Label>강아지와의 상호작용에서 무엇을 더 중요하게 생각하십니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="interactionImportance"
            value="운동 및 활동적인 상호작용"
            onChange={handleCheckboxChange}
          />
          <label>운동 및 활동적인 상호작용</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="interactionImportance"
            value="감정적인 상호작용"
            onChange={handleCheckboxChange}
          />
          <label>감정적인 상호작용</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="interactionImportance"
            value="독립적인 성향을 존중"
            onChange={handleCheckboxChange}
          />
          <label>독립적인 성향을 존중</label>
        </CheckboxContainer>

        <Label>털 알레르기가 있거나 알레르기 걱정이 되십니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="allergyConcern"
            value="예"
            onChange={handleCheckboxChange}
          />
          <label>예</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="allergyConcern"
            value="아니오"
            onChange={handleCheckboxChange}
          />
          <label>아니오</label>
        </CheckboxContainer>

        <Label>강아지가 침을 많이 흘린다면, 얼마나 신경 쓰일 것 같습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="droolingConcern"
            value="전혀 신경 쓰이지 않는다"
            onChange={handleCheckboxChange}
          />
          <label>전혀 신경 쓰이지 않는다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="droolingConcern"
            value="약간 신경 쓰이지만 감수할 수 있다"
            onChange={handleCheckboxChange}
          />
          <label>약간 신경 쓰이지만 감수할 수 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="droolingConcern"
            value="자주 닦아야 한다면 불편할 것 같다"
            onChange={handleCheckboxChange}
          />
          <label>자주 닦아야 한다면 불편할 것 같다</label>
        </CheckboxContainer>

        <Label>강아지의 털 빠짐을 얼마나 감당할 수 있습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="sheddingTolerance"
            value="털 빠짐이 심해도 상관없다"
            onChange={handleCheckboxChange}
          />
          <label>털 빠짐이 심해도 상관없다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="sheddingTolerance"
            value="약간의 털 빠짐은 감수할 수 있다"
            onChange={handleCheckboxChange}
          />
          <label>약간의 털 빠짐은 감수할 수 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="sheddingTolerance"
            value="털 빠짐이 적은 강아지를 원한다"
            onChange={handleCheckboxChange}
          />
          <label>털 빠짐이 적은 강아지를 원한다</label>
        </CheckboxContainer>

        <Label>강아지를 얼마나 자주 목욕시킬 의향이 있습니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="bathingFrequency"
            value="매주"
            onChange={handleCheckboxChange}
          />
          <label>매주</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="bathingFrequency"
            value="매달"
            onChange={handleCheckboxChange}
          />
          <label>매달</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="bathingFrequency"
            value="필요할 때만"
            onChange={handleCheckboxChange}
          />
          <label>필요할 때만</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="bathingFrequency"
            value="가능하면 자주 하지 않기를 원한다"
            onChange={handleCheckboxChange}
          />
          <label>가능하면 자주 하지 않기를 원한다</label>
        </CheckboxContainer>

        <Label>강아지의 털을 얼마나 자주 손질할 의향이 있으십니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="groomingFrequency"
            value="매일 빗질 및 관리"
            onChange={handleCheckboxChange}
          />
          <label>매일 빗질 및 관리</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="groomingFrequency"
            value="일주일에 2~3회 빗질"
            onChange={handleCheckboxChange}
          />
          <label>일주일에 2~3회 빗질</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="groomingFrequency"
            value="가끔 빗질 (일주일에 1회 이하)"
            onChange={handleCheckboxChange}
          />
          <label>가끔 빗질 (일주일에 1회 이하)</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="groomingFrequency"
            value="털 관리가 적게 필요했으면 좋겠다"
            onChange={handleCheckboxChange}
          />
          <label>털 관리가 적게 필요했으면 좋겠다</label>
        </CheckboxContainer>

        <Label>강아지의 털 유형 중 어떤 것을 선호하십니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="coatPreference"
            value="짧고 관리가 쉬운 털"
            onChange={handleCheckboxChange}
          />
          <label>짧고 관리가 쉬운 털</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="coatPreference"
            value="부드럽고 길게 자라는 털"
            onChange={handleCheckboxChange}
          />
          <label>부드럽고 길게 자라는 털</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="coatPreference"
            value="털이 거의 없는 무모견"
            onChange={handleCheckboxChange}
          />
          <label>털이 거의 없는 무모견</label>
        </CheckboxContainer>

        <Label>강아지의 털 길이 중 어느 것을 선호하십니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="coatLength"
            value="짧은 털"
            onChange={handleCheckboxChange}
          />
          <label>짧은 털</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="coatLength"
            value="중간 길이의 털"
            onChange={handleCheckboxChange}
          />
          <label>중간 길이의 털</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="coatLength"
            value="긴 털"
            onChange={handleCheckboxChange}
          />
          <label>긴 털</label>
        </CheckboxContainer>

        <Label>어떤 크기의 강아지를 선호하십니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="dogSize"
            value="소형견"
            onChange={handleCheckboxChange}
          />
          <label>소형견</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="dogSize"
            value="중형견"
            onChange={handleCheckboxChange}
          />
          <label>중형견</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="dogSize"
            value="대형견"
            onChange={handleCheckboxChange}
          />
          <label>대형견</label>
        </CheckboxContainer>

        <Label>강아지가 언제 짖으면 좋겠나요?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="barkingPreference"
            value="필요한 경우에만 짖는다"
            onChange={handleCheckboxChange}
          />
          <label>필요한 경우에만 짖는다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="barkingPreference"
            value="경고나 흥분할 때만 짖는다"
            onChange={handleCheckboxChange}
          />
          <label>경고나 흥분할 때만 짖는다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="barkingPreference"
            value="다양한 상황에서 짖는다"
            onChange={handleCheckboxChange}
          />
          <label>다양한 상황에서 짖는다</label>
        </CheckboxContainer>

        <Label>강아지의 장난기 수준을 얼마나 원하십니까?</Label>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="playfulnessPreference"
            value="장난기가 많아 자주 놀고 싶다"
            onChange={handleCheckboxChange}
          />
          <label>장난기가 많아 자주 놀고 싶다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="playfulnessPreference"
            value="적당히 장난기가 있다"
            onChange={handleCheckboxChange}
          />
          <label>적당히 장난기가 있다</label>
        </CheckboxContainer>
        <CheckboxContainer>
          <input
            type="checkbox"
            name="playfulnessPreference"
            value="조용하고 장난기가 적다"
            onChange={handleCheckboxChange}
          />
          <label>조용하고 장난기가 적다</label>
        </CheckboxContainer>


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
