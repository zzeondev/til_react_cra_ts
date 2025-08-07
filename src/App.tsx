import Counter from './components/Counter';
import NameEditor from './components/NameEditor';
import ToggleSwitch from './components/ToggleSwitch';
import User from './components/User';

function App(): JSX.Element {
  return (
    <div>
      <h1>useState 예제</h1>
      <Counter />
      <NameEditor />
      <ToggleSwitch />
      <User />
    </div>
  );
}

export default App;
