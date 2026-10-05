import { GlobeAltIcon } from "@heroicons/react/24/solid";
import { languageLabels } from "../i18n";
import { useTranslation } from "../i18n/useTranslation";

interface LanguageToggleProps {
  className?: string;
}

function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { language, toggleLanguage } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-2 bg-transparent text-md font-semibold text-gray-900 transition-colors hover:text-primary ${className}`}
      aria-label="Toggle language"
    >
      <GlobeAltIcon className="h-8 w-8" aria-hidden="true" />
      <span>{languageLabels[language]}</span>
    </button>
  );
}

export default LanguageToggle;
