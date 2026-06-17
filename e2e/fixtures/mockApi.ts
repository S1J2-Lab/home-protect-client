import type { Page } from '@playwright/test';
import {
  MOCK_ANALYSIS_RESULT,
  MOCK_ADDRESS_RESULTS,
  MOCK_SESSION_ID,
  MOCK_REGISTRY_SESSION_ID,
  MOCK_CONTRACT_SESSION_ID,
} from './mockData';

const SSE_COMPLETE_BODY = [
  'data: {"step":"jeonseRatio","status":"done"}',
  '',
  'data: {"step":"registryParse","status":"done"}',
  '',
  'data: {"step":"contractReview","status":"done"}',
  '',
  'data: {"step":"buildingCheck","status":"done"}',
  '',
  'data: {"step":"complete"}',
  '',
].join('\n');

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
};

export async function mockAllApis(page: Page) {
  await page.route('**/address/search**', (route) =>
    route.fulfill({ json: MOCK_ADDRESS_RESULTS }),
  );

  await page.route('**/analysis/init', (route) =>
    route.fulfill({
      json: { status: 'success', data: { sessionId: MOCK_SESSION_ID } },
    }),
  );

  await page.route('**/documents/ocr/registry', (route) =>
    route.fulfill({
      json: {
        status: 'success',
        data: { registrySessionId: MOCK_REGISTRY_SESSION_ID, safe: true },
      },
    }),
  );

  await page.route('**/documents/ocr/contract', (route) =>
    route.fulfill({
      json: {
        status: 'success',
        data: { contractSessionId: MOCK_CONTRACT_SESSION_ID, safe: true },
      },
    }),
  );

  await page.route('**/analysis/run', (route) =>
    route.fulfill({
      json: {
        status: 'success',
        data: { sessionId: MOCK_SESSION_ID, analysisStatus: 'processing' },
      },
    }),
  );

  await page.route('**/analysis/stream**', (route) =>
    route.fulfill({
      status: 200,
      headers: SSE_HEADERS,
      body: SSE_COMPLETE_BODY,
    }),
  );

  await page.route('**/analysis/result**', (route) =>
    route.fulfill({ json: MOCK_ANALYSIS_RESULT }),
  );
}

export async function mockOcrPiiDetected(page: Page, endpoint: string) {
  await page.route(endpoint, (route) =>
    route.fulfill({
      status: 400,
      json: {
        status: 'error',
        error: {
          code: 'PII_DETECTED',
          message: '개인정보가 감지되었습니다. 가린 뒤 다시 업로드해주세요.',
          field: 'file',
          nonMasked: ['주민등록번호', '전화번호'],
        },
      },
    }),
  );
}

export async function mockOcrFailed(page: Page, endpoint: string) {
  await page.route(endpoint, (route) =>
    route.fulfill({
      status: 422,
      json: {
        status: 'error',
        error: {
          code: 'OCR_FAILED',
          message:
            '이미지를 판독할 수 없어요. 더 선명한 사진으로 다시 업로드해주세요.',
          field: 'file',
        },
      },
    }),
  );
}

export async function mockAnalysisStreamError(page: Page) {
  await page.route('**/analysis/stream**', (route) =>
    route.fulfill({
      status: 200,
      headers: SSE_HEADERS,
      body: 'data: {"step":"error","errorCode":"API_UNAVAILABLE"}\n\n',
    }),
  );
}

export async function mockAnalysisResultExpired(page: Page) {
  await page.route('**/analysis/result**', (route) =>
    route.fulfill({
      status: 404,
      json: {
        status: 404,
        code: 'SESSION_EXPIRED',
        message:
          '분석 결과가 만료되었어요. (30분 초과) 처음부터 다시 분석해주세요.',
      },
    }),
  );
}

export async function mockAnalysisInitFailed(page: Page) {
  await page.route('**/analysis/init', (route) =>
    route.fulfill({
      status: 500,
      json: { message: '서버 오류가 발생했어요.' },
    }),
  );
}
