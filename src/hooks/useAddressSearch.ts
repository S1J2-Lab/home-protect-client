import { useCallback, useState } from 'react';
import { searchAddress } from '../api/address';
import { getApiErrorMessage } from '../api/error';
import type { Address } from '../types/address';
import type { ApiError } from '../api/error';

const FIRST_PAGE = 1;
const PAGE_SIZE = 10;

export function useAddressSearch(keyword: string) {
  const [searchedKeyword, setSearchedKeyword] = useState('');
  const [currentAddresses, setCurrentAddresses] = useState<Address[]>([]);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [isSearched, setIsSearched] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [hasNextPage, setHasNextPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = useCallback(async () => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) return;

    try {
      setIsLoading(true);
      setIsSearched(true);
      setErrorMessage('');

      const addresses = await searchAddress(trimmedKeyword, FIRST_PAGE);

      setSearchedKeyword(trimmedKeyword);
      setCurrentAddresses(addresses);
      setCurrentPage(FIRST_PAGE);
      setHasNextPage(addresses.length === PAGE_SIZE);
    } catch (error) {
      setCurrentAddresses([]);
      setHasNextPage(false);
      setErrorMessage(getApiErrorMessage(error as ApiError));
    } finally {
      setIsLoading(false);
    }
  }, [keyword]);

  const loadMoreAddresses = useCallback(async () => {
    if (isLoading || isFetchingMore || !hasNextPage || !searchedKeyword) return;

    const nextPage = currentPage + 1;

    try {
      setIsFetchingMore(true);
      setErrorMessage('');

      const addresses = await searchAddress(searchedKeyword, nextPage);

      setCurrentAddresses((prev) => [...prev, ...addresses]);
      setCurrentPage(nextPage);
      setHasNextPage(addresses.length === PAGE_SIZE);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error as ApiError));
    } finally {
      setIsFetchingMore(false);
    }
  }, [currentPage, hasNextPage, isFetchingMore, isLoading, searchedKeyword]);

  return {
    isSearched,
    currentAddresses,
    hasNextPage,
    loadMoreAddresses,
    handleSearch,
    isLoading,
    isFetchingMore,
    errorMessage,
  };
}
