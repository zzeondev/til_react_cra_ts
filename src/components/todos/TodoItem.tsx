import { useTodoActions } from '../../context/todo/hooks';
import { KeyboardEvent, useState } from 'react';
import { TodoType } from '../../types/todoType';

type TodoItemProps = {
  todo: TodoType;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  // js 자리
  const { toggleTodo, deleteTodo, editTodo } = useTodoActions();

  // 현재 Edit 상태인지 아닌지 관리
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // Edit 상태라면 입력중인 title 내용 관리
  const [editTitle, setEditTitle] = useState<string>(todo.title);

  // 수정은 별도의 입력창 구성으로 수정 후 값 만 업데이트
  const handleEdit = () => {
    // console.log('여기에서 내용을 수정하는 기능 작성 후 완료된 데이터 전송');
    // isEdit 을 true 로 변경
    setIsEdit(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
      handleEditSave();
    }
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  // 수정 후 저장 기능
  const handleEditSave = () => {
    // console.log('수정완료 저장');
    // 1. 업데이트 해줌
    if (editTitle.trim()) {
      // 변경되어야 할 ID, 새로운 타이틀 전달
      editTodo(todo.id, editTitle);
      // 2. 상태는 isEdit 을 false 로 변경
      setIsEdit(false);
    }
  };

  // 수정 취소 기능
  const handleEditCancel = () => {
    // 1. editTitle 을 원래대로 돌리고
    setEditTitle(todo.title);
    // 2. isEdit 을 false 로 설정하고
    setIsEdit(false);
  };

  return (
    <li
      className={['flex items-center justify-between gap-2 rounded-lg border px-3 py-2'].join(' ')}
    >
      {isEdit ? (
        <div className="flex w-full items-center gap-2">
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-md border border-neutral-300 bg-white px-2 py-1 outline-none focus:ring-brand dark:border-neutral-700 dark:bg-neutral-900"
          />
          <button
            onClick={handleEditSave}
            className="rounded-md bg-brand px-3 py-1 text-white hover:opacity-90"
          >
            저장
          </button>
          <button
            onClick={handleEditCancel}
            className="rounded-md border border-neutral-300 px-2 py-1 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            취소
          </button>
        </div>
      ) : (
        <div className="flex w-full items-center gap-3">
          <input
            type="checkbox"
            onChange={() => toggleTodo(todo.id)}
            checked={todo.completed}
            className="h-4 w-4 accent-brand "
          />
          <span
            className={[
              'flex-1',
              todo.completed
                ? 'text-neutral-400 line-through'
                : 'text-neutral-900 dark:text-neutral-100',
            ].join(' ')}
          >
            {todo.title}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="rounded-md border border-neutral-300 px-3 py-1 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              수정
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="rounded-md border border-red-300 px-3 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;
