import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import { Check, Lock, CircleAlert, TriangleAlert } from 'lucide-react';
import { Card } from '../../../common/Card';
import { Button } from '../../../common/Button';
import { UploaderCardHeader } from './UploaderCardHeader';
import { UploaderCounterBar } from './UploaderCounterBar';
import { UploaderEmptyDropZone } from './UploaderEmptyDropZone';
import { UploaderFileList } from './UploaderFileList';
import type {
  UploadedFile,
  UploaderConfig,
  UploaderKey,
} from '../../../../constants/uploadedFile';
import { scanRegistry, scanContract } from '../../../../api/documentApi';
import { mergeFilesToPdf } from '../../../../utils/mergeFilesToPdf';
import { type ApiError } from '../../../../api/error';
import {
  saveRegistrySessionId,
  saveContractSessionId,
} from '../../../../utils/analysisStorage';

const CONFIRM_ICON_SIZE = 14;
const CONFIRM_ICON_STROKE = 2.5;
const ALERT_ICON_SIZE = 15;
const ALERT_ICON_STROKE = 2.2;

interface FileUploaderCardProps {
  config: UploaderConfig;
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  onOrderConfirmChange: (confirmed: boolean) => void;
  onScanSuccess: (key: UploaderKey, sessionId: string) => void;
}

type ScanError =
  | { code: 'PII_DETECTED'; message: string; nonMasked: string[] }
  | { code: 'OCR_FAILED'; message: string }
  | { code: string; message: string };

async function scanDocument(key: UploaderKey, file: File) {
  if (key === 'registry') {
    const result = await scanRegistry(file);
    return result.registrySessionId;
  }
  const result = await scanContract(file);
  return result.contractSessionId;
}

export function FileUploaderCard({
  config,
  files,
  onChange,
  onOrderConfirmChange,
  onScanSuccess,
}: FileUploaderCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<ScanError | null>(null);
  const [isErrorExpanded, setIsErrorExpanded] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const resetConfirm = () => {
    setIsOrderConfirmed(false);
    onOrderConfirmChange(false);
    setScanError(null);
    setIsErrorExpanded(false);
  };

  const handleFiles = (list: FileList | null) => {
    if (!list || !list.length) return;
    const next: UploadedFile[] = Array.from(list).map((f, i) => ({
      id: `${Date.now()}-${i}-${f.name}`,
      file: f,
      name: f.name,
      size: f.size,
      status: 'pending',
    }));
    onChange([...files, ...next]);
    if (isOrderConfirmed) resetConfirm();
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = (id: string) => {
    onChange(files.filter((f) => f.id !== id));
    if (isOrderConfirmed) resetConfirm();
  };

  const handleReorder = (next: UploadedFile[]) => {
    onChange(next);
  };

  const handleConfirm = async () => {
    if (isOrderConfirmed) {
      resetConfirm();
      return;
    }

    setIsScanning(true);
    setScanError(null);
    setIsErrorExpanded(false);
    onChange(files.map((f) => ({ ...f, status: 'loading' })));

    try {
      const merged = await mergeFilesToPdf(files.map((f) => f.file));
      const sessionId = await scanDocument(config.key, merged);

      onChange(files.map((f) => ({ ...f, status: 'safe' })));

      if (config.key === 'registry') {
        saveRegistrySessionId(sessionId);
      } else {
        saveContractSessionId(sessionId);
      }

      onScanSuccess(config.key, sessionId);
      setIsOrderConfirmed(true);
      onOrderConfirmChange(true);
    } catch (error) {
      const apiError = error as ApiError;
      onChange(files.map((f) => ({ ...f, status: 'error' })));

      if (apiError.code === 'PII_DETECTED') {
        setScanError({
          code: 'PII_DETECTED',
          message: apiError.message,
          nonMasked: apiError.nonMasked ?? [],
        });
      } else {
        setScanError({ code: apiError.code, message: apiError.message });
      }
    } finally {
      setIsScanning(false);
    }
  };

  const showConfirmButton = files.length > 0;

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
            isLocked={isOrderConfirmed || isScanning}
          />
        )}

        {showConfirmButton && (
          <Button
            variant={isOrderConfirmed ? 'outline' : 'primary'}
            size="sm"
            width="100%"
            disabled={isScanning}
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
            onClick={handleConfirm}
          >
            {isScanning
              ? '분석 중...'
              : isOrderConfirmed
                ? '순서 변경하기'
                : '이 순서로 확정하기'}
          </Button>
        )}

        {scanError && (
          <ErrorArea>
            <ErrorRow>
              <TriangleAlert
                size={ALERT_ICON_SIZE}
                strokeWidth={ALERT_ICON_STROKE}
                aria-hidden="true"
              />
              <ErrorMessage>{scanError.message}</ErrorMessage>
              {scanError.code === 'PII_DETECTED' && (
                <AlertToggleButton
                  type="button"
                  aria-label="감지된 항목 보기"
                  aria-expanded={isErrorExpanded}
                  onClick={() => setIsErrorExpanded((prev) => !prev)}
                >
                  <CircleAlert
                    size={ALERT_ICON_SIZE}
                    strokeWidth={ALERT_ICON_STROKE}
                    aria-hidden="true"
                  />
                </AlertToggleButton>
              )}
            </ErrorRow>
            {isErrorExpanded &&
              scanError.code === 'PII_DETECTED' &&
              'nonMasked' in scanError && (
                <IssueList>
                  {scanError.nonMasked.map((item: string) => (
                    <IssueItem key={item}>{item}</IssueItem>
                  ))}
                </IssueList>
              )}
          </ErrorArea>
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

const ErrorArea = styled.div`
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.dangerLight};
  background: ${({ theme }) => theme.colors.dangerBg};
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ErrorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.danger};
`;

const ErrorMessage = styled.p`
  flex: 1;
  font-size: 12.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.danger};
`;

const AlertToggleButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.danger};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.dangerLight};
  }
`;

const IssueList = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.colors.dangerLight};
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const IssueItem = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSub};

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: ${({ theme }) => theme.radius.full};
    background: ${({ theme }) => theme.colors.danger};
    flex-shrink: 0;
  }
`;
