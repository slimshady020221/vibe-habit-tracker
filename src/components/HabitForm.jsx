
import React, { useState } from 'react';

const HabitForm = ({ onSave, onClose, show }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name);
      setName('');
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">새로운 습관</h3>
          <form onSubmit={handleSubmit} className="mt-2 px-7 py-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 매일 아침 30분 운동하기"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            />
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                저장
              </button>
            </div>
          </form>
          <div className="items-center px-4 pb-3">
             <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                취소
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitForm;
