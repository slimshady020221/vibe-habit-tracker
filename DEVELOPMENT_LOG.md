# 📝 개발 일지 (Development Log)

## 프로젝트 개요
- 프로젝트명: Minimal Habit Tracker
- 개발 기간: 1주
- 목표: CRUD 및 3가지 핵심 기능을 갖춘 반응형 웹앱 완성

## 개발 과정
### Day 1 (2025.10.27) - 초기 기획 및 환경 설정
- **작업 내용**: 프로젝트 폴더 생성, Git 초기화, 필수 문서 작성 완료.
- **Gemini CLI 사용 프롬프트**: *해당 없음 (수동 작업)*
- **결과 및 수정사항**: 프로젝트 구조 설정 완료.
- **학습 내용**: Git/GitHub 연동 및 문서화가 프로젝트의 첫 단계임을 확인.

## 주요 도전 과제 및 해결 방법
1. **문제**: GitHub PAT 인증 문제로 인한 개발 지연
   - **해결**: SSH 키 설정 또는 Windows 자격 증명 관리자를 통한 토큰 영구 저장으로 해결.
   - **AI 활용**: Gemini CLI는 사용하지 않았으나, AI에게 문제 해결 방법을 반복적으로 문의함.

## 바이브 코딩 활용 소감
- AI와의 협업 경험: (코딩 단계 이후 작성 예정)
- 효과적이었던 프롬프트 패턴: (코딩 단계 이후 작성 예정)
- 개선이 필요한 부분: (코딩 단계 이후 작성 예정)

### Day 2 (2025.10.27) - 핵심 로직 및 유틸리티 구현
- **작업 내용**: LocalStorage 유틸리티(`localStorage.js`) 및 메인 상태 관리 로직(`App.jsx`) 구현 완료.
- **Gemini CLI 사용 프롬프트**:
  1. Local Storage를 사용하여 습관 데이터를 저장하고 불러오는 순수 JavaScript 유틸리티 함수(loadHabits, saveHabits)를 작성해줘. 그리고 연속 성공일(Streak) 계산을 위한 getStreak 함수도 미리 넣어줘. 파일 경로는 src/utils/localStorage.js야.
  2. React 컴포넌트 전문가로서, App.jsx에 LocalStorage 유틸리티를 import하여 습관 데이터 관리 상태 로직을 완성해줘. CRUD 함수(handleSaveHabit, handleDeleteHabit, handleCheck)를 포함하고, Tailwind CSS를 사용한 앱의 기본 레이아웃을 완성해줘. 파일 경로는 src/App.jsx야.
- **결과 및 수정사항**: 초기 로직 생성 성공. 'Streak' 계산 로직은 다음 단계에서 디버깅이 필요함.
- **학습 내용**: AI에게 유틸리티 코드와 메인 로직을 분리하여 요청하는 것이 효과적이며, 파일 경로를 명시하면 편리함.

### Day 3 (2025.10.27) - UI 컴포넌트 생성
- **작업 내용**: HabitForm(CRUD 폼), HabitList(목록 및 Streak 표시) 컴포넌트 구현 및 App.jsx 통합 준비.
- **Gemini CLI 사용 프롬프트**:
  1. React와 Tailwind CSS를 사용하여 HabitForm.jsx 컴포넌트를 만들어줘. 습관 이름(name)을 입력받아 상위 컴포넌트의 onSave 함수를 호출하는 폼이어야 해. 모달(Modal) 형태로 렌더링되도록 스타일링하고, 파일 경로는 src/components/HabitForm.jsx야.
  2. React와 Tailwind CSS를 사용하여 HabitList.jsx 컴포넌트를 만들어줘. habits 배열을 받아 목록을 렌더링하고, 각 항목에 일일 체크 버튼(handleCheck 호출)과 연속 성공일(Streak)을 표시하는 뱃지를 포함해줘. 파일 경로는 src/components/HabitList.jsx야.
- **결과 및 수정사항**: CRUD 폼 및 목록 UI 초안 생성. 다음 단계에서 App.jsx에 import 후 연결 필요.
- **학습 내용**: AI에게 복잡한 로직 구현 후 UI 요청 시, 데이터 흐름(props)을 명확히 정의해줘야 오류가 적음을 확인.

### Day 4 (2025.10.27) - 최종 통합 및 검증
- **작업 내용**: CalendarDashboard 컴포넌트 구현 및 App.jsx에 최종 통합. React와 Tailwind CSS 환경 구성 완료 및 모든 기능(CRUD, Streak, 시각화) 동작 검증.
- **Gemini CLI 사용 프롬프트**:
  1. React와 Tailwind CSS를 사용하여 CalendarDashboard.jsx 컴포넌트를 만들어줘. habits 배열을 받아 월별로 습관 기록(records)을 시각화하는 간단한 달력 대시보드 UI를 구현해줘. 각 날짜 블록에 성공 여부를 색상으로 표시해야 해. 파일 경로는 src/components/CalendarDashboard.jsx야.
- **결과 및 수정사항**: 모든 컴포넌트가 의도대로 동작함을 확인. App.jsx의 레이아웃을 Tailwind 그리드 시스템으로 수정하여 반응형 디자인 완성.
- **학습 내용**: AI의 초기 코드를 받더라도, 프로젝트의 아키텍처(컴포넌트 간 데이터 흐름 및 레이아웃)는 개발자가 직접 통합하고 조정해야 함.