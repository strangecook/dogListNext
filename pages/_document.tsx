// pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* 기본 SEO 태그: 모든 페이지에 공통으로 적용됩니다 */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="robots" content="index, follow" />
          <link rel="icon" href="/dog-paw.png" type="image/png" />
          <meta property="og:type" content="website" />
          <meta name="google-adsense-account" content="ca-pub-9810617727266867" />
          <meta name="naver-site-verification" content="087283ca812e07b2081a3d51ff3dc06deae3e1e3" />
          <meta name="google-site-verification" content="DSWbXnrg2mBMSC5JCo1EtZjOkN85UjV4Vup4MjKAoPQ" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
