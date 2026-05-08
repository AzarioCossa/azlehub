export type QRType = 'url' | 'wifi' | 'vcard' | 'text';

export interface WiFiData {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardData {
  name: string;
  phone: string;
  email: string;
  company: string;
}

export const QRFormatService = {
  formatWiFi: (data: WiFiData): string => {
    if (!data.ssid) return '';
    const hiddenStr = data.hidden ? 'true' : 'false';
    const passStr = data.password ? data.password : '';
    return `WIFI:T:${data.encryption};S:${data.ssid};P:${passStr};H:${hiddenStr};;`;
  },

  formatVCard: (data: VCardData): string => {
    if (!data.name && !data.phone) return '';
    return `BEGIN:VCARD
VERSION:3.0
N:${data.name}
FN:${data.name}
ORG:${data.company}
TEL;TYPE=cell:${data.phone}
EMAIL;TYPE=work:${data.email}
END:VCARD`;
  },

  downloadSVG: (svgElementId: string, filename: string) => {
    const svg = document.getElementById(svgElementId);
    if (!svg) return;

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};