import React, { useState } from 'react';

interface Lifestyle {
  availableTime: string;
  noiseLevel: string;
  walkingFrequency: string;
}

interface UserLifestyleProps {
  onNext: () => void;
}

const UserLifestyle: React.FC<UserLifestyleProps> = ({ onNext }) => {
  const [lifestyle, setLifestyle] = useState<Lifestyle>({
    availableTime: '',
    noiseLevel: '',
    walkingFrequency: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLifestyle({
      ...lifestyle,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('유저 생활 패턴 제출:', lifestyle);
    onNext(); // 다음 단계로 이동
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>유저 생활 패턴</h2>

      <label>하루 중 강아지에게 직접적으로 할애할 수 있는 시간은 얼마입니까?</label>
      <select name="availableTime" value={lifestyle.availableTime} onChange={handleChange}>
        <option value="">선택하세요</option>
        <option value="30분 이하">30분 이하</option>
        <option value="30분 ~ 1시간">30분 ~ 1시간</option>
        <option value="1시간 이상">1시간 이상</option>
      </select>

      <label>거주하는 집의 소음 수준은 어떻습니까?</label>
      <select name="noiseLevel" value={lifestyle.noiseLevel} onChange={handleChange}>
        <option value="">선택하세요</option>
        <option value="매우 조용하다">매우 조용하다</option>
        <option value="적당하다">적당하다</option>
        <option value="소음이 많다">소음이 많다</option>
      </select>

      <label>강아지가 매일 산책을 얼마나 자주 해야 하길 원하십니까?</label>
      <select name="walkingFrequency" value={lifestyle.walkingFrequency} onChange={handleChange}>
        <option value="">선택하세요</option>
        <option value="필요하지 않다">매일 산책이 필요하지 않길 원한다</option>
        <option value="하루에 한 번">하루에 한 번 정도 산책했으면 좋겠다</option>
        <option value="하루에 두 번 이상">하루에 두 번 이상 산책이 필요하다</option>
      </select>

      <button type="submit">다음 단계</button>
    </form>
  );
};

export default UserLifestyle;
