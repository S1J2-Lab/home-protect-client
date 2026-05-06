import styled from '@emotion/styled';
import { CircleAlert } from 'lucide-react';
import { PRIVACY_WARNING_MESSAGE } from '../../../../constants/uploadedFile';

const ICON_SIZE = 16;
const ICON_STROKE_WIDTH = 2.2;

export function PrivacyMaskingBanner() {
  return (
    <Banner>
      <CircleAlert
        size={ICON_SIZE}
        strokeWidth={ICON_STROKE_WIDTH}
        aria-hidden="true"
      />
      <BannerText>{PRIVACY_WARNING_MESSAGE}</BannerText>
    </Banner>
  );
}

const Banner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.warningBg};
  border: 1px solid ${({ theme }) => theme.colors.warningLight};
  color: ${({ theme }) => theme.colors.warning};
`;

const BannerText = styled.p`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
  white-space: pre-line;
`;
