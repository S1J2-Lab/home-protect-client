import {
  FileSearchCorner,
  Building2,
  ChartNoAxesCombined,
  ListChecks,
  ShieldAlert,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FeatureItem {
  title: string;
  desc: string;
  Icon: LucideIcon;
}

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    title: '등기부등본 분석',
    desc: '권리 관계를\n꼼꼼히 분석해요.',
    Icon: FileSearchCorner,
  },
  {
    title: '건축물 정보',
    desc: '위반 여부와 용도를\n확인해요.',
    Icon: Building2,
  },
  {
    title: '전세가율 체크',
    desc: '매매가 대비\n위험도를 평가해요.',
    Icon: ChartNoAxesCombined,
  },
  {
    title: '체크리스트',
    desc: '꼭 확인할 항목을\n정리해드려요.',
    Icon: ListChecks,
  },
  {
    title: '위험도 진단',
    desc: 'AI가 종합 판단해\n주의사항을 알려드려요.',
    Icon: ShieldAlert,
  },
];
