import { TodoType } from '../../types/todoType';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: TodoType[];
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps): JSX.Element => {
  return (
    <div>
      <h2>할일목록</h2>
      <TodoItem onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
};

export default TodoList;
