import styled from '@emotion/styled';

export function HeroTitle() {
  return (
    <Title>
      계약서 작성 후,
      <br />
      <span>도장 찍기 전에</span>
      <br />
      업로드하세요!
    </Title>
  );
}

const Title = styled.h1`
  margin: 16px 0 12px;
  font-size: 28px;
  font-weight: 900;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.02em;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
