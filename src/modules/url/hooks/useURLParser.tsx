import { useState, useEffect, useCallback } from 'react';
import { URLService, ParsedURL } from '../services/URLService';

export const useURLParser = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [parsedData, setParsedData] = useState<ParsedURL | null>(null);

  useEffect(() => {
    if (!inputUrl.trim()) {
      setParsedData(null);
      return;
    }
    setParsedData(URLService.parse(inputUrl));
  }, [inputUrl]);

  const clear = useCallback(() => {
    setInputUrl('');
    setParsedData(null);
  }, []);

  return { inputUrl, setInputUrl, parsedData, clear };
};