import styled from '@emotion/styled';
import { Card } from '../../../common/Card';
import type { FooterItem } from '../../../../constants/footerItems';

const ICON_SIZE = 18;
const ICON_STROKE_WIDTH = 2.2;

type FooterFeatureCardProps = FooterItem;

export function FooterFeatureCard({
  Icon,
  title,
  desc,
}: FooterFeatureCardProps) {
  return (
    <Item>
      <IconBox>
        <Icon
          size={ICON_SIZE}
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden="true"
        />
      </IconBox>
      <TextWrap>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
      </TextWrap>
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const IconBox = styled(Card)`
  width: 36px;
  height: 36px;
  padding: 0;
  gap: 0;
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.p`
  font-size: 12.5px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Desc = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  white-space: pre-line;
`;
