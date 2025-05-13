import { useRef, useState } from "react";
import { Locale, useTranslation } from "../../contexts/TranslationProvider";
import useClickOutside from "../hooks/useClickOutside";

export default function LanguageSwitcher() {
  const { changeLanguage, locale, getFlag } = useTranslation();
  const languageRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useClickOutside(() => setIsOpen(false), [languageRef]);

  const [isOpen, setIsOpen] = useState(false);

  const handleFlag = (value: Locale) => {
    changeLanguage(value);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-[100] backdrop-blur-md shadow-lg rounded-t-xl overflow-hidden">
      <div className="relative">
        <div
          className="actual-language cursor-pointer w-full py-2 px-4 bg-white border-b border-gray-300 text-xl text-center"
          ref={languageRef}
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: isOpen ? "default" : "pointer" }}
        >
          {getFlag(locale)}
        </div>
        {isOpen && (
          <div
            className="languages-content-container w-full bg-white shadow-lg flex flex-col items-start"
            ref={modalRef}
          >
            <button
              disabled={locale === "fr"}
              onClick={() => handleFlag("fr")}
              className="w-full py-2 px-4 text-xl hover:bg-gray-200 disabled:cursor-not-allowed"
              style={{ cursor: locale === "fr" ? "not-allowed" : "pointer" }}
            >
              🇫🇷
            </button>

            <button
              disabled={locale === "en"}
              onClick={() => handleFlag("en")}
              className="w-full py-2 px-4 text-xl hover:bg-gray-200 disabled:cursor-not-allowed"
              style={{ cursor: locale === "en" ? "not-allowed" : "pointer" }}
            >
              🇬🇧
            </button>

            <button
              disabled={locale === "it"}
              onClick={() => handleFlag("it")}
              className="w-full py-2 px-4 text-xl hover:bg-gray-200 disabled:cursor-not-allowed"
              style={{ cursor: locale === "it" ? "not-allowed" : "pointer" }}
            >
              🇮🇹
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
