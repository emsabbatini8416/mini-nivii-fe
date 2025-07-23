import React, { useState } from 'react';
import { Header, SearchForm, ChartDisplay, ErrorMessage, ChartTypeSelector } from '@/components';
import { useQuery } from '@/hooks/useQuery';
import type { ChartType } from '@/types';

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [manualChartType, setManualChartType] = useState<ChartType | null>(null);
  const { data, chartType, loading, error, executeQuery, clearData } = useQuery();

  const handleSubmit = (): void => {
    executeQuery(question);
  };

  const handleClear = (): void => {
    setQuestion('');
    setManualChartType(null);
    clearData();
  };

  const handleErrorDismiss = (): void => {
    clearData();
  };

  const handleChartTypeChange = (type: ChartType): void => {
    setManualChartType(type);
  };

  // Use manual chart type if set, otherwise use auto-detected type
  const effectiveChartType = manualChartType || chartType;

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

          {data && (
            <ChartTypeSelector
              selectedType={effectiveChartType || 'bar'}
              onTypeChange={handleChartTypeChange}
              disabled={loading}
            />
          )}

          <ChartDisplay data={data} chartType={effectiveChartType || undefined} />
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
