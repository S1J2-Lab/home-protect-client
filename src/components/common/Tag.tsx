import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { theme } from '../../styles/theme';

type TagVariant = 'success' | 'warning' | 'danger';

interface TagProps {
  variant: TagVariant;
  children: ReactNode;
}

export function Tag({ variant, children, ...props }: TagProps) {
  return (
    <TagContainer $variant={variant} {...props}>
      {children}
    </TagContainer>
  );
}

const TAG_COLORS = {
  success: {
    color: theme.colors.success,
    background: theme.colors.successBg,
  },
  warning: {
    color: theme.colors.warning,
    background: theme.colors.warningBg,
  },
  danger: {
    color: theme.colors.danger,
    background: theme.colors.dangerBg,
  },
} as const;

const TagContainer = styled.div<{ $variant: TagVariant }>`
  display: inline-block;
  align-items: center;
  gap: 4px;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ $variant }) => TAG_COLORS[$variant].color};
  background: ${({ $variant }) => TAG_COLORS[$variant].background};

  svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }
`;
