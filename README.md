# gatsby-source-microcms

[![npm version](https://img.shields.io/npm/v/gatsby-source-microcms.svg)](https://www.npmjs.com/package/gatsby-source-microcms)
[![install size](https://packagephobia.now.sh/badge?p=gatsby-source-microcms)](https://packagephobia.now.sh/result?p=gatsby-source-microcms)
[![Actions Status](https://github.com/shooontan/gatsby-source-microcms/workflows/CI/badge.svg)](https://github.com/shooontan/gatsby-source-microcms/actions)

Source plugin for Gatsby from [microCMS](https://microcms.io/).

## Install

```sh
# npm
$ npm install gatsby-source-microcms

# or yarn
$ yarn add gatsby-source-microcms
```

## How to use

### gatsby-config.js

First, to fetch contents from microCMS, you need setting options in `gatsby-config.js`.

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: 'MICROCMS_API_KEY',
        serviceId: 'myblog',
        endpoint: 'posts',
      },
    },
  ],
};
```

### gatsby-node.js

You can query like the following. Gatsby create Pages based on microCMS contents.

```js
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMicrocmsPost(sort: { fields: [createdAt], order: DESC }) {
          edges {
            node {
              id
              createdAt
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  result.data.allMicrocmsPost.edges.forEach((post, index) => {
    createPage({
      path: post.node.id,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: post.node.id,
      },
    });
  });
};
```

### Options

```js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-microcms',
      options: {
        /**
         * The authentication key required for API requests. (Required)
         *
         * Type: string.
         **/
        apiKey: '11111111-2222-3333-4444-555555555555',

        /**
         * Subdomain information. (Required)
         * xxxx.microcms.io
         *
         * Type: string.
         **/
        serviceId: 'xxxx',

        /**
         * API endpoint name. (Required)
         * https://xxxx.microcms.io/api/v1/posts
         *
         * Type: string.
         **/
        endpoint: 'posts',

        /**
         * Graphql type. (Optional)
         * This is used in GraphQL queries.
         * If type = 'post', the GraphQL types are named 'microcmsPost' and 'allMicrocmsPost'.
         *
         * Type: string.
         * Default: endpoint value.
         **/
        type: 'post',

        /**
         * microCMS's content type('list' or 'object'). (Optional)
         *
         * Type: string.
         * Default: 'list'.
         **/
        format: 'object',

        /**
         * API request query options. (Optional)
         *
         * Type:
         *   limit: number.
         *   offset: number.
         *   fields: string.
         * Default: {}.
         **/
        query: {
          limit: 100,
          offset: 40,
          fields: ['id', 'title', 'body'].join(',')
        }
      },
    },
  ],
};
```
