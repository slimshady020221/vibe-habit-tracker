// src/components/CalendarDashboard.jsx (날짜 형식 YYYY-MM-DD 사용)
import React, { useState } from 'react';

// 캘린더 유틸리티 함수
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const CalendarDashboard = ({ habits }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-11
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // 해당 날짜(YYYY-MM-DD)에 완료된 습관 수 계산 (수정!)
    const getCompletionCount = (date) => {
        const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
        return habits.filter(habit => habit.records && habit.records.includes(dateString)).length;
    };

    // 달력 날짜 배열 생성
    const calendarDays = [];
    // 이전 달 빈 칸
    for (let i = 0; i < firstDayIndex; i++) {
        calendarDays.push({ day: null, count: 0 });
    }
    // 현재 달 날짜
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        calendarDays.push({
            day: day,
            count: getCompletionCount(date), // 수정된 함수 사용
            isToday: date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
        });
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800">
            {/* 월 네비게이션 UI */}
            <div className="flex justify-between items-center mb-4">
                <button onClick={goToPreviousMonth} className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">&lt;</button>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{year}년 {month + 1}월</h3>
                <button onClick={goToNextMonth} className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">&gt;</button>
            </div>

            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2 dark:text-gray-400">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (<div key={day}>{day}</div>))}
            </div>

            {/* 달력 날짜 */}
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((dayData, index) => (
                    <div
                        key={index}
                        className={`aspect-square flex items-center justify-center p-1 rounded-lg transition-colors
                            ${dayData.day === null ? 'bg-gray-50 dark:bg-gray-700' :
                            dayData.isToday ? 'border-2 border-indigo-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                        `}
                        title={dayData.day ? `${year}-${month + 1}-${dayData.day} (${dayData.count}개 완료)` : ''}
                    >
                        {dayData.day !== null && (
                            <div className="text-center">
                                <span className={`text-sm font-semibold ${dayData.count > 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {dayData.day}
                                </span>
                                {/* 완료된 습관 수 뱃지 */}
                                {dayData.count > 0 && (
                                    <div className="text-xs font-bold text-white bg-green-500 rounded-full w-4 h-4 mx-auto mt-0.5 flex items-center justify-center">
                                        {dayData.count}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarDashboard;