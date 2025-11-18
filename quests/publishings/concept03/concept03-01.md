@quests/publishings/concept03/index.html

[TASK] index.html의 구조를 변경하고, 필요한 CSS 스타일을 제안하며, 아이콘 및 반응형 디자인에 대한 구체적인 지침을 제공하여 Reference Image:

https://jinh2kakao.github.io/study_vibecodings/quests/publishings/concept03/refer_figma.PNG

와 동일한 레이아웃과 시각적 요소를 구현합니다.

[EXECUTION_STEPS]

전체 레이아웃 분석:
페이지는 크게 좌측 사이드바, 상단 헤더, 메인 콘텐츠 영역으로 나뉘어져 있음을 파악합니다.
메인 콘텐츠 영역은 '검색창', '타이틀/설명', '카드 그리드'로 구성되어 있음을 인지합니다.
카드 그리드는 최소 3열 레이아웃을 기본으로 하며, 반응형으로 변경될 것임을 고려합니다.
색상 팔레트 및 폰트:
전체적인 배경색은 어두운 계열(#1A1A1A 또는 유사)이며, 텍스트는 밝은 계열(#E0E0E0 또는 유사)임을 식별합니다.
액센트 색상(선택된 메뉴, 프로 아이콘 등)은 보라색(#9B59B6 또는 유사)임을 파악합니다.
폰트는 sans-serif 계열(예: 'Inter', 'Roboto' 등)을 사용하며, 글자 크기와 굵기에 따라 정보의 중요도를 표현하고 있음을 확인합니다.



HTML 구조 제안:
```
<body> 안에 <div class='container'>를 생성하고, 이 안에 <aside class='sidebar'>, <main class='main-content'>를 포함하도록 합니다.
<main class='main-content'> 안에는 <header class='top-header'>와 <section class='content-area'>를 포함합니다.
<section class='content-area'> 안에는 Search Input, Page Title, Description, Prompt Grid를 배치합니다.
Prompt Grid는 각 프롬프트 카드를 담는 <div class='prompt-card'> 요소들로 구성됩니다.
```

CSS 스타일 세부 지침:
Reset CSS: 브라우저 기본 스타일을 재설정하는 CSS를 포함하도록 합니다.

Layout:
body 전체에 어두운 배경색과 밝은 텍스트 색상을 적용합니다.
.container에 display: flex;를 사용하여 sidebar와 main-content를 나란히 배치합니다.
.sidebar는 고정 너비(예: width: 60px; 또는 80px;)를 가지며, 배경색과 아이콘 스타일을 정의합니다.
.main-content는 flex-grow: 1;을 사용하여 남은 공간을 모두 차지하고, 패딩을 적용합니다.
.top-header는 검색창과 'Create New Prompt' 버튼을 포함하며 display: flex; justify-content: space-between; align-items: center;를 사용합니다.
.prompt-grid는 display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;와 같은 그리드 레이아웃을 사용합니다.



Components:

Sidebar Icons: SVG 또는 FontAwesome과 같은 아이콘 라이브러리를 사용하고, hover 및 active 상태에 따른 색상 변경을 포함합니다.
Search Input: 어두운 배경에 밝은 테두리와 텍스트, 돋보기 아이콘을 포함합니다.
Buttons: 'Create New Prompt' 버튼은 보라색 배경에 흰색 텍스트, 둥근 모서리를 가집니다.
Prompt Card:
어두운 배경색(#2A2A2A 또는 유사), 둥근 모서리(border-radius: 10px;).
패딩, 그림자 효과(선택 사항).
상단에 카테고리(예: CONTENT WRITING)와 'My Prompt' 태그, 'PRO' 태그 디자인을 포함합니다.
제목, 설명, 아이콘(좋아요, 댓글), 숫자(카운트)를 명확하게 배치합니다.
'PRO' 태그는 보라색 배경에 흰색 텍스트, 둥근 모서리를 가집니다.
자물쇠 아이콘은 'PRO' 프롬프트에만 표시되며, 작은 크기로 적용합니다.
좋아요/댓글 아이콘은 회색 텍스트와 함께 배치합니다.

아이콘 사용:
Font Awesome 또는 Material Icons 같은 라이브러리를 사용하여 사이드바, 검색창, 카드 내 아이콘(좋아요, 댓글, 자물쇠)을 구현합니다.
SVG 이미지를 직접 삽입하는 방식도 고려합니다.

반응형 디자인:
@media 쿼리를 사용하여 화면 너비가 줄어들 경우, .prompt-grid의 grid-template-columns를 조정(예: 2열 또는 1열)합니다.
사이드바는 작은 화면에서 숨기거나, 햄버거 메뉴로 전환하는 방안을 고려하지만, 1차적으로는 메인 콘텐츠의 카드 레이아웃 변화에 집중합니다.

Windows 정품 인증 워터마크 처리:
첨부 이미지에 있는 'Windows 정품 인증' 워터마크는 웹 페이지의 요소가 아니므로, CSS 또는 HTML에 반영하지 않습니다. 이는 스크린샷 자체의 문제입니다.

[OUTPUT_DELIVERABLES]
```
HTML Structure (index.html): <body> 태그 내부의 전체적인 HTML 구조를 제시합니다.

CSS Styles (styles.css 또는 <style> 태그 내): 위 지침에 따라 body, .container, .sidebar, .main-content, .top-header, .prompt-grid, .prompt-card 등 핵심 요소들에 대한 CSS 규칙을 구체적으로 작성합니다.

Icon Integration Guide: 어떤 아이콘 라이브러리를 사용하고 어떻게 적용해야 하는지에 대한 간단한 지침을 제공합니다.

Key Considerations: 구현 시 주의사항 또는 추가적으로 고려할 사항을 요약합니다.
```