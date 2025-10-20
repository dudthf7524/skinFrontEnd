import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ko' | 'en' | 'ja' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
  formatDate: (date: string, format?: 'input' | 'display') => string;
  parseDateInput: (dateString: string) => string;
  getDatePlaceholder: () => string;
  getDateFormatPattern: () => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ko: {
    // App.tsx
    appTitle: "Talktail AI",
    appSubtitle: "반려동물 피부 분석 도우미",
    stepQuestionnaire: "반려동물 정보 & 증상 입력",
    stepUpload: "사진 업로드",
    stepDiagnosis: "분석 결과",
    stepHospitals: "병원 추천",
    stepComplete: "완료",
    aiAnalyzing: "AI가 {petName}의 피부 상태를 분석하고 있습니다",
    aiAnalyzingGeneric: "AI가 반려동물의 피부 상태를 분석하고 있습니다",
    analysisDescription: "문진표와 사진을 종합하여 정확한 진단을 준비중입니다...",
    diagnosisComplete: "진단이 완료되었습니다!",
    diagnosisThankYou: "🐾 {petName}의 피부 건강을 확인해주셔서 감사합니다!",
    visitRecommendation: "필요시 추천된 병원에서 정확한 진료를 받으시기 바랍니다.",
    resultSent: "📬 결과가 성공적으로 전송되었습니다",
    emailCheck: "이메일을 확인하시고, 반려동물 건강 관리에 도움이 되는 추가 정보도 받아보세요.",
    aiSolution: "✨ GPTOnline.ai에서 제공하는 스마트 AI 솔루션으로 더 나은 반려동물 케어를 경험하세요",
    newDiagnosis: "새로운 분석 시작하기",
    disclaimer: "Talktail AI는 참고용이며, 정확한 진단은 수의사와 상담하세요.",

    // Navbar.tsx
    home: "홈",
    aiAnalysis: "AI 분석",
    diseaseInfo: "질병 정보",
    hospitalSearch: "병원 찾기",
    myRecord: "내 기록",
    login: "로그인",
    logout: "로그아웃",
    diagnoseNow: "지금 진단하기",
    languageSelect: "언어 선택",

    // LoginPage.tsx
    goBack: "돌아가기",
    welcomeBack: "다시 만나서 반가워요!",
    keepHealthySkin: "우리 아이의 건강한 피부를 함께 지켜요",
    continueWithGoogle: "Google로 계속하기",
    continueWithKakao: "카카오로 계속하기",
    continueWithNaver: "네이버로 계속하기",
    continueWithApple: "Apple로 계속하기",
    termsAgreement: "로그인하면 이용약관 및 개인정보처리방침에 동의합니다",
    terms: "이용약관",
    privacyPolicy: "개인정보처리방침",
    loginTitle: "로그인",
    socialLoginDescription: "소셜 계정으로 간편하게 로그인하세요",
    welcome: "반가워요!",
    petHealthMessage: "반려동물의 피부 건강을 함께 지켜나가요",
    cumulativeDiagnosis: "누적 분석",
    accuracy: "정확도",
    goHome: "홈으로 돌아가기",
    noTokenAlert: "토큰이 없습니다",
    loginRequiredAlert: "로그인이 필요합니다.",

    // MyPage.tsx
    mypage_logout: "로그아웃",
    mypage_currentTokens: "보유토큰",
    mypage_recharge: "충전",
    mypage_code: "쿠폰",
    mypage_logoutSuccess: "로그아웃 되었습니다.",
    mypage_profile: "프로필",
    mypage_diagnosisRecords: "진단 기록",
    mypage_tokenManagement: "토큰 관리",
    mypage_profileInfo: "프로필 정보",
    mypage_name: "이름",
    mypage_email: "이메일",
    mypage_phone: "전화번호",
    mypage_itching: "가려움",
    mypage_severe: "심함",
    mypage_moderate: "보통",
    mypage_none: "없음",
    mypage_hairLoss: "털빠짐",
    mypage_smell: "냄새",
    mypage_area: "부위",
    mypage_viewDetails: "상세보기",
    mypage_dataNotFound: "데이터를 찾을 수 없습니다",
    mypage_diagnosisInfoNotExist: "요청하신 진단 정보가 존재하지 않습니다.",
    mypage_backToList: "목록으로 돌아가기",
    mypage_diagnosisDetailView: "진단 상세보기",
    mypage_receptionDate: "접수일",
    mypage_analysisResult: "분석결과",
    mypage_skinConditionClassification: "피부 상태 분류",
    mypage_expectedDiagnosis: "예상 분석",
    mypage_aiConfidence: "AI 신뢰도",

    // DiseaseInfoPage.tsx
    skinDiseaseInfo: "피부 질병 정보",
    skinDiseaseDescription: "반려동물에게 흔한 피부 질병들에 대해 알아보세요",
    consultVetNote: "정확한 진단은 전문 수의사와 상담하세요",
    mainSymptoms: "주요 증상",
    diseaseMainSymptoms: "질병 주요 증상",
    description: "설명",
    checkOtherDiseases: "다른 질병 확인하기",
    riskLevel: "위험도",
    common: "흔함",
    normal: "보통",
    rare: "드뭄",
    viewDetails: "자세히 보기",
    severity: "심각도",
    prevalence: "발생빈도",
    high: "높음",
    medium: "중간",
    low: "낮음",


    // Disease names and descriptions
    papulesPlaquesName: "구진,플라크",
    papulesPlaquesDesc: "알레르기, 박테리아 감염으로 인하여 발생할 수 있는 질병 입니다.",
    papulesPlaquesSymptoms: ["가려움", "붉어짐(발적)", "털빠짐", "각질 및 비듬", "진물 및 딱지"],

    epithelialCollarsName: "상피성잔고리(비듬, 각질)",
    epithelialCollarsDesc: "곰팡이 감염에 의하여 대부분 발생하는 질병이며 비듬, 각질등과 관련한 질환의 일부로 나타날 수 있습니다.",
    epithelialCollarsSymptoms: ["가려움", "딱지", "건조함", "고리 모양의 붉은 반점"],

    lichenificationName: "태선화, 과다색소침착",
    lichenificationDesc: "곰팡이 감염으로 인하여 발생한 질환",
    lichenificationSymptoms: ["냄새 및 악취취", "털 빠짐", "귀가 붉어짐", "검은색 귀지가 나옴옴", "가려움"],

    pustulesAcneName: "농포, 여드름",
    pustulesAcneDesc: "세균 감염, 면역력 저하, 개인 위생 소홀로 인하여서 발생하는 질병 입니다.",
    pustulesAcneSymptoms: ["붉은 발적과 부기", "좁쌀 모양의 종기", "고름", "털빠짐", "가려움"],

    erosionUlcerName: "미란, 궤양",
    erosionUlcerDesc: "외상, 알레르기, 바이러스 감염으로 발생하는 질병 입니다.",
    erosionUlcerSymptoms: ["눈곱 및 눈물 증가", "눈 비비기 및 자극", "각막 혼탁", "눈 충혈"],

    nodulesName: "결절, 종괴",
    nodulesDesc: "피부 및 피하 조직 문제, 장기 종양, 노령성 변화로 인하여서 발생하는 질병 입니다.",
    nodulesSymptoms: ["피부 멍울", "호흡곤란", "절뚝거림", "체중 감소", "식욕부진"],

    // MedicalQuestionnaire.tsx
    step1Title: "Step 1. 반려동물 정보",
    step2Title: "Step 2. 증상 및 부위 입력",
    step1Description: "스마트 AI 솔루션으로 반려동물의 피부 문제를 분석합니다",
    step2Description: "반려동물의 주요 증상과 영향을 받은 부위를 선택해 주세요",
    accurateInfo: "정확한 분석을 위해 자세히 작성해 주세요",
    petName: "반려동물 이름",
    required: "*",
    namePlaceholder: "이름",
    birthDate: "생년월일",
    dateFormat: "YYYY-MM-DD",
    datePlaceholder: "년-월-일",
    weight: "몸무게 (kg)",
    weightPlaceholder: "3.15",
    breed: "품종",
    breedPlaceholder: "품종을 선택하세요",
    dogCategory: "🐕 강아지",
    catCategory: "🐱 고양이",
    otherBreed: "🔍 기타 (직접 입력)",
    customBreedPlaceholder: "품종을 직접 입력하세요",
    customBreedHelper: "예: 믹스견, 고양이 믹스, 특별한 품종명 등",
    // mainSymptoms: "주요 증상 (Main Symptoms)",
    symptomsDescription: "해당되는 증상을 모두 선택해 주세요",
    selectedSymptoms: "선택된 증상",
    moreSymptoms: "+{count}개 더",
    affectedAreas: "영향받은 부위 (Affected Area)",
    categorySelect: "대분류 선택",
    selectAreaPlaceholder: "부위를 선택하세요",
    subAreaSelect: "소분류 부위 (복수 선택 가능)",
    selectedAreas: "선택된 부위 ({count}개)",
    moreAreas: "+{count}개 더",
    previous: "이전",
    next: "다음",
    complete: "완료",

    // Symptoms
    itching: "가려움",
    scaling: "각질",
    hairLoss: "탈모",
    redness: "붉어짐",
    wounds: "상처",
    odor: "냄새",
    swelling: "부어오름",
    scabs: "딱지",
    blackSpots: "검은 반점",
    whiteDandruff: "하얀 비듬",

    // New symptom questions
    petItchyQuestion: "반려동물이 가려워합니까?",
    itchyNone: "전혀 긁거나 핥지 않음",
    itchyModerate: "가끔 긁거나 핥음",
    itchySevere: "지속적이고 과도한 긁기나 핥기로 스트레스를 받고 있음",

    // Questionnaire specific itching questions
    questionnaire_doesPetItch: "반려동물이 가려워하나요?",
    questionnaire_itching_none: "없음",
    questionnaire_itching_moderate: "보통",
    questionnaire_itching_severe: "심함",
    questionnaire_itching_none_desc: "가려워하지 않아요",
    questionnaire_itching_moderate_desc: "가끔 긁거나 핥아요",
    questionnaire_itching_severe_desc: "자주 심하게 긁어요",

    // Questionnaire odor questions
    questionnaire_skinOdor: "피부에서 냄새가 나나요?",
    questionnaire_odor_yes: "O",
    questionnaire_odor_no: "X",
    questionnaire_odor_yes_desc: "기름지고 냄새남",
    questionnaire_odor_no_desc: "냄새 없음",

    // Questionnaire hair loss questions
    questionnaire_hairLoss: "털이 과도하게 빠지나요?",
    questionnaire_hairLoss_yes: "O",
    questionnaire_hairLoss_no: "X",
    questionnaire_hairLoss_yes_desc: "털빠짐 관찰됨",
    questionnaire_hairLoss_no_desc: "정상적인 털빠짐",

    // Selected symptoms
    questionnaire_selectedSymptoms: "선택된 증상",

    // PhotoUpload page
    upload_title: "피부 상태 사진 업로드",
    upload_description: "문제가 있는 피부 부위의 선명한 사진을 업로드해 주세요",
    upload_tip: "자연광에서 근접 촬영하시면 더 정확한 분석이 가능합니다",
    upload_dragOrClick: "사진을 드래그하거나 클릭하여 업로드",
    upload_fileFormat: "JPG, PNG 파일만 지원됩니다 (최대 10MB)",
    upload_selectFile: "파일 선택하기",
    upload_completed: "업로드 완료",
    upload_cropReady: "크롭하여 분석 준비",
    upload_cropCompleted: "크롭 완료",
    upload_optimized: "224x224 크기로 최적화됨",
    upload_cropNeeded: "이미지 크롭 필요",
    upload_cropDescription: "정확한 진단을 위해 병변 부위를 224x224 크기로 크롭해주세요",
    upload_cropButton: "크롭하기",
    upload_diagnosisReady: "분석 준비 완료!",
    upload_imageOptimized: "이미지가 224x224 크기로 최적화되었습니다. AI 분석을 시작하세요.",
    upload_startDiagnosis: "분석하기",
    upload_photographyGuide: "촬영 가이드",
    upload_guideBrightLight: "밝은 자연광에서 촬영해 주세요",
    upload_guideClearCapture: "병변 부위를 선명하게 포착해 주세요",
    upload_guideCloseShot: "흔들림 없이 근접 촬영해 주세요",
    upload_cropModal_title: "이미지 크롭",
    upload_cropModal_description: "병변 부위를 정사각형 영역으로 선택해주세요",
    upload_cropModal_imageAlt: "크롭할 이미지",
    upload_cropModal_cancel: "취소",
    upload_cropModal_complete: "크롭 완료",
    upload_backToPrevious: "이전 단계로",
    upload_errorImageOnly: "이미지 파일만 업로드 가능합니다.",
    upload_errorFileSize: "파일 크기가 10MB를 초과합니다. 더 작은 파일을 선택해주세요.",

    // DiagnosisResult page
    diagnosis_analysisResult: "분석결과",
    diagnosis_skinConditionClassification: "피부 상태 분류",
    diagnosis_uploadedSkinPhoto: "업로드된 피부 사진",
    diagnosis_expectedDiagnosis: "예상 분석",
    diagnosis_severityLow: "경미",
    diagnosis_severityMedium: "보통",
    diagnosis_severityHigh: "심각",
    diagnosis_aiConfidence: "AI 신뢰도",
    diagnosis_nearbyRecommendedHospitals: "주변 추천 병원",
    diagnosis_listView: "리스트 보기",
    diagnosis_mapView: "지도로 보기",
    diagnosis_locationChecking: "위치 확인 중",
    diagnosis_gpsLocationChecking: "GPS를 통해 현재 위치를 확인하고 있습니다...",
    diagnosis_hospitalSearching: "병원 검색 중",
    diagnosis_searchingNearbyHospitals: "주변 동물병원을 검색하고 있습니다...",
    diagnosis_locationPermissionRequired: "위치 권한 필요",
    diagnosis_locationPermissionMessage: "주변 병원을 찾기 위해 위치 권한이 필요합니다.\n브라우저에서 위치 권한을 허용해주세요.",
    diagnosis_noHospitalsFound: "병원을 찾을 수 없음",
    diagnosis_noHospitalsFoundMessage: "주변에서 동물병원을 찾을 수 없습니다.\n다른 지역에서 검색해보세요.",
    diagnosis_operatingNow: "영업중",
    diagnosis_callHospital: "전화하기",
    diagnosis_getDirections: "길찾기",
    diagnosis_mapLoading: "지도 로딩 중",
    diagnosis_loadingMapMessage: "지도를 불러오고 있습니다...",
    diagnosis_activatingGpsMessage: "GPS 위치 서비스를 활성화하고 있습니다...",
    diagnosis_myLocation: "내 위치",
    diagnosis_shareResults: "결과 공유하기",
    diagnosis_saveAsImage: "분석 결과 이미지로 저장",
    diagnosis_saveImageFile: "이미지 파일로 저장하기",
    diagnosis_saveImageDescription: "분석 결과를 고화질 이미지로 저장하여 보관하세요",
    diagnosis_emailSubscription: "이메일로 구독하기",
    diagnosis_emailPlaceholder: "이메일 주소를 입력하세요",
    diagnosis_subscribe: "구독",
    diagnosis_emailDescription: "상세한 분석 리포트와 관리 가이드를 이메일로 받아보세요",
    diagnosis_importantNotice: "중요 안내사항",
    diagnosis_disclaimerMessage: "이 결과는 AI 예측이며 정확한 진단을 위해서는 반드시 수의사의 진료를 받으시기 바랍니다.",
    diagnosis_newAnalysis: "새로운 AI 분석하기",
    diagnosis_urgencyEmergency: "즉시 응급실 방문이 필요합니다",
    diagnosis_urgencyUrgent: "빠른 시일 내 병원 방문을 권장합니다",
    diagnosis_urgencyNormal: "정기적인 관리가 필요합니다",
    diagnosis_hospitalContactCall: "{hospitalName}에 전화를 거시겠습니까?\n\n전화번호: {phone}\n운영시간: {openHours}\n예상 대기시간: {waitTime}",
    diagnosis_hospitalContactNavigate: "{hospitalName}로 길찾기를 시작합니다.\n\n주소: {address}\n거리: {distance}\n예상 소요시간: 도보 {walkTime}분",
    diagnosis_emailSentSuccess: "분석 결과가 {email}로 전송되었습니다",
    diagnosis_emailSentError: "이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.",
    diagnosis_saveImageError: "저장할 영역을 찾을 수 없습니다. 페이지를 새로고침 후 다시 시도해주세요.",
    diagnosis_inAppBrowserWarning: "인앱 브라우저에서는 이미지 저장이 제한될 수 있습니다.\n\nChrome, Safari 등의 일반 브라우저에서 열기를 권장합니다.\n\n그래도 시도하시겠습니까?",
    diagnosis_imageSavedSuccess: "분석 결과가 선택한 위치에 저장되었습니다!",
    diagnosis_imageOpenedInNewTab: "이미지가 새 탭에서 열렸습니다!\n\n💡 이미지를 길게 눌러서 \"이미지 저장\"을 선택하거나, Chrome/Safari 브라우저에서 다시 시도해주세요.",
    diagnosis_imageDownloadedSuccess: "분석 결과가 다운로드 폴더에 저장되었습니다!\n\n💡 저장 위치를 선택하려면 Chrome 브라우저에서 설정 > 다운로드 > \"다운로드하기 전에 각 파일의 저장 위치 묻기\"를 활성화하세요.",
    diagnosis_imageSaveGeneralError: "이미지 저장 중 오류가 발생했습니다.\n\n💡 Chrome, Safari 등의 일반 브라우저에서 다시 시도해주세요.",

    // VetFinderPage
    vetFinder_pageTitle: "병원 찾기",
    vetFinder_pageDescription: "주변의 전문 동물병원을 찾아보세요",
    vetFinder_searchPlaceholder: "병원명 또는 지역 검색",
    vetFinder_filtersTitle: "필터",
    vetFinder_filterOpen: "영업중",
    vetFinder_statusOpen: "영업중",
    vetFinder_statusClosed: "영업종료",
    vetFinder_reserveButton: "예약하기",
    vetFinder_loading: "로딩중...",
    vetFinder_error: "에러 발생",
    vetFinder_loadSuccess: "로드 성공",

    // Home page
    home_aiScreeningService: "AI 피부 질병 모니터링 서비스",
    home_mainTitle: "반려동물 피부 건강을 AI로 분석하세요",
    home_mainDescription: "반려동물의 피부 사진을 업로드해서 AI 분석을 즉시 시작하세요",
    home_tryNowButton: "지금 바로 체험하기",
    home_aiAnalyzing: "AI 분석 중...",
    home_aiAnalysisResult: "AI 분석 결과",
    home_stepsTitle: "간단한 3단계로",
    home_stepsComplete: "완료",
    home_stepsSubtitle: "복잡한 절차 없이 쉽고 빠르게 반려동물의 피부 건강을 확인하세요",
    home_step1Title: "사진 업로드",
    home_step1Description: "문제가 있는 피부 부위를 사진으로 촬영하여 업로드하세요.",
    home_step2Title: "AI 분석",
    home_step2Description: "고도화된 AI가 피부 상태를 분석하여 질병 가능성을 분석합니다.",
    home_step3Title: "병원 연결",
    home_step3Description: "분석 결과를 바탕으로 주변 전문 병원을 추천하고 예약을 도와드립니다.",
    home_analysisTime: "💡 평균 분석 시간: 30초 이내",
    home_whyChooseTitle: "왜 Talktail Care를 선택해야 할까요?",
    home_whyChooseSubtitle: "전문적이고 신뢰할 수 있는 반려동물 피부 분석 서비스",
    home_feature1Title: "85% 높은 정확도",
    home_feature1Description: "수만 건의 데이터를 학습한 AI 알고리즘",
    home_feature2Title: "가까운 동물 병원 연결",
    home_feature2Description: "500+ 주변 병원과 즉시 연결",
    home_feature3Title: "간편한 사용법",
    home_feature3Description: "사진 업로드만으로 30초 내 결과",
    home_testimonialsTitle: "사용자 후기",
    home_testimonialsSubtitle: "이미 많은 반려인들이 경험했습니다",
    home_testimonial1Name: "김🤍🤍",
    home_testimonial1Pet: "골든리트리버 멍멍이",
    home_testimonial1Content: "우리 멍멍이 피부 문제를 빠르게 발견할 수 있어서 정말 도움이 되었어요. AI 분석이 정말 정확했습니다!",
    home_testimonial2Name: "박🤍🤍",
    home_testimonial2Pet: "페르시안 나비",
    home_testimonial2Content: "24시간 언제든 사용할 수 있어서 좋고, 근처 병원까지 추천해줘서 편리했습니다.",
    home_testimonial3Name: "이🤍🤍",
    home_testimonial3Pet: "말티즈 구름이",
    home_testimonial3Content: "사진만 찍으면 바로 결과가 나와서 신기했어요. 수의사 선생님도 정확한 분석이라고 하셨습니다.",
    home_petOwner: "보호자",
    home_ctaTitle: "지금 바로 시작하세요",
    home_ctaSubtitle: "우리 아이의 건강한 피부를 위한 첫 걸음을 내딛어보세요",
    home_freeTrialButton: "무료 체험 하기",
    home_footerTitle: "Talktail Care",
    home_footerSubtitle: "반려동물 피부 건강의 든든한 파트너",
    home_footerDescription: "AI 기술로 반려동물의 피부 건강을 지키는 스마트 솔루션입니다. 가까운 동물병원 연결을 통해 더 나은 치료를 받으세요.",
    home_footerAccuracy: "정확도 85%",
    home_footerHospitals: "500+ 제휴병원",
    home_footerServices: "서비스",
    home_footerAiAnalysis: "AI 분석",
    home_footerDiseaseInfo: "질병 정보",
    home_footerHospitalFinder: "병원 찾기",
    home_footerCustomerSupport: "고객지원",
    home_footerFaq: "자주 묻는 질문",
    home_footerUserGuide: "이용 약관",
    home_footerCustomerCenter: "고객센터",
    home_footerPrivacyPolicy: "개인정보처리방침",
    home_footerCopyright: "© 2024 Talktail Care. All rights reserved.",

    // Dog breed selector
    selectBreed: "품종을 선택하세요",

    skinOdorQuestion: "피부에서 냄새가 납니까?",
    yesGreasySmell: "O (네, 기름기나 곰팡이 냄새가 남)",
    noOdor: "X (냄새 없음)",
    excessiveSheddingQuestion: "털이 과도하게 빠지습니까?",
    yesHairLoss: "O (네, 털 빠짐이 관찰됨)",
    noExcessiveShedding: "X (과도한 털 빠짐 없음)",
    weightGainLethargyQuestion: "체중이 증가했거나 무기력해 보입니까?",
    yesSuchSymptoms: "O (네, 그런 증상이 있음)",
    noSuchSymptoms: "X (아니요, 그런 증상이 없음)",

    // Areas
    face: "얼굴",
    back: "등",
    legs: "다리",
    belly: "배",
    other: "기타",
    ears: "귀",
    eyeArea: "눈 주변",
    noseArea: "코 주변",
    mouthArea: "입 주변",
    snoutChin: "주둥이/턱",
    neck: "목",
    shoulders: "어깨",
    upperBack: "등 위쪽",
    lowerBack: "등 아래쪽",
    sides: "옆구리",
    frontLegs: "앞다리",
    hindLegs: "뒷다리",
    paws: "발",
    betweenToes: "발가락 사이",
    kneeJoint: "무릎/관절",
    chest: "가슴",
    upperBelly: "복부 위쪽",
    lowerBelly: "복부 아래쪽",
    groin: "사타구니",
    tail: "꼬리",
    analArea: "항문 주위",
    wholebody: "전신",
    genitalArea: "생식기 주변",

    // Cat breeds
    persian: "페르시안",
    russianBlue: "러시안 블루",
    siamese: "시암 고양이",
    maineCoon: "메인 쿤",
    britishShorthair: "브리티시 숏헤어",
    americanShorthair: "아메리칸 숏헤어",
    bengal: "벵갈",
    abyssinian: "아비시니안",
    scottishFold: "스코티시 폴드",
    ragdoll: "랙돌",
    norwegianForest: "노르웨이 숲",
    turkishAngora: "터키시 앙고라",
    siamCat: "샴 고양이",
    highlandFold: "하이랜드 폴드",
    sphinx: "스핑크스",

    // SkinAI.tsx - Process steps
    infoInput: "정보입력",
    photoUpload: "사진업로드",
    diagnosisResult: "분석결과",
    basicInfo: "기본정보",
    symptomInput: "증상입력",

    // SkinAI.tsx - Loading messages
    aiAnalysisInProgress: "AI 피부 상태 분석 중",
    petSkinAnalysis: "{petName}의 피부 상태 분석 중",
    advancedAiAnalysis: "고도화된 AI 알고리즘이 업로드된 사진을 정밀 분석하여 정확한 피부 진단을 수행하고 있습니다",
    imageAnalysis: "이미지 분석",
    patternRecognition: "패턴 인식",
    // diagnosisComplete: "분석 완료"

    // Token related translations
    logoutSuccess: "로그아웃되었습니다",
    tokenPurchase: "토큰 구매",
    tokenPurchaseDesc: "AI 진단에 필요한 토큰을 구매하세요",
    tokenPackageStarter: "시작하기",
    tokenPackageStarterDesc: "처음 사용해보는 분들을 위한 기본 패키지",
    tokenPackageStarterFeature1: "1회 AI 진단",
    tokenPackageStandard: "표준",
    tokenPackageStandardDesc: "가장 인기 있는 패키지",
    tokenPackageStandardFeature1: "5회 AI 진단",
    tokenPackagePremium: "프리미엄",
    tokenPackagePremiumDesc: "헤비 유저를 위한 대용량",
    tokenPackagePremiumFeature1: "10회 AI 진단",
    tokenPackagePremiumFeature2: "프리미엄 질병 정보",
    orderCreationFailed: "주문 생성 실패",
    tokenRefreshFailed: "토큰 갱신 실패. 다시 로그인 해주세요.",
    tokenRefreshError: "토큰 갱신 중 오류 발생. 다시 로그인 해주세요.",
    paymentRequestError: "결제 요청 중 오류가 발생했습니다.",
    errorDetails: "오류 내용",
    unknownError: "알 수 없는 오류",
    paymentCompleted: "결제 완료! 토큰이 충전되었습니다.",
    paymentProcessingFailed: "결제 완료 처리 실패",
    paymentProcessingError: "결제 완료 처리 중 오류 발생",
    newMemberEvent: "AI 질환 분석을 시작해보세요",
    firstPurchaseBenefit: "첫 구매 시",
    discount20: "20% 할인",
    bonusTokens: "정확하고 빠르며, 데이터 기반으로 신뢰할 수 있는 AI 진단을 제공합니다.",
    popular: "추천",
    tokens: "토큰",
    purchase: "구매하기",
    tokenManagement: "토큰 관리",
    transactionHistory: "거래 내역",
    completed: "완료",
    paypalPayment: "PayPal 결제",
    confirmRefund: "정말로 환불하시겠습니까?",
    refundSuccess: "환불 성공!",
    refundFailed: "환불 실패",
    refundError: "환불 중 오류가 발생했습니다.",
    refunding: "환불 중...",
    refund: "환불",
    noTransactions: "완료된 거래 내역이 없습니다.",

    // Date related translations
    year: "년",
    month: "월",
    previousYear: "이전 년도",
    nextYear: "다음 년도",
    previousMonth: "이전 월",
    nextMonth: "다음 월",
    cancel: "취소",
    confirm: "확인",

    // PurchaseSuccess.tsx
    purchaseSuccess_title: "결제 완료!",
    purchaseSuccess_message: "감사합니다. 결제가 성공적으로 처리되었습니다.",

    // Added disease_name and description from the provided data
    superficialPyodermaName: "표재성 농피증 (Superficial Pyoderma)",
    superficialPyodermaDesc: "구진은 일반적으로 모낭을 중심으로 발생하며 붉은색(erythematous)을 띠고 농포나 상피성 잔고리(epidermal collarette)를 동반할 수 있는 발진입니다. 다모증에 부분적인 탈모를 동반할 수 있으며, 모낭염을 통해 모낭충 감염(cocci)과 동반되기도 합니다. [1, 2]",
    superficialPyodermaA2Desc: "상피성 잔고리가 이 질환의 특징적인 병변(hallmark lesion)이며, 다수의 잔고리가 융합되면 넓은 '지도 모양'의 탈모와 인설 부위를 형성할 수 있습니다. 원형 또는 벗겨지는 테두리를 가진 상피성 잔고리가 특징적이며, 다발성으로 몸통과 복부에 분포합니다. [5, 6]",

    fleaAllergyDermatitisName: "벼룩 알레르기 피부염 (Flea Allergy Dermatitis, FAD)",
    fleaAllergyDermatitisDesc: "구진성 발진을 특징으로 하는 벼룩 타액에 대한 염증 반응입니다. 심한 소양감과 함께 구진이 나타나며, 병변은 주로 몸통 전체에 발생하고 심한 가려움증, 붉어짐, 두드러기, 피부 흉터, 비늘, 탈모, 태선화가 동반될 수 있습니다. [2, 3]",

    sarcopticMangeName: "개선충증 (Sarcoptic Mange, scabies)",
    sarcopticMangeDesc: "심한 소양감과 함께 구진이 주요 특징으로 나타나는 질환입니다. 병변은 주로 팔꿈치, 발목, 귀 가장자리, 복부, 가슴 부위에 집중되며, 탈모, 출혈성 딱지, 홍반이 동반될 수 있습니다. [3, 4]",

    atopicDermatitisName: "아토피 피부염 (Atopic Dermatitis, 식이 알레르기)",
    atopicDermatitisDesc: "구진은 알레르기성 피부염에서 흔히 관찰되는 일차 병변이며 종종 홍반을 동반합니다. 만성적이고 염증성이며 소양감을 유발하는 질환으로, 주로 얼굴(입 주변, 눈 주변), 귓바퀴, 겨드랑이, 서혜부, 발에 병변이 나타납니다. [3]",

    papillomavirusInducedOilyPlaquesName: "유두종 바이러스성 유성 플라크 (Papillomavirus-induced oily plaques)",
    papillomavirusInducedOilyPlaquesDesc: "다수의 민색, 회색 또는 노란색(macule) 플라크와 때로는 구진으로 구성된 병변입니다. 주로 목, 몸통, 복부, 그리고 사지에 위치하며, 과각화(hyperkeratotic)되어 편평하거나 약간 융기되어 있습니다. [2]",

    seborrheaName: "지루성 피부염 (Seborrhea)",
    seborrheaDesc: "비정상적인 각화 과정으로 인해 과도한 인설이 형성되는 것을 특징으로 합니다. 건성 지루(seborrhea sicca)는 건조하고 하얀색 인설과 산패한 기름 냄새를 특징으로 하며, 유성 지루(seborrhea oleosa)는 기름진 피부와 노란-갈색의 인설, 산패한 기름 냄새를 특징으로 합니다. 등, 몸통, 피부 주름에 분포합니다. [5, 6]",

    malasseziaDermatitisName: "말라세지아 피부염 (Malassezia Dermatitis)",
    malasseziaDermatitisDesc: "효모 Malassezia pachydermatis의 과증식으로 인해 발생하며, 홍반, 중등도에서 심한 소양감, 기름지고 노란색을 띠는 인설을 동반합니다. 강한 퀴퀴한 냄새가 특징적이며, 피부 주름, 발가락 사이, 겨드랑이, 목 복측, 귓바퀴, 서혜부에 호발합니다. [6, 7]",

    ichthyosisName: "어린선 (Ichthyosis)",
    ichthyosisDesc: "선천적/유전적 각화 이상 질환입니다. 피부가 크고 단단하게 부착된 판 모양의 인설로 덮여 있으며, 초기에는 흰색일 수 있으나 나이가 들면서 종종 회색이나 검은색으로 착색됩니다. 몸통 전체에 전반적으로 분포합니다. [6, 7]",

    hypothyroidismName: "갑상선 기능 저하증 (Hypothyroidism)",
    hypothyroidismDesc: "건조하고 미세하거나 중등도의 인설인 '비듬'을 특징으로 하며, 전반적, 몸통에 분포합니다. [6]",
    hypothyroidismA3Desc: "피부가 두꺼워지고(점액수종) 색소가 침착될 수 있으며, 전형적으로 소양감이 없는 대칭성 탈모를 동반합니다. 건조하고 부석한 피부를 특징으로 하며, 몸통, 마찰 부위에 주로 나타납니다. [9]",

    allergicDermatitisName: "알레르기성 피부염 (아토피 피부염, 식이 알레르기)",
    allergicDermatitisDesc: "태선화와 과다색소침착의 가장 흔한 원인 중 하나입니다. 가려움으로 인한 지속적인 자가 손상은 알레르기성 피부병의 특징적인 병변으로, 피부가 두껍고, 가죽 같고, 어두워지며 종종 털이 빠집니다. 홍반, 긁은 상처, 재발성 감염이 특징입니다. [8, 9]",

    chronicMalasseziaDermatitisName: "말라세지아 피부염 (Chronic Malassezia Dermatitis)",
    chronicMalasseziaDermatitisDesc: "염증성 알레르기성 피부염과 동시에 발생하여 이를 악화시킵니다. 말라세지아 감염은 염증과 소양감을 강력하게 유발하여 심각한 태선화와 과다색소침착을 초래하며, 종종 기름진 표면과 강한 냄새를 동반합니다. 태선화된 부위에 기름진 삼출물과 특징적인 퀴퀴한 냄새가 동반됩니다. [8, 9]",

    hyperadrenocorticismName: "부신피질 기능 항진증 (Hyperadrenocorticism)",
    hyperadrenocorticismDesc: "피부가 종종 얇고 위축되어 있지만 때로는 과다색소침착을 동반합니다. 몸통, 마찰 부위에 주로 나타나며, 얇고 위축된 피부, 때때로 복부 팽만, 다뇨/다식, 피모 기력저하가 동반됩니다. [10]",

    bacterialPyodermaName: "세균성 농피증 (표재성 모낭염)",
    bacterialPyodermaDesc: "농포는 반려견에서 가장 흔한 원인 중 하나이며, 일반적으로 작고 모낭을 중심으로 형성됩니다. 뾰루지, 겨드랑이, 서혜부에서 흔히 관찰되며, 모낭성 농포와 동일 부위에 구진 및 상피성 잔고리가 함께 존재합니다. [10, 11]",

    demodicosisName: "모낭충증",
    demodicosisDesc: "Demodex canis 모낭충의 과증식이 심각한 염증 반응을 유발하며, 탈모, 홍반, 비늘이 주된 병변입니다. 농포나 면포도 관찰될 수 있으며, 얼굴, 발, 전신에 분포합니다. [11, 12]",

    pemphigusFoliaceusName: "낙엽성 천포창",
    pemphigusFoliaceusDesc: "반려견에서 가장 흔한 자가면역 피부 질환으로, 일차 병변은 농포이지만 농포는 종종 크기가 크고 여러 모낭에 걸쳐 있으며, 반드시 모낭 중심적이지는 않습니다. 얼굴, 귀, 발바닥에 대칭적으로 발생하며 미란과 탈모를 동반합니다. [11, 12]",

    schnauzerComedoneSyndromeName: "슈나우저 면포 증후군",
    schnauzerComedoneSyndromeDesc: "일차적인 각화 이상 질환으로, 등 중앙선과 등에 일차적인 면포가 다수 발생합니다. 이차 세균 감염이 발생하면 구진과 농포가 생길 수 있습니다. [11]",

    deepPyodermaAndFurunculosisName: "심부 농피증 및 절종증 (Deep Pyoderma and Furunculosis)",
    deepPyodermaAndFurunculosisDesc: "세균 감염이 진피 깊숙이 확장되거나 모낭 파열을 유발할 때(절종증) 궤양 형성 및 고름이나 혈액성 삼출물을 배출하는 누관(draining tract) 형성으로 이어집니다. 주로 발가락 사이, 턱, 주둥이, 앞발 부위에 호발합니다. [13, 14]",

    discoidLupusErythematosusName: "반려견 홍반 루푸스 (DLE) (Discoid Lupus Erythematosus)",
    discoidLupusErythematosusDesc: "코에 색소 소실, 홍반, 인설 및 미란을 유발하는 질환이며, 주로 코와 콧등에 발생합니다. [14, 15]",

    pemphigusVulgarisName: "심상성 천포창 (Pemphigus Vulgaris)",
    pemphigusVulgarisDesc: "피부 점막 경계부(입술, 콧구멍, 항문)와 구강 내에 소수포 및 궤양을 유발하는 심각한 자가면역 질환입니다. [14, 15]",

    vasculitisName: "혈관염 (Vasculitis)",
    vasculitisDesc: "혈관의 염증으로 치명적이며 궤양과 괴사로 이어질 수 있습니다. 전형적으로 귓바퀴 끝, 꼬리 끝, 또는 발바닥에 발생하며 '펀치로 뚫은 듯한' 외관을 보입니다. [14, 15]",

    squamousCellCarcinomaName: "편평상피암 (Squamous Cell Carcinoma, SCC)",
    squamousCellCarcinomaDesc: "여러 종양 중 햇볕에 노출된 부위에 가장 흔한 악성 종양이며 궤양화됩니다. 단단하고 성장하는 종양이나 궤양이 나타나며, 귓바퀴, 코, 몸통, 사지에 발생합니다. [14, 15]",

    decubitusUlcersName: "욕창 (Decubitus Ulcers)",
    decubitusUlcersDesc: "대형견이나 누워 지내는 개의 뼈 돌출부(팔꿈치, 발목, 엉덩이) 위에서 만성적인 압력으로 인해 발생하는 질환입니다. 피부에 근육성 괴사가 형성되며, 누워 지내는 병력이 있습니다. [15, 16]",

    fungalKerionName: "진균성 각화증 (Fungal Kerion)",
    fungalKerionDesc: "피부사상균(곰팡이) 감염에 대한 결절성, 물렁물렁함(boggy), 종종 삼출물이 나오는 염증 반응으로, 감염된 모낭이 파열되어 발생합니다. 육아종성 염증이며 비신생물성(감염성)입니다. [16, 17]",

    sterileNodularPanniculitisName: "무균성 결절성 지방층염 (Sterile Nodular Panniculitis, SNP)",
    sterileNodularPanniculitisDesc: "피하 지방의 염증으로, 단일 또는 다수의 깊은 결절로 나타나며, 이 결절은 터져서 기름지고 투명한 액체를 배출할 수 있습니다. 육아종성 염증이며 비신생물성(감염성)입니다. [16]",

    mastCellTumorName: "비만세포종 (Mast Cell Tumor, MCT)",
    mastCellTumorDesc: "반려견에서 가장 흔한 악성 피부 종양입니다. 외부적으로 매우 다양하게 나타나는데, 붉은색/분홍색 결절, 때로는 궤양을 동반하거나, 피부 병변처럼 부드러운 피하 종괴로 나타날 수 있으며, 히스타민 방출로 인해 종종 가려움증이 나타날 수 있습니다. [17, 18]",

    cutaneousHistiocytomaName: "피부 조직구종 (Cutaneous Histiocytoma)",
    cutaneousHistiocytomaDesc: "일반적으로 3세 미만의 어린 개에서 흔한 양성 종양입니다. 전형적으로 단독성으로, 빠르게 성장하는 분홍색-붉은색의 털이 없는 '단추 모양'의 결절로 나타나며, 머리, 귀, 사지에 주로 발생합니다. [17, 18]",

    lipomaName: "지방종 (Lipoma)",
    lipomaDesc: "지방 세포로 구성된 매우 흔한 양성 종양입니다. 부드럽고, 움직이며, 경계가 명확한 피하 종괴로 나타나며, 몸통, 가슴, 복부에 주로 발생합니다. [17, 18]",

    sebaceousGlandAdenomaName: "피지샘종 (Sebaceous Gland Adenoma)",
    sebaceousGlandAdenomaDesc: "표피성 이개에서 흔하게 나타나는 양성 종양입니다. 분홍색이며 기름지고 사마귀 모양 또는 콜리플라워 모양을 가집니다. 머리, 몸통, 사지에 나타납니다. [17, 18]",

    fungalGranulomaNoduleName: "진균종성 농포 (Fungal Granuloma/Nodule)",
    fungalGranulomaNoduleDesc: "단단하고 물렁물렁한 결절이며, 종종 궤양이나 누공을 동반합니다. 얼굴과 발에 나타나며 염증성으로, 비신생물성(감염성)입니다. [17]",
  },

  en: {
    // App.tsx
    appTitle: "Talktail AI",
    appSubtitle: "Pet Skin Analysis Assistant",
    stepQuestionnaire: "Pet Info & Symptoms",
    stepUpload: "Photo Upload",
    stepDiagnosis: "Analysis Result",
    stepHospitals: "Hospital Recommendation",
    stepComplete: "Complete",
    aiAnalyzing: "AI is analyzing {petName}'s skin condition",
    aiAnalyzingGeneric: "AI is analyzing your pet's skin condition",
    analysisDescription: "Preparing accurate analysis by combining questionnaire and photos...",
    diagnosisComplete: "Analysis completed!",
    diagnosisThankYou: "Thank you for checking {petName}'s skin health!",
    visitRecommendation: "Please visit recommended hospitals for accurate treatment if needed.",
    resultSent: "Results have been sent successfully",
    emailCheck: "Please check your email for additional information to help with pet health care.",
    aiSolution: "Experience better pet care with smart AI solutions from GPTOnline.ai",
    newDiagnosis: "Start New Analysis",
    disclaimer: "Talktail AI is for reference only. Please consult a veterinarian for accurate analysis.",

    // Navbar.tsx
    home: "Home",
    aiAnalysis: "AI Analysis",
    diseaseInfo: "Disease Info",
    hospitalSearch: "Find Hospital",
    myRecord: "My Record",
    login: "Login",
    logout: "Logout",
    diagnoseNow: "Analyze Now",
    languageSelect: "Language Selection",

    // LoginPage.tsx
    goBack: "Go Back",
    welcomeBack: "Nice to meet you again!",
    keepHealthySkin: "Let's keep your pet's skin healthy together",
    continueWithGoogle: "Continue with Google",
    continueWithKakao: "Continue with Kakao",
    continueWithNaver: "Continue with Naver",
    continueWithApple: "Continue with Apple",
    termsAgreement: "By logging in, you agree to the Terms of Service and Privacy Policy",
    terms: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    loginTitle: "Login",
    socialLoginDescription: "Sign in easily with your social account",
    welcome: "Welcome!",
    petHealthMessage: "Let's protect your pet's skin health together",
    cumulativeDiagnosis: "Total Analyses",
    accuracy: "Accuracy",
    noTokenAlert: "You don't have any tokens",
    loginRequiredAlert: "Login is required.",
    goHome: "Go Home",

    // MyPage.tsx
    mypage_logout: "Logout",
    mypage_currentTokens: "Current Tokens",
    mypage_code : "Coupon",
    mypage_recharge: "Recharge",
    mypage_logoutSuccess: "Logged out successfully.",
    mypage_profile: "Profile",
    mypage_diagnosisRecords: "Diagnosis Records",
    mypage_tokenManagement: "Token Management",
    mypage_profileInfo: "Profile Information",
    mypage_name: "Name",
    mypage_email: "Email",
    mypage_phone: "Phone Number",
    mypage_itching: "Itching",
    mypage_severe: "Severe",
    mypage_moderate: "Moderate",
    mypage_none: "None",
    mypage_hairLoss: "Hair Loss",
    mypage_smell: "Smell",
    mypage_area: "Area",
    mypage_viewDetails: "View Details",
    mypage_dataNotFound: "Data Not Found",
    mypage_diagnosisInfoNotExist: "The requested diagnosis information does not exist.",
    mypage_backToList: "Back to List",
    mypage_diagnosisDetailView: "Diagnosis Details",
    mypage_receptionDate: "Reception Date",
    mypage_analysisResult: "Analysis Result",
    mypage_skinConditionClassification: "Skin Condition Classification",
    mypage_expectedDiagnosis: "Expected Analysis",
    mypage_aiConfidence: "AI Confidence",

    // DiseaseInfoPage.tsx
    skinDiseaseInfo: "Skin Disease Information",
    skinDiseaseDescription: "Learn about common skin diseases in pets",
    consultVetNote: "Consult a professional veterinarian for accurate analysis",
    mainSymptoms: "Main Symptoms",
    diseaseMainSymptoms: "Disease Main Symptoms",
    description: "Description",
    checkOtherDiseases: "Check Other Diseases",
    riskLevel: "Risk Level",
    common: "Common",
    normal: "Normal",
    rare: "Rare",
    viewDetails: "View Details",
    severity: "Severity",
    prevalence: "Prevalence",
    high: "High",
    medium: "Medium",
    low: "Low",
    // Disease names and descriptions
    papulesPlaquesName: "Papules, Plaques",
    papulesPlaquesDesc: "Diseases that can occur due to allergies and bacterial infections.",
    papulesPlaquesSymptoms: ["Itching", "Redness", "Hair loss", "Scaling and dandruff", "Discharge and scabs"],

    epithelialCollarsName: "Epithelial Collars (Dandruff, Scaling)",
    epithelialCollarsDesc: "A disease mostly caused by fungal infections and can appear as part of diseases related to dandruff and scaling.",
    epithelialCollarsSymptoms: ["Itching", "Scabs", "Dryness", "Ring-shaped red spots"],

    lichenificationName: "Lichenification, Hyperpigmentation",
    lichenificationDesc: "Disease caused by fungal infection",
    lichenificationSymptoms: ["Odor and bad smell", "Hair loss", "Red ears", "Black ear discharge", "Itching"],

    pustulesAcneName: "Pustules, Acne",
    pustulesAcneDesc: "Disease caused by bacterial infection, decreased immunity, and poor personal hygiene.",
    pustulesAcneSymptoms: ["Red inflammation and swelling", "Small boils", "Pus", "Hair loss", "Itching"],

    erosionUlcerName: "Erosion, Ulcer",
    erosionUlcerDesc: "Disease caused by trauma, allergies, and viral infections.",
    erosionUlcerSymptoms: ["Increased eye discharge and tears", "Eye rubbing and irritation", "Corneal cloudiness", "Eye redness"],

    nodulesName: "Nodules, Masses",
    nodulesDesc: "Disease caused by skin and subcutaneous tissue problems, organ tumors, and aging changes.",
    nodulesSymptoms: ["Skin lumps", "Difficulty breathing", "Limping", "Weight loss", "Loss of appetite"],

    // MedicalQuestionnaire.tsx
    step1Title: "Step 1. Pet Information",
    step2Title: "Step 2. Symptoms & Areas",
    step1Description: "Analyze your pet's skin problems with smart AI solutions",
    step2Description: "Please select your pet's main symptoms and affected areas",
    accurateInfo: "Please provide detailed information for accurate analysis",
    petName: "Pet Name",
    required: "*",
    namePlaceholder: "Name",
    birthDate: "Birth Date",
    dateFormat: "MM/DD/YYYY",
    datePlaceholder: "MM/DD/YYYY",
    weight: "Weight (kg)",
    weightPlaceholder: "3.15",
    breed: "Breed",
    breedPlaceholder: "Select breed",
    dogCategory: "🐕 Dogs",
    catCategory: "🐱 Cats",
    otherBreed: "🔍 Other (Custom Input)",
    customBreedPlaceholder: "Enter breed manually",
    customBreedHelper: "e.g., Mixed breed, Cat mix, Special breed name, etc.",
    // mainSymptoms: "Main Symptoms",
    symptomsDescription: "Please select all applicable symptoms",
    selectedSymptoms: "Selected symptoms",
    moreSymptoms: "+{count} more",
    affectedAreas: "Affected Areas",
    categorySelect: "Select Category",
    selectAreaPlaceholder: "Select area",
    subAreaSelect: "Sub-areas (Multiple selection)",
    selectedAreas: "Selected areas ({count})",
    moreAreas: "+{count} more",
    previous: "Previous",
    next: "Next",
    complete: "Complete",

    // Symptoms
    itching: "Itching",
    scaling: "Scaling",
    hairLoss: "Hair Loss",
    redness: "Redness",
    wounds: "Wounds",
    odor: "Odor",
    swelling: "Swelling",
    scabs: "Scabs",
    blackSpots: "Black Spots",
    whiteDandruff: "White Dandruff",

    // New symptom questions
    petItchyQuestion: "Does your pet feel itchy?",
    itchyNone: "None: Not scratching or licking at all",
    itchyModerate: "Moderate: Occasionally scratches or licks",
    itchySevere: "Severe: Constant and excessive scratching or licking, causing distress",

    // Questionnaire specific itching questions
    questionnaire_doesPetItch: "Does your pet itch?",
    questionnaire_itching_none: "None",
    questionnaire_itching_moderate: "Moderate",
    questionnaire_itching_severe: "Severe",
    questionnaire_itching_none_desc: "No itching behavior",
    questionnaire_itching_moderate_desc: "Occasionally scratches or licks",
    questionnaire_itching_severe_desc: "Frequently scratches severely",

    // Questionnaire odor questions
    questionnaire_skinOdor: "Does the skin have an odor?",
    questionnaire_odor_yes: "O",
    questionnaire_odor_no: "X",
    questionnaire_odor_yes_desc: "Greasy and smelly",
    questionnaire_odor_no_desc: "No odor",

    // Questionnaire hair loss questions
    questionnaire_hairLoss: "Is there excessive hair loss?",
    questionnaire_hairLoss_yes: "O",
    questionnaire_hairLoss_no: "X",
    questionnaire_hairLoss_yes_desc: "Hair loss observed",
    questionnaire_hairLoss_no_desc: "Normal shedding",

    // Selected symptoms
    questionnaire_selectedSymptoms: "Selected symptoms",

    // PhotoUpload page
    upload_title: "Skin Condition Photo Upload",
    upload_description: "Please upload a clear photo of the affected skin area",
    upload_tip: "Shooting in natural light at close range enables more accurate analysis",
    upload_dragOrClick: "Drag and drop photo or click to upload",
    upload_fileFormat: "Only JPG, PNG files supported (max 10MB)",
    upload_selectFile: "Select File",
    upload_completed: "Upload Complete",
    upload_cropReady: "Ready for crop and analysis",
    upload_cropCompleted: "Crop Complete",
    upload_optimized: "Optimized to 224x224 size",
    upload_cropNeeded: "Image Crop Required",
    upload_cropDescription: "Please crop the lesion area to 224x224 size for accurate analysis",
    upload_cropButton: "Crop",
    upload_diagnosisReady: "Ready for analysis!",
    upload_imageOptimized: "Image has been optimized to 224x224 size. Start AI analysis.",
    upload_startDiagnosis: "Start analysis",
    upload_photographyGuide: "Photography Guide",
    upload_guideBrightLight: "Please shoot in bright natural light",
    upload_guideClearCapture: "Capture the lesion area clearly",
    upload_guideCloseShot: "Take close-up shots without shaking",
    upload_cropModal_title: "Image Crop",
    upload_cropModal_description: "Please select the lesion area as a square region.",
    upload_cropModal_imageAlt: "Image to crop",
    upload_cropModal_cancel: "Cancel",
    upload_cropModal_complete: "Crop Complete",
    upload_backToPrevious: "Previous Step",
    upload_errorImageOnly: "Only image files can be uploaded.",
    upload_errorFileSize: "File size exceeds 10MB. Please select a smaller file.",

    // DiagnosisResult page
    diagnosis_analysisResult: "Analysis Result",
    diagnosis_skinConditionClassification: "Skin Condition Classification",
    diagnosis_uploadedSkinPhoto: "Uploaded Skin Photo",
    diagnosis_expectedDiagnosis: "Expected Analysis",
    diagnosis_severityLow: "Mild",
    diagnosis_severityMedium: "Moderate",
    diagnosis_severityHigh: "Severe",
    diagnosis_aiConfidence: "AI Confidence",
    diagnosis_nearbyRecommendedHospitals: "Nearby Recommended Hospitals",
    diagnosis_listView: "List View",
    diagnosis_mapView: "Map View",
    diagnosis_locationChecking: "Checking Location",
    diagnosis_gpsLocationChecking: "Checking current location via GPS...",
    diagnosis_hospitalSearching: "Searching Hospitals",
    diagnosis_searchingNearbyHospitals: "Searching for nearby animal hospitals...",
    diagnosis_locationPermissionRequired: "Location Permission Required",
    diagnosis_locationPermissionMessage: "Location permission is required to find nearby hospitals.\nPlease allow location access in your browser.",
    diagnosis_noHospitalsFound: "No Hospitals Found",
    diagnosis_noHospitalsFoundMessage: "No animal hospitals found nearby.\nTry searching in a different area.",
    diagnosis_operatingNow: "Open Now",
    diagnosis_callHospital: "Call",
    diagnosis_getDirections: "Directions",
    diagnosis_mapLoading: "Loading Map",
    diagnosis_loadingMapMessage: "Loading map...",
    diagnosis_activatingGpsMessage: "Activating GPS location service...",
    diagnosis_myLocation: "My Location",
    diagnosis_shareResults: "Share Results",
    diagnosis_saveAsImage: "Save Analysis Result as Image",
    diagnosis_saveImageFile: "Save as Image File",
    diagnosis_saveImageDescription: "Save analysis results as high-quality images for storage",
    diagnosis_emailSubscription: "Subscribe via Email",
    diagnosis_emailPlaceholder: "Enter your email address",
    diagnosis_subscribe: "Subscribe",
    diagnosis_emailDescription: "Receive detailed diagnostic reports and care guides via email",
    diagnosis_importantNotice: "Important Notice",
    diagnosis_disclaimerMessage: "This result is an AI prediction. For accurate analysis, please consult with a veterinarian.",
    diagnosis_newAnalysis: "Start New AI Analysis",
    diagnosis_urgencyEmergency: "Immediate emergency room visit required",
    diagnosis_urgencyUrgent: "Recommend visiting a hospital soon",
    diagnosis_urgencyNormal: "Regular care needed",
    diagnosis_hospitalContactCall: "Would you like to call {hospitalName}?\n\nPhone: {phone}\nOperating hours: {openHours}\nEstimated wait time: {waitTime}",
    diagnosis_hospitalContactNavigate: "Starting directions to {hospitalName}.\n\nAddress: {address}\nDistance: {distance}\nEstimated travel time: {walkTime} minutes walk",
    diagnosis_emailSentSuccess: "Aiagnosis results sent to {email}",
    diagnosis_emailSentError: "Error occurred while sending email. Please try again.",
    diagnosis_saveImageError: "Unable to find area to save. Please refresh the page and try again.",
    diagnosis_inAppBrowserWarning: "Image saving may be limited in in-app browsers.\n\nWe recommend opening in regular browsers like Chrome or Safari.\n\nWould you still like to try?",
    diagnosis_imageSavedSuccess: "Analysis result saved to selected location!",
    diagnosis_imageOpenedInNewTab: "Image opened in new tab!\n\n💡 Long press the image and select \"Save Image\" or try again in Chrome/Safari browser.",
    diagnosis_imageDownloadedSuccess: "Analysis result saved to Downloads folder!\n\n💡 To choose save location, enable \"Ask where to save each file before downloading\" in Chrome settings > Downloads.",
    diagnosis_imageSaveGeneralError: "Error occurred while saving image.\n\n💡 Please try again in regular browsers like Chrome or Safari.",

    // VetFinderPage
    vetFinder_pageTitle: "Find Hospitals",
    vetFinder_pageDescription: "Find professional veterinary hospitals nearby",
    vetFinder_searchPlaceholder: "Search by hospital name or location",
    vetFinder_filtersTitle: "Filters",
    vetFinder_filterOpen: "Open Now",
    vetFinder_statusOpen: "Open",
    vetFinder_statusClosed: "Closed",
    vetFinder_reserveButton: "Book Appointment",
    vetFinder_loading: "Loading...",
    vetFinder_error: "Error occurred",
    vetFinder_loadSuccess: "Load successful",

    // Home page
    home_aiScreeningService: "AI Skin Disease Monitoring Service",
    home_mainTitle: "Analyze your pet's skin health with AI",
    home_mainDescription: "Upload your pet's skin photos and start the AI analysis immediately",
    home_tryNowButton: "Try It Now",
    home_aiAnalyzing: "AI Analyzing...",
    home_aiAnalysisResult: "AI Analysis Result",
    home_stepsTitle: "Complete in 3 Simple Steps",
    home_stepsComplete: "Complete",
    home_stepsSubtitle: "Check your pet's skin health easily and quickly without complex procedures",
    home_step1Title: "Upload Photo",
    home_step1Description: "Take a photo of the problematic skin area and upload it.",
    home_step2Title: "AI Analysis",
    home_step2Description: "Advanced AI analyzes skin condition and analyzes possible diseases.",
    home_step3Title: "Hospital Connection",
    home_step3Description: "Based on analysis results, we recommend nearby specialized hospitals and help with appointments.",
    home_analysisTime: "💡 Average analysis time: within 30 seconds",
    home_whyChooseTitle: "Why should you choose Talktail Care?",
    home_whyChooseSubtitle: "Professional and reliable pet skin analysis service",
    home_feature1Title: "85% High Accuracy",
    home_feature1Description: "AI algorithm trained on tens of thousands of data points",
    home_feature2Title: "Connect to Nearby Animal Hospitals",
    home_feature2Description: "Instant connection with 500+ partner hospitals",
    home_feature3Title: "Easy to Use",
    home_feature3Description: "Results within 30 seconds with just photo upload",
    home_testimonialsTitle: "User Reviews",
    home_testimonialsSubtitle: "Many pet owners have already experienced it",
    home_testimonial1Name: "Minji Kim",
    home_testimonial1Pet: "Golden Retriever Mungmung",
    home_testimonial1Content: "It was really helpful to quickly detect our Mungmung's skin problems. The AI analysis was really accurate!",
    home_testimonial2Name: "Seongho Park",
    home_testimonial2Pet: "Persian Nabi",
    home_testimonial2Content: "It's great that I can use it 24 hours a day, and it was convenient that it even recommended nearby hospitals.",
    home_testimonial3Name: "Yujin Lee",
    home_testimonial3Pet: "Maltese Gureum",
    home_testimonial3Content: "It was amazing that results came out immediately after taking a photo. The veterinarian also said it was an accurate analysis.",
    home_petOwner: "Pet Owner",
    home_ctaTitle: "Start Right Now",
    home_ctaSubtitle: "Take the first step for your pet's healthy skin",
    home_freeTrialButton: "Free Trial",
    home_footerTitle: "Talktail Care",
    home_footerSubtitle: "Reliable partner for pet skin health",
    home_footerDescription: "A smart solution that protects your pet's skin health with AI technology. Get better treatment by connecting to nearby animal hospitals.",
    home_footerAccuracy: "85% Accuracy",
    home_footerHospitals: "500+ Partner Hospitals",
    home_footerServices: "Services",
    home_footerAiAnalysis: "AI Analysis",
    home_footerDiseaseInfo: "Disease Information",
    home_footerHospitalFinder: "Find Hospitals",
    home_footerCustomerSupport: "Customer Support",
    home_footerFaq: "Frequently Asked Questions",
    home_footerUserGuide: "User Guide",
    home_footerCustomerCenter: "Customer Center",
    home_footerPrivacyPolicy: "Privacy Policy",
    home_footerCopyright: "© 2024 Talktail Care. All rights reserved.",

    // Dog breed selector
    selectBreed: "Select breed",

    skinOdorQuestion: "Does the skin have an odor?",
    yesGreasySmell: "O (Yes, greasy or musty smell)",
    noOdor: "X (No odor)",
    excessiveSheddingQuestion: "Is your pet shedding excessively?",
    yesHairLoss: "O (Yes, hair loss is observed)",
    noExcessiveShedding: "X (No excessive shedding)",
    weightGainLethargyQuestion: "Has your pet gained weight or seemed lethargic?",
    yesSuchSymptoms: "O (Yes, such symptoms are present)",
    noSuchSymptoms: "X (No, such symptoms are not present)",

    // Areas
    face: "Face",
    back: "Back",
    legs: "Legs",
    belly: "Belly",
    other: "Other",
    ears: "Ears",
    eyeArea: "Eye Area",
    noseArea: "Nose Area",
    mouthArea: "Mouth Area",
    snoutChin: "Snout/Chin",
    neck: "Neck",
    shoulders: "Shoulders",
    upperBack: "Upper Back",
    lowerBack: "Lower Back",
    sides: "Sides",
    frontLegs: "Front Legs",
    hindLegs: "Hind Legs",
    paws: "Paws",
    betweenToes: "Between Toes",
    kneeJoint: "Knee/Joint",
    chest: "Chest",
    upperBelly: "Upper Belly",
    lowerBelly: "Lower Belly",
    groin: "Groin",
    tail: "Tail",
    analArea: "Anal Area",
    wholebody: "Whole Body",
    genitalArea: "Genital Area",

    // Dog breeds
    goldenRetriever: "Golden Retriever",
    labradorRetriever: "Labrador Retriever",
    germanShepherd: "German Shepherd",
    beagle: "Beagle",
    bulldog: "Bulldog",
    poodle: "Poodle",
    shibaInu: "Shiba Inu",
    jindo: "Jindo",
    maltese: "Maltese",
    pomeranian: "Pomeranian",
    chihuahua: "Chihuahua",
    cockerSpaniel: "Cocker Spaniel",
    shihTzu: "Shih Tzu",
    bichonFrise: "Bichon Frise",
    yorkshireTerrier: "Yorkshire Terrier",
    dachshund: "Dachshund",
    husky: "Husky",
    rottweiler: "Rottweiler",
    doberman: "Doberman",
    saintBernard: "Saint Bernard",
    borderCollie: "Border Collie",
    welshCorgi: "Welsh Corgi",
    papillon: "Papillon",
    spitz: "Spitz",

    // Cat breeds
    persian: "Persian",
    russianBlue: "Russian Blue",
    siamese: "Siamese",
    maineCoon: "Maine Coon",
    britishShorthair: "British Shorthair",
    americanShorthair: "American Shorthair",
    bengal: "Bengal",
    abyssinian: "Abyssinian",
    scottishFold: "Scottish Fold",
    ragdoll: "Ragdoll",
    norwegianForest: "Norwegian Forest",
    turkishAngora: "Turkish Angora",
    siamCat: "Siam Cat",
    highlandFold: "Highland Fold",
    sphinx: "Sphinx",

    // SkinAI.tsx - Process steps
    infoInput: "Info Input",
    photoUpload: "Photo Upload",
    diagnosisResult: "Analysis Result",
    basicInfo: "Basic Info",
    symptomInput: "Symptom Input",

    // SkinAI.tsx - Loading messages
    aiAnalysisInProgress: "AI Skin Analysis in Progress",
    petSkinAnalysis: "Analyzing {petName}'s Skin Condition",
    advancedAiAnalysis: "Advanced AI algorithms are performing precise analysis of the uploaded image to provide accurate skin analysis",
    imageAnalysis: "Image Analysis",
    patternRecognition: "Pattern Recognition",
    // diagnosisComplete: "Diagnosis Complete"

    // Token related translations
    logoutSuccess: "You have been logged out",
    tokenPurchase: "Token Purchase",
    tokenPurchaseDesc: "Purchase tokens needed for AI analysis",
    tokenPackageStarter: "Starter",
    tokenPackageStarterDesc: "Basic package for first-time users",
    tokenPackageStarterFeature1: "3 AI Analyses",
    tokenPackageStandard: "Standard",
    tokenPackageStandardDesc: "Most Recommend this package",
    tokenPackageStandardFeature1: "5 AI Analyses",
    tokenPackagePremium: "Premium",
    tokenPackagePremiumDesc: "Large capacity for heavy users",
    tokenPackagePremiumFeature1: "10 AI Analyses",
    tokenPackagePremiumFeature2: "Premium Disease Information",
    orderCreationFailed: "Order creation failed",
    tokenRefreshFailed: "Token refresh failed. Please log in again.",
    tokenRefreshError: "Error occurred during token refresh. Please log in again.",
    paymentRequestError: "An error occurred during payment request.",
    errorDetails: "Error details",
    unknownError: "Unknown error",
    paymentCompleted: "Payment completed! Tokens have been charged.",
    paymentProcessingFailed: "Payment processing failed",
    paymentProcessingError: "Error occurred during payment processing",
    newMemberEvent: "Start your AI disease analysis",
    firstPurchaseBenefit: "First purchase",
    discount20: "Start your journey with us",
    bonusTokens: "Accurate, fast, and data-driven diagnosis powered by AI.",
    popular: "Recommend this",
    tokens: "tokens",
    purchase: "Purchase",
    tokenManagement: "Token Management",
    transactionHistory: "Transaction History",
    completed: "Completed",
    paypalPayment: "PayPal Payment",
    confirmRefund: "Are you sure you want to refund?",
    refundSuccess: "Refund successful!",
    refundFailed: "Refund failed",
    refundError: "An error occurred during refund.",
    refunding: "Refunding...",
    refund: "Refund",
    noTransactions: "No completed transactions found.",

    // Date related translations
    year: "",
    month: "",
    previousYear: "Previous Year",
    nextYear: "Next Year",
    previousMonth: "Previous Month",
    nextMonth: "Next Month",
    cancel: "Cancel",
    confirm: "Confirm",

    // PurchaseSuccess.tsx
    purchaseSuccess_title: "Payment Complete!",
    purchaseSuccess_message: "Thank you. Your payment has been processed successfully.",

    // Added disease_name and description from the provided data
    superficialPyodermaName: "Superficial Pyoderma",
    superficialPyodermaDesc: "Papules typically occur around hair follicles and are erythematous, with possible pustules or epidermal collarettes. May be associated with partial alopecia in areas of increased hair density and folliculitis with cocci infection. [1, 2]",
    superficialPyodermaA2Desc: "Epidermal collarettes are the hallmark lesion of this condition. When multiple collarettes coalesce, they can form extensive 'geographic' areas of alopecia and scaling. Characteristic circular or peeling-edged epidermal collarettes are typical, distributed multiply on the trunk and abdomen. [5, 6]",

    fleaAllergyDermatitisName: "Flea Allergy Dermatitis (FAD)",
    fleaAllergyDermatitisDesc: "An inflammatory reaction to flea saliva characterized by papular eruptions. Papules appear with severe pruritus, lesions mainly occur throughout the trunk with severe itching, erythema, urticaria, skin scars, scales, alopecia, and lichenification. [2, 3]",

    sarcopticMangeName: "Sarcoptic Mange (Scabies)",
    sarcopticMangeDesc: "A disease characterized by papules with severe pruritus as the main feature. Lesions are mainly concentrated on the elbows, ankles, ear margins, abdomen, and chest areas, and may be accompanied by alopecia, hemorrhagic crusts, and erythema. [3, 4]",

    atopicDermatitisName: "Atopic Dermatitis (Food Allergy)",
    atopicDermatitisDesc: "Papules are primary lesions commonly observed in allergic dermatitis and often accompanied by erythema. A chronic, inflammatory, and pruritic condition with lesions mainly appearing on the face (around mouth and eyes), ear pinnae, axillae, inguinal area, and feet. [3]",

    papillomavirusInducedOilyPlaquesName: "Papillomavirus-induced oily plaques",
    papillomavirusInducedOilyPlaquesDesc: "Lesions composed of multiple flesh-colored, gray, or yellow (macule) plaques and sometimes papules. Located mainly on the neck, trunk, abdomen, and limbs, they are hyperkeratotic and appear flat or slightly raised. [2]",

    seborrheaName: "Seborrhea",
    seborrheaDesc: "Characterized by excessive scale formation due to abnormal keratinization processes. Seborrhea sicca is characterized by dry, white scales and a rancid oily odor, while seborrhea oleosa is characterized by oily skin and yellow-brown scales with a rancid oily odor. Distributed on the back, trunk, and skin folds. [5, 6]",

    malasseziaDermatitisName: "Malassezia Dermatitis",
    malasseziaDermatitisDesc: "Caused by overgrowth of the yeast Malassezia pachydermatis, accompanied by erythema, moderate to severe pruritus, and greasy yellowish scales. Characterized by a strong musty odor, commonly affecting skin folds, between toes, axillae, ventral neck, ear pinnae, and inguinal areas. [6, 7]",

    ichthyosisName: "Ichthyosis",
    ichthyosisDesc: "A congenital/hereditary keratinization disorder. The skin is covered with large, firmly adherent, plate-like scales that may be white initially but often become gray or black with age. Distributed generally throughout the entire trunk. [6, 7]",

    hypothyroidismName: "Hypothyroidism",
    hypothyroidismDesc: "Characterized by dry, fine to moderate scales ('dandruff'), distributed generally throughout the trunk. [6]",
    hypothyroidismA3Desc: "Skin may become thickened (myxedema) and pigmented, typically accompanied by symmetrical alopecia without pruritus. Characterized by dry, brittle skin, mainly appearing on the trunk and friction areas. [9]",

    allergicDermatitisName: "Allergic Dermatitis (Atopic Dermatitis, Food Allergy)",
    allergicDermatitisDesc: "One of the most common causes of lichenification and hyperpigmentation. Continuous self-trauma from itching is a characteristic lesion of allergic dermatoses, with skin becoming thick, leather-like, dark, and often hairless. Characterized by erythema, scratch marks, and recurrent infections. [8, 9]",

    chronicMalasseziaDermatitisName: "Chronic Malassezia Dermatitis",
    chronicMalasseziaDermatitisDesc: "Occurs concurrently with inflammatory allergic dermatitis and worsens it. Malassezia infection strongly induces inflammation and pruritus, resulting in severe lichenification and hyperpigmentation, often accompanied by oily surfaces and strong odors. Lichenified areas are accompanied by oily exudate and characteristic musty odor. [8, 9]",

    hyperadrenocorticismName: "Hyperadrenocorticism",
    hyperadrenocorticismDesc: "Skin is often thin and atrophic but sometimes accompanied by hyperpigmentation. Mainly appears on the trunk and friction areas, with thin atrophic skin, sometimes accompanied by abdominal distension, polyuria/polydipsia, and lethargy. [10]",

    bacterialPyodermaName: "Bacterial Pyoderma (Superficial Folliculitis)",
    bacterialPyodermaDesc: "Pustules are one of the most common causes in dogs and are typically small and form around hair follicles. Commonly observed in acne, axillae, and inguinal areas, with follicular pustules coexisting with papules and epidermal collarettes in the same area. [10, 11]",

    demodicosisName: "Demodicosis",
    demodicosisDesc: "Overgrowth of Demodex canis mites causes severe inflammatory reactions, with alopecia, erythema, and scales as the main lesions. Pustules or comedones may also be observed, distributed on the face, feet, and throughout the body. [11, 12]",

    pemphigusFoliaceusName: "Pemphigus Foliaceus",
    pemphigusFoliaceusDesc: "The most common autoimmune skin disease in dogs, with primary lesions being pustules, but the pustules are often large and span multiple follicles and are not necessarily follicle-centric. Occurs symmetrically on the face, ears, and paw pads, accompanied by erosions and alopecia. [11, 12]",

    schnauzerComedoneSyndromeName: "Schnauzer Comedone Syndrome",
    schnauzerComedoneSyndromeDesc: "A primary keratinization disorder with multiple primary comedones occurring along the dorsal midline and back. Secondary bacterial infection can lead to papules and pustules. [11]",

    deepPyodermaAndFurunculosisName: "Deep Pyoderma and Furunculosis",
    deepPyodermaAndFurunculosisDesc: "When bacterial infection extends deep into the dermis or causes follicular rupture (furunculosis), it leads to ulcer formation and the development of draining tracts that discharge pus or hemorrhagic exudate. Commonly occurs between toes, chin, muzzle, and front leg areas. [13, 14]",

    discoidLupusErythematosusName: "Discoid Lupus Erythematosus (DLE)",
    discoidLupusErythematosusDesc: "A disease that causes depigmentation, erythema, scaling, and erosion of the nose, primarily occurring on the nose and nasal bridge. [14, 15]",

    pemphigusVulgarisName: "Pemphigus Vulgaris",
    pemphigusVulgarisDesc: "A severe autoimmune disease that causes vesicles and ulcers at mucocutaneous junctions (lips, nostrils, anus) and within the oral cavity. [14, 15]",

    vasculitisName: "Vasculitis",
    vasculitisDesc: "Inflammation of blood vessels that can be fatal and lead to ulceration and necrosis. Typically occurs at ear tips, tail tips, or paw pads with a 'punched-out' appearance. [14, 15]",

    squamousCellCarcinomaName: "Squamous Cell Carcinoma (SCC)",
    squamousCellCarcinomaDesc: "Among various tumors, it is the most common malignant tumor in sun-exposed areas and ulcerates. Firm, growing tumors or ulcers appear on ear pinnae, nose, trunk, and limbs. [14, 15]",

    decubitusUlcersName: "Decubitus Ulcers",
    decubitusUlcersDesc: "A condition occurring due to chronic pressure over bony prominences (elbows, ankles, hips) in large dogs or recumbent dogs. Muscular necrosis forms in the skin, with a history of recumbency. [15, 16]",

    fungalKerionName: "Fungal Kerion",
    fungalKerionDesc: "A nodular, boggy, often exudative inflammatory reaction to dermatophyte (fungal) infection, caused by rupture of infected hair follicles. It is a granulomatous inflammation and non-neoplastic (infectious). [16, 17]",

    sterileNodularPanniculitisName: "Sterile Nodular Panniculitis (SNP)",
    sterileNodularPanniculitisDesc: "Inflammation of subcutaneous fat presenting as single or multiple deep nodules that may rupture and discharge oily, clear fluid. It is a granulomatous inflammation and non-neoplastic (infectious). [16]",

    mastCellTumorName: "Mast Cell Tumor (MCT)",
    mastCellTumorDesc: "The most common malignant skin tumor in dogs. Externally highly variable in appearance, appearing as red/pink nodules, sometimes with ulceration, or as soft subcutaneous masses resembling skin lesions, often with pruritus due to histamine release. [17, 18]",

    cutaneousHistiocytomaName: "Cutaneous Histiocytoma",
    cutaneousHistiocytomaDesc: "A common benign tumor in young dogs, typically under 3 years of age. Characteristically solitary, rapidly growing pink-red hairless 'button-like' nodules, primarily occurring on the head, ears, and limbs. [17, 18]",

    lipomaName: "Lipoma",
    lipomaDesc: "A very common benign tumor composed of fat cells. Presents as soft, movable, well-demarcated subcutaneous masses, primarily occurring on the trunk, chest, and abdomen. [17, 18]",

    sebaceousGlandAdenomaName: "Sebaceous Gland Adenoma",
    sebaceousGlandAdenomaDesc: "A benign tumor commonly found in epidermal appendages. Pink, oily, and warty or cauliflower-shaped. Appears on the head, trunk, and limbs. [17, 18]",

    fungalGranulomaNoduleName: "Fungal Granuloma/Nodule",
    fungalGranulomaNoduleDesc: "Firm and boggy nodules, often accompanied by ulceration or fistulas. Appears on the face and feet, is inflammatory, and non-neoplastic (infectious). [17]",
  },

  ja: {
    // App.tsx
    appTitle: "Talktail AI",
    appSubtitle: "ペット皮膚診断アシスタント",
    stepQuestionnaire: "ペット情報・症状入力",
    stepUpload: "写真アップロード",
    stepDiagnosis: "診断結果",
    stepHospitals: "病院推薦",
    stepComplete: "完了",
    aiAnalyzing: "AIが{petName}の皮膚状態を分析しています",
    aiAnalyzingGeneric: "AIがペットの皮膚状態を分析しています",
    analysisDescription: "問診表と写真を総合して正確な診断を準備中です...",
    diagnosisComplete: "診断が完了しました！",
    diagnosisThankYou: "🐾 {petName}の皮膚健康をチェックしていただき、ありがとうございます！",
    visitRecommendation: "必要に応じて推薦された病院で正確な診療を受けてください。",
    resultSent: "📬 結果が正常に送信されました",
    emailCheck: "メールを確認し、ペットの健康管理に役立つ追加情報もご覧ください。",
    aiSolution: "✨ GPTOnline.aiが提供するスマートAIソリューションで、より良いペットケアを体験してください",
    newDiagnosis: "新しい診断を開始",
    disclaimer: "Talktail AIは参考用です。正確な診断は獣医師にご相談ください。",

    // Navbar.tsx
    home: "ホーム",
    aiAnalysis: "AI分析",
    diseaseInfo: "疾病情報",
    hospitalSearch: "病院検索",
    myRecord: "記録",
    login: "ログイン",
    logout: "ログアウト",
    diagnoseNow: "今すぐ診断",
    languageSelect: "言語選択",

    // LoginPage.tsx
    goBack: "戻る",
    welcomeBack: "また会えて嬉しいです！",
    keepHealthySkin: "ペットの健康な皮膚を一緒に守りましょう",
    continueWithGoogle: "Googleで続ける",
    continueWithKakao: "Kakaoで続ける",
    continueWithNaver: "Naverで続ける",
    continueWithApple: "Appleで続ける",
    termsAgreement: "ログインすることで利用規約およびプライバシーポリシーに同意します",
    terms: "利用規約",
    privacyPolicy: "プライバシーポリシー",
    loginTitle: "ログイン",
    socialLoginDescription: "ソーシャルアカウントで簡単ログイン",
    welcome: "ようこそ！",
    petHealthMessage: "ペットの皮膚の健康を一緒に守っていきましょう",
    cumulativeDiagnosis: "累積診断",
    accuracy: "精度",
    goHome: "ホームに戻る",
    noTokenAlert: "トークンがありません",
    loginRequiredAlert: "ログインが必要です。",

    // MyPage.tsx
    mypage_logout: "ログアウト",
    mypage_currentTokens: "保有トークン",
    mypage_code : "クーポン",
    mypage_recharge: "チャージ",
    mypage_logoutSuccess: "로그アウト했습니다。",
    mypage_profile: "プロフィール",
    mypage_diagnosisRecords: "診断記録",
    mypage_tokenManagement: "トークン管理",
    mypage_profileInfo: "プロフィール情報",
    mypage_name: "名前",
    mypage_email: "メール",
    mypage_phone: "電話番号",
    mypage_itching: "かゆみ",
    mypage_severe: "重度",
    mypage_moderate: "中程度",
    mypage_none: "なし",
    mypage_hairLoss: "脱毛",
    mypage_smell: "におい",
    mypage_area: "部位",
    mypage_viewDetails: "詳細を見る",
    mypage_dataNotFound: "データが見つかりません",
    mypage_diagnosisInfoNotExist: "リクエストされた診断情報が存在しません。",
    mypage_backToList: "リストに戻る",
    mypage_diagnosisDetailView: "診断詳細",
    mypage_receptionDate: "受付日",
    mypage_analysisResult: "分析結果",
    mypage_skinConditionClassification: "皮膚状態分類",
    mypage_expectedDiagnosis: "予測分析",
    mypage_aiConfidence: "AI信頼度",

    // DiseaseInfoPage.tsx
    skinDiseaseInfo: "皮膚疾患情報",
    skinDiseaseDescription: "ペットによくある皮膚疾患について学びましょう",
    consultVetNote: "正確な診断は専門獣医師にご相談ください",
    mainSymptoms: "主な症状",
    diseaseMainSymptoms: "疾患主要症状",
    description: "説明",
    checkOtherDiseases: "他の疾患を確認",
    riskLevel: "危険度",
    common: "一般的",
    normal: "普通",
    rare: "まれ",
    viewDetails: "詳細を見る",
    severity: "重症度",
    prevalence: "発生頻度",
    high: "高い",
    medium: "中程度",
    low: "低い",


    // Disease names and descriptions
    papulesPlaquesName: "丘疹、プラーク",
    papulesPlaquesDesc: "アレルギーや細菌感染により発生する可能性のある疾患です。",
    papulesPlaquesSymptoms: ["かゆみ", "赤み", "脱毛", "角質・フケ", "分泌物・かさぶた"],

    epithelialCollarsName: "上皮環状物（フケ、角質）",
    epithelialCollarsDesc: "真菌感染によってほとんど発生する疾患で、フケや角質などに関連する疾患の一部として現れることがあります。",
    epithelialCollarsSymptoms: ["かゆみ", "かさぶた", "乾燥", "輪状の赤い斑点"],

    lichenificationName: "苔癬化、色素沈着過多",
    lichenificationDesc: "真菌感染により発生した疾患",
    lichenificationSymptoms: ["匂い・悪臭", "脱毛", "耳の赤み", "黒い耳垢", "かゆみ"],

    pustulesAcneName: "膿疱、ニキビ",
    pustulesAcneDesc: "細菌感染、免疫力低下、個人衛生の不備により発生する疾患です。",
    pustulesAcneSymptoms: ["赤い炎症と腫れ", "小さなおでき", "膿", "脱毛", "かゆみ"],

    erosionUlcerName: "びらん、潰瘍",
    erosionUlcerDesc: "外傷、アレルギー、ウイルス感染により発生する疾患です。",
    erosionUlcerSymptoms: ["目やに・涙の増加", "目をこする・刺激", "角膜の濁り", "目の充血"],

    nodulesName: "結節、腫瘤",
    nodulesDesc: "皮膚・皮下組織の問題、臓器腫瘍、老化による変化により発生する疾患です。",
    nodulesSymptoms: ["皮膚のしこり", "呼吸困難", "跛行", "体重減少", "食欲不振"],

    // MedicalQuestionnaire.tsx
    step1Title: "ステップ1. ペット情報",
    step2Title: "ステップ2. 症状・部位入力",
    step1Description: "スマートAIソリューションでペットの皮膚問題を分析します",
    step2Description: "ペットの主な症状と影響を受けた部位を選択してください",
    accurateInfo: "正確な分析のために詳しくご記入ください",
    petName: "ペット名",
    required: "*",
    namePlaceholder: "名前",
    birthDate: "生年月日",
    dateFormat: "YYYY/MM/DD",
    datePlaceholder: "年/月/日",
    weight: "体重 (kg)",
    weightPlaceholder: "3.15",
    breed: "品種",
    breedPlaceholder: "品種を選択してください",
    dogCategory: "🐕 犬",
    catCategory: "🐱 猫",
    otherBreed: "🔍 その他（直接入力）",
    customBreedPlaceholder: "品種を直接入力してください",
    customBreedHelper: "例：ミックス犬、猫ミックス、特別な品種名など",
    // mainSymptoms: "主な症状",
    symptomsDescription: "該当する症状をすべて選択してください",
    selectedSymptoms: "選択された症状",
    moreSymptoms: "+{count}個以上",
    affectedAreas: "影響を受けた部位",
    categorySelect: "大分類選択",
    selectAreaPlaceholder: "部位を選択してください",
    subAreaSelect: "小分類部位（複数選択可能）",
    selectedAreas: "選択された部位 ({count}個)",
    moreAreas: "+{count}個以上",
    previous: "前へ",
    next: "次へ",
    complete: "完了",

    // Symptoms
    itching: "かゆみ",
    scaling: "角質",
    hairLoss: "脱毛",
    redness: "赤み",
    wounds: "傷",
    odor: "匂い",
    swelling: "腫れ",
    scabs: "かさぶた",
    blackSpots: "黒い斑点",
    whiteDandruff: "白いフケ",

    // New symptom questions
    petItchyQuestion: "ペットはかゆがっていますか？",
    itchyNone: "なし：全く掻いたり舐めたりしない",
    itchyModerate: "中程度：時々掻いたり舐めたりする",
    itchySevere: "重度：継続的で過度な掻きや舐めでストレスを受けている",

    // Questionnaire specific itching questions
    questionnaire_doesPetItch: "ペットはかゆがっていますか？",
    questionnaire_itching_none: "なし",
    questionnaire_itching_moderate: "中程度",
    questionnaire_itching_severe: "重度",
    questionnaire_itching_none_desc: "かゆがっていません",
    questionnaire_itching_moderate_desc: "時々掻いたり舐めたりします",
    questionnaire_itching_severe_desc: "頻繁に激しく掻きます",

    // Questionnaire odor questions
    questionnaire_skinOdor: "皮膚に匂いがありますか？",
    questionnaire_odor_yes: "O",
    questionnaire_odor_no: "X",
    questionnaire_odor_yes_desc: "脂っぽく匂いがする",
    questionnaire_odor_no_desc: "匂いなし",

    // Questionnaire hair loss questions
    questionnaire_hairLoss: "毛が過度に抜けていますか？",
    questionnaire_hairLoss_yes: "O",
    questionnaire_hairLoss_no: "X",
    questionnaire_hairLoss_yes_desc: "脱毛が観察される",
    questionnaire_hairLoss_no_desc: "正常な抜け毛",

    // Selected symptoms
    questionnaire_selectedSymptoms: "選択された症状",

    // PhotoUpload page
    upload_title: "皮膚状態写真アップロード",
    upload_description: "問題のある皮膚部位の鮮明な写真をアップロードしてください",
    upload_tip: "自然光での近接撮影により、より正確な分析が可能です",
    upload_dragOrClick: "写真をドラッグまたはクリックしてアップロード",
    upload_fileFormat: "JPG、PNGファイルのみ対応（最大10MB）",
    upload_selectFile: "ファイル選択",
    upload_completed: "アップロード完了",
    upload_cropReady: "クロップして診断準備",
    upload_cropCompleted: "クロップ完了",
    upload_optimized: "224x224サイズに最適化済み",
    upload_cropNeeded: "画像クロップ必要",
    upload_cropDescription: "正確な診断のため、病変部位を224x224サイズにクロップしてください",
    upload_cropButton: "クロップ",
    upload_diagnosisReady: "診断準備完了！",
    upload_imageOptimized: "画像が224x224サイズに最適化されました。AI診断を開始してください。",
    upload_startDiagnosis: "診断開始",
    upload_photographyGuide: "撮影ガイド",
    upload_guideBrightLight: "明るい自然光で撮影してください",
    upload_guideClearCapture: "病変部位を鮮明に撮影してください",
    upload_guideCloseShot: "ブレずに近接撮影してください",
    upload_cropModal_title: "画像クロップ",
    upload_cropModal_description: "病変部位を正方形領域で選択してください。",
    upload_cropModal_imageAlt: "クロップする画像",
    upload_cropModal_cancel: "キャンセル",
    upload_cropModal_complete: "クロップ完了",
    upload_backToPrevious: "前のステップへ",
    upload_errorImageOnly: "画像ファイルのみアップロード可能です。",
    upload_errorFileSize: "ファイルサイズが10MBを超えています。より小さなファイルを選択してください。",

    // DiagnosisResult page
    diagnosis_analysisResult: "分析結果",
    diagnosis_skinConditionClassification: "皮膚状態分類",
    diagnosis_uploadedSkinPhoto: "アップロード済み皮膚写真",
    diagnosis_expectedDiagnosis: "予想診断",
    diagnosis_severityLow: "軽度",
    diagnosis_severityMedium: "中程度",
    diagnosis_severityHigh: "重度",
    diagnosis_aiConfidence: "AI信頼度",
    diagnosis_nearbyRecommendedHospitals: "近くの推奨病院",
    diagnosis_listView: "リスト表示",
    diagnosis_mapView: "地図で表示",
    diagnosis_locationChecking: "位置確認中",
    diagnosis_gpsLocationChecking: "GPSで現在位置を確認しています...",
    diagnosis_hospitalSearching: "病院検索中",
    diagnosis_searchingNearbyHospitals: "近くの動物病院を検索しています...",
    diagnosis_locationPermissionRequired: "位置権限が必要",
    diagnosis_locationPermissionMessage: "近くの病院を見つけるために位置権限が必要です。\nブラウザで位置権限を許可してください。",
    diagnosis_noHospitalsFound: "病院が見つかりません",
    diagnosis_noHospitalsFoundMessage: "近くに動物病院が見つかりません。\n他の地域で検索してみてください。",
    diagnosis_operatingNow: "営業中",
    diagnosis_callHospital: "電話",
    diagnosis_getDirections: "道順",
    diagnosis_mapLoading: "地図読み込み中",
    diagnosis_loadingMapMessage: "地図を読み込んでいます...",
    diagnosis_activatingGpsMessage: "GPS位置サービスを有効化しています...",
    diagnosis_myLocation: "現在地",
    diagnosis_shareResults: "結果を共有",
    diagnosis_saveAsImage: "分析結果を画像として保存",
    diagnosis_saveImageFile: "画像ファイルとして保存",
    diagnosis_saveImageDescription: "分析結果を高画質画像として保存して保管してください",
    diagnosis_emailSubscription: "メールで購読",
    diagnosis_emailPlaceholder: "メールアドレスを入力してください",
    diagnosis_subscribe: "購読",
    diagnosis_emailDescription: "詳細な診断レポートとケアガイドをメールで受け取ってください",
    diagnosis_importantNotice: "重要なお知らせ",
    diagnosis_disclaimerMessage: "この結果はAI予測であり、正確な診断のためには必ず獣医師の診療を受けてください。",
    diagnosis_newAnalysis: "新しいAI分析を開始",
    diagnosis_urgencyEmergency: "即座に救急室への受診が必要です",
    diagnosis_urgencyUrgent: "早めの病院受診をお勧めします",
    diagnosis_urgencyNormal: "定期的なケアが必要です",
    diagnosis_hospitalContactCall: "{hospitalName}に電話をかけますか？\n\n電話番号：{phone}\n営業時間：{openHours}\n予想待ち時間：{waitTime}",
    diagnosis_hospitalContactNavigate: "{hospitalName}への道案内を開始します。\n\n住所：{address}\n距離：{distance}\n予想所要時間：徒歩{walkTime}分",
    diagnosis_emailSentSuccess: "診断結果が{email}に送信されました",
    diagnosis_emailSentError: "メール送信中にエラーが発生しました。再度お試しください。",
    diagnosis_saveImageError: "保存する領域が見つかりません。ページを更新してから再度お試しください。",
    diagnosis_inAppBrowserWarning: "アプリ内ブラウザでは画像保存が制限される場合があります。\n\nChrome、Safariなどの通常ブラウザでの使用をお勧めします。\n\nそれでも試しますか？",
    diagnosis_imageSavedSuccess: "分析結果が選択した場所に保存されました！",
    diagnosis_imageOpenedInNewTab: "画像が新しいタブで開かれました！\n\n💡 画像を長押しして「画像を保存」を選択するか、Chrome/Safariブラウザで再度お試しください。",
    diagnosis_imageDownloadedSuccess: "分析結果がダウンロードフォルダに保存されました！\n\n💡 保存場所を選択するには、Chrome設定 > ダウンロード > 「ダウンロード前に各ファイルの保存場所を確認する」を有効にしてください。",
    diagnosis_imageSaveGeneralError: "画像保存中にエラーが発生しました。\n\n💡 Chrome、Safariなどの通常ブラウザで再度お試しください。",

    // VetFinderPage
    vetFinder_pageTitle: "病院を探す",
    vetFinder_pageDescription: "近くの専門動物病院を探してみてください",
    vetFinder_searchPlaceholder: "病院名または地域で検索",
    vetFinder_filtersTitle: "フィルター",
    vetFinder_filterOpen: "営業中",
    vetFinder_statusOpen: "営業中",
    vetFinder_statusClosed: "営業終了",
    vetFinder_reserveButton: "予約する",
    vetFinder_loading: "読み込み中...",
    vetFinder_error: "エラーが発生しました",
    vetFinder_loadSuccess: "読み込み成功",

    // Home page
    home_aiScreeningService: "AI皮膚疾患モニタリングサービス",
    home_mainTitle: "ペットの皮膚の健康をAIで診断しましょう",
    home_mainDescription: "ペットの皮膚写真をアップロードするか、AI診断をすぐに始めましょう",
    home_tryNowButton: "今すぐ体験",
    home_aiAnalyzing: "AI分析中...",
    home_aiAnalysisResult: "AI分析結果",
    home_stepsTitle: "簡単な3ステップで",
    home_stepsComplete: "完了",
    home_stepsSubtitle: "複雑な手続きなしに簡単かつ迅速にペットの皮膚の健康を確認しましょう",
    home_step1Title: "写真アップロード",
    home_step1Description: "問題のある皮膚部分を撮影してアップロードしてください",
    home_step2Title: "AI分析",
    home_step2Description: "高度化されたAIが皮膚状態を分析し、疾患の可能性を診断します。",
    home_step3Title: "病院接続",
    home_step3Description: "分析結果をもとに周辺の専門病院を推薦し、予約をお手伝いします。",
    home_analysisTime: "💡 平均分析時間：30秒以内",
    home_whyChooseTitle: "なぜTalktail Careを選ぶべきでしょうか？",
    home_whyChooseSubtitle: "専門的で信頼できるペット皮膚診断サービス",
    home_feature1Title: "85%の高い精度",
    home_feature1Description: "数万件のデータを学習したAIアルゴリズム",
    home_feature2Title: "近くの動物病院とつながる",
    home_feature2Description: "500以上の提携病院との即座接続",
    home_feature3Title: "簡単な使用法",
    home_feature3Description: "写真アップロードだけで30秒以内に結果",
    home_testimonialsTitle: "ユーザーレビュー",
    home_testimonialsSubtitle: "すでに多くのペット飼い主が経験しています",
    home_testimonial1Name: "キム・ミンジ",
    home_testimonial1Pet: "ゴールデンレトリバー ムンムン",
    home_testimonial1Content: "うちのムンムンの皮膚問題を素早く発見できて本当に役に立ちました。AI分析が本当に正確でした！",
    home_testimonial2Name: "パク・ソンホ",
    home_testimonial2Pet: "ペルシャ ナビ",
    home_testimonial2Content: "24時間いつでも使えるのが良くて、近くの病院まで推薦してくれて便利でした。",
    home_testimonial3Name: "イ・ユジン",
    home_testimonial3Pet: "マルチーズ クルム",
    home_testimonial3Content: "写真を撮るだけですぐに結果が出て不思議でした。獣医師の先生も正確な診断だとおっしゃいました。",
    home_petOwner: "保護者",
    home_ctaTitle: "今すぐ始めましょう",
    home_ctaSubtitle: "我が子の健康な皮膚のための第一歩を踏み出してみましょう",
    home_freeTrialButton: "無料体験",
    home_footerTitle: "Talktail Care",
    home_footerSubtitle: "ペット皮膚健康の頼りになるパートナー",
    home_footerDescription: "AI技術でペットの皮膚の健康を守るスマートソリューションです。近くの動物病院とつなげて、より良い治療を受けましょう。",
    home_footerAccuracy: "精度95%",
    home_footerHospitals: "500以上提携病院",
    home_footerServices: "サービス",
    home_footerAiAnalysis: "AI分析",
    home_footerDiseaseInfo: "疾患情報",
    home_footerHospitalFinder: "病院を探す",
    home_footerCustomerSupport: "カスタマーサポート",
    home_footerFaq: "よくある質問",
    home_footerUserGuide: "利用ガイド",
    home_footerCustomerCenter: "カスタマーセンター",
    home_footerPrivacyPolicy: "プライバシーポリシー",
    home_footerCopyright: "© 2024 Talktail Care. All rights reserved.",

    // Dog breed selector
    selectBreed: "品種を選択してください",

    skinOdorQuestion: "皮膚に匂いがありますか？",
    yesGreasySmell: "O（はい、脂っぽいまたはカビ臭い匂い）",
    noOdor: "X（匂いなし）",
    excessiveSheddingQuestion: "毛が過度に抜けていますか？",
    yesHairLoss: "O（はい、脱毛が観察される）",
    noExcessiveShedding: "X（過度な脱毛なし）",
    weightGainLethargyQuestion: "体重が増加したり、無気力に見えますか？",
    yesSuchSymptoms: "O（はい、そのような症状があります）",
    noSuchSymptoms: "X（いいえ、そのような症状はありません）",

    // Areas
    face: "顔",
    back: "背中",
    legs: "脚",
    belly: "お腹",
    other: "その他",
    ears: "耳",
    eyeArea: "目の周り",
    noseArea: "鼻の周り",
    mouthArea: "口の周り",
    snoutChin: "鼻先/あご",
    neck: "首",
    shoulders: "肩",
    upperBack: "背中上部",
    lowerBack: "背中下部",
    sides: "脇腹",
    frontLegs: "前脚",
    hindLegs: "後脚",
    paws: "足",
    betweenToes: "指の間",
    kneeJoint: "膝/関節",
    chest: "胸",
    upperBelly: "腹部上部",
    lowerBelly: "腹部下部",
    groin: "股間",
    tail: "尻尾",
    analArea: "肛門周り",
    wholebody: "全身",
    genitalArea: "生殖器周辺",

    // Dog breeds
    goldenRetriever: "ゴールデンレトリバー",
    labradorRetriever: "ラブラドールレトリバー",
    germanShepherd: "ジャーマンシェパード",
    beagle: "ビーグル",
    bulldog: "ブルドッグ",
    poodle: "プードル",
    shibaInu: "柴犬",
    jindo: "珍島犬",
    maltese: "マルチーズ",
    pomeranian: "ポメラニアン",
    chihuahua: "チワワ",
    cockerSpaniel: "コッカースパニエル",
    shihTzu: "シーズー",
    bichonFrise: "ビションフリーゼ",
    yorkshireTerrier: "ヨークシャーテリア",
    dachshund: "ダックスフント",
    husky: "ハスキー",
    rottweiler: "ロットワイラー",
    doberman: "ドーベルマン",
    saintBernard: "セントバーナード",
    borderCollie: "ボーダーコリー",
    welshCorgi: "ウェルシュコーギー",
    papillon: "パピヨン",
    spitz: "スピッツ",

    // Cat breeds
    persian: "ペルシャ",
    russianBlue: "ロシアンブルー",
    siamese: "シャム",
    maineCoon: "メインクーン",
    britishShorthair: "ブリティッシュショートヘア",
    americanShorthair: "アメリカンショートヘア",
    bengal: "ベンガル",
    abyssinian: "アビシニアン",
    scottishFold: "スコティッシュフォールド",
    ragdoll: "ラグドール",
    norwegianForest: "ノルウェージャンフォレスト",
    turkishAngora: "ターキッシュアンゴラ",
    siamCat: "シャム猫",
    highlandFold: "ハイランドフォールド",
    sphinx: "スフィンクス",

    // SkinAI.tsx - Process steps
    infoInput: "情報入力",
    photoUpload: "写真アップロード",
    diagnosisResult: "ぶんせきけっか",
    basicInfo: "基本情報",
    symptomInput: "症状入力",

    // SkinAI.tsx - Loading messages
    aiAnalysisInProgress: "AI皮膚解析中",
    petSkinAnalysis: "{petName}の皮膚状態を解析中",
    advancedAiAnalysis: "高度なAIアルゴリズムがアップロードされた画像を精密分析し、正確な皮膚診断を実行しています",
    imageAnalysis: "画像解析",
    patternRecognition: "パターン認識",
    // diagnosisComplete: "診断完了"

    // Token related translations
    logoutSuccess: "로그アウトしました",
    tokenPurchase: "トークン購入",
    tokenPurchaseDesc: "AI診断に必要なトークンを購入してください",
    tokenPackageStarter: "スターター",
    tokenPackageStarterDesc: "初回ユーザー向けの基本パッケージ",
    tokenPackageStarterFeature1: "1回AI診断",
    tokenPackageStandard: "スタンダード",
    tokenPackageStandardDesc: "最も人気のパッケージ",
    tokenPackageStandardFeature1: "5回AI診断",
    tokenPackagePremium: "プレミアム",
    tokenPackagePremiumDesc: "ヘビーユーザー向けの大容量",
    tokenPackagePremiumFeature1: "10回AI診断",
    tokenPackagePremiumFeature2: "プレミアム疾病情報",
    orderCreationFailed: "注文作成失敗",
    tokenRefreshFailed: "トークン更新失敗。再度ログインしてください。",
    tokenRefreshError: "トークン更新中にエラーが発生しました。再度ログインしてください。",
    paymentRequestError: "決済リクエスト中にエラーが発生しました。",
    errorDetails: "エラー詳細",
    unknownError: "不明なエラー",
    paymentCompleted: "決済完了！トークンがチャージされました。",
    paymentProcessingFailed: "決済処理失敗",
    paymentProcessingError: "決済処理中にエラーが発生しました",
    newMemberEvent: "AI 疾患分析を始めましょう",
    firstPurchaseBenefit: "初回購入時",
    discount20: "20%割引",
    bonusTokens: "正確で迅速、かつデータに基づいたAI診断をご提供します。",
    popular: "おすすめ",
    tokens: "トークン",
    purchase: "購入する",
    tokenManagement: "トークン管理",
    transactionHistory: "取引履歴",
    completed: "完了",
    paypalPayment: "PayPal決済",
    confirmRefund: "本当に返金しますか？",
    refundSuccess: "返金成功！",
    refundFailed: "返金失敗",
    refundError: "返金中にエラーが発生しました。",
    refunding: "返金中...",
    refund: "返金",
    noTransactions: "完了した取引履歴がありません。",

    // Date related translations
    year: "年",
    month: "月",
    previousYear: "前年",
    nextYear: "翌年",
    previousMonth: "前月",
    nextMonth: "翌月",
    cancel: "キャンセル",
    confirm: "確認",

    // PurchaseSuccess.tsx
    purchaseSuccess_title: "お支払い完了！",
    purchaseSuccess_message: "ありがとうございます。お支払いが正常に処理されました。",

    // Added disease_name and description from the provided data
    superficialPyodermaName: "表在性膿皮症",
    superficialPyodermaDesc: "丘疹は一般的に毛包を中心に発生し、紅斑性で膿疱や表皮襟状鱗屑を伴う可能性があります。多毛部位での部分的脱毛を伴うことがあり, 球菌感染による毛包炎と併発することもあります。[1, 2]",
    superficialPyodermaA2Desc: "表皮襟状鱗屑がこの疾患の特徴的病変（hallmark lesion）であり、多数の襟状鱗屑が融合すると広範囲の「地図状」脱毛と鱗屑部位を形成することがあります。円形または剥離する縁を持つ表皮襟状鱗屑が特徴的で、体幹と腹部に多発性に分布します。[5, 6]",

    fleaAllergyDermatitisName: "ノミアレルギー性皮膚炎",
    fleaAllergyDermatitisDesc: "ノミの唾液に対する炎症反応で、丘疹性発疹を特徴とします。激しい掻痒感とともに丘疹が現れ、病変は主に体幹全体に発生し、激しい痒み、紅斑、蕁麻疹、皮膚瘢痕、鱗屑、脱毛、苔癬化を伴うことがあります。[2, 3]",

    sarcopticMangeName: "疥癬",
    sarcopticMangeDesc: "激しい掻痒感とともに丘疹が主要な特徴として現れる疾患です。病変は主に肘、足首、耳縁、腹部、胸部に集中し、脱毛、出血性痂皮、紅斑を伴うことがあります。[3, 4]",

    atopicDermatitisName: "アトピー性皮膚炎（食物アレルギー）",
    atopicDermatitisDesc: "丘疹はアレルギー性皮膚炎でよく観察される一次病変で、しばしば紅斑を伴います。慢性的で炎症性、掻痒感を引き起こす疾患で、主に顔面（口周囲、眼周囲）、耳介、腋窩、鼠径部、足に病変が現れます。[3]",

    papillomavirusInducedOilyPlaquesName: "パピローマウイルス性油性プラーク",
    papillomavirusInducedOilyPlaquesDesc: "多数の肌色、灰色、または黄色の斑状プラークと時には丘疹で構成される病変です。主に頸部、体幹、腹部、四肢に位置し、過角化して平坦または軽度隆起しています。[2]",

    seborrheaName: "脂漏性皮膚炎",
    seborrheaDesc: "異常な角化過程により過度の鱗屑形成を特徴とします。乾性脂漏（seborrhea sicca）は乾燥した白色鱗屑と酸敗した油臭を特徴とし、油性脂漏（seborrhea oleosa）は油性皮膚と黄褐色鱗屑、酸敗した油臭を特徴とします。背部、体幹、皮膚襞に分布します。[5, 6]",

    malasseziaDermatitisName: "マラセチア皮膚炎",
    malasseziaDermatitisDesc: "酵母Malassezia pachydermatisの過増殖により発生し、紅斑、中等度から重度の掻痒感、油性で黄色の鱗屑を伴います。強いかび臭い臭いが特徴的で、皮膚襞、趾間、腋窩、頸部腹側、耳介、鼠径部に好発します。[6, 7]",

    ichthyosisName: "魚鱗癬",
    ichthyosisDesc: "先天性/遺伝性角化異常疾患です。皮膚は大きく硬く付着した板状の鱗屑で覆われており、初期は白色ですが、年齢とともにしばしば灰色や黒色に着色されます。体幹全体に全般的に分布します。[6, 7]",

    hypothyroidismName: "甲状腺機能低下症",
    hypothyroidismDesc: "乾燥した微細から中等度の鱗屑である「フケ」を特徴とし、全般的に体幹に分布します。[6]",
    hypothyroidismA3Desc: "皮膚が厚くなり（粘液水腫）色素沈着が起こる可能性があり、典型的には掻痒感のない対称性脱毛を伴います。乾燥してもろい皮膚を特徴とし、主に体幹、摩擦部位に現れます。[9]",

    allergicDermatitisName: "アレルギー性皮膚炎（アトピー性皮膚炎、食物アレルギー）",
    allergicDermatitisDesc: "苔癬化および色素沈着過多の最も一般的な原因の一つです。掻痒による持続的な自己損傷はアレルギー性皮膚病の特徴的病変で、皮膚が厚く、革のようになり、暗くなり、しばしば毛が抜けます。紅斑、掻き傷、再発性感染が特徴です。[8, 9]",

    chronicMalasseziaDermatitisName: "慢性マラセチア皮膚炎",
    chronicMalasseziaDermatitisDesc: "炎症性アレルギー性皮膚炎と同時に発生し、これを悪化させます。マラセチア感染は炎症と掻痒感を強力に誘発し、深刻な苔癬化と色素沈着過多を引き起こし、しばしば油性表面と強い臭いを伴います。苔癬化部位には油性滲出物と特徴的なかび臭い臭いが伴います。[8, 9]",

    hyperadrenocorticismName: "副腎皮質機能亢進症",
    hyperadrenocorticismDesc: "皮膚はしばしば薄く萎縮していますが、時には色素沈着過多を伴います。主に体幹、摩擦部位に現れ、薄く萎縮した皮膚、時には腹部膨満、多尿/多飲、被毛の活力低下を伴います。[10]",

    bacterialPyodermaName: "細菌性膿皮症（表在性毛包炎）",
    bacterialPyodermaDesc: "膿疱は犬で最も一般的な原因の一つで、通常小さく毛包を中心に形成されます。座瘡、腋窩、鼠径部でよく観察され、毛包性膿疱と同一部位に丘疹および表皮襟状鱗屑が共存します。[10, 11]",

    demodicosisName: "毛包虫症",
    demodicosisDesc: "Demodex canisダニの過増殖が深刻な炎症反応を引き起こし、脱毛、紅斑、鱗屑が主な病変です。膿疱や面皰も観察される可能性があり、顔面、足、全身に分布します。[11, 12]",

    pemphigusFoliaceusName: "落葉状天疱瘡",
    pemphigusFoliaceusDesc: "犬で最も一般的な自己免疫性皮膚疾患で、一次病変は膿疱ですが、膿疱はしばしば大きく複数の毛包にまたがり、必ずしも毛包中心性ではありません。顔面、耳、肉球に対称的に発生し、糜爛と脱毛を伴います。[11, 12]",

    schnauzerComedoneSyndromeName: "シュナウザー面皰症候群",
    schnauzerComedoneSyndromeDesc: "一次的な角化異常疾患で、背部中央線と背中に一次性面皰が多数発生します。二次細菌感染が発生すると丘疹と膿疱が生じる可能性があります。[11]",

    deepPyodermaAndFurunculosisName: "深部膿皮症および癰腫症",
    deepPyodermaAndFurunculosisDesc: "細菌感染が真皮深部に拡張するか、毛包破裂を引き起こす場合（癰腫症）、潰瘍形成および膿や血性滲出物を排出する瘻管形成につながります。主に趾間、顎、鼻口部、前肢部に好発します。[13, 14]",

    discoidLupusErythematosusName: "円板状エリテマトーデス",
    discoidLupusErythematosusDesc: "鼻に色素脱失、紅斑、鱗屑および糜爛を引き起こす疾患で、主に鼻および鼻梁に発生します。[14, 15]",

    pemphigusVulgarisName: "尋常性天疱瘡",
    pemphigusVulgarisDesc: "皮膚粘膜境界部（唇、鼻孔、肛門）および口腔内に小水疱および潰瘍を引き起こす重篤な自己免疫疾患です。[14, 15]",

    vasculitisName: "血管炎",
    vasculitisDesc: "血管の炎症で致命的であり、潰瘍と壊死につながる可能性があります。典型的には耳介先端、尾端、または肉球に発生し、「パンチで抜いたような」外観を示します。[14, 15]",

    squamousCellCarcinomaName: "扁平上皮癌",
    squamousCellCarcinomaDesc: "さまざまな腫瘍の中で日光露出部位に最も一般的な悪性腫瘍であり、潰瘍化します。硬く成長する腫瘍または潰瘍が現れ、耳介、鼻、体幹、四肢に発生します。[14, 15]",

    decubitusUlcersName: "褥瘡",
    decubitusUlcersDesc: "大型犬または臥位で過ごす犬の骨突起部（肘、足首、臀部）上の慢性的な圧迫により発生する疾患です。皮膚に筋性壊死が形成され、臥位の病歴があります。[15, 16]",

    fungalKerionName: "真菌性ケリオン",
    fungalKerionDesc: "皮膚糸状菌（真菌）感染に対する結節性、湿潤性で、しばしば滲出性の炎症反応であり、感染した毛包の破裂により発生します。肉芽腫性炎症で非腫瘍性（感染性）です。[16, 17]",

    sterileNodularPanniculitisName: "無菌性結節性脂肪織炎",
    sterileNodularPanniculitisDesc: "皮下脂肪の炎症で、単一または多数の深い結節として現れ、これらの結節は破裂して油性で透明な液体を排出することがあります。肉芽腫性炎症で非腫瘍性（感染性）です。[16]",

    mastCellTumorName: "肥満細胞腫",
    mastCellTumorDesc: "犬で最も一般的な悪性皮膚腫瘍です。外観は非常に多様で、赤色/ピンク色の結節として現れ、時には潰瘍を伴ったり、皮膚病変のような柔らかい皮下腫瘤として現れることがあり、ヒスタミン放出により しばしば掻痒感が現れることがあります。[17, 18]",

    cutaneousHistiocytomaName: "皮膚組織球腫",
    cutaneousHistiocytomaDesc: "一般的に3歳未満の若い犬でよく見られる良性腫瘍です。典型的には単発性で、急速に成長するピンク色から赤色の毛のない「ボタン様」の結節として現れ、主に頭部、耳、四肢に発生します。[17, 18]",

    lipomaName: "脂肪腫",
    lipomaDesc: "脂肪細胞で構成される非常に一般的な良性腫瘍です。柔らかく、可動性があり、境界明瞭な皮下腫瘤として現れ、主に体幹、胸部、腹部に発生します。[17, 18]",

    sebaceousGlandAdenomaName: "脂腺腺腫",
    sebaceousGlandAdenomaDesc: "表皮付属器でよく見られる良性腫瘍です。ピンク色で油性、疣贅様またはカリフラワー様の形状を持ちます。頭部、体幹、四肢に現れます。[17, 18]",

    fungalGranulomaNoduleName: "真菌性肉芽腫/結節",
    fungalGranulomaNoduleDesc: "硬くて湿潤な結節で、しばしば潰瘍や瘻孔を伴います。顔面と足に現れ、炎症性で非腫瘍性（感染性）です。[17]",
  },
  zh: {
    // App.tsx
    appTitle: "Talktail AI",
    appSubtitle: "宠物皮肤诊断助手",
    stepQuestionnaire: "宠物信息和症状输入",
    stepUpload: "照片上传",
    stepDiagnosis: "诊断结果",
    stepHospitals: "医院推荐",
    stepComplete: "完成",
    aiAnalyzing: "AI正在分析{petName}的皮肤状况",
    aiAnalyzingGeneric: "AI正在分析您宠物的皮肤状况",
    analysisDescription: "正在综合问诊表和照片准备准确诊断...",
    diagnosisComplete: "诊断完成！",
    diagnosisThankYou: "🐾 感谢您检查{petName}的皮肤健康！",
    visitRecommendation: "如有需要，请到推荐的医院进行准确治疗。",
    resultSent: "📬 结果已成功发送",
    emailCheck: "请查看您的邮件，获取有助于宠物健康管理的额外信息。",
    aiSolution: "✨ 通过GPTOnline.ai提供的智能AI解决方案体验更好的宠物护理",
    newDiagnosis: "开始新诊断",
    disclaimer: " Talktail AI仅供参考，准确诊断请咨询兽医。",

    // Navbar.tsx
    home: "首页",
    aiAnalysis: "AI分析",
    diseaseInfo: "疾病信息",
    hospitalSearch: "找医院",
    myRecord: "我的记录",
    login: "登录",
    logout: "登出",
    diagnoseNow: "立即诊断",
    languageSelect: "语言选择",

    // LoginPage.tsx
    goBack: "返回",
    welcomeBack: "很高兴再次见到您！",
    keepHealthySkin: "让我们一起守护宠物的健康皮肤",
    continueWithGoogle: "使用Google继续",
    continueWithKakao: "使用Kakao继续",
    continueWithNaver: "使用Naver继续",
    continueWithApple: "使用Apple继续",
    termsAgreement: "登录即表示您同意服务条款和隐私政策",
    terms: "服务条款",
    privacyPolicy: "隐私政策",
    loginTitle: "登录",
    socialLoginDescription: "使用社交账户轻松登录",
    welcome: "欢迎！",
    petHealthMessage: "让我们一起守护宠物的皮肤健康",
    cumulativeDiagnosis: "累计诊断",
    accuracy: "准确率",
    goHome: "回到首页",
    noTokenAlert: "没有代币",
    loginRequiredAlert: "需要登录。",

    // MyPage.tsx
    mypage_logout: "退出登录",
    mypage_currentTokens: "当前代币",
    mypage_recharge: "充值",
    mypage_logoutSuccess: "已退出登录。",
    mypage_code : "优惠券",
    mypage_profile: "个人资料",
    mypage_diagnosisRecords: "诊断记录",
    mypage_tokenManagement: "代币管理",
    mypage_profileInfo: "个人资料信息",
    mypage_name: "姓名",
    mypage_email: "邮箱",
    mypage_phone: "电话号码",
    mypage_itching: "瘙痒",
    mypage_severe: "严重",
    mypage_moderate: "中等",
    mypage_none: "无",
    mypage_hairLoss: "脱毛",
    mypage_smell: "气味",
    mypage_area: "部位",
    mypage_viewDetails: "查看详情",
    mypage_dataNotFound: "找不到数据",
    mypage_diagnosisInfoNotExist: "请求的诊断信息不存在。",
    mypage_backToList: "返回列表",
    mypage_diagnosisDetailView: "诊断详情",
    mypage_receptionDate: "接收日期",
    mypage_analysisResult: "分析结果",
    mypage_skinConditionClassification: "皮肤状况分类",
    mypage_expectedDiagnosis: "預測分析",
    mypage_aiConfidence: "AI可信度",

    // DiseaseInfoPage.tsx
    skinDiseaseInfo: "皮肤疾病信息",
    skinDiseaseDescription: "了解宠物常见皮肤疾病",
    consultVetNote: "准确诊断请咨询专业兽医",
    mainSymptoms: "主要症状",
    diseaseMainSymptoms: "疾病主要症状",
    description: "说明",
    checkOtherDiseases: "查看其他疾病",
    riskLevel: "风险等级",
    common: "常见",
    normal: "普通",
    rare: "罕见",
    viewDetails: "查看详情",
    severity: "严重程度",
    prevalence: "发生频率",
    high: "高",
    medium: "中等",
    low: "低",

    // Disease names and descriptions
    papulesPlaquesName: "丘疹、斑块",
    papulesPlaquesDesc: "由过敏、细菌感染引起的疾病。",
    papulesPlaquesSymptoms: ["瘙痒", "发红", "脱毛", "鳞屑和皮屑", "分泌物和结痂"],

    epithelialCollarsName: "上皮环状物（皮屑、鳞屑）",
    epithelialCollarsDesc: "主要由真菌感染引起的疾病，可能作为与皮屑、鳞屑相关疾病的一部分出现。",
    epithelialCollarsSymptoms: ["瘙痒", "结痂", "干燥", "环状红斑"],

    lichenificationName: "苔藓化、色素沉着过度",
    lichenificationDesc: "由真菌感染引起的疾病",
    lichenificationSymptoms: ["异味和恶臭", "脱毛", "耳朵发红", "黑色耳垢", "瘙痒"],

    pustulesAcneName: "脓疱、痤疮",
    pustulesAcneDesc: "由细菌感染、免疫力下降、个人卫生不当引起的疾病。",
    pustulesAcneSymptoms: ["红肿", "小疙瘩", "脓液", "脱毛", "瘙痒"],

    erosionUlcerName: "糜烂、溃疡",
    erosionUlcerDesc: "由外伤、过敏、病毒感染引起的疾病。",
    erosionUlcerSymptoms: ["眼屎和眼泪增多", "揉眼和刺激", "角膜混浊", "眼部充血"],

    nodulesName: "结节、肿块",
    nodulesDesc: "由皮肤和皮下组织问题、器官肿瘤、老化变化引起的疾病。",
    nodulesSymptoms: ["皮肤肿块", "呼吸困难", "跛行", "体重减轻", "食欲不振"],

    // MedicalQuestionnaire.tsx
    step1Title: "步骤1. 宠物信息",
    step2Title: "步骤2. 症状和部位输入",
    step1Description: "用智能AI解决方案分析您宠物的皮肤问题",
    step2Description: "请选择您宠物的主要症状和受影响的部位",
    accurateInfo: "为了准确诊断，请详细填写",
    petName: "宠物姓名",
    required: "*",
    namePlaceholder: "姓名",
    birthDate: "出生日期",
    dateFormat: "YYYY-MM-DD",
    datePlaceholder: "年-月-日",
    weight: "体重 (公斤)",
    weightPlaceholder: "3.15",
    breed: "品种",
    breedPlaceholder: "请选择品种",
    dogCategory: "🐕 狗",
    catCategory: "🐱 猫",
    otherBreed: "🔍 其他（直接输入）",
    customBreedPlaceholder: "请直接输入品种",
    customBreedHelper: "例如：混种犬、猫混种、特殊品种名称等",
    // mainSymptoms: "主要症状",
    symptomsDescription: "请选择所有适用的症状",
    selectedSymptoms: "选择的症状",
    moreSymptoms: "+还有{count}个",
    affectedAreas: "受影响的部位",
    categorySelect: "选择大类",
    selectAreaPlaceholder: "选择部位",
    subAreaSelect: "子部位（可多选）",
    selectedAreas: "选择的部位 ({count}个)",
    moreAreas: "+还有{count}个",
    previous: "上一步",
    next: "下一步",
    complete: "完成",

    // Symptoms
    itching: "瘙痒",
    scaling: "鳞屑",
    hairLoss: "脱毛",
    redness: "发红",
    wounds: "伤口",
    odor: "异味",
    swelling: "肿胀",
    scabs: "结痂",
    blackSpots: "黑斑",
    whiteDandruff: "白色皮屑",

    // New symptom questions
    petItchyQuestion: "您的宠物感到瘙痒吗？",
    itchyNone: "无：完全不抓挠或舔舐",
    itchyModerate: "中等：偶尔抓挠或舔舐",
    itchySevere: "严重：持续过度抓挠或舔舐，造成困扰",

    // Questionnaire specific itching questions
    questionnaire_doesPetItch: "您的宠物瘙痒吗？",
    questionnaire_itching_none: "无",
    questionnaire_itching_moderate: "中等",
    questionnaire_itching_severe: "严重",
    questionnaire_itching_none_desc: "不瘙痒",
    questionnaire_itching_moderate_desc: "偶尔抓挠或舔舐",
    questionnaire_itching_severe_desc: "频繁严重抓挠",

    // Questionnaire odor questions
    questionnaire_skinOdor: "皮肤有异味吗？",
    questionnaire_odor_yes: "O",
    questionnaire_odor_no: "X",
    questionnaire_odor_yes_desc: "油腻有异味",
    questionnaire_odor_no_desc: "无异味",

    // Questionnaire hair loss questions
    questionnaire_hairLoss: "毛发过度脱落吗？",
    questionnaire_hairLoss_yes: "O",
    questionnaire_hairLoss_no: "X",
    questionnaire_hairLoss_yes_desc: "观察到脱毛",
    questionnaire_hairLoss_no_desc: "正常脱毛",

    // Selected symptoms
    questionnaire_selectedSymptoms: "选择的症状",

    // PhotoUpload page
    upload_title: "皮肤状态照片上传",
    upload_description: "请上传有问题皮肤部位的清晰照片",
    upload_tip: "自然光下近距离拍摄可获得更准确的分析",
    upload_dragOrClick: "拖拽照片或点击上传",
    upload_fileFormat: "仅支持JPG、PNG文件（最大10MB）",
    upload_selectFile: "选择文件",
    upload_completed: "上传完成",
    upload_cropReady: "裁剪并准备诊断",
    upload_cropCompleted: "裁剪完成",
    upload_optimized: "已优化为224x224尺寸",
    upload_cropNeeded: "需要裁剪图像",
    upload_cropDescription: "为了准确诊断，请将病变部位裁剪为224x224尺寸",
    upload_cropButton: "裁剪",
    upload_diagnosisReady: "诊断准备就绪！",
    upload_imageOptimized: "图像已优化为224x224尺寸。开始AI诊断。",
    upload_startDiagnosis: "开始诊断",
    upload_photographyGuide: "拍摄指南",
    upload_guideBrightLight: "请在明亮的自然光下拍摄",
    upload_guideClearCapture: "请清晰地拍摄病变部位",
    upload_guideCloseShot: "请近距离拍摄，避免晃动",
    upload_cropModal_title: "图像裁剪",
    upload_cropModal_description: "请将病变部位选择为正方形区域。",
    upload_cropModal_imageAlt: "要裁剪的图像",
    upload_cropModal_cancel: "取消",
    upload_cropModal_complete: "裁剪完成",
    upload_backToPrevious: "上一步",
    upload_errorImageOnly: "只能上传图像文件。",
    upload_errorFileSize: "文件大小超过10MB。请选择更小的文件。",

    // DiagnosisResult page
    diagnosis_analysisResult: "分析结果",
    diagnosis_skinConditionClassification: "皮肤状态分类",
    diagnosis_uploadedSkinPhoto: "已上传皮肤照片",
    diagnosis_expectedDiagnosis: "预期诊断",
    diagnosis_severityLow: "轻度",
    diagnosis_severityMedium: "中度",
    diagnosis_severityHigh: "重度",
    diagnosis_aiConfidence: "AI置信度",
    diagnosis_nearbyRecommendedHospitals: "附近推荐医院",
    diagnosis_listView: "列表视图",
    diagnosis_mapView: "地图视图",
    diagnosis_locationChecking: "位置确认中",
    diagnosis_gpsLocationChecking: "正在通过GPS确认当前位置...",
    diagnosis_hospitalSearching: "医院搜索中",
    diagnosis_searchingNearbyHospitals: "正在搜索附近的动物医院...",
    diagnosis_locationPermissionRequired: "需要位置权限",
    diagnosis_locationPermissionMessage: "需要位置权限来查找附近的医院。\n请在浏览器中允许位置访问。",
    diagnosis_noHospitalsFound: "找不到医院",
    diagnosis_noHospitalsFoundMessage: "附近找不到动物医院。\n请尝试在其他地区搜索。",
    diagnosis_operatingNow: "营业中",
    diagnosis_callHospital: "致电",
    diagnosis_getDirections: "导航",
    diagnosis_mapLoading: "地图加载中",
    diagnosis_loadingMapMessage: "正在加载地图...",
    diagnosis_activatingGpsMessage: "正在激活GPS位置服务...",
    diagnosis_myLocation: "我的位置",
    diagnosis_shareResults: "分享结果",
    diagnosis_saveAsImage: "将分析结果保存为图像",
    diagnosis_saveImageFile: "保存为图像文件",
    diagnosis_saveImageDescription: "将分析结果保存为高质量图像以便存储",
    diagnosis_emailSubscription: "通过电子邮件订阅",
    diagnosis_emailPlaceholder: "请输入您的电子邮件地址",
    diagnosis_subscribe: "订阅",
    diagnosis_emailDescription: "通过电子邮件接收详细的诊断报告和护理指南",
    diagnosis_importantNotice: "重要提示",
    diagnosis_disclaimerMessage: "此结果为AI预测，准确诊断请务必咨询兽医。",
    diagnosis_newAnalysis: "开始新的AI分析",
    diagnosis_urgencyEmergency: "需要立即前往急诊室",
    diagnosis_urgencyUrgent: "建议尽快就医",
    diagnosis_urgencyNormal: "需要定期护理",
    diagnosis_hospitalContactCall: "您要致电{hospitalName}吗？\n\n电话：{phone}\n营业时间：{openHours}\n预计等待时间：{waitTime}",
    diagnosis_hospitalContactNavigate: "开始导航至{hospitalName}。\n\n地址：{address}\n距离：{distance}\n预计行程时间：步行{walkTime}分钟",
    diagnosis_emailSentSuccess: "诊断结果已发送至{email}",
    diagnosis_emailSentError: "发送电子邮件时出错。请重试。",
    diagnosis_saveImageError: "找不到要保存的区域。请刷新页面后重试。",
    diagnosis_inAppBrowserWarning: "应用内浏览器可能限制图像保存。\n\n建议在Chrome、Safari等常规浏览器中打开。\n\n仍要尝试吗？",
    diagnosis_imageSavedSuccess: "分析结果已保存到选定位置！",
    diagnosis_imageOpenedInNewTab: "图像已在新标签页中打开！\n\n💡 长按图像并选择\"保存图像\"，或在Chrome/Safari浏览器中重试。",
    diagnosis_imageDownloadedSuccess: "分析结果已保存到下载文件夹！\n\n💡 要选择保存位置，请在Chrome设置 > 下载中启用\"下载前询问每个文件的保存位置\"。",
    diagnosis_imageSaveGeneralError: "保存图像时出错。\n\n💡 请在Chrome、Safari等常规浏览器中重试。",

    // VetFinderPage
    vetFinder_pageTitle: "查找医院",
    vetFinder_pageDescription: "查找附近的专业动物医院",
    vetFinder_searchPlaceholder: "按医院名称或地区搜索",
    vetFinder_filtersTitle: "筛选器",
    vetFinder_filterOpen: "营业中",
    vetFinder_statusOpen: "营业中",
    vetFinder_statusClosed: "已关闭",
    vetFinder_reserveButton: "预约",
    vetFinder_loading: "加载中...",
    vetFinder_error: "发生错误",
    vetFinder_loadSuccess: "加载成功",

    // Home page
    home_aiScreeningService: "AI皮肤疾病监测服务",
    home_mainTitle: "用AI诊断宠物皮肤健康",
    home_mainDescription: "上传宠物皮肤照片或立即开始AI诊断",
    home_tryNowButton: "立即体验",
    home_aiAnalyzing: "AI分析中...",
    home_aiAnalysisResult: "AI分析结果",
    home_stepsTitle: "简单3步",
    home_stepsComplete: "完成",
    home_stepsSubtitle: "无需复杂流程，轻松快速检查宠物皮肤健康",
    home_step1Title: "上传照片",
    home_step1Description: "拍摄有问题的皮肤部位并上传。",
    home_step2Title: "AI分析",
    home_step2Description: "先进的AI分析皮肤状况并诊断可能的疾病。",
    home_step3Title: "医院连接",
    home_step3Description: "根据分析结果推荐附近的专业医院并协助预约。",
    home_analysisTime: "💡 平均分析时间：30秒内",
    home_whyChooseTitle: "为什么要选择Talktail Care？",
    home_whyChooseSubtitle: "专业可靠的宠物皮肤诊断服务",
    home_feature1Title: "85%高精度",
    home_feature1Description: "基于数万条数据训练的AI算法",
    home_feature2Title: "连接附近的动物医院",
    home_feature2Description: "与500+合作医院即时连接",
    home_feature3Title: "使用简便",
    home_feature3Description: "仅需上传照片，30秒内出结果",
    home_testimonialsTitle: "用户评价",
    home_testimonialsSubtitle: "许多宠物主人已经体验过了",
    home_testimonial1Name: "金敏智",
    home_testimonial1Pet: "金毛寻回犬 汪汪",
    home_testimonial1Content: "能够快速发现我们汪汪的皮肤问题，真的很有帮助。AI分析真的很准确！",
    home_testimonial2Name: "朴成浩",
    home_testimonial2Pet: "波斯猫 娜比",
    home_testimonial2Content: "24小时随时可以使用很好，还推荐了附近的医院很方便。",
    home_testimonial3Name: "李有珍",
    home_testimonial3Pet: "马尔济斯犬 云朵",
    home_testimonial3Content: "只要拍照就能立即出结果很神奇。兽医师也说是准确的诊断。",
    home_petOwner: "宠物主人",
    home_ctaTitle: "立即开始",
    home_ctaSubtitle: "为我们宝贝健康皮肤迈出第一步",
    home_freeTrialButton: "免费试用",
    home_footerTitle: "Talktail Care",
    home_footerSubtitle: "宠物皮肤健康的可靠伙伴",
    home_footerDescription: "利用AI技术守护宠物皮肤健康的智能解决方案。通过连接附近的动物医院，获得更好的治疗。",
    home_footerAccuracy: "准确率95%",
    home_footerHospitals: "500+合作医院",
    home_footerServices: "服务",
    home_footerAiAnalysis: "AI分析",
    home_footerDiseaseInfo: "疾病信息",
    home_footerHospitalFinder: "查找医院",
    home_footerCustomerSupport: "客户支持",
    home_footerFaq: "常见问题",
    home_footerUserGuide: "使用指南",
    home_footerCustomerCenter: "客户中心",
    home_footerPrivacyPolicy: "隐私政策",
    home_footerCopyright: "© 2024 Talktail Care. All rights reserved.",

    // Dog breed selector
    selectBreed: "请选择品种",

    skinOdorQuestion: "皮肤有异味吗？",
    yesGreasySmell: "O（是的，有油腥味或霉味）",
    noOdor: "X（无异味）",
    excessiveSheddingQuestion: "您的宠物是否过度掉毛？",
    yesHairLoss: "O（是的，观察到脱毛）",
    noExcessiveShedding: "X（无过度掉毛）",
    weightGainLethargyQuestion: "您的宠物是否体重增加或显得无精打采？",
    yesSuchSymptoms: "O（是的，有这样的症状）",
    noSuchSymptoms: "X（没有，没有这样的症状）",

    // Areas
    face: "面部",
    back: "背部",
    legs: "腿部",
    belly: "腹部",
    other: "其他",
    ears: "耳朵",
    eyeArea: "眼周",
    noseArea: "鼻周",
    mouthArea: "嘴周",
    snoutChin: "嘴部/下巴",
    neck: "颈部",
    shoulders: "肩部",
    upperBack: "上背部",
    lowerBack: "下背部",
    sides: "侧腹",
    frontLegs: "前腿",
    hindLegs: "后腿",
    paws: "爪子",
    betweenToes: "脚趾间",
    kneeJoint: "膝盖/关节",
    chest: "胸部",
    upperBelly: "上腹部",
    lowerBelly: "下腹部",
    groin: "腹股沟",
    tail: "尾巴",
    analArea: "肛门周围",
    wholebody: "全身",
    genitalArea: "生殖器周围",

    // Dog breeds
    goldenRetriever: "金毛寻回犬",
    labradorRetriever: "拉布拉多寻回犬",
    germanShepherd: "德国牧羊犬",
    beagle: "比格犬",
    bulldog: "斗牛犬",
    poodle: "贵宾犬",
    shibaInu: "柴犬",
    jindo: "珍岛犬",
    maltese: "马尔济斯",
    pomeranian: "博美",
    chihuahua: "吉娃娃",
    cockerSpaniel: "可卡犬",
    shihTzu: "西施犬",
    bichonFrise: "比熊",
    yorkshireTerrier: "约克夏",
    dachshund: "腊肠犬",
    husky: "哈士奇",
    rottweiler: "罗威纳",
    doberman: "杜宾犬",
    saintBernard: "圣伯纳",
    borderCollie: "边境牧羊犬",
    welshCorgi: "威尔士柯基",
    papillon: "蝴蝶犬",
    spitz: "博美犬",

    // Cat breeds
    persian: "波斯猫",
    russianBlue: "俄罗斯蓝猫",
    siamese: "暹罗猫",
    maineCoon: "缅因猫",
    britishShorthair: "英国短毛猫",
    americanShorthair: "美国短毛猫",
    bengal: "孟加拉猫",
    abyssinian: "阿比西尼亚猫",
    scottishFold: "苏格兰折耳猫",
    ragdoll: "布偶猫",
    norwegianForest: "挪威森林猫",
    turkishAngora: "土耳其安哥拉猫",
    siamCat: "暹罗猫",
    highlandFold: "高地折耳猫",
    sphinx: "斯芬克斯猫",

    // SkinAI.tsx - Process steps
    infoInput: "信息输入",
    photoUpload: "照片上传",
    diagnosisResult: "分析结果",
    basicInfo: "基本信息",
    symptomInput: "症状输入",

    // SkinAI.tsx - Loading messages
    aiAnalysisInProgress: "AI皮肤分析中",
    petSkinAnalysis: "正在分析{petName}的皮肤状态",
    advancedAiAnalysis: "高级AI算法正在对上传的图像进行精确分析，以提供准确的皮肤诊断",
    imageAnalysis: "图像分析",
    patternRecognition: "模式识别",
    // diagnosisComplete: "诊断完成"

    // Token related translations
    logoutSuccess: "已退出登录",
    tokenPurchase: "代币购买",
    tokenPurchaseDesc: "购买AI诊断所需的代币",
    tokenPackageStarter: "入门版",
    tokenPackageStarterDesc: "首次用户的基础套餐",
    tokenPackageStarterFeature1: "1次AI诊断",
    tokenPackageStandard: "标准版",
    tokenPackageStandardDesc: "最受欢迎的套餐",
    tokenPackageStandardFeature1: "5次AI诊断",
    tokenPackagePremium: "高级版",
    tokenPackagePremiumDesc: "重度用户的大容量套餐",
    tokenPackagePremiumFeature1: "10次AI诊断",
    tokenPackagePremiumFeature2: "高级疾病信息",
    orderCreationFailed: "订单创建失败",
    tokenRefreshFailed: "代币刷新失败。请重新登录。",
    tokenRefreshError: "代币刷新过程中发生错误。请重新登录。",
    paymentRequestError: "支付请求过程中发生错误。",
    errorDetails: "错误详情",
    unknownError: "未知错误",
    paymentCompleted: "支付完成！代币已充值。",
    paymentProcessingFailed: "支付处理失败",
    paymentProcessingError: "支付处理过程中发生错误",
    newMemberEvent: "开始 AI 疾病分析",
    firstPurchaseBenefit: "首次购买",
    discount20: "20%折扣",
    bonusTokens: "准确、快速、基于数据的 AI 诊断服务。",
    popular: "建议",
    tokens: "代币",
    purchase: "购买",
    tokenManagement: "代币管理",
    transactionHistory: "交易记录",
    completed: "已完成",
    paypalPayment: "PayPal支付",
    confirmRefund: "确定要退款吗？",
    refundSuccess: "退款成功！",
    refundFailed: "退款失败",
    refundError: "退款过程中发生错误。",
    refunding: "退款中...",
    refund: "退款",
    noTransactions: "没有已完成的交易记录。",

    // Date related translations
    year: "年",
    month: "月",
    previousYear: "上一年",
    nextYear: "下一年",
    previousMonth: "上个月",
    nextMonth: "下个月",
    cancel: "取消",
    confirm: "确认",

    // PurchaseSuccess.tsx
    purchaseSuccess_title: "支付完成！",
    purchaseSuccess_message: "谢谢。您的支付已成功处理。",
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Date formatting configurations for each language
const dateFormats = {
  ko: {
    display: 'YYYY-MM-DD',
    placeholder: 'YYYY-MM-DD',
    pattern: '\\d{4}-\\d{2}-\\d{2}',
    separator: '-'
  },
  en: {
    display: 'MM/DD/YYYY',
    placeholder: 'MM/DD/YYYY',
    pattern: '\\d{2}/\\d{2}/\\d{4}',
    separator: '/'
  },
  ja: {
    display: 'YYYY/MM/DD',
    placeholder: 'YYYY/MM/DD',
    pattern: '\\d{4}/\\d{2}/\\d{2}',
    separator: '/'
  },
  zh: {
    display: 'YYYY-MM-DD',
    placeholder: 'YYYY-MM-DD',
    pattern: '\\d{4}-\\d{2}-\\d{2}',
    separator: '-'
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, replacements?: Record<string, string>): string => {
    // @ts-expect-error: Allow dynamic key access for language codes, assuming translations object contains all valid languages
    const translation = translations[language]?.[key] || key;

    if (replacements && typeof translation === 'string') {
      let result = translation;
      Object.entries(replacements).forEach(([placeholder, value]) => {
        result = result.replace(`{${placeholder}}`, String(value));
      });
      return result;
    }

    return translation;
  };

  // Format date according to language preference
  const formatDate = (date: string, format: 'input' | 'display' = 'display'): string => {
    if (!date) return '';

    // If format is 'input', always return YYYY-MM-DD for HTML date input
    if (format === 'input') {
      if (date.includes('/')) {
        // Handle MM/DD/YYYY or YYYY/MM/DD formats
        const parts = date.split('/');
        if (language === 'en' && parts.length === 3) {
          // MM/DD/YYYY -> YYYY-MM-DD
          return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
        } else if (language === 'ja' && parts.length === 3) {
          // YYYY/MM/DD -> YYYY-MM-DD
          return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
        }
      } else if (date.includes('-')) {
        // YYYY-MM-DD remains the same
        return date;
      }
      // If invalid, return as is
      return date;
    }

    // For display format, convert from YYYY-MM-DD to language-specific format
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = date.match(dateRegex);

    if (!match) return date; // Return as is if not in expected format

    const [, year, month, day] = match;
    const config = dateFormats[language];

    switch (language) {
      case 'en':
        return `${month}/${day}/${year}`;
      case 'ja':
        return `${year}${config.separator}${month}${config.separator}${day}`;
      case 'ko':
      case 'zh':
        return `${year}-${month}-${day}`;
      default:
        return date;
    }
  };

  // Parse user input and convert to YYYY-MM-DD format for storage
  const parseDateInput = (dateString: string): string => {
    if (!dateString) return '';

    const config = dateFormats[language];

    // Remove any non-numeric characters except separators
    const cleaned = dateString.replace(/[^\d\/\-]/g, '');

    if (language === 'en' && cleaned.includes('/')) {
      // Handle MM/DD/YYYY format
      const parts = cleaned.split('/');
      if (parts.length === 3) {
        const month = parts[0].padStart(2, '0');
        const day = parts[1].padStart(2, '0');
        const year = parts[2];
        if (year.length === 4) {
          return `${year}-${month}-${day}`;
        }
      }
    } else if (language === 'ja' && cleaned.includes('/')) {
      // Handle YYYY/MM/DD format
      const parts = cleaned.split('/');
      if (parts.length === 3) {
        const year = parts[0];
        const month = parts[1].padStart(2, '0');
        const day = parts[2].padStart(2, '0');
        if (year.length === 4) {
          return `${year}-${month}-${day}`;
        }
      }
    } else if (cleaned.includes('-')) {
      // Handle YYYY-MM-DD format (for 'ko' and 'zh')
      const parts = cleaned.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const month = parts[1].padStart(2, '0');
        const day = parts[2].padStart(2, '0');
        if (year.length === 4) {
          return `${year}-${month}-${day}`;
        }
      }
    }

    // If parsing fails, return original string (with potential validation error handling in UI)
    return dateString;
  };

  const getDatePlaceholder = (): string => {
    return dateFormats[language].placeholder;
  };

  const getDateFormatPattern = (): string => {
    return dateFormats[language].pattern;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      formatDate,
      parseDateInput,
      getDatePlaceholder,
      getDateFormatPattern
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};