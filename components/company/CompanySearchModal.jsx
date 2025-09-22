import React, { useState, useEffect } from 'react';
import ModalContainer from '../ModalContainer';

const CompanySearchModal = ({ isOpen, onClose, onSelectCompany }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const mockCompanies = [
      {
        id: 1,
        name: 'Apple Inc.',
        ticker: 'AAPL',
        industry: 'Technology',
        location: 'Cupertino, CA',
        employees: '164,000',
        impactScore: 92,
        logo: '🍎'
      },
      {
        id: 2,
        name: 'Microsoft Corporation',
        ticker: 'MSFT',
        industry: 'Technology',
        location: 'Redmond, WA',
        employees: '221,000',
        impactScore: 89,
        logo: '🖥️'
      },
      {
        id: 3,
        name: 'Tesla, Inc.',
        ticker: 'TSLA',
        industry: 'Automotive',
        location: 'Austin, TX',
        employees: '127,855',
        impactScore: 95,
        logo: '⚡'
      },
      {
        id: 4,
        name: 'Patagonia, Inc.',
        ticker: 'PRIVATE',
        industry: 'Retail',
        location: 'Ventura, CA',
        employees: '3,000',
        impactScore: 98,
        logo: '🏔️'
      },
      {
        id: 5,
        name: 'Unilever PLC',
        ticker: 'UL',
        industry: 'Consumer Goods',
        location: 'London, UK',
        employees: '190,000',
        impactScore: 85,
        logo: '🧴'
      }
    ];

    if (searchQuery.length > 2) {
      setIsLoading(true);
      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = mockCompanies.filter(company =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filtered);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
  };

  const handleConfirmSelection = () => {
    if (selectedCompany) {
      onSelectCompany(selectedCompany);
      onClose();
      setSelectedCompany(null);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedCompany(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  const getImpactScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={handleClose} title="Search Companies" size="lg">
      <div className="space-y-6">
        {/* Search Input */}
        <div>
          <label htmlFor="companySearch" className="block text-sm font-medium text-gray-700 mb-2">
            Search for a company to analyze
          </label>
          <input
            id="companySearch"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter company name, ticker symbol, or industry..."
          />
          <p className="mt-1 text-sm text-gray-500">
            Type at least 3 characters to search
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Searching companies...</span>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && !isLoading && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Search Results ({searchResults.length})</h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {searchResults.map((company) => (
                <button
                  key={company.id}
                  onClick={() => handleSelectCompany(company)}
                  className={`w-full p-4 text-left border rounded-lg transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 ${
                    selectedCompany?.id === company.id
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-20'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{company.logo}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{company.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{company.ticker}</span>
                          <span>•</span>
                          <span>{company.industry}</span>
                          <span>•</span>
                          <span>{company.location}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {company.employees} employees
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getImpactScoreColor(company.impactScore)}`}>
                        Impact Score: {company.impactScore}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {searchQuery.length > 2 && searchResults.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
            <p className="text-gray-600">
              Try searching with a different term or{' '}
              <button className="text-blue-600 hover:text-blue-500 underline">
                request to add this company
              </button>
            </p>
          </div>
        )}

        {/* Selected Company Preview */}
        {selectedCompany && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Selected Company</h3>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{selectedCompany.logo}</span>
              <div>
                <h4 className="font-semibold text-blue-900">{selectedCompany.name}</h4>
                <p className="text-sm text-blue-700">
                  {selectedCompany.industry} • Impact Score: {selectedCompany.impactScore}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmSelection}
            disabled={!selectedCompany}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Analyze Company
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default CompanySearchModal;