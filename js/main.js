// ✅ 1. 중앙 STATE 객체 - 모든 상태를 한 곳에서 관리
const STATE = {
  isMenuOpen: false,
  isDarkMode: false,
  isFormValid: false,
  repos: [],          // 저장소 데이터
  isLoading: false,   // 로딩 중 여부
  hasError: false,    // 에러 발생 여부
};

// ============================
// 🌙 다크모드
// ============================
const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
  STATE.isDarkMode = !STATE.isDarkMode;           // STATE로 관리
  document.body.classList.toggle('dark-mode', STATE.isDarkMode);
  darkModeToggle.textContent = STATE.isDarkMode ? '☀️' : '🌙';
});

// ============================
// 🍔 햄버거 메뉴
// ============================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  STATE.isMenuOpen = !STATE.isMenuOpen;           // STATE로 관리
  navMenu.classList.toggle('open', STATE.isMenuOpen);
});

// ============================
// 📋 Contact 폼 유효성 검사
// ============================
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // STATE로 유효성 상태 관리 (기존 isValid 대체)
  STATE.isFormValid =
    name !== '' &&
    email !== '' &&
    emailRegex.test(email) &&
    message !== '';

  if (!STATE.isFormValid) {
    alert('모든 항목을 올바르게 입력해주세요.');
    return;
  }

  alert('메시지가 전송되었습니다! 감사합니다 😊');
  form.reset();
  STATE.isFormValid = false;  // 전송 후 초기화
});

// ============================
// 🐙 GitHub API - 저장소 불러오기
// ============================
async function fetchRepositories() {
  const container = document.getElementById('github-projects');

  // STATE 업데이트 후 렌더
  STATE.isLoading = true;
  STATE.hasError = false;
  renderProjects(container);  // 로딩 화면 렌더

  try {
    const response = await fetch(
      'https://api.github.com/users/본인계정아이디/repos?sort=updated'
    );

    if (!response.ok) throw new Error('응답 오류');

    const data = await response.json();

    // ✅ 2. filter: fork된 저장소 제외 (내가 직접 만든 것만)
    const filtered = data.filter(repo => !repo.fork);

    // ✅ 3. map: 저장소 데이터를 HTML 카드 문자열 배열로 변환
    const cardHTMLList = filtered.map(repo => `
      <div class="project-card">
        <h3>${repo.name}</h3>
        <p>${repo.description || '설명이 없습니다.'}</p>
        <div class="card-footer">
          <span>⭐ ${repo.stargazers_count}</span>
          <a href="${repo.html_url}" target="_blank" rel="noopener">자세히 보기</a>
        </div>
      </div>
    `);

    // STATE에 저장
    STATE.repos = cardHTMLList;
    STATE.isLoading = false;

  } catch (error) {
    console.error('Error:', error);
    STATE.hasError = true;
    STATE.isLoading = false;
  }

  // 최종 렌더
  renderProjects(container);
}

// ============================
// 🖥 렌더 함수 - STATE 보고 화면 결정
// ============================
function renderProjects(container) {
  // 로딩 중
  if (STATE.isLoading) {
    container.innerHTML = '<p class="loading">프로젝트를 불러오는 중입니다... ⏳</p>';
    return;
  }

  // 에러 발생
  if (STATE.hasError) {
    container.innerHTML = '<p class="error">데이터를 불러오지 못했습니다. 😥</p>';
    return;
  }

  // 빈 상태
  if (STATE.repos.length === 0) {
    container.innerHTML = `
      <div class="empty-projects">
        <p>아직 공개된 프로젝트가 없습니다. 📂</p>
        <p>새로운 프로젝트를 준비 중이에요!</p>
      </div>
    `;
    return;
  }

  // ✅ 정상 - map으로 만든 카드 배열을 join으로 합쳐서 한 번에 삽입
  container.innerHTML = STATE.repos.join('');
}

// 실행
fetchRepositories();
