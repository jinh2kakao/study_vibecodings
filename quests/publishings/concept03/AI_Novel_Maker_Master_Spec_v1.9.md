AI 노M이커: 통합 기능 명세서 (Master v1.9)

문서 버전: v1.9 (Final Master)

문서 목표: 기획된 모든 PRD, IA, 상세 기능(v1.1 ~ v1.9)을 하나의 마스터 문서로 통합하여, 개발팀의 '단일 진실 공급원(SSOT)'을 제공합니다.

핵심 미학 (v1.5): '핀터레스트 스타일'. shadow, rounded-4 (큰 둥근 모서리), 시각적 카드 기반의 반응형 UI를 기본으로 합니다.

핵심 목표 (ROI): 신규 유저가 '온보딩(v1.2)'과 '프로젝트 설정(v1.6)', 'AI 인물 생성(v1.8)'을 통해 제품에 즉시 '락인(Lock-in)'되게 하고, 'Pro 템플릿(v1.2)'과 '오케스트라 캔버스(v1.7)'라는 명확한 '페이월(Paywall)'을 통해 Pro 플랜으로의 전환(Monetization)을 극대화합니다.

1.0 인증 및 온보딩 (Public & Activation)

사용자가 가치를 즉시 경험하는 첫 10분(FTUE)을 정의합니다.

1.1. 로그인 (Login) /login

기능: 이메일/Google OAuth 인증.

API: 인증 성공 시, user_id, subscription_tier ('Free'/'Pro')가 포함된 JWT 토큰을 발급하고 '/dashboard' (신규 유저는 1.3으로) 리디렉션합니다.

1.2. 회원가입 (Sign Up) /signup (v1.1)

기능: 신규 사용자 생성 및 즉시 업셀링 가능한 상태로 전환.

프로세스 (API: POST /api/auth/signup):

이메일 중복 검사 (실패 시 409 Conflict).

(P0) Stripe API 호출 (stripe.customers.create) - 실패 시 회원가입 중단.

Users 테이블에 레코드 삽입 ( subscription_tier: 'Free', stripe_customer_id 저장).

JWT 토큰 발급 후 **'1.3 온보딩'**으로 리디렉션.

1.3. 신규 유저 온보딩 (Onboarding) /onboarding/... (v1.2)

(정의) 회원가입 직후 '/dashboard' 대신 진입하는 필수 플로우.

1.3.1. 1단계 (장르): /onboarding/step-1

"주로 어떤 장르의 소설을 쓰시나요?" [판타지], [로맨스] 등 선택.

API: UserPreferences에 genre 저장.

1.3.2. 2단계 (가치 제안): /onboarding/step-2

'AI 에이전트'와 '템플릿'의 가치 설명.

[추천 템플릿으로 시작하기] (Primary) -> '3.2 에이전트 라이브러리'의 **'템플릿 모달'**을 즉시 호출.

[건너뛰기] (Secondary) -> '2.0 대시보드'로 이동.

2.0 대시보드 (Dashboard) /dashboard

사용자의 모든 프로젝트를 관리하는 '허브'입니다.

2.1. 프로젝트 리스트 (Project List) (v1.5)

UI: v1.5 '핀터레스트 스타일'의 반응형 카드 그리드.

카드 구성: 프로젝트 대표 이미지, [제목], [최근 수정일].

API: GET /api/projects

Action: 카드 클릭 시, '3.0 프로젝트 워크스페이스' (/project/{id}/settings)로 이동.

2.2. 새 프로젝트 생성 (Create New Project) (v1.6)

트리거: [+ 새 소설 프로젝트] 버튼 클릭.

UI: '새로운 세계 창조하기' 모달.

폼 (마찰 최소화): 1. 프로젝트 제목 (필수), 2. 핵심 장르 (필수, 1.3.1에서 선택한 값 Default), 3. 로그라인 (필수).

API: POST /api/projects (body: { title, genre, logline })

Action: 생성 성공 시, 방금 생성된 프로젝트의 '3.1 프로젝트 설정 탭' (/project/{new_id}/settings)으로 즉시 리디렉션.

3.0 프로젝트 워크스페이스 (Project Workspace)

제품의 핵심 가치(설정, 에이전트, 자동화, 결과물)가 구현되는 탭 인터페이스입니다.
탭 순서 (v1.6): 1.설정 -> 2.에이전트 -> 3.오케스트라 -> 4.결과물

3.1. [탭 1] 프로젝트 설정 (Project Settings) (v1.6)

(정의) AI의 '두뇌'이자 '일관성'의 원천. 모든 AI가 참조할 Global Context를 정의합니다.

메뉴 위치: /project/{id}/settings

UI: 좌측 서브-네비게이션 / 우측 콘텐츠 영역.

3.1.1. [서브탭] 핵심 정보: (2.2에서 생성한) 제목, 장르, 로그라인 수정.

3.1.2. [서브탭] 스타일 및 톤: 시점(POV), 톤앤매너(어둡게, 유쾌하게), 대상 독자.

3.1.3. [서브탭] 세계관 설정: 시대 배경(Setting), 핵심 규칙(Rules), 주요 용어(Glossary).

3.1.4. (핵심) [서브탭] 인물 (Characters) (v1.8):

UI: v1.5 핀터레스트 스타일의 '인물 카드' 그리드 (image_2c9043.png 참조).

프로세스 C (편집): 카드 [편집] 클릭 -> '수동 양식 모달'(3.1.4.3)이 데이터가 채워진(pre-filled) 상태로 즉시 열림 (IA 3.1).

프로세스 (신규): [+ 새 인물 추가] 클릭 -> '선택 모달'(3.1.4.1) 열림.

3.1.4.1 (모달 1) '선택 모달':

[🤖 AI 인터뷰로 생성] (Primary) -> 'AI 인터뷰 모달'(3.1.4.2) 열림.

[✍️ 수동 양식으로 입력] (Secondary) -> '수동 양식 모달'(3.1.4.3)이 빈 상태로 열림.

3.1.4.2 (모달 2) 'AI 인터뷰 모달':

modal-fullscreen 채팅 UI.

'AI 인터뷰어'가 질문(이름/역할 -> 성격 -> 외모/나이/성별 -> Bio -> 말투 -> 연결인물)을 순차적으로 진행 (IA 2.0).

완료 시, '수동 양식 모달'(3.1.4.3)이 AI가 수집한 데이터로 채워진 상태로 열림.

3.1.4.3 (모달 3) '수동 양식 모달':

상세 폼 (이름, 역할, 성별, 나이, 키, 외모, 성격, Bio, 말투, 연결 인물).

[저장] 클릭 시 POST (신규) 또는 PUT (편집) API 호출.

3.1.5. API (Global Context):

3.1.1~3.1.4의 모든 데이터는 Projects 테이블 global_context_json 필드에 통합 저장됩니다.

이 JSON은 '7.1 백엔드 시스템'에 의해 모든 AI 에이전트 실행 시 주입됩니다.

3.2. [탭 2] 에이전트 라이브러리 (Agents) (v1.2)

(정의) 사용자의 'AI 조수' 목록. v1.2의 '템플릿' 기능을 통해 생성됩니다.

메뉴 위치: /project/{id}/agents

UI: v1.5 카드 스타일의 생성된 에이전트 목록.

핵심 프로세스 (신규 생성):

[+ 새 에이전트 생성] 클릭 -> '템플릿 라이브러리 모달' 열림.

'템플릿 모달' (UI): [Basic 템플릿]과 [Pro 템플릿](Pro 배지) 카드 그리드.

페이월 로직 (Paywall Triggers):

Trigger 1 (Pro 템플릿): Free 유저가 [Pro 템플릿] 클릭 -> 'Pro 업그레이드 모달'(5.1.1) 노출 (AC 4-A-6).

Trigger 2 (수량 제한): Free 유저(agent_count >= 1)가 [Basic 템플릿] 클릭 -> 'Pro 업그레이드 모달'(5.1.1) 노출 (AC 4-A-4).

3.3. [탭 3] 오케스트라 캔버스 (Orchestra) (v1.7)

(정의) Pro 플랜의 핵심 USP(Epic 3).

메뉴 위치: /project/{id}/orchestra

페이월 로직 (Paywall Trigger 3):

Free 유저가 이 탭 클릭 -> 탭이 비활성화(Disabled)되며 'Pro 업그레이드 모달'(5.1.1) 노출 (AC 4-A-3).

Pro 유저 기능:

UI: 2-단 레이아웃 (좌: 3.2의 에이전트 목록, 메인: React Flow 캔버스).

프로세스: 에이전트 드래그 -> 노드 생성 -> 핸들 연결(엣지) -> [저장].

상태 관리 (Scenarios): saved, modified (저장 활성화), running (모든 UI 비활성화, 스피너) 상태를 JS로 관리 (IA 4.0).

API (실행): [워크플로우 실행] 클릭 -> POST /api/jobs/execute/{id} (비동기, 7.1 참조) -> 즉시 202 (Accepted) 반환.

API (저장): flow_definition_json (노드/엣지 정보)을 POST /api/workflows/{id}로 저장.

3.4. [탭 4] 결과물 (Outputs - Job History) (v1.9)

(정의) '오케스트라 캔버스' 실행 이력(Job History) 뷰.

메뉴 위치: /project/{id}/outputs

UI: '실행 완료 카드' 리스트 (v1.5 스타일).

카드 구성 (Max Case):

[Job 이름], [✅ 실행 완료/❌ 실패], [실행 일시].

[산출물 태그]: [소설 챕터], [플롯], [인물], [세계관] (image_37d2cb.png 확장).

[상세 결과물 보기] 버튼 -> **'4.0 결과물 상세 페이지'**로 이동.

4.0 결과물 상세 페이지 (Output Detail) /outputs/{job_id} (v1.9)

(정의) 단일 Job의 모든 산출물(Artifacts)과 생성 컨텍스트를 확인하는 상세 뷰.

UI: 3단 레이아웃.

4.1. 좌측 (산출물 목록): 해당 Job으로 생성된 모든 파일 목록 (예: 1.챕터 1, 2.플롯 노트, 3.인물 분석).

4.2. 중앙 (콘텐츠 뷰어):

선택된 산출물의 리치 마크다운 뷰어/에디터.

(Max Case Data) AI가 생성한 메타데이터([메타::POV], [메타::Setting])와 소설 본문이 포함된 v1.9 예시 데이터가 표시됨.

[수정 내용 저장] (API: PUT /api/outputs/{output_id}).

4.3. 우측 (생성 컨텍스트):

"이 결과물은 어떻게 생성되었는가?"

Job 정보: (소요 시간, 사용 토큰).

실행된 에이전트: (1.플롯, 2.챕터...).

(핵심) 사용된 글로벌 설정 (v1.6): (장르: 판타지, 톤: 어둡게, 참조 인물: 진, 카이저).

5.0 마이 페이지 / 설정 (Settings) /settings

사용자의 계정, 구독, 비용을 관리합니다.

5.1. [서브탭] 구독 관리 (Subscription) (v1.1)

기능 (Free 유저): 월간 토큰 사용량(프로그레스 바), Pro 플랜 비교표, [Pro로 업그레이드] CTA (Stripe 연결).

기능 (Pro 유저): "Pro 플랜 사용 중" 상태, 토큰 사용량.

5.1.1. 'Pro 업그레이드 모달' (Paywall Modal):

3.2, 3.3에서 트리거되는 공통 페이월 모달.

[자세히 알아보기] 링크 -> '6.1 Pro 플랜 안내' 페이지로 연결 (v1.4).

5.2. [서브탭] 결제 관리 (Billing) (v1.1)

티어: Pro 전용.

기능: [Stripe 결제 포털로 이동] 버튼.

API: POST /api/billing/portal (Stripe Customer Portal 세션 생성 후 리디렉션).

5.3. [서브탭] API 키 관리 (API Keys) (v1.1)

티어: Pro 전용.

기능: Pro 유저용 API 키 생성(anm_sk_...), 목록, 삭제. (DB에는 해시값 저장)

5.4. [서브탭] 에이전트 관리 (Agent Usage) (v1.2)

기능: 에이전트별 토큰 사용량 통계 (가치 증명).

5.5. [서브탭] 계정 설정 (Account) (v1.1)

기능: 비밀번호 변경, 계정 삭제 (Danger Zone).

6.0 마케팅 페이지 (Marketing) /pro-plan (v1.4)

6.1. Pro 플랜 상세 안내 페이지

(정의) '페이월 모달'(5.1.1)에서 [자세히 보기] 클릭 시 이동하는 인앱 세일즈 페이지.

UI: Pro 플랜의 3대 핵심 가치(오케스트라 캔버스, Pro 템플릿, 대용량 토큰)를 시각적(GIF/이미지)으로 설명, Free/Pro 상세 비교표, 최종 CTA.

7.0 백엔드 시스템 및 NFRs (Non-Functional)

7.1. 비동기 처리 (Async) (v1.1):

'워크플로우 실행'(3.3)은 POST /api/jobs/execute 호출 시 Job을 작업 큐(Queue)(예: RabbitMQ, BullMQ)에 등록하고 **즉시 202 (Accepted)**를 반환해야 함.

'Async Worker'가 큐에서 Job을 가져와 순차 실행.

7.2. 비용 통제 (NFR 4.0) (v1.1):

TokenUsage 테이블(user_id, month, total_tokens) 필요.

(집계) 워커는 LLM 호출 후 TokenUsage를 원자적(Atomic)으로 증가시킴 (AC NFR-1).

(차단) 워커는 LLM 호출 전 한도를 검사하여 초과 시 Job을 'Failed' 처리함 (AC NFR-2).

7.3. Stripe 웹훅 (Webhook) (v1.1):

POST /api/stripe/webhook 엔드포인트.

checkout.session.completed 이벤트 수신 시, Users 테이블의 subscription_tier를 'Pro'로 즉시 업데이트 (P0).

7.4. 글로벌 컨텍스트 주입 (Global Context) (v1.6):

(핵심 로직) 'Async Worker'(7.1)는 모든 에이전트 실행 시, Projects 테이블의 global_context_json (3.1.5)을 로드하여, 해당 에이전트의 system_prompt와 결합(주입)해야 함.

7.5. 글로벌 알림 시스템 (Notification) (v1.2):

Notifications 테이블(user_id, message, link, read_status) 필요.

'Async Worker'(7.1)가 Job 완료(Success) 또는 실패(Failed) 시, 이 테이블에 레코드를 생성함.

GET /api/notifications API를 통해 '알림 센터(🔔)' UI에 피드백.