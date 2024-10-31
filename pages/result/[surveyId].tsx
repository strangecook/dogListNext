import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { calculateScore } from '../../components/survey/UserTest';
import { DogOwnerEvaluation } from '../../types/DogOwnerEvaluation';
import { recommendDogsBasedOnUserInput } from '../../components/survey/recommendDogBasedOnUserInput';
import { getBreedsData } from '../../dataFetch/fetchAndStoreBreeds';
import { SurveyData } from '../../components/survey/SurveyDataType';
import styled from 'styled-components';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../components/firebase';
import Slider from 'react-slick';
import { ClipLoader } from 'react-spinners';
import { sliderSettings } from '../../components/BreedName/SliderComponents';

const db = getFirestore();
const auth = getAuth();

// 차트 컴포넌트 스타일
const DetailContainer = styled.div`
  max-width: 800px;
  margin: 80px auto 20px auto;
  padding: 20px;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ChartRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.div`
  width: 150px;
  text-align: right;
  font-weight: bold;
`;

const BarWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f0f0f0;
`;

const UserBar = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  background-color: rgba(75, 192, 192, 0.6);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px 0 0 10px;
`;

const DogBar = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  background-color: rgba(255, 99, 132, 0.6);
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px 0 0 10px;
`;

const DogImage = styled.img`
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 400px;
  width: auto;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const SliderContainer = styled.div`
  .slick-slide img {
    display: block;
    margin: auto;
  }
`;

export const SingleImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

export const LoaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;


// 필드 매핑 테이블
const fieldMapping: Record<string, string> = {
  adaptability: 'adaptabilityLevel',
  affectionTowardsFamily: 'affectionWithFamily',
  barkingLevel: 'barkingLevel',
  droolingLevel: 'droolingLevel',
  energyLevel: 'energyLevel',
  groomingNeed: 'groomingLevel',
  guardInstinct: 'guardProtectiveInstinct',
  goodWithOtherPets: 'goodWithOtherDogs',
  mentalStimulationNeed: 'needsMentalStimulation',
  opennessToStrangers: 'opennessToStrangers',
  playfulnessLevel: 'playfulnessLevel',
  sheddingLevel: 'sheddingLevel',
  suitableForChildren: 'goodWithYoungChildren',
  trainability: 'trainabilityLevel',
};

// Fetch images from Firebase Storage
const fetchImagesFromStorage = async (breedName: string): Promise<string[] | null> => {
  try {
    const formatBreedName = (breedName: string) => breedName.replace(/ /g, '_');
    const formattedBreedName = formatBreedName(breedName);
    const folderRef = ref(storage, `dog/${formattedBreedName}`);
    const fileList = await listAll(folderRef);

    if (fileList.items.length > 0) {
      const imageUrls = await Promise.all(
        fileList.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return url;
        })
      );
      return imageUrls;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching images from Storage for breed ${breedName}:`, error);
    return null;
  }
};

// 강아지 데이터를 사용자 점수 형식으로 변환
const mapDogDataToUserScores = (dogData: any): DogOwnerEvaluation => {
  const mappedScores: DogOwnerEvaluation = {
    ownerRate: 0,
    coatType: dogData.coatType || '',
    coatLength: dogData.coatLength || '',
    smallDogScore: 0,
    mediumDogScore: 0,
    largeDogScore: 0,
    extraLargeDogScore: 0,
    adaptability: dogData[fieldMapping.adaptability] || 0,
    affectionTowardsFamily: dogData[fieldMapping.affectionTowardsFamily] || 0,
    barkingLevel: dogData[fieldMapping.barkingLevel] || 0,
    droolingLevel: dogData[fieldMapping.droolingLevel] || 0,
    energyLevel: dogData[fieldMapping.energyLevel] || 0,
    groomingNeed: dogData[fieldMapping.groomingNeed] || 0,
    guardInstinct: dogData[fieldMapping.guardInstinct] || 0,
    goodWithOtherPets: dogData[fieldMapping.goodWithOtherPets] || 0,
    mentalStimulationNeed: dogData[fieldMapping.mentalStimulationNeed] || 0,
    opennessToStrangers: dogData[fieldMapping.opennessToStrangers] || 0,
    playfulnessLevel: dogData[fieldMapping.playfulnessLevel] || 0,
    sheddingLevel: dogData[fieldMapping.sheddingLevel] || 0,
    suitableForChildren: dogData[fieldMapping.suitableForChildren] || 0,
    trainability: dogData[fieldMapping.trainability] || 0,
  };
  return mappedScores;
};

const SurveyResult: React.FC = () => {
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [recommendedDogs, setRecommendedDogs] = useState<any[]>([]);
  const [selectedDog, setSelectedDog] = useState<any | null>(null);
  const [images, setImages] = useState<string[]>([]); // 이미지 배열 상태 추가
  const router = useRouter();
  const { surveyId } = router.query;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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

    const fetchSurveyData = async () => {
      try {
        const surveyRef = doc(db, 'users', user.uid, 'surveys', surveyId as string);
        const surveyDoc = await getDoc(surveyRef);

        if (surveyDoc.exists()) {
          const data = surveyDoc.data() as SurveyData;

          if (!data || Object.keys(data).length === 0) {
            console.error('설문조사 데이터가 비어있습니다:', data);
            return;
          }

          setSurveyData(data);

          const calculatedScores: DogOwnerEvaluation = calculateScore(data);
          const recommendedDogNames = await recommendDogsBasedOnUserInput(data);

          const breedsData = getBreedsData();

          if (breedsData) {
            const dogs = recommendedDogNames
              .map((name) => {
                const dogData = breedsData[name.englishName.toLowerCase()];
                return dogData ? { ...dogData, scores: mapDogDataToUserScores(dogData) } : null;
              })
              .filter(Boolean);

              console.log("dogs", dogs)
            setRecommendedDogs(dogs);
            setSelectedDog(dogs[0]);
          } else {
            console.error('강아지 데이터를 찾을 수 없습니다.');
          }
        } else {
          console.error('해당 설문조사 결과를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('설문조사 데이터를 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [user, surveyId]);

  useEffect(() => {
    // 선택된 강아지의 이미지를 가져옴
    const fetchDogImages = async () => {
      if (selectedDog) {
        const fetchedImages = await fetchImagesFromStorage(selectedDog.englishName);
        setImages(fetchedImages || []);
      }
    };
    fetchDogImages();
  }, [selectedDog]);

  if (loading) return <p>로딩 중...</p>;
  if (!surveyData) return <p>설문 결과를 찾을 수 없습니다.</p>;

  const userScores: DogOwnerEvaluation = calculateScore(surveyData);

  const renderComparisonChart = () => {
    return Object.keys(userScores).map((scoreKey) => {
      const userScore = Number(userScores[scoreKey as keyof DogOwnerEvaluation] || 0);
      const dogScore = Number(selectedDog?.scores[scoreKey as keyof DogOwnerEvaluation] || 0);

      return (
        <ChartRow key={scoreKey}>
          <Label>{fieldMapping[scoreKey] || scoreKey}</Label>
          <BarWrapper>
            <UserBar width={userScore * 20} />
            <DogBar width={dogScore * 20} style={{ opacity: 0.6 }} />
          </BarWrapper>
        </ChartRow>
      );
    });
  };

  return (
    <DetailContainer>
      <h2>강아지와의 점수 비교</h2>
      {!images.length ? (
        <LoaderDiv>
          <ClipLoader />
        </LoaderDiv>
      ) : images.length > 1 ? (
        <SliderContainer>
          <Slider {...sliderSettings}>
            {images.map((url, index) => (
              <div key={index}>
                <Image src={url} alt={`${selectedDog.englishName} 이미지 ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </SliderContainer>
      ) : (
        <SingleImageContainer>
          <Image src={images[0]} alt={`${selectedDog.englishName} 이미지`} />
        </SingleImageContainer>
      )}
      <ChartContainer>{renderComparisonChart()}</ChartContainer>
    </DetailContainer>
  );
};

export default SurveyResult;
