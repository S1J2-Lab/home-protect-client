import styled from '@emotion/styled';
import { Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface DatePickerInputProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

export function DatePickerInput({
  selectedDate,
  onChange,
  placeholder = '연도-월-일',
}: DatePickerInputProps) {
  return (
    <Wrapper>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat="yyyy-MM-dd"
        customInput={
          <InputButton type="button" $isEmpty={!selectedDate}>
            {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : placeholder}
          </InputButton>
        }
        popperPlacement="bottom-start"
      />

      <CalendarIcon size={16} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker-popper {
    z-index: 20;
  }
`;

const InputButton = styled.button<{ $isEmpty: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 40px 0 16px;
  text-align: left;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme, $isEmpty }) =>
    $isEmpty ? theme.colors.textMuted : theme.colors.text};
  font-size: 14px;
  cursor: pointer;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const CalendarIcon = styled(Calendar)`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text};
  pointer-events: none;
`;
