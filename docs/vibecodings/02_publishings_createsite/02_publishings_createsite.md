## Prompts (front-end)
```
{
  "task": "create_website",
  "tech_stack": [
    "HTML",
    "Bootstrap5",
    "JavaScript"
  ],
  "output": "/apps/study_vibecodings/docs/vibecodings/02_publicisings_createsite/index.html",
  "style_reference": "Pinterest 스타일 (Card-based, Shadow, Rounded-4 UI), 고정형 다크 사이드바(Dark Fixed Sidebar) 레이아웃",
  "description": "AI 소설 창작 도구 'AI 노블 메이커'의 MVP 웹사이트 구축. 사용자는 프로젝트를 생성하고, AI 에이전트 팀을 구성하며, 오케스트라 캔버스에서 워크플로우를 시각적으로 연결하여 소설을 창작함. 결과물은 상세 페이지에서 메타데이터와 함께 확인 가능.",
  "design_guidelines": {
    "layout": "좌측 260px 고정 다크 사이드바 + 우측 메인 콘텐츠 영역 (반응형)",
    "theme": "Light Content Background (#F9FAFB) with Dark Sidebar (#111827)",
    "components": "Bootstrap 5 기반, 커스텀 CSS로 핀터레스트 스타일 카드(Border-0, Shadow-sm, Rounded-4) 및 둥근 버튼(Rounded-pill) 적용"
  },
  "pages": [
    {
      "filename": "index.html",
      "title": "Dashboard",
      "description": "사용자의 소설 프로젝트 목록을 보여주는 메인 대시보드.",
      "structure": [
        {
          "name": "sidebar",
          "type": "navigation",
          "items": ["Dashboard (Active)", "Agent Management", "Templates", "Settings"],
          "footer": ["Pro Mode Toggle", "My Page Link", "Logout"]
        },
        {
          "name": "main_content",
          "header": {
            "title": "내 프로젝트 (My Projects)",
            "action_button": "+ 새 프로젝트 생성 (Modal Trigger)"
          },
          "content_area": {
            "type": "card_grid",
            "style": "masonry_like",
            "items": [
              {
                "title": "네오-서울의 그림자",
                "desc": "2042년, 거대 기업이 지배하는 사이버펑크 도시...",
                "meta": "Pro | 5분 전 수정",
                "image": "placeholder_cyberpunk.jpg"
              },
              {
                "title": "아카데미의 마법검",
                "desc": "평범한 학생이 전설의 마법검을 발견하며...",
                "meta": "Running | 1시간 전 수정",
                "image": "placeholder_fantasy.jpg"
              },
              {
                "title": "회귀자의 로맨스 판타지",
                "desc": "비극적 죽음 이후, 모든 것을 되돌리기 위해...",
                "meta": "Free | 3일 전 수정",
                "image": "placeholder_romance.jpg"
              }
            ]
          }
        },
        {
          "name": "new_project_modal",
          "type": "modal",
          "title": "새로운 세계 창조하기",
          "fields": ["프로젝트 제목", "핵심 장르 (Dropdown)", "로그라인 (Textarea)"]
        }
      ]
    },
    {
      "filename": "orchestra.html",
      "title": "Project Workspace",
      "description": "프로젝트의 설정, 에이전트, 워크플로우, 결과물을 관리하는 핵심 작업 공간.",
      "structure": [
        {
          "name": "sidebar",
          "type": "navigation",
          "status": "collapsed_on_mobile"
        },
        {
          "name": "main_content",
          "header": {
            "breadcrumb": "Project: 네오-서울의 그림자",
            "toolbar": ["Save Workflow", "Run Workflow"],
            "notification": "Bell Icon with Dot"
          },
          "tabs": {
            "items": ["설정", "에이전트", "오케스트라 캔버스 (Active)", "결과물"],
            "active_tab_content": {
              "type": "orchestra_canvas_layout",
              "sidebar_left": {
                "title": "에이전트 라이브러리",
                "draggable_items": ["세계관 설정", "플롯 생성기", "챕터 집필가", "비평가"]
              },
              "canvas_area": {
                "visual_elements": [
                  { "node": "세계관 설정", "pos": "0,0" },
                  { "node": "플롯 생성기", "pos": "1,0" },
                  { "node": "챕터 집필가", "pos": "2,0" },
                  { "node": "비평가", "pos": "3,0" },
                  { "edge": "세계관->플롯" },
                  { "edge": "플롯->집필가" },
                  { "edge": "집필가->비평가" }
                ]
              }
            }
          }
        }
      ]
    },
    {
      "filename": "mypage.html",
      "title": "My Page",
      "description": "사용자의 활동 통계와 자산을 보여주는 페이지.",
      "structure": [
        {
          "name": "sidebar",
          "type": "navigation"
        },
        {
          "name": "main_content",
          "widgets": [
            {
              "type": "profile_card",
              "user": "Jayden",
              "badge": "Pro Member",
              "actions": ["프로필 편집", "계정 설정"]
            },
            {
              "type": "stats_grid",
              "items": [
                { "label": "총 생성 단어", "value": "1,205,400" },
                { "label": "워크플로우 실행", "value": "152 회" },
                { "label": "활성 프로젝트", "value": "5 개" },
                { "label": "내 에이전트", "value": "12 개" }
              ]
            },
            {
              "type": "asset_library",
              "title": "나의 AI 에이전트 라이브러리",
              "layout": "card_grid",
              "items": ["세계관 도우미 v2", "로맨스 플롯 생성기", "냉철한 비평가"]
            }
          ]
        }
      ]
    },
    {
      "filename": "output-detail.html",
      "title": "Output Detail",
      "description": "생성된 결과물의 상세 내용을 확인하고 편집하는 페이지.",
      "structure": [
        {
          "name": "sidebar",
          "type": "navigation"
        },
        {
          "name": "main_content",
          "layout": "3_column_fixed",
          "col_1": {
            "title": "산출물 목록",
            "items": ["1. 챕터 1 본문 (최종)", "2. 플롯 초안", "3. 인물 분석 노트", "4. 세계관 설정"]
          },
          "col_2": {
            "title": "콘텐츠 뷰어",
            "type": "markdown_editor",
            "content": "### 챕터 1: 붉은 달의 그림자\n\n**[메타::POV]** 3인칭 제한적 시점 (진)...\n..."
          },
          "col_3": {
            "title": "생성 컨텍스트",
            "info_list": [
              { "label": "워크플로우", "value": "첫 챕터 생성기" },
              { "label": "상태", "value": "Success" },
              { "label": "소요 시간", "value": "48.5s" },
              { "label": "설정", "value": "판타지, 어둡게, 진(Jin)" }
            ],
            "actions": ["다시 실행", "워크플로우 편집"]
          }
        }
      ]
    },
    {
      "filename": "pro-plan.html",
      "title": "Pro Plan Info",
      "description": "Pro 플랜의 가치를 설명하는 마케팅 페이지.",
      "structure": [
        {
          "type": "hero",
          "title": "AI 작가팀으로 진화하세요",
          "cta": "즉시 업그레이드"
        },
        {
          "type": "feature_list",
          "items": ["오케스트라 캔버스", "무제한 에이전트", "대용량 토큰"]
        },
        {
          "type": "comparison_table",
          "cols": ["Feature", "Free", "Pro"]
        }
      ]
    }
  ]
}
```

## prompt (admin)
```
{
  "task": "create_website",
  "tech_stack": [
    "HTML",
    "Bootstrap5",
    "JavaScript",
    "Chart.js",
    "Simple-DataTables"
  ],
  "output": "/apps/study_vibecodings/docs/vibecodings/02_publishings_createsite/admin.html",
  "style_reference": "SB Admin Pro Style (Clean, Dashboard-focused, Sidebar Navigation, Card Widgets, DataTables)",
  "description": "AI 소설 창작 도구 'AI 노블 메이커'의 내부 운영 및 관리를 위한 백오피스(Admin) 사이트 구축. 사용자 관리, 구독 현황, 템플릿 콘텐츠 관리, 시스템 비용(토큰) 모니터링 기능을 포함함.",
  "design_guidelines": {
    "layout": "좌측 고정 사이드바 (Sidenav) + 상단 네비게이션 바 (Topnav) + 메인 콘텐츠 영역",
    "theme": "Light theme with distinct header colors (Primary/Dark), Card-based layout for widgets",
    "components": "Bootstrap 5 기반, DataTables로 리스트 구현, Chart.js로 통계 시각화",
    "color_palette": {
      "primary": "#0061f2",
      "secondary": "#6900c7",
      "success": "#00ac69",
      "info": "#00cfd5",
      "warning": "#f4a100",
      "danger": "#e81500",
      "dark": "#212832",
      "light": "#f2f6fc"
    }
  },
  "pages": [
    {
      "filename": "admin.html",
      "title": "Admin Dashboard",
      "description": "서비스의 핵심 지표와 건강 상태를 한눈에 파악하는 메인 대시보드.",
      "structure": [
        {
          "name": "sidenav",
          "type": "navigation",
          "items": [
            { "label": "Dashboards", "icon": "activity", "link": "admin.html", "active": true },
            { "label": "User Management", "icon": "users", "link": "admin-users.html" },
            { "label": "Templates (CMS)", "icon": "layout", "link": "admin-templates.html" },
            { "label": "System & FinOps", "icon": "bar-chart", "link": "admin-system.html" },
            { "label": "Settings", "icon": "settings", "link": "admin-settings.html" }
          ]
        },
        {
          "name": "topnav",
          "items": ["Sidebar Toggle", "Admin Profile Dropdown"]
        },
        {
          "name": "main_content",
          "widgets": [
            {
              "type": "stats_card",
              "title": "Monthly Recurring Revenue (MRR)",
              "value": "$12,450",
              "trend": "+12%",
              "color": "primary"
            },
            {
              "type": "stats_card",
              "title": "Active Users",
              "value": "3,200",
              "trend": "+5%",
              "color": "warning"
            },
            {
              "type": "stats_card",
              "title": "Today's Token Cost",
              "value": "$45.20",
              "trend": "-2%",
              "color": "success"
            },
            {
              "type": "stats_card",
              "title": "Error Rate (24h)",
              "value": "0.8%",
              "trend": "Stable",
              "color": "danger"
            }
          ],
          "charts": [
            {
              "type": "line_chart",
              "title": "Daily Token Usage (Free vs Pro)",
              "description": "일별 토큰 사용량 추이 비교"
            },
            {
              "type": "bar_chart",
              "title": "New Signups & Conversions",
              "description": "신규 가입 및 유료 전환 현황"
            }
          ]
        }
      ]
    },
    {
      "filename": "admin-users.html",
      "title": "User Management",
      "description": "사용자 목록 조회 및 상세 관리, CS 이슈 처리.",
      "structure": [
        {
          "name": "user_list_table",
          "type": "datatable",
          "columns": ["User Info", "Tier (Badge)", "Join Date", "Last Active", "Total Tokens", "Actions"],
          "actions": ["View Details", "Edit Tier", "Ban User"]
        },
        {
          "name": "user_detail_modal",
          "type": "modal",
          "title": "User Details",
          "tabs": ["Profile", "Subscription", "Token History", "Projects"]
        }
      ]
    },
    {
      "filename": "admin-templates.html",
      "title": "Template CMS",
      "description": "에이전트 템플릿 콘텐츠 생성 및 관리.",
      "structure": [
        {
          "name": "header_actions",
          "items": ["+ Add New Template"]
        },
        {
          "name": "template_list",
          "type": "card_grid",
          "item_content": ["Icon", "Name", "Category", "Tier Badge", "Edit/Delete Buttons"]
        },
        {
          "name": "template_editor_modal",
          "type": "modal",
          "fields": [
            { "label": "Template Name", "type": "text" },
            { "label": "Category", "type": "select" },
            { "label": "Tier", "type": "radio", "options": ["Basic", "Pro"] },
            { "label": "System Prompt", "type": "textarea", "rows": 10 }
          ]
        }
      ]
    },
    {
      "filename": "admin-system.html",
      "title": "System & FinOps",
      "description": "시스템 로그 및 비용 분석.",
      "structure": [
        {
          "name": "job_inspector",
          "type": "datatable",
          "title": "Real-time Job Logs",
          "filters": ["Status: Failed", "Status: Success"],
          "columns": ["Job ID", "Workflow", "User", "Status", "Duration", "Error Log"]
        },
        {
          "name": "cost_analysis",
          "type": "table",
          "title": "Cost per Agent",
          "columns": ["Agent Name", "Avg Token Usage", "Total Cost (Est.)"]
        }
      ]
    }
  ]
}
```