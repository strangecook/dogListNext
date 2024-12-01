// SurveyResultStyles.ts
import styled, { keyframes } from 'styled-components';

export const DetailContainer = styled.div`
  max-width: 800px;
  margin: 80px auto 20px auto;
  padding: 20px;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

export const FilterButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? '#2196f3' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#ffffff' : '#000000')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const DogListContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const DogButton = styled.button<{ selected: boolean }>`
  padding: 8px 15px;
  background-color: ${({ selected }) => (selected ? '#4caf50' : '#e0e0e0')};
  color: ${({ selected }) => (selected ? '#ffffff' : '#000000')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ChartRow = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.div`
  width: 150px;
  text-align: right;
  font-weight: bold;
`;

export const BarWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f0f0f0;
`;

const growWidth = keyframes`
  from {
    width: 0;
  }
  to {
    width: ${({ width }: { width: number }) => width}%;
  }
`;

// UserBar - 파란색 계열로 설정, 애니메이션 추가
export const UserBar = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  background-color: rgba(54, 162, 235, 0.7); // 파란색 계열
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  animation: ${growWidth} 0.8s ease-out;
`;

// DogBar - 주황색 계열로 설정, 애니메이션 추가
export const DogBar = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  background-color: rgba(255, 159, 64, 0.7); // 주황색 계열
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  animation: ${growWidth} 0.8s ease-out;
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
