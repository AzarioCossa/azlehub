import { Fingerprint, Type, LucideIcon, FileStack, Link2, Image as ImageIcon, QrCode, Terminal, Key, Hash } from 'lucide-react';
import { UUIDGeneratorTool } from '@/modules/uuid/UUIDGeneratorTool';
import { TextAnalyzerTool } from '@/modules/text/TextAnalyzerTool';
import { PDFMergerTool } from '@/modules/pdf/PDFMergerTool';
import { URLParserTool } from '@/modules/url/URLParserTool';
import { ImageConverterTool } from '@/modules/image/ImageConverterTool';
import { QRCodeTool } from '@/modules/qrcode/QRCodeTool';
import { ChmodCalculatorTool } from '@/modules/linux/ChmodCalculatorTool';
import { JWTDecoderTool } from '@/modules/jwt/JWTDecoderTool';
import { HashCalculatorTool } from '@/modules/hash/HashCalculatorTool';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  component: React.ComponentType;
}

export const TOOLS_REGISTRY: Tool[] = [
  {
    id: 'uuid-generator',
    name: 'Gerador de UUID',
    description: 'Crie identificadores únicos universais (v4) instantaneamente.',
    icon: Fingerprint,
    component: UUIDGeneratorTool
  },
  {
    id: 'text-analyzer',
    name: 'Analisador de Texto',
    description: 'Converta texto para slug e obtenha estatísticas.',
    icon: Type,
    component: TextAnalyzerTool
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Junte múltiplos ficheiros PDF num só localmente, sem enviar para servidores.',
    icon: FileStack,
    component: PDFMergerTool
  },
  {
    id: 'url-parser',
    name: 'URL Parser',
    description: 'Decodifique URLs complexas e analise os seus parâmetros (query strings) de forma legível.',
    icon: Link2,
    component: URLParserTool
  },
  {
    id: 'image-converter',
    name: 'Otimizador de Imagem',
    description: 'Comprima fotos ou converta formatos (WEBP/PNG/JPG) com privacidade total e sem limites de uso.',
    icon: ImageIcon,
    component: ImageConverterTool
  },
  {
    id: 'qrcode-generator',
    name: 'QR Code Studio',
    description: 'Crie QR Codes dinâmicos para Links, Wi-Fi e Cartões de Visita. Exporte em vetor (SVG) sem perdas.',
    icon: QrCode,
    component: QRCodeTool
  },
  {
    id: 'chmod-calculator',
    name: 'Chmod Calculator',
    description: 'Calculadora bidirecional de permissões Linux. Converta caixas de seleção em números octais ou comandos simbólicos.',
    icon: Terminal,
    component: ChmodCalculatorTool
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Cole um token JWT para inspecionar os cabeçalhos, o payload de dados e verificar a data de expiração.',
    icon: Key,
    component: JWTDecoderTool
  },
  {
  id: 'hash-calculator',
  name: 'Calculadora de Hash',
  description: 'Gere hashes MD5, SHA-1, SHA-256 e outros...',
  icon: Hash,
  component: HashCalculatorTool
}
];
