import styled from '@emotion/styled';

function App() {
  return (
    <Page>
      <Card>
        <Badge>공용 스타일 테스트</Badge>

        <Title>지켜줘 홈즈</Title>
        <Description>
          공통 색상, radius, shadow, font가 Emotion theme으로 잘 적용되는지
          확인하는 화면입니다.
        </Description>

        <ButtonGroup>
          <PrimaryButton>primary 버튼</PrimaryButton>
          <SecondaryButton>secondary 버튼</SecondaryButton>
        </ButtonGroup>

        <InfoBox>
          <strong>전역 스타일 확인</strong>
          <p>
            배경색, 카드 색상, border, radius, shadow가 적용되는지 확인하세요.
          </p>
        </InfoBox>
      </Card>
    </Page>
  );
}

export default App;

const Page = styled.main`
  min-height: 100vh;
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.section`
  width: 100%;
  max-width: 420px;
  padding: 28px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

const Badge = styled.span`
  display: inline-flex;
  padding: 6px 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  background-color: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 13px;
  font-weight: 700;
`;

const Title = styled.h1`
  margin: 18px 0 8px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 32px;
  line-height: 1.2;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

const PrimaryButton = styled.button`
  flex: 1;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  font-weight: 700;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  padding: 12px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
`;

const InfoBox = styled.div`
  margin-top: 20px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background-color: ${({ theme }) => theme.colors.warningBg};
  color: ${({ theme }) => theme.colors.textSub};

  p {
    margin-top: 6px;
    line-height: 1.5;
  }
`;
