import { test, expect } from '@playwright/test';
import { LandingPagePOM } from './pages/LandingPage';
import { InputPagePOM, TEST_FILES } from './pages/InputPage';
import { AnalyzingPagePOM } from './pages/AnalyzingPage';
import { mockAllApis } from './fixtures/mockApi';
import { setupEventSourceStub } from './fixtures/mockEventSource';

test.describe('전체 사용자 흐름', () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
    await setupEventSourceStub(page, 'complete');
  });

  // F-01 — 전체 정상 흐름
  test('랜딩 → 정보 입력 → 분석 → 결과까지 전체 흐름이 동작한다', async ({
    page,
  }) => {
    const landing = new LandingPagePOM(page);
    const input = new InputPagePOM(page);

    // 랜딩 → /input
    await landing.goto();
    await landing.ctaButton.click();
    await expect(page).toHaveURL('/input');

    // Step 1 — 주소
    await input.searchAddress('테헤란로');
    await input.addressResults.click();
    await input.nextButton.click();

    // Step 2 — 계약 정보
    await input.fillContractForm();
    await input.nextButton.click();

    // Step 3 — 서류 업로드 및 제출
    await input.registryFileInput.setInputFiles(TEST_FILES.registry);
    await page
      .getByRole('button', { name: '이 순서로 확정하기' })
      .first()
      .click();
    await expect(
      page.getByRole('button', { name: '순서 변경하기' }).first(),
    ).toBeVisible();
    await input.contractFileInput.setInputFiles(TEST_FILES.contract);
    await page.getByRole('button', { name: '이 순서로 확정하기' }).click();
    await expect(
      page.getByRole('button', { name: '순서 변경하기' }).last(),
    ).toBeVisible();
    await input.ownerVerifyToggle.click();
    await input.submitButton.click();

    // /analyze → /result 자동 이동
    await expect(page).toHaveURL('/analyze');
    await expect(page).toHaveURL('/result', { timeout: 5000 });
  });

  // F-02 — sessionStorage 연속성
  test('제출 후 sessionId가 분석 페이지까지 전달된다', async ({ page }) => {
    const input = new InputPagePOM(page);

    await page.goto('/input');
    await input.searchAddress('테헤란로');
    await input.addressResults.click();
    await input.nextButton.click();
    await input.fillContractForm();
    await input.nextButton.click();
    await input.registryFileInput.setInputFiles(TEST_FILES.registry);
    await page
      .getByRole('button', { name: '이 순서로 확정하기' })
      .first()
      .click();
    await expect(
      page.getByRole('button', { name: '순서 변경하기' }).first(),
    ).toBeVisible();
    await input.contractFileInput.setInputFiles(TEST_FILES.contract);
    await page.getByRole('button', { name: '이 순서로 확정하기' }).click();
    await expect(
      page.getByRole('button', { name: '순서 변경하기' }).last(),
    ).toBeVisible();
    await input.ownerVerifyToggle.click();
    await input.submitButton.click();

    await expect(page).toHaveURL('/analyze');

    const sessionId = await page.evaluate(() =>
      sessionStorage.getItem('analysisSessionId'),
    );
    expect(sessionId).not.toBeNull();
  });

  // F-03 — 결과 페이지 새로고침 시 storage에서 복원
  test('결과 페이지를 새로고침해도 분석 결과가 유지된다', async ({ page }) => {
    const analyzing = new AnalyzingPagePOM(page);
    await analyzing.goto();
    await expect(page).toHaveURL('/result', { timeout: 5000 });

    await page.reload();

    await expect(
      page.getByText('서울특별시 강남구 테헤란로 123 (역삼동)').first(),
    ).toBeVisible();
  });
});
