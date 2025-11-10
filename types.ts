
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export enum FocusMode {
  FOCUS = 'FOCUS',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
}
