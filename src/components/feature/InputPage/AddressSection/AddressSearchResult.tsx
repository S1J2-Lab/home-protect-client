import styled from '@emotion/styled';
import { useRef } from 'react';
import type { Address } from '../../../../types/address';
import { AddressItem } from './AddressItem';
import { useInfiniteAddressScroll } from '../../../../hooks/useInfiniteAddressScroll';

interface AddressSearchResultProps {
  addresses: Address[];
  selectedAddress: Address | null;
  isLoading: boolean;
  isFetchingMore: boolean;
  errorMessage: string;
  hasNextPage: boolean;
  onLoadMore: () => void;
  onSelectAddress: (address: Address) => void;
}
export function AddressSearchResult({
  addresses,
  selectedAddress,
  isLoading,
  isFetchingMore,
  errorMessage,
  hasNextPage,
  onLoadMore,
  onSelectAddress,
}: AddressSearchResultProps) {
  const resultAreaRef = useRef<HTMLDivElement | null>(null);
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  useInfiniteAddressScroll({
    rootRef: resultAreaRef,
    targetRef: observerTargetRef,
    enabled: hasNextPage && !isLoading && !isFetchingMore && !errorMessage,
    onIntersect: onLoadMore,
  });

  return (
    <AddressResultArea ref={resultAreaRef}>
      {isLoading && <NoticeText>주소를 검색하고 있어요.</NoticeText>}

      {!isLoading && errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      {!isLoading && !errorMessage && addresses.length === 0 && (
        <NoticeText>검색 결과가 없습니다.</NoticeText>
      )}

      {!isLoading &&
        !errorMessage &&
        addresses.map((address) => {
          const isSelected =
            selectedAddress?.roadAddress === address.roadAddress &&
            selectedAddress?.jibunAddress === address.jibunAddress;

          return (
            <AddressItem
              key={
                address.bdMgtSn ||
                `${address.roadAddress}-${address.jibunAddress}`
              }
              address={address}
              isSelected={isSelected}
              onClick={() => onSelectAddress(address)}
            />
          );
        })}

      {!isLoading && !errorMessage && hasNextPage && (
        <ObserverTarget ref={observerTargetRef} />
      )}
      {isFetchingMore && <NoticeText>주소를 더 불러오고 있어요.</NoticeText>}
    </AddressResultArea>
  );
}

const AddressResultArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;

  max-height: 480px;
  overflow-y: auto;

  padding-right: 4px;
  scrollbar-gutter: stable;
`;

const ObserverTarget = styled.div`
  height: 1px;
`;

const NoticeText = styled.p`
  margin: 0;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ErrorText = styled.p`
  margin: 0;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.danger};
`;
