// src/components/survey/DogPreferencePriority.tsx
import React, { useState, useEffect } from 'react';
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
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [disabledOptions, setDisabledOptions] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // 추가된 상태

    // 상충하는 옵션 설정
    const conflictingOptions: Record<string, string[]> = {
        '다양한 환경에 잘 적응했으면 좋겠다': [
            '자주 놀아주거나 많은 활동을 하지 않아도 괜찮았으면 좋겠다.'
        ],
        '자주 놀아주거나 많은 활동을 하지 않아도 괜찮았으면 좋겠다.': [
            '다양한 환경에 잘 적응했으면 좋겠다'
        ],

        '자주 함께 뛰놀거나 운동할 수 있는 강아지를 원한다': [
            '적은 산책량으로도 만족할 수 있는 강아지를 원한다'
        ],
        '적은 산책량으로도 만족할 수 있는 강아지를 원한다': [
            '자주 함께 뛰놀거나 운동할 수 있는 강아지를 원한다'
        ],

        '외부 사람에 대해 경계심이 있으면 좋겠다': [
            '외부 사람이나 손님에 대해 친화적이었으면 좋겠다'
        ],
        '외부 사람이나 손님에 대해 친화적이었으면 좋겠다': [
            '외부 사람에 대해 경계심이 있으면 좋겠다'
        ],

        '훈련을 경험해본 적이 있어 상급 훈련도 가능했으면 좋겠다': [
            '기본 훈련에 잘 적응하고 쉽게 배우는 강아지를 원한다',
            '손이 많이 가지 않는 강아지를 원한다.' // 추가된 상충 조건
        ],
        '기본 훈련에 잘 적응하고 쉽게 배우는 강아지를 원한다': [
            '훈련을 경험해본 적이 있어 상급 훈련도 가능했으면 좋겠다',
            '손이 많이 가지 않는 강아지를 원한다.' // 추가된 상충 조건
        ],

        '긴 털을 선호한다': [
            '짧은 털을 선호한다',
            '털이 거의 없거나 관리가 쉬운 견종을 선호한다'
        ],
        '짧은 털을 선호한다': [
            '긴 털을 선호한다',
        ],
        '털이 거의 없거나 관리가 쉬운 견종을 선호한다': [
            '긴 털을 선호한다',
        ],


        '손이 많이 가지 않는 강아지를 원한다.': [
            '훈련을 경험해본 적이 있어 상급 훈련도 가능했으면 좋겠다',
            '기본 훈련에 잘 적응하고 쉽게 배우는 강아지를 원한다',
            '장난기가 많아 자주 놀았으면 좋겠다',
            '자주 함께 뛰놀거나 운동할 수 있는 강아지를 원한다'
        ],
        '사람들과 잘 어울리는 강아지를 원한다': [
            '손이 많이 가지 않는 강아지를 원한다.',
            '때로는 독립적이고 혼자 있는 시간을 즐길 수 있는 강아지를 원한다'
        ],
        '때로는 독립적이고 혼자 있는 시간을 즐길 수 있는 강아지를 원한다': [
            '사람들과 잘 어울리는 강아지를 원한다'
        ],


        '소형견을 선호한다': [
            '대형견을 선호한다',
            '초대형견을 선호한다'
        ],
        '중형견을 선호한다': [
            '초대형견을 선호한다'
        ],
        '대형견을 선호한다': [
            '소형견을 선호한다'
        ],
        '초대형견을 선호한다': [
            '소형견을 선호한다',
            '중형견을 선호한다'
        ]

    };

    // 체크박스 선택 처리
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, option: string) => {
        const isChecked = event.target.checked;
    
        setSelectedOptions((prevSelectedOptions) => {
            let updatedSelectedOptions;
    
            if (isChecked && prevSelectedOptions.length < 3) {
                updatedSelectedOptions = [...prevSelectedOptions, option];
    
                // 선택된 옵션과 상충하는 항목 비활성화
                const conflicts = conflictingOptions[option];
                if (conflicts) {
                    setDisabledOptions((prev) => [...prev, ...conflicts]);
                }
            } else if (!isChecked) {
                updatedSelectedOptions = prevSelectedOptions.filter((selected) => selected !== option);
    
                // 선택 해제 시 상충 항목 다시 활성화
                const conflicts = conflictingOptions[option];
                if (conflicts) {
                    setDisabledOptions((prev) => prev.filter((opt) => !conflicts.includes(opt)));
                }
            } else {
                updatedSelectedOptions = prevSelectedOptions; // 변경 사항 없음
            }
    
            // userInfo의 selectedPreferences 동기화
            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                selectedPreferences: updatedSelectedOptions, // 상태를 동기화
            }));
    
            return updatedSelectedOptions;
        });
    };
    

    const handleSubmit = async () => {

        const isComplete = Object.values(userInfo).every((value) => value !== '');
        console.log(isComplete)
    
        if (!isComplete) {
            alert('모든 질문에 답변해야 합니다.');
            return;
        }

        setIsSubmitting(true);

        setUserInfo({
            ...userInfo,
            selectedPreferences: selectedOptions // 선택된 옵션들을 userInfo에 저장
        });

        try {
            const user = auth.currentUser;
            console.log("user", user);
            if (!user) {
                console.error('사용자가 인증되지 않았습니다.');
                setIsSubmitting(false); // 에러 발생 시 버튼 활성화 복원
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
                    selectedPreferences: selectedOptions, // 선택된 옵션 저장
                    timestamp: new Date(),
                },
                { merge: true }
            );

            console.log(`설문조사 데이터가 ID ${newSurveyId}로 병합/저장되었습니다.`);
            console.log('유저별 설문조사 데이터가 성공적으로 저장되었습니다.');

            setTimeout(() => {
                router.push(`result/${newSurveyId}`);
            }, 3000);
        } catch (error) {
            console.error('데이터 저장 중 오류가 발생했습니다:', error);
            setIsSubmitting(false); // 에러 발생 시 버튼 활성화 복원
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <FormContainer>
            <Title>강아지를 고를 때 가장 중요하게 여기는 항목을 최대 3개 선택해주세요</Title>
            <Subtitle>해당 특성을 가진 강아지를 최우선으로 필터링합니다.</Subtitle>
            {Object.entries(categorizedOptions).map(([category, options]) => (
                <CategoryContainer key={category}>
                    <CategoryTitle>{category}</CategoryTitle>
                    <OptionContainer>
                        {options.map((option) => (
                            <Option key={option}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={option}
                                        checked={selectedOptions.includes(option)}
                                        onChange={(e) => handleCheckboxChange(e, option)}
                                        disabled={!selectedOptions.includes(option) && selectedOptions.length >= 3 || disabledOptions.includes(option)}
                                    />
                                    <span>{option}</span>
                                </label>
                            </Option>
                        ))}
                    </OptionContainer>
                </CategoryContainer>
            ))}
            <ButtonContainer>
                <button onClick={onPrevious}>이전</button>
                <button onClick={handleSubmit} disabled={selectedOptions.length === 0 || isSubmitting}>
                    {isSubmitting ? '제출 중...' : '설문 완료'}
                </button>
            </ButtonContainer>
        </FormContainer>
    );
};

const categorizedOptions = {
    "적응성 및 독립성": [
        '다양한 환경에 잘 적응했으면 좋겠다',
        '자주 놀아주거나 많은 활동을 하지 않아도 괜찮았으면 좋겠다.',
        '손이 많이 가지 않는 강아지를 원한다.'
    ],
    "가족 및 아이 친화성": [
        '가족과 친밀하게 지냈으면 좋겠다',
        '아이와 함께 잘 놀아줄 수 있는 강아지를 원한다'
    ],
    "소음 및 침 흘림": [
        '짖는 소리가 적었으면 좋겠다',
        '침 흘림이 적었으면 좋겠다'
    ],
    "에너지 및 운동 수준": [
        '자주 함께 뛰놀거나 운동할 수 있는 강아지를 원한다',
        '적은 산책량으로도 만족할 수 있는 강아지를 원한다',
        '장난기가 많아 자주 놀았으면 좋겠다'
    ],
    "다른 반려동물 및 낯선 사람과의 친화성": [
        '다른 반려동물과도 잘 지냈으면 좋겠다',
        '외부 사람에 대해 경계심이 있으면 좋겠다',
        '외부 사람이나 손님에 대해 친화적이었으면 좋겠다'
    ],
    "훈련 가능성 및 경계심": [
        '훈련을 경험해본 적이 있어 상급 훈련도 가능했으면 좋겠다',
        '기본 훈련에 잘 적응하고 쉽게 배우는 강아지를 원한다',
        '경계심이 강했으면 좋겠다'
    ],
    "털 빠짐 및 관리": [
        '털이 거의 없거나 관리가 쉬운 견종을 선호한다',
        '털 관리가 간편했으면 좋겠다',
        '긴 털을 선호한다',
        '짧은 털을 선호한다'
    ],
    "크기": [
        '소형견을 선호한다',
        '중형견을 선호한다',
        '대형견을 선호한다',
        '초대형견을 선호한다'
    ],
    "사교성": [
        '사람들과 잘 어울리는 강아지를 원한다',
        '때로는 독립적이고 혼자 있는 시간을 즐길 수 있는 강아지를 원한다'
    ]
};

const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
    margin: 20px;
  }
`;

const Option = styled.div`
  display: inline-flex;
  width: 45%;
  align-items: center;

  label {
    cursor: pointer;
    display: flex;
    align-items: center;

    input[type='checkbox'] {
      margin-right: 8px;
    }

    /* 체크박스가 비활성화일 때 span 색상을 변경 */
    input[type='checkbox']:disabled + span {
      color: #aaa;
      cursor: not-allowed;
    }
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
    &:disabled {
      background-color: #d3d3d3;
      cursor: not-allowed;
    }
  }
`;

const CategoryContainer = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const CategoryTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 40px;
  margin-top: 60px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-top: 40px;
    margin-bottom: 15px;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-top: -30px;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export default DogPreferencePriority;
