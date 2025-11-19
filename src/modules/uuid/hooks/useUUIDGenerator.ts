import { useState, useCallback } from 'react';
import { UUIDService } from '@/core/services/UUIDService';

export const useUUIDGenerator = () => {
  // SOLUÇÃO: Lazy Initialization
  // Passamos uma função para o useState. Ela roda apenas UMA vez na montagem.
  // Isso elimina a necessidade do useEffect e remove o erro de renderização em cascata.
  const [data, setData] = useState(() => {
    const initialId = UUIDService.generate();
    return {
      uuid: initialId,
      history: [initialId] // O histórico já nasce com o primeiro ID
    };
  });

  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const newId = UUIDService.generate();
    
    // Atualizamos uuid e history juntos (melhor performance)
    setData(prev => ({
      uuid: newId,
      history: [newId, ...prev.history].slice(0, 5)
    }));
    
    setCopied(false);
  }, []);

  const copyToClipboard = useCallback(() => {
    if (!data.uuid) return;
    navigator.clipboard.writeText(data.uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [data.uuid]);

  return { 
    uuid: data.uuid, 
    history: data.history, 
    generate, 
    copyToClipboard, 
    copied 
  };
};