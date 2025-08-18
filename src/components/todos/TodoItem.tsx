import { Link } from 'react-router-dom';
import { useTodoActions } from '../../context/todo/hooks';
import { TodoType } from '../../types/todoType';

type TodoItemProps = {
  todo: TodoType;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  // js 자리
  const { toggleTodo, deleteTodo, editTodo } = useTodoActions();

  return (
    <li
      className={['flex items-center justify-between gap-2 rounded-lg border px-3 py-2'].join(' ')}
    >
      <div className="flex w-full items-center gap-3">
        <input
          type="checkbox"
          onChange={() => toggleTodo(todo.id)}
          checked={todo.completed}
          className="h-4 w-4 accent-brand "
        />
        <Link
          to={`/todos/${todo.id}`}
          className={[
            'flex-1',
            todo.completed
              ? 'text-neutral-400 line-through'
              : 'text-neutral-900 dark:text-neutral-100',
          ].join(' ')}
        >
          {todo.title}
        </Link>
        <div className="flex items-center gap-2">
          <Link
            to={`/todos/${todo.id}/edit`}
            className="rounded-md border border-neutral-300 px-3 py-1 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            수정
          </Link>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="rounded-md border border-red-300 px-3 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            삭제
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
