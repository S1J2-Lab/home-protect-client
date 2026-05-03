import styled from '@emotion/styled';
import { Shield } from 'lucide-react';

export function AnalysisNotice() {
  return (
    <NoticeBox>
      <Shield size={18} />
      <p>분석은 보통 1~2분 정도 소요돼요. 새로고침 없이 기다려주세요.</p>
    </NoticeBox>
  );
}

const NoticeBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};

  p {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.5;
  }

  svg {
    flex-shrink: 0;
    margin-top: 10px;
  }
`;
