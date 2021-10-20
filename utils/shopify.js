import Client from 'shopify-buy';

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'share-box-mx.myshopify.com',
  storefrontAccessToken: 'bbc70a51f39a76e0312599533016f059'
});

export { client }