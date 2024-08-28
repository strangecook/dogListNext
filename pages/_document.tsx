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
          {/* 기본 SEO 태그 */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="robots" content="index, follow" />
          <meta name="description" content="다양한 강아지 품종에 대한 신뢰할 수 있는 정보 제공." />
          <link rel="canonical" href="https://www.doglist.info/" />
          <link rel="icon" href="/dog-paw.png" type="image/png" />

          {/* Open Graph 태그 */}
          <meta property="og:title" content="Dog List - 완벽한 개 품종 찾기" />
          <meta property="og:description" content="다양한 강아지 품종에 대한 신뢰할 수 있는 정보 제공." />
          <meta property="og:image" content="/mainwebImage.webp" />
          <meta property="og:url" content="https://www.doglist.info/" />

          {/* JSON-LD 구조화된 데이터 */}
          <script type="application/ld+json">
            {`
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Dog List",
      "url": "https://www.doglist.info",
      "description": "다양한 강아지 품종에 대한 신뢰할 수 있는 정보 제공.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.doglist.info/?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
    `}
          </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
