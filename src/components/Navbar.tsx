import { Heart, Menu, X, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLanguage, Language } from './LanguageContext';
import kakaoIcon from "../assets/img/kakaotalk.png";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import ProfileBar from "./ProfileBar";
import axios from "axios";

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
                    className="h-8 px-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-700 text-sm font-normal shadow-sm"
                >
                    <Globe className="w-4 h-4 mr-1.5" />
                    <span className="text-sm">
                        {currentLanguage?.code.toUpperCase()}
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px] bg-white border border-gray-200 shadow-lg rounded-lg p-1">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`cursor-pointer rounded-md px-3 py-2 text-sm ${language === lang.code
                            ? 'bg-orange-50 text-orange-900'
                            : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <span className="text-sm font-medium">
                            {lang.code.toUpperCase()} {lang.name}
                        </span>
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
    const { t } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    function handleSkinAiPage() {
        const user = localStorage.getItem("user")
        if (user) {
            navigate('/skinai')
        } else {
            alert("로그인이 필요합니다.")
            navigate('/signin')
        }
    }

    function handleInfoPage() {
        navigate('/info');
    }

    function handleSearchPage() {
        navigate('/search ');
    }

    // function handlerecordPage() {
    //     navigate('/record ');
    // }

    function handleLogin() {
        navigate('/signin')
    }

    const handleLogout = async () => {
        localStorage.removeItem('user');
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

        try {
            const response = await axios.post(`${apiBaseUrl}/auth/logout`,
                {},
                {
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.error(error)
        }
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
                            {t('home')}
                        </button>
                        <button
                            onClick={() => handleSkinAiPage()}
                            className={`transition-colors ${currentPage === "skinai"
                                ? "text-[var(--talktail-orange)]"
                                : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                }`}
                        >
                            {t('aiAnalysis')}
                        </button>
                        <button
                            onClick={() => handleInfoPage()}
                            className={`transition-colors ${currentPage === "info"
                                ? "text-[var(--talktail-orange)]"
                                : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                }`}
                        >
                            {t('diseaseInfo')}
                        </button>
                        {/* <button
                            onClick={() => handleSearchPage()}
                            className={`transition-colors ${currentPage === "search"
                                ? "text-[var(--talktail-orange)]"
                                : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                }`}
                        >
                            {t('hospitalSearch')}
                        </button> */}
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-4">
                        {/* 번역 버튼 */}
                        <div className="hidden sm:flex">
                            <LanguageToggle />
                        </div>

                        {/* 로그인/진단하기 버튼 주석처리 */}
                        {localStorage.getItem("user") ? (
                            <ProfileBar />
                        ) : (
                            <Button
                                onClick={() => handleLogin()}
                                size="sm"
                                className="hidden sm:flex bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-white"
                            >
                                {t('login')}
                            </Button>
                        )}

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
                            {t('home')}
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
                            {t('aiAnalysis')}
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
                            {t('diseaseInfo')}
                        </button>
                        {/* <button
                            onClick={() => {
                                handleSearchPage();
                                setIsMobileMenuOpen(false);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "search"
                                ? "text-[var(--talktail-orange)] bg-orange-50"
                                : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
                                }`}
                        >
                            {t('hospitalSearch')}
                        </button> */}



                        {/* Mobile 번역 버튼 */}
                        <div className="pt-2 border-t border-gray-100 mt-2">
                            <div className="px-3 py-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">{t('languageSelect')}</span>
                                    <LanguageToggle />
                                </div>
                            </div>
                        </div>

                        {/* Mobile 로그인 버튼 */}
                        <div className="pt-2 border-t border-gray-100 mt-2">
                            {localStorage.getItem("user") ? (
                                <div className="px-3 py-2">
                                    <Button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        size="sm"
                                        className="w-full justify-center bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-white"
                                    >
                                        {t('logout')}
                                    </Button>
                                </div>
                            ) : (
                                <div className="px-3 py-2">
                                    <Button
                                        onClick={() => {
                                            handleLogin();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        size="sm"
                                        className="w-full justify-center bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-white"
                                    >
                                        {t('login')}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default function Navbar(props: NavbarProps) {
    return <NavbarContent {...props} />;
}