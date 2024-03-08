module.exports = {
  // Other Jest configuration options...
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.base.json'
    }
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};