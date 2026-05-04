import styled from '@emotion/styled';

export function TargetSectionHeader() {
  return (
    <>
      <Eyebrow>이런 분들께 추천해요!</Eyebrow>
      <Heading>
        전세 계약을 앞둔 누구나,
        <br />
        안심하고 확인하세요.
      </Heading>
    </>
  );
}

const Eyebrow = styled.p`
  margin: 0 0 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  font-weight: 800;
`;

const Heading = styled.h2`
  margin: 0 0 24px;
  text-align: center;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;
