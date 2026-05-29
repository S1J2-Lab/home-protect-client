import styled from '@emotion/styled';
import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  start?: ReactNode;
  end?: ReactNode;
  startInteractive?: boolean;
  endInteractive?: boolean;
  width?: CSSProperties['width'];
}

export function Input({
  start,
  end,
  startInteractive = false,
  endInteractive = false,
  width,
  disabled,
  ...rest
}: InputProps) {
  return (
    <Wrapper $width={width}>
      {start && (
        <Slot
          $position="start"
          $interactive={startInteractive}
          $disabled={!!disabled}
        >
          {start}
        </Slot>
      )}
      <StyledInput
        $hasStart={!!start}
        $hasEnd={!!end}
        disabled={disabled}
        {...rest}
      />
      {end && (
        <Slot
          $position="end"
          $interactive={endInteractive}
          $disabled={!!disabled}
        >
          {end}
        </Slot>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $width?: CSSProperties['width'] }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${({ $width }) => $width ?? '100%'};
`;

const Slot = styled.span<{
  $position: 'start' | 'end';
  $interactive: boolean;
  $disabled: boolean;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 16px;
  font-weight: 500;
  pointer-events: ${({ $interactive, $disabled }) =>
    $disabled ? 'none' : $interactive ? 'auto' : 'none'};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  ${({ $position }) => ($position === 'start' ? 'left: 14px;' : 'right: 14px;')}
`;

const StyledInput = styled.input<{ $hasStart: boolean; $hasEnd: boolean }>`
  width: 100%;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 16px;
  outline: none;
  transition:
    border-color 0.15s,
    background 0.15s;

  padding: 12px ${({ $hasEnd }) => ($hasEnd ? '40px' : '14px')} 12px
    ${({ $hasStart }) => ($hasStart ? '40px' : '14px')};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;
