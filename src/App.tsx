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
