import styled from '@emotion/styled';
import { FileUploaderCard } from './FileUploaderCard';
import { PrivacyMaskingToggle } from './PrivacyMaskingToggle';
import type {
  FileMap,
  UploadedFile,
  UploaderKey,
} from '../../../../constants/uploadedFile';
import { UPLOADER_CONFIGS } from '../../../../constants/uploadedFile';

interface FileUploaderProps {
  isMaskingConfirmed: boolean;
  onMaskingConfirmChange: (confirmed: boolean) => void;
  files: FileMap;
  onFilesChange: (key: UploaderKey, files: UploadedFile[]) => void;
  onOrderConfirmChange: (key: UploaderKey, confirmed: boolean) => void;
  onScanSuccess: (key: UploaderKey, sessionId: string) => void;
}

export function FileUploader({
  isMaskingConfirmed,
  onMaskingConfirmChange,
  files,
  onFilesChange,
  onOrderConfirmChange,
  onScanSuccess,
}: FileUploaderProps) {
  return (
    <Wrap>
      {UPLOADER_CONFIGS.map((config) => (
        <FileUploaderCard
          key={config.key}
          config={config}
          files={files[config.key]}
          onChange={(next) => onFilesChange(config.key, next)}
          onOrderConfirmChange={(confirmed) =>
            onOrderConfirmChange(config.key, confirmed)
          }
          onScanSuccess={onScanSuccess}
        />
      ))}

      <PrivacyMaskingToggle
        checked={isMaskingConfirmed}
        onChange={onMaskingConfirmChange}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
