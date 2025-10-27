
// src/utils/localStorage.js

/**
 * 로컬 스토리지에서 습관 목록을 불러옵니다.
 * @returns {Array} 저장된 습관 목록 또는 빈 배열
 */
export const loadHabits = () => {
  try {
    const serializedHabits = localStorage.getItem('habits');
    if (serializedHabits === null) {
      return [];
    }
    return JSON.parse(serializedHabits);
  } catch (error) {
    console.error("Failed to load habits from local storage:", error);
    return [];
  }
};

/**
 * 습관 목록을 로컬 스토리지에 저장합니다.
 * @param {Array} habits - 저장할 습관 목록
 */
export const saveHabits = (habits) => {
  try {
    const serializedHabits = JSON.stringify(habits);
    localStorage.setItem('habits', serializedHabits);
  } catch (error) {
    console.error("Failed to save habits to local storage:", error);
  }
};

/**
 * 주어진 날짜 배열을 기반으로 현재 연속 성공일(streak)을 계산합니다.
 * @param {Array<string>} dates - 'YYYY-MM-DD' 형식의 날짜 문자열 배열
 * @returns {number} 연속 성공일
 */
export const getStreak = (dates) => {
  if (!dates || dates.length === 0) {
    return 0;
  }

  const sortedDates = dates.map(date => new Date(date)).sort((a, b) => b - a);
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDate = new Date(sortedDates[0]);
  firstDate.setHours(0, 0, 0, 0);

  // 가장 최근 날짜가 오늘 또는 어제인지 확인
  const diffTime = today.getTime() - firstDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays > 1) {
    return 0; // 연속이 끊김
  }
  
  streak = 1;

  for (let i = 0; i < sortedDates.length - 1; i++) {
    const currentDate = new Date(sortedDates[i]);
    currentDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(sortedDates[i + 1]);
    nextDate.setHours(0, 0, 0, 0);

    const timeDiff = currentDate.getTime() - nextDate.getTime();
    const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

    if (dayDiff === 1) {
      streak++;
    } else {
      break; // 연속이 끊기면 중단
    }
  }

  return streak;
};
