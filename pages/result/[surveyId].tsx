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

const SurveyResult: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [recommendedDogs, setRecommendedDogs] = useState<any[]>([]);
  const [selectedDog, setSelectedDog] = useState<any | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("점수 기반");
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

  useEffect(() => {
    if (!user || !surveyId) return;

    const fetchData = async () => {
      try {
        const data = await fetchSurveyData(user.uid, surveyId as string);
        setSurveyData(data);

        const userScores: DogOwnerEvaluation = calculateScore(data);
        console.log("User scores (from calculateScore):", userScores);

        const recommendedDogNames = await fetchRecommendedDogs(data);
        const breedsData = getBreedsData();

        if (breedsData) {
          const dogs = recommendedDogNames.map((name) => {
            const dogData = breedsData[name.englishName.toLowerCase()];
            if (dogData) {
              const mappedDogData = { ...dogData, scores: mapDogDataToUserScores(dogData) };
              console.log("Mapped dog data with user scores:", mappedDogData);
              return mappedDogData;
            }
            return null;
          }).filter(Boolean);

          setRecommendedDogs(dogs);
          setSelectedDog(dogs[0]);
        } else {
          console.error('강아지 데이터를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('Error loading survey data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, surveyId]);

  useEffect(() => {
    const loadDogImages = async () => {
      if (selectedDog) {
        const fetchedImages = await fetchImagesFromStorage(selectedDog.englishName);
        setImages(fetchedImages || []);
      }
    };
    loadDogImages();
  }, [selectedDog]);

  const renderComparisonChart = () => {
    if (!surveyData) return null;

    const userScores: DogOwnerEvaluation = calculateScore(surveyData);
    console.log("Mapped user scores in renderComparisonChart:", userScores);

    // 속성 이름을 한국어로 매핑
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

    const excludedAttributes = [
      "ownerRate",
      "coatType",
      "coatLength",
      "smallDogScore",
      "mediumDogScore",
      "largeDogScore",
      "extraLargeDogScore"
    ];

    return Object.keys(userScores)
      .filter((scoreKey) => !excludedAttributes.includes(scoreKey))
      .map((scoreKey) => {
        const userScore = Number(userScores[scoreKey as keyof DogOwnerEvaluation] || 0);
        const dogScore = selectedDog?.scores?.[scoreKey] || 0;
        const label = fieldLabels[scoreKey] || scoreKey; // 한국어 레이블이 없으면 기본 영어 키 사용

        console.log(`Score Comparison - ${label}: User Score = ${userScore}, Dog Score = ${dogScore}`);

        return (
          <ChartRow key={scoreKey}>
            <Label>{label}</Label>
            <BarWrapper>
              <UserBar width={userScore * 20} />
              <DogBar width={dogScore * 20} />
            </BarWrapper>
          </ChartRow>
        );
      });
  };

  if (loading) return <LoaderDiv><ClipLoader /></LoaderDiv>;
  if (!surveyData) return <p>설문 결과를 찾을 수 없습니다.</p>;

  return (
    <DetailContainer>
      <h2>강아지와의 점수 비교</h2>

      <FilterContainer>
        {["점수 기반", "제일 인기있는 강아지", "유저가 원하는 강아지 우선"].map((filter) => (
          <FilterButton key={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
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

      <ChartContainer>{renderComparisonChart()}</ChartContainer>
    </DetailContainer>
  );
};

export default SurveyResult;
