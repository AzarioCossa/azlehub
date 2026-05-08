export interface DecodedJWT {
  isValid: boolean;
  header?: any;
  payload?: any;
  signature?: string;
  isExpired?: boolean;
  error?: string;
}

export const JWTService = {
  decode: (token: string): DecodedJWT => {
    if (!token || typeof token !== 'string') {
      return { isValid: false, error: 'Token vazio.' };
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return { isValid: false, error: 'Formato inválido. Um JWT deve ter 3 partes separadas por pontos.' };
    }

    try {

      const decodeBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

        const pad = base64.length % 4;
        if (pad) {
          if (pad === 1) throw new Error('Base64 inválido');
          base64 += new Array(5 - pad).join('=');
        }

        const jsonPayload = decodeURIComponent(
          window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join('')
        );
        return JSON.parse(jsonPayload);
      };

      const header = decodeBase64Url(parts[0]);
      const payload = decodeBase64Url(parts[1]);
      const signature = parts[2];

      let isExpired = false;
      if (payload && payload.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        isExpired = payload.exp < currentTime;
      }

      return { isValid: true, header, payload, signature, isExpired };
    } catch (error) {
      return { isValid: false, error: 'Falha ao decodificar. A assinatura ou o formato (Base64) não são válidos.' };
    }
  }
};