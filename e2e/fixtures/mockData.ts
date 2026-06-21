export const MOCK_SESSION_ID = 'test-session-abc123';
export const MOCK_REGISTRY_SESSION_ID = 'registry-session-001';
export const MOCK_CONTRACT_SESSION_ID = 'contract-session-001';

export const MOCK_ADDRESS_RESULTS = {
  status: 'success',
  data: {
    results: [
      {
        roadAddress: '서울특별시 강남구 테헤란로 123 (역삼동)',
        jibunAddress: '서울특별시 강남구 역삼동 648-23 여삼빌딩',
        buildingName: '여삼빌딩',
        admCd: '1168010100',
        rnMgtSn: '116803122010',
        bdMgtSn: '1168010100100010000000000',
        mno: '0001',
        sno: '0000',
      },
    ],
    totalCount: 1,
    currentPage: 1,
    countPerPage: 10,
    hasMore: false,
  },
};

export const MOCK_ANALYSIS_RESULT = {
  status: 'success',
  data: {
    address: '서울특별시 강남구 테헤란로 123 (역삼동)',
    analyzedAt: '2026-05-07T14:30:00+09:00',
    jeonseRatio: {
      ratioType: 'jeonse',
      ratioPercent: 72.5,
      riskLevel: 'caution',
      recentHigh: 450000000,
      recentLow: 320000000,
      average: 385000000,
      convertedDeposit: 380000000,
      sampleCount: 8,
      lowReliability: false,
    },
    registry: {
      mortgageCount: 1,
      mortgages: [{ bank: '국민은행', amount: 200000000 }],
      totalMortgage: 200000000,
      trustWarning: false,
      priorLease: false,
      ownershipChangeRecent: false,
    },
    building: {
      level: 'safe',
      primaryUse: '아파트',
      isResidential: true,
      violation: false,
      approvedDate: '2010-03-15',
      redevelopmentZone: false,
    },
    contract: {
      toxicClauses: [
        {
          level: 'danger',
          title: '임의 해지 조항',
          originalText: '임대인은 사전 통보 없이 계약을 해지할 수 있다.',
          legalIssue: '임차인의 주거 안정권을 침해하는 일방적 조항입니다.',
          precedent: '대법원 2019다12345',
          suggestion: '해당 조항 삭제 또는 임차인 동의 요건 추가를 요구하세요.',
        },
      ],
      cautionClauses: [],
    },
  },
};
