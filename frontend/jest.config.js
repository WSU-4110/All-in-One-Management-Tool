/** @type {import('jest').Config} */
const config = {
    verbose: true,
    collectCoverageFrom: [
      '**/*.{js,jsx}',
      '!**/node_modules/**',
      '!**/vendor/**',
    ],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    }
  };
  
module.exports = config;