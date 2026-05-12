import { Card } from '../../components/common/Card';
import { useAddressSearch } from '../../hooks/useAddressSearch';
import type { Address } from '../../types/address';
import { AddressSearchInput } from '../../components/feature/InputPage/AddressSection/AddressSearchInput';
import { AddressSearchResult } from '../../components/feature/InputPage/AddressSection/AddressSearchResult';
import styled from '@emotion/styled';

interface AddressSectionProps {
  selectedAddress: Address | null;
  onSelectAddress: (address: Address | null) => void;
  keyword: string;
  onChangeKeyword: (keyword: string) => void;
}

export function AddressSection({
  selectedAddress,
  onSelectAddress,
  keyword,
  onChangeKeyword,
}: AddressSectionProps) {
  const {
    isSearched,
    currentAddresses,
    hasNextPage,
    loadMoreAddresses,
    handleSearch,
    isLoading,
    isFetchingMore,
    errorMessage,
  } = useAddressSearch(keyword);

  const handleChangeKeyword = (nextKeyword: string) => {
    onChangeKeyword(nextKeyword);

    if (selectedAddress && nextKeyword !== selectedAddress.roadAddress) {
      onSelectAddress(null);
    }
  };

  const handleSelectAddress = (address: Address) => {
    onSelectAddress(address);
    onChangeKeyword(address.roadAddress);
  };

  return (
    <Card>
      <SectionTitle>주소 정보</SectionTitle>

      <AddressSearchInput
        keyword={keyword}
        onChangeKeyword={handleChangeKeyword}
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
