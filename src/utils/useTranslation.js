import useLanguageStore from "../store/useLanguageStore";
import ar from "../translations/ar.json";
import en from "../translations/en.json";

const translations = { ar, en };

export function useTranslation() {
  const language = useLanguageStore((state) => state.language);
  const dir = useLanguageStore((state) => state.dir);

  const t = (key) => {
    return translations[language]?.[key] || translations["ar"]?.[key] || key;
  };

  return { t, language, dir };
}
