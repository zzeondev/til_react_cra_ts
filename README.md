# React 18 / TypeScript / ESLint 8 / Prettier 셋팅

## 1. CRA / TypeScript / React 18 프로젝트 생성

- 프로젝트 생성

```bash
npx create-react-app 프로젝트명소문자 --template typescript
npx create-react-app . --template typescript
```

- 18 버전으로 마이그레이션

```bash
npm install react@18.2.0 react-dom@18.2.0
```

## 2. ESLint/ Prettier 호환 패키지 설치

```bash
npm install -D \
eslint@8.56.0 \
@typescript-eslint/eslint-plugin@5.62.0 \
@typescript-eslint/parser@5.62.0 \
eslint-plugin-react@7.33.2 \
eslint-plugin-react-hooks@4.6.0 \
eslint-plugin-jsx-a11y@6.7.1 \
eslint-plugin-prettier@5.1.3 \
eslint-config-prettier@9.1.0 \
prettier@3.2.5
```

## 3. `.eslintrc.json` 파일 생성

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": { "jsx": true }
  },
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "plugins": ["react", "react-hooks", "jsx-a11y", "@typescript-eslint", "prettier"],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "warn",
    "@typescript-eslint/no-unused-vars": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

## 4. Prettier 설정 파일

- `.prettierrc` 파일 생성

```
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "avoid"
}
```

## 5. ESLint 검사에서 제외할 부분 설정(선택사항)

- `.eslintignore`

```
node_modules
build
dist
```

## 6. VSCode 환경설정

- `.vscode` 폴더 생성
- `settings.json` 파일 생성

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

## 7. `package.json` 에 Lint 검사 실행 스크립트(선택사항)

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint \"src/**/*.{ts,tsx}\"",
    "lint:fix": "eslint \"src/**/*.{ts,tsx}\" --fix"
  },
```

## 8. 테스트 코드 확인

- App.tsx

```tsx
function App() {
  const unused = 1;

  return <button tabIndex="0">App</button>;
}

export default App;
```

- 해결코드

```tsx
function App() {
  const unused = 1;

  return <button tabIndex={0}>App</button>;
}

export default App;
```

## 9. ESLint 오류 자동 고침(제한적)

```bash
npx eslint src --ext .tsx --fix
```
