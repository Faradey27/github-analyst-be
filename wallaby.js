module.exports = (wallaby) => ({
  files: [
    'src/**/*.json',
    'src/**/*.env',
    './.env.example',
    { pattern: 'jest.config.json', instrument: false },
    { pattern: 'tsconfig.json', instrument: false },
    { pattern: '__test__/jest-setup.ts', instrument: false },
    { pattern: 'src/**/*.spec.ts', ignore: true },
    { pattern: '__test__/**/*.spec.ts', ignore: true },
    'src/**/*.ts',
    'src/**/*.d.ts',
    'src/**/*.json',
    '__test__/**/*.ts'
  ],

  filesWithNoCoverageCalculated: [],

  hints: {
    ignoreCoverage: /istanbul ignore next/,
  },

  tests: [
    { pattern: 'node_modules/*', ignore: true, instrument: false },
    'src/**/*.spec.ts',
    '__test__/**/*.spec.ts',
  ],

  setup: (target) => {
    const jestConfig = require('./jest.config');
    target.testFramework.configure(Object.assign({}, jestConfig));
  },

  env: {
    type: 'node',
    runner: "node"
  },

  workers: {
    initial: 1,
    regular: 1,
    recycle: true,
  },

  testFramework: 'jest',
});
