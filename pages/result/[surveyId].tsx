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
import { fetchImagesFromStorage, fetchSurveyData, authenticateUser, fetchRecommendedDogs } from '../../components/result/resultDataManager';
import { SurveyData } from '../../components/survey/SurveyDataType';
import { ClipLoader } from 'react-spinners';
import Slider from 'react-slick';
import { sliderSettings } from '../../components/BreedName/SliderComponents';
import { calculateScore } from '../../components/survey/UserTest';
import { DogOwnerEvaluation } from '../../types/DogOwnerEvaluation';
import styled from 'styled-components';
import Link from 'next/link';
import { getScoreExplanation } from '../../utils/getScoreExplanation ';
import { surveyQuestionMapping } from '../../components/survey/surveyQuestionMapping';

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

const ExplanationContainer = styled.div`
  background: #f9f9f9;
  border-radius: 10px;
  padding: 15px 20px;
  margin: 20px auto;
  width: 90%;
  max-width: 800px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ExplanationBox = styled.div`
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 15px 20px;
  margin: 10px 0;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 90%; /* 화면 크기에 따라 유연하게 조정 */

  strong {
    font-weight: bold;
    font-size: 1rem;
    display: block;
    margin-bottom: 8px;
    color: #222;
  }

  span {
    display: block;
    font-size: 0.85rem;
    color: #555;
  }

  p {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #444;
  }

  &:hover {
    background: #fafafa;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
    transition: all 0.3s ease;
  }
`;

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
  const [independentExplanations, setIndependentExplanations] = useState<string[]>([]); // 독립적인 설명 저장
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

  useEffect(() => {
    if (!surveyData) return;

    const explanations: string[] = [];

    Object.values(surveyQuestionMapping).forEach((mapping) => {
      const relatedAnswer = surveyData[mapping.key as keyof typeof surveyData];

      if (typeof relatedAnswer === "string") {
        const ownerRateExplanations = mapping.explanation(relatedAnswer).filter(
          (entry) => entry.key === "ownerRate"
        );

        ownerRateExplanations.forEach((entry) => {
          const descriptionWithDetails = `${mapping.question} \n ${entry.description}`;
          if (!explanations.includes(descriptionWithDetails)) {
            explanations.push(descriptionWithDetails);
          }
        });
      }
    });

    setIndependentExplanations(explanations);
  }, [surveyData]);


  const applyFilter = (filter: string) => {
    switch (filter) {
      case "점수 기반":
        setRecommendedDogs(mappedDogs[0]);
        setSelectedDog(mappedDogs[0][0])
        break;

      case "인기있는 강아지":
        setRecommendedDogs(mappedDogs[1]);
        setSelectedDog(mappedDogs[1][0])
        break;

      case "유저가 선호하는 강아지":
        setRecommendedDogs(mappedDogs[2]);
        setSelectedDog(mappedDogs[2][0])
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
    console.log("surveyData", surveyData)
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
      playfulnessLevel: "장난기",
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
        const dogScore = Number(selectedDog[fieldMapping[scoreKey]] || 0);

        const relevantQuestions = Object.values(surveyQuestionMapping).filter((mapping) => {
          const answer = surveyData[mapping.key as keyof typeof surveyData]; // 실제 데이터 키로 값 가져오기

          if (Array.isArray(answer)) {
            return answer.some((ans) =>
              mapping.explanation(ans).some((entry) => entry.key === scoreKey)
            );
          }

          if (typeof answer === "string") {
            return mapping.explanation(answer).some((entry) => entry.key === scoreKey);
          }

          return false;
        });

        return (
          <ChartRow key={scoreKey}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: `100%` }}>
              <Label>{fieldLabels[scoreKey] || scoreKey}</Label>
              <BarWrapper>
                {showUserScore && (
                  <UserBar key={`${selectedDog?.englishName}-user-${scoreKey}`} width={userScore * 20} />
                )}
                {showDogScore && (
                  <DogBar key={`${selectedDog?.englishName}-dog-${scoreKey}`} width={dogScore * 20} />
                )}
              </BarWrapper>
              <Explanation>
                사용자 점수: {userScore}, <br /> 강아지 점수: {dogScore}
                <br />
              </Explanation>
            </div>

            {relevantQuestions.map((questionMapping, idx) => {
              const relatedAnswer = surveyData[questionMapping.key as keyof typeof surveyData];

              const explanations = questionMapping.explanation(
                relatedAnswer as string
              ).filter((entry) => entry.key === scoreKey);

              return explanations.map((explanation, i) => (
                <Explanation key={`${scoreKey}-question-${idx}-${i}`}>
                  <strong>{`${questionMapping.question}`}</strong> {/* 번호와 질문 텍스트 */}
                  <span>{`사용자의 응답: ${relatedAnswer}`}</span> {/* 유저의 답변 */}
                  <br />
                  <span>{`${explanation.description}`}</span> {/* 추천 이유 설명 */}
                </Explanation>
              ));
            })}
            <ExplanationBox>
              <strong>{`${fieldLabels[scoreKey]} 설명`}</strong>
              <p>{getScoreExplanation(scoreKey, dogScore)}</p>
            </ExplanationBox>

          </ChartRow>
        );
      }
      );


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

      <ExplanationContainer>
        {activeFilter === "점수 기반" && (<p> 유저의 점수 기반으로 가장 유사한 강아지들을 추천합니다.<br /> 설문 데이터를 기반으로 한 객관적인 분석 결과입니다. </p>)}
        {activeFilter === "인기있는 강아지" && <p>인기 50위까지의 강아지를 추천해주는 결과입니다. <br /> 인기와 사회적 선호도가 높은 품종입니다.</p>}
        {activeFilter === "유저가 선호하는 강아지" && <p>사용자가 설문의 마지막 응답에 따른 결과입니다. <br /> 설문 응답 패턴을 분석하여 개인적인 선호도에 맞춘 결과입니다.</p>}
      </ExplanationContainer>

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
      {independentExplanations.length > 0 && (
        <>
          <h3>추가 도움말</h3>
          {independentExplanations.map((description, idx) => (
            <p key={`independent-${idx}`}>{description}</p>
          ))}
        </>
      )}

      {independentExplanations.length === 0 && (
        <p>현재 선택에 따라 추가적으로 표시할 정보가 없습니다.</p>
      )}
      {selectedDog && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href={`/breeds/${encodeURIComponent(selectedDog.englishName)}`}>
            <span style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#4caf50',
              color: '#fff',
              borderRadius: '5px',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
            }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4caf50'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3e8e41'}
            >
              {selectedDog.koreanName || selectedDog.englishName}의 자세한 정보 보러가기
            </span>
          </Link>
        </div>
      )}
    </DetailContainer>
  );
};

export default SurveyResult;
