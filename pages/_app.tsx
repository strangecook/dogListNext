import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NaviBar from '../components/Navibar/Navibar';
import { useEffect } from 'react';
import useStore from '../store/useStore'; // Zustand store import

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // 클라이언트 사이드에서만 Zustand 스토어를 초기화합니다.
    useStore.getState(); // 상태를 초기화하여 스토어에 접근
  }, []);

  return (
    <>
      <NaviBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
