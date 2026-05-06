import styled from '@emotion/styled';
import { useRef } from 'react';
import { Card } from '../../../common/Card';
import { UploaderCardHeader } from './UploaderCardHeader';
import { UploaderCounterBar } from './UploaderCounterBar';
import { UploaderEmptyDropZone } from './UploaderEmptyDropZone';
import { UploaderFileList } from './UploaderFileList';
import type {
  UploadedFile,
  UploaderConfig,
} from '../../../../constants/uploadedFile';
import { PRIVACY_ISSUE_KEYS } from '../../../../constants/uploadedFile';

interface FileUploaderCardProps {
  config: UploaderConfig;
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
}

function inspectFile(name: string): Pick<UploadedFile, 'status' | 'issues'> {
  const looksUnmasked = /원본|raw|unmask|개인/.test(name);
  const flagged = name.length % 3 === 0;
  if (looksUnmasked || flagged) {
    const issues = PRIVACY_ISSUE_KEYS.filter(
      (_, i) => (name.length + i) % 2 === 0,
    ).slice(0, 3);
    return {
      status: 'warning',
      issues: issues.length ? [...issues] : ['주민등록번호 일부 노출'],
    };
  }
  return { status: 'ok', issues: [] };
}

export function FileUploaderCard({
  config,
  files,
  onChange,
}: FileUploaderCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => inputRef.current?.click();

  const handleFiles = (list: FileList | null) => {
    if (!list || !list.length) return;
    const next: UploadedFile[] = Array.from(list).map((f, i) => ({
      id: `${Date.now()}-${i}-${f.name}`,
      name: f.name,
      size: f.size,
      ...inspectFile(f.name),
    }));
    onChange([...files, ...next]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = (id: string) => {
    onChange(files.filter((f) => f.id !== id));
  };

  return (
    <StyledCard>
      <UploaderCardHeader
        Icon={config.Icon}
        title={config.title}
        desc={config.desc}
      />

      <Divider />

      <Body>
        <UploaderCounterBar count={files.length} onAdd={openPicker} />

        <HiddenInput
          ref={inputRef}
          type="file"
          multiple
          accept="application/pdf,image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {files.length === 0 ? (
          <UploaderEmptyDropZone onClick={openPicker} />
        ) : (
          <UploaderFileList
            files={files}
            onRemove={handleRemove}
            onReorder={onChange}
          />
        )}
      </Body>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  padding: 0;
  gap: 0;
  overflow: hidden;
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.borderLight};
`;

const Body = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HiddenInput = styled.input`
  display: none;
`;
