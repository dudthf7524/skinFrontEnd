import { useLanguage } from "./LanguageContext";

// 주요 품종들의 번역 데이터 (한글 키 -> 다국어 번역)
// 나머지 품종들은 점진적으로 추가 가능
export const allBreedTranslations = {
  ko: {
    // 주요 인기 품종들
    "골든 리트리버": "골든 리트리버",
    "래브라도 리트리버": "래브라도 리트리버",
    "비글": "비글",
    "불도그": "불도그",
    "푸들": "푸들",
    "시바": "시바",
    "시바견": "시바견",
    "보더 콜리": "보더 콜리",
    "말티즈": "말티즈",
    "저먼 셰퍼드 도그": "저먼 셰퍼드 도그",
    "치와와": "치와와",
    "요크셔 테리어": "요크셔 테리어",
    "포메라니안": "포메라니안",
    "닥스훈트": "닥스훈트",
    "로트와일러": "로트와일러",
    "시베리안 허스키": "시베리안 허스키",
    "시베리언 허스키": "시베리언 허스키",
    "그레이트 데인": "그레이트 데인",
    "도베르만": "도베르만",
    "샤페이": "샤페이",
    "시츄": "시츄",
    "시추": "시추",
    "복서": "복서",
    "잉글리시 불도그": "잉글리시 불도그",
    "프렌치 불도그": "프렌치 불도그",
    "잉글리시 세터": "잉글리시 세터",
    "아키다": "아키다",
    "아키타견": "아키타견",
    "진돗개": "진돗개",
    "삽살개": "삽살개",
    "풍산개": "풍산개",
    "제주개": "제주개",
    "셰틀랜드 쉽도그": "셰틀랜드 쉽도그",
    "콜리": "콜리",
    "바셋 하운드": "바셋 하운드",
    "바셋하운드": "바셋하운드",
    "비숑 프리제": "비숑 프리제",
    "차우 차우": "차우 차우",
    "차우차우": "차우차우",
    // 기타는 마지막에
    "기타": "기타"
  },
  en: {
    "골든 리트리버": "Golden Retriever",
    "래브라도 리트리버": "Labrador Retriever",
    "비글": "Beagle",
    "불도그": "Bulldog",
    "푸들": "Poodle",
    "시바": "Shiba Inu",
    "시바견": "Shiba Inu",
    "보더 콜리": "Border Collie",
    "말티즈": "Maltese",
    "저먼 셰퍼드 도그": "German Shepherd Dog",
    "치와와": "Chihuahua",
    "요크셔 테리어": "Yorkshire Terrier",
    "포메라니안": "Pomeranian",
    "닥스훈트": "Dachshund",
    "로트와일러": "Rottweiler",
    "시베리안 허스키": "Siberian Husky",
    "시베리언 허스키": "Siberian Husky",
    "그레이트 데인": "Great Dane",
    "도베르만": "Doberman Pinscher",
    "샤페이": "Shar Pei",
    "시츄": "Shih Tzu",
    "시추": "Shih Tzu",
    "복서": "Boxer",
    "잉글리시 불도그": "English Bulldog",
    "프렌치 불도그": "French Bulldog",
    "잉글리시 세터": "English Setter",
    "아키다": "Akita",
    "아키타견": "Akita",
    "진돗개": "Jindo Dog",
    "삽살개": "Sapsaree",
    "풍산개": "Pungsan Dog",
    "제주개": "Jeju Dog",
    "셰틀랜드 쉽도그": "Shetland Sheepdog",
    "콜리": "Collie",
    "바셋 하운드": "Basset Hound",
    "바셋하운드": "Basset Hound",
    "비숑 프리제": "Bichon Frise",
    "차우 차우": "Chow Chow",
    "차우차우": "Chow Chow",
    "기타": "Other"
  },
  ja: {
    "골든 리트리버": "ゴールデンレトリバー",
    "래브라도 리트리버": "ラブラドールレトリバー",
    "비글": "ビーグル",
    "불도그": "ブルドッグ",
    "푸들": "プードル",
    "시바": "柴犬",
    "시바견": "柴犬",
    "보더 콜리": "ボーダーコリー",
    "말티즈": "マルチーズ",
    "저먼 셰퍼드 도그": "ジャーマンシェパードドッグ",
    "치와와": "チワワ",
    "요크셔 테리어": "ヨークシャーテリア",
    "포메라니안": "ポメラニアン",
    "닥스훈트": "ダックスフンド",
    "로트와일러": "ロットワイラー",
    "시베리안 허스키": "シベリアンハスキー",
    "시베리언 허스키": "シベリアンハスキー",
    "그레이트 데인": "グレートデーン",
    "도베르만": "ドーベルマン",
    "샤페이": "シャーペイ",
    "시츄": "シーズー",
    "시추": "シーズー",
    "복서": "ボクサー",
    "잉글리시 불도그": "イングリッシュブルドッグ",
    "프렌치 불도그": "フレンチブルドッグ",
    "잉글리시 세터": "イングリッシュセター",
    "아키다": "秋田犬",
    "아키타견": "秋田犬",
    "진돗개": "珍島犬",
    "삽살개": "サプサリ",
    "풍산개": "豊山犬",
    "제주개": "済州犬",
    "셰틀랜드 쉽도그": "シェットランドシープドッグ",
    "콜리": "コリー",
    "바셋 하운드": "バセットハウンド",
    "바셋하운드": "バセットハウンド",
    "비숑 프리제": "ビションフリーゼ",
    "차우 차우": "チャウチャウ",
    "차우차우": "チャウチャウ",
    "기타": "その他"
  },
  zh: {
    "골든 리트리버": "金毛寻回犬",
    "래브라도 리트리버": "拉布拉多寻回犬",
    "비글": "比格犬",
    "불도그": "斗牛犬",
    "푸들": "贵宾犬",
    "시바": "柴犬",
    "시바견": "柴犬",
    "보더 콜리": "边境牧羊犬",
    "말티즈": "马尔济斯犬",
    "저먼 셰퍼드 도그": "德国牧羊犬",
    "치와와": "吉娃娃",
    "요크셔 테리어": "约克夏梗",
    "포메라니안": "博美犬",
    "닥스훈트": "腊肠犬",
    "로트와일러": "罗威纳犬",
    "시베리안 허스키": "西伯利亚哈士奇",
    "시베리언 허스키": "西伯利亚哈士奇",
    "그레이트 데인": "大丹犬",
    "도베르만": "杜宾犬",
    "샤페이": "沙皮犬",
    "시츄": "西施犬",
    "시추": "西施犬",
    "복서": "拳师犬",
    "잉글리시 불도그": "英国斗牛犬",
    "프렌치 불도그": "法国斗牛犬",
    "잉글리시 세터": "英国塞特犬",
    "아키다": "秋田犬",
    "아키타견": "秋田犬",
    "진돗개": "珍岛犬",
    "삽살개": "萨普萨里犬",
    "풍산개": "丰山犬",
    "제주개": "济州犬",
    "셰틀랜드 쉽도그": "设得兰牧羊犬",
    "콜리": "牧羊犬",
    "바셋 하운드": "巴吉度猎犬",
    "바셋하운드": "巴吉度猎犬",
    "비숑 프리제": "比熊犬",
    "차우 차우": "松狮犬",
    "차우차우": "松狮犬",
    "기타": "其他"
  }
};

// 모든 품종 번역 훅
export const useAllBreedTranslation = () => {
  const { language } = useLanguage();

  // 한글 품종명을 현재 언어로 번역 (없으면 원본 반환)
  const translateBreed = (koreanBreed: string): string => {
    const translations = allBreedTranslations[language as keyof typeof allBreedTranslations];
    return translations?.[koreanBreed] || koreanBreed;
  };

  // 번역된 품종명을 한글로 역변환 (백엔드 전송용)
  const getKoreanBreed = (translatedBreed: string): string => {
    const currentLangTranslations = allBreedTranslations[language as keyof typeof allBreedTranslations];
    if (!currentLangTranslations) return translatedBreed;

    for (const [korean, translated] of Object.entries(currentLangTranslations)) {
      if (translated === translatedBreed) {
        return korean;
      }
    }
    return translatedBreed; // 못찾으면 원본 반환
  };

  // 품종 목록을 번역해서 반환
  const translateBreedList = (koreanBreeds: string[]): string[] => {
    return koreanBreeds.map(breed => translateBreed(breed));
  };

  // 검색어로 필터링 (번역된 품종명으로 검색)
  const filterBreedsBySearch = (koreanBreeds: string[], searchTerm: string): string[] => {
    if (!searchTerm.trim()) return koreanBreeds;

    return koreanBreeds.filter(breed => {
      const translatedBreed = translateBreed(breed);
      return (
        breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        translatedBreed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  return {
    translateBreed,
    getKoreanBreed,
    translateBreedList,
    filterBreedsBySearch
  };
};

// 품종 표시 컴포넌트 (읽기 전용) - 기존 컴포넌트에서 사용
interface BreedDisplayProps {
  breed: string; // 한글 품종명
  className?: string;
}

export const BreedDisplay: React.FC<BreedDisplayProps> = ({
  breed,
  className = ""
}) => {
  const { translateBreed } = useAllBreedTranslation();

  return (
    <span className={className}>
      {translateBreed(breed)}
    </span>
  );
};