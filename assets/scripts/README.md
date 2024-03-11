# uxg-boilerplate-2024 Scripts

## 🟢 common.js guide

> Before

```html
<script src="../scripts/common.js"></script>
<script src="../scripts/main.js"></script>
```

> After ( common.js 는 개발 스크립트 보다 먼저 호출되어야 합니다. uxgFn 떄문 ! )

```html
<script type="module" src="../scripts/common.js"></script>
<!-- main.js 는 common.js 에서 컨트롤 -->
```

> 파일 경로

```lus
src
|-- scripts
|-- |-- common
|-- |-- lib
|-- |-- pageComp
|-- |-- uiComp
|-- |-- common.js
```

## 🟢 common.js

### 🌈 규칙

- CommonJS

```javascript
const condition = require("./common/condition.js");
```

- ES6 module 채택합니다. ✔✔

```javascript
import condition from "./common/condition.js";
```

### 🌈 uxgFn Global Object

1. window 객체에 저장합니다.
2. 주기능은 개발 전달 함수입니다.

## 🟢 common 폴더

### ⚡ condition.js

- 디바이스 , 브라우저 체크 , 그 외 추가해서 조건문 추가해서 사용 바람

### ⚡ publicInit

- 공통 버튼이나 모달 버튼 등, 페이지 로드될 때 공통으로 바인. 이후 비동기로 초기화되는 함수는 개발과 별도로 상의가 필요합니다.

### ⚡ uxg-ui

- 개발 전달용 공통 컴포넌트 또는 함수
- 예 ) 모달은 개발 전달이 필요하고, TextFlip 은 보통 개발 전달이 필요하지 않습니다. 대신 pageComp에서 사용됩니다.

## 🟢 lib ( 라이브러리 )

- 추후 라이브러리 X -> mode_module 번들러 사용 예정

## 🟢 pageComp ( 페이지마다 사용하는 컴포넌트 )

### 🔥 1뎁스용 공통 클래스 규칙 - uxg-root-{{ 페이지 이름 }}

- ex ) 메인, 공지사항, 회원가입, 브랜드 소개 등.

```javascript
// common.js
if (document.querySelector(".uxg-root-subpage2")) {
  import("./pageComp/subpage2.js")
    .then((module) => {
      console.log(module);
    })
    .catch((error) => {
      console.log(error);
    });
}
```

### 🔥 2뎁스용 공통 클래스 규칙 - page-container-{{ 페이지 이름 }}

- ex ) 공지사항 - 리스트 , 상세
- ex ) 회원가입 - 가입, 비밀번호 찾기, 로그인

```javascript
// subpage2.js
import textFlip from "../uiComp/text_flip.js";

const page01 = document.querySelector(".page-container-subpage-detail");
if (page01) {
  const inst = new textFlip(page01);
  inst.el.classList.add("active");
  inst.init();
}
export const props = {}; // common.js then 에서 로드후 시점으로 사용가능
```

## 🟢 uiComp ( 컴포넌트 )

- uxg-dev showcase 에서 사용 할 수 있습니다.
