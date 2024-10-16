import React, { useState, useEffect } from 'react';
import { FormContainer, NavigationButton, Label, ButtonContainer, FormTitle, Blocked, CheckboxContainer, QuestionGroup } from './commonStyles'; // 공통 스타일을 가져옴

interface Preferences {
  dogSize: string;
  coatType: string;
  playfulnessLevel: string;
  budget: string;
  monthlyExpenses: string;
  loyalty: string;
  strangerCaution: string;
  interactionFrequency: string;
  trainingSpeed: string;
  patienceLevel: string;
  firstTimeOwner: string;
  interactionImportance: string;
  allergyConcern: string;
  droolingConcern: string;
  sheddingTolerance: string;
  bathingFrequency: string;
  groomingFrequency: string;
  coatPreference: string;
  coatLength: string;
  barkingPreference: string;
  playfulnessPreference: string;
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
    budget: '',
    monthlyExpenses: '',
    loyalty: '',
    strangerCaution: '',
    interactionFrequency: '',
    trainingSpeed: '',
    patienceLevel: '',
    firstTimeOwner: '',
    interactionImportance: '',
    allergyConcern: '',
    droolingConcern: '',
    sheddingTolerance: '',
    bathingFrequency: '',
    groomingFrequency: '',
    coatPreference: '',
    coatLength: '',
    barkingPreference: '',
    playfulnessPreference: '',
  });

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };

  // 페이지가 렌더링될 때마다 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <label>
            <input
              type="radio"
              name="firstTimeOwner"
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
              name="firstTimeOwner"
              value="아니오"
              onChange={handleRadioChange}
            />
            아니오
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        <Label>강아지를 입양하거나 구입할 수 있는 예산이 얼마입니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="budgetForAdoption"
              value="10만 원 미만"
              onChange={handleRadioChange}
            />
            10만 원 미만
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="budgetForAdoption"
              value="10만 원 ~ 50만 원"
              onChange={handleRadioChange}
            />
            10만 원 ~ 50만 원
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="budgetForAdoption"
              value="50만 원 ~ 100만 원"
              onChange={handleRadioChange}
            />
            50만 원 ~ 100만 원
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="budgetForAdoption"
              value="100만 원 이상"
              onChange={handleRadioChange}
            />
            100만 원 이상
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        <Label>매달 강아지의 사료, 병원비, 용품비 등을 지출할 수 있는 금액은 얼마입니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="monthlyExpense"
              value="5만 원 이하"
              onChange={handleRadioChange}
            />
            5만 원 이하
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="monthlyExpense"
              value="5만 원 ~ 10만 원"
              onChange={handleRadioChange}
            />
            5만 원 ~ 10만 원
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="monthlyExpense"
              value="10만 원 ~ 20만 원"
              onChange={handleRadioChange}
            />
            10만 원 ~ 20만 원
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="monthlyExpense"
              value="20만 원 이상"
              onChange={handleRadioChange}
            />
            20만 원 이상
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        <Label>강아지가 얼마나 주인을 따르길 원하십니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="obedienceLevel"
              value="독립적인 성향을 원한다"
              onChange={handleRadioChange}
            />
            독립적인 성향을 원한다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="obedienceLevel"
              value="가끔은 독립적이고 가끔은 따랐으면 좋겠다"
              onChange={handleRadioChange}
            />
            가끔은 독립적이고 가끔은 따랐으면 좋겠다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="obedienceLevel"
              value="주인을 잘 따르면서도 독립적인 성향을 가졌으면 좋겠다"
              onChange={handleRadioChange}
            />
            주인을 잘 따르면서도 독립적인 성향을 가졌으면 좋겠다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="obedienceLevel"
              value="주인을 거의 항상 따르길 원한다"
              onChange={handleRadioChange}
            />
            주인을 거의 항상 따르길 원한다
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        <Label>강아지가 낯선 사람을 얼마나 경계하길 원하십니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="strangerCaution"
              value="거의 경계하지 않길 원한다"
              onChange={handleRadioChange}
            />
            거의 경계하지 않길 원한다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="strangerCaution"
              value="적당히 경계심을 가졌으면 좋겠다"
              onChange={handleRadioChange}
            />
            적당히 경계심을 가졌으면 좋겠다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="strangerCaution"
              value="낯선 사람에게 강하게 경계심을 가졌으면 좋겠다"
              onChange={handleRadioChange}
            />
            낯선 사람에게 강하게 경계심을 가졌으면 좋겠다
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        <Label>강아지와 얼마나 자주 소통을 하고 싶은가요?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="interactionFrequency"
              value="거의 시간이 없다"
              onChange={handleRadioChange}
            />
            거의 시간이 없다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="interactionFrequency"
              value="하루에 한두 번 짧게 상호작용한다"
              onChange={handleRadioChange}
            />
            하루에 한두 번 짧게 상호작용한다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="interactionFrequency"
              value="정기적으로 상호작용하지만 독립적인 시간도 필요하다"
              onChange={handleRadioChange}
            />
            정기적으로 상호작용하지만 독립적인 시간도 필요하다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="interactionFrequency"
              value="자주 상호작용하며, 많이 시간을 보낼 수 있다"
              onChange={handleRadioChange}
            />
            자주 상호작용하며, 많이 시간을 보낼 수 있다
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        <Label>강아지가 훈련에 얼마나 빠르게 적응하길 원하십니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="trainingSpeed"
              value="느리게 배워도 상관없다"
              onChange={handleRadioChange}
            />
            느리게 배워도 상관없다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="trainingSpeed"
              value="적당한 시간 내에 배웠으면 좋겠다"
              onChange={handleRadioChange}
            />
            적당한 시간 내에 배웠으면 좋겠다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="trainingSpeed"
              value="빠르게 배웠으면 좋겠다"
              onChange={handleRadioChange}
            />
            빠르게 배웠으면 좋겠다
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        <Label>훈련 도중 인내심을 얼마나 유지할 수 있습니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="patienceLevel"
              value="인내심이 거의 없다"
              onChange={handleRadioChange}
            />
            인내심이 거의 없다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="patienceLevel"
              value="짧은 시간은 참을 수 있다"
              onChange={handleRadioChange}
            />
            짧은 시간은 참을 수 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="patienceLevel"
              value="평균적인 인내심이 있다"
              onChange={handleRadioChange}
            />
            평균적인 인내심이 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="patienceLevel"
              value="오랜 시간 참을 수 있다"
              onChange={handleRadioChange}
            />
            오랜 시간 참을 수 있다
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        {/* 질문 31: 강아지와의 상호작용에서 무엇을 더 중요하게 생각하십니까? */}
        <Label>강아지와의 상호작용에서 무엇을 더 중요하게 생각하십니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="interactionImportance"
              value="운동 및 활동적인 상호작용"
              onChange={handleRadioChange}
            />
            운동 및 활동적인 상호작용
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="interactionImportance"
              value="감정적인 상호작용"
              onChange={handleRadioChange}
            />
            감정적인 상호작용
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="interactionImportance"
              value="독립적인 성향을 존중"
              onChange={handleRadioChange}
            />
            독립적인 성향을 존중
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        {/* 질문 33: 털 알레르기가 있거나 알레르기 걱정이 되십니까? */}
        <Label>털 알레르기가 있거나 알레르기 걱정이 되십니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="allergyConcern"
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
              name="allergyConcern"
              value="아니오"
              onChange={handleRadioChange}
            />
            아니오
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        {/* 질문 34: 강아지가 침을 많이 흘린다면, 얼마나 신경 쓰일 것 같습니까? */}
        <Label>강아지가 침을 많이 흘린다면, 얼마나 신경 쓰일 것 같습니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="droolingConcern"
              value="전혀 신경 쓰이지 않는다"
              onChange={handleRadioChange}
            />
            전혀 신경 쓰이지 않는다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="droolingConcern"
              value="약간 신경 쓰이지만 감수할 수 있다"
              onChange={handleRadioChange}
            />
            약간 신경 쓰이지만 감수할 수 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="droolingConcern"
              value="자주 닦아야 한다면 불편할 것 같다"
              onChange={handleRadioChange}
            />
            자주 닦아야 한다면 불편할 것 같다
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        {/* 질문 35: 강아지의 털 빠짐을 얼마나 감당할 수 있습니까? */}
        <Label>강아지의 털 빠짐을 얼마나 감당할 수 있습니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="sheddingTolerance"
              value="털 빠짐이 심해도 상관없다"
              onChange={handleRadioChange}
            />
            털 빠짐이 심해도 상관없다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="sheddingTolerance"
              value="약간의 털 빠짐은 감수할 수 있다"
              onChange={handleRadioChange}
            />
            약간의 털 빠짐은 감수할 수 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="sheddingTolerance"
              value="털 빠짐이 적은 강아지를 원한다"
              onChange={handleRadioChange}
            />
            털 빠짐이 적은 강아지를 원한다
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        {/* 질문 36: 강아지를 얼마나 자주 목욕시킬 의향이 있습니까? */}
        <Label>강아지를 얼마나 자주 목욕시킬 의향이 있습니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="bathingFrequency"
              value="매주"
              onChange={handleRadioChange}
            />
            매주
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="bathingFrequency"
              value="매달"
              onChange={handleRadioChange}
            />
            매달
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="bathingFrequency"
              value="필요할 때만"
              onChange={handleRadioChange}
            />
            필요할 때만
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="bathingFrequency"
              value="가능하면 자주 하지 않기를 원한다"
              onChange={handleRadioChange}
            />
            가능하면 자주 하지 않기를 원한다
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        {/* 질문 37: 강아지의 털을 얼마나 자주 손질할 의향이 있으십니까? */}
        <Label>강아지의 털을 얼마나 자주 손질할 의향이 있으십니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="groomingFrequency"
              value="매일 빗질 및 관리"
              onChange={handleRadioChange}
            />
            매일 빗질 및 관리
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="groomingFrequency"
              value="일주일에 2~3회 빗질"
              onChange={handleRadioChange}
            />
            일주일에 2~3회 빗질
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="groomingFrequency"
              value="가끔 빗질 (일주일에 1회 이하)"
              onChange={handleRadioChange}
            />
            가끔 빗질 (일주일에 1회 이하)
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="groomingFrequency"
              value="털 관리가 적게 필요했으면 좋겠다"
              onChange={handleRadioChange}
            />
            털 관리가 적게 필요했으면 좋겠다
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        {/* 질문 38: 강아지의 털 유형 중 어떤 것을 선호하십니까? */}
        <Label>강아지의 털 유형 중 어떤 것을 선호하십니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="coatPreference"
              value="짧고 관리가 쉬운 털"
              onChange={handleRadioChange}
            />
            짧고 관리가 쉬운 털
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="coatPreference"
              value="부드럽고 길게 자라는 털"
              onChange={handleRadioChange}
            />
            부드럽고 길게 자라는 털
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="coatPreference"
              value="털이 거의 없는 무모견"
              onChange={handleRadioChange}
            />
            털이 거의 없는 무모견
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        {/* 질문 39: 강아지의 털 길이 중 어느 것을 선호하십니까? */}
        <Label>강아지의 털 길이 중 어느 것을 선호하십니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="coatLength"
              value="짧은 털"
              onChange={handleRadioChange}
            />
            짧은 털
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="coatLength"
              value="중간 길이의 털"
              onChange={handleRadioChange}
            />
            중간 길이의 털
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="coatLength"
              value="긴 털"
              onChange={handleRadioChange}
            />
            긴 털
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        {/* 질문 40: 어떤 크기의 강아지를 선호하십니까? */}
        <Label>어떤 크기의 강아지를 선호하십니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="dogSize"
              value="소형견"
              onChange={handleRadioChange}
            />
            소형견
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="dogSize"
              value="중형견"
              onChange={handleRadioChange}
            />
            중형견
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="dogSize"
              value="대형견"
              onChange={handleRadioChange}
            />
            대형견
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        {/* 질문 41: 강아지가 언제 짖으면 좋겠나요? */}
        <Label>강아지가 언제 짖으면 좋겠나요?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="barkingPreference"
              value="필요한 경우에만 짖는다"
              onChange={handleRadioChange}
            />
            필요한 경우에만 짖는다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="barkingPreference"
              value="경고나 흥분할 때만 짖는다"
              onChange={handleRadioChange}
            />
            경고나 흥분할 때만 짖는다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="barkingPreference"
              value="다양한 상황에서 짖는다"
              onChange={handleRadioChange}
            />
            다양한 상황에서 짖는다
          </label>
        </CheckboxContainer>

        <QuestionGroup />

        {/* 질문 42: 강아지의 장난기 수준을 얼마나 원하십니까? */}
        <Label>강아지의 장난기 수준을 얼마나 원하십니까?</Label>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="playfulnessPreference"
              value="장난기가 많아 자주 놀고 싶다"
              onChange={handleRadioChange}
            />
            장난기가 많아 자주 놀고 싶다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="playfulnessPreference"
              value="적당히 장난기가 있다"
              onChange={handleRadioChange}
            />
            적당히 장난기가 있다
          </label>
        </CheckboxContainer>
        <CheckboxContainer>
          <label>
            <input
              type="radio"
              name="playfulnessPreference"
              value="조용하고 장난기가 적다"
              onChange={handleRadioChange}
            />
            조용하고 장난기가 적다
          </label>
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
