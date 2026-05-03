import styled from '@emotion/styled';
import type { ContractType } from '../../constants/contract';
import { CONTRACT_TYPES } from '../../constants/contract';

interface ContractTypeSelectorProps {
  value: ContractType;
  onChange: (value: ContractType) => void;
}

export function ContractTypeSelector({
  value,
  onChange,
}: ContractTypeSelectorProps) {
  return (
    <SelectorWrapper>
      {CONTRACT_TYPES.map((type) => (
        <TypeButton
          key={type.value}
          type="button"
          $isActive={value === type.value}
          onClick={() => onChange(type.value)}
        >
          {type.label}
        </TypeButton>
      ))}
    </SelectorWrapper>
  );
}

const SelectorWrapper = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(3, 1fr);
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
`;

const TypeButton = styled.button<{ $isActive: boolean }>`
  height: 40px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.surface : 'transparent'};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primaryDark : theme.colors.textSub};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;
