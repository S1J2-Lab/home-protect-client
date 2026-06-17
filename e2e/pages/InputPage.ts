import path from 'path';
import type { Page } from '@playwright/test';

const FIXTURES_DIR = path.join(__dirname, '../fixtures/testFiles');

export const TEST_FILES = {
  registry: path.join(FIXTURES_DIR, 'registry.pdf'),
  contract: path.join(FIXTURES_DIR, 'contract.pdf'),
  contractWithPii: path.join(FIXTURES_DIR, 'contract-with-pii.pdf'),
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

  get startDateButton() {
    return this.page.getByRole('button', { name: '연도-월-일' }).first();
  }

  get endDateButton() {
    return this.page.getByRole('button', { name: '연도-월-일' }).last();
  }

  get monthlyRentField() {
    return this.page.getByLabel('월세');
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

  async goToStep2() {
    await this.searchAddress('테헤란로');
    await this.addressResults.click();
    await this.nextButton.click();
  }

  async fillContractForm() {
    await this.depositInput.fill('30000');

    await this.startDateButton.click();
    await this.page
      .locator(
        '.react-datepicker__day:not(.react-datepicker__day--outside-month)',
      )
      .first()
      .click();

    await this.endDateButton.click();
    await this.page
      .locator(
        '.react-datepicker__day:not(.react-datepicker__day--outside-month)',
      )
      .last()
      .click();
  }
}
