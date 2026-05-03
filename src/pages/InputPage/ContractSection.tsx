import styled from '@emotion/styled';
import { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { ContractTypeSelector } from '../../components/feature/ContractTypeSelector';
import { DatePickerInput } from '../../components/feature/DatePickerInput';
import type { ContractType } from '../../constants/contract';

export function ContractSection() {
  const [contractType, setContractType] = useState<ContractType>('jeonse');
  const [deposit, setDeposit] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Card>
      <SectionTitle>계약 정보</SectionTitle>

      <FieldGroup>
        <Label>계약 유형</Label>
        <ContractTypeSelector value={contractType} onChange={setContractType} />
      </FieldGroup>

      <FieldGroup>
        <Label>보증금</Label>
        <Input
          id="deposit"
          value={deposit}
          onChange={(event) => setDeposit(event.target.value)}
          placeholder="보증금을 입력해주세요"
          start={<span>₩</span>}
          end={<span>원</span>}
        />
      </FieldGroup>

      <FieldGroup>
        <Label>계약일</Label>

        <DateRow>
          <DatePickerInput
            selectedDate={startDate}
            onChange={setStartDate}
            placeholder="연도-월-일"
          />

          <DateSeparator>~</DateSeparator>

          <DatePickerInput
            selectedDate={endDate}
            onChange={setEndDate}
            placeholder="연도-월-일"
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
