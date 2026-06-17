import type { Page } from '@playwright/test';

export class ResultPagePOM {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get detailTab() {
    return this.page.getByRole('tab', { name: '상세 분석' });
  }

  get checklistTab() {
    return this.page.getByRole('tab', { name: '체크리스트' });
  }

  get pdfSaveButton() {
    return this.page.getByRole('button', { name: 'PDF 저장' });
  }

  get registryDetailLink() {
    return this.page.getByRole('button', { name: '등기 상세 보기' });
  }

  get contractDetailLink() {
    return this.page.getByRole('button', { name: '계약 상세 보기' });
  }

  async goto() {
    await this.page.goto('/result');
  }
}
