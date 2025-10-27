// src/components/HabitList.jsx (최종 코드)
import React from 'react';
import StreakBadge from './StreakBadge'; // StreakBadge 컴포넌트를 사용합니다.

// 진행률 계산 함수
const calculateProgress = (habit) => {
    const progress = (habit.records?.length || 0) / (habit.targetCount || 1);
    return Math.min(progress, 1) * 100;
};

const HabitList = ({ habits, onCheck, onDelete }) => {
    const today = new Date().toDateString(); // 날짜 형식 일치 확인

    if (!habits || habits.length === 0) { // habits가 null/undefined일 경우도 처리
        return (
            <p className="text-gray-500 p-4 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-300">
                아직 등록된 습관이 없습니다. '+' 버튼을 눌러 시작하세요!
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {habits.map(habit => {
                // habit 객체 및 records 배열 유효성 검사 추가
                if (!habit || !habit.id) return null; // 유효하지 않은 habit 건너뛰기
                const records = habit.records || [];
                const isChecked = records.includes(today);
                const progress = calculateProgress(habit);

                return (
                    <div key={habit.id} className="p-4 bg-white rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center dark:bg-gray-800">
                        <div className="flex-grow mb-3 md:mb-0">
                            <div className="flex items-center">
                                <span
                                  className={`font-semibold text-lg mr-2 border-l-4 pl-2 ${isChecked ? 'text-green-600 border-green-500' : 'text-gray-800 dark:text-gray-200 border-transparent'}`}
                                  // Day 11 커스텀 색상 반영 (선택 사항)
                                  style={habit.customColor ? { borderLeftColor: habit.customColor } : {}}
                                >
                                    {habit.name}
                                </span>
                                <StreakBadge habit={habit} />
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                목표: {habit.type} {habit.targetCount}회
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                                <div
                                    className="h-2.5 rounded-full bg-indigo-500 transition-all duration-500"
                                    style={{ width: `${progress}%`, backgroundColor: habit.customColor || '#4f46e5' }} // 커스텀 색상 반영
                                ></div>
                            </div>
                            <span className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 block">{progress.toFixed(0)}% 완료</span>
                        </div>
                        <div className="flex items-center space-x-2 ml-0 md:ml-4">
                            <button
                                onClick={() => onCheck(habit.id)}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${isChecked ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200 dark:bg-indigo-700 dark:text-indigo-100'}`}
                            >
                                {isChecked ? '오늘 완료!' : '체크하기'}
                            </button>
                            <button onClick={() => onDelete(habit.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors">
                                삭제
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HabitList;