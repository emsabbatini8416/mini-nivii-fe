import React from 'react';
import { MESSAGES } from '@/config/constants';
import type { SearchFormProps } from '@/types';

const SearchForm: React.FC<SearchFormProps> = ({ 
  question, 
  onQuestionChange, 
  onSubmit, 
  loading, 
  onClear 
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="question" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ask your question
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => onQuestionChange(e.target.value)}
            placeholder={MESSAGES.PLACEHOLDERS.SEARCH}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={loading}
          />
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </span>
            ) : (
              'Ask Question'
            )}
          </button>
          
          <button
            type="button"
            onClick={onClear}
            className="px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
