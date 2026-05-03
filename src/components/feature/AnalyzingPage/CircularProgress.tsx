import styled from '@emotion/styled';

interface CircularProgressProps {
  value: number;
}

export function CircularProgress({ value }: CircularProgressProps) {
  const safeValue = Math.min(Math.max(value, 0), 100);
  const radius = 48;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (safeValue / 100) * circumference;

  return (
    <ProgressWrapper>
      <svg width={radius * 2} height={radius * 2}>
        <CircleBackground
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <CircleProgress
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <ProgressText>{safeValue}%</ProgressText>
    </ProgressWrapper>
  );
}

const ProgressWrapper = styled.div`
  position: relative;
  width: 96px;
  height: 96px;
  flex-shrink: 0;
`;

const CircleBackground = styled.circle`
  fill: transparent;
  stroke: ${({ theme }) => theme.colors.primarySoft};
`;

const CircleProgress = styled.circle`
  fill: transparent;
  stroke: ${({ theme }) => theme.colors.primary};
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 0.3s ease;
`;

const ProgressText = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  font-weight: 800;
`;
