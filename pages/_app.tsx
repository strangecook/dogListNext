import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NaviBar from '../components/Navibar/Navibar'

function MyApp({ Component, pageProps }: AppProps) {
    return (
      <>
        <NaviBar />
        <Component {...pageProps} />
      </>
    );
  }
export default MyApp;
