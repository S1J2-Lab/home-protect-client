import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';
import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from 'react';

const ICON_ONLY_SIZE: Record<Size, string> = {
  sm: '28px',
  md: '32px',
  lg: '40px',
};

type Variant = 'primary' | 'outline' | 'ghost' | 'dashed';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  width?: CSSProperties['width'];
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  width,
  children,
  ...rest
}: ButtonProps) {
  const isIconOnly = !children && (!!iconStart || !!iconEnd);

  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $isIconOnly={isIconOnly}
      $width={width}
      {...rest}
    >
      {iconStart}
      {children}
      {iconEnd}
    </StyledButton>
  );
}

function getVariantStyle($variant: Variant, theme: Theme) {
  switch ($variant) {
    case 'primary':
      return css`
        background: ${theme.colors.primary};
        color: ${theme.colors.surface};
        &:hover:not(:disabled) {
          background: ${theme.colors.primaryDark};
        }
        &:disabled {
          background: ${theme.colors.textMuted};
        }
      `;
    case 'outline':
      return css`
        background: ${theme.colors.surface};
        color: ${theme.colors.text};
        border: 1px solid ${theme.colors.border};
        &:hover:not(:disabled) {
          background: ${theme.colors.bg};
        }
      `;
    case 'ghost':
      return css`
        background: transparent;
        color: ${theme.colors.primary};
        padding: 0;
        &:hover:not(:disabled) {
          color: ${theme.colors.primaryDark};
        }
      `;
    case 'dashed':
      return css`
        background: ${theme.colors.primarySoft};
        color: ${theme.colors.primary};
        border: 1px dashed ${theme.colors.primary};
        &:hover:not(:disabled) {
          background: ${theme.colors.primaryLight};
        }
      `;
  }
}

function getSizeStyle($size: Size, $isIconOnly: boolean) {
  if ($isIconOnly) {
    const dimension = ICON_ONLY_SIZE[$size];
    return css`
      width: ${dimension};
      height: ${dimension};
      padding: 0;
      flex-shrink: 0;
    `;
  }

  switch ($size) {
    case 'sm':
      return css`
        padding: 6px 10px;
        font-size: 12px;
        border-radius: 8px;
        gap: 4px;
      `;
    case 'md':
      return css`
        padding: 8px 12px;
        font-size: 12px;
        border-radius: 10px;
        gap: 6px;
      `;
    case 'lg':
      return css`
        padding: 14px 20px;
        font-size: 15px;
        border-radius: 12px;
        gap: 6px;
      `;
  }
}

const StyledButton = styled.button<{
  $variant: Variant;
  $size: Size;
  $isIconOnly: boolean;
  $width?: CSSProperties['width'];
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition:
    background 0.15s,
    color 0.15s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant, theme }) => getVariantStyle($variant, theme)}
  ${({ $size, $isIconOnly }) => getSizeStyle($size, $isIconOnly)}
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
`;
