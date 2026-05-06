import styled from '@emotion/styled';
import { Check } from 'lucide-react';

interface OwnerVerifyToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function OwnerVerifyToggle({
  checked,
  onChange,
}: OwnerVerifyToggleProps) {
  return (
    <ToggleRow
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={() => onChange(!checked)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') onChange(!checked);
      }}
    >
      <ToggleLabel>소유자 일치 확인 완료</ToggleLabel>
      <Checkbox $checked={checked} aria-hidden="true">
        {checked && <Check size={12} strokeWidth={3} aria-hidden="true" />}
      </Checkbox>
    </ToggleRow>
  );
}

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s;

  &:hover,
  &:active {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primarySoft};
  }
`;

const ToggleLabel = styled.p`
  flex: 1;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Checkbox = styled.div<{ $checked: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1.5px solid
    ${({ theme, $checked }) =>
      $checked ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme }) => theme.colors.surface};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background 0.15s,
    border-color 0.15s;
`;
