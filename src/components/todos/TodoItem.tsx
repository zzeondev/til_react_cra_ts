import { TodoType } from '@/types/todoType';

type TodoItemProps = {
  todo: TodoType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  // 수정은 별도의 입력창 구성으로 수정 후 값만 업데이트 (Edit은 별도의 수정창이 있어야함)
  const handleEdit = () => {
    console.log('여기에서 내용을 수정하는 기능 작성 후 완료된 데이터 전송');
    onEdit();
  };

  // CSS 객체 만들기 (React.CSSProperties 타입 명시시 코드힌트 유용)
  const liStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    color: todo.completed ? 'gray' : 'red',
    textDecoration: todo.completed ? 'line-through' : 'none',
  };

  return (
    <li style={liStyle}>
      <input type="checkbox" onChange={() => onToggle(todo.id)} checked={todo.completed} />
      <span>{todo.title}</span>
      <button onClick={handleEdit}>수정</button>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
};

export default TodoItem;
