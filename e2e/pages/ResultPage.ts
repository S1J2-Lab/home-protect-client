import type { Page } from '@playwright/test';
import { MOCK_ANALYSIS_RESULT, MOCK_SESSION_ID } from '../fixtures/mockData';

export class ResultPagePOM {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get detailTab() {
    return this.page.getByRole('button', { name: '상세 분석' });
  }

  get checklistTab() {
    return this.page.getByRole('button', { name: '체크리스트' });
  }

  get pdfSaveButton() {
    return this.page.getByRole('button', { name: 'PDF 저장' });
  }

  get registryDetailButton() {
    return this.page.getByRole('button', { name: '전체보기 >' }).first();
  }

  get contractDetailButton() {
    return this.page.getByRole('button', { name: '전체보기 >' }).nth(1);
  }

  // result.spec.ts 단독 실행 시: sessionStorage에 sessionId와 분석 결과를 직접 심고 이동
  // analysisResult가 있으면 ResultPage가 API 호출 없이 storage에서 바로 읽어온다
  async goto(sessionId = MOCK_SESSION_ID) {
    const resultData = MOCK_ANALYSIS_RESULT.data;
    await this.page.addInitScript(
      ({ id, result, sessionKey, resultKey }) => {
        sessionStorage.setItem(sessionKey, id);
        sessionStorage.setItem(resultKey, JSON.stringify(result));
      },
      {
        id: sessionId,
        result: resultData,
        sessionKey: 'analysisSessionId',
        resultKey: 'analysisResult',
      },
    );
    await this.page.goto('/result');
  }

  // sessionId만 심고 이동 — /analysis/result API 호출 경로 테스트용
  async gotoWithSessionOnly(sessionId = MOCK_SESSION_ID) {
    await this.page.addInitScript(
      ({ id, key }) => sessionStorage.setItem(key, id),
      { id: sessionId, key: 'analysisSessionId' },
    );
    await this.page.goto('/result');
  }

  // 아무것도 심지 않고 이동 — 세션 없는 에러 케이스
  async gotoWithoutSession() {
    await this.page.goto('/result');
  }
}
