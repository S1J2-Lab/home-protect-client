import styled from '@emotion/styled';
import { css } from '@emotion/react';
import type { Theme } from '@emotion/react';
import type { CSSProperties, ReactNode, ButtonHTMLAttributes } from 'react';

const ICON_ONLY_SIZE: Record<Size, string> = {
  sm: '28px',
  md: '32px',
  lg: '40px',
};

const BORDER_RADIUS: Record<Size, string> = {
  sm: '8px',
  md: '10px',
  lg: '12px',
};

const ICON_SIZE: Record<Size, string> = {
  sm: '14px',
  md: '16px',
  lg: '18px',
};

type Variant = 'primary' | 'outline' | 'ghost' | 'dashed';
type Size = 'sm' | 'md' | 'lg';
type GhostTone = 'blue' | 'black' | 'red';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  tone?: GhostTone;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  width?: CSSProperties['width'];
}

export function Button({
  variant = 'primary',
  size = 'md',
  tone = 'blue',
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
      $tone={tone}
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

function getVariantStyle($variant: Variant, $tone: GhostTone, theme: Theme) {
  switch ($variant) {
    case 'primary':
      return css`
        background: ${theme.colors.primary};
        color: ${theme.colors.surface};
        &:hover:not(:disabled),
        &:active:not(:disabled) {
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
        &:hover:not(:disabled),
        &:active:not(:disabled) {
          background: ${theme.colors.bg};
        }
      `;
    case 'ghost': {
      const GHOST_TONE: Record<GhostTone, { color: string; hoverBg: string }> =
        {
          blue: {
            color: theme.colors.primary,
            hoverBg: theme.colors.primarySoft,
          },
          black: { color: theme.colors.textSub, hoverBg: theme.colors.bg },
          red: { color: theme.colors.danger, hoverBg: theme.colors.dangerBg },
        };
      const { color, hoverBg } = GHOST_TONE[$tone];
      return css`
        background: transparent;
        color: ${color};
        padding: 0;
        &:hover:not(:disabled),
        &:active:not(:disabled) {
          background: ${hoverBg};
        }
      `;
    }
    case 'dashed':
      return css`
        background: ${theme.colors.primarySoft};
        color: ${theme.colors.primary};
        border: 1px dashed ${theme.colors.primary};
        &:hover:not(:disabled),
        &:active:not(:disabled) {
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
      border-radius: ${BORDER_RADIUS[$size]};
      svg {
        width: ${ICON_SIZE[$size]};
        height: ${ICON_SIZE[$size]};
      }
    `;
  }

  switch ($size) {
    case 'sm':
      return css`
        padding: 6px 10px;
        font-size: 12px;
        border-radius: ${BORDER_RADIUS.sm};
        gap: 4px;
        svg {
          width: ${ICON_SIZE.sm};
          height: ${ICON_SIZE.sm};
        }
      `;
    case 'md':
      return css`
        padding: 8px 12px;
        font-size: 12px;
        border-radius: ${BORDER_RADIUS.md};
        gap: 6px;
        svg {
          width: ${ICON_SIZE.md};
          height: ${ICON_SIZE.md};
        }
      `;
    case 'lg':
      return css`
        padding: 14px 20px;
        font-size: 15px;
        border-radius: ${BORDER_RADIUS.lg};
        gap: 6px;
        svg {
          width: ${ICON_SIZE.lg};
          height: ${ICON_SIZE.lg};
        }
      `;
  }
}

const StyledButton = styled.button<{
  $variant: Variant;
  $size: Size;
  $tone: GhostTone;
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

  ${({ $variant, $tone, theme }) => getVariantStyle($variant, $tone, theme)}
  ${({ $size, $isIconOnly }) => getSizeStyle($size, $isIconOnly)}
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
`;
