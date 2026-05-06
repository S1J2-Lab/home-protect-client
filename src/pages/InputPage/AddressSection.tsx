import { Card } from '../../components/common/Card';
import { useAddressSearch } from '../../hooks/useAddressSearch';
import type { Address } from '../../types/address';
import { AddressSearchInput } from '../../components/feature/InputPage/AddressSection/AddressSearchInput';
import { AddressSearchResult } from '../../components/feature/InputPage/AddressSection/AddressSearchResult';
import styled from '@emotion/styled';

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
    isLoading,
    isFetchingMore,
    errorMessage,
  } = useAddressSearch();

  const handleSelectAddress = (address: Address) => {
    onSelect(address);
    setKeyword(address.roadAddress);
  };

  return (
    <Card>
      <SectionTitle>주소 정보</SectionTitle>

      <AddressSearchInput
        keyword={keyword}
        onChangeKeyword={setKeyword}
        onSearch={handleSearch}
      />

      {isSearched && (
        <AddressSearchResult
          addresses={currentAddresses}
          selectedAddress={selectedAddress}
          isLoading={isLoading}
          isFetchingMore={isFetchingMore}
          errorMessage={errorMessage}
          hasNextPage={hasNextPage}
          onLoadMore={loadMoreAddresses}
          onSelectAddress={handleSelectAddress}
        />
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
