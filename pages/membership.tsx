// components/Membership.tsx
import React, { useState } from 'react';
import { NextPage } from 'next';
import Modal from 'react-modal';
import {
  SurveyContainer,
  SurveyIntro,
  Title,
  Description,
  StartButton,
  ModalContent,
  ModalTitle,
  ModalDescription,
  CloseButton,
  customStyles
} from '../components/Membership/MembershipCss';

import Head from 'next/head';

const Membership: NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSurveyStart = () => {
    openModal();
  };

  return (
    <SurveyContainer>
      <Head>
        <title>강아지 추천 설문 - 강아지위키</title>
        <meta name="description" content="2900원으로 설문을 시작하고 당신에게 맞는 강아지를 찾아보세요." />
        <meta name="keywords" content="강아지, 설문, 추천, 강아지위키" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="강아지 추천 설문 - 강아지위키" />
        <meta property="og:description" content="2900원으로 설문을 시작하고 당신에게 맞는 강아지를 찾아보세요." />
        <meta property="og:image" content="/mainImage.avif" />
        <meta property="og:url" content="https://www.doglist.info/survey" />
        <meta property="og:type" content="website" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "강아지 추천 설문 - 강아지위키",
            "description": "2900원으로 설문을 시작하고 당신에게 맞는 강아지를 찾아보세요.",
            "url": "https://www.doglist.info/survey"
          })}
        </script>
        <link rel="canonical" href="https://www.doglist.info/survey" />
      </Head>

      <SurveyIntro>
        <Title>강아지 추천 설문</Title>
        <Description>
          설문에 참여하고 2900원으로 당신에게 딱 맞는 강아지를 찾아보세요!
        </Description>
        <StartButton onClick={handleSurveyStart}>설문 시작하기</StartButton>
      </SurveyIntro>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Survey Modal"
        ariaHideApp={false}
      >
        <ModalContent>
          <ModalTitle>설문이 곧 시작됩니다!</ModalTitle>
          <ModalDescription>현재 설문 준비 중입니다. 곧 서비스가 제공될 예정입니다.</ModalDescription>
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </ModalContent>
      </Modal>
    </SurveyContainer>
  );
};

export default Membership;