import { ApiResponse } from '@/types';
import { mockApi } from './mock';

// Usar MOCK_MODE para alternar entre mock y real API
const USE_MOCK = true; // Cambiar a false cuando el backend esté listo

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export class ApiClient {
  private getHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || {
          code: 'UNKNOWN_ERROR',
          message: 'An unknown error occurred',
        },
      };
    }

    return {
      success: true,
      data: data.data,
    };
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      return this.mockGet<T>(endpoint, params);
    }

    const url = new URL(`${API_URL}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      return this.mockPost<T>(endpoint, body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      return this.mockPut<T>(endpoint, body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    if (USE_MOCK) {
      return this.mockDelete<T>(endpoint);
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  // Mock methods
  private async mockGet<T>(endpoint: string, _params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      let data: any;

      if (endpoint === '/accounts') {
        data = await mockApi.getAccounts();
      } else if (endpoint === '/transactions') {
        data = await mockApi.getTransactions();
      } else if (endpoint === '/dashboard/summary') {
        data = await mockApi.getDashboardSummary();
      } else if (endpoint === '/analytics/expenses-by-category') {
        data = await mockApi.getExpensesByCategory();
      } else if (endpoint === '/savings-goals') {
        data = await mockApi.getSavingsGoals();
      } else if (endpoint.match(/^\/savings-goals\/[\w-]+$/)) {
        const goalId = endpoint.split('/')[2];
        data = await mockApi.getSavingsGoal(goalId);
      } else {
        throw new Error(`Mock endpoint not found: ${endpoint}`);
      }

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'MOCK_ERROR',
          message: error.message,
        },
      };
    }
  }

  private async mockPost<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    try {
      let data: any;

      if (endpoint === '/auth/register') {
        data = await mockApi.register(body);
        localStorage.setItem('token', data.token);
      } else if (endpoint === '/auth/login') {
        data = await mockApi.login(body);
        localStorage.setItem('token', data.token);
      } else if (endpoint === '/auth/logout') {
        await mockApi.logout();
        localStorage.removeItem('token');
        data = { success: true };
      } else if (endpoint === '/accounts') {
        data = await mockApi.addAccount(body);
      } else if (endpoint === '/transactions') {
        data = await mockApi.addTransaction(body);
      } else if (endpoint === '/savings-goals') {
        data = await mockApi.createSavingsGoal(body);
      } else if (endpoint.match(/^\/savings-goals\/[\w-]+\/contributions$/)) {
        const goalId = endpoint.split('/')[2];
        data = await mockApi.addContribution(goalId, body);
      } else {
        throw new Error(`Mock endpoint not found: ${endpoint}`);
      }

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'MOCK_ERROR',
          message: error.message,
        },
      };
    }
  }

  private async mockPut<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    try {
      let data: any;

      if (endpoint.match(/^\/savings-goals\/[\w-]+$/)) {
        const goalId = endpoint.split('/')[2];
        data = await mockApi.updateSavingsGoal(goalId, body);
      } else {
        throw new Error(`Mock PUT not implemented: ${endpoint}`);
      }

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'MOCK_ERROR',
          message: error.message,
        },
      };
    }
  }

  private async mockDelete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      let data: any;

      if (endpoint.match(/^\/savings-goals\/[\w-]+$/)) {
        const goalId = endpoint.split('/')[2];
        data = await mockApi.deleteSavingsGoal(goalId);
      } else {
        throw new Error(`Mock DELETE not implemented: ${endpoint}`);
      }

      return { success: true, data };
    } catch (error: any) {
      return {
        success: false,
        error: {
          code: 'MOCK_ERROR',
          message: error.message,
        },
      };
    }
  }
}

export const apiClient = new ApiClient();
