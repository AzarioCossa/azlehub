export interface TextStats {
  chars: number;
  words: number;
  lines: number;
}

export const TextAnalysisService = {
  analyze: (text: string): TextStats => {
    if (!text) return { chars: 0, words: 0, lines: 0 };
    return {
      chars: text.length,
      words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
      lines: text.split(/\r\n|\r|\n/).length
    };
  },
  
  toSlug: (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};