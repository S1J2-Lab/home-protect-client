import type { LucideIcon } from 'lucide-react';
import { File, Signature } from 'lucide-react';

export type FileStatus = 'ok' | 'warning';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: FileStatus;
  issues: string[];
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

export const PRIVACY_ISSUE_KEYS = [
  '주민등록번호',
  '연락처',
  '계좌번호',
  '이메일',
  '생년월일',
] as const;

export type FileMap = Record<UploaderKey, UploadedFile[]>;

export const PRIVACY_WARNING_MESSAGE =
  '개인정보 마스킹이 필요한 파일이 있어요.\n카드의 ⓘ 아이콘을 눌러 확인해주세요.';
