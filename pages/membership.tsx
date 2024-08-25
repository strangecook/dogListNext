// components/Membership.tsx
import React, { useState } from 'react';
import { NextPage } from 'next';
import Modal from 'react-modal';
import { 
  MembershipContainer, 
  Subtitle, 
  SectionContainer, 
  BadgeContainer, 
  BadgeTitle, 
  BadgeDescription, 
  BadgePrice, 
  BadgeButton, 
  DonationContainer, 
  DonationTitle, 
  DonationDescription, 
  DonationAmounts, 
  DonationAmount, 
  DonationButton, 
  BenefitsContainer, 
  BenefitItem, 
  ModalContent, 
  ModalTitle, 
  ModalButton, 
  customStyles 
} from '../components/Membership/MembershipCss';
import Head from 'next/head';

interface DonationAmountType {
  id: number;
  amount: string;
}

const Membership: NextPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<DonationAmountType | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const donationAmounts: DonationAmountType[] = [
    { id: 1, amount: '$5' },
    { id: 2, amount: '$10' },
    { id: 3, amount: '$20' },
  ];

  const handleAmountSelect = (amount: DonationAmountType) => {
    setSelectedAmount(amount);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDonate = () => {
    if (selectedAmount) {
      openModal();
    }
  };

  const handleBadgePurchase = () => {
    openModal();
  };

  return (
    <MembershipContainer>
      <Head>
        <title>멤버십 - Dog List</title>
        <meta name="description" content="Dog List 멤버십에 가입하고 다양한 혜택을 누리세요. 초기멤버 뱃지 구매와 제작자 기부를 통해 지원할 수 있습니다." />
        <meta name="keywords" content="멤버십, 강아지, 개 품종, Dog List, 초기멤버, 제작자 기부" />
        <meta property="og:title" content="멤버십 - Dog List" />
        <meta property="og:description" content="Dog List 멤버십에 가입하고 다양한 혜택을 누리세요. 초기멤버 뱃지 구매와 제작자 기부를 통해 지원할 수 있습니다." />
        <meta property="og:image" content="/mainImage.avif" />
        <meta property="og:url" content="https://www.doglist.info/membership" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.doglist.info/membership" />
      </Head>
      <SectionContainer>
        <BadgeContainer>
          <BadgeTitle>초기멤버 뱃지</BadgeTitle>
          <BadgeDescription>
            초기멤버 뱃지를 구매하고 영구적인 뱃지를 가지세요!
          </BadgeDescription>
          <BadgePrice>$1</BadgePrice>
          <BadgeButton onClick={handleBadgePurchase}>구매하기</BadgeButton>
        </BadgeContainer>

        <DonationContainer>
          <DonationTitle>제작자 기부</DonationTitle>
          <DonationDescription>
            다양한 금액으로 제작자에게 기부하고, 개발에 힘이 되도록 응원해주세요!
          </DonationDescription>
          <DonationAmounts>
            {donationAmounts.map((amount) => (
              <DonationAmount 
                key={amount.id} 
                onClick={() => handleAmountSelect(amount)} 
                selected={selectedAmount?.id === amount.id}
              >
                {amount.amount}
              </DonationAmount>
            ))}
          </DonationAmounts>
          <DonationButton onClick={handleDonate} disabled={!selectedAmount}>
            {selectedAmount ? '기부하기' : '금액 선택'}
          </DonationButton>
        </DonationContainer>
      </SectionContainer>

      <BenefitsContainer>
        <Subtitle>구독 혜택</Subtitle>
        <BenefitItem>프로필에 초기멤버 뱃지 표시</BenefitItem>
        <BenefitItem>특별한 초기멤버 전용 제작자의 관심</BenefitItem>
        <BenefitItem>향후 서비스 개선 시 우선적인 피드백 기회 제공</BenefitItem>
        <BenefitItem>제작자와의 직접적인 소통 기회</BenefitItem>
      </BenefitsContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Coming Soon"
        ariaHideApp={false}
      >
        <ModalContent>
          <ModalTitle>곧 출시 예정입니다!</ModalTitle>
          <ModalButton onClick={closeModal}>닫기</ModalButton>
        </ModalContent>
      </Modal>
    </MembershipContainer>
  );
};

export default Membership;
