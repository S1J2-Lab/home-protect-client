import styled from '@emotion/styled';

type ResultTab = 'detail' | 'checklist' | 'caution';

interface ResultTabsProps {
  activeTab: ResultTab;
  onChangeTab: (tab: ResultTab) => void;
}

const tabs = [
  { key: 'detail', label: '상세 분석' },
  { key: 'checklist', label: '체크리스트' },
  { key: 'caution', label: '주의 사항' },
] as const;

export function ResultTabs({ activeTab, onChangeTab }: ResultTabsProps) {
  return (
    <TabCard>
      {tabs.map((tab) => (
        <TabButton
          key={tab.key}
          type="button"
          active={activeTab === tab.key}
          onClick={() => onChangeTab(tab.key)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabCard>
  );
}
const TabCard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.xl};
  box-shadow: ${({ theme }) => theme.shadow.card};
  overflow: hidden;
`;

const TabButton = styled.button<{ active: boolean }>`
  position: relative;
  height: 50px;
  border: none;
  background: transparent;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.textMuted};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 0;
    height: 3px;
    border-radius: ${({ theme }) => theme.radius.full};
    background: ${({ theme, active }) =>
      active ? theme.colors.primary : 'transparent'};
  }
`;
