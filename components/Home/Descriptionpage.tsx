import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DescriptionCover, CombinedImageContainer, Context } from './styles/DescriptionpageCss';
import dogLogoImage from '../../public/mainwebImage.webp';
import dogMediaImage from '../../public/mediaImage.webp';

const Descriptionpage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState(dogLogoImage.src);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const preloadImages = (imageUrls: string[]) => {
      const promises = imageUrls.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new window.Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = (error) => reject(error);
        });
      });
      return Promise.all(promises);
    };

    const selectedImageSrc = window.innerWidth <= 768 ? dogMediaImage.src : dogLogoImage.src;

    preloadImages([dogLogoImage.src, dogMediaImage.src])
      .then(() => {
        setImageSrc(selectedImageSrc);
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });

    const updateImageSrc = () => {
      if (window.innerWidth <= 768) {
        setImageSrc(dogMediaImage.src);
      } else {
        setImageSrc(dogLogoImage.src);
      }
    };

    window.addEventListener('resize', updateImageSrc);
    return () => window.removeEventListener('resize', updateImageSrc);
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleStartSurvey = () => {
    router.push('/survey'); // 설문조사 페이지로 이동
  };

  return (
    <DescriptionCover>
      <CombinedImageContainer>
        {imagesLoaded && (
          <Image
            src={imageSrc}
            alt="Responsive Image"
            layout="fill"
            objectFit="cover"
            priority
          />
        )}

        <Context>
          <div className="text">
            <h1 className="contextH1">{`당신의 완벽한 강아지를 찾는 여정,\n지금 시작하세요`}</h1>
            <h3 className="contextH3">
              {`완벽한 강아지와의 만남을 도와드리기 위해, \n한 번의 설문으로 당신의 완벽한 반려견을 만나보세요.`}
            </h3>
            <div className="emailcontainer">
              <button
                className={isHovered ? 'buttonHovered' : 'buttonNormal'}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleStartSurvey}
              >
                나에게 맞는 강아지 찾기
              </button>
            </div>
          </div>
        </Context>
      </CombinedImageContainer>
    </DescriptionCover>
  );
};

export default Descriptionpage;
