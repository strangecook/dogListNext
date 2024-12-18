import styled from 'styled-components';

// 푸터 컨테이너 스타일
const FooterContainer = styled.footer`
  background-color: #272527;
  color: #ecf0f1;
  padding: 40px 20px;
  text-align: center;
  font-size: 0.9em;
  position: relative;
  bottom: 0;
  width: 100%;
`;

// 푸터 내부 컨텐츠 스타일
const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  line-height: 1.6;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

// 비즈니스 정보 컨테이너 스타일
const BusinessInfo = styled.div`
  text-align: left;
  line-height: 2;
  padding: 20px;
  font-size: 0.95em;
  
  @media (min-width: 768px) {
    text-align: left;
    max-width: 50%;
  }
`;

// 비즈니스 정보의 개별 항목 스타일
const InfoItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;

  strong {
    display: inline-block;
    width: 150px; /* 레이블과 값 사이를 맞춰주는 고정 너비 */
    text-align: right;
    margin-right: 10px;
    color: #bdc3c7;
  }
`;

// 푸터 하단에 있는 카피라이트 스타일
const Copyright = styled.div`
  margin-top: 20px;
  font-size: 0.8em;
  color: #bdc3c7;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

// 푸터 컴포넌트
const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <BusinessInfo>
          <InfoItem><strong>상호명:</strong> 인플로우</InfoItem>
          <InfoItem><strong>사업자 등록 번호:</strong> 223-29-01831</InfoItem>
          <InfoItem><strong>대표자명:</strong> 허인재</InfoItem>
          <InfoItem><strong>사업장 주소지:</strong> (57798) 전남 광양시 눈소4길 65</InfoItem>
          <InfoItem><strong>전화번호:</strong> 061-791-5090</InfoItem>
        </BusinessInfo>
        <Copyright>
          © 2024 Inflow. All Rights Reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
