import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import AnimalDaterpart from '../components/Home/AnimalDaterpart';
import Descriptionpage from '../components/Home/Descriptionpage';
import { GetServerSideProps } from 'next';
import { fetchBreedsFromFirestore, mergeBreedsData } from '../dataFetch/fetchAndStoreBreeds';
import { Breed } from '../types/Breed';

const MainCoverdiv = styled.div`
  margin: 0;
  width: 100vw;
  background-position: center;
`;

interface HomeProps {
  initialBreedsData: Record<string, Breed>;
}

const Home: React.FC<HomeProps> = ({ initialBreedsData }) => {
  return (
    <>
      <Head>
        <title>Dog List - 완벽한 개 품종 찾기</title>
        <meta name="description" content="다양한 강아지 품종에 대한 신뢰할 수 있는 정보 제공. 품종 특성, 관리 방법, 가족에게 맞는 반려견 찾기 팁 등 최신 정보를 확인하세요." />
        <meta name="keywords" content="개, 개 품종, 개 리스트, 애완동물, 동물" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Dog List - 완벽한 개 품종 찾기" />
        <meta property="og:description" content="다양한 강아지 품종에 대한 신뢰할 수 있는 정보 제공. 품종 특성, 관리 방법, 가족에게 맞는 반려견 찾기 팁 등 최신 정보를 확인하세요." />

        {/* JSON-LD Structured Data */}
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
      <MainCoverdiv>
        <Descriptionpage />
        <AnimalDaterpart initialBreedsData={initialBreedsData} />
      </MainCoverdiv>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const firestoreData = await fetchBreedsFromFirestore();
  const initialBreedsData = mergeBreedsData(firestoreData);
  return { props: { initialBreedsData } };
};

export default Home;
