import { useState, useMemo } from 'react';
import { TextAnalysisService } from '@/core/services/TextAnalysisService';

export const useTextTool = () => {
  const [text, setText] = useState('');
  
  // useMemo evita recálculos desnecessários em cada render
  const stats = useMemo(() => TextAnalysisService.analyze(text), [text]);
  const slug = useMemo(() => TextAnalysisService.toSlug(text), [text]);

  return { text, setText, stats, slug };
};
