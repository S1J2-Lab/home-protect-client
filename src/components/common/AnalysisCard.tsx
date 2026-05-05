import styled from '@emotion/styled';
import { Card } from './Card';

interface AnalysisCardProps {
  icon: React.ReactNode;
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}

export function AnalysisCard({
  icon,
  title,
  right,
  children,
}: AnalysisCardProps) {
  return (
    <Card>
      <Header>
        <TitleBox>
          <IconCircle>{icon}</IconCircle>
          <Title>{title}</Title>
        </TitleBox>

        {right}
      </Header>

      {children}
    </Card>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 5px;
`;

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};

  svg {
    width: 18px;
    height: 18px;
  }
`;
const Title = styled.h2`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
