import styled from '@emotion/styled';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { ContractTypeSelector } from '../../components/feature/InputPage/ContractTypeSelector';
import { DatePickerInput } from '../../components/feature/InputPage/DatePickerInput';
import type { ContractType } from '../../constants/contract';

interface ContractSectionProps {
  contractType: ContractType;
  onContractTypeChange: (contractType: ContractType) => void;
  deposit: number;
  onDepositChange: (deposit: number) => void;
  monthlyRent: number;
  onMonthlyRentChange: (monthlyRent: number) => void;
  startDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  endDate: Date | null;
  onEndDateChange: (date: Date | null) => void;
}

export function ContractSection({
  contractType,
  onContractTypeChange,
  deposit,
  onDepositChange,
  monthlyRent,
  onMonthlyRentChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: ContractSectionProps) {
  const hasMonthlyRent = contractType !== 'jeonse';
  const handleStartDateChange = (date: Date | null) => {
    onStartDateChange(date);

    if (date && endDate && endDate < date) {
      onEndDateChange(null);
    }
  };

  return (
    <Card>
      <SectionTitle>계약 정보</SectionTitle>

      <FieldGroup>
        <Label>계약 유형</Label>
        <ContractTypeSelector
          value={contractType}
          onChange={onContractTypeChange}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="deposit">보증금</Label>
        <Input
          id="deposit"
          value={deposit || ''}
          onChange={(event) => onDepositChange(event.target.valueAsNumber)}
          type="number"
          placeholder="보증금을 입력해주세요"
          start={<span>₩</span>}
          end={<span>만원</span>}
        />
      </FieldGroup>

      {hasMonthlyRent && (
        <FieldGroup>
          <Label htmlFor="monthlyRent">월세</Label>
          <Input
            id="monthlyRent"
            value={monthlyRent || ''}
            onChange={(event) =>
              onMonthlyRentChange(event.target.valueAsNumber)
            }
            type="number"
            placeholder="월세를 입력해주세요"
            start={<span>₩</span>}
            end={<span>만원</span>}
          />
        </FieldGroup>
      )}

      <FieldGroup>
        <Label>계약일</Label>

        <DateRow>
          <DatePickerInput
            selectedDate={startDate}
            onChange={handleStartDateChange}
            placeholder="연도-월-일"
          />

          <DateSeparator>~</DateSeparator>

          <DatePickerInput
            selectedDate={endDate}
            onChange={onEndDateChange}
            placeholder="연도-월-일"
            minDate={startDate}
          />
        </DateRow>
      </FieldGroup>
    </Card>
  );
}

const SectionTitle = styled.h2`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const DateRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 8px;
`;

const DateSeparator = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`;
