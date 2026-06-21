import type { Page } from '@playwright/test';
import { MOCK_SESSION_ID } from '../fixtures/mockData';

export class AnalyzingPagePOM {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get retryButton() {
    return this.page
      .getByRole('button', { name: '다시 분석하기' })
      .or(this.page.getByRole('button', { name: '정보 다시 입력하기' }));
  }

  get errorView() {
    return this.page.getByRole('button', { name: /다시/ });
  }

  // analyzing.spec.ts 단독 실행 시: 앞 단계(InputPage)가 없어 sessionStorage가 비어있으므로 직접 심고 이동
  // flow.spec.ts 전체 플로우 실행 시: InputPage에서 이미 저장되므로 이 메서드 불필요
  // addInitScript로 페이지 로드 전에 sessionStorage를 설정해 blocker와 충돌을 피한다
  async goto(sessionId = MOCK_SESSION_ID) {
    await this.page.addInitScript(
      ({ id, key }) => sessionStorage.setItem(key, id),
      { id: sessionId, key: 'analysisSessionId' },
    );
    await this.page.goto('/analyze');
  }

  get headerBackButton() {
    return this.page.getByRole('button', { name: '이전', exact: true });
  }

  // sessionId 없이 직접 접근하는 에러 케이스 (A-01)
  async gotoWithoutSession() {
    await this.page.goto('/analyze');
  }
}
