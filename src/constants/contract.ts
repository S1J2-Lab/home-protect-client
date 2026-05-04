export type ContractType = 'jeonse' | 'halfJeonse' | 'monthlyRent';

export const CONTRACT_TYPES = [
  { value: 'jeonse', label: '전세' },
  { value: 'halfJeonse', label: '반전세' },
  { value: 'monthlyRent', label: '월세' },
] as const;
