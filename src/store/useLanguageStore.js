import { create } from "zustand";

const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("pced-lang") || "ar";
  }
  return "ar";
};

const useLanguageStore = create((set) => ({
  language: getInitialLanguage(),
  dir: getInitialLanguage() === "ar" ? "rtl" : "ltr",

  setLanguage: (lang) => {
    localStorage.setItem("pced-lang", lang);
    set({
      language: lang,
      dir: lang === "ar" ? "rtl" : "ltr",
    });
  },
}));

export default useLanguageStore;
