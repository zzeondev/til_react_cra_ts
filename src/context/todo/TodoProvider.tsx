import { TodoType } from '@/types/todoType';
import { createContext, useCallback, useMemo, useReducer } from 'react';
import { todosReducer } from './reducer';
import { initialState, TodoState } from './types';
import * as AC from './actions';

// 오로지 state 를 읽기 전용으로 제공하는 Context
export const TodoStateContext = createContext<TodoState | null>(null);

// 오로지 state 를 업데이트 하는 action 전용 Context
type TodoActions = {
  addTodo: (todo: TodoType) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
};
export const TodoActionContext = createContext<TodoActions | null>(null);

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
