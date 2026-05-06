import axios from 'axios';
import { BASE_URL } from './config';
import type { Address } from '../types/address';

interface AddressResponse {
  data: {
    results: Address[];
  };
}

export async function searchAddress(query: string): Promise<Address[]> {
  const { data } = await axios.get<AddressResponse>(
    `${BASE_URL}/address/search`,
    {
      params: {
        query,
      },
    },
  );

  return data.data.results;
}
