
import React, { useState } from 'react';

const CalendarDashboard = ({ habits }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const completedDates = new Set(habits.flatMap(habit => habit.completedDates));

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endOfMonth.getDay()));

  const dates = [];
  let date = new Date(startDate);
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">‹</button>
        <h2 className="text-lg font-semibold">{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</h2>
        <button onClick={nextMonth} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {daysOfWeek.map(day => (
          <div key={day} className="font-medium text-gray-600">{day}</div>
        ))}
        {dates.map((d, index) => {
          const dateString = d.toISOString().slice(0, 10);
          const isCompleted = completedDates.has(dateString);
          const isCurrentMonth = d.getMonth() === currentDate.getMonth();
          const isToday = new Date().toISOString().slice(0, 10) === dateString;

          return (
            <div
              key={index}
              className={`w-9 h-9 flex items-center justify-center rounded-full ${isCurrentMonth ? 'text-gray-800' : 'text-gray-300'} ${isToday ? 'border-2 border-blue-500' : ''}`}>
              <span className={`w-7 h-7 flex items-center justify-center rounded-full ${isCompleted ? 'bg-green-400 text-white' : ''}`}>
                {d.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDashboard;
