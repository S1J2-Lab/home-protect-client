import { formatPrice } from './jeonseRatio';

interface Mortgage {
  bank: string;
  amount: number;
}

export interface RegistryData {
  mortgageCount: number;
  mortgages: Mortgage[];
  totalMortgage: number;
  trustWarning: boolean;
  priorLease: boolean;
  ownershipChangeRecent: boolean;
}

export interface RegistrySummaryItem {
  title: string;
  description: string;
  action: string;
}

export function getRegistrySummaryItems(registry: RegistryData) {
  return {
    dangerItems: [
      registry.trustWarning && {
        title: '신탁 등기 존재',
        description:
          '소유권이나 관리 권한이 신탁회사와 관련되어 있을 수 있어요. 임대인이 단독으로 계약할 권한이 없는 경우가 있어 주의가 필요해요.',
        action:
          '신탁원부를 확인하고, 임대인이 임대차계약을 체결할 권한이 있는지 신탁회사 동의 여부까지 확인해 주세요.',
      },
      registry.priorLease && {
        title: '선순위 임차인 있음',
        description:
          '이미 먼저 들어와 있는 임차인이 있으면, 보증금 반환 순서에서 내가 뒤로 밀릴 수 있어요.',
        action:
          '선순위 보증금 규모를 확인하고, 내 보증금까지 안전하게 회수 가능한지 추가로 검토해 주세요.',
      },
    ].filter(Boolean) as RegistrySummaryItem[],

    cautionItems: [
      registry.mortgageCount > 0 && {
        title: `근저당 ${registry.mortgageCount}건 / 총 ${formatPrice(
          registry.totalMortgage,
        )}`,
        description:
          '집에 대출 담보가 잡혀 있는 상태예요. 집이 경매로 넘어가면 근저당권자가 보증금보다 먼저 돈을 받을 수 있어요.',
        action:
          '근저당 금액과 보증금을 합쳐 집값 대비 비율이 높은지 확인하고, 말소 조건이 있다면 계약서 특약에 남겨 주세요.',
      },
      registry.ownershipChangeRecent && {
        title: '최근 소유권 변동 이력 있음',
        description:
          '최근에 집주인이 바뀐 이력이 있어요. 단기간 소유권 변동은 거래 안정성을 한 번 더 확인할 필요가 있어요.',
        action:
          '현재 소유자와 계약 상대방이 같은지 확인하고, 소유권 이전 사유와 잔금일 이후 권리 변동 가능성을 확인해 주세요.',
      },
    ].filter(Boolean) as RegistrySummaryItem[],

    safeItems: [
      !registry.trustWarning && {
        title: '신탁 등기 없음',
        description: '등기부상 신탁 관련 위험 요소가 확인되지 않았어요.',
        action:
          '계약 전 최신 등기부등본을 다시 발급해 변동 사항이 없는지만 확인해 주세요.',
      },
      !registry.priorLease && {
        title: '선순위 임차인 없음',
        description:
          '현재 확인된 정보상 보증금 반환 순서에서 앞서는 임차인이 없어요.',
        action:
          '전입세대열람 등 추가 자료로 실제 거주자 여부를 한 번 더 확인하면 좋아요.',
      },
      registry.mortgageCount === 0 && {
        title: '근저당 설정 없음',
        description: '등기부상 대출 담보로 잡힌 권리가 확인되지 않았어요.',
        action:
          '계약 직전 최신 등기부등본을 다시 확인해 새로 설정된 권리가 없는지 확인해 주세요.',
      },
      !registry.ownershipChangeRecent && {
        title: '최근 소유권 변동 없음',
        description: '최근에 집주인이 자주 바뀐 이력은 확인되지 않았어요.',
        action:
          '계약 상대방이 등기부상 현재 소유자와 일치하는지만 확인해 주세요.',
      },
    ].filter(Boolean) as RegistrySummaryItem[],
  };
}
