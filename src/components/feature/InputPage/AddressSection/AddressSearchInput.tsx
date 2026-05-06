import styled from '@emotion/styled';
import { Search } from 'lucide-react';
import { Input } from '../../../common/Input';

interface AddressSearchInputProps {
  keyword: string;
  onChangeKeyword: (keyword: string) => void;
  onSearch: () => void;
}

export function AddressSearchInput({
  keyword,
  onChangeKeyword,
  onSearch,
}: AddressSearchInputProps) {
  return (
    <AddressRow>
      <Input
        placeholder="서울특별시 강남구 테헤란로 123"
        value={keyword}
        onChange={(event) => onChangeKeyword(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onSearch();
          }
        }}
        endInteractive
        end={
          <SearchIconButton
            type="button"
            onClick={onSearch}
            aria-label="주소 검색"
          >
            <Search size={16} />
          </SearchIconButton>
        }
      />
    </AddressRow>
  );
}

const AddressRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
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
