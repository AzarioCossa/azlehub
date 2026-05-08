import { useState, useEffect } from 'react';
import { JWTService, DecodedJWT } from '../services/JWTService';

export const useJWTDecoder = () => {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState<DecodedJWT | null>(null);

  useEffect(() => {
    if (!token.trim()) {
      setDecoded(null);
      return;
    }
    setDecoded(JWTService.decode(token.trim()));
  }, [token]);

  const clear = () => {
    setToken('');
    setDecoded(null);
  };

  return { token, setToken, decoded, clear };
};