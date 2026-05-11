import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { JeonseRatioCard } from '../../components/feature/ResultPage/DetailAnalysis/Jeonse/JeonseRatioCard';
import { RegistryAnalysisCard } from '../../components/feature/ResultPage/DetailAnalysis/Registry/RegistryAnalysisCard';
import { ContractAnalysisCard } from '../../components/feature/ResultPage/DetailAnalysis/Contract/ContractAnalysisCard';
import { BuildingInfoCard } from '../../components/feature/ResultPage/DetailAnalysis/Building/BuildingInfoCard';
import type { ContractData } from '../../types/contract';
import type { BuildingData } from '../../types/result';

export function DetailAnalysisSection() {
  const navigate = useNavigate();

  const registryMockData = {
    trustWarning: true,
    priorLease: true,
    mortgageCount: 2,
    mortgages: [
      { bank: '국민은행', amount: 120000000 },
      { bank: '신한은행', amount: 80000000 },
    ],
    totalMortgage: 200000000,
    ownershipChangeRecent: true,
  };

  const contractMockData: ContractData = {
    toxicClauses: [
      {
        level: 'danger',
        title: '수리비 전액 임차인 부담',
        originalText: '수리비는 임차인이 전액 부담한다.',
        legalIssue: '임차인에게 과도하게 불리한 특약일 수 있습니다.',
        precedent: '통상적인 노후 및 하자 수선 책임은 임대인에게 있습니다.',
        suggestion: '수리 범위와 부담 주체를 계약 전에 명확히 협의해 주세요.',
      },
      {
        level: 'danger',
        title: '중도 해지 불가',
        originalText: '임차인은 어떠한 경우에도 중도 해지할 수 없다.',
        legalIssue: '임차인의 계약 해지 권리를 과도하게 제한할 수 있습니다.',
        precedent: '일방에게 지나치게 불리한 조항은 무효로 판단될 수 있습니다.',
        suggestion:
          '중도 해지 조건과 위약금 범위를 명확히 수정하는 것이 좋습니다.',
      },
    ],
    cautionClauses: [
      {
        level: 'caution',
        title: '전세대출 비협조 가능성',
        originalText: '임대인은 전세대출에 협조하지 않을 수 있다.',
        legalIssue: '전세대출 진행 과정에서 문제가 발생할 가능성이 있습니다.',
        precedent: '대출 협조 여부는 계약 전 확인하는 것이 일반적입니다.',
        suggestion: '임대인의 대출 협조 여부를 특약으로 명시해 주세요.',
      },
    ],
  };

  const buildingMockData: BuildingData = {
    level: 'safe',
    primaryUse: '공동주택',
    isResidential: true,
    violation: false,
    approvedDate: '2018-03-12',
    redevelopmentZone: false,
  };

  return (
    <Section>
      <JeonseRatioCard
        ratio={82}
        riskLevel="danger"
        deposit={200000000}
        recentPrice={250000000}
        averagePrice={245000000}
        lowestPrice={230000000}
      />

      <RegistryAnalysisCard
        registry={registryMockData}
        onClickDetail={() => navigate('/result/registry')}
      />

      <ContractAnalysisCard
        contract={contractMockData}
        onClickDetail={() => navigate('/result/contract')}
      />

      <BuildingInfoCard building={buildingMockData} />
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
