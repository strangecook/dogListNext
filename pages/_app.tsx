import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NaviBar from '../components/Navibar/Navibar';
import { useEffect } from 'react';
import Head from 'next/head';
import useStore from '../store/useStore'; // Zustand store import
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 클라이언트 사이드에서만 Zustand 스토어를 초기화합니다.
    useStore.getState(); // 상태를 초기화하여 스토어에 접근
  }, []);

  return (
    <>
      <Head>
        <title>Dog List - 완벽한 개 품종 찾기</title>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Dog List - 완벽한 개 품종 찾기" />
        <meta property="og:image" content="/mainwebImage.webp" />
        <meta property="og:url" content="https://www.doglist.info/" />

        {/* 기본 Twitter Card 메타데이터 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dog List - 완벽한 개 품종 찾기" />
        <meta name="twitter:image" content="/mainwebImage.webp" />
        <meta name="twitter:site" content="@YourTwitterHandle" />
      </Head>
      <NaviBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
