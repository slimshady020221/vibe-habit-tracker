// src/components/StreakBadge.jsx
import React from 'react';
// localStorage 유틸리티에서 getStreak 함수를 가져옵니다.
import { getStreak } from '../utils/localStorage';

const StreakBadge = ({ habit }) => {
  // getStreak 함수를 사용하여 연속 성공일 계산
  const streak = getStreak(habit);

  // Streak이 0이면 아무것도 표시하지 않음
  if (streak === 0) return null;

  // Streak 뱃지 UI
  return (
    <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
      🔥 {streak}일 연속
    </span>
  );
};

export default StreakBadge;