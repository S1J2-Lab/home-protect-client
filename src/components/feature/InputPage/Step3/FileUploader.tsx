import styled from '@emotion/styled';
import { FileUploaderCard } from './FileUploaderCard';
import { PrivacyMaskingBanner } from './PrivacyMaskingBanner';
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
}

function hasWarningFiles(files: FileMap) {
  return Object.values(files).some((list) =>
    list.some((f) => f.status === 'warning'),
  );
}

export function FileUploader({
  isMaskingConfirmed,
  onMaskingConfirmChange,
  files,
  onFilesChange,
}: FileUploaderProps) {
  const showMaskingSection = hasWarningFiles(files);

  return (
    <Wrap>
      {UPLOADER_CONFIGS.map((config) => (
        <FileUploaderCard
          key={config.key}
          config={config}
          files={files[config.key]}
          onChange={(next) => onFilesChange(config.key, next)}
        />
      ))}

      {showMaskingSection && (
        <MaskingSection>
          <PrivacyMaskingBanner />
          <PrivacyMaskingToggle
            checked={isMaskingConfirmed}
            onChange={onMaskingConfirmChange}
          />
        </MaskingSection>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MaskingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
