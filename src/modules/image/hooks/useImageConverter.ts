import { useState, useCallback } from 'react';
import { ImageService, ConversionOptions } from '../services/ImageService';

export const useImageConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  
  const [options, setOptions] = useState<ConversionOptions>({
    format: 'image/webp',
    quality: 0.8
  });

  const handleFileSelect = useCallback((selectedFile: File | null) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith('image/')) {
      alert('Por favor, selecione um ficheiro de imagem válido.');
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResultBlob(null);
  }, []);

  const clear = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    setResultBlob(null);
  }, []);

  const processImage = useCallback(async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const blob = await ImageService.processImage(file, options);
      setResultBlob(blob);
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao processar a imagem.');
    } finally {
      setIsProcessing(false);
    }
  }, [file, options]);

  const download = useCallback(() => {
    if (!resultBlob || !file) return;
    ImageService.downloadBlob(resultBlob, file.name, options.format);
  }, [resultBlob, file, options.format]);

  return {
    file,
    previewUrl,
    isProcessing,
    resultBlob,
    options,
    setOptions,
    handleFileSelect,
    clear,
    processImage,
    download,
    formatBytes: ImageService.formatBytes
  };
};