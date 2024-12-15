import React from 'react';
import styled from 'styled-components';

// ProgressBarContainer도 스타일 정의
const ProgressBarContainer = styled.div`
  position: sticky;
  top: 0px; /* 네비게이션 바 아래 */
  width: 100%;
  max-width: 800px;
  background: #dcdcdc; /* 진행바 배경색 */
  border-radius: 5px; /* 모서리 둥글게 */
  overflow: hidden;
  height: 25px; /* 진행바 높이 */
  margin: 0 auto; /* 중앙 정렬 */
`;

const ProgressFill = styled.div`
position: absolute;
  height: 100%;
  background-color: #4caf50; /* 초록색 진행바 */
  transition: width 0.3s ease; /* 부드러운 진행 */
  z-index: 0; /* 텍스트 아래로 배치 */
`;

const ProgressText = styled.div`
position: absolute;
width: 100%;
  text-align: center;
  font-size: 14px; /* 텍스트 크기 */
  color: #333; /* 텍스트 색상 */
  margin-top: 5px; /* 진행바와 간격 */
  font-weight: bold; /* 텍스트 굵게 */
  z-index: 1; /* 텍스트를 진행바 위로 배치 */
  font-weight: bold; /* 텍스트 굵게 */
`;


const ProgressBar: React.FC<{ answered: number; total: number }> = ({ answered, total }) => {
  const progressPercentage = (answered / total) * 100;

  return (
    <ProgressBarContainer>
      <ProgressFill style={{ width: `${progressPercentage}%` }} />
      <ProgressText>{`${answered} / ${total} 질문 완료`}</ProgressText>
    </ProgressBarContainer>
  );
};



export default ProgressBar;
