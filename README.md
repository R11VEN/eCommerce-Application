# High Voltage

## About the project

High Voltage - technical website-catalogue aimed at supporting consumers of relay protection. The project is built on the commercetools - is a cloud-based commerce platform that provides APIs to power e-commerce sales and similar functions for large businesses.

![TypeScrypt](https://img.shields.io/badge/TypeScrypt-blue) ![React](https://img.shields.io/badge/React-lightblue) ![Vite](https://img.shields.io/badge/Vite-violet) ![ESLint](https://img.shields.io/badge/ESLint-darkviolet) ![Jest](https://img.shields.io/badge/Jest-green) ![Husky](https://img.shields.io/badge/Husky-orange)

## Getting Started

1. Clone the project repository.
2. Switch to develop branch.
3. Execute in terminal `npm run install` to install dependencies.
4. Execute in terminal `npm run dev` to start a local web server.
5. Description of all scripts of the project is in the readme.

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

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

### Expanding the Jest configuration

These instructions will get you setup to use Jest in your project.

- `npm i -D jest`
- `npm i -D ts-jest` - is a TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.
- `npm i -D @types/jest` - it provides types for Jest globals without a need to import them.
- `npx ts-jest config:init`
- `npm i -D @testing-library/react` - React DOM testing utilities.
- `npm i -D jest-environment-jsdom` - to get started with the JSDOM test environment.
- Replace `testEnvironment: 'node'` to `testEnvironment: 'jsdom'` in jest.config.
- add `'test": "jest'` to the scripts section in the package.json.
- add `'esModuleInterop': true` in the tsconfig.json if you have problems with imports.

### What scripts are in the project and how to run them

- `npm run dev` - start Vite development server.
  Shortcuts
  press r to restart the server
  press u to show server url
  press o to open in browser
  press c to clear console
  press q to quit
- `npm run build` - run project build. The built project can be found in the `./dist` folder.
- `npm run lint` - run eslint on the whole project.
- `npm run lint:fix` - run eslint run linter with auto-fix option --fix.
- `npm run preview` - start a local web server that serves the built solution from `./dist` for previewing.
- `npm run prettier` - format all files with Prettier
- `npm run format:check` - checks that files are already formatted.
- `npm run format:fix` - format all files with Prettier.
- `npm run validate` - format all files with Prettier except for files placed in .gitignore and .prettierignore.
- `npm run prepare` - run Husky - install Git hooks.
- `npm run test` - run the test suite from the `./__tests__` folder. The code coverage report can be found in the `./coverage` folder. To view, you need to open index.html.
