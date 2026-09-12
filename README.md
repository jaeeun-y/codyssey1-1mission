

https://jaeeun-y.github.io/codyssey1-1mission/




<img width="1909" height="1080" alt="스크린샷(2)" src="https://github.com/user-attachments/assets/736446c9-b94c-447a-b97d-8078e32fda93" />

<img width="1926" height="1080" alt="스크린샷(3)" src="https://github.com/user-attachments/assets/f457a15d-1291-4398-b9a9-ed383ccbdb74" />


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
  
  
## 배열 전환 방식 map/filter
원본 배열을 변경하지 않고 새로운 배열을 반환하는 메서드

### map
allback 함수를 각각의 요소에 대해 한번씩 순서대로 불러 그 함수의 반환값으로 새로운 배열을 생성

### filter
주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환


## CSS

<img width="447" height="395" alt="image" src="https://github.com/user-attachments/assets/0f1d43c2-6bc8-42d7-bf4d-dd9527e32698" />


margin: object와 화면의 외부 여백  
padding: object 내의 내부여백

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
