
import React, { useState } from 'react';
import type { Todo } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { CheckIcon } from './icons/CheckIcon';

const TodoItem: React.FC<{ todo: Todo; onToggle: (id: number) => void; onDelete: (id: number) => void; }> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="flex items-center justify-between p-3 bg-base-100 rounded-lg transition-colors duration-200">
        <div className="flex items-center gap-3">
            <button 
                onClick={() => onToggle(todo.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${todo.completed ? 'border-brand-primary bg-brand-primary' : 'border-base-300'}`}
                aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {todo.completed && <CheckIcon className="w-4 h-4 text-white" />}
            </button>
            <span className={`transition-colors duration-300 ${todo.completed ? 'line-through text-content-200' : 'text-content-100'}`}>
                {todo.text}
            </span>
        </div>
        <button 
            onClick={() => onDelete(todo.id)}
            className="p-1 text-content-200 hover:text-red-500 transition-colors duration-200"
            aria-label="Delete todo"
        >
            <TrashIcon className="w-5 h-5" />
        </button>
    </li>
  );
};


const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleToggle = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="bg-base-200 rounded-xl p-6 shadow-lg h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">To-Do List</h2>
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary">
          {completedCount}/{todos.length} Done
        </span>
      </div>
      <form onSubmit={handleAddTodo} className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow bg-base-100 border-2 border-base-300 rounded-lg py-2 px-4 focus:outline-none focus:border-brand-primary transition-colors duration-200"
        />
        <button 
          type="submit"
          className="bg-brand-primary text-white p-3 rounded-lg hover:bg-brand-primary/80 transition-colors duration-200 disabled:opacity-50"
          disabled={!newTodo.trim()}
          aria-label="Add new todo"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </form>
      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
        {todos.length > 0 ? (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
            ))}
          </ul>
        ) : (
          <div className="text-center py-10 text-content-200">
            <p>Your task list is empty.</p>
            <p>Add a task to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
