import { useLanguage } from "./LanguageContext";

// 개 품종 번역 데이터 (한글 키 -> 다국어 번역)
export const dogBreedTranslations = {
  ko: {
    "골든 리트리버": "골든 리트리버",
    "래브라도 리트리버": "래브라도 리트리버",
    "비글": "비글",
    "불독": "불독",
    "푸들": "푸들",
    "시바 이누": "시바 이누",
    "보더 콜리": "보더 콜리",
    "말티즈": "말티즈",
    "저먼 셰퍼드": "저먼 셰퍼드",
    "치와와": "치와와",
    "요크셔 테리어": "요크셔 테리어",
    "포메라니안": "포메라니안",
    "닥스훈트": "닥스훈트",
    "로트와일러": "로트와일러",
    "허스키": "허스키",
    "그레이트 데인": "그레이트 데인",
    "도베르만": "도베르만",
    "샤페이": "샤페이",
    "시츄": "시츄",
    "코커 스패니얼": "코커 스패니얼",
    "바셋 하운드": "바셋 하운드",
    "복서": "복서",
    "잉글리시 불독": "잉글리시 불독",
    "프렌치 불독": "프렌치 불독",
    "기타": "기타"
  },
  en: {
    "골든 리트리버": "Golden Retriever",
    "래브라도 리트리버": "Labrador Retriever",
    "비글": "Beagle",
    "불독": "Bulldog",
    "푸들": "Poodle",
    "시바 이누": "Shiba Inu",
    "보더 콜리": "Border Collie",
    "말티즈": "Maltese",
    "저먼 셰퍼드": "German Shepherd",
    "치와와": "Chihuahua",
    "요크셔 테리어": "Yorkshire Terrier",
    "포메라니안": "Pomeranian",
    "닥스훈트": "Dachshund",
    "로트와일러": "Rottweiler",
    "허스키": "Husky",
    "그레이트 데인": "Great Dane",
    "도베르만": "Doberman",
    "샤페이": "Shar Pei",
    "시츄": "Shih Tzu",
    "코커 스패니얼": "Cocker Spaniel",
    "바셋 하운드": "Basset Hound",
    "복서": "Boxer",
    "잉글리시 불독": "English Bulldog",
    "프렌치 불독": "French Bulldog",
    "기타": "Other"
  },
  ja: {
    "골든 리트리버": "ゴールデンレトリバー",
    "래브라도 리트리버": "ラブラドールレトリバー",
    "비글": "ビーグル",
    "불독": "ブルドッグ",
    "푸들": "プードル",
    "시바 이누": "柴犬",
    "보더 콜리": "ボーダーコリー",
    "말티즈": "マルチーズ",
    "저먼 셰퍼드": "ジャーマンシェパード",
    "치와와": "チワワ",
    "요크셔 테리어": "ヨークシャーテリア",
    "포메라니안": "ポメラニアン",
    "닥스훈트": "ダックスフンド",
    "로트와일러": "ロットワイラー",
    "허스키": "ハスキー",
    "그레이트 데인": "グレートデーン",
    "도베르만": "ドーベルマン",
    "샤페이": "シャーペイ",
    "시츄": "シーズー",
    "코커 스패니얼": "コッカースパニエル",
    "바셋 하운드": "バセットハウンド",
    "복서": "ボクサー",
    "잉글리시 불독": "イングリッシュブルドッグ",
    "프렌치 불독": "フレンチブルドッグ",
    "기타": "その他"
  },
  zh: {
    "골든 리트리버": "金毛寻回犬",
    "래브라도 리트리버": "拉布拉多寻回犬",
    "비글": "比格犬",
    "불독": "斗牛犬",
    "푸들": "贵宾犬",
    "시바 이누": "柴犬",
    "보더 콜리": "边境牧羊犬",
    "말티즈": "马尔济斯犬",
    "저먼 셰퍼드": "德国牧羊犬",
    "치와와": "吉娃娃",
    "요크셔 테리어": "约克夏梗",
    "포메라니안": "博美犬",
    "닥스훈트": "腊肠犬",
    "로트와일러": "罗威纳犬",
    "허스키": "哈士奇",
    "그레이트 데인": "大丹犬",
    "도베르만": "杜宾犬",
    "샤페이": "沙皮犬",
    "시츄": "西施犬",
    "코커 스패니얼": "可卡犬",
    "바셋 하운드": "巴吉度猎犬",
    "복서": "拳师犬",
    "잉글리시 불독": "英国斗牛犬",
    "프렌치 불독": "法国斗牛犬",
    "기타": "其他"
  }
};

// 개 품종 번역 훅
export const useDogBreedTranslation = () => {
  const { language } = useLanguage();

  // 한글 품종명을 현재 언어로 번역
  const translateBreed = (koreanBreed: string): string => {
    return dogBreedTranslations[language as keyof typeof dogBreedTranslations]?.[koreanBreed] || koreanBreed;
  };

  // 번역된 품종명을 한글로 역변환 (백엔드 전송용)
  const getKoreanBreed = (translatedBreed: string): string => {
    for (const [korean, translated] of Object.entries(dogBreedTranslations[language as keyof typeof dogBreedTranslations] || {})) {
      if (translated === translatedBreed) {
        return korean;
      }
    }
    return translatedBreed; // 못찾으면 원본 반환
  };

  // 현재 언어의 모든 품종 목록 (번역된 상태)
  const getTranslatedBreeds = (): Array<{korean: string, translated: string}> => {
    const breeds = dogBreedTranslations[language as keyof typeof dogBreedTranslations] || dogBreedTranslations.ko;
    return Object.entries(breeds).map(([korean, translated]) => ({
      korean,
      translated
    }));
  };

  return {
    translateBreed,
    getKoreanBreed,
    getTranslatedBreeds
  };
};

// 품종 선택 컴포넌트
interface DogBreedSelectorProps {
  value: string; // 한글 품종명
  onChange: (koreanBreed: string) => void; // 한글 품종명을 콜백으로 전달
  placeholder?: string;
  className?: string;
}

export const DogBreedSelector: React.FC<DogBreedSelectorProps> = ({
  value,
  onChange,
  placeholder = "품종을 선택하세요",
  className = ""
}) => {
  const { translateBreed, getKoreanBreed, getTranslatedBreeds } = useDogBreedTranslation();
  const { t } = useLanguage();

  const breeds = getTranslatedBreeds();
  const translatedValue = translateBreed(value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const translatedBreed = e.target.value;
    const koreanBreed = getKoreanBreed(translatedBreed);
    onChange(koreanBreed); // 항상 한글 품종명을 전달
  };

  return (
    <select
      value={translatedValue}
      onChange={handleChange}
      className={className}
    >
      <option value="">{t("selectBreed") || placeholder}</option>
      {breeds.map(({ korean, translated }) => (
        <option key={korean} value={translated}>
          {translated}
        </option>
      ))}
    </select>
  );
};

// 품종 표시 컴포넌트 (읽기 전용)
interface DogBreedDisplayProps {
  breed: string; // 한글 품종명
  className?: string;
}

export const DogBreedDisplay: React.FC<DogBreedDisplayProps> = ({
  breed,
  className = ""
}) => {
  const { translateBreed } = useDogBreedTranslation();

  return (
    <span className={className}>
      {translateBreed(breed)}
    </span>
  );
};