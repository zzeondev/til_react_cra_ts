# Tailwind CSS

## 1. 설치

- 안정화 버전 설치

```bash
npm i -D tailwindcss@3.4.10 postcss@8.4.38 autoprefixer@10.4.20
```

- 만약 이미 prettier 를 셋팅했다면 아래로 추가 설치 필요

```bash
npm i -D prettier@3.3.3 prettier-plugin-tailwindcss@0.6.8
```

## 2. 기본 환경 파일 자동 생성

```bash
npx tailwindcss init -p
```

### 2.1. tailwind.config.js

- Tailwind CSS 의 여러가지 옵션들을 정의함.
- Tailwind CSS 에 전역 변수 및 기능 설정
- 색상, 폰트, 다크 모드 등을 설정함.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
};
```

### 2.2. postcss.config.js

- 웹브라우저 호환성 관련한 셋팅

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 3. index.css 수정

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 프로젝트 공통 유틸(선택) */
:root {
  --app-max-w: 720px;
}

html,
body,
#root {
  height: 100%;
}

.container-app {
  @apply mx-auto max-w-[var(--app-max-w)] px-4;
}
```

## 4. 다크모드

- App.tsx

```tsx
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';
import { TodoProvider } from './context/todo/TodoProvider';

function App(): JSX.Element {
  // ts 자리
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
  };
  // tsx 자리
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <TodoProvider>
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="container-app py-6 flex items-center">
            <h1 className="flex-1 text-2xl font-bold tracking-tighter ">할일 앱 서비스</h1>
            <button
              onClick={toggleDark}
              className="rounded-md bg-black px-3 py-1 text-white hover:opacity-90 text-sm dark:bg-white dark:text-black"
            >
              <span className="inline dark:hidden">다크모드</span>
              <span className="hidden dark:inline">라이트모드</span>
            </button>
          </div>
        </header>
        <main className="container-app py-8">
          <div className="space-y-6 rounded-xl2 bg-white p-6 shadow-card dark:bg-neutral-800">
            <TodoWrite />
            <TodoList />
          </div>
        </main>
        <footer className="container-app py-8 text-sm text-neutral-500 dark:text-neutral-400">
          할일 앱 서비스 개발 @ 홍길동
        </footer>
      </TodoProvider>
    </div>
  );
}

export default App;
```

- TodoWrite.tsx

```tsx
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TodoType } from '../../types/todoType';
import { useTodoActions } from '../../context/todo/hooks';

const TodoWrite = () => {
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
```

- TodoItem.tsx

```tsx
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
```

-TodoList.tsx

```tsx
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
```

## 5. 테마 여러개 적용해 보기

- index.cee

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --app-max-w: 720px;
}

html,
body,
#root {
  height: 100%;
}

.container-app {
  @apply max-w-[var(--app-max-w)] mx-auto px-4;
}

/* ------------- 테마 변수 ------------- */
/* Light (기본) */
:root {
  --bg: 0 0% 98%;
  --fg: 222 47% 11%;
  --surface: 0 0% 100%;
  --border: 220 13% 91%;
  --primary: 245 83% 60%; /* 보라 */
  --primary-fg: 0 0% 100%;
}

/* Dark */
.theme-dark {
  --bg: 222 47% 7%;
  --fg: 210 40% 96%;
  --surface: 222 47% 11%;
  --border: 217 19% 27%;
  --primary: 245 83% 60%;
  --primary-fg: 0 0% 100%;
}

/* Ocean */
.theme-ocean {
  --bg: 200 60% 97%;
  --fg: 210 24% 20%;
  --surface: 200 50% 99%;
  --border: 206 15% 85%;
  --primary: 200 90% 45%; /* 파랑 */
  --primary-fg: 0 0% 100%;
}

/* High Contrast */
.theme-hc {
  --bg: 0 0% 100%;
  --fg: 0 0% 0%;
  --surface: 0 0% 100%;
  --border: 0 0% 0%;
  --primary: 62 100% 50%; /* 노랑 */
  --primary-fg: 0 0% 0%;
}
```

- 속성참조하기

```css
.theme-테마명 {
  --bg: 배경색;
  --fg: 글자색;
  --surface: 카드 영역 배경;
  --border: 테두리 색;
  --primary: 중요한 색;
  --primary-fg: 중요한 글자색;
}
```

- tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // CSS 변수(HSL 값) 연결
        bg: 'hsl(var(--bg))',
        fg: 'hsl(var(--fg))',
        surface: 'hsl(var(--surface))',
        borderc: 'hsl(var(--border))',
        primary: 'hsl(var(--primary))',
        'primary-fg': 'hsl(var(--primary-fg))',
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
};
```

- App.tsx

```tsx
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';
import { TodoProvider } from './context/todo/TodoProvider';

// 여러 개의 테마 적용하기
function setTheme(themeName: string) {
  const root = document.documentElement;
  root.classList.remove('theme-dark', 'theme-ocean', 'theme-hc');
  if (themeName == 'light') {
    // root.classList.add('theme-light');
  }
  if (themeName == 'dark') {
    root.classList.add('theme-dark');
  }
  if (themeName == 'ocean') {
    root.classList.add('theme-ocean');
  }
  if (themeName == 'hc') {
    root.classList.add('theme-hc');
  }
}

function App(): JSX.Element {
  // ts 자리
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
  };
  // tsx 자리
  return (
    <div className="bg-bg text-fg min-h-screen">
      <TodoProvider>
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="container-app flex items-center py-6">
            <h1 className="flex-1 text-2xl font-bold tracking-tighter">할일 앱 서비스</h1>
            <button
              onClick={toggleDark}
              className="rounded-md bg-black px-3 py-1 text-sm text-white hover:opacity-90 dark:bg-white dark:text-black"
            >
              <span className="inline dark:hidden">다크모드</span>
              <span className="hidden dark:inline">라이트모드</span>
            </button>
          </div>
        </header>
        <div className="container-app py-8">
          {/* 여러개 테마 토글 버튼 */}
          <button
            className="rounded border border-borderc px-3 py-1"
            onClick={() => setTheme('light')}
          >
            Light
          </button>
          <button
            className="rounded border border-borderc px-3 py-1"
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
          <button
            className="rounded border border-borderc px-3 py-1"
            onClick={() => setTheme('ocean')}
          >
            Ocean
          </button>
          <button
            className="rounded border border-borderc px-3 py-1"
            onClick={() => setTheme('hc')}
          >
            High Contrast
          </button>
        </div>
        <main className="container-app py-8">
          <div className="space-y-6 rounded-xl2 bg-white p-6 shadow-card dark:bg-neutral-800">
            <TodoWrite />
            <TodoList />
          </div>
        </main>
        <footer className="container-app py-8 text-sm text-neutral-500 dark:text-neutral-400">
          할일 앱 서비스 개발 @ 홍길동
        </footer>
      </TodoProvider>
    </div>
  );
}

export default App;
```
