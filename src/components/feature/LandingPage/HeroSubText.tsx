import styled from '@emotion/styled';

export function HeroSubText() {
  return (
    <Sub>
      AI가 공공데이터와 법적 정보를 분석해
      <br />
      전세 위험 요소를 알려드려요.
    </Sub>
  );
}

const Sub = styled.p`
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.textSub};
`;
