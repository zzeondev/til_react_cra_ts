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
