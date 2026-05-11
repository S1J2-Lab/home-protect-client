export interface Mortgage {
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
