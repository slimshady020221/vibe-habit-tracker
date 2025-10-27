
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

/**
 * 로컬 스토리지의 습관 데이터를 JSON 파일로 내보냅니다.
 */
export const exportData = () => {
  try {
    const habits = loadHabits();
    const dataStr = JSON.stringify(habits, null, 2); // 예쁘게 포맷팅
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vibe-habits-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert('데이터가 성공적으로 내보내졌습니다.');
  } catch (error) {
    console.error("Failed to export data:", error);
    alert('데이터 내보내기에 실패했습니다.');
  }
};

/**
 * JSON 파일을 읽어 로컬 스토리지에 습관 데이터를 가져옵니다.
 */
export const importData = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedHabits = JSON.parse(e.target.result);
        // 간단한 데이터 유효성 검사
        if (Array.isArray(importedHabits)) {
          saveHabits(importedHabits);
          alert('데이터를 성공적으로 가져왔습니다! 페이지를 새로고침합니다.');
          window.location.reload(); // 변경사항을 적용하기 위해 페이지 새로고침
        } else {
          alert('잘못된 파일 형식입니다. 습관 배열이 포함된 JSON 파일을 선택해주세요.');
        }
      } catch (error) {
        console.error("Failed to import data:", error);
        alert('데이터 가져오기에 실패했습니다. 파일 형식을 확인해주세요.');
      }
    };
    reader.readAsText(file);
  };
  input.click();
};
