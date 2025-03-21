// next.config.js
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
  async headers() {
    return [
      {
        source: '/api/upload',
        headers: [
          {
            key: 'Connection',
            value: 'keep-alive',
          },
        ],
      },
    ];
  },
};