import { Heart, Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLanguage, Language } from './LanguageContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface NavbarProps {
    currentPage?: string;
}

const languages = [
    { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
    { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
];

const LanguageToggle: React.FC = () => {
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
                    {/* <span className="text-sm">{currentLanguage?.flag}</span> */}
                    <span className="text-xs ml-1 hidden sm:inline">
                        {currentLanguage?.code.toUpperCase()}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px] bg-white border border-gray-200 shadow-lg">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`cursor-pointer ${language === lang.code ? 'bg-orange-50 text-orange-900' : ''
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

const NavbarContent = ({ currentPage = "home" }: NavbarProps) => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function handleSkinAiPage() {
        navigate('/skinai');
    }

    function handleInfoPage() {
        navigate('/info');
    }

    function handleSearchPage() {
        navigate('/search ');
    }


    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-[var(--talktail-orange)] rounded-full flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Talktail</h1>
                            <p className="text-xs text-gray-500">SkinCare AI</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => navigate('/')}
                            className={`transition-colors ${currentPage === "home"
                                ? "text-[var(--talktail-orange)]"
                                : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                }`}
                        >
                            홈
                        </button>
                        <button
                            onClick={() => handleSkinAiPage()}
                            className={`transition-colors ${currentPage === "skinai"
                                ? "text-[var(--talktail-orange)]"
                                : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                }`}
                        >
                            AI 진단
                        </button>
                        <button
                            onClick={() => handleInfoPage()}
                            className={`transition-colors ${currentPage === "info"
                                ? "text-[var(--talktail-orange)]"
                                : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                }`}
                        >
                            질병 정보
                        </button>
                        <button
                            onClick={() => handleSearchPage()}
                            className={`transition-colors ${currentPage === "search"
                                ? "text-[var(--talktail-orange)]"
                                : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                }`}
                        >
                            병원 찾기
                        </button>
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-4">
                        {/* 번역 버튼 */}
                        <div className="hidden sm:flex">
                            <LanguageToggle />
                        </div>

                        {/* 로그인/진단하기 버튼 주석처리 */}
                        {/* {localStorage.getItem("user") ? (
                            <div>프로필</div>
                        ) : (
                            <>
                                <button
                                    className={`transition-colors ${currentPage === "login"
                                        ? "text-[var(--talktail-orange)]"
                                        : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                        }`}
                                >
                                    로그인
                                </button>
                                <Button
                                    size="sm"
                                    className="hidden sm:flex bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-white"
                                    onClick={() => handleNavigation("diagnosis")}
                                >
                                    지금 진단하기
                                </Button>
                            </>
                        )} */}

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="px-4 py-2 space-y-1">
                        <button
                            onClick={() => {
                                navigate('/');
                                setIsMobileMenuOpen(false);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "home"
                                ? "text-[var(--talktail-orange)] bg-orange-50"
                                : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
                                }`}
                        >
                            홈
                        </button>
                        <button
                            onClick={() => {
                                handleSkinAiPage();
                                setIsMobileMenuOpen(false);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "skinai"
                                ? "text-[var(--talktail-orange)] bg-orange-50"
                                : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
                                }`}
                        >
                            AI 진단
                        </button>
                        <button
                            onClick={() => {
                                handleInfoPage();
                                setIsMobileMenuOpen(false);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "info"
                                ? "text-[var(--talktail-orange)] bg-orange-50"
                                : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
                                }`}
                        >
                            질병 정보
                        </button>
                        <button
                            onClick={() => {
                                handleSearchPage();
                                setIsMobileMenuOpen(false);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "search"
                                ? "text-[var(--talktail-orange)] bg-orange-50"
                                : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
                                }`}
                        >
                            병원 찾기
                        </button>

                        {/* Mobile 번역 버튼 */}
                        <div className="pt-2 border-t border-gray-100 mt-2">
                            <div className="px-3 py-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">언어 선택</span>
                                    <LanguageToggle />
                                </div>
                            </div>
                        </div>

                        {/* Mobile CTA buttons 주석처리 */}
                        {/* <div className="pt-2 border-t border-gray-100 mt-2">
                            <Button
                                size="sm"
                                className="w-full justify-start px-3 py-2 mt-1 bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-base font-medium"
                                onClick={() => {
                                    handleNavigation("diagnosis");
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                지금 진단하기
                            </Button>
                        </div> */}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default function Navbar(props: NavbarProps) {
    return <NavbarContent {...props} />;
}