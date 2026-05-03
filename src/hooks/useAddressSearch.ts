import { useState } from 'react';
import type { Address } from '../types/address';

const ADDRESS_PAGE_SIZE = 5;

const MOCK_ADDRESSES: Address[] = [
  {
    road: '서울특별시 강남구 테헤란로 123',
    jibun: '서울특별시 강남구 역삼동 123-45',
  },
  {
    road: '서울특별시 강남구 테헤란로 456',
    jibun: '서울특별시 강남구 역삼동 456-78',
  },
];

export function useAddressSearch() {
  const [keyword, setKeyword] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [page, setPage] = useState(1);

  const isSearchDisabled = keyword.trim().length === 0;
  const totalPage = Math.ceil(MOCK_ADDRESSES.length / ADDRESS_PAGE_SIZE);

  const startIndex = (page - 1) * ADDRESS_PAGE_SIZE;
  const currentAddresses = MOCK_ADDRESSES.slice(
    startIndex,
    startIndex + ADDRESS_PAGE_SIZE,
  );

  const handleSearch = () => {
    if (isSearchDisabled) return;

    setIsSearched(true);
    setPage(1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPage));
  };

  return {
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
  };
}
