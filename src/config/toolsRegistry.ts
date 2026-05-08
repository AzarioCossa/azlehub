import { Fingerprint, Type, LucideIcon, FileStack } from 'lucide-react';
import { UUIDGeneratorTool } from '@/modules/uuid/UUIDGeneratorTool';
import { TextAnalyzerTool } from '@/modules/text/TextAnalyzerTool';
import { PDFMergerTool } from '@/modules/pdf/PDFMergerTool';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  component: React.ComponentType;
}

export const TOOLS_REGISTRY: Tool[] = [
  {
    id: 'uuid-gen',
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
  }
];
