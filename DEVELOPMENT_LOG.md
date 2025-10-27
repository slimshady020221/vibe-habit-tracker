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

### Day 5 (2025.10.27) - 기능 확장: 목표 타입 설정
- **작업 내용**: 습관 목표 설정 타입(Daily/Weekly/Monthly) 및 목표 횟수(targetCount) 기능을 HabitForm에 구현하여 데이터 구조를 확장함.
- **Gemini CLI 사용 프롬프트**: HabitForm.jsx 컴포넌트에 Daily, Weekly, Monthly를 선택하는 라디오 버튼 UI와 목표 횟수(targetCount)를 입력하는 input 필드를 추가해줘. 이 값들을 상태로 관리하고, onSave 함수로 전달하도록 코드를 수정해줘. Tailwind CSS로 스타일링해야 해.
- **결과 및 수정사항**: UI 요소와 데이터 상태 로직 구현 성공. App.jsx의 handleSaveHabit 함수가 새로운 필드(type, targetCount)를 수용하도록 확인 및 수정.
- **학습 내용**: AI에게 UI 요소와 함께 데이터 흐름(상태 관리 및 props 전달)까지 명확히 요청하는 것이 코딩 시간을 단축시킴.

### Day 6 (2025.10.27) - 기능 확장: 습관 정렬 기능
- **작업 내용**: App.jsx에 정렬 기준 상태(`sortKey`)를 추가하고, `useMemo`를 활용하여 습관 목록을 이름순 또는 최신 등록순으로 정렬하는 기능을 구현함. 정렬 기준을 선택하는 드롭다운 UI도 추가함.
- **Gemini CLI 사용 프롬프트**: App.jsx의 habits 배열을 이름(name)을 기준으로 오름차순 정렬하는 sortHabits 함수를 구현해줘. 이 정렬 로직을 컴포넌트 내에 상태(sortKey)로 관리하며, 정렬 키가 변경될 때마다 habits 배열을 정렬하는 로직을 App.jsx에 추가해줘. Tailwind CSS로 간단한 정렬 드롭다운 UI도 App.jsx에 추가해줘.
- **결과 및 수정사항**: 정렬 기능 구현 성공. 계산 부하를 줄이기 위해 `useMemo`를 사용하여 정렬 로직을 최적화함. (AI-assisted 최적화)
- **학습 내용**: React에서 계산량이 많은 로직은 `useMemo`를 사용하여 성능을 최적화해야 함을 AI 생성 코드를 통해 학습하고 적용함.

### Day 7 (2025.10.27) - 기능 확장: 완료율 대시보드
- **작업 내용**: HabitList에 목표 횟수 대비 현재 기록을 시각화하는 Progress Bar를 추가함. `calculateProgress` 함수를 구현하여 진행률을 계산함.
- **Gemini CLI 사용 프롬프트**: HabitList.jsx의 각 습관 항목에 Tailwind CSS를 사용한 Progress Bar 컴포넌트를 추가하고, 목표 횟수(targetCount) 대비 현재 성공 기록(records.length) 비율을 표시해줘.
- **결과 및 수정사항**: Progress Bar UI와 계산 로직 구현 성공. Progress Bar의 스타일링을 Tailwind CSS로 완성하여 반응형 UI에 통합함. (AI 생성 코드를 수동 통합)
- **학습 내용**: UI 구현 시 동적인 스타일링(width: `${progress}%`)에 JavaScript 변수를 사용하는 방법을 AI 코드를 통해 효과적으로 적용함.

### Day 8 (2025.10.27) - 데이터 관리: 백업 및 복원
- **작업 내용**: Local Storage 데이터를 JSON 파일로 내보내기/가져오기 할 수 있는 백업 및 복원 유틸리티(`exportData`, `importData`)를 `localStorage.js`에 추가함.
- **Gemini CLI 사용 프롬프트**: src/utils/localStorage.js 파일에 LocalStorage 데이터를 JSON 파일로 다운로드하고 업로드하는 exportData, importData 함수를 순수 JavaScript로 작성해줘. 파일 I/O 처리가 포함되어야 해.
- **결과 및 수정사항**: 파일 처리 로직 구현 성공. 파일 업로드 시 데이터 구조 유효성 검사 로직을 수동으로 보강하여 안전성을 확보함.
- **학습 내용**: AI를 사용하여 복잡한 파일 I/O 로직을 빠르게 구현할 수 있었으며, 특히 Blob 및 FileReader 사용법을 익힘.

### Day 9 (2025.10.27) - UI 개선: 캘린더 대시보드 네비게이션
- **작업 내용**: CalendarDashboard 컴포넌트에 이전/다음 달로 이동하는 네비게이션 기능과 현재 월/년을 표시하는 UI를 추가함. 현재 날짜를 하이라이트하는 스타일링을 추가하여 시각적 개선을 완료함.
- **Gemini CLI 사용 프롬프트**: CalendarDashboard.jsx 컴포넌트에 현재 표시 월/년을 상태로 관리하고 이전/다음 달로 이동하는 버튼을 추가해줘. 이 상태를 기반으로 달력 데이터도 변경되도록 로직을 수정해줘. Tailwind CSS로 스타일링해줘.
- **결과 및 수정사항**: 월별 달력 생성 로직(padding 포함)과 네비게이션 버튼 핸들러 구현 성공. `currentDate` 상태를 사용하여 달력 상태를 관리함.
- **학습 내용**: JavaScript `Date` 객체의 `getMonth()` 및 `setMonth()`를 사용하여 월 이동 로직을 간결하게 구현하는 방법을 AI 코드를 통해 학습함.

### Day 10 (2025.10.27) - UI 개선: 다크 모드 토글
- **작업 내용**: 다크 모드 상태(`isDarkMode`)를 구현하고 LocalStorage에 상태를 저장하여 새로고침해도 유지되도록 함. 최상위 `html` 요소에 `dark` 클래스를 조건부로 추가하고, 토글 버튼 UI를 구현함.
- **Gemini CLI 사용 프롬프트**: App.jsx에 다크 모드 상태(isDarkMode)를 추가하고, 토글 버튼 UI를 구현해줘. 최상위 div에 isDarkMode 상태에 따라 'dark' 클래스를 조건부로 추가하도록 App.jsx 코드를 수정해줘. Tailwind CSS로 스타일링해야 해.
- **결과 및 수정사항**: **[API Error: Premature close] 오류 발생. AI의 초기 코딩 방향성을 확인하고, 수동으로 코드를 통합하여 기능 구현을 완료함.** (Day 10 App.jsx 코드 반영)
- **학습 내용**: 복잡한 요청 시 API 연결이 불안정할 수 있으므로, AI가 멈췄을 때는 즉시 수동 코딩으로 전환하여 프로젝트를 진행하는 유연성을 확보함.

### Day 11 (2025.10.27) - UX 개선: 커스텀 색상
- **작업 내용**: HabitForm에 `<input type='color'>`를 사용하여 습관별 커스텀 색상을 지정하고, 데이터(`customColor`)에 저장되도록 구현함.
- **Gemini CLI 사용 프롬프트**: HabitForm.jsx 컴포넌트에 `<input type='color'>`를 사용하여 습관별 커스텀 색상을 지정하는 필드를 추가하고, 해당 값을 onSave로 전달하도록 코드를 수정해줘.
- **결과 및 수정사항**: 색상 피커 UI 및 데이터 저장 로직 구현 성공. 저장된 색상을 미리 보여주는 UI를 추가하여 사용성을 높임.
- **학습 내용**: HTML5의 `<input type="color">` 요소를 사용하여 손쉽게 색상 선택 기능을 구현하는 방법을 익힘.

### Day 12: 프로젝트 문서화 (Comprehensive Documentation)
* **목표:** 프로젝트의 개요, 기술 스택, 주요 기능 및 설치 방법을 상세히 설명하는 `README.md` 파일 작성.
* **Gemini CLI 활용:** `gemini "프로젝트의 기술 스택, 주요 기능(CRUD, 정렬, 다크 모드, 달력), 설치 방법을 포함하는 포괄적인 README.md 파일을 작성해 줘."` 명령을 사용하여 문서 초안을 생성함.
* **코드 변경:** `README.md` 파일 신규 생성 및 작성 완료. **`DEVELOPMENT_LOG.md` 파일 갱신 완료.**
* **결과:** 프로젝트의 전반적인 이해도를 높일 수 있는 문서화 작업이 완료되었습니다.