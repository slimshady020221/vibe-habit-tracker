import React, { useState, useEffect } from 'react';

// === 컴포넌트 import ===
import HabitList from './components/HabitList'; 
import HabitForm from './components/HabitForm';
import CalendarDashboard from './components/CalendarDashboard';
// ====================

// LocalStorage 유틸리티는 다음 단계에서 생성된 코드를 사용한다고 가정
import { loadHabits, saveHabits, checkHabitToday } from './utils/localStorage'; 

function App() {
  const [habits, setHabits] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false); // 습관 추가 폼 모달 상태

  // 1. 초기 로딩 (Local Storage)
  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  // 2. 습관 상태 저장
  useEffect(() => {
    // habits 배열이 변경될 때마다 LocalStorage에 저장
    saveHabits(habits);
  }, [habits]);

  // CRUD - C/U 기능 처리 (새 습관 추가 또는 수정)
  const handleSaveHabit = (newHabit) => {
    if (newHabit.id) {
      // 수정 (Update)
      setHabits(habits.map(h => (h.id === newHabit.id ? newHabit : h)));
    } else {
      // 생성 (Create) - 고유 ID 및 빈 기록 배열 부여
      setHabits([...habits, { 
        ...newHabit, 
        id: Date.now(), 
        records: [], // 날짜 기록 배열 (YYYY-MM-DD 형식)
        name: newHabit.name || "새 습관"
      }]);
    }
    setIsFormOpen(false);
  };

  // CRUD - D 기능 처리 (삭제)
  const handleDeleteHabit = (id) => {
    if (window.confirm('정말로 이 습관을 삭제하시겠습니까?')) {
        setHabits(habits.filter(h => h.id !== id));
    }
  };

  // 핵심 기능 1: 일일 체크
  const handleCheck = (habitId) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        // LocalStorage 유틸리티의 checkHabitToday 함수 사용
        return checkHabitToday(habit);
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-700">Vibe Habit Tracker</h1>
        <p className="text-gray-500">바이브 코딩 기말 프로젝트</p>
      </header>

      {/* 습관 추가 버튼 */}
      <button 
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-indigo-500 text-white shadow-lg hover:bg-indigo-600 transition-all z-10"
      >
        + 새 습관
      </button>

      {/* Habit Form Modal */}
      {isFormOpen && <HabitForm onSave={handleSaveHabit} onClose={() => setIsFormOpen(false)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* 오늘 할 일 목록 */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">오늘의 습관</h2>
          {/* HabitList 컴포넌트 사용 */}
          <HabitList 
            habits={habits} 
            onCheck={handleCheck} 
            onDelete={handleDeleteHabit} 
          />
        </div>

        {/* 월별 대시보드 (핵심 기능 3) */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">월별 기록</h2>
          {/* CalendarDashboard 컴포넌트 사용 */}
          <CalendarDashboard habits={habits} />
        </div>
      </div>

      <footer className="text-center mt-10 text-gray-400 text-sm">
          &copy; 2025 Vibe Coding Project. Developed with Gemini CLI.
      </footer>
    </div>
  );
}

export default App;