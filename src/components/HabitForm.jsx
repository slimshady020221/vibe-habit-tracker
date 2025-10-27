
import React, { useState } from 'react';

const HabitForm = ({ onSave, onClose, show }) => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [targetCount, setTargetCount] = useState(1);
  const [color, setColor] = useState('#4f46e5'); // Default color (indigo-600)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({ 
        name, 
        frequency, 
        targetCount: frequency === 'Daily' ? 1 : targetCount, 
        color 
      });
      // Reset form
      setName('');
      setFrequency('Daily');
      setTargetCount(1);
      setColor('#4f46e5');
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white text-center">새로운 습관</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">습관 이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="예: 매일 아침 30분 운동하기"
                className="mt-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">빈도</label>
              <div className="mt-2 flex justify-around">
                {['Daily', 'Weekly', 'Monthly'].map(freq => (
                  <label key={freq} className="inline-flex items-center dark:text-gray-300">
                    <input
                      type="radio"
                      className="form-radio text-indigo-600"
                      name="frequency"
                      value={freq}
                      checked={frequency === freq}
                      onChange={(e) => setFrequency(e.target.value)}
                    />
                    <span className="ml-2">{freq}</span>
                  </label>
                ))}
              </div>
            </div>

            {(frequency === 'Weekly' || frequency === 'Monthly') && (
              <div>
                <label htmlFor="targetCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                  목표 횟수 ({frequency === 'Weekly' ? '주' : '월'})
                </label>
                <input
                  type="number"
                  id="targetCount"
                  value={targetCount}
                  onChange={(e) => setTargetCount(parseInt(e.target.value, 10) || 1)}
                  min="1"
                  className="mt-1 w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left">대표 색상</label>
              <div className="mt-1 flex items-center">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 p-1 border-none rounded-md"
                />
                <span className="ml-3 px-3 py-1 rounded-full text-white text-sm"
                  style={{ backgroundColor: color }}
                >
                  {color}
                </span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                저장
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              >
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HabitForm;
