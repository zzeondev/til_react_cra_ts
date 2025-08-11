# useState

- 리액트용 변수이다. (수업편의)
- set으로 값을 변화시키면 리랜더링을 한다.

## 0. `@` 으로 절대경로 설정하기

- tsconfig.json

```json
"baseUrl": "src", // 프로젝트의 기본 경로
"paths": {
"@/_": ["_"], // @/ 로 src 폴더 전체를 참조
"@types/_": ["types/_"] // @types 로 src/types 참조
},
```

## 1. 기본 예제

- /src/components 폴더 생성
- /src/components/Counter.tsx 파일 생성

```tsx
import { useState } from 'react';

// 2번 이상 반복되고, 가독성이 떨어집니다.
// 1. type 으로 정의해 보자
type VoidFunciton = () => void;
type JSXElement = () => JSX.Element;

// 2. interface 로 정의해 보자
interface IVoidFunction {
  (): void;
}
interface IJSXElement {
  (): JSX.Element;
}

const Counter: IJSXElement | JSXElement = () => {
  // ts 자리
  const [count, setCount] = useState<number>(0);
  const handleAdd: IVoidFunction | VoidFunciton = () => {
    setCount(count + 1);
  };
  const handleMinus: IVoidFunction | VoidFunciton = () => {
    setCount(count - 1);
  };
  const handleReset: IVoidFunction | VoidFunciton = () => {
    setCount(0);
  };

  // tsx 자리
  return (
    <div>
      <h2>Counte : {count}</h2>
      <button onClick={handleAdd}>증가</button>
      <button onClick={handleMinus}>감소</button>
      <button onClick={handleReset}>초기화</button>
    </div>
  );
};

export default Counter;
```

## 2. 실습 예제 1

- /src/components/NameEditor.tsx 파일 생성

```tsx
import { ChangeEvent, MouseEvent, useState } from 'react';

// 1. type 으로 함수 리턴형을 생성해보자
type JSXElenemt = () => JSX.Element;
type ChangeEventInput = (e: ChangeEvent<HTMLInputElement>) => void;
type ClickEventButton = (e: MouseEvent<HTMLButtonElement>) => void;
type NameType = string;

// 2. interface 로 정의하기
interface IJSXElement {
  (): JSX.Element;
}
interface IChangeEventInput {
  (e: ChangeEvent<HTMLInputElement>): void;
}
interface IClickEventButton {
  (e: MouseEvent<HTMLButtonElement>): void;
}

const NameEditor: JSXElenemt | IJSXElement = () => {
  // ts 자리
  const [name, setName] = useState<NameType>('');
  const handleName: ChangeEventInput | IChangeEventInput = (e): void => {
    setName(e.target.value);
  };
  const handleClick: ClickEventButton | IClickEventButton = (e): void => {
    console.log('클릭');
    setName('');
  };

  //tsx 자리
  return (
    <div>
      <h2>NameEditor : {name} </h2>
      <div>
        <input type="text" value={name} onChange={e => handleName(e)} />
        <button onClick={e => handleClick(e)}>확인</button>
      </div>
    </div>
  );
};

export default NameEditor;
```

## 3. 실습 예제 2

- /src/components/ToggleSwitch.tsx

```tsx
import { useState } from 'react';

// 1. type
type JSXElement = () => JSX.Element;
type ClickType = () => void;

// 2. ingerface
interface IJSXElement {
  (): JSX.Element;
}
interface IClickType {
  (): void;
}

const ToggleSwitch: JSXElement | IJSXElement = () => {
  // ts 자리
  const [isOn, setIsOn] = useState<boolean>(false);
  const handleClick: ClickType | IClickType = () => {
    setIsOn(!isOn);
  };

  // tsx 자리
  return (
    <div>
      <h2>ToggleSwitch : {isOn ? '밝아요' : '어두워요'}</h2>
      <div>
        <button onClick={handleClick}>토글</button>
      </div>
    </div>
  );
};

export default ToggleSwitch;
```

## 4. 실습 예제 3

- /src/components/User.tsx

```tsx
import { useState } from 'react';

// 1. type
type UserType = { age: number; name: string };
type ClickType = () => void;

// 2. interface
interface IUser {
  age: number;
  name: string;
}
interface IClik {
  (): void;
}

const User = (): JSX.Element => {
  // ts 자리
  const [user, setUser] = useState<UserType | IUser>({ name: '아이유', age: 20 });
  const handleClick: ClickType | IClik = () => {
    setUser({ ...user, age: user.age + 1 });
  };

  // tsx 자리
  return (
    <div>
      <h2>
        User : {user.name}님 나이는 {user.age} 입니다.
      </h2>
      <div>
        <button onClick={handleClick}>나이 증가</button>
      </div>
    </div>
  );
};

export default User;
```

## 5. 실습 예제 4 (useState 버전 Todo)

- 타입정의를 위한 폴더 : /src/types 폴더 생성
  - todoType.ts 파일 생성
- 글쓰기 : /src/todos/TodoWrite.tsx
  - 입력창, 등록버튼

- 글목록 : /src/todos/TodoList.tsx

- 글한개의 아이템 : /src/todos/TodoItem.tsx
  - 아이디, 제목, 완료여부, 수정버튼, 삭제버튼
  - 상태 2가지 : 목록상태, 편집상태
