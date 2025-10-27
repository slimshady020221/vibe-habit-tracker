import React, { useState, useEffect, useMemo } from 'react';
import { loadHabits, saveHabits, exportData, importData } from './utils/localStorage';
import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm';
import CalendarDashboard from './components/CalendarDashboard';

const App = () => {
  const [habits, setHabits] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [sortKey, setSortKey] = useState('name');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    setHabits(loadHabits());
  }, []);

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSaveHabit = (habitData) => {
    const newHabitObject = {
      id: Date.now(),
      completedDates: [],
      ...habitData,
    };
    setHabits([...habits, newHabitObject]);
    setIsFormVisible(false);
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
          return { ...habit, completedDates: completedDates.filter(date => date !== today) };
        } else {
          return { ...habit, completedDates: [...completedDates, today] };
        }
      }
      return habit;
    }));
  };

  const sortedHabits = useMemo(() => {
    const sortableHabits = [...habits];
    if (sortKey === 'name') {
      sortableHabits.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sortableHabits;
  }, [habits, sortKey]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto py-4 px-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vibe Habit Tracker</h1>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button
                onClick={importData}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
              >
                가져오기
              </button>
              <button
                onClick={exportData}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm"
              >
                내보내기
              </button>
              <button
                onClick={() => setIsFormVisible(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                + 새 습관
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto py-6 px-4">
          <div className="mb-6">
              <CalendarDashboard habits={habits} />
          </div>

          <div className="mb-4 flex justify-end">
              <select 
                  onChange={(e) => setSortKey(e.target.value)} 
                  value={sortKey}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                  <option value="name">이름순 (A-Z)</option>
              </select>
          </div>

          <HabitList
            habits={sortedHabits}
            onCheck={handleCheck}
            onDelete={handleDeleteHabit}
          />

          {isFormVisible && (
            <HabitForm
              show={isFormVisible}
              onClose={() => setIsFormVisible(false)}
              onSave={handleSaveHabit}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;