import type { AnalysisStep } from '../types/analysis';

export const INITIAL_ANALYSIS_STEPS: AnalysisStep[] = [
  {
    id: 'jeonseRatio',
    title: '전세가율 확인 중',
    description: '보증금과 시세 정보를 비교 분석하고 있어요',
    status: 'loading',
  },

  {
    id: 'registryParse',
    title: '등기부 분석 중',
    description: '근저당, 가압류 등 권리관계를 검토하고 있어요',
    status: 'pending',
  },
  {
    id: 'contractReview',
    title: '계약서 분석 중',
    description: '특이조항 및 법률 검토를 진행하고 있어요',
    status: 'pending',
  },
  {
    id: 'buildingInfo',
    title: '건축물 정보 확인 중',
    description: '건축물대장 기반의 건물 정보를 확인하고 있어요',
    status: 'pending',
  },
  {
    id: 'report',
    title: 'AI 리포트 생성 중',
    description: '분석 결과를 종합하여 리포트를 구성하고 있어요',
    status: 'pending',
  },
];
