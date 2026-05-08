import { useState, useCallback } from 'react';
import { PDFService } from '../services/PDFService';

export const usePDFMerger = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  const addFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;
    const pdfFiles = Array.from(newFiles).filter(file => file.type === 'application/pdf');
    setFiles(prev => [...prev, ...pdfFiles]);
  }, []);

  const removeFile = useCallback((indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  }, []);

  const handleMerge = useCallback(async () => {
    if (files.length < 2) return;
    
    setIsMerging(true);
    try {
      const mergedBytes = await PDFService.merge(files);
      PDFService.downloadBytes(mergedBytes, 'AzleHub-Merged.pdf');
    } catch (error) {
      console.error("Erro ao juntar PDFs:", error);
      alert("Ocorreu um erro ao processar os PDFs.");
    } finally {
      setIsMerging(false);
    }
  }, [files]);

  return { files, isMerging, addFiles, removeFile, handleMerge };
};