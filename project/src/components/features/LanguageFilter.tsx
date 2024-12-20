import { useState } from 'react';
import { Check, Globe } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  nativeName: string;
  count: number;
}

const languages: Language[] = [
  { id: 'en', name: 'English', nativeName: 'English', count: 586 },
  { id: 'es', name: 'Spanish', nativeName: 'Español', count: 245 },
  { id: 'fr', name: 'French', nativeName: 'Français', count: 124 },
  { id: 'zh', name: 'Chinese', nativeName: '中文', count: 178 },
  { id: 'ar', name: 'Arabic', nativeName: 'العربية', count: 92 }
];

export function LanguageFilter() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const toggleLanguage = (languageId: string) => {
    setSelectedLanguages(prev =>
      prev.includes(languageId)
        ? prev.filter(id => id !== languageId)
        : [...prev, languageId]
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <Globe className="mr-2 h-4 w-4 text-gray-500" />
        <h3 className="font-semibold">Languages Spoken</h3>
      </div>
      
      {languages.map(language => (
        <label
          key={language.id}
          className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-50"
        >
          <div className="flex items-center">
            <div
              className={`flex h-5 w-5 items-center justify-center rounded border ${
                selectedLanguages.includes(language.id)
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}
            >
              {selectedLanguages.includes(language.id) && (
                <Check className="h-3 w-3 text-white" />
              )}
            </div>
            <span className="ml-2">{language.name}</span>
            <span className="ml-1 text-sm text-gray-500">({language.nativeName})</span>
          </div>
          <span className="text-sm text-gray-500">({language.count})</span>
        </label>
      ))}
    </div>
  );
}