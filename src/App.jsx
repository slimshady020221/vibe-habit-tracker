import React, { useState, useEffect, useMemo } from 'react';

// === 컴포넌트 import ===
import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm';
import CalendarDashboard from './components/CalendarDashboard';
import QuoteDisplay from './components/QuoteDisplay'; // 명언 컴포넌트 추가
// ====================

// LocalStorage 유틸리티
import { loadHabits, saveHabits, checkHabitToday } from './utils/localStorage';

function App() {
  const [habits, setHabits] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortKey, setSortKey] = useState('name');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // 초기 로딩
  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  // 상태 저장
  useEffect(() => {
    saveHabits(habits);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [habits, isDarkMode]);

  // 습관 저장 (생성/수정)
  const handleSaveHabit = (newHabit) => {
    if (newHabit.id) {
      setHabits(habits.map(h => (h.id === newHabit.id ? newHabit : h)));
    } else {
      setHabits([...habits, {
        ...newHabit,
        id: Date.now(),
        records: [],
        name: newHabit.name || "새 습관",
        type: newHabit.type || 'daily',
        targetCount: newHabit.targetCount || 1,
        customColor: newHabit.customColor || '#4f46e5'
      }]);
    }
    setIsFormOpen(false);
  };

  // 습관 삭제
  const handleDeleteHabit = (id) => {
    if (window.confirm('정말로 이 습관을 삭제하시겠습니까?')) {
        setHabits(habits.filter(h => h.id !== id));
    }
  };

  // 일일 체크
  const handleCheck = (habitId) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        return checkHabitToday(habit);
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  // 정렬 로직
  const sortedHabits = useMemo(() => {
      const sortableHabits = [...habits];
      sortableHabits.sort((a, b) => {
          if (sortKey === 'name') {
              return a.name.localeCompare(b.name);
          }
          if (sortKey === 'id') {
              return b.id - a.id;
          }
          return 0;
      });
      return sortableHabits;
  }, [habits, sortKey]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 transition-colors duration-500">

      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="p-2 rounded-full absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-20"
      >
        {isDarkMode ? '🌞 Light' : '🌙 Dark'}
      </button>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">Vibe Habit Tracker</h1>
        <p className="text-gray-500 dark:text-gray-400">바이브 코딩 기말 프로젝트</p>
      </header>

      {/* 새 습관 추가 버튼 */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-indigo-500 text-white shadow-lg hover:bg-indigo-600 transition-all z-10"
      >
        + 새 습관
      </button>

      {/* Habit Form 모달 */}
      {isFormOpen && (
        <HabitForm
          key={Date.now()} // 이전 문제 해결용 Key
          onSave={handleSaveHabit}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {/* 정렬 UI */}
      <div className="flex justify-end mb-4 max-w-7xl mx-auto lg:max-w-[calc(66.6666%-1rem)]">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 self-center">정렬 기준:</label>
          <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
          >
              <option value="name">이름순 (A-Z)</option>
              <option value="id">최신 등록순</option>
          </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {/* 오늘 할 일 목록 */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">오늘의 습관</h2>
          <HabitList
            habits={sortedHabits}
            onCheck={handleCheck}
            onDelete={handleDeleteHabit}
          />
        </div>

        {/* 월별 대시보드 및 명언 */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">월별 기록</h2>
          <CalendarDashboard habits={habits} />

          {/* === 명언 표시 컴포넌트 추가 === */}
          <QuoteDisplay />
          {/* ========================== */}
        </div>
      </div>

      <footer className="text-center mt-10 text-gray-400 dark:text-gray-600 text-sm">
          &copy; 2025 Vibe Coding Project. Developed with Gemini CLI.
      </footer>
    </div>
  );
}

export default App;