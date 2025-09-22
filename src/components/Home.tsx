import { Award, Badge, Brain, Camera, Heart, Hospital, LogIn, MapPin, Menu, Quote, Shield, Sparkles, Star, Upload, Users, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import ProfileBar from "./ProfileBar";
import LoginPage from "./Login";
import Navbar from "./Navbar";
import result1 from "../assets/img/result1.png";
import result2 from "../assets/img/result2.png";
import result3 from "../assets/img/result3.png";

export default function Home() {
    const navigate = useNavigate()
    const [loginModal, setLoginModal] = useState(false);

    // 슬라이더 관련 상태
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const images = [result1, result2, result3];
    const totalSlides = images.length;

    // 자동 슬라이드 기능 (5초마다)
    useEffect(() => {
        if (!isDragging) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % totalSlides);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [totalSlides, isDragging]);

    // 슬라이드 이동 함수
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // 터치/마우스 이벤트 핸들러
    const handleStart = (clientX: number) => {
        setIsDragging(true);
        setStartX(clientX);
        setTranslateX(0);
    };

    const handleMove = (clientX: number) => {
        if (!isDragging) return;
        const deltaX = clientX - startX;
        setTranslateX(deltaX);
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 50; // 50px 이상 드래그해야 슬라이드 변경
        if (Math.abs(translateX) > threshold) {
            if (translateX > 0) {
                // 오른쪽으로 드래그 - 이전 슬라이드
                setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
            } else {
                // 왼쪽으로 드래그 - 다음 슬라이드
                setCurrentSlide((prev) => (prev + 1) % totalSlides);
            }
        }
        setTranslateX(0);
    };

    // 마우스 이벤트
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        handleStart(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        handleMove(e.clientX);
    };

    const handleMouseUp = () => {
        handleEnd();
    };

    // 터치 이벤트
    const handleTouchStart = (e: React.TouchEvent) => {
        handleStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        handleEnd();
    };

    function handleSkinAiPage() {
        navigate('/skinai')
    }

    const handleNavigation = (page: Page) => {
        console.log(page);
        setCurrentPage(page);
        if (page === "home") {
            document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
        }
    };

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
                "우리 멍멍이 피부 문제를 빠르게 발견할 수 있어서 정말 도움이 되었어요. AI 분석이 정말 정확했습니다!",
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
    type Page = "home" | "skinai" | "info" | "search" | "login";

    const [currentPage, setCurrentPage] = useState<Page>("home");

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    function handleInfoPage() {
        navigate('/info');
    }

    function handleSearchPage() {
        navigate('/search ');
    }

    function handleLoginPage() {
        navigate('/signin ');
    }

    const handlerLoginClick = () => {
        if (loginModal === true) {
            setLoginModal(false);
        } else {
            setLoginModal(true);
        }
    };


    return (
        <div className="min-h-screen bg-white">

            <Navbar />

            <section className="bg-gradient-to-br from-[var(--talktail-beige)] to-white py-5 lg:py-10 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
                        <div className="lg:hidden space-y-6">
                            <div className="space-y-4 text-center">
                                <div className="inline-flex items-center px-4 py-2 bg-[var(--talktail-mint)] rounded-full text-sm text-gray-700">
                                    <Sparkles className="w-4 h-4 mr-2 text-[var(--talktail-orange)]" />
                                    AI 피부 질병 스크리닝 서비스
                                </div>
                                <div className="text-xl sm:text-3xl font-bold text-gray-900 leading-tight">
                                    반려동물 피부 건강을 AI로 진단하세요
                                </div>
                                <p className="hidden sm:block text-sm text-gray-600 leading-relaxed">
                                    반려동물의 피부 사진을 업로드하거나 AI
                                    <br />
                                    진단을 즉시 시작하세요
                                </p>
                            </div>

                            <div className="flex justify-center px-2">
                                <div className="bg-gradient-to-br from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] rounded-2xl p-3 shadow-xl max-w-sm w-full">
                                    <div className="bg-white rounded-xl p-4 relative overflow-hidden">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="text-xs font-medium">AI 분석 중...</div>
                                                <div className="w-4 h-4 bg-[var(--talktail-orange)] rounded-full animate-pulse"></div>
                                            </div>

                                            <div className="relative">
                                                <div
                                                    ref={sliderRef}
                                                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-grab active:cursor-grabbing select-none"
                                                    onMouseDown={handleMouseDown}
                                                    onMouseMove={isDragging ? handleMouseMove : undefined}
                                                    onMouseUp={handleMouseUp}
                                                    onMouseLeave={handleMouseUp}
                                                    onTouchStart={handleTouchStart}
                                                    onTouchMove={handleTouchMove}
                                                    onTouchEnd={handleTouchEnd}
                                                >
                                                    <div
                                                        className="flex transition-transform duration-700 ease-in-out h-full"
                                                        style={{
                                                            transform: `translateX(${-currentSlide * 100 + (isDragging ? (translateX / sliderRef.current?.offsetWidth || 1) * 100 : 0)}%)`
                                                        }}
                                                    >
                                                        {images.map((image, index) => (
                                                            <div key={index} className="w-full h-full flex-shrink-0">
                                                                <img
                                                                    src={image}
                                                                    alt={`AI 분석 결과 ${index + 1}`}
                                                                    className="w-full h-full object-cover"
                                                                    draggable={false}
                                                                    style={{
                                                                        imageRendering: 'high-quality',
                                                                        imageRendering: '-webkit-optimize-contrast',
                                                                        backfaceVisibility: 'hidden',
                                                                        WebkitBackfaceVisibility: 'hidden',
                                                                        transform: 'translateZ(0)',
                                                                        WebkitTransform: 'translateZ(0)'
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex justify-center space-x-1 mt-2">
                                                    {images.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => goToSlide(index)}
                                                            className={`w-2 h-2 rounded-full transition-all duration-200 ${currentSlide === index
                                                                ? 'bg-[var(--talktail-orange)] w-4'
                                                                : 'bg-gray-300 hover:bg-gray-400'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* <div className="space-y-2">
                                                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                                                    <span className="text-xs">습진 (Eczema)</span>
                                                    <span className="text-xs font-medium text-green-600">85%</span>
                                                </div>
                                                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                                                    <span className="text-xs">알레르기</span>
                                                    <span className="text-xs font-medium text-yellow-600">12%</span>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 px-4">
                                <button
                                    onClick={() => handleSkinAiPage()}
                                    className="w-full bg-gradient-to-r from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] hover:from-[var(--talktail-orange-dark)] hover:to-[var(--talktail-orange)] text-white px-3 py-2 text-sm font-medium rounded-md shadow-md transition-all duration-300 flex items-center justify-center"
                                >
                                    <Camera className="w-3 h-3 mr-1" />
                                    지금 바로 체험하기
                                </button>

                                {/* <button
                                    onClick={() => handleLoginPage()}
                                    className="w-full border-2 border-[var(--talktail-orange)] text-[var(--talktail-orange)] hover:bg-[var(--talktail-orange)] hover:text-white px-3 py-2 text-sm font-medium rounded-md shadow-md transition-all duration-300 flex items-center justify-center"
                                >
                                    <LogIn className="w-3 h-3 mr-1" />
                                    로그인
                                </button> */}
                            </div>
                        </div>

                        <div className="hidden lg:block space-y-8">
                            <div className="space-y-4 text-left">
                                <div className="inline-flex items-center px-4 py-2 bg-[var(--talktail-mint)] rounded-full text-sm text-gray-700">
                                    <Sparkles className="w-4 h-4 mr-2 text-[var(--talktail-orange)]" />
                                    AI 피부 질병 스크리닝 서비스
                                </div>
                                <div className="text-5xl font-bold text-gray-900 leading-tight">
                                    반려동물 피부 건강을
                                    <br />
                                    AI로 진단하세요
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    반려동물의 피부 사진을 업로드하거나 AI
                                    <br />
                                    진단을 즉시 시작하세요
                                </p>
                            </div>

                            <div className="flex flex-col gap-6">
                                <button
                                    onClick={() => handleSkinAiPage()}
                                    className="w-full bg-gradient-to-r from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] hover:from-[var(--talktail-orange-dark)] hover:to-[var(--talktail-orange)] text-white px-6 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                >
                                    <Camera className="w-5 h-5 mr-3" />
                                    지금 바로 체험하기
                                </button>

                                {/* <button
                                    onClick={() => handleLoginPage()}
                                    className="w-full border-2 border-[var(--talktail-orange)] text-[var(--talktail-orange)] hover:bg-[var(--talktail-orange)] hover:text-white px-6 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                >
                                    <LogIn className="w-5 h-5 mr-3" />
                                    로그인
                                </button> */}
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            <div className="bg-gradient-to-br from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] rounded-3xl p-8 shadow-2xl">
                                <div className="bg-white rounded-2xl p-6 relative overflow-hidden">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium">AI 분석 중...</div>
                                            <div className="w-6 h-6 bg-[var(--talktail-orange)] rounded-full animate-pulse"></div>
                                        </div>

                                        <div className="relative">
                                            <div
                                                className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
                                                onMouseDown={handleMouseDown}
                                                onMouseMove={isDragging ? handleMouseMove : undefined}
                                                onMouseUp={handleMouseUp}
                                                onMouseLeave={handleMouseUp}
                                                onTouchStart={handleTouchStart}
                                                onTouchMove={handleTouchMove}
                                                onTouchEnd={handleTouchEnd}
                                            >
                                                <div
                                                    className="flex transition-transform duration-700 ease-in-out h-full"
                                                    style={{
                                                        transform: `translateX(${-currentSlide * 100 + (isDragging ? (translateX / sliderRef.current?.offsetWidth || 1) * 100 : 0)}%)`
                                                    }}
                                                >
                                                    {images.map((image, index) => (
                                                        <div key={index} className="w-full h-full flex-shrink-0">
                                                            <img
                                                                src={image}
                                                                alt={`AI 분석 결과 ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                                draggable={false}
                                                                style={{
                                                                    imageRendering: 'crisp-edges',
                                                                    WebkitImageRendering: 'crisp-edges',
                                                                    msImageRendering: 'crisp-edges',
                                                                    imageRendering: '-webkit-optimize-contrast'
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-center space-x-2 mt-3">
                                                {images.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => goToSlide(index)}
                                                        className={`w-3 h-3 rounded-full transition-all duration-200 ${currentSlide === index
                                                            ? 'bg-[var(--talktail-orange)] w-6'
                                                            : 'bg-gray-300 hover:bg-gray-400'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* <div className="space-y-2">
                                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                <span className="text-sm">습진 (Eczema)</span>
                                                <span className="text-sm font-medium text-green-600">85%</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                                <span className="text-sm">알레르기</span>
                                                <span className="text-sm font-medium text-yellow-600">12%</span>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--talktail-mint)] rounded-full flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-[var(--talktail-orange)]" />
                                    </div>
                                </div>
                            </div>
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
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="w-8 h-8 bg-[var(--talktail-orange)] text-white rounded-full flex items-center justify-center font-bold">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${step.color}`}>
                                        <step.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

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
                        onClick={() => handleSkinAiPage()}
                    >
                        무료 체험 하기
                    </Button>
                    {/* <Button
                        size="lg"
                        variant="outline"
                        className="bg-white text-[var(--talktail-orange)] hover:bg-gray-100 px-8 py-4 text-lg rounded-xl mr-4"
                        onClick={() => handleLoginPage()}
                    >
                        로그인
                    </Button> */}
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
                                        AI 분석
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
