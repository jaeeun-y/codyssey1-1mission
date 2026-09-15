const GITHUB_USERNAME = 'jaeeun-y';

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
// 📌 DOM 요소 캐싱 - 반복해서 사용되는 DOM 요소를 변수에 저장해 두고 재사용
// ============================
const header = document.querySelector('header');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('#nav-menu a');
const scrollTopBtn = document.getElementById('scroll-top');
const fadeSections = document.querySelectorAll('.fade-in');

// ============================
// 🌙 다크모드 (상태 → data-theme 속성 → localStorage 저장)
// ============================
function applyTheme(isDark) {
  STATE.isDarkMode = isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  darkModeToggle.textContent = isDark ? '☀️' : '🌙';
}

// 새로고침 시 저장된 테마 복원
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'dark');

darkModeToggle.addEventListener('click', () => {
  const nextIsDark = !STATE.isDarkMode; // 상태 변경
  applyTheme(nextIsDark);               // 화면 업데이트
  localStorage.setItem('theme', nextIsDark ? 'dark' : 'light'); // 저장
});

// ============================
// 🍔 햄버거 메뉴 (CSS의 .active 클래스와 이름 통일)
// ============================
hamburger.addEventListener('click', () => {
  STATE.isMenuOpen = !STATE.isMenuOpen;
  navMenu.classList.toggle('active', STATE.isMenuOpen);
  hamburger.setAttribute('aria-expanded', String(STATE.isMenuOpen));
});

// 메뉴 링크 클릭 → 부드러운 스크롤 + (모바일이면) 메뉴 자동 닫기
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = document.querySelector(link.getAttribute('href'));

    if (STATE.isMenuOpen) {
      STATE.isMenuOpen = false;
      navMenu.classList.remove('active');
    }

    targetSection?.scrollIntoView({ behavior: 'smooth' });
  });
});

// ============================
// 📜 스크롤 이벤트 (네비 배경 변경 + 스크롤 탑 버튼 노출)
// ============================
const SCROLL_NAV_THRESHOLD = 60;   // 이 값 이상 스크롤하면 네비 배경 변경
const SCROLL_TOP_THRESHOLD = 300;  // 이 값 이상 스크롤하면 탑 버튼 노출

window.addEventListener('scroll', () => {
  const { scrollY } = window;

  header.classList.toggle('scrolled', scrollY > SCROLL_NAV_THRESHOLD);
  scrollTopBtn.style.display = scrollY > SCROLL_TOP_THRESHOLD ? 'block' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================
// 👀 Intersection Observer - 스크롤 등장 애니메이션
// (이게 없어서 About 이하 섹션들이 계속 투명 상태였습니다)
// ============================
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target); // 한 번 나타나면 관찰 종료
      }
    });
  },
  { threshold: 0.2 }
);

fadeSections.forEach((section) => sectionObserver.observe(section));

// ============================
// 📋 Contact 폼 유효성 검사 (필드별 에러 메시지 표시)
// ============================
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const form = document.getElementById('contact-form');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showFieldError(errorEl, message) {
  errorEl.textContent = message;
}

function clearFieldError(errorEl) {
  errorEl.textContent = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  let isValid = true;

  if (name === '') {
    showFieldError(nameError, '이름을 입력해주세요.');
    isValid = false;
  } else {
    clearFieldError(nameError);
  }

  if (email === '' || !EMAIL_REGEX.test(email)) {
    showFieldError(emailError, '올바른 이메일 형식을 입력해주세요.');
    isValid = false;
  } else {
    clearFieldError(emailError);
  }

  if (message === '') {
    showFieldError(messageError, '메시지를 입력해주세요.');
    isValid = false;
  } else {
    clearFieldError(messageError);
  }

  STATE.isFormValid = isValid; // 상태 변경

  if (!STATE.isFormValid) return; // 화면 업데이트(에러 표시)만 하고 종료

  alert('메시지가 전송되었습니다! 감사합니다 😊');
  form.reset();
  STATE.isFormValid = false;
});

// 입력하는 동안 실시간으로 에러 메시지 제거
const errorFieldMap = {
  name: nameError,
  email: emailError,
  message: messageError,
};

[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener('input', () => clearFieldError(errorFieldMap[input.id]));
});

// ============================
// 🐙 GitHub API - 저장소 불러오기
// ============================
async function fetchRepositories() {
  const container = document.getElementById('github-projects');

  STATE.isLoading = true;
  STATE.hasError = false;
  renderProjects(container); // 로딩 화면 렌더

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
    );

    if (!response.ok) throw new Error('응답 오류');

    const data = await response.json();

    // fork된 저장소 제외 (내가 직접 만든 것만)
    const filtered = data.filter((repo) => !repo.fork);

    STATE.repos = filtered;
    STATE.isLoading = false;
  } catch (error) {
    console.error('Error:', error);
    STATE.hasError = true;
    STATE.isLoading = false;
  }

  renderProjects(container); // 최종 렌더
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

  // 에러 발생 (재시도 버튼 포함)
  if (STATE.hasError) {
    container.innerHTML = `
      <div class="error-state">
        <p class="error">프로젝트를 불러올 수 없습니다. 😥</p>
        <button id="retry-btn" type="button">다시 시도</button>
      </div>
    `;
    document.getElementById('retry-btn').addEventListener('click', fetchRepositories);
    return;
  }

  // 빈 상태
  if (STATE.repos.length === 0) {
    container.innerHTML = `
      <div class="empty-projects">
        <p>표시할 프로젝트가 없습니다. 📂</p>
        <p>새로운 프로젝트를 준비 중이에요!</p>
      </div>
    `;
    return;
  }

  // 성공 상태: map + 구조분해 할당으로 카드 렌더링
  container.innerHTML = STATE.repos
    .map(({ name, description, stargazers_count, html_url }) => `
      <div class="project-card">
        <h3>${name}</h3>
        <p>${description || '설명이 없습니다.'}</p>
        <div class="card-footer">
          <span>⭐ ${stargazers_count}</span>
          <a href="${html_url}" target="_blank" rel="noopener">자세히 보기</a>
        </div>
      </div>
    `)
    .join('');
}

// 실행
fetchRepositories();
