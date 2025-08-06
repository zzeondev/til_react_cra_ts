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
