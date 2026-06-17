import type { Page } from '@playwright/test';

export const TEST_FILES = {
  registry: 'e2e/fixtures/testFiles/registry.pdf',
  contract: 'e2e/fixtures/testFiles/contract.pdf',
  contractWithPii: 'e2e/fixtures/testFiles/contract-with-pii.pdf',
};

export class InputPagePOM {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  // Step 1 — 주소
  get addressSearchInput() {
    return this.page.getByPlaceholder('서울특별시 강남구 테헤란로 123');
  }

  get addressSearchButton() {
    return this.page.getByRole('button', { name: '주소 검색' });
  }

  get addressResults() {
    return this.page.getByText('서울특별시 강남구 테헤란로 123 (역삼동)');
  }

  get emptyAddressNotice() {
    return this.page.getByText('검색 결과가 없습니다.');
  }

  // Step 2 — 계약 정보
  get depositInput() {
    return this.page.getByLabel('보증금');
  }

  get monthlyRentInput() {
    return this.page.getByLabel('월세');
  }

  get startDateInput() {
    return this.page.getByPlaceholder('연도-월-일').first();
  }

  get endDateInput() {
    return this.page.getByPlaceholder('연도-월-일').last();
  }

  // Step 3 — 파일 업로드
  get registryFileInput() {
    return this.page.locator('input[type="file"]').first();
  }

  get contractFileInput() {
    return this.page.locator('input[type="file"]').last();
  }

  get confirmButtons() {
    return this.page.getByRole('button', { name: '이 순서로 확정하기' });
  }

  get ownerVerifyToggle() {
    return this.page.getByRole('checkbox').last();
  }

  // 공통
  get nextButton() {
    return this.page.getByRole('button', { name: '다음' });
  }

  get prevButton() {
    return this.page.getByRole('button', { name: '이전' });
  }

  get submitButton() {
    return this.page.getByRole('button', { name: '다음: 분석 시작하기' });
  }

  async goto() {
    await this.page.goto('/input');
  }

  async searchAddress(keyword: string) {
    await this.addressSearchInput.fill(keyword);
    await this.addressSearchButton.click();
  }
}
