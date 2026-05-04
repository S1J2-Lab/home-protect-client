import styled from '@emotion/styled';
import { Search } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { useAddressSearch } from '../../hooks/useAddressSearch';
import { useEffect, useRef } from 'react';
import type { Address } from '../../types/address';

interface AddressSectionProps {
  selectedAddress: Address | null;
  onSelect: (address: Address) => void;
}

export function AddressSection({
  selectedAddress,
  onSelect,
}: AddressSectionProps) {
  const {
    keyword,
    setKeyword,
    isSearched,
    currentAddresses,
    hasNextPage,
    loadMoreAddresses,
    handleSearch,
  } = useAddressSearch();

  const resultAreaRef = useRef<HTMLDivElement | null>(null);
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  const handleSelectAddress = (address: Address) => {
    onSelect(address);
    setKeyword(address.road);
  };

  useEffect(() => {
    if (!isSearched || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreAddresses();
        }
      },
      {
        root: resultAreaRef.current,
        rootMargin: '40px',
        threshold: 0.1,
      },
    );

    const target = observerTargetRef.current;

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [isSearched, hasNextPage, loadMoreAddresses]);

  return (
    <Card>
      <SectionTitle>주소 정보</SectionTitle>

      <AddressRow>
        <Input
          placeholder="서울특별시 강남구 테헤란로 123"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
          endInteractive
          end={
            <SearchIconButton
              type="button"
              onClick={handleSearch}
              aria-label="주소 검색"
            >
              <Search size={16} />
            </SearchIconButton>
          }
        />
      </AddressRow>

      {isSearched && (
        <AddressResultArea ref={resultAreaRef}>
          {currentAddresses.map((address) => {
            const isSelected =
              selectedAddress?.road === address.road &&
              selectedAddress?.jibun === address.jibun;

            return (
              <AddressItem
                key={`${address.road}-${address.jibun}`}
                type="button"
                $isSelected={isSelected}
                onClick={() => handleSelectAddress(address)}
              >
                <RoadAddress>{address.road}</RoadAddress>
                <JibunAddress>(지번 주소) {address.jibun}</JibunAddress>
              </AddressItem>
            );
          })}

          {hasNextPage && <ObserverTarget ref={observerTargetRef} />}
        </AddressResultArea>
      )}
    </Card>
  );
}

const SectionTitle = styled.h2`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const AddressRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const AddressResultArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;

  max-height: 480px;
  overflow-y: auto;

  padding-right: 4px;
  scrollbar-gutter: stable;
`;

const AddressItem = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  text-align: left;
  background: ${({ theme }) => theme.colors.bg};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 14px 12px;
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

const ObserverTarget = styled.div`
  height: 1px;
`;

const SearchIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
`;
