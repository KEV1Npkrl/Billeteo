import { useCallback, useState } from 'react';

interface FetchOptions extends RequestInit {
  params?: Record<string, any>;
}

export function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async <T = any>(
      url: string,
      options?: FetchOptions
    ): Promise<{ data?: T; error?: string }> => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const fullUrl = new URL(`${apiUrl}${url}`);

        // Agregar query params
        if (options?.params) {
          Object.entries(options.params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              fullUrl.searchParams.append(key, String(value));
            }
          });
        }

        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          ...options?.headers,
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(fullUrl.toString(), {
          ...options,
          headers,
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
          }
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'API Error');
        }

        const data = await response.json();
        setLoading(false);

        return { data: data.data };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setLoading(false);
        return { error: message };
      }
    },
    []
  );

  return { request, loading, error };
}

// Hook para query params
export function useQueryParams() {
  return new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
}

// Hook para un input controlado
export function useFormInput(initialValue: string = '') {
  const [value, setValue] = useState(initialValue);

  const reset = () => setValue(initialValue);
  const bind = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  };

  return [value, bind, reset] as const;
}
