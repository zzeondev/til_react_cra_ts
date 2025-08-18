import { NavLink, useParams } from 'react-router-dom';
import { useTodoActions, useTodoState } from '../context/todo/hooks';

function TodoDetailPage() {
  // http://localhost:3000/todos/id
  const { id } = useParams<{ id: string }>();
  // 전체 todos State 를 가져오겠다.
  const { todos } = useTodoState();
  const { toggleTodo } = useTodoActions();
  // id 를 이용해서 해당 상세 내용 가져오기
  const result = todos.find(item => item.id === id);

  if (!id) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">잘못된 id 요청입니다.</h2>
          <NavLink
            to="/todos/read"
            className="rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            목록으로
          </NavLink>
        </div>
      </section>
    );
  }
  if (!result) {
    return (
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">내용을 찾을 수 없습니다.</h2>
          <NavLink
            to="/todos/read"
            className="rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            목록으로
          </NavLink>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">할일 상세</h2>
        <div className="flex items-center gap-2">
          <NavLink
            to={`/todos/${result.id}/edit`}
            className="rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            수정
          </NavLink>
          <NavLink
            to={'/todos/read'}
            className="rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            목록
          </NavLink>
        </div>
      </div>
      <div className="space-y-4 rounded-xl bg-white p-6 shadow-card dark:bg-neutral-800">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-neutral-500">ID</div>
            <div className="font-mono text-neutral-700 dark:text-neutral-300">{result.id}</div>
          </div>
          <div>
            <span
              className={[
                'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                result.completed
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
              ].join(' ')}
            >
              {result.completed ? '완료' : '진행중'}
            </span>
          </div>
          <div>
            <div className="mb-1 text-sm text-neutral-500">제목</div>
            <div className="text-lg font-medium">{result.title}</div>
          </div>
          <div className="pt-2">
            <button
              onClick={() => toggleTodo(result.id)}
              className="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              {result.completed ? '완료 취소' : '완료로 표시'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TodoDetailPage;
