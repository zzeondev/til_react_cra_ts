import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';

// 공통으로 사용하는 type 정의 및 interface 는 별도의 폴더에 보관하자.
import { ITodoType, TodoType } from './types/todoType';

// 테스트를 위한 목업 데이터 (/src/api/dummy.ts 추천)
const initialTodos: TodoType[] = [
  { id: 'a', title: '제목 1 입니다.', completed: false },
  { id: 'b', title: '제목 2 입니다.', completed: true },
  { id: 'c', title: '제목 3 입니다.', completed: false },
  { id: 'd', title: '제목 4 입니다.', completed: true },
  { id: 'e', title: '제목 5 입니다.', completed: false },
];

function App(): JSX.Element {
  // ts 자리
  // {id: "", title:"", completed:false}
  const [todos, setTodos] = useState<(TodoType | ITodoType)[]>(initialTodos);

  // todos 를 업데이트 하는 함수
  const handleTodoUpdate = (): void => {
    // setTodos(??)
  };

  // todo 목록에서 실행할 함수들
  const onToggle = (id: string): void => {
    console.log(`onToggle : `, id);
    // 전달 받은 ID 를 이용해 map으로 찾아서 completed 변경
    const arr: TodoType[] = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(arr);
  };
  const onDelete = (id: string): void => {
    console.log(`onDelete :`, id);
    // 전달 받은 ID 를 제외한 나머지만 모아서 목록 변경
    const arr: TodoType[] = todos.filter(todo => todo.id !== id);
    setTodos(arr);
  };

  const onEdit = (): void => {
    console.log(`onEdit`);
  };

  // tsx 자리
  return (
    <div>
      <h1>할일 앱서비스</h1>
      <div>
        <TodoWrite setTodos={setTodos} handleTodoUpdate={handleTodoUpdate} />
        <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;
