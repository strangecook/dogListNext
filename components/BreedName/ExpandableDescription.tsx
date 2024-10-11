import React, { useState } from 'react';
import { TooltipButton, TooltipContent, TooltipContainer, DescriptionContainer, DescriptionTitle, DescriptionIntroText, DescriptionScoreText } from './BreedDetailStyles';
import BarItem from './BarItem';

// 재사용 가능한 설명 컴포넌트
const ExpandableDescription: React.FC<{ emoji: any, title: string, introText: string, level: number, descriptions: string[], reverse?: string }> = ({ emoji, title, introText, level, descriptions, reverse = "false" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // 툴팁 토글 함수
  const toggleTooltip = () => setShowTooltip(prevState => !prevState);

  return (
    <DescriptionContainer>
      {/* 제목과 더보기 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DescriptionTitle>{title}</DescriptionTitle>

        <TooltipContainer>
          <TooltipButton onClick={toggleTooltip}>
            {showTooltip ? '간단히' : '더보기'}
          </TooltipButton>

          {/* 툴팁 내용 표시 */}
          {showTooltip && (
            <TooltipContent>
              {descriptions.map((desc, index) => (
                <p key={index}>{desc}</p>
              ))}
            </TooltipContent>
          )}
        </TooltipContainer>
      </div>
      <BarItem emoji={emoji} label={title} level={level} reverse={reverse} />
      {/* 간단한 설명 텍스트 */}
      <DescriptionIntroText>{introText}</DescriptionIntroText>

      {/* 현재 선택된 점수에 따른 설명 */}
      <DescriptionScoreText>{descriptions[level - 1]}</DescriptionScoreText>
    </DescriptionContainer>
  );
};

export default ExpandableDescription;
