import React, { useState, useEffect, forwardRef, ForwardedRef, MouseEvent } from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import useStore from '../../store/useStore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../firebase';
import Link from 'next/link';
import Image from 'next/image';  // next/image import
import { Breed } from '../../types/Breed';

interface DogCardProps {
  breed: Breed;
  onClick: (breed: Breed) => void;
}

const fetchImagesFromStorage = async (breedName: string): Promise<string[] | null> => {
  try {
    const formatBreedName = (breedName: string) => {
      return breedName.replace(/ /g, '_');
    };
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

const Overlay = styled.div<{ $showContent: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f5f5f5;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    background: rgba(0, 0, 0, 0.8);
    opacity: ${({ $showContent }) => ($showContent ? 1 : 0)} !important;
    transition: opacity 0.3s ease-in-out;
    padding: 5px;
    overflow: hidden;
    justify-content: flex-start;
  }
`;

const Card = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 350px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &:hover .hide-on-hover {
    opacity: 0;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.8em;
  -webkit-text-stroke-width: 0.3px;
  -webkit-text-stroke-color: black;
  color: #f5f5f5;
  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const CardContentTopLeft = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  transition: opacity 0.2s ease-in-out;
`;

const CardContentBottomRight = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  text-align: right;
`;

const SingleLineText = styled(Text)`
  font-size: 0.8em;
  font-weight: 700;
  margin: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

const BarContainer = styled.div`
  width: 100%;
  margin: 3px 0;
  text-align: left;
  display: flex;
  align-items: center;
  font-size: 0.9em;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
  }
`;

const Emoji = styled.span`
  margin-right: 4px;
  @media (max-width: 768px) {
    /* display: none; */
  }
`;

const BarWrapper = styled.div`
  width: 100%;
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 3px;
  position: relative;
  height: 12px;
  @media (max-width: 768px) {
    height: 15px;
  }
`;

const Bar = styled.div<{ width: string; $reverse?: string }>`
  width: ${({ width }) => width};
  height: 12px;
  background-color: ${({ width, $reverse }) => {
    const numericWidth = parseFloat(width);
    if ($reverse === "true") {
      if (numericWidth <= 40) return '#4caf50';
      if (numericWidth <= 75) return '#FFC924';
      return '#FF4742';
    } else {
      if (numericWidth <= 20) return '#FF4742';
      if (numericWidth <= 50) return '#FFC924';
      return '#4caf50';
    }
  }};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: width 0.5s ease-in-out;

  @media (max-width: 768px) {
    height: 15px;
  }
`;

const BarSection = styled.div`
  display: grid;
  grid-template-columns: 40% 60%; /* 텍스트 40%, 그래프 바 60% */
  width: 100%;
  margin: 2px 0;
  padding: 0 5px;
  box-sizing: border-box;
  align-items: center; /* 세로 가운데 정렬 */
  gap: 10px; /* 텍스트와 그래프 바 사이의 간격 */

  &.hide-on-mobile {
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 2px 5px;
    margin: 3px 0;
    display: flex;
    height: 20px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e0e0e0;
`;

const FixedImageContainer = styled(ImageContainer)`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
`;

const DetailButton = styled(Link)<{ $isLoading: boolean }>`
  display: flex;
  width: 100%;
  height: 30px;
  margin: 3px auto;
  background-color: ${({ $isLoading }) => ($isLoading ? '#A9A9A9' : '#4caf50')};
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  margin-top: 25px; /* 위에서 20px 아래로 */
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  pointer-events: ${({ $isLoading }) => ($isLoading ? 'none' : 'auto')};
  transition: background-color 0.3s ease;
`;


const StyledImage = styled(Image)`
  object-fit: cover; // objectFit 대신 CSS 스타일 사용
  width: 100%;
  height: 100%;
  position: absolute;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;  // LoaderContainer를 이미지 컨테이너 안에서 절대 위치로 설정
  top: 0;
  left: 0;
`;


// 스타일링
const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px 0px 0px;
  color: white;
  font-size: 1em;
  width: 100%;
`;

const DogName = styled.h3`
  margin: 0;
  padding: 5px; /* 텍스트와 카드 경계 간 여백 */
  font-size: 0.8em;
  text-align: left; /* 왼쪽 정렬 */
  color: white; /* 텍스트 색상 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); /* 텍스트 가독성을 높이기 위한 그림자 */
`;


const SizeTag = styled.span`
  background-color: rgba(255, 255, 255, 0.3);
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.6em;
  margin-left: 4px;
`;

const Tooltip = styled.span`
  position: absolute; /* 오른쪽 위로 배치 */
  top: 10px;
  right: 10px;
  width: 16px; /* 동그라미 크기 */
  height: 16px; /* 동그라미 크기 */
  border-radius: 50%; /* 동그라미 모양 */
  background: rgba(255, 255, 255, 0.9); /* 흰색 배경 */
  color: black; /* 아이콘 색상 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9em; /* 아이콘 크기 */
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;


const SubText = styled.div`
  font-size: 0.8em;
  width: 100%;
  padding-left: 5px;
  margin-bottom: 5px;
  text-align: left; /* 왼쪽 정렬 */
  border-bottom: 1px white solid;
`;

const TooltipText = styled.div`
  color: #fff; /* 흰색 글자 */
  font-size: 0.6em; /* 글자 크기 */
  text-align: center; /* 중앙 정렬 */
  transition: opacity 0.3s ease-in-out; /* 부드러운 전환 */
  text-align: left; /* 왼쪽 정렬 */
`;


const DogCard = forwardRef<HTMLDivElement, DogCardProps>(({ breed, onClick }, ref) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const setSelectedBreed = useStore(state => state.setSelectedBreed);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false); // 로딩 상태 관리
  const [hoveredBar, setHoveredBar] = useState<boolean>(true); // 현재 호버 중인 그래프

  useEffect(() => {
    const fetchImage = async () => {
      setLoading(true);
      const images = await fetchImagesFromStorage(breed.englishName);
      if (images && images.length > 0) {
        setImageUrl(images[0]);
      }
      setLoading(false);
    };

    fetchImage();
  }, [breed.englishName]);

  const handleCardClick = (breed: Breed) => {
    if (window.innerWidth <= 768) {
      console.log('showContent', showContent);
      setShowContent(!showContent);
    } else {
      setSelectedBreed(breed);
      onClick(breed);
    }
  };

  useEffect(() => {
    console.log(showContent);
  }, [showContent]);

  const handleDetailButtonClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    console.log('Detail button clicked');
    setIsLoadingDetail(true);
    setSelectedBreed(breed);
  };

  const averageChildFriendly = breed.affectionWithFamily;
  const averageDogFriendly = breed.goodWithOtherDogs;
  const averageTrainability = breed.trainabilityLevel;
  const averageEnergy = breed.energyLevel;
  const averageGroomingLevel = (breed.groomingLevel + breed.sheddingLevel) / 2;

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => handleCardClick(breed)}
      ref={ref as ForwardedRef<HTMLDivElement>}
    >
      <FixedImageContainer>
        {loading ? (
          <LoaderContainer>
            <ClipLoader color="#4caf50" size={75} />
          </LoaderContainer>
        ) : (
          imageUrl && (
            <StyledImage
              src={imageUrl}
              alt={breed.englishName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 
              priority // 우선 로드
            />
          )
        )}
        <Overlay $showContent={showContent} style={{ opacity: hovered ? 1 : 0 }}>
          <TopSection>
            <div style={{ display: "flex", alignItems: "center" }}>
              <DogName>{breed.koreanName}</DogName>
              <SizeTag>{breed.size}</SizeTag>
            </div>
            <Tooltip
              onMouseEnter={() => setHoveredBar(false)}
              onMouseLeave={() => setHoveredBar(true)} >i
            </Tooltip>
          </TopSection>

          {/* 영어 이름 */}
          <SubText>{breed.englishName}</SubText>


          <BarSection>
            <BarContainer>
              <Emoji>👶</Emoji>
              <Text>가족과의 친화도</Text>
            </BarContainer>
            {hoveredBar
              ?
              <BarWrapper>
                <Bar width={`${averageChildFriendly * 20}%`} />
              </BarWrapper>
              :
              <TooltipText>
                높은 값일수록 가족과 잘 어울립니다.
              </TooltipText>
            }
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🐕</Emoji>
              <Text>친화력</Text>
            </BarContainer>
            {hoveredBar
              ?
              <BarWrapper>
                <Bar width={`${averageDogFriendly * 20}%`} />
              </BarWrapper>
              :
              <TooltipText>
                높은 값일수록 다른 반려견들과 잘 어울립니다.
              </TooltipText>
            }
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🎓</Emoji>
              <Text>훈련 가능성</Text>
            </BarContainer>
            {hoveredBar
              ?
              <BarWrapper>
                <Bar width={`${averageTrainability * 20}%`} />
              </BarWrapper>
              :
              <TooltipText>
                높은 값일수록 훈련하기 쉽습니다.
              </TooltipText>
            }
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>⚡</Emoji>
              <Text>에너지 수준</Text>
            </BarContainer>
            {hoveredBar
              ?
              <BarWrapper>
                <Bar width={`${averageEnergy * 20}%`} />
              </BarWrapper>
              :
              <TooltipText>
                높은 값일수록 에너지가 넘칩니다.
              </TooltipText>
            }
          </BarSection>
          <BarSection>
            <BarContainer>
              <Emoji>🪮</Emoji>
              <Text>털 관리 및 빠짐</Text>
            </BarContainer>
            {hoveredBar
              ?
              <BarWrapper>
                <Bar width={`${averageGroomingLevel * 20}%`} $reverse="true" />
              </BarWrapper>
              :
              <TooltipText>
                높은 값일수록 털 관리가 필요합니다.
              </TooltipText>
            }
          </BarSection>
          {
            showContent &&
            <BarSection>
              <BarContainer>
                <DetailButton
                  href={`/breeds/${breed.englishName.toLowerCase()}`}
                  onClick={handleDetailButtonClick}
                  $isLoading={isLoadingDetail}
                >
                  {isLoadingDetail ? '로딩 중...' : '자세한 정보'}
                </DetailButton>
              </BarContainer>
            </BarSection>
          }
        </Overlay>
      </FixedImageContainer>
      <CardContentTopLeft className="hide-on-hover">
      </CardContentTopLeft>
      {
        showContent ||
        <CardContentBottomRight style={{ opacity: hovered ? 0 : 1 }}>
          <SingleLineText>
            {breed.koreanName}
            <span>({breed.englishName})</span>
          </SingleLineText>
        </CardContentBottomRight>
      }

    </Card>
  );
});

DogCard.displayName = "DogCard";

export default DogCard;
