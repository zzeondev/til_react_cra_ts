import { useTodoState } from '../../context/todo/hooks';
import TodoItem from './TodoItem';

const TodoList = (): JSX.Element => {
  const { todos } = useTodoState();
  return (
    <div>
      <h2>할일목록</h2>
      {todos.length === 0 ? (
        <p>목록이 없습니다.</p>
      ) : (
        <ul>
          {todos.map(item => (
            <TodoItem key={item.id} todo={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
