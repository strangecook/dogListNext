import { useEffect, useState } from 'react';
import Slider from 'react-slick';
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
  BarSection,
  CoatTypeWrapper,
  CoatTypeItem,
  CoatTypeTitle,
  coatTypes,
  coatTypeDescriptions,
  BreedGroupWrapper,
  BreedGroupItem,
  CoatLengthWrapper,
  CoatLengthItem,
  CoatLengthVisualizer,
  breedGroupDescriptions,
  GroupDescriptionContainer,
  GroupDescriptionTitle,
  GroupDescriptionText,
  coatLengthDescriptions,
  Divider,
  StyledSection,
  StyledText,
  StyledStrongText,
  StyledGroupDescriptionTitle,
  TooltipContainer,
  TooltipButton,
  TooltipContent,
  GroupTitle,
  GroupDescription,
} from '../../components/BreedName/BreedDetailStyles';
import ExpandableDescription from '../../components/BreedName/ExpandableDescription';
import { Breed } from '../../types/Breed';
import Head from 'next/head'; // Head 컴포넌트 추가
import { GetServerSideProps } from 'next'; // GetServerSideProps 추가

const BreedDetail: React.FC<{ selectedBreed: Breed | null, images: string[], error: string | null }> = ({ selectedBreed, images, error }) => {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); // 클릭 상태 관리
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [hoveredCoatType, setHoveredCoatType] = useState<string | null>(null); // 현재 마우스가 올라간 털 종류
  const [showAllCoatDescriptions, setShowAllCoatDescriptions] = useState(false);
  const [showAllCoatLengthDescriptions, setShowAllCoatLengthDescriptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 모바일 여부를 감지하는 함수
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 화면 너비가 768px 이하이면 모바일로 간주
    };

    checkMobile(); // 초기 로드 시 한 번 실행

    // 윈도우 리사이즈 시 모바일 감지
    window.addEventListener('resize', checkMobile);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 설명 전체를 토글하는 함수
  const toggleCoatLengthDescriptions = () => {
    setShowAllCoatLengthDescriptions((prevState) => !prevState);
  };

  // 설명 전체를 토글하는 함수
  const toggleCoatDescriptions = () => {
    setShowAllCoatDescriptions((prevState) => !prevState);
  };

  const handleCoatMouseEnter = (type: string) => {
    setHoveredCoatType(type);
  };

  const handleCoatMouseLeave = () => {
    setHoveredCoatType(null);
  };

  const handleMouseEnter = (group: string) => {
    setHoveredGroup(group);
  };

  const handleMouseLeave = () => {
    setHoveredGroup(null);
  };

  const toggleTooltip = () => {
    setShowTooltip((prevState) => !prevState); // 클릭할 때마다 토글
  };

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

  const trimmedBreedGroup = selectedBreed.breedGroup?.trim();

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
          <SectionTitle> {selectedBreed?.koreanName} 기본 정보</SectionTitle>

          <ul>
            <li><strong>키: </strong>{selectedBreed.height}</li>
            <li><strong>체중: </strong>{selectedBreed.weight}</li>
            <li><strong>수명: </strong>{selectedBreed.lifeExpectancy}</li>
            <li><strong>기원: </strong>{selectedBreed.origin}</li>
          </ul>

          <Divider />

          {/* 품종 그룹 */}
          {/* 품종 그룹 타이틀 및 더보기 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <GroupDescriptionTitle>품종 그룹</GroupDescriptionTitle>

            <TooltipContainer>
              <TooltipButton onClick={toggleTooltip}>
                {showTooltip ? '간단히' : '더보기'}
              </TooltipButton>

              {/* 클릭할 때 옆에 설명 표시 */}
              {showTooltip && (
                <TooltipContent>
                  <Slider {...sliderSettings}>
                    {Object.keys(breedGroupDescriptions).map((group) => (
                      <div key={group} style={{ marginBottom: '10px' }}>
                        <GroupTitle>{group}</GroupTitle>
                        <GroupDescription>{breedGroupDescriptions[group]}</GroupDescription>
                      </div>
                    ))}
                  </Slider>
                </TooltipContent>
              )}
            </TooltipContainer>
          </div>
          <BreedGroupWrapper>
            {[
              '허딩',
              '하운드',
              '워킹',
              '테리어',
              '토이',
              '스포팅',
              '논스포팅',
              '스피츠',
            ].map((group) => {
              return (
                <div style={{ position: 'relative' }} key={group}>
                  <BreedGroupItem
                    selected={selectedBreed.breedGroup?.trim() === group}  // trim() 사용하여 공백 제거 후 일치 여부 확인
                    onMouseEnter={!isMobile ? () => handleMouseEnter(group) : undefined}  // 모바일이 아닐 때만 툴팁 활성화
                    onMouseLeave={!isMobile ? handleMouseLeave : undefined}  // 모바일이 아닐 때만 툴팁 비활성화
                  >
                    {group}
                  </BreedGroupItem>

                  {!isMobile && hoveredGroup === group && (  // 모바일이 아닐 때만 툴팁 표시
                    <TooltipContent style={{ position: 'absolute', left: '100%', top: '0' }}>
                      <GroupTitle>{group}</GroupTitle>
                      <GroupDescription>{breedGroupDescriptions[group]}</GroupDescription>
                    </TooltipContent>
                  )}
                </div>
              );
            })}
          </BreedGroupWrapper>

          {/* 선택된 그룹 설명 렌더링 */}
          {trimmedBreedGroup &&
            Object.keys(breedGroupDescriptions).some((group) => group.trim() === trimmedBreedGroup) && (
              <GroupDescriptionContainer>
                <GroupDescriptionTitle>품종 그룹 설명</GroupDescriptionTitle>
                <GroupDescriptionText>{breedGroupDescriptions[trimmedBreedGroup]}</GroupDescriptionText>
              </GroupDescriptionContainer>
            )}

          <Divider />

          {/* 털 종류 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CoatTypeTitle>털 종류</CoatTypeTitle>

            {/* 더보기 버튼 추가 */}
            <TooltipContainer>
              <TooltipButton onClick={toggleCoatDescriptions}>
                {showAllCoatDescriptions ? '간단히' : '더보기'}
              </TooltipButton>
              {showAllCoatDescriptions && (
                <TooltipContent>
                  <Slider {...sliderSettings}>
                    {Object.keys(coatTypeDescriptions).map((type) => (
                      <div key={type} style={{ marginBottom: '10px' }}>
                        <GroupTitle>{type}</GroupTitle>
                        <GroupDescription>{coatTypeDescriptions[type]}</GroupDescription>
                      </div>
                    ))}
                  </Slider>
                </TooltipContent>
              )}
            </TooltipContainer>
          </div>

          <CoatTypeWrapper>
            {coatTypes.map((type) => (
              <div style={{ position: 'relative' }} key={type}>
                <CoatTypeItem
                  selected={selectedBreed.coatType.includes(type)}
                  onMouseEnter={!isMobile ? () => handleCoatMouseEnter(type) : undefined}  // 모바일이 아닐 때만 툴팁 활성화
                  onMouseLeave={!isMobile ? handleCoatMouseLeave : undefined}  // 모바일이 아닐 때만 툴팁 비활성화
                >
                  {type}
                </CoatTypeItem>

                {!isMobile && hoveredCoatType === type && (  // 모바일이 아닐 때만 툴팁 표시
                  <TooltipContent style={{ position: 'absolute', left: '100%', top: '0', marginLeft: '10px' }}>
                    <GroupTitle>{type}</GroupTitle>
                    <GroupDescription>{coatTypeDescriptions[type]}</GroupDescription>
                  </TooltipContent>
                )}
              </div>
            ))}
          </CoatTypeWrapper>

          {/* 선택된 털 종류 설명 렌더링 */}
          {selectedBreed.coatType && (
            <GroupDescriptionContainer>
              <GroupDescriptionTitle>털 종류 설명</GroupDescriptionTitle>
              {coatTypes.filter((type) => selectedBreed.coatType.includes(type)).map((type) => (
                <GroupDescriptionText key={type}>
                  {coatTypeDescriptions[type]}
                </GroupDescriptionText>
              ))}
            </GroupDescriptionContainer>
          )}

          <Divider />

          {/* 털 길이 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <GroupDescriptionTitle>털 길이 (cm)</GroupDescriptionTitle>

            {/* 더보기 버튼 추가 */}
            <TooltipContainer>
              <TooltipButton onClick={toggleCoatLengthDescriptions}>
                {showAllCoatLengthDescriptions ? '간단히' : '더보기'}
              </TooltipButton>

              {showAllCoatLengthDescriptions && (
                <TooltipContent>
                  <Slider {...sliderSettings}>
                    {Object.keys(coatLengthDescriptions).map((length) => (
                      <div key={length} style={{ marginBottom: '10px' }}>
                        <GroupTitle>{length}</GroupTitle>
                        <GroupDescription>{coatLengthDescriptions[length]}</GroupDescription>
                      </div>
                    ))}
                  </Slider>
                </TooltipContent>
              )}
            </TooltipContainer>
          </div>
          <CoatLengthWrapper>
            {[
              { name: '짧은', cm: 1 },
              { name: '중간', cm: 5 },
              { name: '긴', cm: 10 },
            ].map((length) => (
              <div style={{ margin: "10px" }} key={length.name}>
                <CoatLengthItem selected={selectedBreed.coatLength.includes(length.name)}>
                  {length.name}
                </CoatLengthItem>
                <CoatLengthVisualizer
                  selected={selectedBreed.coatLength.includes(length.name)}
                  lengthCm={length.cm}
                />
              </div>
            ))}
          </CoatLengthWrapper>

          {selectedBreed.coatLength && (
            <GroupDescriptionContainer>
              <GroupDescriptionTitle>털 길이 설명</GroupDescriptionTitle>
              {[
                { name: '짧은', cm: 1 },
                { name: '중간', cm: 5 },
                { name: '긴', cm: 10 },
              ]
                .filter((length) => selectedBreed.coatLength.includes(length.name))
                .map((length) => (
                  <GroupDescriptionText key={length.name}>
                    {coatLengthDescriptions[length.name]}
                  </GroupDescriptionText>
                ))}
              화면에 표시된 털 길이(1cm, 5cm, 10cm)는 실제 강아지의 털 길이와 비슷하게 표현되었으며, 화면에서 보이는 길이는 정확히 그 수치에 맞게 시각화되었습니다.
            </GroupDescriptionContainer>
          )}


          <Divider />

        </Section>
        <Section>
          <GroupDescriptionTitle>성격 및 훈련</GroupDescriptionTitle>
          <BarSection>
            {renderBars(selectedBreed)}
          </BarSection>
        </Section>

        <Divider />

        <StyledSection>
          <StyledGroupDescriptionTitle>추가 정보</StyledGroupDescriptionTitle>
          <StyledText>
            <StyledStrongText>운동: </StyledStrongText>{selectedBreed.exercise}
          </StyledText>
          <Divider />
          <StyledText>
            <StyledStrongText>영양: </StyledStrongText>{selectedBreed.nutrition}
          </StyledText>
          <Divider />
          <StyledText>
            <StyledStrongText>훈련: </StyledStrongText>{selectedBreed.training}
          </StyledText>
        </StyledSection>

        <Divider />

        <StyledSection>
          <StyledGroupDescriptionTitle>추가 설명</StyledGroupDescriptionTitle>
          <StyledText>{selectedBreed.description}</StyledText>
        </StyledSection>
      </DetailContainer>
    </>
  );
};

const renderBars = (breed: Breed) => (
  <>
    {/* 적응력 */}
    <ExpandableDescription
      emoji="🌟"
      title="적응력"
      introText="이 항목은 강아지가 다양한 환경에 얼마나 잘 적응하는지를 평가합니다."
      level={breed.adaptabilityLevel}
      descriptions={[
        '1점 - 환경 변화에 매우 민감하며, 새로운 환경에 적응하기 어려워합니다.',
        '2점 - 환경 변화에 민감하며, 적응하는 데 시간이 걸립니다.',
        '3점 - 보통으로 적응하며, 약간의 시간이 필요합니다.',
        '4점 - 환경 변화에 잘 적응하며 큰 어려움 없이 적응합니다.',
        '5점 - 환경 변화에 매우 잘 적응하며, 빠르게 문제없이 적응합니다.'
      ]}
    />

    {/* 가족과의 애정 */}
    <ExpandableDescription
      emoji="❤️"
      title="가족과의 애정"
      introText="이 항목은 강아지가 가족과 얼마나 애정을 나누는지를 평가합니다."
      level={breed.affectionWithFamily}
      descriptions={[
        '1점 - 독립적이며, 가족과의 상호작용을 즐기지 않습니다.',
        '2점 - 일정한 거리감을 유지하며, 간단한 상호작용만 즐깁니다.',
        '3점 - 가족과의 상호작용을 즐기지만, 독립적인 시간도 필요합니다.',
        '4점 - 가족과의 상호작용을 매우 즐기며, 애정이 많습니다.',
        '5점 - 끊임없는 상호작용과 애정을 필요로 합니다.'
      ]}
    />

    {/* 다른 개와의 친화력 */}
    <ExpandableDescription
      emoji="🐕"
      title="다른 개와의 친화력"
      introText="이 항목은 강아지가 다른 개와 얼마나 잘 어울리는지를 평가합니다."
      level={breed.goodWithOtherDogs}
      descriptions={[
        '1점 - 다른 개와 잘 어울리지 않으며, 상호작용을 피하는 경향이 있습니다.',
        '2점 - 다른 개와의 상호작용이 제한적이며, 주의가 필요합니다.',
        '3점 - 다른 개들과 무난하게 상호작용하며, 보호자 관찰이 필요합니다.',
        '4점 - 다른 개들과의 상호작용이 매우 좋으며, 보호자 관찰 시 안전합니다.',
        '5점 - 모든 개들과 잘 어울리며, 보호자 관찰이 거의 필요 없습니다.'
      ]}
    />

    {/* 아이와의 친화력 */}
    <ExpandableDescription
      emoji="👶"
      title="아이와의 친화력"
      introText="이 항목은 강아지가 어린 자녀와 얼마나 잘 어울리는지를 평가합니다."
      level={breed.goodWithYoungChildren}
      descriptions={[
        '1점 - 자녀에게 해를 입힐 가능성이 높습니다.',
        '2점 - 자녀와의 상호작용이 제한적이며, 주의가 필요합니다.',
        '3점 - 자녀와 무난하게 상호작용하며, 보호자 관찰이 필요합니다.',
        '4점 - 자녀와의 상호작용이 매우 좋으며, 보호자 관찰 시 안전합니다.',
        '5점 - 자녀들에게 해를 입히지 않으며, 매우 친근하고 애정이 많습니다.'
      ]}
    />

    {/* 타인에 대한 개방성 */}
    <ExpandableDescription
      emoji="🐾"
      title="타인에 대한 개방성"
      introText="이 항목은 강아지가 낯선 사람에게 얼마나 친절하고 개방적인지를 평가합니다."
      level={breed.opennessToStrangers}
      descriptions={[
        '1점 - 낯선 사람을 매우 경계하며, 쉽게 친해지지 않습니다.',
        '2점 - 낯선 사람을 약간 경계하지만, 시간이 지나면 친해질 수 있습니다.',
        '3점 - 낯선 사람과 보통으로 친해지며, 적응 시간이 필요합니다.',
        '4점 - 낯선 사람과 쉽게 친해지며, 우호적입니다.',
        '5점 - 낯선 사람과 매우 친근하며, 즉각적인 친밀감을 형성합니다.'
      ]}
    />

    {/* 보호 본능 */}
    <ExpandableDescription
      emoji="🛡️"
      title="보호 본능"
      introText="이 항목은 강아지가 가족과 집을 보호하려는 본능이 얼마나 강한지를 평가합니다."
      level={breed.guardProtectiveInstinct}
      descriptions={[
        '1점 - 보호 본능이 거의 없습니다.',
        '2점 - 보호 본능이 약합니다.',
        '3점 - 보통의 보호 본능을 가집니다.',
        '4점 - 강한 보호 본능을 가집니다.',
        '5점 - 매우 강한 보호 본능을 가집니다.'
      ]}
    />

    {/* 에너지 수준 */}
    <ExpandableDescription
      emoji="⚡"
      title="에너지 수준"
      introText="이 항목은 강아지가 얼마나 활발하고 에너지가 넘치는지를 평가합니다."
      level={breed.energyLevel}
      descriptions={[
        '1점 - 매우 낮은 에너지 수준으로, 대부분의 시간을 조용하게 보냅니다.',
        '2점 - 낮은 에너지 수준으로, 간단한 운동으로 충분합니다.',
        '3점 - 보통 에너지 수준으로, 정기적인 운동이 필요합니다.',
        '4점 - 높은 에너지 수준으로, 많은 운동과 활동이 필요합니다.',
        '5점 - 매우 높은 에너지 수준으로, 끊임없는 활동과 운동이 필요합니다.'
      ]}
    />

    {/* 장난기 */}
    <ExpandableDescription
      emoji="🎮"
      title="장난기"
      introText="이 항목은 강아지가 얼마나 장난스럽고 놀기 좋아하는지를 평가합니다."
      level={breed.playfulnessLevel}
      descriptions={[
        '1점 - 장난기가 거의 없습니다.',
        '2점 - 약간의 장난기를 보이며, 가끔씩 놀이를 즐깁니다.',
        '3점 - 보통 수준의 장난기를 보이며, 놀이를 즐깁니다.',
        '4점 - 장난기가 많으며, 활발하게 놀이를 즐깁니다.',
        '5점 - 매우 장난기가 많으며, 지속적으로 놀이를 원합니다.'
      ]}
    />

    {/* 정신적 자극 필요도 */}
    <ExpandableDescription
      emoji="🧠"
      title="정신적 자극 필요도"
      introText="이 항목은 강아지가 얼마나 자주 정신적 자극과 훈련이 필요한지를 평가합니다."
      level={breed.needsMentalStimulation}
      descriptions={[
        '1점 - 정신적 자극이 거의 필요 없습니다.',
        '2점 - 약간의 정신적 자극으로 충분합니다.',
        '3점 - 보통 수준의 정신적 자극이 필요합니다.',
        '4점 - 높은 수준의 정신적 자극이 필요합니다.',
        '5점 - 매우 높은 수준의 정신적 자극이 필요하며, 지속적인 학습이 필요합니다.'
      ]}
    />

    {/* 훈련 가능성 */}
    <ExpandableDescription
      emoji="🎓"
      title="훈련 가능성"
      introText="이 항목은 강아지가 훈련을 얼마나 잘 따르고 학습 능력이 높은지를 평가합니다."
      level={breed.trainabilityLevel}
      descriptions={[
        '1점 - 훈련이 매우 어렵습니다.',
        '2점 - 훈련이 어렵지만 반복적인 연습으로 가능할 수 있습니다.',
        '3점 - 일반적인 훈련은 가능하지만, 인내심이 필요합니다.',
        '4점 - 훈련을 쉽게 따르며, 명령에 잘 반응합니다.',
        '5점 - 매우 훈련이 쉽고, 빠르게 학습합니다.'
      ]}
    />

    {/* 털 빠짐 정도 */}
    <ExpandableDescription
      emoji="🪮"
      title="털 빠짐 정도"
      introText="이 항목은 강아지가 얼마나 자주 털을 빠뜨리는지를 평가합니다."
      level={breed.sheddingLevel}
      descriptions={[
        '1점 - 털 빠짐이 거의 없습니다.',
        '2점 - 약간의 털 빠짐이 있습니다.',
        '3점 - 보통 수준의 털 빠짐이 있습니다.',
        '4점 - 자주 털이 빠집니다.',
        '5점 - 매우 자주 털이 빠집니다.'
      ]}
      reverse="true"
    />

    {/* 그루밍 필요도 */}
    <ExpandableDescription
      emoji="🧼"
      title="그루밍 필요도"
      introText="이 항목은 강아지가 얼마나 자주 그루밍이 필요한지를 평가합니다."
      level={breed.groomingLevel}
      descriptions={[
        '1점 - 그루밍이 거의 필요 없습니다.',
        '2점 - 약간의 그루밍이 필요합니다.',
        '3점 - 정기적인 그루밍이 필요합니다.',
        '4점 - 자주 그루밍이 필요합니다.',
        '5점 - 매우 자주 그루밍이 필요합니다.'
      ]}
      reverse="true"
    />

    {/* 짖는 수준 */}
    <ExpandableDescription
      emoji="🗣️"
      title="짖는 수준"
      introText="이 항목은 강아지가 얼마나 자주 짖는지를 평가합니다."
      level={breed.barkingLevel}
      descriptions={[
        '1점 - 거의 짖지 않습니다.',
        '2점 - 필요한 경우에만 짖습니다.',
        '3점 - 보통으로 짖으며, 경고하거나 흥분할 때 짖습니다.',
        '4점 - 자주 짖으며, 다양한 상황에서 짖습니다.',
        '5점 - 매우 자주 짖으며, 지속적으로 짖습니다.'
      ]}
      reverse="true"
    />

    {/* 침 흘림 수준 */}
    <ExpandableDescription
      emoji="💧"
      title="침 흘림 수준"
      introText="이 항목은 강아지가 얼마나 자주 침을 흘리는지를 평가합니다."
      level={breed.droolingLevel}
      descriptions={[
        '1점 - 침 흘림이 거의 없습니다.',
        '2점 - 약간의 침 흘림이 있습니다.',
        '3점 - 보통 수준의 침 흘림이 있습니다.',
        '4점 - 자주 침을 흘립니다.',
        '5점 - 매우 자주 침을 흘립니다.'
      ]}
      reverse="true"
    />
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
