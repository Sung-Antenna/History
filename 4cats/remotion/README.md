# عائلة حبيبة — 오프닝·자막·엔딩 (Remotion)

Manus로 만든 15초 에피소드에 **오프닝 카드 → 자막 → 엔딩 카드**를 입혀 인스타 릴스용 1080×1920 MP4로 내보냅니다.
외부 계정 없이 로컬(또는 클라우드 세션)에서 동작하고, 폰트와 효과음도 모두 저장소 안에 있습니다.

## 새 에피소드 만드는 순서

1. Manus에서 받은 영상을 `public/episodes/epN.mp4`로 넣습니다. (영상 파일은 용량 때문에 git에 올리지 않습니다.)
2. `episodes/ep3.json`을 복사해 `episodes/epN.json`을 만들고 내용을 고칩니다.
   - `number`, `titleAr`, `titleKo`: 에피소드 번호와 제목
   - `videoSeconds`: 영상 길이(초). `ffprobe -show_entries format=duration epN.mp4`로 확인
   - `opening`: `"card"`(영상 앞 2초 타이틀 카드) · `"overlay"`(영상 위 상단 배너, 첫 장면이 바로 시작) · `"none"`
   - `ending`: `true`면 3초 «يتبع… / 다음 화에 계속» 카드
   - `nextTeaserAr`, `nextTeaserKo`: 엔딩의 다음 화 예고. 예고가 없으면 키를 지우지 말고 `""`로 둡니다 (지우면 예시 에피소드의 예고가 대신 들어감)
   - `cues`: 대사 자막. `from`/`to`는 영상 기준 초, `speaker`는 `habiba` `chakilita` `zouitina` `kim` `robot` `attendant`(때밀이)
     - `text`: 실제 대사 (다리자 또는 Kim의 한국어)
     - `translation`: 아래 작은 줄 (다리자 대사 → 한국어, Kim 대사 → 다리자)
3. 렌더링:
   ```
   npm install          # 처음 한 번
   npm run render:ep -- episodes/epN.json
   ```
   결과물: `out/epN_final.mp4`
4. 미리보기·타이밍 조정은 `npm run studio` (브라우저에서 프레임 단위로 확인)

## 구성

| 파일 | 내용 |
|---|---|
| `src/Opening.tsx` | 2초 타이틀 카드(`Opening`)와 상단 배너형(`TitleOverlay`) |
| `src/components/Subtitles.tsx` | 화자 이름표 + 대사 + 번역 자막. 아랍어는 자동으로 오른쪽→왼쪽 |
| `src/Ending.tsx` | 3초 엔딩 카드, 로봇 삐빅 효과음 |
| `src/components/Decor.tsx` | 젤리주 별 패턴 배경, 말굽 아치 프레임 |
| `src/theme.ts` | 색상, 폰트, 캐릭터별 자막 색 |
| `public/sfx/` | 직접 합성한 효과음 (chime, whoosh, robot_beep) |

폰트: Lalezar(아랍어 제목), Cairo(아랍어 자막), Jua(한국어 제목), Noto Sans KR(한국어 자막). 모두 SIL Open Font License.

## 주의

- 자막 글자는 AI가 아니라 편집에서 얹으므로 철자가 정확합니다. 그래도 **다리자 문장과 번역은 모로코 가족 확인**을 받으세요.
- 인스타 화면 아래쪽 약 380px은 캡션·버튼에 가려집니다. 자막 위치는 `subtitles.bottom`(기본 430)으로 조정합니다.
