export type ContractType = 'jeonse' | 'half_jeonse' | 'monthly';

export const CONTRACT_TYPES = [
  { value: 'jeonse', label: '전세' },
  { value: 'half_jeonse', label: '반전세' },
  { value: 'monthly', label: '월세' },
] as const;
