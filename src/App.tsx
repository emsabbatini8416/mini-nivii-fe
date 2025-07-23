import React, { useState } from 'react';
import { Header, SearchForm, ChartDisplay, ErrorMessage } from '@/components';
import { useQuery } from '@/hooks/useQuery';

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const { data, loading, error, executeQuery, clearData } = useQuery();

  const handleSubmit = (): void => {
    executeQuery(question);
  };

  const handleClear = (): void => {
    setQuestion('');
    clearData();
  };

  const handleErrorDismiss = (): void => {
    clearData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <SearchForm
            question={question}
            onQuestionChange={setQuestion}
            onSubmit={handleSubmit}
            loading={loading}
            onClear={handleClear}
          />

          <ErrorMessage 
            message={error} 
            onDismiss={handleErrorDismiss}
          />

          <ChartDisplay data={data} />
        </div>
      </main>

      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2025 Mini Nivii. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
