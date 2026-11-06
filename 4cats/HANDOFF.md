# عائلة حبيبة — 작업 인계서

새 세션(다른 채널)에서 영상 제작을 이어 가기 위한 자료입니다.
**새 세션을 시작하면 이 파일 전체를 첫 메시지로 붙여 넣거나 첨부하세요.**

- 저장 위치: GitHub `Sung-Antenna/History` 저장소, 브랜치 `claude/claude-capabilities-identity-3z56qd`, 폴더 `4cats/`
- 공유 페이지(완성 영상 3편 재생 가능, 비공개): https://claude.ai/artifact/41kJg8qoG4DK7jtVjfVzKu

---

## 1. 새 세션에 줄 첫 메시지 (복사해서 사용)

```
나는 «عائلة حبيبة»라는 15초짜리 세로 숏폼 애니메이션 시리즈를 만들고 있어.
카사블랑카의 모로코 가정에 한국인 사위 Kim이 들어오면서 벌어지는 고양이 가족 코미디야.
아래 인계서에 캐릭터 설정, 프롬프트 공통 블록, 에피소드 대본, 제작 규칙이 다 있어.
이 규칙을 지키면서 다음 에피소드 제작을 도와줘. 영상 생성은 연동된 플러그인으로 직접 시도해 줘.
```

---

## 2. 시리즈 개요

- **제목:** عائلة حبيبة (부제: دار الضحك والمشاكل العجيبة)
- **형식:** 세로 9:16, 15초, 픽사풍 3D 가족 코미디, 매회 장면 4개
- **구조:** Chakilita가 시청자에게 말하며 시작하고 끝냄 (내레이터)
- **웃음 포인트:** 엄마 Habiba는 다리자, 사위 Kim은 한국어만 써서 서로 하나도 못 알아들음. 발명가 Kim의 발명품이 매회 사고를 침.
- **배경:** 카사블랑카의 모로코 전통 가정집 거실 (빨간 소파, 샹들리에, 아치형 창문, 랜턴, 민트티가 놓인 테이블)

---

## 3. 캐릭터 (공식)

공식 이미지: `4cats/official_characters.jpg`, 공식 포스터: `4cats/poster_v1.png`

| 이름 | 역할 | 외모 | 언어 |
|---|---|---|---|
| **Habiba** حبيبة | 엄마, 집안의 대장. 다혈질이지만 다정함 | 통통한 주황 고양이, 검은 웨이브 긴 머리, 검은 둥근 안경, **갈색 눈**, 금색 이마 장식(초록 보석), 빨간 벨벳 카프탄 + 금 자수 + 금 벨트 | 다리자만 |
| **Chakilita** شكيليطة | 큰딸, 내레이터. 느긋하고 시니컬, 늘 민트티 | 밝은 갈색 긴 머리, 둥근 안경, **녹색 눈**, 분홍 시스루 탁시타 + 금 스팽글 | 다리자만 |
| **Zouitina** زويتينة | 막내딸, Kim의 아내. 에너지 넘침, Kim의 1호 팬 | 풍성한 적갈색 곱슬머리, **갈색 눈**, 금 귀걸이, 초록 벨벳 카프탄 + 금 벨트, 금색 바부슈 | 다리자만 |
| **Kim** كيم | 한국인 사위, 발명가. 친절하고 엉뚱한 천재 | **어른** 주황 줄무늬 고양이, 이마 줄무늬, **호박색 눈**, 검은 갓 + 공작 깃털 + 긴 색동 구슬 갓끈, 파란 저고리 + 빨간 고름, 베이지 바지, 흰 버선, 검은 신발 | **한국어만** (다리자 못 알아들음) |
| **로봇** | Kim의 발명품 (이름 미정) | 무릎 높이의 둥근 가사 로봇, 흰 몸체 + 청록 테두리, 검은 얼굴 화면에 빛나는 눈(**파랑=기분 좋음, 빨강=폭주**), 가슴에 젤리주 별, 바퀴 | 말 없음, 삐빅 소리만 |

기타 설정: 자동차 **Krikiba** كريكيبة (웃는 얼굴의 하늘색 컨버터블, 젤리주 문양, 실내 티 테이블, 낙타 혹 모양 이중 아치 앞유리).

---

## 4. 영상 프롬프트 공통 블록 (매회 그대로 사용)

참조 이미지: `4cats/reference/board_living_room_cast.jpg` (왼쪽 거실 + 오른쪽 네 가족이 같은 키로 나란히). 한 장만 올릴 수 있을 때 이것을 쓴다.

```
Generate exactly ONE video from the prompt below. Do not write a script, do not research, do not review, do not create extra files.

The attached image is a REFERENCE BOARD. It is NOT a scene and must NEVER appear in the video:
- LEFT half = the setting: this exact Moroccan living room at night (red sofas, chandelier, arched window, lanterns, coffee table with mint tea).
- RIGHT half = the four characters standing side by side, showing their correct SIZES. From left to right: CHAKILITA (pink takchita), HABIBA (red kaftan), ZOUITINA (green kaftan), KIM (Korean gat hat and blue hanbok). Match faces, outfits and sizes exactly.
- IGNORE the small robot and the outdoor background in the right half unless the robot is in this episode.
- The ENTIRE video, including the last shot, takes place INDOORS in the living room. No sunset, no river, no outdoor scenes, no jumping group shot.

ALL FOUR CHARACTERS ARE ADULTS of about the SAME HEIGHT. Zouitina is an adult married woman, NOT a child. Kim is an adult man, slightly taller than the women, NOT a child or a kitten.

Vertical 9:16, exactly 15 seconds. Pixar-style 3D animated family comedy, fast comedic timing, expressive faces, accurate lip-sync. No subtitles, captions, titles, logos, watermarks or on-screen text.

CHARACTERS (identical in every shot, no one else):
- CHAKILITA (narrator, eldest daughter): long light-brown hair, GREEN eyes, round glasses, pink sequined takchita. Wise and sarcastic.
- HABIBA (the mother, head of the house): long wavy black hair, BROWN eyes, black round glasses, gold forehead jewelry, deep-red velvet kaftan with gold embroidery. Dramatic, short-tempered, loving.
- ZOUITINA (youngest daughter, Kim's wife, adult): big curly auburn hair, BROWN eyes, gold earrings, emerald-green kaftan with gold belt. Energetic, tries to keep the peace.
- KIM (Zouitina's Korean husband, inventor, adult): male orange tabby cat with a mature face, tabby stripes on forehead, AMBER-GOLD eyes, black Korean gat hat with a peacock feather and a long colorful bead gat strap, bright blue hanbok jacket with a red ribbon, beige baggy trousers, white socks, black shoes. NO pearl necklace. Friendly, polite, eccentric genius.
- THE ROBOT (only if in this episode): small, round, cute household robot on wheels, about knee-high, glossy white body with teal trim, black face screen with two glowing eyes (BLUE = happy, RED = out of control), a Moroccan zellige star on its chest, two short arms.

LANGUAGE RULES: Chakilita, Habiba and Zouitina speak Moroccan Darija only. Kim speaks Korean only and does not understand Darija. Never make Kim speak Darija, Arabic or English. Do not translate Kim's lines. The robot only beeps. No extra dialogue.
```

공통 블록 뒤에 `SCENE 1 (0-4s)` ~ `SCENE 4 (12-15s)`를 붙인다.

---

## 5. 에피소드 현황

### ✅ 1화 "The Day Kim Arrived" (완성, 16초)
차 마시던 Habiba와 Chakilita 앞에 Zouitina가 Kim을 데려옴 → Kim이 갓을 벗고 «안녕하세요, 어머님! 만나서 반갑습니다!» → Habiba 찻잔이 넘침 → Chakilita «ومن تما… بدات الحكاية!» → Habiba 충격 정지.
편집: 원본 0~4.75초 + 새 Kim으로 다시 만든 10초 + 원본 마지막 Habiba 정지 1초.
대사 (자막용): Chakilita «واحد النهار، كنا جالسين أنا وماما حبيبة هانيين، كنشربو أتاي…» → Zouitina «ماما، شوفي شكون جبت ليك!» → Kim «안녕하세요, 어머님! 만나서 반갑습니다!» → Chakilita (보이스오버) «ومن تما… بدات الحكاية!»

### 🟡 2화 «العريس الكوري فدار حبيبة» (프롬프트 준비 완료, 미제작)
```
SCENE 1 (0-4s): Close-up of Chakilita on the sofa, tea glass in paw, looking straight at the camera.
CHAKILITA (Moroccan Darija): «أنا شكيليطة… واليوم ماما حبيبة غادي تعرف شنو معنى العريس الكوري!»

SCENE 2 (4-8s): Zouitina proudly hugs Kim's arm in front of Habiba.
ZOUITINA (Moroccan Darija): «ماما، هادا راجلي كيم!»
Kim takes off his gat and bows deeply.
KIM (Korean only): «장모님, 잘 부탁드립니다!»
Habiba's glasses slowly slide down her nose; the tea glass trembles in her paw.

SCENE 3 (8-12s): Kim proudly presses a remote. The little robot rolls in carrying a tray with a Moroccan teapot, a gift for Habiba. Its eyes suddenly turn RED. It spins wildly around the room: cushions fly, mint tea splashes everywhere.
HABIBA (Moroccan Darija, jumping up): «واش جبتي ليا صهر ولا مصيبة؟!»

SCENE 4 (12-15s): Chakilita sits with a cushion on her head, deadpan, looking at the camera.
CHAKILITA (Moroccan Darija, sarcastic): «وباقي غير البداية… الله يستر!»
Final second: the robot stops right in front of Habiba, its eyes turn BLUE, and it politely offers her one single glass of tea. Close-up of Habiba's speechless, shocked face. Freeze-frame.
```
대사가 넘치면 SCENE 1을 «أنا شكيليطة… واليوم ماما غادي تعرف العريس الكوري!»로 줄인다.

### ✅ 3화 "The House Rules" (완성, 16초)
```
SCENE 1 (0-4s, no longer than 4 seconds): Chakilita stands in the living room, looking straight at the camera with a knowing, sarcastic smile.
CHAKILITA (Moroccan Darija): «من نهار دخل كيم لدارنا، ماما بغات تعلّمو القوانين… والمشكل؟ ما فاهم والو!»
Quick comedic whip-pan transition.

SCENE 2 (4-9s): Habiba stands face to face with Kim, at eye level, pointing her finger dramatically.
HABIBA (Moroccan Darija): «القانون الأول: ممنوع الاختراعات فالدار!»
Kim, who understands nothing, nods enthusiastically with a big confident smile.
KIM (Korean only): «네! 알겠습니다!»

SCENE 3 (9-12s): Behind Kim's back, a small brass Moroccan teapot with tiny spinning propellers on top suddenly switches on: it beeps, flashes colorful lights and flies around wildly, splashing mint tea everywhere. Habiba slowly turns toward it, shocked.
HABIBA (Moroccan Darija, shouting): «آش قلت ليك أنا دابا؟!»
KIM (Korean only, completely confused): «무슨 일이에요?»

SCENE 4 (12-15s): In the same living room, Chakilita looks at the camera while chaos continues behind her: Habiba chases the flying teapot, adult Zouitina waves her arms trying to calm everyone, Kim watches proudly.
CHAKILITA (Moroccan Darija, sarcastic): «ماما بالدارجة، كيم بالكورية… وأنا خاصني مترجم ولا طبيب!»
LAST SHOT (inside the living room): freeze-frame of Habiba diving through the air to catch the flying teapot, with a playful comedic music sting.
```
편집: 마지막 장면 1초 정지 + 살짝 확대 + 효과음.

### ⏸ 보류
- 90초 트레일러 (`4cats_trailer_script.md`, Kim이 영어로 말하는 구버전 → 한국어로 고쳐야 함)

---

## 6. 제작 규칙 (실패하면서 알게 된 것)

**참조 이미지**
- 공식 점프 사진(`official_characters.jpg`)을 영상 참조로 쓰면 **Kim과 Zouitina가 어린이 크기**로 나오고, **마지막 장면에 그 사진이 그대로** 나왔음 → 영상에는 `reference/board_living_room_cast.jpg`를 쓴다.
- 참조 이미지 첨부가 한 장뿐이면, 장면 사진과 캐릭터 사진을 **한 장으로 합쳐** 올리고 프롬프트에 "LEFT = setting, RIGHT = characters"로 설명한다. 합친 이미지에 글자 라벨은 넣지 않는다 (영상에 글자가 그려짐).
- 이어 붙일 영상은 이전 영상의 마지막 프레임(예: `reference/front_door.jpg`)을 첫 장면으로 쓰게 하면 이음새가 자연스럽다.

**프롬프트**
- 맨 앞에 "Generate exactly ONE video… do not write a script…"를 넣어 크레딧을 아낀다. Manus는 Lite 모델로 먼저 시도.
- 대사는 15초에 5줄 안팎. 장면마다 초를 못 박는다 (안 그러면 첫 장면이 8초까지 늘어남).
- 엔딩은 막연하게 "funny freeze-frame"이라고 하지 말고 **구체적인 장면**으로 적는다.
- 눈 색을 캐릭터마다 명시한다 (안 그러면 장면마다 바뀜).
- Kim에게 "NO pearl necklace"를 적는다 (갓끈 구슬이 진주 목걸이로 변했던 적 있음).

**글자**
- 아랍어 제목·자막은 AI가 철자를 틀린다 (실제로 «عائلة حبيبة»가 «عالة حبيدة»로 나왔음). **영상에 글자를 그리게 하지 말고 편집할 때 얹는다.**
- 다리자 문법 주의: 여자에게 말할 때 동사 끝에 ي (예: جبت → **جبتي**).
- 다리자 대사는 모로코 가족에게 최종 확인을 받는다.

**목소리**
- AI가 다리자 발음을 부자연스럽게 낼 때가 많다. 가장 좋은 방법은 목소리 없이 만들고 가족이 직접 녹음하는 것.

---

## 7. 편집 레시피 (ffmpeg)

영상 생성 결과물을 다듬을 때 쓴 명령이다. 새 세션의 도구가 ffmpeg를 쓸 수 있으면 그대로 활용.

**두 영상 이어 붙이기** (A의 0~4.75초 + B 전체, 이음새 소리 페이드)
```
ffmpeg -i A.mp4 -i B.mp4 -filter_complex "[0:v]trim=0:4.75,setpts=PTS-STARTPTS,setsar=1[v0];[0:a]atrim=0:4.75,asetpts=PTS-STARTPTS,afade=t=out:st=4.70:d=0.05[a0];[1:v]setsar=1[v1];[1:a]afade=t=in:d=0.05[a1];[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" -c:v libx264 -pix_fmt yuv420p -crf 17 -c:a aac -ar 44100 out.mp4
```

**엔딩 1초 늘리기** (마지막 프레임 정지 + 살짝 확대, 효과음 sting.wav)
```
ffmpeg -sseof -0.3 -i in.mp4 -update 1 last.png
ffmpeg -loop 1 -i last.png -i sting.wav -filter_complex "[0:v]scale=3072:5376,zoompan=z='1+0.12*on/23':x='1536-(1536/zoom)':y='2360-(2360/zoom)':d=24:s=768x1344:fps=24,format=yuv420p[v]" -map "[v]" -map 1:a -t 1 -c:v libx264 -c:a aac -ar 44100 freeze.mp4
(이후 in.mp4 + freeze.mp4를 concat)
```

**장면 전환 지점 찾기**
```
ffmpeg -i in.mp4 -vf "select='gt(scene,0.3)',showinfo" -f null - 2>&1 | grep -o "pts_time:[0-9.]*"
```

---

## 8. 파일 목록 (`4cats/`)

| 파일 | 내용 |
|---|---|
| `official_characters.jpg` | 공식 캐릭터 (네 명 점프, 이미지 생성용 참조) |
| `poster_v1.png` | 공식 포스터 v1 |
| `reference/board_living_room_cast.jpg` | **영상 생성용 참조 이미지** (거실 + 같은 키로 선 네 가족) |
| `reference/board_living_room_official.jpg` | 거실 + 공식 점프 사진 (영상용으로는 비추천) |
| `reference/living_room.jpg` | 거실 장면 |
| `reference/front_door.jpg` | 현관문 장면 (1화 4.8초 지점) |
| `reference/cast_lineup.png` | 포스터 속 네 가족 + 로봇 나란히 |
| `../4cats_series_notes.md` | 시리즈 메모 |
| `../4cats_trailer_script.md` | 90초 트레일러 대본 (보류) |

---

## 9. 오프닝·자막·엔딩 템플릿 (Remotion)

`4cats/remotion/` — Manus 영상에 2초 오프닝 카드, 화자별 이중 자막(다리자↔한국어), 3초 엔딩 카드를 입혀 1080×1920 MP4로 내보낸다.
사용법은 `4cats/remotion/README.md`. 3화 적용 예시 데이터는 `4cats/remotion/episodes/ep3.json`.

### ✅ 4화 «الحمّام» / "함맘" (완성, 16.6초)
Chakilita «كيم قرر يجرب الحمّام المغربي… وما كانش عارف شنو كيتسناه!» → 때밀이 «وجد راسك آ خويا!» → Kim «아이고! 너무 아파요! 살살 해주세요!» → Kim (젤라바) «다시는 목욕탕에 안 올 거예요!» → Chakilita «بغا يتعرف على الثقافة المغربية… تعرّف على الكيس الأول!»
새 캐릭터: 함맘 때밀이(الكسّال, 짙은 갈색 덩치 큰 고양이, 케사 장갑). 자막 데이터 `4cats/remotion/episodes/ep4.json`.

### ✅ 5화 «كيم والكسكس المغربي» / "킴과 모로코 쿠스쿠스" (완성, 15.1초)
프롬프트 `4cats/prompts/ep5_couscous.txt`, 참조 보드 `reference/board_couscous_cast.jpg`, 자막 `remotion/episodes/ep5.json`.
수정: 첫 영상에서 Chakilita가 «الكسكس»를 "카삭스"(찜통 كسكاس처럼)로 읽음 → 대사를 «الكسكسو»로 바꾸고 발음 "kus-KU-su"를 적은 7초 재촬영(`prompts/ep5_fix_shots.txt`)으로 0~3.08초와 11.21초~끝을 교체. 재촬영본의 첫 대사 마지막 단어가 장면 전환(3.08초) 뒤 3.65초까지 이어져서, 첫 장면 마지막 프레임을 0.6초 정지(살짝 확대)해 대사를 끝까지 넣고 엔딩 장면은 재촬영본 3.70초부터 사용. 최종 본편 15.4초.
**교훈: 이어 붙이기 전에 장면 전환 지점이 아니라 대사가 끝나는 지점을 소리로 확인한다.**
**교훈: 다리자 단어는 프롬프트에 발음을 영어로 함께 적는다.**
결과: 프롬프트에서 "로봇 무시"라고 했는데도 로봇이 나와 쿠스쿠스를 뿜는 기계 역할을 함 (참조 보드에 로봇이 있으면 등장할 수 있음).

### 🟡 6화 «كيم وامتحان الدارجة» / Habiba Tests Kim in Darija (프롬프트 준비, 미제작)
이드(희생제) 6화는 피 관련 내용이라 폐기하고 교체함. 프롬프트 `4cats/prompts/ep6_darija_exam.txt`.
- **표정 지침 (사용자 요청):** Habiba와 Chakilita가 너무 자주 얼굴을 찡그림 → 6화부터 더 평화롭고 부드러운 표정으로. 프롬프트에 예: "Habiba and Chakilita keep warm, gentle, relaxed faces; no scowling, no gritted teeth, no furrowed brows. Their comedy comes from calm, amused or politely surprised reactions." 
- 5화 엔딩에는 6화 예고를 넣지 않았다 (사용자 요청).
