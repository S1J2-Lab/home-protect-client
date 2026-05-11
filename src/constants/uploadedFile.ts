import type { LucideIcon } from 'lucide-react';
import { File, Signature } from 'lucide-react';

export type FileStatus = 'pending' | 'loading' | 'safe' | 'error';

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  status: FileStatus;
}

export type UploaderKey = 'registry' | 'contract';

export interface UploaderConfig {
  key: UploaderKey;
  Icon: LucideIcon;
  title: string;
  desc: string;
}

export const UPLOADER_CONFIGS: UploaderConfig[] = [
  {
    key: 'registry',
    Icon: File,
    title: '등기부등본',
    desc: '등기부등본 PDF를 업로드해주세요',
  },
  {
    key: 'contract',
    Icon: Signature,
    title: '임대차계약서',
    desc: '임대차계약서 PDF를 업로드해주세요',
  },
];

export type FileMap = Record<UploaderKey, UploadedFile[]>;
