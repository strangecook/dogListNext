import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth, db } from '../components/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Head from 'next/head';

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 80px auto 20px auto; 
  padding: 20px;
  background-color: white;
`;

const CategorySelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const MessageInput = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
  }
`;

const Notification = styled.p<{ $isError: boolean }>`
  margin-top: 20px;
  font-size: 16px;
  color: ${(props) => (props.$isError ? 'red' : 'green')};
  text-align: center;
`;

const categories = [
  "회원가입 및 로그인 문제",
  "사이트 이용 방법",
  "결제 및 환불",
  "계정 관리",
  "사이트 에러",
  "콘텐츠 관련",
  "일반 문의",
  "피드백 및 제안"
];

const Contact: React.FC = () => {
  const [category, setCategory] = useState<string>(categories[0]);
  const [message, setMessage] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification('');

    if (!user) {
      setNotification('로그인이 필요합니다.');
      setIsLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'contacts'), {
        category,
        message,
        userName: user.displayName,
        userId: user.uid,
        userEmail: user.email,
        timestamp: new Date(),
        status: false
      });
      setNotification('문의가 전송되었습니다.');
      setCategory(categories[0]);
      setMessage('');
    } catch (error) {
      console.error('Error adding document: ', error);
      setNotification('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContactContainer>
      <Head>
        <title>개발자 문의 - 강아지위키</title>
        <meta name="description" content="강아지위키의 개발자에게 문의하거나 피드백을 제공할 수 있습니다. 다양한 카테고리에서 문제를 선택하고 메시지를 남겨주세요." />
        <meta name="keywords" content="강아지, 개 품종, 강아지위키, 개발자 문의, 피드백, 문제 해결" />

        {/* 이 페이지에 특화된 Open Graph Meta Tags */}
        <meta property="og:title" content="개발자 문의 - 강아지위키" />
        <meta property="og:description" content="강아지위키의 개발자에게 문의하거나 피드백을 제공할 수 있습니다. 다양한 카테고리에서 문제를 선택하고 메시지를 남겨주세요." />
        <meta property="og:image" content="/mainImage.avif" />
        <meta property="og:url" content="https://www.doglist.info/contact" />
        <meta property="og:type" content="website" />

        {/* JSON-LD 구조화된 데이터: 이 페이지에 특화된 데이터 */}
        <script type="application/ld+json">
          {`
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "개발자 문의 - 강아지위키",
      "description": "강아지위키의 개발자에게 문의하거나 피드백을 제공할 수 있습니다. 다양한 카테고리에서 문제를 선택하고 메시지를 남겨주세요.",
      "url": "https://www.doglist.info/contact"
    }
    `}
        </script>
        <link rel="canonical" href="https://www.doglist.info/contact" />
      </Head>
      <h2>개발자 문의</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">문의 카테고리:</label>
        <CategorySelect id="category" value={category} onChange={handleCategoryChange}>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </CategorySelect>
        <label htmlFor="message">문의 내용:</label>
        <MessageInput id="message" value={message} onChange={handleMessageChange} placeholder="여기에 문의 내용을 작성하세요." />
        <SubmitButton type="submit" disabled={isLoading}>{isLoading ? '전송 중...' : '문의 전송'}</SubmitButton>
      </form>
      {notification && <Notification $isError={notification.includes('오류')}>{notification}</Notification>}
    </ContactContainer>
  );
};

export default Contact;
