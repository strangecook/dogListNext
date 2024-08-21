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
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
