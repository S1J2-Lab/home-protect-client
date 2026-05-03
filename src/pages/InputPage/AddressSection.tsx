import styled from '@emotion/styled';
import { Search } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { useAddressSearch } from '../../hooks/useAddressSearch';

export function AddressSection() {
  const {
    keyword,
    setKeyword,
    isSearched,
    page,
    totalPage,
    currentAddresses,
    isSearchDisabled,
    handleSearch,
    handlePrevPage,
    handleNextPage,
  } = useAddressSearch();

  return (
    <Card>
      <SectionTitle>주소 정보</SectionTitle>

      <AddressRow>
        <Input
          placeholder="주소를 입력해주세요"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
          start={<Search size={16} />}
        />

        <SearchButtonWrapper>
          <Button
            variant="primary"
            size="lg"
            width="105px"
            onClick={handleSearch}
            disabled={isSearchDisabled}
          >
            주소 검색
          </Button>
        </SearchButtonWrapper>
      </AddressRow>

      {isSearched && (
        <AddressResultArea>
          {currentAddresses.map((address) => (
            <AddressItem key={address.road}>
              <RoadAddress>{address.road}</RoadAddress>
              <JibunAddress>(지번 주소) {address.jibun}</JibunAddress>
            </AddressItem>
          ))}

          <Pagination>
            <PageButton
              type="button"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              &lt;
            </PageButton>

            <CurrentPage>{page}</CurrentPage>
            <span>/ {totalPage}</span>

            <PageButton
              type="button"
              onClick={handleNextPage}
              disabled={page === totalPage}
            >
              &gt;
            </PageButton>
          </Pagination>
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

const SearchButtonWrapper = styled.div`
  button {
    font-size: 14px;
    font-weight: 500;
  }
`;

const AddressResultArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const AddressItem = styled.button`
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
`;

const CurrentPage = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const PageButton = styled.button`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
  background: none;
  border: 0;
  padding: 4px;
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
  }
`;
