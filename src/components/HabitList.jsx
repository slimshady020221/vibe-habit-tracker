
import React from 'react';
import { getStreak } from '../utils/localStorage';

const HabitList = ({ habits, onCheck, onDelete }) => {
  const today = new Date().toISOString().slice(0, 10);

  if (habits.length === 0) {
    return <p className="text-center text-gray-500">아직 등록된 습관이 없습니다. 새로운 습관을 추가해보세요!</p>;
  }

  return (
    <ul className="space-y-4">
      {habits.map(habit => (
        <li key={habit.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
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
        </li>
      ))}
    </ul>
  );
};

export default HabitList;
