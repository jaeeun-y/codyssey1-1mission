// DOM 요소 선택
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const header = document.querySelector('header');
const scrollTopBtn = document.querySelector('#scroll-top');

// 1. 햄버거 메뉴 토글
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 2. 부드러운 스크롤
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault(); // 기본 앵커 이동 방지
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // 모바일에서 메뉴 클릭 시 닫기
        navLinks.classList.remove('active');
    });
});

// 3. 스크롤 이벤트 (네비게이션 배경 & 스크롤 탑 버튼)
window.addEventListener('scroll', () => {
    // 스크롤 60px 이상: 네비게이션 그림자 추가
    if (window.scrollY >= 60) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    // 스크롤 300px 이상: 탑 버튼 표시
    if (window.scrollY >= 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// 4. 스크롤 탑 버튼 클릭 이동
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// 1. 페이지 로드 시 로컬스토리지(localStorage) 상태 확인
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

// 2. 다크모드 토글 버튼 클릭 이벤트
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // 상태에 따라 아이콘 변경 및 로컬스토리지 저장
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = '🌙';
    }
});

// 폼과 입력 요소들 선택
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// 에러 메시지 표시 요소 선택
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// 폼 제출 이벤트
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // 폼이 제출되면서 페이지가 새로고침 되는 기본 동작 막기

    let isValid = true; // 유효성 통과 여부를 저장하는 변수

    // 1. 이름 검사 (빈칸인지 확인)
    if (nameInput.value.trim() === '') {
        nameError.textContent = '이름을 입력해 주세요.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // 2. 이메일 검사 (빈칸 및 이메일 형식 확인)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식을 확인하는 정규표현식
    if (emailInput.value.trim() === '') {
        emailError.textContent = '이메일을 입력해 주세요.';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = '올바른 이메일 형식이 아닙니다.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // 3. 메시지 검사 (빈칸인지 확인)
    if (messageInput.value.trim() === '') {
        messageError.textContent = '메시지를 입력해 주세요.';
        isValid = false;
    } else {
        messageError.textContent = '';
    }

    // 4. 모든 검사를 통과했다면?
    if (isValid) {
        alert('메시지가 성공적으로 전송되었습니다!');
        contactForm.reset(); // 폼 안의 내용 비우기
    }
});

// GitHub API 연동
async function fetchGitHubProjects() {
    const username = 'jaeeun-y';
    const container = document.getElementById('github-projects');

    try {
        // 1. GitHub API로 데이터 요청 (최근 업데이트된 6개만 가져오기)
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        // 2. 에러 처리 (아이디가 틀렸거나 네트워크 문제 등)
        if (!response.ok) {
            throw new Error('데이터를 불러오는데 실패했습니다.');
        }

        // 3. 데이터를 JSON 형태로 변환
        const repos = await response.json();

        // 4. 로딩 텍스트 지우기
        container.innerHTML = '';

        // 5. 저장소가 없을 경우의 UI
        if (repos.length === 0) {
            container.innerHTML = '<p>아직 공개된 프로젝트가 없습니다.</p>';
            return;
        }

        // 6. 가져온 데이터를 HTML 카드로 만들어 화면에 추가
        repos.forEach(repo => {
            const card = document.createElement('div');
            card.className = 'project-card';
            
            // repo.name(제목), repo.description(설명), repo.html_url(링크) 사용
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description ? repo.description : '설명이 없습니다.'}</p>
                <a href="${repo.html_url}" target="_blank">GitHub에서 보기 ➔</a>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        // 에러 발생 시 화면에 에러 메시지 표시
        container.innerHTML = `<p class="error-msg">오류 발생: ${error.message}</p>`;
    }
}

// 함수 실행
fetchGitHubProjects();