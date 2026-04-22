// 테스트
import styled from '@emotion/styled';

const TestBox = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.md};
`;

export default function App() {
  return <TestBox>테스트</TestBox>;
}
