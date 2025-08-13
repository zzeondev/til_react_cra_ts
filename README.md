# Context API

## 1. 목적

- props 로 전달하는 state 를 줄여보자
- 어떤 컴포넌트든 자유롭게 접근하는 전역 state 를 생성하자
- todos 를 관리하는 것은 일반적으로 적당하지 않음
- 회원정보, 장바구니, 테마 등이 적당한 것으로 판단

## 2. 단계별 실습

### 2.1. Context 와 useReduce 조합

- 폴더 구조 : `/src/context` 폴더 생성
- 파일 구조 : `/src/context/TodoContext.tsx` 파일 생성
- 1차 버전

```tsx
import { TodoType } from '@/types/todoType';
import { createContext, useReducer } from 'react';

// 전역 state 에서 관리할 데이터 모양
type TodoState = {
  todos: TodoType[];
};

// 1. 초기값
const initialState: TodoState = {
  todos: [],
};

// 2. Reduce 함수 : action 으로 state 를 관리하는 함수
// - 매개변수로 state 와 action 이 전달됨
// - action 의 모양 {type:string, payload: {id:"", title:"", complted:false}}
// - action 의 모양 {type:string, payload: TodoType} 위와 같다.

// type AddAction = { type: string; payload: TodoType };
// type AddAction = {
//   type: 'ADD' | 'TOGGLE' | 'DELETE' | 'EDIT';
//   payload: TodoType | { id: string } | { id: string; title: string };
// };
type AddAction = { type: 'ADD'; payload: TodoType };
type ToggleAction = { type: 'TOGGLE'; payload: { id: string } };
type DeleteAction = { type: 'DELETE'; payload: { id: string } };
type EditAction = { type: 'EDIT'; payload: { id: string; title: string } };
type todoAction = AddAction | ToggleAction | DeleteAction | EditAction;

function todosReducer(state: TodoState, action: todoAction): TodoState {
  switch (action.type) {
    case 'ADD':
      // {type:'ADD', payload: {id:"날짜", title:"안녕", complted:false}}
      const todo = action.payload;
      return { ...state, todos: [todo, ...state.todos] };
    case 'TOGGLE': {
      // { id: string }
      //   const id = action.payload.id;
      const { id } = action.payload;
      const arr: TodoType[] = state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
      return { ...state, todos: arr };
    }
    case 'DELETE': {
      // { id: string }
      //   const id = action.payload.id;
      const { id } = action.payload;
      const arr: TodoType[] = state.todos.filter(todo => todo.id !== id);
      return { ...state, todos: arr };
    }
    case 'EDIT': {
      // { id: string; title: string }
      const { id, title } = action.payload;
      const arr: TodoType[] = state.todos.map(todo => (todo.id === id ? { ...todo, title } : todo));
      return { ...state, todos: arr };
    }
    default:
      return state;
  }
}

// 3. Context 생성
// - Context 에서 관리할 Value 타입
type TodoContextValue = {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
};
const TodoContext = createContext<TodoContextValue | null>(null);

// 4. Provide 생성
const TodoProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // 5. useReduce 로 state 관리하기
  //   const [state, dispatch] = useReducer(리듀서함수,초기값);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  // dispatch 전용 함수
  const addTodo = (todo: TodoType) => {
    dispatch({ type: 'ADD', payload: todo });
  };
  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE', payload: { id } });
  };
  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE', payload: { id } });
  };
  const editTodo = (id: string, title: string) => {
    dispatch({ type: 'EDIT', payload: { id, title } });
  };

  // Context 의 value 는 현재 {} 로 정의되어 있다.
  const value: TodoContextValue = {
    todos: state.todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
```

## 2.2. useCallback 으로 함수를 리랜더링에서 제외하기

- dispatch 전용 함수

```tsx
// dispatch 전용 함수
const addTodo = useCallback((todo: TodoType) => {
  dispatch({ type: 'ADD', payload: todo });
}, []);
const toggleTodo = useCallback((id: string) => {
  dispatch({ type: 'TOGGLE', payload: { id } });
}, []);
const deleteTodo = useCallback((id: string) => {
  dispatch({ type: 'DELETE', payload: { id } });
}, []);
const editTodo = useCallback((id: string, title: string) => {
  dispatch({ type: 'EDIT', payload: { id, title } });
}, []);
```

### 2.3. useMemo 로 state 를 리랜더링에서 필요한 경우만 업데이트하기

```tsx
// Context 의 value 는 현재 {} 로 정의되어 있다.
//   const value = useMemo(() => {
//     return {
//       todos: state.todos,
//       addTodo,
//       toggleTodo,
//       deleteTodo,
//       editTodo,
//     };
//   }, []);
const value = useMemo(
  () => ({
    todos: state.todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  }),
  [state.todos, addTodo, toggleTodo, deleteTodo, editTodo],
);
```

### 2.4. 커스텀 훅으로 활용하기

```tsx
// 커스텀훅
export function useTodos() {
  const ctx = useContext(TodoContext);
  return ctx;
}
```

### 2.5. 완료 코드

```tsx
import { TodoType } from '@/types/todoType';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

// 전역 state 에서 관리할 데이터 모양
type TodoState = {
  todos: TodoType[];
};

// 1. 초기값
const initialState: TodoState = {
  todos: [],
};

// 2. Reduce 함수 : action 으로 state 를 관리하는 함수
type AddAction = { type: 'ADD'; payload: TodoType };
type ToggleAction = { type: 'TOGGLE'; payload: { id: string } };
type DeleteAction = { type: 'DELETE'; payload: { id: string } };
type EditAction = { type: 'EDIT'; payload: { id: string; title: string } };
type todoAction = AddAction | ToggleAction | DeleteAction | EditAction;

function todosReducer(state: TodoState, action: todoAction): TodoState {
  switch (action.type) {
    case 'ADD':
      // {type:'ADD', payload: {id:"날짜", title:"안녕", complted:false}}
      const todo = action.payload;
      return { ...state, todos: [todo, ...state.todos] };
    case 'TOGGLE': {
      // { id: string }
      //   const id = action.payload.id;
      const { id } = action.payload;
      const arr: TodoType[] = state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
      return { ...state, todos: arr };
    }
    case 'DELETE': {
      // { id: string }
      //   const id = action.payload.id;
      const { id } = action.payload;
      const arr: TodoType[] = state.todos.filter(todo => todo.id !== id);
      return { ...state, todos: arr };
    }
    case 'EDIT': {
      // { id: string; title: string }
      const { id, title } = action.payload;
      const arr: TodoType[] = state.todos.map(todo => (todo.id === id ? { ...todo, title } : todo));
      return { ...state, todos: arr };
    }
    default:
      return state;
  }
}

// 3. Context 생성
// - Context 에서 관리할 Value 타입
type TodoContextValue = {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
};
const TodoContext = createContext<TodoContextValue | null>(null);

// 4. Provide 생성
// export const TodoProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
export const TodoProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
  // 5. useReduce 로 state 관리하기
  //   const [state, dispatch] = useReducer(리듀서함수,초기값);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  // dispatch 전용 함수
  const addTodo = useCallback((todo: TodoType) => {
    dispatch({ type: 'ADD', payload: todo });
  }, []);
  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE', payload: { id } });
  }, []);
  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE', payload: { id } });
  }, []);
  const editTodo = useCallback((id: string, title: string) => {
    dispatch({ type: 'EDIT', payload: { id, title } });
  }, []);

  // Context 의 value 는 현재 {} 로 정의되어 있다.
  const value = useMemo(
    () => ({
      todos: state.todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
    }),
    [state.todos, addTodo, toggleTodo, deleteTodo, editTodo],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// 커스텀훅
export function useTodos() {
  const ctx = useContext(TodoContext);
  return ctx;
}
```

## 3. 활용 실습

- App.tsx

```tsx
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';
import { TodoProvider } from './context/TodoContext';

function App(): JSX.Element {
  // tsx 자리
  return (
    <TodoProvider>
      <div>
        <h1>할일 앱서비스</h1>
        <div>
          <TodoWrite />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
```

- TodoWrite.tsx

```tsx
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { TodoType } from '../../types/todoType';
import { useTodos } from '../../context/TodoContext';

const TodoWrite = () => {
  // js 자리
  const { addTodo } = useTodos();
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
    <div>
      <input type="text" value={title} onChange={e => handleChange(e)} onKeyDown={handleKeyDown} />
      <button onClick={handleAdd}>등록</button>
    </div>
  );
};

export default TodoWrite;
```

- TodoList.tsx

```tsx
import { useTodos } from '../../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = (): JSX.Element => {
  const { todos } = useTodos();
  return (
    <div>
      <h2>할일목록</h2>
      {todos.length === 0 ? (
        <p>목록이 없습니다.</p>
      ) : (
        <ul>
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

- TodoItem.tsx

```tsx
import { useTodos } from '../../context/TodoContext';
import { TodoType } from '../../types/todoType';
import { KeyboardEvent, useState } from 'react';

type TodoItemProps = {
  todo: TodoType;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  // js 자리
  const { toggleTodo, deleteTodo, editTodo } = useTodos();

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
      {isEdit ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleEditSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </>
      ) : (
        <>
          <input type="checkbox" onChange={() => toggleTodo(todo.id)} checked={todo.completed} />
          <span>{todo.title}</span>
          <button onClick={handleEdit}>수정</button>
          <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
```

## 4. 실제 프로젝트 구성

- /src/context/todo 폴더 생성

### 4.1. Context 공용 타입 정의

- /src/context/todo/`types.ts` 생성

```ts
import { TodoType } from '@/types/todoType';

// state 타입
export type TodoState = {
  todos: TodoType[];
};

// action 타입
export type AddAction = { type: 'ADD'; payload: TodoType };
export type ToggleAction = { type: 'TOGGLE'; payload: { id: string } };
export type DeleteAction = { type: 'DELETE'; payload: { id: string } };
export type EditAction = { type: 'EDIT'; payload: { id: string; title: string } };
export type todoAction = AddAction | ToggleAction | DeleteAction | EditAction;

// 초기상태값
export const initialState: TodoState = {
  todos: [],
};
```

### 4.2. 액션 분리

- /src/context/todo/`actions.ts` 파일 생성

```ts
import { TodoType } from '@/types/todoType';
import { AddAction, DeleteAction, EditAction, ToggleAction } from './types';

export const addTodo = (todo: TodoType): AddAction => ({
  type: 'ADD',
  payload: todo,
});

export const toggleTodo = (id: string): ToggleAction => ({
  type: 'TOGGLE',
  payload: { id },
});

export const deleteTodo = (id: string): DeleteAction => ({
  type: 'DELETE',
  payload: { id },
});

export const editTodo = (id: string, title: string): EditAction => ({
  type: 'EDIT',
  payload: { id, title },
});
```

### 4.3. 리듀서 분리

- /src/context/todo/`reducer.ts` 파일 생성

```ts
import { TodoType } from '@/types/todoType';
import { todoAction, TodoState } from './types';

export function todosReducer(state: TodoState, action: todoAction): TodoState {
  switch (action.type) {
    case 'ADD': {
      const todo = action.payload;
      return { ...state, todos: [todo, ...state.todos] };
    }
    case 'TOGGLE': {
      const { id } = action.payload;
      const arr: TodoType[] = state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
      return { ...state, todos: arr };
    }
    case 'DELETE': {
      const { id } = action.payload;
      const arr: TodoType[] = state.todos.filter(todo => todo.id !== id);
      return { ...state, todos: arr };
    }
    case 'EDIT': {
      const { id, title } = action.payload;
      const arr: TodoType[] = state.todos.map(todo => (todo.id === id ? { ...todo, title } : todo));
      return { ...state, todos: arr };
    }
    default:
      return state;
  }
}
```

### 4.4. Providr 분리

- /src/context/todo/`TodoProvider.tsx` 파일 생성

```tsx
import { TodoType } from '@/types/todoType';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { todosReducer } from './reducer';
import { initialState, TodoState } from './types';
import * as AC from './actions';

// 오로지 state 를 읽기 전용으로 제공하는 Context
const TodoStateContext = createContext<TodoState | null>(null);

// 오로지 state 를 업데이트 하는 action 전용 Context
type TodoActions = {
  addTodo: (todo: TodoType) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
};
const TodoActionContext = createContext<TodoActions | null>(null);

export const TodoProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  // dispatch 전용 함수
  const addTodo = useCallback((todo: TodoType) => dispatch(AC.addTodo(todo)), []);
  const toggleTodo = useCallback((id: string) => dispatch(AC.toggleTodo(id)), []);
  const deleteTodo = useCallback((id: string) => dispatch(AC.deleteTodo(id)), []);
  const editTodo = useCallback((id: string, title: string) => dispatch(AC.editTodo(id, title)), []);

  // Context 의  value 는 현재 {} 로 정의되어 있다.
  const stateValue = useMemo(() => state, [state]);
  const actionValue = useMemo(() => {
    return {
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
    };
  }, [addTodo, toggleTodo, deleteTodo, editTodo]);

  return (
    <TodoStateContext.Provider value={stateValue}>
      <TodoActionContext.Provider value={actionValue}>{children}</TodoActionContext.Provider>
    </TodoStateContext.Provider>
  );
};
```

### 4.5. 커스텀 훅 분리

- /src/context/todo/`hooks.ts` 파일 생성

```ts
import { useContext } from 'react';
import { TodoActionContext, TodoStateContext } from './TodoProvider';

export function useTodoState() {
  const state = useContext(TodoStateContext);
  if (!state) {
    throw new Error('state 가 없습니다.');
  }
  return state;
}

// 액션 전용 context 사용
export function useTodoActions() {
  const actions = useContext(TodoActionContext);
  if (!actions) {
    throw new Error('action 이 없습니다.');
  }
  return actions;
}
```

### 4.6. 활용

- App.tsx

```tsx
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';
import { TodoProvider } from './context/todo/TodoProvider';

function App(): JSX.Element {
  // tsx 자리
  return (
    <TodoProvider>
      <div>
        <h1>할일 앱서비스</h1>
        <div>
          <TodoWrite />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
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
    <div>
      <input type="text" value={title} onChange={e => handleChange(e)} onKeyDown={handleKeyDown} />
      <button onClick={handleAdd}>등록</button>
    </div>
  );
};

export default TodoWrite;
```

- TodoList.tsx

```tsx
import { useTodoState } from '../../context/todo/hooks';
import TodoItem from './TodoItem';

const TodoList = (): JSX.Element => {
  const { todos } = useTodoState();
  return (
    <div>
      <h2>할일목록</h2>
      {todos.length === 0 ? (
        <p>목록이 없습니다.</p>
      ) : (
        <ul>
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
      {isEdit ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleEditSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </>
      ) : (
        <>
          <input type="checkbox" onChange={() => toggleTodo(todo.id)} checked={todo.completed} />
          <span>{todo.title}</span>
          <button onClick={handleEdit}>수정</button>
          <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
```
