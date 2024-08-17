import { create } from 'zustand';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { Breed } from '../types/Breed';

interface FilterOptions {
  size: string;
  breedGroup: string;
  coatType: string;
  affectionWithFamily: string;
  goodWithOtherDogs: string;
  trainabilityLevel: string;
  energyLevel: string;
  sheddingLevel: string;
}

interface StoreState {
  storedBreeds: Record<string, Breed>;
  setStoredBreeds: (breeds: Record<string, Breed>) => void;
  storedFilters: FilterOptions;
  setStoredFilters: (filters: FilterOptions) => void;
  selectedBreed: Breed | null;
  setSelectedBreed: (breed: Breed | null) => void;
}

const initialFilters: FilterOptions = {
  size: 'all',
  breedGroup: 'all',
  coatType: 'all',
  affectionWithFamily: 'all',
  goodWithOtherDogs: 'all',
  trainabilityLevel: 'all',
  energyLevel: 'all',
  sheddingLevel: 'all',
};

const useStore = create<StoreState>((set) => {
  const isClient = typeof window !== 'undefined';

  return {
    storedBreeds: isClient ? loadFromLocalStorage('storedBreeds') || {} : {},
    setStoredBreeds: (breeds) => {
      set({ storedBreeds: breeds });
      if (isClient) {
        saveToLocalStorage('storedBreeds', breeds);
      }
    },
    storedFilters: isClient ? loadFromLocalStorage('storedFilters') || initialFilters : initialFilters,
    setStoredFilters: (filters) => {
      set({ storedFilters: filters });
      if (isClient) {
        saveToLocalStorage('storedFilters', filters);
      }
    },
    selectedBreed: null,
    setSelectedBreed: (breed) => set({ selectedBreed: breed }),
  };
});

export default useStore;
