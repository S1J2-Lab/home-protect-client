import axios from 'axios';
import type { Address } from '../types/address';

const BASE_URL = 'http://52.79.87.217:8080';

export async function searchAddress(query: string): Promise<Address[]> {
  const { data } = await axios.get<Address[]>(`${BASE_URL}/address/search`, {
    params: {
      query,
    },
  });

  return data;
}
