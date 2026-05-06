import styled from '@emotion/styled';
import { FileUploader } from '../../components/feature/InputPage/Step3/FileUploader';
import { OwnerVerifySection } from '../../components/feature/InputPage/Step3/OwnerVerifySection';
import { UploadAutoDeleteNotice } from '../../components/feature/InputPage/Step3/UploadAutoDeleteNotice';
import type {
  FileMap,
  UploadedFile,
  UploaderKey,
} from '../../constants/uploadedFile';

interface UploadSectionProps {
  files: FileMap;
  onFilesChange: (key: UploaderKey, files: UploadedFile[]) => void;
  isMaskingConfirmed: boolean;
  onMaskingConfirmChange: (confirmed: boolean) => void;
  isOwnerVerifyConfirmed: boolean;
  onOwnerVerifyConfirmChange: (confirmed: boolean) => void;
}

export function UploadSection({
  files,
  onFilesChange,
  isMaskingConfirmed,
  onMaskingConfirmChange,
  isOwnerVerifyConfirmed,
  onOwnerVerifyConfirmChange,
}: UploadSectionProps) {
  return (
    <Wrap>
      <FileUploader
        files={files}
        onFilesChange={onFilesChange}
        isMaskingConfirmed={isMaskingConfirmed}
        onMaskingConfirmChange={onMaskingConfirmChange}
      />
      <OwnerVerifySection
        checked={isOwnerVerifyConfirmed}
        onChange={onOwnerVerifyConfirmChange}
      />
      <UploadAutoDeleteNotice />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
