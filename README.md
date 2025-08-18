# react-router-dom

## 1. 설치

- vercel 에서는 v7.0 최신 버전 오류
- 설치는 v6 를 설치하자

```bash
npm i react-router-dom@6.30.1
```

## 2. 폴더 및 페이지 구성

- /src/pages 폴더 생성

### 2.1. Home.tsx

### 2.2. TodoReadPage.tsx

```tsx
import TodoList from '../components/todos/TodoList';
import { NavLink } from 'react-router-dom';

function TodoReadPage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">할일 목록</h2>
        <NavLink
          to={'/todos/write'}
          className="rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          새 할일 작성
        </NavLink>
      </div>
      <div className="space-y-6 rounded-xl2 bg-white p-6 shadow-card dark:bg-neutral-800">
        <TodoList />
      </div>
    </section>
  );
}

export default TodoReadPage;
```

### 2.3. TodoWritePage.tsx

```tsx
import TodoWrite from '../components/todos/TodoWrite';
import { NavLink } from 'react-router-dom';

function TodoWritePage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">할일 작성</h2>
        <NavLink
          to={'/todos/read'}
          className="rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          목록
        </NavLink>
      </div>
      <div className="space-y-6 rounded-xl2 bg-white p-6 shadow-card dark:bg-neutral-800">
        <TodoWrite />
      </div>
    </section>
  );
}

export default TodoWritePage;
```

### 2.4. TodoEditPage.tsx

```tsx
import { useEffect, useState } from 'react';
import { useTodoActions, useTodoState } from '../context/todo/hooks';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

function TodoEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { todos } = useTodoState();
  const { editTodo } = useTodoActions();
  const result = todos.find(item => item.id === id);
  // 편집 중인 타이틀 보관 state
  const [title, setTitle] = useState<string>('');
  useEffect(() => {
    if (result) {
      setTitle(result.title);
    }
  }, [result]);

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

  const handleSave = () => {
    const trim = title.trim();
    if (!trim) return;
    editTodo(result.id, title);
    navigate('/todos/read');
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2>할일 수정</h2>
        <NavLink
          to="/todos/read"
          className="rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          목록
        </NavLink>
      </div>
      <div className="space-y-4 rounded-xl2 bg-white p-6 shadow-card dark:bg-neutral-800">
        <label htmlFor="title" className="block text-sm text-neutral-600 dark:text-neutral-300">
          제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand dark:border-neutral-700 dark:bg-neutral-900"
        />
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleSave}
            className="rounded-md bg-brand px-4 py-2 text-white hover:opacity-90"
          >
            저장
          </button>
          <NavLink
            to={'/todos/read'}
            className="rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
          >
            취소
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default TodoEditPage;
```

### 2.5. TodoDetailPage.tsx

```tsx
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
```

### 2.6. NotFound.tsx

### 2.7. Settings.tsx

### 3. 컴포넌트 수정

- /src/components/todo/TodoItem.tsx

```tsx
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
```

## 4. 라우터 구성

- App.tsx 적용
- 기본구성

```tsx
<Router>
  <Routes>
    <Route></Route>
  </Routes>
</Router>
```

```tsx
import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { TodoProvider } from './context/todo/TodoProvider';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import TodoEditPage from './pages/TodoEditPage';
import TodoReadPage from './pages/TodoReadPage';
import TodoWritePage from './pages/TodoWritePage';
import TodoDetailPage from './pages/TodoDetailPage';

function App(): JSX.Element {
  // ts 자리
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
  };
  // tsx 자리
  return (
    <div className="bg-bg text-fg min-h-screen">
      <TodoProvider>
        <Router>
          {/* 상단메뉴 */}
          <header className="border-b border-neutral-200 dark:border-neutral-800">
            <div className="container-app flex items-center  gap-4 py-6">
              <h1 className="flex-1 text-2xl font-bold tracking-tighter">할일 앱 서비스</h1>
              <nav className="flex items-center gap-2 text-sm">
                <NavLink to="/">홈</NavLink>
                <NavLink to="/todos/read">읽기</NavLink>
                <NavLink to="/todos/write">생성</NavLink>
                <NavLink to="/settings">설정</NavLink>
              </nav>
              <button
                onClick={toggleDark}
                className="rounded-md bg-black px-3 py-1 text-sm text-white hover:opacity-90 dark:bg-white dark:text-black"
              >
                <span className="inline dark:hidden">다크모드</span>
                <span className="hidden dark:inline">라이트모드</span>
              </button>
            </div>
          </header>
          <main className="container-app py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* todos 관련 route ----*/}
              <Route path="/todos" element={<TodoReadPage />} />
              <Route path="/todos/read" element={<TodoReadPage />} />
              <Route path="/todos/write" element={<TodoWritePage />} />
              <Route path="/todos/:id" element={<TodoDetailPage />} />
              <Route path="/todos/:id/edit" element={<TodoEditPage />} />
              {/* todos 관련 route ---- */}
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="container-app py-8 text-sm text-neutral-500 dark:text-neutral-400">
            할일 앱 서비스 개발 @ 홍길동
          </footer>
        </Router>
      </TodoProvider>
    </div>
  );
}

export default App;
```
