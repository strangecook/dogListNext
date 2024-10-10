import React from 'react';
import { Settings } from 'react-slick';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const SampleNextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "rgba(0, 0, 0, 0.5)", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
};

export const SamplePrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "rgba(0, 0, 0, 0.5)", borderRadius: "50%" }}
      onClick={onClick}
    />
  );
};

export const sliderSettings: Settings = {
  dots: true,                    // 아래 점을 통해 슬라이드 이동 가능하게 설정
  infinite: true,                // 무한 루프 스크롤
  speed: 500,                    // 슬라이드 전환 속도
  slidesToShow: 1,               // 한 번에 보여줄 슬라이드 수
  slidesToScroll: 1,             // 한 번에 스크롤할 슬라이드 수
  nextArrow: <SampleNextArrow />, // 커스텀 다음 화살표 적용
  prevArrow: <SamplePrevArrow />, // 커스텀 이전 화살표 적용
};
