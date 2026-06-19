import { test, expect } from '@playwright/test';
import { AnalyzingPagePOM } from './pages/AnalyzingPage';
import { mockAllApis } from './fixtures/mockApi';
import { setupEventSourceStub } from './fixtures/mockEventSource';

test.describe('AnalyzingPage — 정상 흐름', () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
  });

  // A-02
  test('분석이 완료되면 자동으로 결과 화면으로 이동한다', async ({ page }) => {
    await setupEventSourceStub(page, 'complete');
    const analyzing = new AnalyzingPagePOM(page);
    await analyzing.goto();

    await expect(page).toHaveURL('/result', { timeout: 5000 });
  });

  // A-03
  test('분석이 진행되는 동안 각 단계가 완료될 때마다 목록이 업데이트된다', async ({
    page,
  }) => {
    await setupEventSourceStub(page, 'partial');

    const analyzing = new AnalyzingPagePOM(page);
    await analyzing.goto();

    await expect(page.getByText('전세가율 확인 중')).toBeVisible();
    await expect(page.getByText('등기부 분석 중')).toBeVisible();
    await expect(page.getByText('계약서 분석 중')).toBeVisible();
    await expect(page.getByText('건축물 정보 확인 중')).toBeVisible();
  });
});

test.describe('AnalyzingPage — 에러 처리', () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
  });

  // A-01
  test('세션 없이 직접 접근하면 에러 화면이 표시된다', async ({ page }) => {
    const analyzing = new AnalyzingPagePOM(page);
    await analyzing.gotoWithoutSession();

    await expect(page.getByText('분석을 완료하지 못했어요')).toBeVisible();
    await expect(analyzing.errorView).toBeVisible();
  });

  // A-04
  test('분석 중 오류가 발생하면 에러 메시지와 재시도 버튼이 표시된다', async ({
    page,
  }) => {
    await setupEventSourceStub(page, 'error');

    const analyzing = new AnalyzingPagePOM(page);
    await analyzing.goto();

    await expect(page.getByText('분석을 완료하지 못했어요')).toBeVisible();
    await expect(analyzing.retryButton).toBeVisible();
  });

  // A-05
  test('재시도 버튼을 누르면 스트림 연결이 다시 시작된다', async ({ page }) => {
    await setupEventSourceStub(page, 'error');

    const analyzing = new AnalyzingPagePOM(page);
    await analyzing.goto();

    await expect(analyzing.retryButton).toBeVisible();

    // 재시도 시 정상 스트림으로 교체
    await page.evaluate(() => {
      window.__sseMessages = [
        '{"step":"jeonseRatio","status":"done"}',
        '{"step":"registryParse","status":"done"}',
        '{"step":"contractReview","status":"done"}',
        '{"step":"buildingCheck","status":"done"}',
        '{"step":"complete"}',
      ];
    });

    await page.getByRole('button', { name: '다시 분석하기' }).click();

    await expect(page).toHaveURL('/result', { timeout: 5000 });
  });

  // A-01 세부 — sessionId 없을 때 재시도 버튼 텍스트
  test('세션 없는 에러에서 재시도 버튼은 "정보 다시 입력하기"로 표시된다', async ({
    page,
  }) => {
    const analyzing = new AnalyzingPagePOM(page);
    await analyzing.gotoWithoutSession();

    await expect(
      page.getByRole('button', { name: '정보 다시 입력하기' }),
    ).toBeVisible();
  });

  // A-01 세부 — "정보 다시 입력하기" 클릭 시 /input으로 이동
  test('세션 없는 에러에서 "정보 다시 입력하기"를 누르면 /input으로 이동한다', async ({
    page,
  }) => {
    const analyzing = new AnalyzingPagePOM(page);
    await analyzing.gotoWithoutSession();

    await page.getByRole('button', { name: '정보 다시 입력하기' }).click();

    await expect(page).toHaveURL('/input');
  });
});

test.describe('AnalyzingPage — 이탈 경고', () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
  });

  // 분석 중 헤더 이전 버튼 클릭 시 경고창이 뜬다
  test('분석 중 헤더 이전 버튼을 누르면 경고창이 뜬다', async ({ page }) => {
    await setupEventSourceStub(page, 'hanging');

    const analyzing = new AnalyzingPagePOM(page);
    await analyzing.goto();

    await expect(analyzing.headerBackButton).toBeVisible();

    const dialogPromise = page.waitForEvent('dialog');
    await analyzing.headerBackButton.click();
    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('confirm');
    await dialog.dismiss();
  });

  // 분석 완료 후 자동 이동 시 경고창이 뜨지 않는다
  test('분석 완료 후 /result로 자동 이동할 때 경고창이 뜨지 않는다', async ({
    page,
  }) => {
    await setupEventSourceStub(page, 'complete');
    let dialogFired = false;
    page.on('dialog', () => {
      dialogFired = true;
    });

    const analyzing = new AnalyzingPagePOM(page);
    await analyzing.goto();

    await expect(page).toHaveURL('/result', { timeout: 5000 });
    expect(dialogFired).toBe(false);
  });
});
