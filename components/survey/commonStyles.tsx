import styled from 'styled-components';

// 공통으로 사용할 폼 컨테이너 스타일
export const FormContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 800px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
    margin: 20px;
  }
`;

// 공통으로 사용할 버튼 스타일
export const NavigationButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc; /* 비활성화된 버튼 스타일 */
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;


interface CheckboxContainerProps {
  checked: boolean;
}

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  margin-bottom: 10px;
  
  label {
    cursor: pointer;
    display: inline-block;
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ checked }) => (checked ? '#DFF0D8' : 'transparent')}; /* 체크되면 초록 배경 */
    font-weight: ${({ checked }) => (checked ? 'bold' : 'normal')}; /* 체크된 라벨 굵게 */
    color: ${({ checked }) => (checked ? '#4caf50' : 'inherit')}; /* 체크되면 글자 초록색 */
    border: ${({ checked }) => (checked ? '2px solid #4caf50' : '1px solid #ccc')}; /* 체크되면 초록 테두리 */
    transition: background-color 0.3s ease, border 0.3s ease, color 0.3s ease;
  }

  input[type="radio"] {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

// 공통으로 사용할 레이블 스타일
export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// 버튼 컨테이너 (이전, 다음 버튼)
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Blocked = styled.div`
  background-color: #E2EEE0;
  height: 100px;
  width: calc(100% + 50px );
  margin: 0 0 0 -25px ;

  @media (max-width: 768px) {
    height: 100px;
  }
`;

export const FormTitle = styled.h2`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  margin: -20px -20px 20px -20px;
  text-align: center;
  border-radius: 10px 10px 0px 0px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
