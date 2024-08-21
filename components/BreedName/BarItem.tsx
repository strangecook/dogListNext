import React from 'react';
import { BarContainer, Emoji, Label, BarWrapper, Bar } from './BreedDetailStyles';

interface BarItemProps {
  emoji: string;
  label: string;
  level: number;
  reverse?: boolean; // optional prop
}

const BarItem: React.FC<BarItemProps> = ({ emoji, label, level, reverse = false }) => (
  <BarContainer>
    <Emoji>{emoji}</Emoji>
    <Label>{label}: {level}</Label>
    <BarWrapper>
      <Bar width={`${level * 20}%`} reverse={reverse ? true : false} />
    </BarWrapper>
  </BarContainer>
);

export default BarItem;
