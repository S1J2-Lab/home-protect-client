import styled from '@emotion/styled';
import { Check } from 'lucide-react';
import type { ChecklistItem as ChecklistItemType } from '../../../../types/checklist';

interface ChecklistItemProps {
  item: ChecklistItemType;
  checked: boolean;
  onToggle: (id: string) => void;
}

export function ChecklistItem({ item, checked, onToggle }: ChecklistItemProps) {
  return (
    <Item checked={checked} onClick={() => onToggle(item.id)}>
      <HiddenCheckbox type="checkbox" checked={checked} readOnly />

      <CustomCheckbox checked={checked}>
        {checked && <Check size={12} strokeWidth={2} />}
      </CustomCheckbox>

      <Content>
        <Title>{item.title}</Title>
        <Description>{item.description}</Description>
      </Content>
    </Item>
  );
}

const Item = styled.li<{ checked: boolean }>`
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 10px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  cursor: pointer;
  opacity: ${({ checked }) => (checked ? 0.75 : 1)};
  &:last-child {
    border-bottom: 0;
  }
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const CustomCheckbox = styled.span<{ checked: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ checked, theme }) =>
    checked ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.strong`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSub};
`;
