import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import { Check, Lock } from 'lucide-react';
import { Card } from '../../../common/Card';
import { Button } from '../../../common/Button';
import { UploaderCardHeader } from './UploaderCardHeader';
import { UploaderCounterBar } from './UploaderCounterBar';
import { UploaderEmptyDropZone } from './UploaderEmptyDropZone';
import { UploaderFileList } from './UploaderFileList';
import type {
  UploadedFile,
  UploaderConfig,
} from '../../../../constants/uploadedFile';
import { PRIVACY_ISSUE_KEYS } from '../../../../constants/uploadedFile';

const CONFIRM_ICON_SIZE = 14;
const CONFIRM_ICON_STROKE = 2.5;

interface FileUploaderCardProps {
  config: UploaderConfig;
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  onOrderConfirmChange: (confirmed: boolean) => void;
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
  onOrderConfirmChange,
}: FileUploaderCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const resetOrderConfirm = () => {
    setIsOrderConfirmed(false);
    onOrderConfirmChange(false);
  };

  const handleFiles = (list: FileList | null) => {
    if (!list || !list.length) return;
    const next: UploadedFile[] = Array.from(list).map((f, i) => ({
      id: `${Date.now()}-${i}-${f.name}`,
      name: f.name,
      size: f.size,
      ...inspectFile(f.name),
    }));
    onChange([...files, ...next]);
    if (isOrderConfirmed) resetOrderConfirm();
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = (id: string) => {
    onChange(files.filter((f) => f.id !== id));
    if (isOrderConfirmed) resetOrderConfirm();
  };

  const handleReorder = (next: UploadedFile[]) => {
    onChange(next);
  };

  const handleToggleConfirm = () => {
    const next = !isOrderConfirmed;
    setIsOrderConfirmed(next);
    onOrderConfirmChange(next);
  };

  const showConfirmButton = files.length > 1;

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
          accept="application/pdf,image/jpeg,image/png"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {files.length === 0 ? (
          <UploaderEmptyDropZone onClick={openPicker} />
        ) : (
          <UploaderFileList
            files={files}
            onRemove={handleRemove}
            onReorder={handleReorder}
            isLocked={isOrderConfirmed}
          />
        )}

        {showConfirmButton && (
          <Button
            variant={isOrderConfirmed ? 'outline' : 'primary'}
            size="sm"
            width="100%"
            iconStart={
              isOrderConfirmed ? (
                <Lock
                  size={CONFIRM_ICON_SIZE}
                  strokeWidth={CONFIRM_ICON_STROKE}
                  aria-hidden="true"
                />
              ) : (
                <Check
                  size={CONFIRM_ICON_SIZE}
                  strokeWidth={CONFIRM_ICON_STROKE}
                  aria-hidden="true"
                />
              )
            }
            onClick={handleToggleConfirm}
          >
            {isOrderConfirmed ? '순서 변경하기' : '이 순서로 확정하기'}
          </Button>
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
