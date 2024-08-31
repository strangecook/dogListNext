const { fetchBreedsFromFirestore } = require('./dataFetch/fetchBreedsSitemap');

/** @type {import('next-sitemap').IConfig} */
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
    try {
      const firestoreData = await fetchBreedsFromFirestore();
      const breedPaths = firestoreData.map(breed => ({
        loc: `/breeds/${breed.englishName.toLowerCase()}`,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }));

      return breedPaths;
    } catch (error) {
      console.error('Error generating additional paths for sitemap:', error);
      return [];
    }
  },
};
