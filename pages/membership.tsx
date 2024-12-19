// components/Membership.tsx
import React, { useState, useEffect } from 'react';
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
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Membership: NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tossWidgets, setTossWidgets] = useState<any>(null);
  const [isCouponChecked, setIsCouponChecked] = useState(false);
  const [customerKey, setCustomerKey] = useState<string | null>(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    const initializeCustomerKey = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCustomerKey(user.uid); // Firebase 사용자 UID 설정
        } else {
          console.error("사용자가 로그인하지 않았습니다.");
        }
      });
    };

    initializeCustomerKey();
  }, []);

  useEffect(() => {
    const initializeTossPayments = async () => {
      const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;

      if (!clientKey || !customerKey) {
        console.error(
          !clientKey
            ? "환경 변수 NEXT_PUBLIC_TOSS_CLIENT_KEY가 설정되지 않았습니다."
            : "Firebase UID가 설정되지 않았습니다."
        );
        return;
      }

      try {
        const tossPayments = await loadTossPayments(clientKey);

        const widgets = tossPayments.widgets({
          customerKey, // Firebase UID를 customerKey로 사용
        });

        setTossWidgets(widgets);

        // 초기 결제 금액 설정
        await widgets.setAmount({
          currency: 'KRW',
          value: isCouponChecked ? 2400 : 2900,
        });

        // 결제 UI 렌더링
        await Promise.all([
          widgets.renderPaymentMethods({
            selector: '#payment-method',
            variantKey: 'DEFAULT',
          }),
          widgets.renderAgreement({
            selector: '#agreement',
            variantKey: 'AGREEMENT',
          }),
        ]);
      } catch (error) {
        console.error('TossPayments 초기화 오류:', error);
      }
    };

    if (customerKey) {
      initializeTossPayments();
    }
  }, [customerKey, isCouponChecked]);

  const handleCouponChange = async () => {
    setIsCouponChecked((prev) => !prev);

    if (tossWidgets) {
      await tossWidgets.setAmount({
        currency: 'KRW',
        value: !isCouponChecked ? 2400 : 2900,
      });
    }
  };

  const handleSurveyStart = async () => {
    try {
      if (!tossWidgets) {
        console.error('TossWidgets가 초기화되지 않았습니다.');
        alert('결제를 진행할 수 없습니다. 관리자에게 문의하세요.');
        return;
      }

      await tossWidgets.requestPayment({
        orderId: `order_${Date.now()}`,
        orderName: '강아지 추천 설문',
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
        customerName: '홍길동',
      });

      openModal();
    } catch (error: any) {
      console.error('결제 실패:', error.message || error);
      alert('결제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <SurveyContainer>
      <Head>
        <title>강아지 추천 설문 - 강아지위키</title>
        <meta name="description" content="2900원으로 설문을 시작하고 당신에게 맞는 강아지를 찾아보세요." />
        <meta name="keywords" content="강아지, 설문, 추천, 강아지위키" />
        <meta property="og:title" content="강아지 추천 설문 - 강아지위키" />
        <meta property="og:description" content="2900원으로 설문을 시작하고 당신에게 맞는 강아지를 찾아보세요." />
        <meta property="og:image" content="/mainImage.avif" />
        <meta property="og:url" content="https://www.doglist.info/survey" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "강아지 추천 설문 - 강아지위키",
            description: "2900원으로 설문을 시작하고 당신에게 맞는 강아지를 찾아보세요.",
            url: "https://www.doglist.info/survey",
          })}
        </script>
        <link rel="canonical" href="https://www.doglist.info/survey" />
      </Head>

      <SurveyIntro>
        <Title>강아지 추천 설문</Title>
        <Description>
          설문에 참여하고 2900원으로 당신에게 딱 맞는 강아지를 찾아보세요!
        </Description>
        <div>
        </div>
        <div id="payment-method"></div>
        <div id="agreement"></div>
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
          <ModalDescription>결제가 완료되었습니다. 설문을 진행하세요.</ModalDescription>
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </ModalContent>
      </Modal>
    </SurveyContainer>
  );
};

export default Membership;
