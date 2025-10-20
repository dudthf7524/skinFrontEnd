import { useLanguage } from "../context/LanguageContext";
import { diseaseTranslations } from "../constants/diseaseTranslations";

export const useTranslateDisease = () => {
  const { lang } = useLanguage();

  const translateDisease = (key?: string): string => {
    if (!key) return "";
    const entry = diseaseTranslations[key];
    if (entry) return entry[lang] ?? entry.en;
    return key; // 매핑 없으면 영어 그대로 표시
  };

  return { translateDisease };
};
