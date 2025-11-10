
import React, { useState, useEffect, useCallback } from 'react';
import { getMotivationalQuote } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { RefreshIcon } from './icons/RefreshIcon';

const MotivationalQuote: React.FC = () => {
  const [quote, setQuote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newQuote = await getMotivationalQuote();
      setQuote(newQuote);
    } catch (err) {
      setError('Failed to fetch a new quote. Please try again.');
      setQuote('Believe you can and you\'re halfway there.'); // Fallback quote
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-base-200 rounded-xl p-6 shadow-lg relative transition-all duration-300 hover:shadow-brand-primary/20">
      <div className="flex items-center mb-4">
        <SparklesIcon className="w-6 h-6 text-brand-secondary mr-3" />
        <h2 className="text-xl font-bold">Daily Motivation</h2>
      </div>
      <div className="min-h-[80px] flex items-center justify-center">
        {isLoading ? (
          <div className="animate-pulse flex space-x-4 w-full">
            <div className="flex-1 space-y-3 py-1">
              <div className="h-2 bg-base-300 rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-base-300 rounded col-span-2"></div>
                <div className="h-2 bg-base-300 rounded col-span-1"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <blockquote className="text-lg italic text-center text-content-100">
            "{quote}"
          </blockquote>
        )}
      </div>
      <button
        onClick={fetchQuote}
        disabled={isLoading}
        className="absolute top-4 right-4 p-2 text-content-200 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-300 hover:rotate-90"
        aria-label="Get new quote"
      >
        <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};

export default MotivationalQuote;
