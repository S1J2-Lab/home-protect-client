import { test, expect } from '@playwright/test';
import { ResultPagePOM } from './pages/ResultPage';
import { mockAllApis, mockAnalysisResultExpired } from './fixtures/mockApi';

test.describe('ResultPage — 정상 흐름', () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
  });

  // R-01
  test('결과 페이지에 접근하면 주소와 분석일이 표시된다', async ({ page }) => {
    const result = new ResultPagePOM(page);
    await result.goto();

    await expect(
      page.getByText('서울특별시 강남구 테헤란로 123 (역삼동)').first(),
    ).toBeVisible();
    await expect(page.getByText(/분석일/).first()).toBeVisible();
  });

  // R-02
  test('기본 탭은 "상세 분석"이고 분석 카드가 표시된다', async ({ page }) => {
    const result = new ResultPagePOM(page);
    await result.goto();

    await expect(result.detailTab).toBeVisible();
    await expect(page.getByText('전세가율').first()).toBeVisible();
    await expect(page.getByText('등기부등본 분석').first()).toBeVisible();
    await expect(page.getByText('임대차계약서 분석').first()).toBeVisible();
  });

  // R-03
  test('"체크리스트" 탭을 누르면 체크리스트가 표시된다', async ({ page }) => {
    const result = new ResultPagePOM(page);
    await result.goto();

    await result.checklistTab.click();

    await expect(page.getByText('체크리스트').first()).toBeVisible();
  });

  // R-04
  test('PDF 저장 버튼이 표시된다', async ({ page }) => {
    const result = new ResultPagePOM(page);
    await result.goto();

    await expect(result.pdfSaveButton).toBeVisible();
  });

  // R-05
  test('sessionId만 있을 때 API를 호출해 결과를 표시한다', async ({ page }) => {
    const result = new ResultPagePOM(page);
    await result.gotoWithSessionOnly();

    await expect(
      page.getByText('서울특별시 강남구 테헤란로 123 (역삼동)').first(),
    ).toBeVisible();
  });
});

test.describe('ResultPage — 상세 페이지 이동', () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
  });

  // R-06
  test('등기부등본 "전체보기"를 누르면 /result/registry로 이동한다', async ({
    page,
  }) => {
    const result = new ResultPagePOM(page);
    await result.goto();

    await expect(result.registryDetailButton).toBeVisible();
    await result.registryDetailButton.click();

    await expect(page).toHaveURL('/result/registry');
  });

  // R-07
  test('/result/registry에서 등기부 전체 분석 내용이 표시된다', async ({
    page,
  }) => {
    const result = new ResultPagePOM(page);
    await result.goto();

    await result.registryDetailButton.click();

    await expect(page.getByText('등기부등본 전체 분석')).toBeVisible();
  });

  // R-08
  test('임대차계약서 "전체보기"를 누르면 /result/contract로 이동한다', async ({
    page,
  }) => {
    const result = new ResultPagePOM(page);
    await result.goto();

    await expect(result.contractDetailButton).toBeVisible();
    await result.contractDetailButton.click();

    await expect(page).toHaveURL('/result/contract');
  });

  // R-09
  test('/result/registry에 직접 접근해도 storage에서 데이터를 복원해 표시한다', async ({
    page,
  }) => {
    const result = new ResultPagePOM(page);
    // /result에 먼저 접근해 analysisResult를 sessionStorage에 저장한 뒤 직접 이동
    await result.goto();
    await page.goto('/result/registry');

    await expect(page.getByText('등기부등본 전체 분석')).toBeVisible();
  });
});

test.describe('ResultPage — 에러 처리', () => {
  // R-10
  test('세션 없이 직접 접근하면 에러 메시지가 표시된다', async ({ page }) => {
    await mockAllApis(page);
    const result = new ResultPagePOM(page);
    await result.gotoWithoutSession();

    await expect(
      page.getByText('결과를 불러오지 못했어요').first(),
    ).toBeVisible();
  });

  // R-11
  test('세션이 만료되었을 때 에러 메시지가 표시된다', async ({ page }) => {
    await mockAllApis(page);
    await mockAnalysisResultExpired(page);

    const result = new ResultPagePOM(page);
    await result.gotoWithSessionOnly();

    await expect(page.getByText('결과를 불러오지 못했어요')).toBeVisible();
  });
});
