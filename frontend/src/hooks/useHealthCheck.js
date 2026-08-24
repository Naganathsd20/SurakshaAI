import { useState, useEffect } from 'react';
import { checkHealth } from '../services/api';

export const useHealthCheck = () => {
  const [status, setStatus] = useState({ loading: true, online: false, message: '', error: null });

  useEffect(() => {
    let isMounted = true;
    const fetchStatus = async () => {
      const res = await checkHealth();
      if (isMounted) {
        if (res.success) {
          setStatus({ loading: false, online: true, message: res.data.message, error: null });
        } else {
          setStatus({ loading: false, online: false, message: 'Backend Offline', error: res.error });
        }
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return status;
};
