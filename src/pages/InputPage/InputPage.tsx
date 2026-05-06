import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { AddressSection } from './AddressSection';
import { ContractSection } from './ContractSection';
import { UploadSection } from './UploadSection';
import type { ContractType } from '../../constants/contract';
import type { Address } from '../../types/address';
import type {
  FileMap,
  UploadedFile,
  UploaderKey,
} from '../../constants/uploadedFile';

const INPUT_STEPS = ['address', 'contract', 'upload'] as const;

const INITIAL_FILES: FileMap = {
  registry: [],
  contract: [],
};

export function InputPage() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [contractType, setContractType] = useState<ContractType>('jeonse');
  const [deposit, setDeposit] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [files, setFiles] = useState<FileMap>(INITIAL_FILES);
  const [isMaskingConfirmed, setIsMaskingConfirmed] = useState(false);
  const [isOwnerVerifyConfirmed, setIsOwnerVerifyConfirmed] = useState(false);

  const currentStep = INPUT_STEPS[currentStepIndex];

  const isAddressStepNextDisabled = selectedAddress === null;

  const hasWarningFiles = Object.values(files).some((list) =>
    list.some((f) => f.status === 'warning'),
  );
  const isUploadStepNextDisabled =
    (hasWarningFiles && !isMaskingConfirmed) || !isOwnerVerifyConfirmed;

  const handleNext = () => {
    if (currentStep === 'upload') {
      navigate('/analyze');
      return;
    }
    setCurrentStepIndex((prev) => Math.min(prev + 1, INPUT_STEPS.length - 1));
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleFilesChange = (key: UploaderKey, next: UploadedFile[]) => {
    if (next.length > files[key].length) setIsMaskingConfirmed(false);
    setFiles((prev) => ({ ...prev, [key]: next }));
  };

  return (
    <PageWrapper>
      {currentStep === 'address' && (
        <>
          <AddressSection
            selectedAddress={selectedAddress}
            onSelect={setSelectedAddress}
          />

          <ButtonArea>
            <Button
              variant="primary"
              size="lg"
              width="100%"
              onClick={handleNext}
              disabled={isAddressStepNextDisabled}
            >
              다음
            </Button>
          </ButtonArea>
        </>
      )}

      {currentStep === 'contract' && (
        <>
          <ContractSection
            contractType={contractType}
            onContractTypeChange={setContractType}
            deposit={deposit}
            onDepositChange={setDeposit}
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
          />

          <ButtonArea>
            <Button
              variant="outline"
              size="lg"
              width="100%"
              onClick={handlePrev}
            >
              이전
            </Button>

            <Button
              variant="primary"
              size="lg"
              width="100%"
              onClick={handleNext}
            >
              다음
            </Button>
          </ButtonArea>
        </>
      )}

      {currentStep === 'upload' && (
        <>
          <UploadSection
            files={files}
            onFilesChange={handleFilesChange}
            isMaskingConfirmed={isMaskingConfirmed}
            onMaskingConfirmChange={setIsMaskingConfirmed}
            isOwnerVerifyConfirmed={isOwnerVerifyConfirmed}
            onOwnerVerifyConfirmChange={setIsOwnerVerifyConfirmed}
          />

          <ButtonArea>
            <Button
              variant="outline"
              size="lg"
              width="100%"
              onClick={handlePrev}
            >
              이전
            </Button>

            <Button
              variant="primary"
              size="lg"
              width="100%"
              onClick={handleNext}
              disabled={isUploadStepNextDisabled}
            >
              다음: 분석 시작하기
            </Button>
          </ButtonArea>
        </>
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  min-height: calc(100dvh - 180px);
  display: flex;
  flex-direction: column;
`;

const ButtonArea = styled.div`
  margin-top: auto;
  display: flex;
  gap: 8px;
  padding-top: 24px;
`;
