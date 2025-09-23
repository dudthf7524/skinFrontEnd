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
    appTitle: "펫케어 AI",
    appSubtitle: "반려동물 피부 진단 도우미",
    stepQuestionnaire: "반려동물 정보 & 증상 입력",
    stepUpload: "사진 업로드",
    stepDiagnosis: "진단 결과",
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
    newDiagnosis: "새로운 진단 시작하기",
    disclaimer: "펫케어 AI는 참고용이며, 정확한 진단은 수의사와 상담하세요.",

    // Navbar.tsx
    home: "홈",
    aiAnalysis: "AI 분석",
    diseaseInfo: "질병 정보",
    hospitalSearch: "병원 찾기",
    myRecord: "내 기록",
    login: "로그인",
    diagnoseNow: "지금 진단하기",
    languageSelect: "언어 선택",

    // DiseaseInfoPage.tsx
    skinDiseaseInfo: "피부 질병 정보",
    skinDiseaseDescription: "반려동물에게 흔한 피부 질병들에 대해 알아보세요",
    consultVetNote: "정확한 진단은 전문 수의사와 상담하세요",
    mainSymptoms: "주요 증상",
    viewDetails: "자세히 보기",
    severity: "심각도",
    prevalence: "발생빈도",
    high: "높음",
    medium: "중간",
    low: "낮음",
    common: "흔함",
    normal: "보통",
    rare: "드뭄",

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
    accurateInfo: "정확한 진단을 위해 자세히 작성해 주세요",
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
    selectedSymptoms: "선택된 증상 ({count}개)",
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
    upload_cropReady: "크롭하여 진단 준비",
    upload_cropCompleted: "크롭 완료",
    upload_optimized: "224x224 크기로 최적화됨",
    upload_cropNeeded: "이미지 크롭 필요",
    upload_cropDescription: "정확한 진단을 위해 병변 부위를 224x224 크기로 크롭해주세요",
    upload_cropButton: "크롭하기",
    upload_diagnosisReady: "진단 준비 완료!",
    upload_imageOptimized: "이미지가 224x224 크기로 최적화되었습니다. AI 진단을 시작하세요.",
    upload_startDiagnosis: "진단하기",
    upload_photographyGuide: "촬영 가이드",
    upload_guideBrightLight: "밝은 자연광에서 촬영해 주세요",
    upload_guideClearCapture: "병변 부위를 선명하게 포착해 주세요",
    upload_guideCloseShot: "흔들림 없이 근접 촬영해 주세요",
    upload_cropModal_title: "이미지 크롭",
    upload_cropModal_description: "병변 부위를 정사각형 영역으로 선택해주세요. 최종 이미지는 224x224 크기로 변환됩니다.",
    upload_cropModal_imageAlt: "크롭할 이미지",
    upload_cropModal_cancel: "취소",
    upload_cropModal_complete: "크롭 완료",
    upload_backToPrevious: "이전 단계로",
    upload_errorImageOnly: "이미지 파일만 업로드 가능합니다.",
    upload_errorFileSize: "파일 크기가 10MB를 초과합니다. 더 작은 파일을 선택해주세요.",
    skinOdorQuestion: "피부에서 냄새가 납니까?",
    yesGreasySmell: "O (네, 기름기나 곰팡이 냄새가 남)",
    noOdor: "X (냄새 없음)",
    excessiveSheddingQuestion: "털이 과도하게 빠집니까?",
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
    
    // Dog breeds
    goldenRetriever: "골든 리트리버",
    labradorRetriever: "래브라도 리트리버",
    germanShepherd: "독일 셰퍼드",
    beagle: "비글",
    bulldog: "불독",
    poodle: "푸들",
    shibaInu: "시바 이누",
    jindo: "진돗개",
    maltese: "말티즈",
    pomeranian: "포메라니안",
    chihuahua: "치와와",
    cockerSpaniel: "코카 스파니엘",
    shihTzu: "시츄",
    bichonFrise: "비숑 프리제",
    yorkshireTerrier: "요크셔 테리어",
    dachshund: "닥스훈트",
    husky: "허스키",
    rottweiler: "로트와일러",
    doberman: "도베르만",
    saintBernard: "세인트 버나드",
    borderCollie: "보더 콜리",
    welshCorgi: "웰시 코기",
    papillon: "파피용",
    spitz: "스피츠",
    
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
    sphinx: "스핑크스"
  },
  
  en: {
    // App.tsx
    appTitle: "Pet Care AI",
    appSubtitle: "Pet Skin Diagnosis Assistant",
    stepQuestionnaire: "Pet Info & Symptoms",
    stepUpload: "Photo Upload",
    stepDiagnosis: "Diagnosis Result",
    stepHospitals: "Hospital Recommendation",
    stepComplete: "Complete",
    aiAnalyzing: "AI is analyzing {petName}'s skin condition",
    aiAnalyzingGeneric: "AI is analyzing your pet's skin condition",
    analysisDescription: "Preparing accurate diagnosis by combining questionnaire and photos...",
    diagnosisComplete: "Diagnosis completed!",
    diagnosisThankYou: "🐾 Thank you for checking {petName}'s skin health!",
    visitRecommendation: "Please visit recommended hospitals for accurate treatment if needed.",
    resultSent: "📬 Results have been sent successfully",
    emailCheck: "Please check your email for additional information to help with pet health care.",
    aiSolution: "✨ Experience better pet care with smart AI solutions from GPTOnline.ai",
    newDiagnosis: "Start New Diagnosis",
    disclaimer: " Pet Care AI is for reference only. Please consult a veterinarian for accurate diagnosis.",

    // Navbar.tsx
    home: "Home",
    aiAnalysis: "AI Analysis",
    diseaseInfo: "Disease Info",
    hospitalSearch: "Find Hospital",
    myRecord: "My Record",
    login: "Login",
    diagnoseNow: "Diagnose Now",
    languageSelect: "Language Selection",

    // DiseaseInfoPage.tsx
    skinDiseaseInfo: "Skin Disease Information",
    skinDiseaseDescription: "Learn about common skin diseases in pets",
    consultVetNote: "Consult a professional veterinarian for accurate diagnosis",
    mainSymptoms: "Main Symptoms",
    viewDetails: "View Details",
    severity: "Severity",
    prevalence: "Prevalence",
    high: "High",
    medium: "Medium",
    low: "Low",
    common: "Common",
    normal: "Normal",
    rare: "Rare",

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
    accurateInfo: "Please provide detailed information for accurate diagnosis",
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
    selectedSymptoms: "Selected symptoms ({count})",
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
    upload_cropReady: "Ready for crop and diagnosis",
    upload_cropCompleted: "Crop Complete",
    upload_optimized: "Optimized to 224x224 size",
    upload_cropNeeded: "Image Crop Required",
    upload_cropDescription: "Please crop the lesion area to 224x224 size for accurate diagnosis",
    upload_cropButton: "Crop",
    upload_diagnosisReady: "Ready for Diagnosis!",
    upload_imageOptimized: "Image has been optimized to 224x224 size. Start AI diagnosis.",
    upload_startDiagnosis: "Start Diagnosis",
    upload_photographyGuide: "Photography Guide",
    upload_guideBrightLight: "Please shoot in bright natural light",
    upload_guideClearCapture: "Capture the lesion area clearly",
    upload_guideCloseShot: "Take close-up shots without shaking",
    upload_cropModal_title: "Image Crop",
    upload_cropModal_description: "Please select the lesion area as a square region. The final image will be converted to 224x224 size.",
    upload_cropModal_imageAlt: "Image to crop",
    upload_cropModal_cancel: "Cancel",
    upload_cropModal_complete: "Crop Complete",
    upload_backToPrevious: "Previous Step",
    upload_errorImageOnly: "Only image files can be uploaded.",
    upload_errorFileSize: "File size exceeds 10MB. Please select a smaller file.",
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
    sphinx: "Sphinx"
  },
  
  ja: {
    // App.tsx
    appTitle: "ペットケア AI",
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
    disclaimer: " ペットケアAIは参考用です。正確な診断は獣医師にご相談ください。",

    // Navbar.tsx
    home: "ホーム",
    aiAnalysis: "AI分析",
    diseaseInfo: "疾病情報",
    hospitalSearch: "病院検索",
    myRecord: "記録",
    login: "ログイン",
    diagnoseNow: "今すぐ診断",
    languageSelect: "言語選択",

    // DiseaseInfoPage.tsx
    skinDiseaseInfo: "皮膚疾患情報",
    skinDiseaseDescription: "ペットによくある皮膚疾患について学びましょう",
    consultVetNote: "正確な診断は専門獣医師にご相談ください",
    mainSymptoms: "主な症状",
    viewDetails: "詳細を見る",
    severity: "重症度",
    prevalence: "発生頻度",
    high: "高い",
    medium: "中程度",
    low: "低い",
    common: "よくある",
    normal: "普通",
    rare: "まれ",

    // Disease names and descriptions
    papulesPlaquesName: "丘疹、プラーク",
    papulesPlaquesDesc: "アレルギーや細菌感染により発生する可能性のある疾患です。",
    papulesPlaquesSymptoms: ["かゆみ", "赤み", "脱毛", "角質・フケ", "分泌物・かさぶた"],

    epithelialCollarsName: "上皮環状物（フケ、角質）",
    epithelialCollarsDesc: "真菌感染によってほとんど発生する疾患で、フケや角質などに関連する疾患の一部として現れることがあります。",
    epithelialCollarsSymptoms: ["かゆみ", "かさぶた", "乾燥", "輪状の赤い斑点"],

    lichenificationName: "苔癬化、過色素沈着",
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
    accurateInfo: "正確な診断のために詳しくご記入ください",
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
    selectedSymptoms: "選択された症状 ({count}個)",
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
    upload_cropModal_description: "病変部位を正方形領域で選択してください。最終画像は224x224サイズに変換されます。",
    upload_cropModal_imageAlt: "クロップする画像",
    upload_cropModal_cancel: "キャンセル",
    upload_cropModal_complete: "クロップ完了",
    upload_backToPrevious: "前のステップへ",
    upload_errorImageOnly: "画像ファイルのみアップロード可能です。",
    upload_errorFileSize: "ファイルサイズが10MBを超えています。より小さなファイルを選択してください。",
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
    sphinx: "スフィンクス"
  },
  
  zh: {
    // App.tsx
    appTitle: "宠物护理 AI",
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
    disclaimer: " 宠物护理AI仅供参考，准确诊断请咨询兽医。",

    // Navbar.tsx
    home: "首页",
    aiAnalysis: "AI分析",
    diseaseInfo: "疾病信息",
    hospitalSearch: "找医院",
    myRecord: "我的记录",
    login: "登录",
    diagnoseNow: "立即诊断",
    languageSelect: "语言选择",

    // DiseaseInfoPage.tsx
    skinDiseaseInfo: "皮肤疾病信息",
    skinDiseaseDescription: "了解宠物常见皮肤疾病",
    consultVetNote: "准确诊断请咨询专业兽医",
    mainSymptoms: "主要症状",
    viewDetails: "查看详情",
    severity: "严重程度",
    prevalence: "发生频率",
    high: "高",
    medium: "中等",
    low: "低",
    common: "常见",
    normal: "一般",
    rare: "罕见",

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
    selectedSymptoms: "选择的症状 ({count}个)",
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
    upload_cropModal_description: "请将病变部位选择为正方形区域。最终图像将转换为224x224尺寸。",
    upload_cropModal_imageAlt: "要裁剪的图像",
    upload_cropModal_cancel: "取消",
    upload_cropModal_complete: "裁剪完成",
    upload_backToPrevious: "上一步",
    upload_errorImageOnly: "只能上传图像文件。",
    upload_errorFileSize: "文件大小超过10MB。请选择更小的文件。",
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
    sphinx: "斯芬克斯猫"
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
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string, replacements?: Record<string, string>): string => {
    let translation = translations[language][key] || key;
    
    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        translation = translation.replace(`{${placeholder}}`, value);
      });
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
        } else if ((language === 'ja' || language === 'zh') && parts.length === 3) {
          // YYYY/MM/DD -> YYYY-MM-DD
          return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
        }
      }
      // If already in YYYY-MM-DD format or invalid, return as is
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
      case 'zh':
        return `${year}${config.separator}${month}${config.separator}${day}`;
      case 'ko':
      default:
        return `${year}-${month}-${day}`;
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
    } else if ((language === 'ja' || language === 'zh') && cleaned.includes('/')) {
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
      // Handle YYYY-MM-DD format (Korean and Chinese)
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
    
    return dateString; // Return original if parsing fails
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