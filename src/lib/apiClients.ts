/**
 * API client functions for various external data sources
 */

// Base URL for internal API routes
const API_BASE = '/api';

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface WorldBankData {
  indicator: string;
  country: string;
  value: number;
  year: number;
  source: string;
  description: string;
}

export interface CompanyFiling {
  form_type: string;
  filing_date: string;
  company_name: string;
  cik: string;
  document_url: string;
  description: string;
}

export interface CompanyFilingsData {
  source: string;
  company: string;
  filings: CompanyFiling[];
}

/**
 * Fetch World Bank data via internal API
 */
export async function fetchWorldBankData(
  indicator: string, 
  country?: string
): Promise<ApiResponse<WorldBankData>> {
  try {
    const params = new URLSearchParams({ 
      source: 'worldbank', 
      indicator 
    });
    
    if (country) {
      params.append('country', country);
    }

    const response = await fetch(`${API_BASE}/open-data?${params}`);
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch World Bank data' };
    }
    
    return data;
  } catch (error) {
    console.error('World Bank API client error:', error);
    return { 
      success: false, 
      error: 'Network error while fetching World Bank data' 
    };
  }
}

/**
 * Fetch company filings data via internal API
 */
export async function fetchCompanyFilings(
  company?: string,
  cik?: string,
  formType?: string
): Promise<ApiResponse<CompanyFilingsData>> {
  try {
    const params = new URLSearchParams({ source: 'sec' });
    
    if (company) params.append('company', company);
    if (cik) params.append('cik', cik);
    if (formType) params.append('form_type', formType);

    const response = await fetch(`${API_BASE}/company-filings?${params}`);
    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch company filings' };
    }
    
    return data;
  } catch (error) {
    console.error('Company filings API client error:', error);
    return { 
      success: false, 
      error: 'Network error while fetching company filings' 
    };
  }
}

/**
 * Generic API client helper
 */
export async function apiRequest<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { success: false, error: data.error || `HTTP ${response.status}` };
    }
    
    return data;
  } catch (error) {
    console.error('API request error:', error);
    return { 
      success: false, 
      error: 'Network error' 
    };
  }
}
