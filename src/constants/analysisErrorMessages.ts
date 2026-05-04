import type { AnalysisErrorCode } from '../types/analysis';

interface AnalysisErrorMessage {
  title: string;
  description: string;
  guide: string;
  buttonText: string;
}

export const ANALYSIS_ERROR_MESSAGES: Record<
  AnalysisErrorCode,
  AnalysisErrorMessage
> = {
  API_UNAVAILABLE: {
    title: '분석을 완료하지 못했어요',
    description: '공공데이터 서버가 일시적으로 응답하지 않고 있어요.',
    guide:
      '네트워크 또는 서버 문제로 일부 데이터를 불러오지 못했어요. 잠시 후 다시 시도해주세요.',
    buttonText: '다시 분석하기',
  },
  ANALYSIS_TIMEOUT: {
    title: '분석 시간이 초과됐어요',
    description: '요청이 많아 처리가 지연되고 있어요.',
    guide:
      '분석 시간이 예상보다 오래 걸리고 있어요. 다시 분석하면 정상적으로 진행될 수 있어요.',
    buttonText: '다시 분석하기',
  },
  INVALID_ADDRESS: {
    title: '주소를 다시 확인해주세요',
    description: '입력한 주소로 건축물 정보를 조회할 수 없어요.',
    guide:
      '오타 또는 잘못된 주소일 수 있어요. 정확한 주소를 다시 입력해주세요.',
    buttonText: '주소 확인하기',
  },
  AI_PARSE_FAILED: {
    title: 'AI 분석 중 오류가 발생했어요',
    description: '분석 결과를 정리하는 중 문제가 발생했어요.',
    guide: '일시적인 응답 처리 오류일 수 있어요. 다시 분석을 시도해주세요.',
    buttonText: '다시 분석하기',
  },

  NETWORK_ERROR: {
    title: '연결이 불안정해요',
    description: '분석 서버와 연결하지 못했어요.',
    guide: '네트워크 상태를 확인한 뒤 다시 분석을 시도해주세요.',
    buttonText: '다시 분석하기',
  },
};
