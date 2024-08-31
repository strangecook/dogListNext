/** @type {import('next-sitemap').IConfig} */
const fetchBreedsFromFirestore = require('./dataFetch/fetchAndStoreBreeds').fetchBreedsFromFirestore;

module.exports = {
  siteUrl: 'https://www.doglist.info',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
  additionalPaths: async (config) => {
    const breedPaths = await generateBreedPaths();
    return breedPaths;
  },
};

// Fetch or generate breed paths
async function generateBreedPaths() {
  const breeds = await fetchBreedsFromFirestore(); // Firestore에서 데이터 가져오기

  return breeds.map(breed => ({
    loc: `/breeds/${breed.englishName.toLowerCase()}`,
    changefreq: 'daily',
    priority: 0.7,
    lastmod: new Date().toISOString(),
  }));
}
