import React from 'react';
import { QrCode, Link2, Wifi, Contact, Type, Download, Palette } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useQRCodeBuilder } from './hooks/useQRCodeBuilder';
import { useLanguage } from '@/contexts/LanguageContext';

export const QRCodeTool: React.FC = () => {
  const { t } = useLanguage();
  const { 
    activeTab, setActiveTab, fgColor, setFgColor, bgColor, setBgColor, 
    urlData, setUrlData, textData, setTextData, wifiData, setWifiData, 
    vcardData, setVcardData, qrValue, handleDownload 
  } = useQRCodeBuilder();

  const tabs = [
    { id: 'url', label: t('qr_tab_link' as any), icon: Link2 },
    { id: 'wifi', label: t('qr_tab_wifi' as any), icon: Wifi },
    { id: 'vcard', label: t('qr_tab_vcard' as any), icon: Contact },
    { id: 'text', label: t('qr_tab_text' as any), icon: Type },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card 
        title={t('tool_qr-code-studio_name' as any)} 
        description={t('tool_qr-code-studio_desc' as any)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon size={16} /> {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="min-h-[250px]">

              {activeTab === 'url' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('qr_url_label' as any)}</label>
                  <input 
                    type="url" value={urlData} onChange={e => setUrlData(e.target.value)}
                    placeholder="https://hub.azlehq.com"
                    className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              )}

              {activeTab === 'wifi' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-left-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('qr_wifi_ssid' as any)}</label>
                    <input 
                      type="text" value={wifiData.ssid} onChange={e => setWifiData({...wifiData, ssid: e.target.value})}
                      className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('qr_wifi_pass' as any)}</label>
                    <input 
                      type="password" value={wifiData.password} onChange={e => setWifiData({...wifiData, password: e.target.value})}
                      className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('qr_wifi_sec' as any)}</label>
                    <select 
                      value={wifiData.encryption} onChange={e => setWifiData({...wifiData, encryption: e.target.value as any})}
                      className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-slate-100"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">{t('qr_wifi_sec_none' as any)}</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'vcard' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-left-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('qr_vcard_name' as any)}</label>
                    <input type="text" value={vcardData.name} onChange={e => setVcardData({...vcardData, name: e.target.value})} className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('qr_vcard_phone' as any)}</label>
                    <input type="tel" value={vcardData.phone} onChange={e => setVcardData({...vcardData, phone: e.target.value})} className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('qr_vcard_email' as any)}</label>
                    <input type="email" value={vcardData.email} onChange={e => setVcardData({...vcardData, email: e.target.value})} className="w-full p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100" />
                  </div>
                </div>
              )}

              {activeTab === 'text' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('qr_text_label' as any)}</label>
                  <textarea 
                    value={textData} onChange={e => setTextData(e.target.value)}
                    placeholder={t('qr_text_placeholder' as any)}
                    className="w-full h-32 p-3 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              )}

            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Palette size={18}/> {t('qr_design' as any)}
              </h4>
              <div className="flex gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block">{t('qr_color_fg' as any)}</label>
                  <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-14 h-10 p-1 bg-white border border-slate-200 rounded cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block">{t('qr_color_bg' as any)}</label>
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-14 h-10 p-1 bg-white border border-slate-200 rounded cursor-pointer" />
                </div>
              </div>
            </div>

          </div>

          <div className="flex flex-col items-center space-y-6 lg:border-l border-slate-200 dark:border-slate-800 lg:pl-8">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 w-full text-center lg:text-left">{t('qr_preview' as any)}</h4>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex justify-center items-center w-full aspect-square max-w-[280px]">
              {qrValue ? (
                <QRCodeSVG
                  id="azlehub-qrcode"
                  value={qrValue}
                  size={256}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level="H"
                  includeMargin={false}
                  className="w-full h-auto"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 space-y-2 h-full">
                  <QrCode size={48} className="opacity-20" />
                  <p className="text-sm font-medium">{t('qr_waiting' as any)}</p>
                </div>
              )}
            </div>

            <Button 
              onClick={handleDownload} 
              disabled={!qrValue}
              className="w-full max-w-[280px]"
              icon={Download}
            >
              {t('qr_export_svg' as any)}
            </Button>
            
            <p className="text-xs text-center text-slate-500 max-w-[280px]">
              {t('qr_export_hint' as any)}
            </p>
          </div>

        </div>
      </Card>
    </div>
  );
};