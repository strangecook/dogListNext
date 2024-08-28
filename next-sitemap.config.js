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
  }
  