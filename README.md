# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Expanding the Jest configuration

These instructions will get you setup to use Jest in your project.

 - `npm i -D jest`
 - `npm i -D ts-jest` - is a TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.
 - `npm i -D @types/jest` - it provides types for Jest globals without a need to import them
 - `npx ts-jest config:init`
 - `npm i -D @testing-library/react` - React DOM testing utilities
 - `npm i -D jest-environment-jsdom` - to get started with the JSDOM test environment
 - Replace `testEnvironment: 'node'` to `testEnvironment: 'jsdom'` in jest.config
 - add `'test": "jest'` to the scripts section in the package.json
 - add `'esModuleInterop': true` in the tsconfig.json if you have problems with imports