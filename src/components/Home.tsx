import { Award, Badge, Brain, Camera, Heart, Hospital, MapPin, Menu, Quote, Shield, Sparkles, Star, Upload, Users, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()

    function handleSkinAiPage() {
        navigate('/skinai')
    }

    const steps = [
        {
            icon: Upload,
            title: "사진 업로드",
            description: "반려동물의 피부 문제 부위를 사진으로 촬영하여 업로드하세요.",
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: Brain,
            title: "AI 분석",
            description: "고도화된 AI가 피부 상태를 분석하여 질병 가능성을 진단합니다.",
            color: "bg-purple-50 text-purple-600"
        },
        {
            icon: Hospital,
            title: "병원 연결",
            description: "분석 결과를 바탕으로 주변 전문 병원을 추천하고 예약을 도와드립니다.",
            color: "bg-green-50 text-green-600"
        }
    ];

    const testimonials = [
        {
            name: "김민지",
            pet: "골든리트리버 멍멍이",
            content:
                "우리 멍멍이 피부 문제를 빠르게 발견할 수 있어서 정말 도움이 되었어요. AI 진단이 정말 정확했습니다!",
            rating: 5,
        },
        {
            name: "박성호",
            pet: "페르시안 나비",
            content:
                "24시간 언제든 사용할 수 있어서 좋고, 근처 병원까지 추천해줘서 편리했습니다.",
            rating: 5,
        },
        {
            name: "이유진",
            pet: "말티즈 구름이",
            content:
                "사진만 찍으면 바로 결과가 나와서 신기했어요. 수의사 선생님도 정확한 진단이라고 하셨습니다.",
            rating: 5,
        },
    ];

    const features = [
        {
            icon: Shield,
            title: "95% 높은 정확도",
            description: "수만 건의 데이터로 학습한 AI 알고리즘",
        },
        {
            icon: Users,
            title: "전문 수의사 연결",
            description: "500+ 제휴 병원과 즉시 연결",
        },
        {
            icon: Award,
            title: "간편한 사용법",
            description: "사진 업로드만으로 30초 내 결과",
        },
    ];
    type Page = "home" | "diagnosis" | "diseases" | "vets" | "login" | "record";

    const [currentPage, setCurrentPage] = useState<Page>("home");

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 

    function handleInfoPage() {
        navigate('/info');
    }

    function handleSearchPage() {
        navigate('/search ');
    }

    return (
        <div className="min-h-screen bg-white">
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                        // onClick={() => handleNavigation("home")}
                        >
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
                                // onClick={() => handleNavigation("home")}
                                className={`transition-colors ${currentPage === "home"
                                    ? "text-[var(--talktail-orange)]"
                                    : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                    }`}
                            >
                                홈
                            </button>
                            <button
                                onClick={() => handleSkinAiPage()}
                                className={`transition-colors ${currentPage === "diagnosis"
                                    ? "text-[var(--talktail-orange)]"
                                    : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                    }`}
                            >
                                AI 진단
                            </button>
                            <button
                                onClick={() => handleInfoPage()}
                                className={`transition-colors ${currentPage === "diseases"
                                    ? "text-[var(--talktail-orange)]"
                                    : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                    }`}
                            >
                                질병 정보
                            </button>
                            <button
                                onClick={() => handleSearchPage()}
                                className={`transition-colors ${currentPage === "vets"
                                    ? "text-[var(--talktail-orange)]"
                                    : "text-gray-700 hover:text-[var(--talktail-orange)]"
                                    }`}
                            >
                                병원 찾기
                            </button>
                        </div>

                        {/* Right side buttons */}
                        <div className="flex items-center space-x-4">
                            {localStorage.getItem("user") ? (
                                <ProfileBar handleNavigation={handleNavigation} />
                            ) : (
                                <>
                                    <button
                                        // onClick={() => handlerLoginClick()}
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
                                    // onClick={() => handleNavigation("diagnosis")}
                                    >
                                        지금 진단하기
                                    </Button>
                                </>
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
                                // onClick={() => {
                                //     handleNavigation("home");
                                //     setIsMobileMenuOpen(false);
                                // }}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "home"
                                    ? "text-[var(--talktail-orange)] bg-orange-50"
                                    : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
                                    }`}
                            >
                                홈
                            </button>
                            <button
                                onClick={() => handleSkinAiPage()}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "diagnosis"
                                    ? "text-[var(--talktail-orange)] bg-orange-50"
                                    : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
                                    }`}
                            >
                                AI 진단
                            </button>
                            <button
                                // onClick={() => {
                                //     handleNavigation("diseases");
                                //     setIsMobileMenuOpen(false);
                                // }}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "diseases"
                                    ? "text-[var(--talktail-orange)] bg-orange-50"
                                    : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
                                    }`}
                            >
                                질병 정보
                            </button>
                            <button
                                // onClick={() => {
                                //     handleNavigation("vets");
                                //     setIsMobileMenuOpen(false);
                                // }}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${currentPage === "vets"
                                    ? "text-[var(--talktail-orange)] bg-orange-50"
                                    : "text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50"
                                    }`}
                            >
                                병원 찾기
                            </button>

                            {/* Mobile CTA buttons */}
                            <div className="pt-2 border-t border-gray-100 mt-2">
                                {/* <Button variant="ghost" size="sm" className="hidden md:flex">
                                    로그인
                                </Button> */}
                                <Button
                                    size="sm"
                                    className="w-full justify-start px-3 py-2 mt-1 bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-base font-medium"
                                // onClick={() => {
                                //     handleNavigation("diagnosis");
                                //     setIsMobileMenuOpen(false);
                                // }}
                                >
                                    지금 진단하기
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <section className="bg-gradient-to-br from-[var(--talktail-beige)] to-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left side - Text content */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center px-4 py-2 bg-[var(--talktail-mint)] rounded-full text-sm text-gray-700">
                                    <Sparkles className="w-4 h-4 mr-2 text-[var(--talktail-orange)]" />
                                    AI 피부 질병 스크리닝 서비스
                                </div>
                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    AI와 웨어러블로
                                    <br />
                                    <span className="text-[var(--talktail-orange)]">
                                        반려동물 건강을
                                    </span>
                                    <br />
                                    지켜보세요
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    간편한 사진 업로드로 반려동물의 피부 질병을 빠르게 확인하고,
                                    <br />
                                    전문 수의사와 연결해보세요.
                                </p>
                            </div>

                            <div className="flex flex-col gap-6">
                                {/* 메인 진단 버튼 - 크고 눈에 띄게 */}
                                <button onClick={() => handleSkinAiPage()} className="w-full">
                                    <Button
                                        size="lg"
                                        className="w-full bg-gradient-to-r from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] hover:from-[var(--talktail-orange-dark)] hover:to-[var(--talktail-orange)] text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                                    >
                                        <Camera className="w-6 h-6 mr-3" />
                                        지금 바로 진단하기
                                    </Button>
                                </button>

                                {/* 서브 버튼 */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-2 border-[var(--talktail-orange)] text-[var(--talktail-orange)] hover:bg-[var(--talktail-orange)] hover:text-white px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300"
                                    >
                                        <MapPin className="w-5 h-5 mr-2" />
                                        병원 찾기
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="lg"
                                        className="text-gray-600 hover:text-[var(--talktail-orange)] hover:bg-[var(--talktail-mint)] px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300"
                                    >
                                        서비스 소개
                                    </Button>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 pt-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--talktail-orange)]">
                                        10,000+
                                    </div>
                                    <div className="text-sm text-gray-600">누적 진단</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--talktail-orange)]">
                                        95%
                                    </div>
                                    <div className="text-sm text-gray-600">정확도</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--talktail-orange)]">
                                        500+
                                    </div>
                                    <div className="text-sm text-gray-600">제휴 병원</div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Illustration */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] rounded-3xl p-8 shadow-2xl">
                                <div className="bg-white rounded-2xl p-6 relative overflow-hidden">
                                    {/* Mock phone interface */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium">AI 분석 중...</div>
                                            <div className="w-6 h-6 bg-[var(--talktail-orange)] rounded-full animate-pulse"></div>
                                        </div>

                                        {/* Mock pet image */}
                                        <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                                            <div className="text-6xl">🐕</div>
                                        </div>

                                        {/* Mock results */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                <span className="text-sm">습진 (Eczema)</span>
                                                <span className="text-sm font-medium text-green-600">
                                                    85%
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                                <span className="text-sm">알레르기</span>
                                                <span className="text-sm font-medium text-yellow-600">
                                                    12%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating elements */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--talktail-mint)] rounded-full flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-[var(--talktail-orange)]" />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-8 -left-8 w-16 h-16 bg-[var(--talktail-mint)] rounded-full opacity-60"></div>
                            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[var(--talktail-orange)] rounded-full opacity-40"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            간단한 3단계로 <span className="text-[var(--talktail-orange)]">완료</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            복잡한 절차 없이 쉽고 빠르게 반려동물의 피부 건강을 확인하세요
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="p-8 text-center h-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
                                    {/* Step number */}
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="w-8 h-8 bg-[var(--talktail-orange)] text-white rounded-full flex items-center justify-center font-bold">
                                            {index + 1}
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${step.color}`}>
                                        <step.icon className="w-8 h-8" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>

                                {/* Arrow between steps */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <div className="w-8 h-0.5 bg-[var(--talktail-orange)]"></div>
                                        <div className="absolute -right-1 -top-1 w-0 h-0 border-l-4 border-l-[var(--talktail-orange)] border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Call to action */}
                    <div className="text-center mt-16">
                        <div className="inline-flex items-center px-6 py-3 bg-[var(--talktail-beige)] rounded-full text-[var(--talktail-orange)] font-medium">
                            💡 평균 분석 시간: 30초 이내
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            왜{" "}
                            <span className="text-[var(--talktail-orange)]">
                                Talktail SkinCare AI
                            </span>
                            를 선택해야 할까요?
                        </h2>
                        <p className="text-xl text-gray-600">
                            전문적이고 신뢰할 수 있는 반려동물 피부 진단 서비스
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 bg-[var(--talktail-beige)] rounded-2xl flex items-center justify-center">
                                    <feature.icon className="w-8 h-8 text-[var(--talktail-orange)]" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20 bg-[var(--talktail-beige)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            사용자{" "}
                            <span className="text-[var(--talktail-orange)]">후기</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            이미 많은 반려인들이 경험했습니다
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white border-0 shadow-lg"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 text-yellow-400 fill-current"
                                        />
                                    ))}
                                </div>
                                <Quote className="w-6 h-6 text-[var(--talktail-orange)] mb-4" />
                                <p className="text-gray-700 mb-4 italic">
                                    "{testimonial.content}"
                                </p>
                                <div className="border-t border-gray-100 pt-4">
                                    <p className="font-medium text-gray-900">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {testimonial.pet} 보호자
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        지금 바로 시작하세요
                    </h2>
                    <p className="text-xl mb-8 text-orange-100">
                        우리 아이의 건강한 피부를 위한 첫 걸음을 내딛어보세요
                    </p>
                    <Button
                        size="lg"
                        className="bg-white text-[var(--talktail-orange)] hover:bg-gray-100 px-8 py-4 text-lg rounded-xl mr-4"
                        onClick={() => handleNavigation("diagnosis")}
                    >
                        무료 진단 받기
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-white text-[var(--talktail-orange)] hover:bg-gray-100 px-8 py-4 text-lg rounded-xl mr-4"
                        onClick={() => handleNavigation("diseases")}
                    >
                        질병 정보 보기
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 bg-[var(--talktail-orange)] rounded-full flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        Talktail SkinCare AI
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        반려동물 피부 건강의 든든한 파트너
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-4">
                                AI 기술로 반려동물의 피부 건강을 지키는 스마트한
                                솔루션입니다. 전문 수의사와의 연결을 통해 더 나은 치료를
                                받으세요.
                            </p>
                            <div className="flex space-x-4">
                                <div className="bg-[var(--talktail-orange)] text-white rounded-xl px-2 py-0.5 text-xs" >
                                    정확도 95%
                                </div>
                                <div className="bg-[var(--talktail-orange)] text-white rounded-xl px-2 py-0.5 text-xs">
                                    500+ 제휴병원
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">서비스</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        AI 진단
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        질병 정보
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        병원 찾기
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">고객지원</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        자주 묻는 질문
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        이용 가이드
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        고객센터
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-white transition-colors"
                                    >
                                        개인정보처리방침
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Talktail SkinCare AI. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
