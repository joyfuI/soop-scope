# soop-scope

SOOP 시청자 역스코프 Electron 데스크톱 앱입니다.

카테고리별 상단 방송에서 특정 유저가 있는지 찾는 방식입니다.

관련 잡담은 [https://blog.joyfui.com/1317](https://blog.joyfui.com/1317)

## 시작하기

### 설치

```bash
pnpm install
```

### 개발 실행

```bash
pnpm run dev
```

### 프로덕션 빌드

```bash
pnpm run build
```

빌드가 성공하면 다음 산출물이 생성됩니다.

- `dist`: 렌더러 번들
- `dist-electron`: Electron 메인/프리로드 번들
- `release/soop-scope.exe`: Windows x64 포터블 실행 파일

### 코드 정리 및 검사

```bash
pnpm run format
pnpm run lint
pnpm run check
pnpm run reporter
```

## 사용 방법

1. `검거할 ID` 입력란에 검색할 SOOP ID를 입력합니다.
2. 카테고리와 추적 범위를 설정합니다.
3. `스코프 쬐기!` 버튼을 누릅니다.
4. 일치하는 방송이 있으면 결과 카드로 표시됩니다.

## 제한 사항

- 선택한 카테고리의 상단 방송부터 순서대로 확인합니다.
- 최대 `180`개 방송까지만 추적합니다.
- 비밀번호 방, 구독 플러스 방, 19금 방은 확인할 수 없습니다.
- 채팅 참여자 목록을 수집하는 시점 기준으로 판단하므로, 접속 상태 변화에 따라 결과가 달라질 수 있습니다.
- 카테고리 목록을 GitHub raw 경로에서 받아옵니다. 로딩 실패 시 앱 실행을 못 하도록 막아두었습니다.

## 프로젝트 구조

```text
.
├─ electron/            # Electron main/preload 및 IPC 핸들러
├─ public/              # 아이콘 등 정적 자산
├─ src/
│  ├─ components/       # UI 컴포넌트
│  ├─ hooks/            # React Query 기반 데이터 훅
│  ├─ shared/           # 카테고리 JSON
│  └─ utils/            # 범용 유틸리티
├─ dist/                # 렌더러 빌드 결과물
├─ dist-electron/       # Electron 빌드 결과물
└─ release/             # 배포 산출물
```
