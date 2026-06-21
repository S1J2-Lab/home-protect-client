import { test, expect } from '@playwright/test';
import { LandingPagePOM } from './pages/LandingPage';

test.describe('LandingPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // L-01
  test('페이지를 열면 히어로 제목과 CTA 버튼이 보인다', async ({ page }) => {
    const landing = new LandingPagePOM(page);

    await expect(landing.heroTitle).toContainText('업로드하세요');
    await expect(landing.ctaButton).toBeVisible();
  });

  // L-02
  test('CTA 버튼을 누르면 정보 입력 화면으로 이동한다', async ({ page }) => {
    const landing = new LandingPagePOM(page);

    await landing.ctaButton.click();

    await expect(page).toHaveURL('/input');
  });

  // L-03
  test('스크롤하면 기능·단계·대상 소개 섹션이 순서대로 보인다', async ({
    page,
  }) => {
    await page.getByText('계약 전, 꼭 확인해야 할').scrollIntoViewIfNeeded();
    await expect(page.getByText('계약 전, 꼭 확인해야 할')).toBeInViewport();

    await page.getByText('3단계로 쉽고 간단하게!').scrollIntoViewIfNeeded();
    await expect(page.getByText('3단계로 쉽고 간단하게!')).toBeInViewport();
  });
});
