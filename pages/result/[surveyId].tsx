// SurveyResult.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  DetailContainer,
  FilterContainer,
  FilterButton,
  DogListContainer,
  DogButton,
  ChartContainer,
  ChartRow,
  Label,
  BarWrapper,
  UserBar,
  DogBar,
  Image,
  SliderContainer,
  SingleImageContainer,
  LoaderDiv,
} from '../../components/result/SurveyResultStyles';
import { fetchImagesFromStorage, mapDogDataToUserScores, fetchSurveyData, authenticateUser, fetchRecommendedDogs } from '../../components/result/resultDataManager';
import { SurveyData } from '../../components/survey/SurveyDataType';
import { ClipLoader } from 'react-spinners';
import Slider from 'react-slick';
import { sliderSettings } from '../../components/BreedName/SliderComponents';
import { calculateScore } from '../../components/survey/UserTest';
import { getBreedsData } from '../../dataFetch/fetchAndStoreBreeds';
import { DogOwnerEvaluation } from '../../types/DogOwnerEvaluation';
import styled from 'styled-components';

// 설명 텍스트 스타일
const Explanation = styled.div`
  font-size: 0.9rem;
  color: #555;
  margin-top: 4px;
  text-align: center;
`;

// 막대 그래프 색상 설명 스타일
const Legend = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendColor = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  border-radius: 5px;
`;

const getScoreExplanation = (scoreKey: string, userScore: number) => {
  switch (scoreKey) {
    case 'adaptability':
      return userScore > 3 ? '이 강아지는 다양한 환경에 잘 적응합니다.' : '이 강아지는 환경 변화에 민감할 수 있습니다.';
    case 'energyLevel':
      return userScore > 3 ? '활동적이며 많은 운동이 필요합니다.' : '조용하고 활동량이 적습니다.';
    case 'trainability':
      return userScore > 3 ? '훈련이 쉬운 편입니다.' : '훈련에 약간의 시간이 필요할 수 있습니다.';
    default:
      return '이 항목에 대한 설명은 준비 중입니다.';
  }
};

// SurveyResult 컴포넌트
const SurveyResult: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [recommendedDogs, setRecommendedDogs] = useState<any[]>([]);
  const [selectedDog, setSelectedDog] = useState<any | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("점수 기반");
  const [mappedDogs, setMappedDogs] = useState<any[][]>([]); // 강아지 데이터 순서를 저장
  const [showUserScore, setShowUserScore] = useState(true);  // 사용자 점수 표시 상태
  const [showDogScore, setShowDogScore] = useState(true);    // 강아지 점수 표시 상태
  const router = useRouter();
  const { surveyId } = router.query;

  useEffect(() => {
    const unsubscribe = authenticateUser((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 데이터 가져오기 및 설정
  useEffect(() => {
    if (!user || !surveyId) return;

    const fetchData = async () => {
      try {
        const data = await fetchSurveyData(user.uid, surveyId as string);
        setSurveyData(data);

        const { bestDogs, top100Dogs, bestMatchesFromFiltered } = await fetchRecommendedDogs(data);

        // 강아지 데이터를 순서대로 저장
        const dogs = [bestDogs, top100Dogs, bestMatchesFromFiltered];
        setMappedDogs(dogs); // 순서 저장
        setRecommendedDogs(dogs[0]); // 기본값으로 "점수 기반" 설정
        setSelectedDog(dogs[0][0]); // 첫 번째 강아지를 기본 선택
      } catch (error) {
        console.error("Error loading survey data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, surveyId]);

  const applyFilter = (filter: string) => {
    switch (filter) {
      case "점수 기반":
        setRecommendedDogs(mappedDogs[0]);
        break;

      case "인기있는 강아지":
        setRecommendedDogs(mappedDogs[1]);
        break;

      case "유저가 선호하는 강아지":
        setRecommendedDogs(mappedDogs[2]);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedDog) {
      const loadDogImages = async () => {
        const fetchedImages = await fetchImagesFromStorage(selectedDog.englishName);
        setImages(fetchedImages || []);
      };
      loadDogImages();
    }
  }, [selectedDog]);

  // 그래프 렌더링 함수
  const renderComparisonChart = () => {
    if (!surveyData) {
      console.log("Survey data is null or undefined.");
      return null;
    }
  
    if (!selectedDog) {
      console.log("Selected dog is null or undefined.");
      return null;
    }
  
    console.log("Selected Dog:", selectedDog);
  
    const userScores: DogOwnerEvaluation = calculateScore(surveyData);
    console.log("User Scores:", userScores);
  
    const fieldLabels: Record<string, string> = {
      adaptability: "적응력",
      affectionTowardsFamily: "가족과의 친화도",
      barkingLevel: "짖는 소리",
      droolingLevel: "침 흘림 정도",
      energyLevel: "에너지 수준",
      groomingNeed: "털 관리 필요도",
      guardInstinct: "경계심",
      goodWithOtherPets: "다른 반려동물과의 친화도",
      mentalStimulationNeed: "정신적 자극 필요성",
      opennessToStrangers: "낯선 사람에 대한 개방성",
      playfulnessLevel: "활발함",
      sheddingLevel: "털 빠짐 정도",
      suitableForChildren: "아이들과의 친화도",
      trainability: "훈련 가능성",
    };
  
    const fieldMapping: Record<string, string> = {
      adaptability: "adaptabilityLevel",
      affectionTowardsFamily: "affectionWithFamily",
      barkingLevel: "barkingLevel",
      droolingLevel: "droolingLevel",
      energyLevel: "energyLevel",
      groomingNeed: "groomingLevel",
      guardInstinct: "guardProtectiveInstinct",
      goodWithOtherPets: "goodWithOtherDogs",
      mentalStimulationNeed: "needsMentalStimulation",
      opennessToStrangers: "opennessToStrangers",
      playfulnessLevel: "playfulnessLevel",
      sheddingLevel: "sheddingLevel",
      suitableForChildren: "goodWithYoungChildren",
      trainability: "trainabilityLevel",
    };
  
    const excludedAttributes = [
      "ownerRate",
      "coatType",
      "coatLength",
      "smallDogScore",
      "mediumDogScore",
      "largeDogScore",
      "extraLargeDogScore",
    ];
  
    return Object.keys(userScores)
      .filter((scoreKey) => !excludedAttributes.includes(scoreKey))
      .map((scoreKey) => {
        const userScore = Number(userScores[scoreKey as keyof DogOwnerEvaluation] || 0);
        const dogScore = Number(selectedDog[fieldMapping[scoreKey]] || 0); // 필드 매핑 직접 참조
        const label = fieldLabels[scoreKey] || scoreKey;
  
        console.log(`Rendering chart for ${scoreKey}:`, { userScore, dogScore });
  
        return (
          <ChartRow key={scoreKey}>
            <Label>{label}</Label>
            <BarWrapper>
              {showUserScore && <UserBar key={`${selectedDog?.englishName}-user-${scoreKey}`} width={userScore * 20} />}
              {showDogScore && <DogBar key={`${selectedDog?.englishName}-dog-${scoreKey}`} width={dogScore * 20} />}
            </BarWrapper>
            <Explanation>
              사용자 점수: {userScore}, 강아지 점수: {dogScore}
              <br />
              {getScoreExplanation(scoreKey, userScore)}
            </Explanation>
          </ChartRow>
        );
      });
  };
  

  if (loading) return <LoaderDiv><ClipLoader /></LoaderDiv>;
  if (!surveyData) return <p>설문 결과를 찾을 수 없습니다.</p>;

  return (
    <DetailContainer>
      <h2>나에게 맞는 강아지 추천</h2>

      <FilterContainer>
        {["점수 기반", "인기있는 강아지", "유저가 선호하는 강아지"].map((filter) => (
          <FilterButton
            key={filter}
            active={activeFilter === filter}
            onClick={() => {
              setActiveFilter(filter);
              applyFilter(filter);
            }}
          >
            {filter}
          </FilterButton>
        ))}
      </FilterContainer>

      <DogListContainer>
        {recommendedDogs.map((dog) => (
          <DogButton key={dog.englishName} selected={selectedDog === dog} onClick={() => setSelectedDog(dog)}>
            {dog.koreanName || dog.englishName}
          </DogButton>
        ))}
      </DogListContainer>

      {images.length ? (
        images.length > 1 ? (
          <SliderContainer>
            <Slider {...sliderSettings}>
              {images.map((url, index) => (
                <div key={index}><Image src={url} alt={`${selectedDog.englishName} 이미지`} /></div>
              ))}
            </Slider>
          </SliderContainer>
        ) : (
          <SingleImageContainer>
            <Image src={images[0]} alt={`${selectedDog.englishName} 이미지`} />
          </SingleImageContainer>
        )
      ) : (
        <LoaderDiv><ClipLoader /></LoaderDiv>
      )}

      {/* Legend with checkboxes */}
      <Legend>
        <LegendItem>
          <LegendColor color="rgba(54, 162, 235, 0.7)" />
          <span>사용자 점수</span>
          <input type="checkbox" checked={showUserScore} onChange={() => setShowUserScore(!showUserScore)} />
        </LegendItem>
        <LegendItem>
          <LegendColor color="rgba(255, 159, 64, 0.7)" />
          <span>강아지 점수</span>
          <input type="checkbox" checked={showDogScore} onChange={() => setShowDogScore(!showDogScore)} />
        </LegendItem>
      </Legend>
      <ChartContainer>{renderComparisonChart()}</ChartContainer>
    </DetailContainer>
  );
};

export default SurveyResult;
