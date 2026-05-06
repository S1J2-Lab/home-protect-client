import styled from '@emotion/styled';
import type { Address } from '../../../../types/address';

interface AddressItemProps {
  address: Address;
  isSelected: boolean;
  onClick: () => void;
}

export function AddressItem({
  address,
  isSelected,
  onClick,
}: AddressItemProps) {
  return (
    <AddressButton type="button" $isSelected={isSelected} onClick={onClick}>
      <RoadAddress>{address.roadAddress}</RoadAddress>
      <JibunAddress>(지번 주소) {address.jibunAddress}</JibunAddress>
    </AddressButton>
  );
}

const AddressButton = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  text-align: left;
  background: ${({ theme }) => theme.colors.bg};
  border: ${({ $isSelected, theme }) =>
    $isSelected
      ? `1px solid ${theme.colors.primary}`
      : '1px solid transparent'};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 14px 12px;
  cursor: pointer;
`;

const RoadAddress = styled.p`
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const JibunAddress = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
