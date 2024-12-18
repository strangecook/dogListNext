import '../styles/globals.css';
import '../styles/WantedSans.css';
import type { AppProps } from 'next/app';
import NaviBar from '../components/Navibar/Navibar';
import { useEffect } from 'react';
import Head from 'next/head';
import useStore from '../store/useStore'; // Zustand store import
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 클라이언트 사이드에서만 Zustand 스토어를 초기화합니다.
    useStore.getState(); // 상태를 초기화하여 스토어에 접근
  }, []);

  return (
    <>
      <Head>
        {/* 페이지에서 기본적으로 필요한 Open Graph 및 Twitter Card 메타데이터 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="강아지위키 - 완벽한 개 품종 찾기" />
        <meta name="twitter:image" content="/mainwebImage.webp" />
        <meta name="twitter:site" content="@YourTwitterHandle" />
      </Head>
      <NaviBar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
