import styled from '@emotion/styled';

export function FeatureSectionHeader() {
  return (
    <>
      <Eyebrow>지켜줘 홈즈가 도와드리는 것</Eyebrow>
      <Heading>
        계약 전, 꼭 확인해야 할
        <br />
        정보들을 한 번에!
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
