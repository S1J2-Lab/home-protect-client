import { ShieldCheck, Lock, Bot, ReceiptText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface FooterItem {
  Icon: LucideIcon;
  title: string;
  desc: string;
}

export const FOOTER_ITEMS: FooterItem[] = [
  {
    Icon: ShieldCheck,
    title: '공공데이터 기반',
    desc: '국토부, 대법원\n공공데이터 활용',
  },
  {
    Icon: Lock,
    title: '개인정보 보호',
    desc: '안전하게 암호화\n보호돼요',
  },
  {
    Icon: Bot,
    title: 'AI 자동 분석',
    desc: '최신 AI로\n빠르고 정확하게',
  },
  {
    Icon: ReceiptText,
    title: '근거 기반 리포트',
    desc: '법적 근거와 함께\n상세 리포트 제공',
  },
];
