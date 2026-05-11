import { apiClient } from './client';

interface OcrRegistryResponse {
  status: 'success';
  data: {
    registrySessionId: string;
    safe: boolean;
  };
}

interface OcrContractResponse {
  status: 'success';
  data: {
    contractSessionId: string;
    safe: boolean;
  };
}

export async function scanRegistry(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await apiClient.post<OcrRegistryResponse>(
    '/documents/ocr/registry',
    formData,
  );

  return data.data;
}

export async function scanContract(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await apiClient.post<OcrContractResponse>(
    '/documents/ocr/contract',
    formData,
  );

  return data.data;
}
