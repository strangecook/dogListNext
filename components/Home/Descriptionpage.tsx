import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DescriptionCover, Context, CircleImageContainer, TitleText, SubscribeForm } from './styles/DescriptionpageCss';
import dog1 from '../../public/dogPic5@.webp';
import dog2 from '../../public/dogPic14@.webp';
import dog3 from '../../public/dogPic20@.webp';
import dog4 from '../../public/dogPic23@.webp';
import dog5 from '../../public/dogPic21@.webp';
import dog6 from '../../public/dogPic16@.webp';
import rightArrow from '../../public/free-icon-right-arrow.png'

const Descriptionpage: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const handleStartSurvey = () => {
    router.push('/survey'); // 설문조사 페이지로 이동
  };

    // 뷰포트 크기 감지
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // 768px 이하를 모바일로 간주
      };
  
      // 초기 실행 및 리스너 등록
      handleResize(); // 초기 실행
      window.addEventListener('resize', handleResize);
  
      // 클린업 함수
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <DescriptionCover>
      <Context>
        <CircleImageContainer>
          {/* 겹쳐 보이는 원형 이미지들 */}
          <Image src={dog1} alt="강아지 1" className="circle-image image1" />
          <Image src={dog2} alt="강아지 2" className="circle-image image2" />
          <Image src={dog3} alt="강아지 3" className="circle-image image3" />
          <Image src={dog4} alt="강아지 4" className="circle-image image4" />
          <Image src={dog5} alt="강아지 5" className="circle-image image5" />
          <Image src={dog6} alt="강아지 6" className="circle-image image6" />
          <div className="color-circle circle1"></div>
          <div className="color-circle circle2"></div>
          <div className="color-circle circle3"></div>
          <div className="color-circle circle4"></div>
        </CircleImageContainer>

        {/* 텍스트 */}
        <TitleText>
        {isMobile ? (
            <>
              <h1>당신의 <span>완벽한 강아지</span>를</h1>
              <h1>찾는 여정, 지금 시작하세요</h1>
            </>
          ) : (
            <>
              <h1>당신의 <span>완벽한 강아지</span>를 찾는 여정,</h1>
              <h1>지금 시작하세요</h1>
            </>
          )}
          <p>완벽한 강아지와의 만남을 도와드리기 위해,<br/> 한번의 설문으로 당신의 완벽한 반려견을 만나보세요.</p>
          <div className="TextGap"></div>
          <SubscribeForm>
            <button onClick={handleStartSurvey}>나에게 맞는 강아지 찾기 <Image src={rightArrow} alt="rightArrow" className="button_rightArrow" /> </button>
          </SubscribeForm>
        </TitleText>
      </Context>
    </DescriptionCover>

  );
};

export default Descriptionpage;
