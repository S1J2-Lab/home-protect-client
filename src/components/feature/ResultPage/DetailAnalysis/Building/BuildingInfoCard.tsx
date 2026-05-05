import styled from '@emotion/styled';
import { AlertCircle, Building2, CheckCircle2 } from 'lucide-react';
import { AnalysisCard } from '../../../../common/AnalysisCard';
import type { BuildingData } from '../../../../../types/analysis';
import { getBuildingInfoItems } from '../../../../../utils/buildingInfo';

interface BuildingInfoCardProps {
  building: BuildingData;
}

export function BuildingInfoCard({ building }: BuildingInfoCardProps) {
  const infoItems = getBuildingInfoItems(building);

  return (
    <AnalysisCard icon={<Building2 />} title="건축물 정보">
      <InfoList>
        {infoItems.map((item) => (
          <InfoItem key={item.id} $danger={item.danger}>
            {item.danger ? <AlertCircle /> : <CheckCircle2 />}
            <Text>{item.text}</Text>
          </InfoItem>
        ))}
      </InfoList>
    </AnalysisCard>
  );
}

const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  margin: 5px 0 0;
  padding: 0;
`;

const InfoItem = styled.li<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text};

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    color: ${({ theme, $danger }) =>
      $danger ? theme.colors.danger : theme.colors.success};
  }
`;

const Text = styled.span`
  font-size: 13px;
  font-weight: 600;
`;
