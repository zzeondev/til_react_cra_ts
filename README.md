# Component TS 버전

## 1. 파일 확장자에 대해서 정리

- 파일명.js : 변수, 함수 등을 작성함
- 파일명.jsx : 컴포넌트를 즉, HTML을 리턴함 (js 로 해도 됨)
- 파일명.ts : 변수, 함수 등을 작성함
- 파일명.tsx : 컴포넌트를 즉, HTML을 리턴함
- `타입스크립트 프로젝트에 js, jsx 를 사용해도 됨`

## 2. 파일정리

- 불필요한 파일 정리

## 3. index.tsx 살펴보기

```tsx
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// as 문법은 개발자가 HTMLElement 라고 확신한다는 것을 VSCode 에 알려줌
// as 문법은 개발자가 null 이 아니라고 VSCode 에 알려줌
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
```
