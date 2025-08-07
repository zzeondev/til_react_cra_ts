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
