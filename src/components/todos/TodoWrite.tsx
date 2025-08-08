import { TodoType } from '../../types/todoType';
import TodoItem from './TodoItem';

type TodoWriteProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  handleTodoUpdate: () => void;
};

const TodoWrite = ({ setTodos, handleTodoUpdate }: TodoWriteProps) => {
  return (
    <div>
      <h2>할일목록</h2>
    </div>
  );
};

export default TodoWrite;
