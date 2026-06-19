import { test, expect } from '@playwright/test';
import { InputPagePOM, TEST_FILES } from './pages/InputPage';
import {
  mockAllApis,
  mockAnalysisInitFailed,
  mockOcrPiiDetected,
  mockOcrFailed,
} from './fixtures/mockApi';
import { MOCK_ADDRESS_RESULTS } from './fixtures/mockData';

test.describe('InputPage — Step 1 (주소)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/input');
    await page.evaluate(() => sessionStorage.clear());
  });

  // I-01
  test('주소를 선택하지 않으면 "다음" 버튼이 비활성화된다', async ({
    page,
  }) => {
    const input = new InputPagePOM(page);

    await expect(input.nextButton).toBeDisabled();
  });

  // I-02
  test('주소를 선택하면 "다음" 버튼이 활성화된다', async ({ page }) => {
    await mockAllApis(page);
    const input = new InputPagePOM(page);

    await input.searchAddress('테헤란로');
    await input.addressResults.click();

    await expect(input.nextButton).toBeEnabled();
  });

  // I-03
  test('검색어를 입력하면 주소 목록이 나타난다', async ({ page }) => {
    await mockAllApis(page);
    const input = new InputPagePOM(page);

    await input.searchAddress('테헤란로');

    await expect(input.addressResults).toBeVisible();
  });

  // I-04
  test('검색 결과가 없으면 빈 상태 안내가 표시된다', async ({ page }) => {
    await page.route('**/address/search**', (route) =>
      route.fulfill({
        json: {
          ...MOCK_ADDRESS_RESULTS,
          data: { ...MOCK_ADDRESS_RESULTS.data, results: [], totalCount: 0 },
        },
      }),
    );
    const input = new InputPagePOM(page);

    await input.searchAddress('존재하지않는주소');

    await expect(input.emptyAddressNotice).toBeVisible();
  });
});

test.describe('InputPage — Step 2 (계약 정보)', () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
    await page.goto('/input');
    await page.evaluate(() => sessionStorage.clear());
    const input = new InputPagePOM(page);
    await input.goToStep2();
  });

  // I-05
  test('보증금이나 계약 기간을 입력하지 않으면 "다음" 버튼이 비활성화된다', async ({
    page,
  }) => {
    const input = new InputPagePOM(page);

    await expect(input.nextButton).toBeDisabled();
  });

  // I-06
  test('전세를 선택하면 월세 입력란이 사라지고, 반전세·월세를 선택하면 나타난다', async ({
    page,
  }) => {
    const input = new InputPagePOM(page);

    await expect(input.monthlyRentField).not.toBeVisible();

    await page.getByRole('button', { name: '반전세', exact: true }).click();
    await expect(input.monthlyRentField).toBeVisible();

    await page.getByRole('button', { name: '월세', exact: true }).click();
    await expect(input.monthlyRentField).toBeVisible();

    await page.getByRole('button', { name: '전세', exact: true }).click();
    await expect(input.monthlyRentField).not.toBeVisible();
  });

  // I-07
  test('모든 항목을 입력하고 "다음"을 누르면 다음 단계로 넘어간다', async ({
    page,
  }) => {
    const input = new InputPagePOM(page);

    await input.fillContractForm();
    await input.nextButton.click();

    await expect(input.submitButton).toBeVisible();
  });

  // I-08
  test('"다음"을 누르는 동안 버튼이 "준비 중..."으로 바뀌며 비활성화된다', async ({
    page,
  }) => {
    const input = new InputPagePOM(page);

    await page.unroute('**/analysis/init');
    await page.route('**/analysis/init', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({
        json: { status: 'success', data: { sessionId: 'test-session' } },
      });
    });

    await input.fillContractForm();
    await input.nextButton.click();

    await expect(
      page.getByRole('button', { name: '준비 중...' }),
    ).toBeVisible();
    await expect(input.nextButton).toBeDisabled();
  });

  // I-09
  test('세션 생성에 실패하면 에러 메시지가 표시되고 다음 단계로 넘어가지 않는다', async ({
    page,
  }) => {
    await page.unroute('**/analysis/init');
    await mockAnalysisInitFailed(page);
    const input = new InputPagePOM(page);

    await input.fillContractForm();
    await input.nextButton.click();

    await expect(input.submitButton).not.toBeVisible();
    await expect(page.getByText('서버 오류가 발생했어요.')).toBeVisible();
  });
});

test.describe('InputPage — Step 3 (서류 업로드)', () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
    await page.goto('/input');
    await page.evaluate(() => sessionStorage.clear());
    const input = new InputPagePOM(page);
    await input.goToStep2();
    await input.fillContractForm();
    await input.nextButton.click();
    await expect(input.submitButton).toBeVisible();
  });

  // I-10
  test('파일을 업로드하지 않으면 확정 버튼이 보이지 않는다', async ({
    page,
  }) => {
    await expect(
      page.getByRole('button', { name: '이 순서로 확정하기' }),
    ).not.toBeVisible();
  });

  // I-11
  test('파일을 업로드하고 확정 버튼을 누르면 스캔이 시작된다', async ({
    page,
  }) => {
    await page.unroute('**/documents/ocr/registry');
    await page.route('**/documents/ocr/registry', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({
        json: {
          status: 'success',
          data: { registrySessionId: 'registry-session-001', safe: true },
        },
      });
    });
    const input = new InputPagePOM(page);

    await input.registryFileInput.setInputFiles(TEST_FILES.registry);
    await page
      .getByRole('button', { name: '이 순서로 확정하기' })
      .first()
      .click();

    await expect(
      page.getByRole('button', { name: '분석 중...' }).first(),
    ).toBeVisible();
  });

  // I-12
  test('스캔이 완료되면 버튼이 "순서 변경하기"로 바뀐다', async ({ page }) => {
    const input = new InputPagePOM(page);

    await input.registryFileInput.setInputFiles(TEST_FILES.registry);
    await page
      .getByRole('button', { name: '이 순서로 확정하기' })
      .first()
      .click();

    await expect(
      page.getByRole('button', { name: '순서 변경하기' }).first(),
    ).toBeVisible();
  });

  // I-13
  test('등기·계약 양쪽 스캔 완료 후 소유자 확인을 체크하면 "다음" 버튼이 활성화된다', async ({
    page,
  }) => {
    const input = new InputPagePOM(page);

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

    await expect(input.submitButton).toBeDisabled();

    await input.ownerVerifyToggle.click();
    await expect(input.submitButton).toBeEnabled();
  });

  // I-14
  test('개인정보가 포함된 파일을 업로드하면 에러 배너가 나타난다', async ({
    page,
  }) => {
    await page.unroute('**/documents/ocr/contract');
    await mockOcrPiiDetected(page, '**/documents/ocr/contract');
    const input = new InputPagePOM(page);

    await input.contractFileInput.setInputFiles(TEST_FILES.contractWithPii);
    await page
      .getByRole('button', { name: '이 순서로 확정하기' })
      .last()
      .click();

    await expect(
      page.getByText('개인정보가 감지되었습니다. 가린 뒤 다시 업로드해주세요.'),
    ).toBeVisible();
  });

  // I-15
  test('PII 에러 상태에서 ⓘ 버튼을 누르면 마스킹 미완료 항목 목록이 펼쳐진다', async ({
    page,
  }) => {
    await page.unroute('**/documents/ocr/contract');
    await mockOcrPiiDetected(page, '**/documents/ocr/contract');
    const input = new InputPagePOM(page);

    await input.contractFileInput.setInputFiles(TEST_FILES.contractWithPii);
    await page
      .getByRole('button', { name: '이 순서로 확정하기' })
      .last()
      .click();
    await expect(
      page.getByText('개인정보가 감지되었습니다. 가린 뒤 다시 업로드해주세요.'),
    ).toBeVisible();

    await page.getByRole('button', { name: '감지된 항목 보기' }).click();

    await expect(page.getByText('주민등록번호')).toBeVisible();
    await expect(page.getByText('전화번호')).toBeVisible();
  });

  // I-16
  test('판독할 수 없는 파일을 업로드하면 에러 메시지가 표시되고 "다음" 버튼은 비활성 상태를 유지한다', async ({
    page,
  }) => {
    await page.unroute('**/documents/ocr/registry');
    await mockOcrFailed(page, '**/documents/ocr/registry');
    const input = new InputPagePOM(page);

    await input.registryFileInput.setInputFiles(TEST_FILES.registry);
    await page
      .getByRole('button', { name: '이 순서로 확정하기' })
      .first()
      .click();

    await expect(
      page.getByText(
        '이미지를 판독할 수 없어요. 더 선명한 사진으로 다시 업로드해주세요.',
      ),
    ).toBeVisible();
    await expect(input.submitButton).toBeDisabled();
  });

  // I-17
  test('파일을 업로드하면 파일 이름이 카드에 표시된다', async ({ page }) => {
    const input = new InputPagePOM(page);

    await input.registryFileInput.setInputFiles(TEST_FILES.registry);

    await expect(page.getByText('registry.pdf')).toBeVisible();
  });

  // I-18
  test('스캔 완료 후 파일을 추가하면 스캔 상태가 초기화된다', async ({
    page,
  }) => {
    const input = new InputPagePOM(page);

    await input.registryFileInput.setInputFiles(TEST_FILES.registry);
    await page
      .getByRole('button', { name: '이 순서로 확정하기' })
      .first()
      .click();
    await expect(
      page.getByRole('button', { name: '순서 변경하기' }).first(),
    ).toBeVisible();

    await input.registryFileInput.setInputFiles(TEST_FILES.registry);

    await expect(
      page.getByRole('button', { name: '이 순서로 확정하기' }).first(),
    ).toBeVisible();
  });
});

test.describe('InputPage — 이탈 경고', () => {
  test.beforeEach(async ({ page }) => {
    await mockAllApis(page);
    await page.goto('/input');
    await page.evaluate(() => sessionStorage.clear());
  });

  // I-19
  test('입력값이 있을 때 헤더 이전 버튼을 누르면 경고창이 뜬다', async ({
    page,
  }) => {
    const input = new InputPagePOM(page);

    await input.searchAddress('테헤란로');
    await input.addressResults.click();

    await expect(input.headerBackButton).toBeVisible();

    const dialogPromise = page.waitForEvent('dialog');
    await input.headerBackButton.click();
    const dialog = await dialogPromise;

    expect(dialog.type()).toBe('confirm');
    await dialog.dismiss();
  });

  // I-20
  test('경고창에서 취소하면 /input 페이지가 유지된다', async ({ page }) => {
    const input = new InputPagePOM(page);

    await input.searchAddress('테헤란로');
    await input.addressResults.click();

    page.on('dialog', (dialog) => dialog.dismiss());
    await input.headerBackButton.click();

    await expect(page).toHaveURL('/input');
  });

  // I-21
  test('경고창에서 확인하면 / 페이지로 이동한다', async ({ page }) => {
    const input = new InputPagePOM(page);

    await input.searchAddress('테헤란로');
    await input.addressResults.click();

    page.on('dialog', (dialog) => dialog.accept());
    await input.headerBackButton.click();

    await expect(page).toHaveURL('/');
  });

  // I-22
  test('정상 제출 시 경고창이 뜨지 않고 /analyze로 이동한다', async ({
    page,
  }) => {
    const input = new InputPagePOM(page);

    let dialogFired = false;
    page.on('dialog', () => {
      dialogFired = true;
    });

    await input.goToStep2();
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
    expect(dialogFired).toBe(false);
  });
});
