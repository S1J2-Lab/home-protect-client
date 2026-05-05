import styled from '@emotion/styled';
import { ChecklistItem } from './ChecklistItem';
import type { ChecklistItem as ChecklistItemType } from '../../../../types/checklist';

interface ChecklistItemListProps {
  items: ChecklistItemType[];
  checkedIds: string[];
  onToggle: (id: string) => void;
}

export function ChecklistItemList({
  items,
  checkedIds,
  onToggle,
}: ChecklistItemListProps) {
  return (
    <List>
      {items.map((item) => (
        <ChecklistItem
          key={item.id}
          item={item}
          checked={checkedIds.includes(item.id)}
          onToggle={onToggle}
        />
      ))}
    </List>
  );
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style: none;
`;
