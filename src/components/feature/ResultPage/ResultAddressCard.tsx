import styled from '@emotion/styled';
import { MapPin } from 'lucide-react';
import { Card } from '../../../components/common/Card';

interface ResultAddressCardProps {
  address: string;
}

export function ResultAddressCard({ address }: ResultAddressCardProps) {
  return (
    <Card>
      <Content>
        <IconBox>
          <MapPin size={18} />
        </IconBox>

        <TextBox>
          <Label>주소</Label>
          <Address>{address}</Address>
        </TextBox>
      </Content>
    </Card>
  );
}

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconBox = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextBox = styled.div`
  min-width: 0;
`;

const Label = styled.p`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  font-weight: 600;
`;

const Address = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
`;
