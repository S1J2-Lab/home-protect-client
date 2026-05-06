import styled from '@emotion/styled';
import { OwnerVerifyBanner } from './OwnerVerifyBanner';
import { OwnerVerifyToggle } from './OwnerVerifyToggle';

interface OwnerVerifySectionProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function OwnerVerifySection({
  checked,
  onChange,
}: OwnerVerifySectionProps) {
  return (
    <Wrap>
      <OwnerVerifyBanner />
      <OwnerVerifyToggle checked={checked} onChange={onChange} />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
