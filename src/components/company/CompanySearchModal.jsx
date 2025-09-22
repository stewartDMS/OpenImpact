import React, { useState, useEffect } from 'react';
import ModalContainer from '../ModalContainer';

const CompanySearchModal = ({ isOpen, onClose, onSelectCompany }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock company data
  const mockCompanies = [
    {
      id: 1,
      name: 'Apple Inc.',
      symbol: 'AAPL',
      industry: 'Technology',
      market_cap: '$2.8T',
      impact_score: 85,
      logo: '🍎'
    },
    {
      id: 2,
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      industry: 'Technology',
      market_cap: '$2.4T',
      impact_score: 82,
      logo: '🪟'
    },
    {
      id: 3,
      name: 'Amazon.com Inc.',
      symbol: 'AMZN',
      industry: 'E-commerce',
      market_cap: '$1.5T',
      impact_score: 78,
      logo: '📦'
    },
    {
      id: 4,
      name: 'Tesla Inc.',
      symbol: 'TSLA',
      industry: 'Automotive',
      market_cap: '$800B',
      impact_score: 91,
      logo: '🚗'
    },
    {
      id: 5,
      name: 'Johnson & Johnson',
      symbol: 'JNJ',
      industry: 'Healthcare',
      market_cap: '$450B',
      impact_score: 87,
      logo: '🏥'
    }
  ];

  useEffect(() => {
    if (searchTerm.length > 1) {
      setIsLoading(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = mockCompanies.filter(company =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filtered);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [searchTerm]); // mockCompanies is static, so we don't need it in dependencies

  const handleSelectCompany = (company) => {
    onSelectCompany(company);
    onClose();
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Search Companies"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search by company name, ticker symbol, or industry..."
            autoFocus
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && searchResults.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {searchResults.map((company) => (
              <button
                key={company.id}
                onClick={() => handleSelectCompany(company)}
                className="w-full text-left p-4 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-primary-300 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{company.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{company.name}</h3>
                      <span className="text-sm text-gray-500">({company.symbol})</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>{company.industry}</span>
                      <span>•</span>
                      <span>{company.market_cap}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Impact Score</div>
                    <div className={`text-lg font-semibold ${
                      company.impact_score >= 85 ? 'text-green-600' :
                      company.impact_score >= 70 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {company.impact_score}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && searchTerm.length > 1 && searchResults.length === 0 && (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No companies found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try searching with different keywords or check your spelling.
            </p>
          </div>
        )}

        {/* Initial State */}
        {searchTerm.length <= 1 && (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Search for companies</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start typing to search for companies by name, ticker, or industry.
            </p>
          </div>
        )}

        {/* Popular Companies */}
        {searchTerm.length <= 1 && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Popular Companies</h4>
            <div className="grid grid-cols-2 gap-2">
              {mockCompanies.slice(0, 4).map((company) => (
                <button
                  key={company.id}
                  onClick={() => handleSelectCompany(company)}
                  className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-left"
                >
                  <span className="text-lg">{company.logo}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{company.name}</p>
                    <p className="text-xs text-gray-500">{company.symbol}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

export default CompanySearchModal;