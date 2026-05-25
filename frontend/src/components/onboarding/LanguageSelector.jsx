import React from 'react';
import { FaX } from 'react-icons/fa';

export default function LanguageSelector({ value = [], onChange, languages }) {
  const handleToggle = (language) => {
    if (value.includes(language)) {
      onChange(value.filter((l) => l !== language));
    } else {
      onChange([...value, language]);
    }
  };

  return (
    <div className="space-y-3">
      {/* Selected languages */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((language) => (
            <div
              key={language}
              className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full"
            >
              <span className="text-sm font-bold text-blue-400">{language}</span>
              <button
                onClick={() => handleToggle(language)}
                className="text-blue-400 hover:text-blue-300"
              >
                <FaX className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Language options */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => handleToggle(language)}
            className={`px-3 py-2 rounded-lg font-bold text-sm transition-all ${
              value.includes(language)
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
}
