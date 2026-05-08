export interface ParsedURL {
  isValid: boolean;
  protocol: string;
  host: string;
  pathname: string;
  params: Array<{ key: string; value: string }>;
  hash: string;
  original: string;
}

export const URLService = {
  parse(urlString: string): ParsedURL {
    try {
      const urlToParse = urlString.includes('://') ? urlString : `http://${urlString}`;
      const url = new URL(urlToParse);
      
      const params = Array.from(url.searchParams.entries()).map(([key, value]) => ({
        key,
        value
      }));

      return {
        isValid: true,
        protocol: url.protocol.replace(':', ''),
        host: url.host,
        pathname: url.pathname,
        params,
        hash: url.hash,
        original: urlString
      };
    } catch {
      return {
        isValid: false,
        protocol: '',
        host: '',
        pathname: '',
        params: [],
        hash: '',
        original: urlString
      };
    }
  },

  build(protocol: string, host: string, pathname: string, params: Array<{key: string, value: string}>): string {
    if (!host) return '';
    try {
      const url = new URL(`${protocol || 'http'}://${host}${pathname}`);
      params.forEach(p => {
        if (p.key) url.searchParams.append(p.key, p.value);
      });
      return url.toString();
    } catch {
      return '';
    }
  }
};