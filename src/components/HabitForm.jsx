import React, { useState } from 'react'; // useEffect 제거

const HabitForm = ({ onSave, onClose, initialHabit = {} }) => {
  // 상태 선언 시 바로 초기값 사용
  const [name, setName] = useState(initialHabit.name || '');
  const [type, setType] = useState(initialHabit.type || 'daily');
  const [targetCount, setTargetCount] = useState(initialHabit.targetCount || 1);
  const [customColor, setCustomColor] = useState(initialHabit.customColor || '#4f46e5');

  // useEffect 제거됨!

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      ...initialHabit,
      name: name.trim(),
      type: type,
      targetCount: parseInt(targetCount),
      customColor: customColor,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          새 습관 등록 (useEffect 제거)
        </h3>
        <form onSubmit={handleSubmit}>
          {/* 습관 이름 입력 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">습관 이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="예: 물 8잔 마시기"
              required
            />
          </div>

          {/* 목표 타입 설정 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">목표 타입</label>
            <div className="flex space-x-4">
              {['daily', 'weekly', 'monthly'].map((t) => (
                <label key={t} className="flex items-center space-x-2">
                  <input type="radio" name="habitType" value={t} checked={type === t} onChange={() => setType(t)} className="form-radio text-indigo-600 dark:text-indigo-400"/>
                  <span className="capitalize text-gray-800 dark:text-gray-200">{t === 'daily' ? 'D' : t === 'weekly' ? 'W' : 'M'}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 목표 횟수 설정 */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">목표 횟수 ({type === 'daily' ? 'D' : type === 'weekly' ? 'W' : 'M'})</label>
            <input type="number" min="1" value={targetCount} onChange={(e) => setTargetCount(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required/>
          </div>

          {/* 커스텀 색상 피커 */}
          <div className="mb-4 flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">습관 색상</label>
            <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="w-10 h-10 p-1 border border-gray-300 rounded-lg cursor-pointer"/>
            <span className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: customColor }}></span>
            <span className="text-sm text-gray-700 dark:text-gray-300">{customColor}</span>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex justify-end space-x-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">취소</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">저장</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;