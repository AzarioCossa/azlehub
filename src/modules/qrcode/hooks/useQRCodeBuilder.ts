import { useState, useMemo, useCallback } from 'react';
import { QRFormatService, QRType, WiFiData, VCardData } from '../services/QRFormatService';

export const useQRCodeBuilder = () => {
  const [activeTab, setActiveTab] = useState<QRType>('url');

  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [size, setSize] = useState(256);

  const [urlData, setUrlData] = useState('https://hub.azlehq.com');
  const [textData, setTextData] = useState('');
  const [wifiData, setWifiData] = useState<WiFiData>({ ssid: '', password: '', encryption: 'WPA', hidden: false });
  const [vcardData, setVcardData] = useState<VCardData>({ name: '', phone: '', email: '', company: '' });

  const qrValue = useMemo(() => {
    switch (activeTab) {
      case 'url': return urlData;
      case 'text': return textData;
      case 'wifi': return QRFormatService.formatWiFi(wifiData);
      case 'vcard': return QRFormatService.formatVCard(vcardData);
      default: return '';
    }
  }, [activeTab, urlData, textData, wifiData, vcardData]);

  const handleDownload = useCallback(() => {
    QRFormatService.downloadSVG('azlehub-qrcode', 'qrcode-premium');
  }, []);

  return {
    activeTab, setActiveTab,
    fgColor, setFgColor, bgColor, setBgColor, size, setSize,
    urlData, setUrlData, textData, setTextData, wifiData, setWifiData, vcardData, setVcardData,
    qrValue, handleDownload
  };
};