import type { Page } from '@playwright/test';

export class LandingPagePOM {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get heroTitle() {
    return this.page.getByRole('heading', { level: 1 });
  }

  get ctaButton() {
    return this.page.getByRole('button', { name: '분석 시작하기' });
  }

  async goto() {
    await this.page.goto('/');
  }
}
