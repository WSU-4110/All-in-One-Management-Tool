/** @type {import('jest').Config} */
const config = {
    collectCoverageFrom: [
      '**/*.{js,jsx}',
      '!**/node_modules/**',
      '!**/vendor/**',
    ],
    // "transform": {
    //     ".+\\.(css|styl|less|sass|scss)$": "C:/Users/omara/OneDrive/Documents/GitHub/Winter2024/Software Engineering/All-in-One-Management-Tool/frontend/node_modules/jest-css-modules-transform",
    // }
  };
  
module.exports = config;