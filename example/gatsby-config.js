require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Blog',
    description: 'My blog.',
    siteUrl: 'https://example.com/',
  },
  plugins: [
    {
      resolve: require.resolve('../gatsby-node'),
      options: {
        apiKey: process.env.MICROCMS_API_KEY,
        serviceId: process.env.MICROCMS_SERVICE_ID,
        endpoint: 'posts',
        query: {
          limit: 100,
          fields: [
            'id',
            'postsId',
            'title',
            'body',
            'createdAt',
            'updatedAt',
          ].join(','),
        },
      },
    },
    {
      resolve: require.resolve('../gatsby-node'),
      options: {
        apiKey: process.env.MICROCMS_API_KEY,
        serviceId: process.env.MICROCMS_SERVICE_ID,
        endpoint: 'object-content',
        format: 'object',
        type: 'single',
      },
    },
  ],
};
