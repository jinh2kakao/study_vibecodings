Sprint 0 준비 패키지: 기술 설계 명세서(TDD) 작성 브리핑

To: 💎 Gem 2: AI 아키텍트 (TA Gem)

From: 💎 Gem 1: SaaS 전략가 (PM Gem)

Subject: 'AI 노M이커' MVP Sprint 0 킥오프 - 기술 설계 착수

1. 개요

우리는 AI_Novel_Maker_Master_Spec_v1.9.md를 통해 '무엇을(WHAT)' 만들 것인지 확정했습니다. 이제 Sprint 1(P0 백로그) 개발을 시작하기 전에, '어떻게(HOW)' 만들 것인지에 대한 기술적 청사진이 필요합니다.

이 문서는 'Sprint 0' 기간 동안 TA(Gem 2)가 반드시 정의하고 산출해야 할 핵심 기술 설계 요구사항을 정의합니다.

2. 핵심 준비물 (Input Artifacts)

기술 설계의 기반이 되는 최종 확정본입니다. (첨부 파일 참조)

AI_Novel_Maker_Master_Spec_v1.9.md

(목적) 모든 기능(IA 1.0 ~ 7.0)이 정의된 마스터 기능 명세서입니다. '7.0 백엔드 시스템 및 NFRs' 섹션을 특히 주의 깊게 검토해야 합니다.

AI_Novel_Maker_Final_Release_Backlog.md

(목적) P0(Sprint 1)에 구현해야 할 최소 기능 범위를 정의합니다. TDD는 **P0의 'Activation-to-Payoff Loop'**을 안정적으로 실행하는 데 최우선 순위를 두어야 합니다.

3. Gem 2의 핵심 임무 (Sprint 0 Deliverables)

TA(Gem 2)는 Sprint 0 종료 시, 개발팀이 즉시 구현을 시작할 수 있도록 다음 3가지 산출물을 포함하는 **'기술 설계 명세서(TDD)'**를 완성해야 합니다.

산출물 1: API 계약서 (OpenAPI/Swagger Spec)

Master Spec v1.9에 명시된 모든 API 엔드포인트의 Request/Response 스키마를 YAML 또는 JSON 형식으로 정의해야 합니다.

P0 핵심 API (반드시 정의 필요):

POST /api/auth/signup (v1.1)

POST /api/projects (v1.6)

PUT /api/projects/{id} (v1.6 - Global Context 저장)

GET/POST/PUT /api/projects/{id}/characters/{char_id} (v1.8)

GET /api/templates (v1.2)

POST /api/agents (v1.2 - 403 로직 포함)

POST /api/workflows/{id} (v1.7)

POST /api/jobs/execute/{id} (v1.7 - Async 202)

GET /api/outputs?job_id={id} (v1.9)

GET /api/notifications (v1.2)

POST /api/stripe/webhook (v1.1)

산출물 2: 데이터베이스 스키마 (ERD 및 상세 정의)

Master Spec v1.9의 7.0 (NFR) 및 3.1.5 (JSON)를 기반으로, 최종 논리/물리 스키마를 정의해야 합니다.

P0 핵심 테이블 (상세 설계 필요):

Users: stripe_customer_id (Index), subscription_tier (Enum)

Projects: global_context_json (JSONB 타입, 인덱싱 전략)

AgentTemplates

Agents (User-FK, 1개 제한 로직과 연동)

Workflows: flow_definition_json (v1.7 스키마)

JobHistory: status (Enum: Pending, Running, Success, Failed), error_log

JobOutputs: generated_text_content (Text, Markdown), meta_data (JSON)

TokenUsage: (user_id, month) 복합 PK, total_tokens (Integer)

산출물 3: 시스템 아키텍처 및 기술 스택

P0의 비기능 요구사항(NFR)을 충족하기 위한 아키텍처 다이어그램과 기술 스택 선정이 필요합니다.

반드시 결정해야 할 3대 기술 난제 (T-1, T-2, T-3):

T-1 (Async): '비동기 워크플로우' (v1.7)

(문제) '오케스트라 실행'은 1분 이상 소요될 수 있습니다.

(결정) POST /api/jobs/execute가 사용할 '작업 큐(Queue)' 기술 스택을 선정해야 합니다. (예: RabbitMQ, BullMQ, Celery, SQS)

(결정) 'Async Worker'의 실패 시 재시도(Retry) 정책 및 'JobHistory'의 'Failed' 상태 관리 로직을 정의해야 합니다.

T-2 (Context): '글로벌 컨텍스트 주입' (v1.6)

(문제) 모든 에이전트가 global_context_json (세계관, 인물)을 참조해야 합니다.

(결정) 'Async Worker'가 (1)DB에서 global_context_json을 로드하고, (2)실행할 에이전트의 system_prompt를 로드하여, (3)두 텍스트를 어떻게 효율적으로 결합하여 'LLM Gateway'에 전달할지 그 '프롬프트 주입(Injection) 전략'을 정의해야 합니다.

T-3 (NFR): '실시간 비용 통제' (v1.1)

(문제) Free 유저의 토큰 한도 초과는 1 토큰이라도 허용되면 안 됩니다.

(결정) 'Async Worker'가 LLM 호출 전 TokenUsage를 체크하는 로직과, 호출 후 total_tokens를 원자적(Atomic)으로 업데이트하는 DB 쿼리(예: UPDATE ... SET total = total + ?)를 명확히 정의해야 합니다.