import type { JeonseRatioData } from './jeonse';
import type { RegistryData } from './registry';
import type { BuildingData } from './building';
import type { ContractData } from './contract';

export interface ResultData {
  address: string;
  analyzedAt: string;
  jeonseRatio: JeonseRatioData;
  registry: RegistryData;
  building: BuildingData;
  contract: ContractData;
}

export interface ResultResponse {
  status: 'success';
  data: ResultData;
}
