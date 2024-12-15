import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DescriptionCover, Context, CircleImageContainer, TitleText, SubscribeForm } from './styles/DescriptionpageCss';
import dog1 from '../../public/mainwebImage.webp';
import dog2 from '../../public/mainwebImage.webp';
import dog3 from '../../public/mainwebImage.webp';
import dog4 from '../../public/mainwebImage.webp';
import dog5 from '../../public/mainwebImage.webp';
import dog6 from '../../public/mainwebImage.webp';

const Descriptionpage: React.FC = () => {
  const router = useRouter();

  const handleStartSurvey = () => {
    router.push('/survey'); // 설문조사 페이지로 이동
  };

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
        </CircleImageContainer>

        {/* 텍스트 */}
        <TitleText>
          <h1>당신의 <span>완벽한 강아지</span>를 찾는 여정,</h1>
          <h1>지금 시작하세요</h1>
          <p>당신의 삶에 새로운 친구를 만들어 보세요. 함께하는 모든 순간이 즐거움으로 가득할 거예요.</p>
          <SubscribeForm>
            <input type="email" placeholder="이메일을 입력하세요." />
            <button>구독하기</button>
          </SubscribeForm>
        </TitleText>
      </Context>
    </DescriptionCover>

  );
};

export default Descriptionpage;
