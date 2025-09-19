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
    disclaimer: "💡 펫케어 AI는 참고용이며, 정확한 진단은 수의사와 상담하세요.",
    
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
    mainSymptoms: "주요 증상 (Main Symptoms)",
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
    disclaimer: "💡 Pet Care AI is for reference only. Please consult a veterinarian for accurate diagnosis.",
    
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
    mainSymptoms: "Main Symptoms",
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
    disclaimer: "💡 ペットケアAIは参考用です。正確な診断は獣医師にご相談ください。",
    
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
    mainSymptoms: "主な症状",
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
    disclaimer: "💡 宠物护理AI仅供参考，准确诊断请咨询兽医。",
    
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
    mainSymptoms: "主要症状",
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