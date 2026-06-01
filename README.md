<div align="center">

<!-- 대문 GIF: 서비스 전체 화면 캡처 또는 브랜드 이미지로 교체해 주세요 -->
<img src="https://github.com/user-attachments/assets/1d16e2f6-21ac-4f31-9d74-de85391ef1ff" width="100%" alt="지켜줘홈즈 서비스 소개" />

<br />
<br />

# 🏠 지켜줘홈즈 (Home Protect)

### 전세 사기 예방, 첫걸음

**계약서 작성 후, 도장 찍기 전에 업로드하세요.**  
AI가 1~2분 만에 전세가율 · 등기부등본 · 계약서 독소조항 · 건축물 현황을 한 번에 분석해 드립니다.

<br />

[![Deploy](https://img.shields.io/badge/배포-homeprotect.shop-FF6B6B?style=flat&logo=googlechrome&logoColor=white)](https://homeprotect.shop)

</div>

<br />

---

## 목차

- [서비스 소개](#-서비스-소개)
- [핵심 기능](#-핵심-기능)
- [기술 스택](#-기술-스택)
- [아키텍처](#-아키텍처)
- [시작하기](#-시작하기)
- [팀 소개](#-팀-소개)

---

## 💡 서비스 소개

전세사기 피해자는 2026년 5월 기준 누적 **3만 8,503건**, 피해의 **75%가 2030 청년층**에 집중되어 있습니다.

등기부등본을 혼자 해석하기엔 법률 전문 지식이 필요하고, 전문가에게 맡기기엔 비용이 부담스럽습니다.  
지켜줘홈즈는 이 **정보 비대칭의 공백**을 채우기 위해 만들어졌습니다.

<br />

```bash
[완전 무방비]  ────────  [지켜줘홈즈]  ────────  [전문가 의뢰]
                          │
               파일 업로드 + 간단한 정보 입력
               → AI 통합 분석 (1~2분)
               → 위험 조항 경고 + 대응 방법
               → 완전 무료 · 비로그인 · 전국 지원
```

<br />

> **"변호사한테 맡기기엔 비용이 부담스럽고, 그냥 넘어가기엔 불안하다"**  
> 2030 청년 임차인이 계약 전 스스로 위험 신호를 확인할 수 있는 **1차 안전망**을 제공합니다.

<br />

<div align="center">

| 분석 소요 시간 |   이용 비용   |  회원가입  |    지원 파일    |
| :------------: | :-----------: | :--------: | :-------------: |
| 평균 **1~2분** | **완전 무료** | **불필요** | PDF · JPG · PNG |

</div>

---

## ✨ 핵심 기능

서비스는 **3단계 흐름**으로 동작합니다.

<br />

### Step 1 — 정보 입력 & 파일 업로드

<!-- GIF 자리: 주소 검색 → 계약 정보 입력 → 등기부등본·계약서 파일 업로드 화면 -->
<div align="center">
  <img src="https://github.com/user-attachments/assets/b5b349c6-8473-4264-abbd-a7096ff90648" width="80%" alt="Step 1: 정보 입력 및 파일 업로드" />
</div>

<br />

주소를 검색하고 계약 유형(전세 / 반전세 / 월세), 보증금, 계약 기간을 입력합니다.  
등기부등본과 임대차계약서를 PDF · JPG · PNG 형식으로 업로드하면 준비가 끝납니다.

- 개인정보(주민등록번호·전화번호) 감지 시 외부 AI 전송 전 **즉시 차단**
- 업로드 파일 및 OCR 결과는 Redis에 세션으로 저장 후 **30분 자동 삭제**

<br />

---

### Step 2 — AI 통합 분석 (1~2분)

<!-- GIF 자리: 분석 진행 로딩 화면 → SSE로 4개 단계 순차 완료되는 화면 -->
<div align="center">
  <img src="https://github.com/user-attachments/assets/b9a77435-8738-4a13-a91e-7c48b655c84d" width="80%" alt="Step 2: AI 분석 진행" />
</div>

<br />

4가지 분석이 **병렬**로 실행되며, 각 단계가 완료되는 즉시 실시간으로 화면에 전달됩니다.

| 분석 항목             | 데이터 소스                               |
| :-------------------- | :---------------------------------------- |
| 전세가율              | 서울시 전월세·매매 실거래가 공공 API      |
| 등기부등본            | CLOVA OCR → Gemini AI                     |
| 임대차계약서 독소조항 | CLOVA OCR → Claude AI + Pinecone 판례 RAG |
| 건축물 현황           | 국토교통부 건축물대장 API                 |

<br />

---

### Step 3 — 결과 확인 & PDF 다운로드

<!-- GIF 자리: 분석 결과 화면 (위험도 표시, 독소조항 상세, 체크리스트) → PDF 다운로드 -->
<div align="center">
  <img src="https://github.com/user-attachments/assets/8f38df57-691f-4f66-8deb-482411776baa" width="80%" alt="Step 3: 결과 확인 및 PDF 다운로드" />
</div>

<br />

항목별 위험도와 상세 설명, AI가 판단하기 어려운 수동 확인 체크리스트를 함께 제공합니다.  
분석 결과 전체를 **PDF 리포트**로 저장할 수 있습니다.

**전세가율 판정 기준**

| 전세가율 |             판정             |
| :------: | :--------------------------: |
| 80% 이상 | 🔴 위험 — 깡통전세 위험 경고 |
| 60 ~ 80% |   🟡 주의 — 추가 확인 필요   |
| 60% 미만 |           🟢 안전            |

**계약서 독소조항 분류**

|      분류      | 설명                        |
| :------------: | :-------------------------- |
| 🔴 **danger**  | 판례 근거 있는 고위험 조항  |
| 🟡 **caution** | AI 법리 판단 기반 주의 조항 |

---

## 🛠 기술 스택

<div align="center">

**Frontend**

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Emotion](https://img.shields.io/badge/Emotion-C865B9?style=for-the-badge&logo=css3&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

<br />

**Backend**

![Java](https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_3-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring WebFlux](https://img.shields.io/badge/WebFlux-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-FF4438?style=for-the-badge&logo=redis&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)

<br />

**AI / OCR**

![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Claude](https://img.shields.io/badge/Claude_Haiku_4.5-D97757?style=for-the-badge&logo=anthropic&logoColor=white)
![Pinecone](https://img.shields.io/badge/Pinecone_RAG-00B050?style=for-the-badge&logo=pinecone&logoColor=white)
![CLOVA](https://img.shields.io/badge/CLOVA_OCR-03C75A?style=for-the-badge&logo=naver&logoColor=white)

<br />

**인프라 / DevOps**

![AWS ECS](https://img.shields.io/badge/AWS_ECS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![CloudWatch](https://img.shields.io/badge/CloudWatch-FF4F8B?style=for-the-badge&logo=amazonaws&logoColor=white)

</div>

---

## 🏗 아키텍처

<!-- 아키텍처 다이어그램 이미지: 직접 제작 후 교체해 주세요 -->
<div align="center">
  <img src="https://github.com/user-attachments/assets/architecture-diagram.png" width="90%" alt="지켜줘홈즈 아키텍처 다이어그램" />
</div>

<br />

> 4개 분석이 병렬로 실행(CompletableFuture)되며, 외부 API 장애 시에도 완료된 단계의 결과는 그대로 사용자에게 전달됩니다.  
> 각 분석 단계에 개별 **30초 타임아웃**이 적용되고, SSE 스트리밍으로 진행 상태를 실시간 전달합니다.

---

## 🚀 시작하기

### 서비스 이용 (바로 사용)

> **[https://homeprotect.shop](https://homeprotect.shop)**

<br />

### 로컬 실행 — Frontend

```bash
git clone https://github.com/S1J2-Lab/home-protect-client.git
cd home-protect-client

yarn install
cp .env.example .env.local
# .env.local 에 백엔드 API 주소 설정

yarn dev
# → http://localhost:5173
```

### 로컬 실행 — Backend

```bash
git clone https://github.com/S1J2-Lab/home-protect-server.git
cd home-protect-server

# .env 에 외부 API 키 설정 필요
# (공공데이터 포털, CLOVA OCR, Gemini, Claude, Pinecone)
cp .env.example .env

docker-compose up -d
```

> 외부 AI/OCR API 키 없이는 분석 기능이 동작하지 않습니다.

---

## 👥 팀 소개

> 공공데이터 활용 아이디어 공모전 2026 출품작

<div align="center">

|                                                  **이세비**                                                  |                                                    **조지현**                                                    |                                                   **박지현**                                                    |
| :----------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/2seb2.png" width="80" style="border-radius:50%" alt="이세비의 프로필 이미지" /> | <img src="https://github.com/zeon0xx0.png" width="80" style="border-radius:50%"  alt="조지현의 프로필 이미지" /> | <img src="https://github.com/jjhparkk.png" width="80" style="border-radius:50%" alt="박지현의 프로필 이미지" /> |
|                                                   Frontend                                                   |                                                     Frontend                                                     |                                                     Backend                                                     |
|                                      [@2seb2](https://github.com/2seb2)                                      |                                     [@zeon0xx0](https://github.com/zeon0xx0)                                     |                                    [@jjhparkk](https://github.com/jjhparkk)                                     |

</div>

---

<div align="center">

**지켜줘홈즈는 법률 전문가의 정밀 검토를 대체하지 않습니다.**  
계약 전 위험 신호를 스스로 확인할 수 있도록 돕는 **1차 안전망**을 목표로 합니다.

<br />

© 2026 Home Protect Team · All rights reserved.

</div>
