# GitHub에 처음 로그인한 사람을 위한 배포 안내

**목표:** ARCANA LOTTO를 GitHub에 업로드하고, 본인만의 무료 웹주소를 발급받아 모바일에서 열어보기.

- 준비물: **GitHub 계정**, Chrome/Edge 등 브라우저, `ARCANA_LOTTO_GitHub_Pages_배포용.zip`
- 설치할 프로그램: **없음** (Git, GitHub Desktop, VS Code 설치 불필요)
- 배포 방법: GitHub Pages의 **Deploy from a branch** 사용
- 데이터베이스/결제정보/서버: **필요 없음**

## 0. GitHub 로그인

1. https://github.com/ 으로 이동하세요.
2. 계정이 없으면 **Sign up**을 눌러 가입합니다. 이미 계정이 있으면 **Sign in**을 선택합니다.
3. 이메일 인증 또는 2단계 인증 요청이 나오면 화면 안내에 따라 진행합니다.
4. 로그인 후 오른쪽 위에 프로필 사진이 보이면 준비가 완료된 것입니다.

> GitHub 아이디는 공개 웹주소에 포함됩니다. 예: `https://my-name.github.io/arcana-lotto/`

## 1. ZIP 압축 해제

1. 받은 `ARCANA_LOTTO_GitHub_Pages_배포용.zip` 파일을 컴퓨터에 저장합니다.
2. Windows에서는 ZIP을 마우스 오른쪽 클릭 → **압축 풀기 / 모두 압축 풀기(Extract All)**.
3. 압축 해제한 폴더를 열어 `index.html`, `app.js`, `styles.css`, `stats.js`, `config.js`, `favicon.svg` 등이 보이는지 확인합니다.
4. **ZIP 자체를 GitHub에 올리는 게 아닙니다. 내부 파일을 올립니다.**

## 2. GitHub 저장소 만들기

1. 로그인한 GitHub 화면 오른쪽 위의 `+` 메뉴 → **New repository**를 클릭합니다. 또는 https://github.com/new 로 이동합니다.
2. **Repository name**에 `arcana-lotto`를 입력합니다. 다른 이름도 가능하지만 아래 안내의 URL도 함께 바뀝니다.
3. **Public**을 선택합니다. GitHub Free에서 GitHub Pages를 사용하려면 공개 저장소가 가장 간단합니다.
4. **Add a README file** 옵션은 체크하지 않아도 됩니다(이미 제공된 README가 있기 때문입니다).
5. **Create repository** 버튼을 누릅니다.

> 이미 같은 이름의 저장소가 있다면 이름을 `arcana-lotto-app` 등으로 바꿔 생성하세요.

## 3. 앱 파일을 업로드하기

1. 새 저장소에서 **uploading an existing file** 링크를 클릭합니다. 링크가 없으면 **Add file → Upload files**를 선택합니다.
2. 압축 해제한 폴더 안의 파일들을 선택해 업로드 영역에 끌어다 놓습니다. 또는 **choose your files**를 클릭해 여러 파일을 선택합니다.
3. 파일 목록에 **`index.html`이 저장소 최상단에 표시**되는지 확인합니다. `폴더/index.html`처럼 한 단계 안에 들어가면 기본 설정으로 사이트가 열리지 않습니다.
4. 업로드 화면 아래쪽의 **Commit changes**를 클릭합니다. (화면에 따라 'Propose changes' 문구가 보일 수도 있습니다.)
5. 저장소 목록에 다음 이름이 보이는지 확인합니다: `index.html`, `styles.css`, `app.js`, `stats.js`, `config.js`, `favicon.svg`.

> `.nojekyll`은 이름이 점으로 시작하는 숨김 파일이라 Windows 선택 창에서 안 보일 수 있습니다. 빠진 경우에도 이 웹앱은 기본 HTML 파일로 배포할 수 있습니다. 가능하면 함께 올려 주세요.

## 4. GitHub Pages 활성화하기

1. 해당 저장소 화면 상단 메뉴에서 **Settings**를 클릭합니다.
2. 왼쪽 메뉴에서 **Pages**를 클릭합니다. (보통 `Code and automation` 아래에 있습니다.)
3. **Build and deployment** 영역의 **Source**를 **Deploy from a branch**로 선택합니다.
4. **Branch**를 `main`, 폴더를 `/(root)`로 선택합니다.
5. **Save**를 클릭합니다.
6. Pages 화면의 **Visit site** 버튼이 나타나면 클릭해 실제 앱을 확인합니다. 배포 직후에는 게시에 시간이 걸릴 수 있습니다.

> 'Branch'가 `None`이면 업로드가 아직 완료되지 않았거나 저장소에 커밋이 없는 것입니다. 먼저 `Code` 탭에서 파일이 보이는지 확인하세요.

## 5. 내 웹주소 확인하기

저장소 이름이 `arcana-lotto`이고 GitHub 아이디가 `myname`이면 배포 주소는 다음 형태입니다.

**`https://myname.github.io/arcana-lotto/`**

`myname`은 본인의 **GitHub 사용자명**으로 바꿉니다. 실제 주소는 **Settings → Pages → Visit site**에 표시되는 것을 사용하는 것이 가장 정확합니다.

이 URL은 스마트폰에서도 열 수 있고, 다른 사람에게 전송할 수 있습니다. 방문자는 GitHub 로그인이 필요하지 않습니다.

## 6. 작동 테스트 체크리스트

- [ ] 스마트폰에서 사이트가 열린다.
- [ ] 카드 3장을 선택할 수 있다.
- [ ] `번호 생성` 버튼으로 1·3·5·10세트를 만들 수 있다.
- [ ] 카드 대신 `빠른 무작위`도 동작한다.
- [ ] 번호가 1~45 범위이며 한 세트에서 중복되지 않는다.
- [ ] `번호 복사`, `이미지로 저장`, `내 기기에 저장`을 테스트했다.

브라우저에서 첫 화면만 나오고 버튼이 움직이지 않는다면 `app.js` 또는 `stats.js` 파일이 빠졌는지 확인하세요. 개발자 도구를 몰라도 파일 6개를 다시 업로드하는 것으로 해결되는 경우가 많습니다.

## 7. 상담·학습 블로그 주소 연결하기

1. 저장소의 **Code** 탭에서 `config.js`를 클릭합니다.
2. 오른쪽 위 연필 모양 **Edit this file**을 클릭합니다.
3. `links.default.reading` 및 `links.default.learning`의 빈 따옴표 안에 각각 실제 상담·학습 페이지 주소를 입력합니다.
4. `Commit changes`로 저장합니다.
5. 사이트를 새로고침한 뒤 타로 번호를 생성하여 결과 아래의 링크를 확인합니다.

예:

```js
links: {
  default: { reading: 'https://example.com/tarot-reading', learning: 'https://example.com/tarot-study' },
  wordpress: { reading: '', learning: '' },
  googlesites: { reading: '', learning: '' },
  naver: { reading: '', learning: '' }
}
```

예시 URL은 본인의 실제 사이트 주소로 변경해야 합니다. 없는 주소를 넣으면 연결이 실패합니다.

## 8. 블로그에 적용하기

**WordPress:** `사용자 정의 HTML` 블록에 아래 코드를 넣습니다(사이트/요금제에서 iframe 허용 필요).

```html
<iframe src="https://myname.github.io/arcana-lotto/?embed=1&src=wordpress"
  width="100%" height="900" style="border:0;max-width:460px"
  loading="lazy" title="타로 로또번호 생성기"></iframe>
```

**Google Sites:** `삽입 → 삽입(Embed) → URL`에서 다음 주소를 입력합니다.

`https://myname.github.io/arcana-lotto/?embed=1&src=googlesites`

**네이버 블로그:** 글의 링크 또는 링크 카드로 다음 주소에 연결합니다.

`https://myname.github.io/arcana-lotto/?src=naver`

네이버 블로그 글 본문에 일반 HTML·JS 코드를 직접 넣어 실행하는 방식은 지원하지 않습니다.

## 9. 사이트를 수정할 때

- 텍스트·레이아웃 수정: `index.html`, `styles.css`
- 타로·로또 알고리즘 수정: `app.js`
- 상담 및 학습 링크 수정: `config.js`
- 통계 데이터 업데이트: `stats.js` (새 원본을 검증한 뒤 파일 교체)

GitHub의 파일을 수정하고 `Commit changes`로 저장하면 Pages가 변경 사항을 다시 게시합니다.

**브라우저 새로고침에도 이전 화면이 나오면** `Ctrl + F5`(Windows) 또는 시크릿 창으로 확인합니다.

## 10. 자주 발생하는 문제

| 증상 | 확인할 사항 |
|---|---|
| 주소가 404 | `index.html`이 저장소 최상위인지, Pages가 `main / (root)`인지 확인 |
| `Visit site`가 없음 | Pages를 저장한 뒤 배포 진행 상태 확인, `Actions` 탭에서 오류 확인 |
| 디자인 없이 글자만 보임 | `styles.css`가 빠졌거나 이름이 다른지 확인 |
| 버튼이 작동하지 않음 | `app.js`, `stats.js`, `config.js` 파일 확인 |
| 네이버 본문에서 실행 안 됨 | 네이버는 외부 링크로 연결 |
| 저장 번호가 다른 폰에 없음 | DB가 없으므로 브라우저·기기별 저장. 정상 동작 |
| 수정 후에도 옛 화면 | 브라우저 캐시 삭제 또는 강력 새로고침 |
| 상담 링크가 없음 | `config.js`에 상담/학습 URL 입력 여부 확인 |

## 11. 향후 데이터베이스를 넣으려면

지금은 **아무것도 설치하지 마세요.** GitHub Pages에서 웹앱이 정상 동작하는 것을 먼저 확인합니다.

이후 방문 기록·사용자 저장·자동 통계 갱신 등이 필요해지면 Firebase Authentication/Firestore/Functions 등을 별도로 설계할 수 있습니다. 현재 앱에는 `installAdapters` 등 연동 지점을 마련했으며, 기존 GitHub Pages URL을 유지한 채 별도 API를 연결할 수 있습니다.

---

**공식 설명:** GitHub Pages https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

**파일 업로드:** https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

