// concept03/global-nav.js

// (IA 1.3) QA 툴 로직: localStorage에서 현재 티어 상태를 먼저 읽어옴
const currentTier = localStorage.getItem('mock_tier') || 'Free'; // 기본값 'Free'

document.addEventListener('DOMContentLoaded', () => {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (!navbarPlaceholder) return;

  // (IA 3.0) 글로벌 Navbar HTML (Bootstrap 5)
  // (IA 1.3) 'QA 토글 스위치'가 Navbar 우측 끝에 추가됨
  // 기존 프로젝트의 스타일 및 링크에 맞춰 조정
  const navbarHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom border-secondary">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="index.html">AI 노블 메이커</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="index.html">대시보드</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="settings.html">마이페이지</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="pro-plan.html">Pro 플랜</a>
            </li>
          </ul>
          
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            <!-- (IA 3.0) 글로벌 알림 센터 (Bell Icon) -->
            <li class="nav-item dropdown">
              <a class="nav-link position-relative" href="#" id="notificationDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-bell-fill fs-5"></i>
                <!-- 읽지 않은 알림 Dot -->
                <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" style="font-size: 0.6rem;">
                  <span class="visually-hidden">New alerts</span>
                </span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
                <li><a class="dropdown-item" href="#"><small class="text-success">[성공]</small> 워크플로우 '챕터 1' 실행 완료</a></li>
                <li><a class="dropdown-item" href="#"><small class="text-danger">[실패]</small> 워크플로우 '플롯 생성' 오류</a></li>
                <li><a class="dropdown-item" href="#"><small class="text-warning">[경고]</small> Free 티어 토큰이 80% 소진되었습니다.</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-center" href="#">모든 알림 보기</a></li>
              </ul>
            </li>

            <!-- Dark Mode Toggle -->
            <li class="nav-item ms-2 d-flex align-items-center">
                <div class="form-check form-switch text-white">
                    <input class="form-check-input" type="checkbox" role="switch" id="dark-mode-toggle">
                    <label class="form-check-label text-muted" for="dark-mode-toggle" id="dark-mode-label">Dark</label>
                </div>
            </li>

            <!-- (IA 1.3) QA 토글 스위치 -->
            <li class="nav-item ms-2 d-flex align-items-center">
              <div class="form-check form-switch text-white">
                <input class="form-check-input" type="checkbox" role="switch" id="qa-tier-toggle">
                <label class="form-check-label text-muted" for="qa-tier-toggle" id="qa-tier-label">${currentTier}</label>
              </div>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="login.html">로그아웃</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
  navbarPlaceholder.innerHTML = navbarHTML;

  // Dark Mode 로직 초기화
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const darkModeLabel = document.getElementById('dark-mode-label');
  const htmlElement = document.documentElement;

  // 1. localStorage에서 현재 테마 상태를 읽어옴 (기본값 'dark')
  let currentTheme = localStorage.getItem('theme_mode') || 'dark';
  
  // 2. HTML 요소에 테마 적용 및 토글 상태 반영
  htmlElement.setAttribute('data-bs-theme', currentTheme);
  if (currentTheme === 'light') {
    darkModeToggle.checked = false;
    darkModeLabel.textContent = 'Light';
  } else {
    darkModeToggle.checked = true;
    darkModeLabel.textContent = 'Dark';
  }

  // 3. 토글 변경 이벤트 리스너
  darkModeToggle.addEventListener('change', () => {
    const isDarkMode = darkModeToggle.checked;
    const newTheme = isDarkMode ? 'dark' : 'light';
    
    localStorage.setItem('theme_mode', newTheme);
    htmlElement.setAttribute('data-bs-theme', newTheme);
    darkModeLabel.textContent = isDarkMode ? 'Dark' : 'Light';
  });

  // (IA 1.3) QA 토글 로직 초기화
  const qaToggle = document.getElementById('qa-tier-toggle');
  const qaLabel = document.getElementById('qa-tier-label');
  
  // 1. 현재 localStorage 상태를 토글에 반영
  if (currentTier === 'Pro') {
    qaToggle.checked = true;
  }
  qaLabel.textContent = currentTier; // 'Free' 또는 'Pro' 텍스트 표시

  // 2. 토글 변경 이벤트 리스너 (핵심 로직)
  qaToggle.addEventListener('change', () => {
    const isPro = qaToggle.checked;
    const newTier = isPro ? 'Pro' : 'Free';
    
    // (AC QA-1, QA-2) localStorage에 새 티어 저장
    localStorage.setItem('mock_tier', newTier);
    
    // UI를 즉시 갱신하기 위해 페이지 새로고침
    location.reload();
  });

  // 현재 페이지에 따라 Navbar 링크 활성화
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = navbarPlaceholder.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
});