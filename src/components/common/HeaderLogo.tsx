import styled from '@emotion/styled';

interface HeaderLogoProps {
  src: string;
  alt: string;
}

export function HeaderLogo({ src, alt }: HeaderLogoProps) {
  return (
    <LogoWrapper>
      <LogoImage src={src} alt={alt} />
    </LogoWrapper>
  );
}

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  height: 95px;
  object-fit: contain;
  transform: translateY(-17px);
`;
