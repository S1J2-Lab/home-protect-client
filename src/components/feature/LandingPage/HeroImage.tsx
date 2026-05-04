import styled from '@emotion/styled';
import heroImg from '../../../assets/hero-house-contract.png';

export function HeroImage() {
  return (
    <ImageWrap>
      <img
        src={heroImg}
        alt="전세 계약서 분석 일러스트"
        width={1024}
        height={1024}
      />
    </ImageWrap>
  );
}

const ImageWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0 32px;

  &::before {
    content: '';
    position: absolute;
    width: 88%;
    aspect-ratio: 1;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors.primaryLight} 0%,
      ${({ theme }) => theme.colors.primarySoft} 60%,
      transparent 75%
    );
    border-radius: ${({ theme }) => theme.radius.full};
    z-index: 0;
  }

  img {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 280px;
    height: auto;
  }
`;
