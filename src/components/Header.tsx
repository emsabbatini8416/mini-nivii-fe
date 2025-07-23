import React from 'react';
import { APP_CONFIG } from '@/config/constants';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">
                {APP_CONFIG.NAME}
              </h1>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">
                AI-powered data analytics platform v{APP_CONFIG.VERSION}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Connected
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
