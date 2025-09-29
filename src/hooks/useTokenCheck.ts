import { useState, useCallback } from 'react';
import axiosInstance from '../utils/axiosConfig';

interface TokenCheckResult {
  hasToken: boolean;
  tokenCount: number | null;
  loading: boolean;
  error: string | null;
}

export const useTokenCheck = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkUserToken = useCallback(async (): Promise<TokenCheckResult> => {
    setLoading(true);
    setError(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axiosInstance.get(`${apiBaseUrl}/user/my-token`, {
        withCredentials: true,
      });

      const tokenCount = response.data.aiTokenCurrent;
      const hasToken = tokenCount > 0;

      setLoading(false);
      return {
        hasToken,
        tokenCount,
        loading: false,
        error: null,
      };
    } catch (err: any) {
      console.error('토큰 조회 실패:', err);
      setError(err.message || '토큰 조회에 실패했습니다.');
      setLoading(false);
      return {
        hasToken: false,
        tokenCount: null,
        loading: false,
        error: err.message || '토큰 조회에 실패했습니다.',
      };
    }
  }, []);

  return {
    checkUserToken,
    loading,
    error,
  };
};