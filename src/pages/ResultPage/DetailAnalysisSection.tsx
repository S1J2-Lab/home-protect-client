import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { JeonseRatioCard } from '../../components/feature/ResultPage/DetailAnalysis/Jeonse/JeonseRatioCard';
import { RegistryAnalysisCard } from '../../components/feature/ResultPage/DetailAnalysis/Registry/RegistryAnalysisCard';
import { ContractAnalysisCard } from '../../components/feature/ResultPage/DetailAnalysis/Contract/ContractAnalysisCard';
import { BuildingInfoCard } from '../../components/feature/ResultPage/DetailAnalysis/Building/BuildingInfoCard';
import type { ResultData } from '../../types/result';

interface DetailAnalysisSectionProps {
  result: ResultData;
}

export function DetailAnalysisSection({ result }: DetailAnalysisSectionProps) {
  const navigate = useNavigate();

  return (
    <Section>
      <JeonseRatioCard jeonseRatio={result.jeonseRatio} />

      <RegistryAnalysisCard
        registry={result.registry}
        onClickDetail={() =>
          navigate('/result/registry', {
            state: { registry: result.registry },
          })
        }
      />

      <ContractAnalysisCard
        contract={result.contract}
        onClickDetail={() =>
          navigate('/result/contract', {
            state: { contract: result.contract },
          })
        }
      />

      <BuildingInfoCard building={result.building} />
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
