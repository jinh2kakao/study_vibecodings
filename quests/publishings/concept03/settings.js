/**
 * MOCK_USER_STATE
 * 이 값을 'Free' 또는 'Pro'로 변경하여 UI를 테스트합니다.
 */
const MOCK_USER_STATE = {
  subscription_tier: 'Free' // <-- 'Pro'로 변경하여 Pro 유저 뷰 테스트
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM 요소 선택
  // 탭 링크
  const billingTab = document.getElementById('billing-tab');
  const apiKeysTab = document.getElementById('api-keys-tab');

  // 구독 (5.1)
  const freeView = document.getElementById('free-view');
  const proView = document.getElementById('pro-view');

  // 결제 (5.2)
  const billingPaywall = document.getElementById('billing-paywall');
  const billingProView = document.getElementById('billing-pro-view');

  // API 키 (5.3)
  const apiPaywall = document.getElementById('api-paywall');
  const apiProView = document.getElementById('api-pro-view');

  // 2. 비즈니스 로직 실행
  renderUIBasedOnTier();

  function renderUIBasedOnTier() {
    if (MOCK_USER_STATE.subscription_tier === 'Free') {
      // 5.1 구독 탭
      freeView.classList.remove('d-none');
      proView.classList.add('d-none');

      // 5.2 결제 탭
      billingPaywall.classList.remove('d-none');
      billingProView.classList.add('d-none');
      disableTab(billingTab);

      // 5.3 API 키 탭
      apiPaywall.classList.remove('d-none');
      apiProView.classList.add('d-none');
      disableTab(apiKeysTab);

    } else if (MOCK_USER_STATE.subscription_tier === 'Pro') {
      // 5.1 구독 탭
      freeView.classList.add('d-none');
      proView.classList.remove('d-none');

      // 5.2 결제 탭
      billingPaywall.classList.add('d-none');
      billingProView.classList.remove('d-none');
      enableTab(billingTab);

      // 5.3 API 키 탭
      apiPaywall.classList.add('d-none');
      apiProView.classList.remove('d-none');
      enableTab(apiKeysTab);
    }
  }

  // 3. 헬퍼 함수
  function disableTab(tabElement) {
    tabElement.classList.add('disabled');
    tabElement.setAttribute('aria-disabled', 'true');
    tabElement.setAttribute('data-bs-toggle', ''); // 탭 기능 비활성화
    
    // 'Pro' 배지 추가 (중복 방지)
    if (!tabElement.querySelector('.badge')) {
      const proBadge = document.createElement('span');
      proBadge.className = 'badge bg-primary ms-2';
      proBadge.textContent = 'Pro';
      tabElement.appendChild(proBadge);
    }
  }

  function enableTab(tabElement) {
    tabElement.classList.remove('disabled');
    tabElement.setAttribute('aria-disabled', 'false');
    tabElement.setAttribute('data-bs-toggle', 'pill'); // 탭 기능 활성화 (data-bs-toggle="pill"로 변경)
    
    const badge = tabElement.querySelector('.badge');
    if (badge) {
      badge.remove();
    }
  }

  // 4. 모달 인스턴스 초기화 (Bootstrap 5)
  // (이 목업에서는 JS 로직이 탭 활성화/비활성화를 제어하므로
  // 모달 인스턴스화 로직은 생략 가능, data-bs-toggle로 작동)
});
