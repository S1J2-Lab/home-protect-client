import { FileUploader } from '../../components/feature/InputPage/Step3/FileUploader';
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
}

export function UploadSection({
  files,
  onFilesChange,
  isMaskingConfirmed,
  onMaskingConfirmChange,
}: UploadSectionProps) {
  return (
    <FileUploader
      files={files}
      onFilesChange={onFilesChange}
      isMaskingConfirmed={isMaskingConfirmed}
      onMaskingConfirmChange={onMaskingConfirmChange}
    />
  );
}
