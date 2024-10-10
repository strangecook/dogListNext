import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { DescriptionCover, CombinedImageContainer, Context, Notification, StyledImage } from './styles/DescriptionpageCss';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import dogLogoImage from '../../public/mainwebImage.webp';
import dogMediaImage from '../../public/mediaImage.webp';

const Descriptionpage: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [emailvalue, setEmailValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [imageSrc, setImageSrc] = useState(dogLogoImage.src); // 기본 이미지는 src로 설정
  const [imagesLoaded, setImagesLoaded] = useState(false); // 이미지 로드 여부를 관리

  useEffect(() => {
    // 이미지 사전 로드 함수
    const preloadImages = (imageUrls: string[]) => {
      const promises = imageUrls.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new window.Image(); // window.Image()로 명확하게 지정
          img.src = src; // 이미지 경로 설정
          img.onload = () => resolve(); // 이미지 로드 완료 시
          img.onerror = (error) => reject(error); // 로드 오류 시 에러 전달
        });
      });
      return Promise.all(promises); // 모든 이미지가 로드될 때까지 기다림
    };

    // 모바일 크기 판단에 따라 로드할 이미지 선택
    const selectedImageSrc = window.innerWidth <= 768 ? dogMediaImage.src : dogLogoImage.src;

    // 이미지 미리 로드
    preloadImages([dogLogoImage.src, dogMediaImage.src])
      .then(() => {
        setImageSrc(selectedImageSrc); // 로드 완료된 이미지 설정
        setImagesLoaded(true); // 모든 이미지가 로드 완료됨
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });

    // 윈도우 리사이즈 이벤트 핸들러
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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = async () => {
    if (emailvalue === '') {
      setMessage('이메일을 입력해주세요.');
      setIsError(true);
      return;
    }

    if (!validateEmail(emailvalue)) {
      setMessage('유효한 이메일 주소를 입력해주세요.');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      await addDoc(collection(db, 'usersSubscribe'), {
        email: emailvalue,
        timestamp: new Date(),
      });
      setEmailValue('');
      setMessage('구독이 완료되었습니다.');
      setIsError(false);
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('구독 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DescriptionCover>
      <CombinedImageContainer>
        {imagesLoaded && ( // 이미지가 로드되었을 때만 렌더링
          <Image
            src={imageSrc}
            alt="Responsive Image"
            layout="fill" // 부모 요소를 채우도록 설정
            objectFit="cover" // 이미지 비율을 유지하며 부모 요소를 채움
            priority
          />
        )}

        {/* 여기에 텍스트를 덧씌움 */}
        <Context>
          <div className="text">
            <h1 className="contextH1">{`당신의 완벽한 강아지를 찾는 여정,\n지금 시작하세요`}</h1>
            <h3 className="contextH3">
              {`당신의 삶에 새로운 친구를 만들어 보세요,\n함께하는 모든 순간이 즐거움으로 가득할 거예요.`}
            </h3>
            <div className="emailcontainer">
              <div className="emaildiv">
                <input
                  className="emailInput"
                  type="text"
                  placeholder="이메일을 입력하세요."
                  value={emailvalue}
                  onChange={(e) => {
                    e.preventDefault();
                    setEmailValue(e.target.value);
                  }}
                />
              </div>
              <button
                className={isHovered ? 'buttonHovered' : 'buttonNormal'}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleSubscribe}
                disabled={isLoading}
              >
                {isLoading ? '구독 중...' : '새로운 정보 구독하기'}
              </button>
            </div>
            {message && <Notification $isError={isError}>{message}</Notification>}
          </div>
        </Context>
      </CombinedImageContainer>
    </DescriptionCover>
  );
};

export default Descriptionpage;
