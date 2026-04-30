import type { HTMLAttributes, ReactNode } from 'react';
import styled from '@emotion/styled';
import { TAG_COLORS, type TagVariant } from '../../constants/tag';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant: TagVariant;
  children: ReactNode;
}

export function Tag({ variant, children, ...rest }: TagProps) {
  return (
    <TagContainer $variant={variant} {...rest}>
      {children}
    </TagContainer>
  );
}

const TagContainer = styled.span<{
  $variant: TagVariant;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;
  padding: 2px 9px;
  font-size: 11px;
  font-weight: 600;
  height: 22px;
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ theme, $variant }) => theme.colors[TAG_COLORS[$variant].color]};
  background: ${({ theme, $variant }) =>
    theme.colors[TAG_COLORS[$variant].background]};

  svg {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
  }
`;
