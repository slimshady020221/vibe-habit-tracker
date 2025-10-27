// src/utils/localStorage.js (Day 14 최종 정리 버전)

const HABIT_STORAGE_KEY = 'vibe_habits';

/**
 * LocalStorage에서 습관 목록을 불러옵니다.
 * @returns {Array} 습관 목록
 */
export const loadHabits = () => {
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
 * @param {Array} habits - 저장할 습관 목록
 */
export const saveHabits = (habits) => {
    try {
        const serializedHabits = JSON.stringify(habits);
        localStorage.setItem(HABIT_STORAGE_KEY, serializedHabits);
    } catch (e) {
    }
};

/**
 * 습관 객체의 오늘의 기록을 체크하거나 체크 해제합니다.
 * @param {Object} habit - 습관 객체
 * @returns {Object} 기록이 업데이트된 습관 객체
 */
export const checkHabitToday = (habit) => {
    const today = new Date().toDateString();
    const records = habit.records || [];

    if (records.includes(today)) {
        // 이미 기록된 경우 제거 (체크 해제)
        return {
            ...habit,
            records: records.filter(date => date !== today)
        };
    } else {
        // 기록 추가 (체크)
        return {
            ...habit,
            records: [...records, today]
        };
    }
};

/**
 * 특정 습관의 연속 성공일(Streak)을 계산합니다.
 * (Day 2 구현 로직 - 간단화)
 * @param {Object} habit - 습관 객체
 * @returns {number} 연속 성공일 수
 */
export const getStreak = (habit) => {
    if (!habit.records || habit.records.length === 0) return 0;
    return habit.records.length; 
};