# Component TS 버전

## 0. 환경셋팅 문제 해결

- 프로젝트 생성하면 최신 버전을 받으므로 원할하지 않다.
- `npm install @types/react@18 @types/react-dom@18 --save-dev`
- `tsconfig.json 추가`

```json
  "compilerOptions": {
    ... ,
    "types": ["react"] // 추가
  }
```

- tsconfig.json 수업 샘플환경

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["react"]
  },
  "include": ["src"]
}
```

- 왜 React.FC에 children 이 기본으로 제공되지 않는가?
- React 버전의 문제라서 발생함. 아래는 18, 19 버전에서 오류

```tsx
// children 이 오류가 난다.
const Sample: React.FC = ({ children }) => {
  return (
    <div>
      <h2>Sample</h2>
      <div>{children}</div>
    </div>
  );
};
```

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

## 4. 컴포넌트 형식 2가지

### 4.1. 함수정의 형식

- `rfce` 탭 : React Function Component Export

```tsx
function App() {
  return <div>App</div>;
}

export default App;
```

### 4.2. 표현식 정의 형식

- `rafce` : React Arrow Function Component Expression

```tsx
const App = () => {
  return <div>App</div>;
};

export default App;
```

## 5. 컴포넌트의 리턴타입에 대한 이해(꼭 이해)

### 5.1. 리턴 타입이 `React,FC` 형태

- React.FC : React Function Component
- 알아서 `children props`을 `자동으로 포함`한다.

```tsx
import React from 'react';

const Sample: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <h2>Sample</h2>
      <div>{children}</div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <h1> App</h1>
      <Sample>
        <p>나는 Children 입니다.</p>
      </Sample>
    </div>
  );
};

export default App;
```

- 알아서 `props type`을 `자동으로 포함`한다.
- `Children 만 있는 경우`

```tsx
import React from 'react';

type SampleProps = {
  children?: React.ReactNode;
};

const Sample: React.FC<SampleProps> = ({ children }) => {
  return (
    <div>
      <h2>Sample</h2>
      <div>{children}</div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <h1> App</h1>
      <Sample>
        <p>나는 Children 입니다.</p>
      </Sample>
    </div>
  );
};

export default App;
```

- `추가 Props 가 있다면`

```tsx
import React from 'react';

type SampleProps = {
  children?: React.ReactNode;
  title: string;
};

const Sample: React.FC<SampleProps> = ({ children, title }) => {
  return (
    <div>
      <h2>Sample</h2>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <h1> App</h1>
      <Sample title="이것은 Props 중 title 입니다.">
        <p>나는 Children 입니다.</p>
      </Sample>
    </div>
  );
};

export default App;
```

### 5.2. 리턴 타입이 `React.FC` 형태

- 기본 코드

```tsx
import React from 'react';

const Sample: React.FC = () => {
  return (
    <div>
      <h2>Sample</h2>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <h1> App</h1>
      <Sample></Sample>
    </div>
  );
};

export default App;
```

- 현장에서 추천하는 형식
- JSX.Element 를 리턴한다고 `직접 명시`함

```tsx
import React, { JSX } from 'react';

const Sample: React.FC = (): JSX.Element => {
  return (
    <div>
      <h2>Sample</h2>
    </div>
  );
};

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <h1> App</h1>
      <Sample></Sample>
    </div>
  );
};

export default App;
```

- React.FC 타입은 `일반적으로 생략`한다.

```tsx
import React, { JSX } from 'react';

const Sample = (): JSX.Element => {
  return (
    <div>
      <h2>Sample</h2>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <div>
      <h1> App</h1>
      <Sample></Sample>
    </div>
  );
};

export default App;
```

- 그러나, children 에 대한 타입은 개발자가 직접 명시해야 한다.

```tsx
import { JSX } from 'react';

type SampleProps = {
  children?: React.ReactNode;
};

const Sample = ({ children }: SampleProps): JSX.Element => {
  return (
    <div>
      <h2>Sample</h2>
      <div>{children}</div>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <div>
      <h1> App</h1>
      <Sample></Sample>
    </div>
  );
};

export default App;
```

- Props 전달하는 경우도 역시 Props type 을 정의해서 전달해야 한다.

```tsx
import { JSX } from 'react';

type SampleProps = {
  children?: React.ReactNode;
  title: string;
};

const Sample = ({ children, title }: SampleProps): JSX.Element => {
  return (
    <div>
      <h2>Sample</h2>
      <div>{title}</div>
      <div>{children}</div>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <div>
      <h1> App</h1>
      <Sample title="Props 전달된 title 입니다.">
        <p>Children 입니다.</p>
      </Sample>
    </div>
  );
};

export default App;
```

- 오로지 props 들만 전달하는 경우

```tsx
type DemoProps = {
  name: string;
  age: string;
};
const Demo = ({ name, age }: DemoProps): JSX.Element => {
  return (
    <div>
      {name}이구요, {age}살입니다.
    </div>
  );
};
```
