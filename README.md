# KNU 산학 프로젝트 프론트엔드 레포지토리입니다.

## 📋 목차

- [KNU 산학 프로젝트 프론트엔드 레포지토리입니다.](#knu-산학-프로젝트-프론트엔드-레포지토리입니다)
  - [📋 목차](#-목차)
  - [기술 스택](#기술-스택)
  - [구현 내용 및 사용 기술](#구현-내용-및-사용-기술)
    - [홈 화면](#홈-화면)
    - [설정 화면](#설정-화면)
    - [위젯 세팅 화면](#위젯-세팅-화면)
    - [위젯 추가 화면](#위젯-추가-화면)
    - [로그인 및 회원가입](#로그인-및-회원가입)
    - [위젯 모드, 이미지 슬라이드 모드](#위젯-모드-이미지-슬라이드-모드)
    - [캘린더 위젯](#캘린더-위젯)
    - [Dimming 기능](#dimming-기능)
    - [다크 / 라이트 모드](#다크--라이트-모드)
  - [실행 방법](#실행-방법)
    - [에뮬레이터](#에뮬레이터)
    - [라즈베리파이](#라즈베리파이)
  - [License](#license)

## 기술 스택

<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/Emotion-black?style=for-the-badge&labelColor=white">
<img src="https://img.shields.io/badge/-TanStack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white">
<img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white">
<img src="https://img.shields.io/badge/✋ react use gesture-%23CC342D.svg?style=for-the-badge&logo=&logoColor=white">
<img src="https://img.shields.io/badge/webOS-a50034.svg?style=for-the-badge&logo=lg&logoColor=white">
<div/>

## 구현 내용 및 사용 기술

### 홈 화면

가장 먼저 어플리케이션을 동작시 나오는 화면입니다. 설정한 위젯들이 나옵니다.

### 설정 화면

해당 화면에서는 여러 기능을 사용할 수 있습니다.

### 위젯 세팅 화면

해당 화면에서는 위젯 위치 수정 및 위젯 삭제를 할 수 있습니다.
그 후 사용자가 편집 버튼을 누른 후 위젯의 위치를 편집합니다. 편집을 완료 한 후 저장 버튼을 누를 경우 로컬 스토리지의 위젯 위치 배열을 업데이트 하게 됩니다. 또한 api를 통해 서버에도 해당 내용을 업데이트 하게 됩니다.<br/>

### 위젯 추가 화면

해당 화면에서는 원하는 위젯을 추가할 수 있습니다. 위젯의 경우 종류별 그리고 사이즈별(L, M, S)로 존재합니다. 유저가 원하는 위젯을 추가할 시 위젯 편집 페이지로 이동하게 됩니다. <br/> 위젯 편집 페이지로 이동하는 과정에 사용자의 로컬 기기 내에서도 위젯의 위치 배열과 위젯 종류 배열을 업데이트 하게 됩니다.

### 로그인 및 회원가입

react hook form을 사용하여 validation을 처리하고 useForm을 통해 로그인 및 회원가입 상태를 관리합니다. <br/>
**로그인, 회원가입시** -> 입력 받은 값을 서버로 넘기고 그에 대한 response로 token을 받습니다.

### 위젯 모드, 이미지 슬라이드 모드

**위젯 모드**의 경우 위젯을 보여주는 모드입니다. <br/>
**이미지 슬라이드**의 경우 이미지 슬라이드를 보여주는 모드입니다.

### 캘린더 위젯

위젯을 누를 시 Modal이 뜨며 Modal 내에서 캘린더 위젯 내에서 스케줄을 추가할 수 있게 합니다. <br/>

**캘린더 추가 시** -> api를 통해 캘린더 위젯 정보를 넘겨줌과 동시에 위젯 편집 페이지로 이동합니다. <br/>

**캘린더 삭제 시** -> api를 통해 캘린더 위젯을 삭제 합니다. 그와 동시에 로컬스토리지의 내용 또한 업데이트 해줍니다. 그 후 UI를 reload하여 삭제된 화면을 보여 줍니다. <br/>

**스케줄 추가 시** -> react-hook-form을 통해 스케줄의 제목과 내용을 모두 받습니다. 그 후 스케줄 추가를 누를 시 해당 내용이 추가가 되어 서버로 전송이 됩니다. 이때 tanstack query를 통해 해당 내용을 캐싱하게 되고 캐싱 key를 통해 업데이트 하게 됩니다. <br/>

**스케줄 삭제 시** -> api를 통해 스케줄을 삭제하게 됩니다. 그와 동시에 캐싱 내용을 업데이트 해줍니다.<br/>

### Dimming 기능

dimming provider를 통해 관리됩니다. 이때 window.addEventListner를 통해 mousemove, keydown, touchstart, click을 감지하고 해당 요소들을 감지한지 10초가 지나게 되면 레이어를 한층 더 쌓아 화면을 어둡게 처리합니다.

### 다크 / 라이트 모드

context api를 통해 전역 상태로 다크 모드와 라이트 모드를 제어합니다. 각 모드에 따른 css 값을 전역으로 관리하여 UI에 영향을 주게 됩니다.

## 실행 방법

### 에뮬레이터

> npm install -g @webos-tools/cli

해당 명령어를 통해 cli를 설치합니다

> npm build

해당 명령어를 통해 리액트 앱을 빌드합니다.

> ares-package -n build

해당 webOS CLI를 통해 빌드한 내용을 ipk로 패키징 해줍니다.

> ares-install your-app-name.ipk

해당 명령어를 통해 webOS 에뮬레이터에 설치해 줍니다.

그 후 설치된 앱을 에뮬레이터를 통해 실행해 줍니다.

### 라즈베리파이

## License

프로젝트는 MIT 라이선스입니다. MIT licensed
