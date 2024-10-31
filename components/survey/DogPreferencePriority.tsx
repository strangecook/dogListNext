// src/components/survey/DogPreferencePriority.tsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SurveyData } from './SurveyDataType';
import { calculateScore } from './UserTest';
import { recommendDogsBasedOnUserInput } from './recommendDogBasedOnUserInput';
import { getFirestore, doc, collection, setDoc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';

const db = getFirestore();
const auth = getAuth();

interface DogPreferencePriorityProps {
  onNext: () => void;
  onPrevious: () => void;
  userInfo: SurveyData;
  setUserInfo: React.Dispatch<React.SetStateAction<SurveyData>>;
}

const DogPreferencePriority: React.FC<DogPreferencePriorityProps> = ({ onNext, onPrevious, userInfo, setUserInfo }) => {
  const router = useRouter();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, key: string) => {
    setUserInfo({
      ...userInfo,
      [key]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log('강아지 선호 사항 제출:', userInfo);
    console.log("실험하기", calculateScore(userInfo));
    console.log("추천강아지", recommendDogsBasedOnUserInput(userInfo));

    try {
      const user = auth.currentUser;
      console.log("user", user);
      if (!user) {
        console.error('사용자가 인증되지 않았습니다.');
        return;
      }
    
      const userId = user.uid;
      const userSurveysRef = collection(doc(db, 'users', userId), 'surveys');
    
      // 현재 설문조사 문서 개수를 가져와서 번호 설정
      const querySnapshot = await getDocs(userSurveysRef);
      const currentSurveyCount = querySnapshot.size;
      const newSurveyId = (currentSurveyCount + 1).toString(); // 단순 번호 ID
    
      // 새로운 설문 데이터를 병합하여 저장
      await setDoc(
        doc(userSurveysRef, newSurveyId),
        {
          ...userInfo,
          timestamp: new Date(),
        },
        { merge: true } // 기존 데이터와 병합
      );
    
      console.log(`설문조사 데이터가 ID ${newSurveyId}로 병합/저장되었습니다.`);
      console.log('유저별 설문조사 데이터가 성공적으로 저장되었습니다.');
    
      // 결과 페이지로 리다이렉트
      setTimeout(() => {
        router.push(`result/${newSurveyId}`);
      }, 3000);
    } catch (error) {
      console.error('데이터 저장 중 오류가 발생했습니다:', error);
    }
  };

  // 페이지가 렌더링될 때마다 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <h2>강아지를 고를 때 가장 중요하게 여기는 항목을 선택해주세요</h2>
      <Dropdown>
        <label>우선순위 1</label>
        <select value={userInfo.priority1 || ''} onChange={(e) => handleSelectChange(e, 'priority1')}>
          <option value="">선택하세요</option>
          <option value="temperament">성격</option>
          <option value="energy">에너지 수준</option>
          <option value="size">크기</option>
          <option value="shedding">털 빠짐</option>
          <option value="trainability">훈련 가능성</option>
          {/* 추가 옵션 */}
        </select>
      </Dropdown>
      <Dropdown>
        <label>우선순위 2</label>
        <select value={userInfo.priority2 || ''} onChange={(e) => handleSelectChange(e, 'priority2')}>
          <option value="">선택하세요</option>
          <option value="temperament">성격</option>
          <option value="energy">에너지 수준</option>
          <option value="size">크기</option>
          <option value="shedding">털 빠짐</option>
          <option value="trainability">훈련 가능성</option>
          {/* 추가 옵션 */}
        </select>
      </Dropdown>
      <Dropdown>
        <label>우선순위 3</label>
        <select value={userInfo.priority3 || ''} onChange={(e) => handleSelectChange(e, 'priority3')}>
          <option value="">선택하세요</option>
          <option value="temperament">성격</option>
          <option value="energy">에너지 수준</option>
          <option value="size">크기</option>
          <option value="shedding">털 빠짐</option>
          <option value="trainability">훈련 가능성</option>
          {/* 추가 옵션 */}
        </select>
      </Dropdown>
      <ButtonContainer>
        <button onClick={onPrevious}>이전</button>
        <button onClick={handleSubmit}>설문 완료</button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Dropdown = styled.div`
  margin: 10px 0;
  select {
    width: 200px;
    padding: 8px;
    border-radius: 5px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;

  button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #4caf50;
    color: white;
    &:hover {
      background-color: #45a049;
    }
  }
`;

export default DogPreferencePriority;
