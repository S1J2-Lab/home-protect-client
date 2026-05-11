import styled from '@emotion/styled';
import { ShieldCheck } from 'lucide-react';

export function HeroBadge() {
  return (
    <Badge>
      <ShieldCheck size={12} aria-hidden="true" />
      전세 사기 예방, 첫걸음
    </Badge>
  );
}

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primaryDark};
  border: 1px solid ${({ theme }) => theme.colors.primaryLight};
  padding: 7px 12px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 12px;
  font-weight: 700;
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;
