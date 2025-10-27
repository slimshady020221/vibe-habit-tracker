
import React from 'react';
import { getStreak } from '../utils/localStorage';

// Helper to get the start of the current week (Sunday)
const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
}

// ProgressBar Component
const ProgressBar = ({ percentage }) => {
  const cappedPercentage = Math.min(percentage, 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${cappedPercentage}%` }}
      ></div>
    </div>
  );
};

const HabitList = ({ habits, onCheck, onDelete }) => {
  const today = new Date().toISOString().slice(0, 10);

  const calculateProgress = (habit) => {
    const { frequency, targetCount, completedDates } = habit;
    if (!completedDates) return { current: 0, percentage: 0 };

    const now = new Date();
    let relevantCompletions = [];

    if (frequency === 'Daily') {
        // Daily progress is just 0% or 100% for the day
        const isCompletedToday = completedDates.includes(today);
        return { current: isCompletedToday ? 1 : 0, percentage: isCompletedToday ? 100 : 0 };
    } else if (frequency === 'Weekly') {
        const startOfWeek = getStartOfWeek(now);
        startOfWeek.setHours(0, 0, 0, 0);
        relevantCompletions = completedDates.filter(date => new Date(date) >= startOfWeek);
    } else if (frequency === 'Monthly') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        relevantCompletions = completedDates.filter(date => new Date(date) >= startOfMonth);
    }
    
    const percentage = targetCount > 0 ? (relevantCompletions.length / targetCount) * 100 : 0;
    return { current: relevantCompletions.length, percentage };
  };

  if (habits.length === 0) {
    return <p className="text-center text-gray-500">아직 등록된 습관이 없습니다. 새로운 습관을 추가해보세요!</p>;
  }

  return (
    <ul className="space-y-4">
      {habits.map(habit => {
        const progress = calculateProgress(habit);
        return (
          <li key={habit.id} className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <button
                  onClick={() => onCheck(habit.id)}
                  className={`w-8 h-8 rounded-full border-2 flex-shrink-0 mr-4 flex items-center justify-center ${habit.completedDates?.includes(today) ? 'bg-green-500 border-green-600 text-white' : 'border-gray-300 hover:bg-gray-100'}`}
                >
                  {habit.completedDates?.includes(today) && '✔'}
                </button>
                <span className="font-medium text-gray-800">{habit.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-4">
                  연속 {getStreak(habit.completedDates)}일
                </span>
                <button
                  onClick={() => onDelete(habit.id)}
                  className="text-gray-400 hover:text-red-500 font-bold py-1 px-2 rounded"
                >
                  ✕
                </button>
              </div>
            </div>
            {habit.frequency !== 'Daily' && (
                <div className="mt-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>진행률</span>
                        <span>{progress.current} / {habit.targetCount}</span>
                    </div>
                    <ProgressBar percentage={progress.percentage} />
                </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default HabitList;
