import axios from 'axios';
import { BASE_URL, API_TIMEOUT } from './config';
import type { Address } from '../types/address';

interface AddressSearchResponse {
  status: 'success';
  data: {
    results: Address[];
  };
}

export async function searchAddress(
  query: string,
  page: number,
): Promise<Address[]> {
  const { data } = await axios.get<AddressSearchResponse>(
    `${BASE_URL}/address/search`,
    {
      params: {
        query,
        page,
      },
      timeout: API_TIMEOUT,
    },
  );

  return data.data.results;
}
