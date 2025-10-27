// src/components/QuoteDisplay.jsx
import React, { useState, useEffect } from 'react';

// 간단한 명언 목록
const quotes = [
  "성공의 비결은 시작하는 것이다. - 마크 트웨인",
  "작은 습관이 큰 차이를 만든다.",
  "오늘의 노력이 내일의 당신을 만든다.",
  "꾸준함이 습관을 만들고, 습관이 결과를 만든다.",
  "가장 큰 위험은 위험 없는 삶이다. - 스티븐 코비",
  "어제보다 나은 오늘을 만들자.",
  "실패는 성공의 어머니이다.",
];

const QuoteDisplay = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // 컴포넌트 마운트 시 랜덤 명언 선택
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []); // 빈 배열: 마운트 시 한 번만 실행

  return (
    <div className="mt-8 p-4 bg-white rounded-xl shadow-lg dark:bg-gray-800 text-center italic">
      <p className="text-gray-600 dark:text-gray-300">"{quote}"</p>
    </div>
  );
};

export default QuoteDisplay;