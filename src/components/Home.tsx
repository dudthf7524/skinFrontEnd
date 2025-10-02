import { Award, Brain, Camera, Heart, Hospital, Quote, Shield, Sparkles, Star, Upload, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import { useLanguage } from "./LanguageContext";
import { TermsModal } from "./TermsModal";
import { PrivacyModal } from "./PrivacyModal";
import { useTokenCheck } from "../hooks/useTokenCheck";
import result1 from "../assets/img/result1.png";
import result2 from "../assets/img/result2.png";
import result3 from "../assets/img/result3.png";
import result11 from "../assets/img/result11.png";
import result22 from "../assets/img/result22.png";
import result33 from "../assets/img/result33.png";

export default function Home() {
    const navigate = useNavigate()
    const { t, language } = useLanguage();
    const { checkUserToken } = useTokenCheck();
    const [termsModalOpen, setTermsModalOpen] = useState(false);
    const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

    // 슬라이더 관련 상태
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const images = [result1, result2, result3];
    const imagess = [result11, result22, result33];
    const displayImages = language === 'ko' ? imagess : images;
    const totalSlides = displayImages.length;

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

    async function handleSkinAiPage() {
        const user = localStorage.getItem("user")
        if (user) {
            try {
                const tokenResult = await checkUserToken();
                if (tokenResult.hasToken) {
                    navigate('/skinai');
                } else {
                    alert("토큰이 없습니다.")
                    navigate('/token');
                }
            } catch (error) {
                console.error('토큰 확인 중 오류:', error);
                navigate('/token');
            }
        } else {
            alert("로그인이 필요합니다.")
            navigate('/signin')
        }
    }
    const steps = [
        {
            icon: Upload,
            title: t("home_step1Title"),
            description: t("home_step1Description"),
            color: "bg-blue-50 text-blue-600"
        },
        {
            icon: Brain,
            title: t("home_step2Title"),
            description: t("home_step2Description"),
            color: "bg-purple-50 text-purple-600"
        },
        {
            icon: Hospital,
            title: t("home_step3Title"),
            description: t("home_step3Description"),
            color: "bg-green-50 text-green-600"
        }
    ];

    const testimonials = [
        {
            name: t("home_testimonial1Name"),
            pet: t("home_testimonial1Pet"),
            content: t("home_testimonial1Content"),
            rating: 5,
        },
        {
            name: t("home_testimonial2Name"),
            pet: t("home_testimonial2Pet"),
            content: t("home_testimonial2Content"),
            rating: 5,
        },
        {
            name: t("home_testimonial3Name"),
            pet: t("home_testimonial3Pet"),
            content: t("home_testimonial3Content"),
            rating: 5,
        },
    ];

    const features = [
        {
            icon: Shield,
            title: t("home_feature1Title"),
            description: t("home_feature1Description"),
        },
        {
            icon: Users,
            title: t("home_feature2Title"),
            description: t("home_feature2Description"),
        },
        {
            icon: Award,
            title: t("home_feature3Title"),
            description: t("home_feature3Description"),
        },
    ];

    function handleInfoPage() {
        navigate('/info');
    }
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
                                    {t("home_aiScreeningService")}
                                </div>
                                <div className="text-xl sm:text-3xl font-bold text-gray-900 leading-tight">
                                    {t("home_mainTitle")}
                                </div>
                                <p className="hidden sm:block text-sm text-gray-600 leading-relaxed">
                                    {t("home_mainDescription")}
                                </p>
                            </div>

                            <div className="flex justify-center px-2">
                                <div className="bg-gradient-to-br from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] rounded-2xl p-3 shadow-xl max-w-sm w-full">
                                    <div className="bg-white rounded-xl p-4 relative overflow-hidden">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="text-xs font-medium">{t("home_aiAnalyzing")}</div>
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
                                                        {displayImages.map((image, index) => (
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
                                                    {displayImages.map((_, index) => (
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
                                    {t("home_tryNowButton")}
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:block space-y-8">
                            <div className="space-y-4 text-left">
                                <div className="inline-flex items-center px-4 py-2 bg-[var(--talktail-mint)] rounded-full text-sm text-gray-700">
                                    <Sparkles className="w-4 h-4 mr-2 text-[var(--talktail-orange)]" />
                                    {t("home_aiScreeningService")}
                                </div>
                                <div className="text-5xl font-bold text-gray-900 leading-tight">
                                    {t("home_mainTitle")}
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {t("home_mainDescription")}
                                </p>
                            </div>

                            <div className="flex flex-col gap-6">
                                <button
                                    onClick={() => handleSkinAiPage()}
                                    className="w-full bg-gradient-to-r from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] hover:from-[var(--talktail-orange-dark)] hover:to-[var(--talktail-orange)] text-white px-6 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                                >
                                    <Camera className="w-5 h-5 mr-3" />
                                    {t("home_tryNowButton")}
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            <div className="bg-gradient-to-br from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] rounded-3xl p-8 shadow-2xl">
                                <div className="bg-white rounded-2xl p-6 relative overflow-hidden">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-medium">{t("home_aiAnalyzing")}</div>
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
                                                    {displayImages.map((image, index) => (
                                                        <div key={index} className="w-full h-full flex-shrink-0">
                                                            <img
                                                                src={image}
                                                                alt={`AI 분석 결과 ${index + 1}`}
                                                                className="w-full h-full object-cover"
                                                                draggable={false}
                                                                style={{
                                                                    imageRendering: 'crisp-edges',
                                                                    // WebkitImageRendering: 'crisp-edges',
                                                                    // msImageRendering: 'crisp-edges',
                                                                    // imageRendering: '-webkit-optimize-contrast'
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-center space-x-2 mt-3">
                                                {displayImages.map((_, index) => (
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
                            {t("home_stepsTitle")} <span className="text-[var(--talktail-orange)]">{t("home_stepsComplete")}</span>
                        </h2>
                        <p className="text-xl text-gray-600">
                            {t("home_stepsSubtitle")}
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
                            {t("home_analysisTime")}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            {t("home_whyChooseTitle")}
                        </h2>
                        <p className="text-xl text-gray-600">
                            {t("home_whyChooseSubtitle")}
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
                            {t("home_testimonialsTitle")}
                        </h2>
                        <p className="text-xl text-gray-600">
                            {t("home_testimonialsSubtitle")}
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
                                        {testimonial.pet} {t("home_petOwner")}
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
                        {t("home_ctaTitle")}
                    </h2>
                    <p className="text-xl mb-8 text-orange-100">
                        {t("home_ctaSubtitle")}
                    </p>
                    <Button
                        size="lg"
                        className="bg-white text-[var(--talktail-orange)] hover:bg-gray-100 px-8 py-4 text-lg rounded-xl mr-4"
                        onClick={() => handleSkinAiPage()}
                    >
                        {t("home_freeTrialButton")}
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
                                        {t("home_footerTitle")}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {t("home_footerSubtitle")}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-400 mb-4">
                                {t("home_footerDescription")}
                            </p>
                            <div className="flex space-x-4">
                                <div className="bg-[var(--talktail-orange)] text-white rounded-xl px-2 py-0.5 text-xs" >
                                    {t("home_footerAccuracy")}
                                </div>
                                <div className="bg-[var(--talktail-orange)] text-white rounded-xl px-2 py-0.5 text-xs">
                                    {t("home_footerHospitals")}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">{t("home_footerServices")}</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li
                                    onClick={() => handleSkinAiPage()}

                                >
                                    <a
                                        href=""
                                        className="hover:text-white transition-colors"
                                    >
                                        {t("home_footerAiAnalysis")}
                                    </a>
                                </li>
                                <li
                                    onClick={() => handleInfoPage()}
                                >
                                    <a
                                        href=""
                                        className="hover:text-white transition-colors"
                                    >
                                        {t("home_footerDiseaseInfo")}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">{t("home_footerCustomerSupport")}</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a
                                        href=""
                                        className="hover:text-white transition-colors"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setTermsModalOpen(true);
                                        }}
                                    >
                                        {t("home_footerUserGuide")}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href=""
                                        className="hover:text-white transition-colors"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPrivacyModalOpen(true);
                                        }}
                                    >
                                        {t("home_footerPrivacyPolicy")}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>{t("home_footerCopyright")}</p>
                    </div>
                </div>
            </footer>
            <TermsModal
                isOpen={termsModalOpen}
                onClose={() => setTermsModalOpen(false)}
            />
            <PrivacyModal
                isOpen={privacyModalOpen}
                onClose={() => setPrivacyModalOpen(false)}
            />
        </div>
    )
}
