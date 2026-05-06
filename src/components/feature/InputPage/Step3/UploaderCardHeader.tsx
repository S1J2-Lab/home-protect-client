import styled from '@emotion/styled';
import { Card } from '../../../common/Card';
import type { UploaderConfig } from '../../../../constants/uploadedFile';

const ICON_SIZE = 18;
const ICON_STROKE_WIDTH = 2.2;

type UploaderCardHeaderProps = Pick<UploaderConfig, 'Icon' | 'title' | 'desc'>;

export function UploaderCardHeader({
  Icon,
  title,
  desc,
}: UploaderCardHeaderProps) {
  return (
    <Header>
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
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
`;

const IconBox = styled(Card)`
  width: 36px;
  height: 36px;
  padding: 0;
  gap: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Desc = styled.p`
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
