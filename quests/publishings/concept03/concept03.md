Hi-Fi Mock-up 생성용 프롬프트 (For Gemini CLI Flash Model) [PROJECT GENERATION COMMAND] gemini cli flash model --project_name concept03 --init

[START PROMPT PAYLOAD]

[Role] 당신은 10년 차 프론트엔드 아키텍트입니다.

[Goal] 'AI 노블 메이커' 서비스의 핵심 기능인 '프로젝트 워크스페이스' 화면의 High-Fidelity 코드 목업을 생성합니다.

[Technology Stack]

html

BS5

JS

[Core IA Requirement] 제공된 기능 정의서(IA)의 3.0 섹션을 기반으로, '프로젝트 워크스페이스' UI를 구현합니다.

Layout: 3-Tab 인터페이스 (IA 3.0)

Tabs: 'Agents' (IA 3.1), 'Orchestra' (IA 3.2), 'Outputs' (IA 3.3)

[CRITICAL: Interactive Tier Simulation] 이 목업의 핵심은 'Free' 유저와 'Pro' 유저의 경험을 실시간으로 시뮬레이션하는 것입니다.

App.tsx 최상단에 const [isPro, setIsPro] = useState(false); 상태를 선언합니다.

화면 헤더(Header)에 "Simulate Pro User" 체크박스(Toggle)를 만들어, 이 isPro 상태를 토글할 수 있게 합니다.

모든 UI 로직은 이 isPro 상태에 반응해야 합니다.

[UI & Logic Implementation Details]

Main Header:
좌측: "AI 노블 메이커" 로고, "My First Novel" (프로젝트 제목)

우측: "Simulate Pro User" [Checkbox], "유저 프로필 아이콘"

Tab Navigation (IA 3.0):
3개의 탭 버튼([Agents], [Orchestra], [Outputs])을 렌더링합니다.

[Orchestra] 탭 로직 (IA 3.2):

isPro === false (Free 유저)일 때:

탭 버튼을 disabled 상태로 렌더링합니다. (Tailwind: opacity-50 cursor-not-allowed)

버튼 텍스트 옆에 "PRO" 배지(Badge)를 노란색으로 작게 표시합니다.

isPro === true (Pro 유저)일 때:

탭 버튼을 enabled 상태로 렌더링합니다.

Tab Content: 'Agents' (IA 3.1):
화면에 "[+ 새 에이전트 생성]" 버튼(Button)을 렌더링합니다.

(시뮬레이션을 위해) 하단에 '세계관 설정 도우미'라는 이름의 에이전트 카드 1개를 기본으로 렌더링합니다. (agents.count = 1 상태로 가정)

Tab Content: 'Orchestra' (IA 3.2):
이 탭은 isPro === true일 때만 활성화됩니다.

"Orchestra Canvas (React Flow Placeholder)" 텍스트가 중앙에 표시된 간단한 div 영역을 렌더링합니다.

캔버스 상단에 [워크플로우 저장]과 [워크플로우 실행] 버튼을 disabled 상태로 렌더링합니다.

CRITICAL: Paywall Modal Implementation (IA 3.1.1 & 3.2):
PaywallModal.tsx 컴포넌트를 생성합니다. (제목: "Pro 플랜으로 업그레이드", 내용: "AI 작가팀을 구성하고 '오케스트라 캔버스'로 자동 집필을 경험하세요!", 버튼: "[Pro 플랜 시작하기]")

App.tsx에 const [showPaywall, setShowPaywall] = useState(false); 상태를 선언합니다.

트리거 로직 1 (IA 3.1.1):

[+ 새 에이전트 생성] 버튼 클릭 시, isPro === false이면 setShowPaywall(true)를 호출합니다.

isPro === true이면 alert('에이전트 메이커 UI 열림 (Pro)')를 호출합니다.

트리거 로직 2 (IA 3.2):

disabled 상태인 [Orchestra] 탭을 클릭 시 (CSS pointer-events-none을 쓰지 말고 onClick 이벤트가 발생하도록 구현), setShowPaywall(true)를 호출합니다.

[Style & Fidelity]

전체적으로 다크 모드(Dark Mode) 기반의 모던하고 세련된 UI를 디자인합니다. (배경: bg-gray-900, 텍스트: text-white, 카드: bg-gray-800)

버튼, 탭, 모달 등 모든 컴포넌트에 hover 및 focus 상태 스타일을 적용합니다.

아이콘은 heroicons 라이브러리를 사용합니다.

[Final Output] 위의 모든 요구사항을 반영하여 concept03 폴더 내에 즉시 실행 가능한 Html + BS5 + JS 프로젝트 코드를 생성하십시오.

[END PROMPT PAYLOAD]