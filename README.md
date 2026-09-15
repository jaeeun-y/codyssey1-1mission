

https://jaeeun-y.github.io/codyssey1-1mission/




<img width="1909" height="1080" alt="스크린샷(2)" src="https://github.com/user-attachments/assets/736446c9-b94c-447a-b97d-8078e32fda93" />

<img width="1926" height="1080" alt="스크린샷(3)" src="https://github.com/user-attachments/assets/f457a15d-1291-4398-b9a9-ed383ccbdb74" />


  
___

  
# index.html (구조)

**시맨틱 태그**: 포함된 콘텐츠의 특정 의미를 정의하고 목적을 갖는 태그   
                -> 구조와 목적을 쉽게 파악 가능함  
  
head  
header(nav)  
main  
footer  
  
  
### 외부 스타일시트/JS 연결  
  
브라우저가 CSS파일을 읽음
JS 파일 연결 (defer 속성 -> 웹페이지의 로딩 속도를 높이고, 자바스크립트가 HTML 요소를 찾지 못해 발생하는 오류를 방지)  
  
**<link rel="stylesheet" href="style.css">**

- <link rel>="stylesheet": 현재 문서와 외부 리소스의 관계, 스타일시트 임을 정의
- href="파일경로": 연결할 CSS 파일의 위치(경로)
  
**<script src="js/main.js" defer></script>**
  
- <script>: JS코드라고 브라우저에게 알리는 태그
- src: 연결할 JS파일의 위치(경로)


**aria-label**: 화면에 텍스트가 표시되지 않는 요소에 대한 텍스트 대안을 제공하는데 사용   
aria-label="메뉴 열기">☰
  
**cursor:pointer**: 마우스를 올렸을 때 클릭할 수 있는 버튼이라고 인지하게 하는 UX 설정  
  
**alt 속성**  
네트워크 오류나 이미지 주소 오류로 이미지를 불러오지 못할 때 텍스트로 대체해 보여줍니다.

**class:"project-grid"**  
```
CSS
  
.projects-grid {
  display: grid; /* 격자 모양으로 정렬 */
  grid-template-columns: repeat(3, 1fr); /* 가로로 3개씩 균등하게 배치 */
  gap: 20px; /* 상자 사이의 간격은 20바이트(픽셀) */
}
```

**< form >**  
```
<form id="contact-form">  
```
  
사용자가 글자를 적는 **< input >**, 내용을 적는 **< textarea >**, 전송하는 **< button >** 등이 함께 들어감.  
**placeholder**="이름을 입력하세요": 값이 들어갈 자리에 임시로 채워 놓는 텍스트나 이미지  
  
**< span >**: 문장 속 텍스트의 일부분만 꾸밀 때 사용.  
  
```
const nameError = document.getElementById('name-error');
nameError.textContent = '⚠️ 이름을 입력해야 합니다.';
```  
  
  
## 배열 전환 방식 map/filter
원본 배열을 변경하지 않고 새로운 배열을 반환하는 메서드

### map
allback 함수를 각각의 요소에 대해 한번씩 순서대로 불러 그 함수의 반환값으로 새로운 배열을 생성

### filter
주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환

___
  
# CSS (디자인)
  
  
## Flex VS Grid
<img width="923" height="565" alt="스크린샷 2026-09-12 오후 5 22 55" src="https://github.com/user-attachments/assets/c12647f7-8eb6-4e33-827e-d24f97295582" />  
  
  
### Flex (1차원 레이아웃)  
display: flex;  
- 한 방향으로 정렬하는 데 최적화
- 간단한 레이아웃이나 정렬이 필요한 경우에 유용하게 사용
  
  
### Grid (2차원 레이아웃)  
display: grid;  
- 아이템을 축소, 확장, 정렬하는 데 강력  
- 행과 열을 동시에 제어해야 할 때 (격자 형태로 배열된 레이아웃)에서 적합

auto-fit, minmax(250px, 1fr) #카드의 최소 너비 250px 최대 너비 1fr
- 화면이 넓어지면 카드가 옆으로 붙고 좁아지면 알아서 밑으로 떨어지게 만드는 반응형 코드
- 트랙의 최소 크기와 최대 크기 범위

<img width="447" height="395" alt="image" src="https://github.com/user-attachments/assets/0f1d43c2-6bc8-42d7-bf4d-dd9527e32698" />
  
  
margin: object와 화면의 외부 여백  
padding: object 내의 내부여백
  
  
<img width="495" height="964" alt="image" src="https://github.com/user-attachments/assets/30527b93-9aa7-4b2e-94aa-8d02464bb2d9" />
  
### onclick 
웹 페이지의 요소를 클릭할 때 발생하는 마우스 이벤트 속성

### :root 
전역 변수 영역 

### var(--variable) 
CSS 변수 정의

```
--text-color: #ffffff; 
color: var(--text-color);
```

### cf) 
    var - 중복 선언 가능, 마지막 할당 값이 변수에 저장됨. 재할당 가능
    let - 중복 선언 불가능, 재할당 가능.
    const - 중복 선언 불가능, 재할당 불가능.
    
    **var**는 중복 선언이 가능해서 코드가 꼬이기 쉽기 때문에 요즘은 사용하지 않는 것을 권장

### const 
한 번 값을 할당하면 재할당(값 변경)과 재선언을 할 수 없는 상수(Constant)를 선언하는 키워드

생성과정 - 1. 선언 + 초기화 + 할당
      
### let
생성과정 - 1. 선언 2. 초기화 3. 할당


___
  
opacity 0~1 투명도 0(invisible)~1(visible)
  
ease-out: 빠르게 시작
ease-in : 천천히 시작
  
<img width="1280" height="320" alt="image" src="https://github.com/user-attachments/assets/55975b64-e846-4df5-bf3a-4e8e658681c4" />

___
  
### JS (기능)


**DOM** Document Object Model 문서 객체 모델  
  
문서 객체: <html>이나 <body> 같은 html문서의 태그들을 JavaScript가 이용할 수 있는 객체(object)로 만든 것.

```
HTML
<button id="dark-mode-toggle">🌙</button>

JS
const darkModeToggle = document.getElementById('dark-mode-toggle');
```

<img width="638" height="479" alt="image" src="https://github.com/user-attachments/assets/3968e9fe-8150-4163-93e2-4e48323cd1ae" />  
트리 구조로 형성되어 있는 DOM  

**DOM 요소 캐싱**: 자바스크립트로 웹 페이지를 제어할 때 반복해서 사용되는 DOM 요소를 변수에 저장해 두고 재사용하는 성능 최적화 기법  
