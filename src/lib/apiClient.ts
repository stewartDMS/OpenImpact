/**
 * API Client utility for making HTTP requests
 * Provides a centralized way to handle API calls with error handling and type safety
 */

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  details?: any;
}

export class ApiClientError extends Error {
  public status: number;
  public details?: any;

  constructor(message: string, status: number, details?: any) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.details = details;
  }
}

export interface RequestOptions extends RequestInit {
  timeout?: number;
  baseURL?: string;
}

/**
 * Enhanced fetch function with timeout and error handling
 */
async function enhancedFetch<T>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    timeout = 10000,
    baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
    ...fetchOptions
  } = options;

  const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;

  // Create timeout promise
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new ApiClientError('Request timeout', 408));
    }, timeout);
  });

  try {
    // Race between fetch and timeout
    const response = await Promise.race([
      fetch(fullUrl, {
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
        ...fetchOptions,
      }),
      timeoutPromise,
    ]);

    // Handle non-ok responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiClientError(
        errorData.message || `HTTP Error: ${response.status}`,
        response.status,
        errorData
      );
    }

    const data = await response.json();
    
    return {
      data,
      success: true,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    
    throw new ApiClientError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      0,
      error
    );
  }
}

/**
 * API Client class with common HTTP methods
 */
export class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL?: string, defaultHeaders?: Record<string, string>) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }

  async get<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return enhancedFetch<T>(url, {
      method: 'GET',
      headers: this.defaultHeaders,
      baseURL: this.baseURL,
      ...options,
    });
  }

  async post<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return enhancedFetch<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers: this.defaultHeaders,
      baseURL: this.baseURL,
      ...options,
    });
  }

  async put<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return enhancedFetch<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers: this.defaultHeaders,
      baseURL: this.baseURL,
      ...options,
    });
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return enhancedFetch<T>(url, {
      method: 'DELETE',
      headers: this.defaultHeaders,
      baseURL: this.baseURL,
      ...options,
    });
  }

  async patch<T>(
    url: string,
    data?: any,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return enhancedFetch<T>(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      headers: this.defaultHeaders,
      baseURL: this.baseURL,
      ...options,
    });
  }
}

// Default API client instance
export const apiClient = new ApiClient();

// Convenience functions using the default client
export const get = <T>(url: string, options?: RequestOptions) => 
  apiClient.get<T>(url, options);

export const post = <T>(url: string, data?: any, options?: RequestOptions) => 
  apiClient.post<T>(url, data, options);

export const put = <T>(url: string, data?: any, options?: RequestOptions) => 
  apiClient.put<T>(url, data, options);

export const del = <T>(url: string, options?: RequestOptions) => 
  apiClient.delete<T>(url, options);

export const patch = <T>(url: string, data?: any, options?: RequestOptions) => 
  apiClient.patch<T>(url, data, options);