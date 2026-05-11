import type { RiskLevel } from './risk';
export interface JeonseRatioData {
  ratioType: 'jeonse' | 'monthly';
  ratioPercent: number;
  riskLevel: RiskLevel;
  recentHigh: number;
  recentLow: number;
  average: number;
  convertedDeposit: number;
  sampleCount: number;
  lowReliability: boolean;
}
