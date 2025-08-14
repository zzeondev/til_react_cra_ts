import { useTodoState } from '../../context/todo/hooks';
import TodoItem from './TodoItem';

const TodoList = (): JSX.Element => {
  const { todos } = useTodoState();
  return (
    <div>
      <h2 className="text-xl font-semibold">할일목록</h2>
      {todos.length === 0 ? (
        <p className="mt-3 text-neutral-500">목록이 없습니다.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {todos.map(item => (
            <TodoItem key={item.id} todo={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
