import styled from '@emotion/styled';
import { TriangleAlert } from 'lucide-react';

const ICON_SIZE = 16;
const ICON_STROKE_WIDTH = 2.4;

export function OwnerVerifyBanner() {
  return (
    <Banner>
      <IconBox>
        <TriangleAlert
          size={ICON_SIZE}
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden="true"
        />
      </IconBox>
      <Body>
        <h4>소유자 일치 확인</h4>
        <p>계약서상 임대인과 등기부등본상 소유자가 같은지 직접 확인해주세요.</p>
        <p>이름, 공동소유 여부, 대리인 계약 여부 등을 꼼꼼히 살펴보세요.</p>
      </Body>
    </Banner>
  );
}

const Banner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.warningBg};
  border: 1px solid ${({ theme }) => theme.colors.warningLight};
`;

const IconBox = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.warningLight};
  color: ${({ theme }) => theme.colors.warning};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Body = styled.div`
  flex: 1;

  > h4 {
    font-size: 13.5px;
    font-weight: 800;
    color: #92400e;
    margin-bottom: 6px;
  }

  > p {
    font-size: 12.5px;
    line-height: 1.55;
    color: #92400e;

    & + p {
      margin-top: 4px;
    }
  }
`;
