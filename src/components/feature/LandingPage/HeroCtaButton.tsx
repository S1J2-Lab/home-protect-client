import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { Button } from '../../common/Button';

export function HeroCtaButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/input');
  };

  return (
    <Button size="lg" width="100%" iconStart={<Upload />} onClick={handleClick}>
      분석 시작하기
    </Button>
  );
}
