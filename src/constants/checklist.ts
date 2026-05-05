import type { ChecklistItem } from '../types/checklist';

export const COMMON_CHECKLIST: ChecklistItem[] = [
  {
    id: 'tax-payment-certificate',
    title: '국세·지방세 완납증명서 요청',
    description:
      '임대인의 세금 체납 여부는 자동으로 확인하기 어려워요. 계약 전 완납증명서를 요청해 확인하세요.',
  },
  {
    id: 'licensed-realtor-check',
    title: '공인중개사 자격 확인',
    description:
      '계약을 진행하는 중개사가 실제 등록된 공인중개사인지 확인하고, 중개사무소 정보도 함께 비교해보세요.',
  },
  {
    id: 'resident-registration-check',
    title: '전입세대 열람 여부 확인',
    description:
      '해당 주택에 먼저 전입한 세대가 있는지 직접 열람해 선순위 임차인 여부를 확인하세요.',
  },
  {
    id: 'payment-account',
    title: '계약금·보증금 송금 계좌 확인',
    description:
      '계약금과 보증금은 반드시 임대인 또는 소유자 명의 계좌로 송금하세요.',
  },
  {
    id: 'move-in-report',
    title: '전입신고 및 확정일자 진행 계획',
    description:
      '입주 후 즉시 전입신고와 확정일자를 진행할 수 있는지 미리 확인하세요.',
  },
  {
    id: 'contract-terms',
    title: '계약서 원본·특약·해지 조건 확인',
    description:
      '계약서 원본을 보관하고, 수리비 부담·중도 해지·불리한 특약이 없는지 직접 확인하세요.',
  },
  {
    id: 'document-keep',
    title: '관련 서류 보관',
    description:
      '계약서, 영수증, 이체 내역, 확인한 증명서 등 계약 관련 서류를 안전하게 보관하세요.',
  },
  {
    id: 'insurance-and-loan',
    title: 'HUG 보증보험·전세대출 가능 여부 확인',
    description:
      'HUG 전세보증금반환보증 가입 가능 여부와 전세자금대출 조건을 계약 전에 확인하세요.',
  },
];
