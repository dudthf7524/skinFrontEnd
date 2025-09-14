import React from 'react';
import { Button } from './ui/button';
import { Language, useLanguage } from './LanguageContext';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const languages = [
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
];

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 bg-white/50 backdrop-blur-sm border border-white/30 hover:bg-white/70 rounded-lg"
        >
          <Globe className="w-4 h-4 mr-1" />
          <span className="text-sm">{currentLanguage?.flag}</span>
          <span className="text-xs ml-1 hidden sm:inline">
            {currentLanguage?.code.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${
              language === lang.code ? 'bg-orange-50 text-orange-900' : ''
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            <span className="text-sm">{lang.name}</span>
            {language === lang.code && (
              <span className="ml-auto text-orange-600">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};