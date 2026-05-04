import { TextCursorInput, LoaderCircle, ReceiptText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface StepItem {
  step: number;
  title: string;
  desc: string;
  hint: string;
  Icon: LucideIcon;
}

export const STEP_ITEMS: StepItem[] = [
  {
    step: 1,
    title: '정보 입력',
    desc: '계약 정보와 부동산 정보를 입력해요.',
    hint: '계약서, 주소, 보증금',
    Icon: TextCursorInput,
  },
  {
    step: 2,
    title: '분석 진행',
    desc: 'AI가 공공데이터와 법적 정보를 분석해요.',
    hint: '평균 1~2분',
    Icon: LoaderCircle,
  },
  {
    step: 3,
    title: '결과 확인',
    desc: '위험도와 상세 분석, 주의사항을 확인해요.',
    hint: '리포트 다운로드 가능',
    Icon: ReceiptText,
  },
];
