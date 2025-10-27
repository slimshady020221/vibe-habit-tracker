
import React, { useState, useEffect } from 'react';
import { loadHabits, saveHabits } from './utils/localStorage';
import { getStreak } from './utils/localStorage';

const App = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const handleSaveHabit = () => {
    if (newHabit.trim() === '') return;
    const newHabitObject = {
      id: Date.now(),
      name: newHabit,
      completedDates: [],
    };
    setHabits([...habits, newHabitObject]);
    setNewHabit('');
  };

  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const handleCheck = (habitId) => {
    const today = new Date().toISOString().slice(0, 10);
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const completedDates = habit.completedDates || [];
        if (completedDates.includes(today)) {
          // 이미 체크된 경우, 체크 해제
          return { ...habit, completedDates: completedDates.filter(date => date !== today) };
        } else {
          // 체크되지 않은 경우, 체크
          return { ...habit, completedDates: [...completedDates, today] };
        }
      }
      return habit;
    }));
  };


  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow">
        <div className="max-w-3xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Vibe Habit Tracker</h1>
        </div>
      </header>
      <main className="max-w-3xl mx-auto py-6 px-4">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">새로운 습관 추가</h2>
          <div className="flex">
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="예: 매일 아침 30분 운동하기"
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSaveHabit}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              추가
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">나의 습관 목록</h2>
          {habits.length > 0 ? (
            <ul className="space-y-4">
              {habits.map(habit => (
                <li key={habit.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                  <div>
                    <span className="font-medium">{habit.name}</span>
                    <span className="text-sm text-gray-500 ml-4">
                      연속 성공: {getStreak(habit.completedDates)}일
                    </span>
                  </div>
                  <div className="flex items-center">
                     <button
                      onClick={() => handleCheck(habit.id)}
                      className={`w-8 h-8 rounded-full border-2 ${habit.completedDates && habit.completedDates.includes(new Date().toISOString().slice(0, 10)) ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                    >
                      {habit.completedDates && habit.completedDates.includes(new Date().toISOString().slice(0, 10)) && '✔'}
                    </button>
                    <button
                      onClick={() => handleDeleteHabit(habit.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">아직 등록된 습관이 없습니다. 새로운 습관을 추가해보세요!</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
