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
  {
    road: '서울특별시 강남구 테헤란로 456',
    jibun: '서울특별시 강남구 역삼동 456-78',
  },
  {
    road: '서울특별시 강남구 테헤란로 456',
    jibun: '서울특별시 강남구 역삼동 456-78',
  },
  {
    road: '서울특별시 강남구 테헤란로 456',
    jibun: '서울특별시 강남구 역삼동 456-78',
  },
  {
    road: '서울특별시 강남구 테헤란로 456',
    jibun: '서울특별시 강남구 역삼동 456-78',
  },
  {
    road: '서울특별시 강남구 테헤란로 456',
    jibun: '서울특별시 강남구 역삼동 456-78',
  },
  {
    road: '서울특별시 강남구 테헤란로 456',
    jibun: '서울특별시 강남구 역삼동 456-78',
  },
  {
    road: '서울특별시 강남구 테헤란로 456',
    jibun: '서울특별시 강남구 역삼동 456-78',
  },
];

export function useAddressSearch() {
  const [keyword, setKeyword] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ADDRESS_PAGE_SIZE);

  const currentAddresses = MOCK_ADDRESSES.slice(0, visibleCount);
  const hasNextPage = visibleCount < MOCK_ADDRESSES.length;

  const handleSearch = () => {
    if (keyword.trim().length === 0) return;
    setIsSearched(true);
    setVisibleCount(ADDRESS_PAGE_SIZE);
  };

  const loadMoreAddresses = () => {
    setVisibleCount((prev) =>
      Math.min(prev + ADDRESS_PAGE_SIZE, MOCK_ADDRESSES.length),
    );
  };

  return {
    handleSearch,
    keyword,
    setKeyword,
    isSearched,
    currentAddresses,
    hasNextPage,
    loadMoreAddresses,
    totalCount: MOCK_ADDRESSES.length,
  };
}
