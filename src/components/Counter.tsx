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
