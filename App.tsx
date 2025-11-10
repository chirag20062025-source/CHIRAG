
import React from 'react';
import TodoList from './components/TodoList';
import FocusTimer from './components/FocusTimer';
import Notes from './components/Notes';
import MotivationalQuote from './components/MotivationalQuote';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100 text-content-100 font-sans p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-3">
            <SparklesIcon className="w-10 h-10 text-brand-secondary" />
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              ProductivityPal
            </h1>
        </div>
        <p className="text-content-200 mt-2 text-lg">Achieve more, stress less.</p>
      </header>
      
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max">
          <div className="lg:col-span-3">
            <MotivationalQuote />
          </div>
          <div className="lg:col-span-2 lg:row-span-2">
            <TodoList />
          </div>
          <div className="lg:col-span-1">
            <FocusTimer />
          </div>
          <div className="lg:col-span-1">
            <Notes />
          </div>
        </div>
      </main>

      <footer className="text-center mt-12 text-content-200 text-sm">
        <p>&copy; {new Date().getFullYear()} ProductivityPal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
