export interface ConversionOptions {
  format: 'image/jpeg' | 'image/png' | 'image/webp';
  quality: number; // 0.0 a 1.0
}

export const ImageService = {

  processImage: (file: File, options: ConversionOptions): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Falha ao inicializar o Canvas 2D'));
          return;
        }

        if (options.format === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Falha na conversão da imagem'));
          },
          options.format,
          options.quality
        );

        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Ficheiro de imagem inválido ou corrompido'));
      };

      img.src = url;
    });
  },

  downloadBlob: (blob: Blob, originalName: string, format: string) => {
    const extension = format.split('/')[1];

    const newName = originalName.replace(/\.[^/.]+$/, "") + `-otimizado.${extension}`;
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = newName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  formatBytes: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};