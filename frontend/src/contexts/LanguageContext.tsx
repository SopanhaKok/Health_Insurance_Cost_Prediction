import _ from "lodash";
import { createContext, FC, useContext, useEffect, useState } from "react";
import enLang from "locales/en.json";
import khLang from "locales/kh.json";
import chLang from "locales/ch.json";
import { settingsActions, useSettingsSelector } from "redux/slices/setting";
import { useDispatch } from "react-redux";
import { ReactNode } from "react";

const locales = {
  en: enLang,
  kh: khLang,
  ch: chLang,
};

type LangType = "en" | "kh" | "ch";

type LangObject = {
  key: LangType;
  icon: string;
  label: string;
};

export const languages: Record<string, LangObject> = {
  en: {
    key: "en",
    icon: "/static/flags/en.png",
    label: "English",
  },
  kh: {
    key: "kh",
    icon: "/static/flags/kh.png",
    label: "Khmer",
  },
  ch: {
    key: "ch",
    icon: "/static/flags/ch.png",
    label: "Chinese",
  },
};

export type InitLanguageContext = {
  t: (_text: string) => string;
  currentLang: LangObject;
  onChangeLang: (_lang: LangType) => void;
};

export const LanguageContext = createContext<InitLanguageContext | null>(null);

export const useLanguage = () =>
  useContext(LanguageContext) as InitLanguageContext;

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { lang } = useSettingsSelector();
  const dispatch = useDispatch();

  const t = (text: string) => {
    const translate = _.get(locales[lang.key], text, text);

    return translate;
  };

  const onChangeLang = (lang: LangType) => {
    dispatch(settingsActions.setLang(languages[lang]));
  };

  const initLanguageContext: InitLanguageContext = {
    t,
    currentLang: lang,
    onChangeLang,
  };

  return (
    <LanguageContext.Provider value={initLanguageContext}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
