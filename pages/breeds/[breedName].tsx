import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import BarItem from '../../components/BreedName/BarItem';
import { fetchImagesFromStorage, fetchAndStoreBreeds, getBreedsData } from '../../dataFetch/fetchAndStoreBreeds';
import { sliderSettings } from '../../components/BreedName/SliderComponents';
import {
  DetailContainer,
  Section,
  SectionTitle,
  Image,
  SliderContainer,
  SingleImageContainer,
  LoaderDiv,
  Loader,
  BarSection
} from '../../components/BreedName/BreedDetailStyles';
import { Breed } from '../../types/Breed';
import Head from 'next/head'; // Head 컴포넌트 추가
import { GetServerSideProps } from 'next'; // GetServerSideProps 추가

const BreedDetail: React.FC<{ selectedBreed: Breed | null, images: string[], error: string | null }> = ({ selectedBreed, images, error }) => {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    if (selectedBreed) {
      localStorage.setItem('selectedBreed', JSON.stringify(selectedBreed));
    }
  }, [selectedBreed]);

  useEffect(() => {
    if (images.length > 0) {
      let loadedCount = 0;
      images.forEach((url) => {
        const img = document.createElement('img') as HTMLImageElement;
        img.src = url;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            setAllImagesLoaded(true);
          }
        };
        img.onerror = () => {
          // 이미지 로드 실패 처리
          console.error(`Failed to load image: ${url}`);
        };
      });
    }
  }, [images]);

  if (error) {
    return <DetailContainer>{error}</DetailContainer>;
  }

  if (!selectedBreed) {
    return <DetailContainer>해당 강아지의 정보를 찾을 수 없습니다.</DetailContainer>;
  }

  return (
    <>
      <Head>
        <title>{selectedBreed?.koreanName || '강아지'} - 강아지위키</title>
        <meta name="description" content={`${selectedBreed?.koreanName || '강아지'} 품종에 대한 자세한 정보. 성격, 훈련 방법, 건강 관리 등.`} />
        <meta name="keywords" content={`${selectedBreed?.koreanName || '강아지'}, 개 품종, 강아지위키, 강아지 정보`} />
        <meta property="og:title" content={`${selectedBreed?.koreanName || '강아지'} - 강아지위키`} />
        <meta property="og:description" content={`${selectedBreed?.koreanName || '강아지'} 품종에 대한 자세한 정보. 성격, 훈련 방법, 건강 관리 등.`} />
        <meta property="og:image" content={images[0] || "/mainImage.avif"} />
        <meta property="og:url" content={`https://www.doglist.info/breed/${selectedBreed.englishName.toLowerCase()}`} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://www.doglist.info/breed/${selectedBreed.englishName.toLowerCase()}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${selectedBreed?.koreanName || '강아지'} - 강아지위키`,
            "url": `https://www.doglist.info/breed/${selectedBreed.englishName.toLowerCase()}`,
            "description": `${selectedBreed?.koreanName || '강아지'} 품종에 대한 자세한 정보. 성격, 훈련 방법, 건강 관리 등.`,
            "breedName": selectedBreed?.koreanName || "unknown"
          })}
        </script>
      </Head>
      <DetailContainer>
        {!allImagesLoaded ? (
          <LoaderDiv>
            <Loader />
          </LoaderDiv>
        ) : images.length > 1 ? (
          <SliderContainer>
            <Slider {...sliderSettings}>
              {images.map((url, index) => (
                <div key={index}>
                  <Image src={url} alt={`${selectedBreed.englishName} ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </SliderContainer>
        ) : (
          images.length === 1 && (
            <SingleImageContainer>
              <Image src={images[0]} alt={selectedBreed.englishName} />
            </SingleImageContainer>
          )
        )}
        <Section>
          <SectionTitle>기본 정보</SectionTitle>
          <ul>
            <li><strong>품종 그룹: </strong>{selectedBreed.breedGroup}</li>
            <li><strong>털 길이: </strong>{selectedBreed.coatLength}</li>
            <li><strong>털 타입: </strong>{selectedBreed.coatType}</li>
            <li><strong>키: </strong>{selectedBreed.height}</li>
            <li><strong>체중: </strong>{selectedBreed.weight}</li>
            <li><strong>수명: </strong>{selectedBreed.lifeExpectancy}</li>
            <li><strong>기원: </strong>{selectedBreed.origin}</li>
          </ul>
        </Section>
        <Section>
          <SectionTitle>성격 및 훈련</SectionTitle>
          <BarSection>
            {renderBars(selectedBreed)}
          </BarSection>
        </Section>
        <Section>
          <SectionTitle>추가 정보</SectionTitle>
          <p><strong>운동: </strong>{selectedBreed.exercise}</p>
          <p><strong>영양: </strong>{selectedBreed.nutrition}</p>
          <p><strong>훈련: </strong>{selectedBreed.training}</p>
        </Section>
        <Section>
          <SectionTitle>설명</SectionTitle>
          <p>{selectedBreed.description}</p>
        </Section>
      </DetailContainer>
    </>
  );
};

const renderBars = (breed: Breed) => (
  <>
    <BarItem emoji="🌟" label="적응력" level={breed.adaptabilityLevel} />
    <BarItem emoji="❤️" label="가족과의 애정" level={breed.affectionWithFamily} />
    <BarItem emoji="🐕" label="다른 개와의 친화력" level={breed.goodWithOtherDogs} />
    <BarItem emoji="👶" label="아이와의 친화력" level={breed.goodWithYoungChildren} />
    <BarItem emoji="🐾" label="타인에 대한 개방성" level={breed.opennessToStrangers} />
    <BarItem emoji="🛡️" label="보호 본능" level={breed.guardProtectiveInstinct} />
    <BarItem emoji="⚡" label="에너지 수준" level={breed.energyLevel} />
    <BarItem emoji="🎮" label="장난기" level={breed.playfulnessLevel} />
    <BarItem emoji="🧠" label="정신적 자극 필요도" level={breed.needsMentalStimulation} />
    <BarItem emoji="🎓" label="훈련 가능성" level={breed.trainabilityLevel} />
    <BarItem emoji="🪮" label="털 빠짐 정도" level={breed.sheddingLevel} reverse="true" />
    <BarItem emoji="🧼" label="그루밍 필요도" level={breed.groomingLevel} reverse="true" />
    <BarItem emoji="🗣️" label="짖는 수준" level={breed.barkingLevel} reverse="true" />
    <BarItem emoji="💧" label="침 흘림 수준" level={breed.droolingLevel} reverse="true" />
  </>
);

// 서버사이드 렌더링 함수 추가
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { breedName } = context.query;
  let selectedBreed: Breed | null = null;
  let images: string[] = [];
  let error: string | null = null;

  try {
    const breedsData = getBreedsData();
    if (!breedsData) {
      const newBreedsData = await fetchAndStoreBreeds();
      selectedBreed = newBreedsData[breedName?.toString().toLowerCase() || ''] || null;
    } else {
      selectedBreed = breedsData[breedName?.toString().toLowerCase() || ''] || null;
    }

    if (selectedBreed) {
      images = await fetchImagesFromStorage(selectedBreed.englishName);
    } else {
      error = '해당 품종 데이터를 찾을 수 없습니다.';
    }
  } catch (err) {
    error = '데이터를 불러오는 데 문제가 발생했습니다.';
  }

  return {
    props: {
      selectedBreed,
      images,
      error,
    },
  };
};

export default BreedDetail;
