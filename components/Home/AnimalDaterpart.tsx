import { useEffect, useState, useCallback, useRef, ChangeEvent, KeyboardEvent } from 'react';
import {
  Container, Card, Grid, SearchBar, SearchButton, SearchBarContainer, AutocompleteList,
  AutocompleteItem, ConsonantFilterContainer, ConsonantButton, ThemeFilterContainer,
  ThemeButton, FilterInfoContainer, FilterInfo, ResetButton, ScrollToTopButton
} from './styles/animalDaterPartCss';
import DogCard from './DogCard';
import { fetchAndStoreBreeds, getBreedsData } from '../../dataFetch/fetchAndStoreBreeds';
import CustomModal from './CustomModal';
import Filters from './Filters';
import useStore from '../../store/useStore';
import { ClipLoader } from 'react-spinners';
import { Breed } from '../../types/Breed'; // Breed 타입 import

const consonants = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
const themes = [
  { id: 1, name: '한국에서 인기있는 반려견' },
  { id: 2, name: '1인가구에 좋은 반려견' },
  { id: 3, name: '초보 견주에게 좋은 반려견' },
  { id: 4, name: '자녀를 가지고 있는 가정에게 좋은 반려견' },
  { id: 5, name: '노부부에게 좋은 반려견' }
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

  return (
    <Container>
      <FilterInfoContainer>
        <FilterInfo>
          현재 필터:{" "}
          {selectedConsonant || selectedTheme || filters.size !== 'all' || filters.breedGroup !== 'all' || filters.affectionWithFamily !== 'all' || filters.goodWithOtherDogs !== 'all' || filters.trainabilityLevel !== 'all' || filters.energyLevel !== 'all' || filters.sheddingLevel !== 'all' || searchQuery
            ? (
              <>
                {selectedConsonant && `자음: ${selectedConsonant}, `}
                {selectedTheme && `테마: ${themes.find(theme => theme.id === selectedTheme)?.name}, `}
                {filters.size !== 'all' && `크기: ${filters.size}, `}
                {filters.breedGroup !== 'all' && `견종 그룹: ${filters.breedGroup}, `}
                {filters.affectionWithFamily !== 'all' && `가족과의 애정: ${filters.affectionWithFamily}, `}
                {filters.goodWithOtherDogs !== 'all' && `다른 개와의 친화력: ${filters.goodWithOtherDogs}, `}
                {filters.trainabilityLevel !== 'all' && `훈련 가능성: ${filters.trainabilityLevel}, `}
                {filters.energyLevel !== 'all' && `에너지 수준: ${filters.energyLevel}, `}
                {filters.sheddingLevel !== 'all' && `털 빠짐 정도: ${filters.sheddingLevel}, `}
                {searchQuery && `검색어: ${searchQuery}`}
              </>
            ) : "없음"
          }
        </FilterInfo>

        <ResetButton onClick={resetFilters}>필터 초기화</ResetButton>
      </FilterInfoContainer>
      <ConsonantFilterContainer>
        {consonants.map((consonant, index) => (
          <ConsonantButton
  key={index}
  $selected={consonant === selectedConsonant} // 수정된 부분
  onClick={() => handleConsonantClick(consonant)}
>
  {consonant}
</ConsonantButton>
        ))}
      </ConsonantFilterContainer>
      <ThemeFilterContainer>
        {themes.map((theme) => (
          <ThemeButton
            key={theme.id}
            $selected={theme.id === selectedTheme} // 수정된 부분
            onClick={() => handleThemeClick(theme.id)}
          >
            {theme.name}
          </ThemeButton>
        ))}
      </ThemeFilterContainer>
      <SearchBarContainer ref={autocompleteRef}>
        <SearchBar
          type="text"
          placeholder="한국어나 영어로 종을 검색하세요"
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyDown={handleSearchInputKeyDown}
        />
        <SearchButton onClick={handleSearchButtonClick}>Search</SearchButton>
        {autocompleteResults.length > 0 && (
          <AutocompleteList>
            {autocompleteResults.map((breed, index) => (
              <AutocompleteItem key={index} onClick={() => handleAutocompleteItemClick(breed)}>
                {breed.koreanName} ({breed.englishName})
              </AutocompleteItem>
            ))}
          </AutocompleteList>
        )}
      </SearchBarContainer>
      <Filters filters={filters} setFilters={setFilters} />
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
            <Card style={{ height: "300px" }}>
              <ClipLoader color="#4caf50" size={50} />
            </Card>
            <Card style={{ height: "300px" }}>
              <ClipLoader color="#4caf50" size={50} />
            </Card>
            <Card style={{ height: "300px" }}>
              <ClipLoader color="#4caf50" size={50} />
            </Card>
          </>
        )}
      </Grid>
      {selectedBreed && (
        <CustomModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          breed={selectedBreed}
        />
      )}
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
