# ARCANA LOTTO — 타로 로또번호 생성 웹앱

메이저 아르카나 22장 중 카드 3장을 선택해 번호 생성 규칙을 만들고, **로또 6/45 번호 1·3·5·10세트**를 생성하는 무료 엔터테인먼트 웹앱입니다.

- 모바일 우선 9:16 구성, 데스크톱/iframe 반응형
- 백엔드·DB·외부 라이브러리·빌드 과정 없음
- GitHub Pages에서 무료 공개 배포 가능(공개 저장소 사용)
- 카드 3장 선택 / 완전 무작위 / 번호 복사·공유·PNG 저장
- 브라우저 저장소를 이용한 개인 결과 보관(기기 사이 동기화 안 됨)
- `?embed=1` 모드 / 방문 출처별 상담·학습 링크 설정 가능
- 과거 당첨 데이터 **1~1247회** 스냅샷 내장 (보너스 번호 제외, 자동 갱신 없음)

> 주의: 타로와 과거 통계는 조합 생성 방식에만 영향을 주며 **당첨 확률을 높이거나 예측하지 않습니다**.

## 처음 GitHub에 올리는 분이라면

**[GITHUB_처음부터_배포하기.md](GITHUB_처음부터_배포하기.md)** 를 차례로 따라 하세요. Git을 설치하거나 명령어를 입력할 필요 없습니다.

## GitHub Pages 배포 파일

GitHub 저장소의 최상위(root)에 다음 파일이 있어야 합니다.

```text
arcana-lotto/
├── index.html        # 웹사이트 첫 화면 (필수)
├── styles.css        # 반응형 디자인 (필수)
├── app.js            # 카드 선택, 번호 생성 엔진 (필수)
├── stats.js          # 내장 로또 당첨 통계 (필수)
├── config.js         # 블로그 연결 주소 등 설정 (필수)
├── favicon.svg       # 브라우저 아이콘
├── .nojekyll         # 정적 파일 그대로 배포
├── README.md
└── GITHUB_처음부터_배포하기.md
```

`stats.js`와 `app.js`는 파일 이름과 경로가 맞아야 합니다. **ZIP 파일 자체를 올려 두는 것만으로는 실행되지 않습니다. ZIP을 풀고 안의 개별 파일을 올리세요.**

## GitHub Pages 접속 URL

저장소 이름을 `arcana-lotto`라고 정했다면 다음 URL로 접속합니다.

`https://본인아이디.github.io/arcana-lotto/`

저장소 이름을 바꾸면 URL 경로도 달라집니다. GitHub 저장소의 `Settings → Pages → Visit site`에서 주소를 확인하세요.

## 블로그·사이트 임베드

공개 주소를 발급받은 다음 아래 주소로 사용합니다.

- **워드프레스** (iframe 허용 환경): `https://본인아이디.github.io/arcana-lotto/?embed=1&src=wordpress`
- **Google Sites** (`삽입 → 삽입/Embed → URL`): `https://본인아이디.github.io/arcana-lotto/?embed=1&src=googlesites`
- **네이버 블로그** (링크로 이동): `https://본인아이디.github.io/arcana-lotto/?src=naver`

iframe 예시:

```html
<iframe
  src="https://본인아이디.github.io/arcana-lotto/?embed=1&src=wordpress"
  title="타로 로또번호 생성기"
  width="100%" height="900"
  style="border:0;max-width:460px"
  loading="lazy"></iframe>
```

GitHub Pages 공개 사이트는 일반적으로 iframe 렌더링이 가능하지만 호스트의 보안 정책·WordPress 요금제·브라우저 등에 따라 제한될 수 있습니다. 네이버 블로그 글 본문은 일반적으로 코드 실행형 삽입을 지원하지 않으므로 링크를 사용합니다.

## 타로 상담·학습 링크 연결

`config.js`를 텍스트 편집기로 열어 아래 부분의 빈 문자열에 **실제 HTTPS 주소**를 넣으세요.

```js
links: {
  default: { reading: 'https://your-domain.com/tarot', learning: 'https://your-domain.com/learn' },
  wordpress: { reading: '', learning: '' },
  googlesites: { reading: '', learning: '' },
  naver: { reading: '', learning: '' }
}
```

`reading`은 타로 상담·운세, `learning`은 타로 학습 페이지입니다. 비워 두면 해당 버튼은 표시되지 않습니다. 출처에 따른 세부 주소가 없으면 default 주소가 적용됩니다.

설정 후 **변경한 `config.js`를 같은 저장소에 다시 업로드**하거나 GitHub 파일 편집(연필 아이콘)으로 수정하고 변경 사항을 저장하세요.

## 코드 구조와 향후 DB 연동

- `index.html`은 UI 골격, `styles.css`는 화면 디자인
- `app.js`는 카드 선택/생성/공유/로컬 보관 기능, `stats.js`는 읽기 전용 통계 스냅샷
- `config.js`는 링크 및 일부 화면 설정
- `app.js`는 `window.TarotLottoApp.installAdapters({ onGenerated, onSaved })` 등 외부 연결 지점을 제공
- 향후 Firebase 등의 DB를 붙일 때 통계 스냅샷과 저장 기능을 API/DB 기반으로 교체할 수 있음
- 현재는 **사용자 로그인 및 서버 저장 없음**. 브라우저 로컬 저장소를 지우면 저장 목록도 사라짐

GitHub Pages는 정적 호스팅이므로 서버 DB 연결 기능은 별도 백엔드 서비스가 필요합니다.

## 개발자 로컬 실행(선택)

`index.html`을 더블클릭해도 기본 기능을 시험할 수 있지만, 웹서버 환경과 동일하게 테스트하려면 다음을 실행합니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.

## 데이터·권리·주의

- `stats.js`는 제공된 `lotto.xlsx`의 **1~1247회** 당첨 본번호 통계를 분석한 파일이며 최신 회차로 자동 업데이트되지 않습니다.
- 카드 디자인은 문자/도형 기반으로, 별도의 타로 그림 파일을 포함하지 않습니다.
- 저장소를 `Public`으로 만들면 소스와 내장 통계 데이터가 모두 공개됩니다. 비밀번호·API 키·개인정보를 올리지 마세요.
- 상용 활용·광고 집행·복권 관련 문구는 배포 전에 적용되는 법령과 플랫폼 정책을 검토하세요.

