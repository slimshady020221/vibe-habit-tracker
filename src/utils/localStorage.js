// src/utils/localStorage.js (export 키워드 복구)

const HABIT_STORAGE_KEY = 'vibe_habits';

/**
 * LocalStorage에서 습관 목록을 불러옵니다.
 */
export const loadHabits = () => { // <<< export 추가!
    try {
        const serializedHabits = localStorage.getItem(HABIT_STORAGE_KEY);
        if (serializedHabits === null) {
            return [];
        }
        const habits = JSON.parse(serializedHabits);
        return Array.isArray(habits) ? habits : [];
    } catch (e) {
        return [];
    }
};

/**
 * 습관 목록을 LocalStorage에 저장합니다.
 */
export const saveHabits = (habits) => { // <<< export 추가!
    try {
        const serializedHabits = JSON.stringify(habits);
        localStorage.setItem(HABIT_STORAGE_KEY, serializedHabits);
    } catch (e) {
        // 오류 처리
    }
};

/**
 * 습관 객체의 오늘의 기록을 체크하거나 체크 해제합니다. (날짜 형식 수정)
 */
export const checkHabitToday = (habit) => { // <<< export 확인!
    const today = new Date().toISOString().split('T')[0];
    const records = habit.records || [];

    let updatedRecords;
    if (records.includes(today)) {
        updatedRecords = records.filter(date => date !== today);
    } else {
        updatedRecords = [...records, today];
    }
    updatedRecords.sort();

    return {
        ...habit,
        records: updatedRecords
    };
};

/**
 * 특정 습관의 연속 성공일(Streak)을 계산합니다.
 */
export const getStreak = (habit) => { // <<< export 추가!
    if (!habit || !habit.records || habit.records.length === 0) return 0;

    const sortedRecords = [...habit.records].map(dateStr => new Date(dateStr)).sort((a, b) => b - a);
    if (sortedRecords.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let currentDate = new Date(today);

    for (let i = 0; i < sortedRecords.length; i++) {
        const recordDate = new Date(sortedRecords[i]);
        recordDate.setHours(0, 0, 0, 0);

        const expectedDate = new Date(currentDate);
        if (streak > 0 || recordDate.getTime() === today.getTime()){ // 오늘 기록이 있거나, 이미 연속 계산 중이면 어제를 비교
             expectedDate.setDate(currentDate.getDate() - 1);
        }
         expectedDate.setHours(0,0,0,0);


        if (recordDate.getTime() === expectedDate.getTime() || (i === 0 && recordDate.getTime() === today.getTime())) { // 오늘 기록이거나, 어제 기록과 연속될 때
             streak++;
             currentDate = new Date(recordDate); // 다음 비교를 위해 현재 날짜 업데이트
        } else if (recordDate < expectedDate) {
             break;
        }
    }

     // 가장 최근 기록이 오늘이 아닌 경우, 어제까지 연속되었는지 추가 확인
      if (streak > 0 && sortedRecords[0].getTime() !== today.getTime()) {
          const yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          if (sortedRecords[0].getTime() !== yesterday.getTime()) {
              streak = 0; // 가장 최근 기록이 오늘이나 어제가 아니면 streak은 0
          }
      }

    return streak;
};