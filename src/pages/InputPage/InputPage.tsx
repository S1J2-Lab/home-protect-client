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
import { initAnalysis } from '../../api/analyzing';
import { getApiErrorMessage, type ApiError } from '../../api/error';
import { saveAnalysisSessionId } from '../../utils/analysisStorage';

const INPUT_STEPS = ['address', 'contract', 'upload'] as const;

const INITIAL_FILES: FileMap = {
  registry: [],
  contract: [],
};

type OrderConfirmMap = Record<UploaderKey, boolean>;

const INITIAL_ORDER_CONFIRMED: OrderConfirmMap = {
  registry: false,
  contract: false,
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function InputPage() {
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [contractType, setContractType] = useState<ContractType>('jeonse');
  const [deposit, setDeposit] = useState(0);
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [files, setFiles] = useState<FileMap>(INITIAL_FILES);
  const [isMaskingConfirmed, setIsMaskingConfirmed] = useState(false);
  const [isOwnerVerifyConfirmed, setIsOwnerVerifyConfirmed] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<OrderConfirmMap>(
    INITIAL_ORDER_CONFIRMED,
  );
  const [analysisSessionId, setAnalysisSessionId] = useState<string | null>(
    null,
  );
  const [scanSessionIds, setScanSessionIds] = useState<
    Partial<Record<UploaderKey, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const currentStep = INPUT_STEPS[currentStepIndex];

  const isAddressStepNextDisabled = selectedAddress === null;

  const hasMultiPageFiles = Object.values(files).some(
    (list) => list.length > 1,
  );
  const isOrderConfirmed = Object.entries(orderConfirmed).every(
    ([key, confirmed]) => files[key as UploaderKey].length <= 1 || confirmed,
  );
  const isContractStepNextDisabled = isSubmitting;

  const isBothScanned =
    scanSessionIds.registry !== undefined &&
    scanSessionIds.contract !== undefined;

  const isUploadStepNextDisabled =
    !isBothScanned ||
    !isOwnerVerifyConfirmed ||
    (hasMultiPageFiles && !isOrderConfirmed);

  const handleContractNext = async () => {
    if (!selectedAddress || !startDate || !endDate) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const id = await initAnalysis({
        address: selectedAddress.roadAddress,
        jibunAddress: selectedAddress.jibunAddress,
        admCd: selectedAddress.admCd,
        rnMgtSn: selectedAddress.rnMgtSn,
        bdMgtSn: selectedAddress.bdMgtSn,
        mno: selectedAddress.mno,
        sno: selectedAddress.sno,
        deposit: deposit * 10000,
        monthlyRent: contractType !== 'jeonse' ? monthlyRent * 10000 : 0,
        contractType,
        contractPeriod: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        },
      });

      saveAnalysisSessionId(id);
      setAnalysisSessionId(id);
      setCurrentStepIndex((prev) => Math.min(prev + 1, INPUT_STEPS.length - 1));
    } catch (error) {
      setSubmitError(getApiErrorMessage(error as ApiError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadNext = () => {
    if (!analysisSessionId) return;
    navigate('/analyze', { state: { sessionId: analysisSessionId } });
  };

  const handleNext = () => {
    setCurrentStepIndex((prev) => Math.min(prev + 1, INPUT_STEPS.length - 1));
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleFilesChange = (key: UploaderKey, next: UploadedFile[]) => {
    setFiles((prev) => ({ ...prev, [key]: next }));
  };

  const handleOrderConfirmChange = (key: UploaderKey, confirmed: boolean) => {
    setOrderConfirmed((prev) => ({ ...prev, [key]: confirmed }));
  };

  const handleScanSuccess = (key: UploaderKey, id: string) => {
    setScanSessionIds((prev) => ({ ...prev, [key]: id }));
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
            monthlyRent={monthlyRent}
            onMonthlyRentChange={setMonthlyRent}
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
          />

          {submitError && <ErrorText>{submitError}</ErrorText>}

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
              onClick={handleContractNext}
              disabled={isContractStepNextDisabled}
            >
              {isSubmitting ? '준비 중...' : '다음'}
            </Button>
          </ButtonArea>
        </>
      )}

      {currentStep === 'upload' && (
        <>
          <UploadSection
            files={files}
            onFilesChange={handleFilesChange}
            onOrderConfirmChange={handleOrderConfirmChange}
            onScanSuccess={handleScanSuccess}
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
              onClick={handleUploadNext}
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

const ErrorText = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
`;
