import type { Page } from '@playwright/test';

type SseScenario = 'complete' | 'error' | 'partial' | 'hanging';

const SSE_SCENARIOS: Record<SseScenario, string[]> = {
  complete: [
    '{"step":"jeonseRatio","status":"done"}',
    '{"step":"registryParse","status":"done"}',
    '{"step":"contractReview","status":"done"}',
    '{"step":"buildingCheck","status":"done"}',
    '{"step":"complete"}',
  ],
  error: ['{"step":"error","errorCode":"API_UNAVAILABLE"}'],
  partial: [
    '{"step":"jeonseRatio","status":"done"}',
    '{"step":"registryParse","status":"done"}',
  ],
  // 메시지도 에러도 보내지 않는 시나리오 — 분석 중 상태를 유지한다
  hanging: [],
};

// FakeEventSource 클래스를 window에 주입한다.
// window.__sseMessages에 미리 심어둔 JSON 문자열 배열을 순서대로 onmessage에 전달한다.
// onerror는 __sseMessages가 없을 때만 발동한다.
const FAKE_EVENT_SOURCE_SCRIPT = `
  window.EventSource = class FakeEventSource {
    constructor(url) {
      this._url = url;
      this.onmessage = null;
      this.onerror = null;

      setTimeout(() => {
        const messages = window.__sseMessages;
        if (!messages || messages.length === 0) {
          if (this.onerror) this.onerror(new Event('error'));
          return;
        }
        messages.forEach((data, i) => {
          setTimeout(() => {
            if (this.onmessage) this.onmessage({ data });
          }, i * 30);
        });
      }, 0);
    }

    close() {}
  };
`;

export async function setupEventSourceStub(page: Page, scenario: SseScenario) {
  const messages = SSE_SCENARIOS[scenario];
  await page.addInitScript(
    ({ script, msgs }) => {
      window.__sseMessages = msgs;
      eval(script);
    },
    { script: FAKE_EVENT_SOURCE_SCRIPT, msgs: messages },
  );
}

// TypeScript에서 window.__sseMessages 타입 선언
declare global {
  interface Window {
    __sseMessages?: string[];
  }
}
