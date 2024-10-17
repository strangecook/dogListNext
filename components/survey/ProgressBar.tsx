import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 20px;
  height: 25px;
  margin-bottom: 20px;
  position: fixed;  /* 상단에 고정 */
  top: 0;  /* 화면의 가장 위에 위치 */
  left: 0; /* 좌측에 고정 */
  z-index: 999; /* 다른 요소들 위에 있도록 설정 */
`;

const ProgressBarFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: #4caf50;
  border-radius: 20px;
  transition: width 0.4s ease;
  text-align: center;
  color: white;
  line-height: 25px;
`;


interface ProgressBarProps {
  progress: number; // 완료된 퍼센트 값 (0 ~ 100)
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarFill progress={progress}>
        {progress}%
      </ProgressBarFill>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
