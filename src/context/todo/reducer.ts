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
