import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TodoType } from '../../types/todoType';
import { useTodoActions } from '../../context/todo/hooks';
import { useNavigate } from 'react-router-dom';

const TodoWrite = () => {
  const navigate = useNavigate();
  // js 자리
  const { addTodo } = useTodoActions();
  // 할일 제목 값 관리
  const [title, setTitle] = useState<string>('');
  // title 변경시 onChange 이벤트 처리해보기
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // enter 키를 입력시 처리
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  // 새 할일 등록하기
  const handleAdd = () => {
    if (title.trim()) {
      const newTodo: TodoType = {
        id: Date.now().toString(),
        title: title,
        completed: false,
      };
      addTodo(newTodo);
      setTitle('');
      navigate('/todos/read');
    }
  };

  // jsx 자리
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={title}
        onChange={e => handleChange(e)}
        onKeyDown={handleKeyDown}
        className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand dark:border-neutral-700 dark:bg-neutral-900"
      />
      <button
        onClick={handleAdd}
        className="rounded-lg bg-brand px-2 px-y py-2 text-white hover:opacity-90 active:opacity-80"
      >
        등록
      </button>
    </div>
  );
};

export default TodoWrite;
