import React, { useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import useStore from '../../store/useStore';
import { FilterOptions } from '../../types/FilterOptions';

const FilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const DropdownContainer = styled.div`
  margin: 5px;
  position: relative;
  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 10px);
    min-width: 100px;
  }

  &:nth-child(n+3) {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 0.9em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  position: relative;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 6px;
    font-size: 0.8em;
  }
`;

const Label = styled.label`
  margin-right: 10px;
  font-weight: bold;

  @media (max-width: 768px) {
    margin-right: 5px;
    font-size: 0.9em;
  }
`;

const filterOptions = [
  { name: 'size', label: '크기', options: ['모두', '소형견', '중형견', '대형견', '초대형견'] },
  { name: 'breedGroup', label: '견종 그룹', options: ['모두', '논스포팅', '스포팅', '스피츠', '워킹', '테리어', '토이', '하운드', '허딩'] },
  { name: 'affectionWithFamily', label: '가족과의 애정', options: ['모두', '1', '2', '3', '4', '5'] },
  { name: 'goodWithOtherDogs', label: '다른 개와 친화력', options: ['모두', '1', '2', '3', '4', '5'] },
  { name: 'trainabilityLevel', label: '훈련 가능성', options: ['모두', '1', '2', '3', '4', '5'] },
  { name: 'energyLevel', label: '에너지 수준', options: ['모두', '1', '2', '3', '4', '5'] },
  { name: 'sheddingLevel', label: '털 빠짐 정도', options: ['모두', '1', '2', '3', '4', '5'] },
];

interface FiltersProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const { setStoredFilters } = useStore();

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value } as FilterOptions));
  };

  useEffect(() => {
    setStoredFilters(filters);
    console.log('Filters updated in Zustand store and localStorage:', filters);
  }, [filters, setStoredFilters]);

  return (
    <FilterSection>
      {filterOptions.map(({ name, label, options }) => (
        <DropdownContainer key={name}>
          <Label>{label}:</Label>
          <Dropdown name={name} value={filters[name as keyof FilterOptions]} onChange={handleDropdownChange}>
            {options.map((option, index) => (
              <option key={index} value={option === '모두' ? 'all' : option}>
                {option}
              </option>
            ))}
          </Dropdown>
        </DropdownContainer>
      ))}
    </FilterSection>
  );
};

export default Filters;
