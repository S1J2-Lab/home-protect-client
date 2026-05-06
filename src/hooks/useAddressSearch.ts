import { useState } from 'react';
import { searchAddress } from '../api/address';
import type { Address } from '../types/address';

export function useAddressSearch() {
  const [keyword, setKeyword] = useState('');
  const [currentAddresses, setCurrentAddresses] = useState<Address[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) return;

    try {
      setIsLoading(true);
      setIsSearched(true);

      const addresses = await searchAddress(trimmedKeyword);
      setCurrentAddresses(addresses);
    } catch {
      setCurrentAddresses([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    keyword,
    setKeyword,
    isSearched,
    currentAddresses,
    hasNextPage: false,
    loadMoreAddresses: () => {},
    handleSearch,
    isLoading,
  };
}
