import { useState, useCallback } from 'react';
import CryptoJS from 'crypto-js';

export const useHashCalculator = () => {
  const [input, setInput] = useState('');
  const [copiedAlg, setCopiedAlg] = useState<string | null>(null);

  // Gera os hashes em tempo real conforme o input muda
  const hashes = {
    md5: CryptoJS.MD5(input).toString(),
    sha1: CryptoJS.SHA1(input).toString(),
    sha256: CryptoJS.SHA256(input).toString(),
    sha512: CryptoJS.SHA512(input).toString(),
  };

  const copyToClipboard = useCallback((text: string, alg: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAlg(alg);
    setTimeout(() => setCopiedAlg(null), 2000);
  }, []);

  const clear = () => setInput('');

  return { input, setInput, hashes, copyToClipboard, copiedAlg, clear };
};