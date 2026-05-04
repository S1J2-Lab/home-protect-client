import styled from '@emotion/styled';

export function StepSectionHeader() {
  return (
    <>
      <Eyebrow>사용 방법</Eyebrow>
      <Heading>3단계로 쉽고 간단하게!</Heading>
    </>
  );
}

const Eyebrow = styled.p`
  margin-bottom: 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 12px;
  font-weight: 800;
`;

const Heading = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
`;
