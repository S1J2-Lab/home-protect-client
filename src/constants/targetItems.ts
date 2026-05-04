import studentImg from '../assets/target-student.png';
import coupleImg from '../assets/target-couple.png';
import familyImg from '../assets/target-family.png';
import investorImg from '../assets/target-investor.png';

interface TargetItem {
  img: string;
  title: string;
  desc: string;
}

export const TARGET_ITEMS: TargetItem[] = [
  {
    img: studentImg,
    title: '사회초년생 / 대학생',
    desc: '처음 계약하는 전세,\n꼼꼼히 확인하고 싶다면!',
  },
  {
    img: coupleImg,
    title: '신혼부부',
    desc: '소중한 보금자리,\n안전하게 지키고 싶다면!',
  },
  {
    img: familyImg,
    title: '이사 계획 가족',
    desc: '가족의 안전을 위해\n사전 점검은 필수!',
  },
  {
    img: investorImg,
    title: '투자자 / 집주인',
    desc: '객관적인 정보로\n리스크를 줄이고 싶다면!',
  },
];
