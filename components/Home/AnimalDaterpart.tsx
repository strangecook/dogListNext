import { useEffect, useState, useCallback, useRef, ChangeEvent, KeyboardEvent } from 'react';
import {
  Container, Card, Grid, SearchBar, SearchButton, SearchBarContainer, AutocompleteList,
  AutocompleteItem, ConsonantFilterContainer, ConsonantButton, ThemeFilterContainer,
  ThemeButton, FilterInfoContainer, FilterInfo, ResetButton, ScrollToTopButton, WhiteBackground, SearchAndThemeContainer,
  SearchBarWrapper, FilterLabel, Divider, ToggleButton
} from './styles/animalDaterPartCss';
import DogCard from './DogCard';
import { fetchAndStoreBreeds, getBreedsData } from '../../dataFetch/fetchAndStoreBreeds';
import CustomModal from './CustomModal';
import Filters from './Filters';
import useStore from '../../store/useStore';
import { ClipLoader } from 'react-spinners';
import { Breed } from '../../types/Breed'; // Breed 타입 import
import Image from 'next/image';
import search from '../../public/free-icon-magnifier.png'
import reload from '../../public/free-icon-reload.png'
import adjustment from '../../public/free-icon-contrast-adjustment.png'

const consonants = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const themes = [
  { id: 1, name: '#한국에서 인기있는' },
  { id: 2, name: '#1인가구에 좋은' },
  { id: 3, name: '#초보 견주에게 좋은' },
  { id: 4, name: '#자녀가 있는 가정' },
  { id: 5, name: '#노부부에게 좋은' }
];

const getKoreanConsonant = (char: string): string => {
  const initialConsonants = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
    'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
  ];
  const charCode = char.charCodeAt(0) - 44032;
  if (charCode < 0 || charCode > 11171) return char;
  const index = Math.floor(charCode / 588);
  return initialConsonants[index];
};

interface AnimalDaterPartProps {
  initialBreedsData: Record<string, Breed>;
}

const AnimalDaterPart: React.FC<AnimalDaterPartProps> = ({ initialBreedsData }) => {
  const [breedsData, setBreedsData] = useState<Record<string, Breed>>(initialBreedsData);
  const [displayedBreeds, setDisplayedBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { storedFilters, setStoredFilters } = useStore();
  const [filters, setFilters] = useState(storedFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const breedsPerPage = 10;
  const [page, setPage] = useState(1);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [filtersExpanded, setFiltersExpanded] = useState(false); // 필터 열림 여부 상태

  useEffect(() => {
    setLoading(false);
  }, [initialBreedsData]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // 768px 이하를 모바일로 간주
    };

    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFiltersExpanded((prevState) => !prevState); // 열기/펼치기 토글
  };

  const handleCardClick = (breed: Breed) => {
    setSelectedBreed(breed);
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedBreed(null);
    document.body.style.overflow = 'auto';
  };

  const filterBreeds = useCallback(() => {
    if (!breedsData) return;

    let filtered = Object.values(breedsData);

    if (filters.size !== 'all') {
      filtered = filtered.filter(breed => breed.size === filters.size);
    }
    if (filters.breedGroup !== 'all') {
      filtered = filtered.filter(breed => breed.breedGroup && breed.breedGroup.includes(filters.breedGroup));
    }
    if (filters.affectionWithFamily !== 'all') {
      filtered = filtered.filter(breed => breed.affectionWithFamily === Number(filters.affectionWithFamily));
    }
    if (filters.goodWithOtherDogs !== 'all') {
      filtered = filtered.filter(breed => breed.goodWithOtherDogs === Number(filters.goodWithOtherDogs));
    }
    if (filters.trainabilityLevel !== 'all') {
      filtered = filtered.filter(breed => breed.trainabilityLevel === Number(filters.trainabilityLevel));
    }
    if (filters.energyLevel !== 'all') {
      filtered = filtered.filter(breed => breed.energyLevel === Number(filters.energyLevel));
    }
    if (filters.sheddingLevel !== 'all') {
      filtered = filtered.filter(breed => breed.sheddingLevel === Number(filters.sheddingLevel));
    }
    if (searchQuery && searchQuery !== '') {
      filtered = filtered.filter(breed =>
        breed.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        breed.koreanName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedConsonant) {
      filtered = filtered.filter(breed => {
        const firstChar = breed.koreanName.charAt(0);
        return getKoreanConsonant(firstChar) === selectedConsonant;
      });
    }
    if (selectedTheme) {
      filtered = filtered.filter(breed => breed.theme && breed.theme.includes(String(selectedTheme)));
    }

    localStorage.setItem('filteredBreeds', JSON.stringify(filtered));
    setDisplayedBreeds(filtered.slice(0, breedsPerPage * page));
  }, [breedsData, filters, page, selectedConsonant, selectedTheme, searchQuery]);


  useEffect(() => {
    filterBreeds();
  }, [filters, breedsData, filterBreeds, page, selectedConsonant, selectedTheme, searchQuery]);

  const loadMoreBreeds = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const lastBreedElementRef = useCallback((node: HTMLDivElement) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreBreeds();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setAutocompleteResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchButtonClick = () => {
    setSearchQuery(searchInput);
    setPage(1);
    setAutocompleteResults([]);
    filterBreeds();
  };

  const handleAutocompleteItemClick = (breed: Breed) => {
    setSearchQuery(breed.englishName);
    setSearchInput(breed.englishName);
    setAutocompleteResults([]);
    filterBreeds();
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInput(query);
    if (query !== '') {
      const results = Object.values(breedsData).filter(breed =>
        breed.englishName.toLowerCase().includes(query.toLowerCase()) ||
        breed.koreanName.toLowerCase().includes(query.toLowerCase())
      );
      setAutocompleteResults(results.slice(0, 5));
    } else {
      setAutocompleteResults([]);
    }
  };

  const handleSearchInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchButtonClick();
    }
  };

  const handleConsonantClick = (consonant: string) => {
    setSelectedConsonant(consonant === selectedConsonant ? null : consonant);
    setPage(1);
    filterBreeds();
  };

  const handleThemeClick = (theme: number) => {
    setSelectedTheme(theme === selectedTheme ? null : theme);
    setPage(1);
    filterBreeds();
  };

  const resetFilters = () => {
    setSelectedConsonant(null);
    setSelectedTheme(null);
    setFilters({
      size: 'all',
      breedGroup: 'all',
      affectionWithFamily: 'all',
      goodWithOtherDogs: 'all',
      trainabilityLevel: 'all',
      energyLevel: 'all',
      sheddingLevel: 'all'
    });
    setSearchQuery('');
    setSearchInput('');
    setPage(1);
    filterBreeds();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 850, behavior: 'smooth' });
  };

  useEffect(() => {
    // Google AdSense 광고 스크립트 동적으로 추가
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9810617727266867";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    // 광고 초기화 시, 중복되지 않도록 확인
    script.onload = () => {
      if ((window as any).adsbygoogle && (window as any).adsbygoogle.loaded !== true) {
        (window as any).adsbygoogle.loaded = true;
        (window as any).adsbygoogle.push({});
      }
    };
  }, []);

  return (
    <Container>
      {/* 광고 배너 */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9810617727266867"
        data-ad-slot="7630514013"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>

      <WhiteBackground>



        <SearchAndThemeContainer>
          {/* 검색창 */}
          <SearchBarWrapper>
            <SearchBarContainer ref={autocompleteRef}>
              <SearchBar
                type="text"
                placeholder="한국어나 영어로 종을 검색하세요"
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchInputKeyDown}
              />
              <SearchButton onClick={handleSearchButtonClick}>
                <Image src={search} alt="Search" className='SearchButton-Image' />
              </SearchButton>
              {autocompleteResults.length > 0 && (
                <AutocompleteList>
                  {autocompleteResults.map((breed, index) => (
                    <AutocompleteItem
                      key={index}
                      onClick={() => handleAutocompleteItemClick(breed)}
                    >
                      {breed.koreanName} ({breed.englishName})
                    </AutocompleteItem>
                  ))}
                </AutocompleteList>
              )}
            </SearchBarContainer>
          </SearchBarWrapper>


          {/* 테마 필터 버튼 */}
          <ThemeFilterContainer>
            {themes.map((theme) => (
              <ThemeButton
                key={theme.id}
                $selected={theme.id === selectedTheme}
                onClick={() => handleThemeClick(theme.id)}
              >
                {theme.name}
              </ThemeButton>
            ))}
          </ThemeFilterContainer>
        </SearchAndThemeContainer>
        {isMobile && (
          <>
            <ToggleButton onClick={toggleFilters}>
              <Image src={adjustment} alt="adjustment" className='adjustment-Image' />
              {filtersExpanded ? "상세 필터 닫기" : "상세 검색"}
            </ToggleButton>
            {filtersExpanded &&
              <>
                <FilterInfoContainer>
                  {/* 왼쪽: 상세 검색 텍스트 */}
                  <FilterLabel>상세 검색</FilterLabel>

                  {/* 오른쪽: 필터 초기화 버튼 */}
                  <ResetButton onClick={resetFilters}>
                    <Image src={reload} alt="Reset" className='ResetButton-Image' />
                    선택 초기화
                  </ResetButton>
                </FilterInfoContainer>
                <Filters filters={filters} setFilters={setFilters} />
              </>
            }
          </>
        )}

        {/* 데스크톱에서는 항상 필터 표시 */}
        {!isMobile &&
          <>
            <FilterInfoContainer>
              {/* 왼쪽: 상세 검색 텍스트 */}
              <FilterLabel>상세 검색</FilterLabel>

              {/* 오른쪽: 필터 초기화 버튼 */}
              <ResetButton onClick={resetFilters}>
                <Image src={reload} alt="Reset" className='ResetButton-Image' />
                선택 초기화
              </ResetButton>
            </FilterInfoContainer>
            <Filters filters={filters} setFilters={setFilters} />
          </>
        }
      </WhiteBackground>

      {/* 자음 필터 버튼 */}
      <ConsonantFilterContainer>
        {consonants.map((consonant, index) => (
          <ConsonantButton
            key={index}
            $selected={consonant === selectedConsonant}
            onClick={() => handleConsonantClick(consonant)}
          >
            {consonant}
          </ConsonantButton>
        ))}
      </ConsonantFilterContainer>

      {/* 중간을 나눠주는 선 */}
      <Divider />

      {/* 강아지 카드 리스트 */}
      <Grid>
        {displayedBreeds.map((breed, index) => (
          <DogCard
            key={index}
            breed={breed}
            onClick={handleCardClick}
            ref={index === displayedBreeds.length - 1 ? lastBreedElementRef : null}
          />
        ))}
        {loading && (
          <>
            <Card style={{ height: "200px" }}>
              <ClipLoader color="#4caf50" size={50} />
            </Card>
            <Card style={{ height: "200px" }}>
              <ClipLoader color="#4caf50" size={50} />
            </Card>
            <Card style={{ height: "200px" }}>
              <ClipLoader color="#4caf50" size={50} />
            </Card>
          </>
        )}
      </Grid>

      {/* 모달 */}
      {selectedBreed && (
        <CustomModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          breed={selectedBreed}
        />
      )}

      {/* 스크롤 맨 위로 버튼 */}
      {showScrollButton && (
        <ScrollToTopButton onClick={scrollToTop}>▲</ScrollToTopButton>
      )}
    </Container>

  );
};

export async function getServerSideProps() {
  await fetchAndStoreBreeds();
  const initialBreedsData = getBreedsData();
  return { props: { initialBreedsData } };
}

export default AnimalDaterPart;
