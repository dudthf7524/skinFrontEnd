import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Heart, ArrowLeft } from "lucide-react";
import googleLogo from "../assets/img/Google__G__logo.svg.webp";
import naverLogo from "../assets/img/naver.jpg";
import kakaoLogo from "../assets/img/kakaotalk.png";
import appleLogo from "../assets/img/apple.png";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
    setLoginModal?: (open: boolean) => void;
}

export function LoginPage({ setLoginModal }: LoginPageProps) {
    const navigate = useNavigate();

    const handleLogin = (type: "kakao" | "google" | "naver") => {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        localStorage.clear()
        localStorage.setItem('loginType', type)
        window.location.href = `${apiBaseUrl}/auth/social-login?provider=${type}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--talktail-beige)] to-white">
            {/* Mobile Layout */}
            <div className="block lg:hidden min-h-screen">
                <div className="p-4 sm:p-6">
                    {/* Back button */}
                    <button
                        onClick={() => {
                            if (setLoginModal) {
                                setLoginModal(false);
                            } else {
                                navigate("/");
                            }
                        }}
                        className="flex items-center text-gray-600 hover:text-[var(--talktail-orange)] transition-colors mb-6"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        돌아가기
                    </button>

                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-[var(--talktail-orange)] rounded-full flex items-center justify-center">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Talktail</h1>
                        <p className="text-gray-600">SkinCare AI</p>
                    </div>

                    {/* Pet mascot illustration */}
                    <div className="text-center mb-8">
                        <div className="w-24 h-24 mx-auto mb-4 bg-[var(--talktail-mint)] rounded-full flex items-center justify-center">
                            <span className="text-4xl">🐕</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">다시 만나서 반가워요!</h2>
                        <p className="text-gray-600">우리 아이의 건강한 피부를 함께 지켜요</p>
                    </div>

                    {/* Social Login Buttons */}
                    <Card className="p-6 card-rounded-lg shadow-lg border-0">
                        <div className="space-y-4 mb-6">
                            <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-2 hover:bg-gray-50"
                                size="lg"
                                onClick={() => handleLogin("google")}
                            >
                                <img src={googleLogo} alt="Google" className="w-6 h-6 mr-3" />
                                Google로 계속하기
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-2 hover:bg-yellow-50 hover:border-yellow-300"
                                size="lg"
                                onClick={() => handleLogin("kakao")}
                            >
                                <img src={kakaoLogo} alt="Kakao" className="w-6 h-6 mr-3" />
                                카카오로 계속하기
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-2 hover:bg-green-50 hover:border-green-300"
                                size="lg"
                                onClick={() => handleLogin("naver")}
                            >
                                <img src={naverLogo} alt="Naver" className="w-6 h-6 mr-3 rounded" />
                                네이버로 계속하기
                            </Button>

                            {/* <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-2 hover:bg-gray-50"
                                size="lg"
                                onClick={() => handleSocialLogin("Apple")}
                                disabled={isLoading !== null}
                            >
                                <img src={appleLogo} alt="Apple" className="w-6 h-6 mr-3" />
                                {isLoading === "Apple" ? "로그인 중..." : "Apple로 계속하기"}
                            </Button> */}
                        </div>

                        <div className="text-center">
                            <div className="text-xs text-gray-500">
                                로그인하면 <span className="text-[var(--talktail-orange)]">이용약관</span> 및 <span className="text-[var(--talktail-orange)]">개인정보처리방침</span>에 동의합니다
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 min-h-screen">
                {/* Left side - Illustration */}
                <div className="bg-gradient-to-br from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] flex items-center justify-center p-12">
                    <div className="text-center text-white">
                        <div className="w-32 h-32 mx-auto mb-8 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-6xl">🐕‍🦺</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-4">반가워요!</h2>
                        <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                            반려동물의 피부 건강을<br />
                            함께 지켜나가요
                        </p>
                        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                            <div className="text-center">
                                <div className="text-2xl font-bold">10,000+</div>
                                <div className="text-orange-200">누적 진단</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">95%</div>
                                <div className="text-orange-200">정확도</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Social Login Form */}
                <div className="flex items-center justify-center p-12 bg-white">
                    <div className="w-full max-w-md">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center space-x-2 mb-6">
                                <div className="w-12 h-12 bg-[var(--talktail-orange)] rounded-full flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Talktail</h1>
                                    <p className="text-sm text-gray-500">SkinCare AI</p>
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">로그인</h2>
                            <p className="text-gray-600">소셜 계정으로 간편하게 로그인하세요</p>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="space-y-4 mb-8">
                            <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-2 hover:bg-gray-50"
                                size="lg"
                                onClick={() => handleLogin("google")}
                            >
                                <img src={googleLogo} alt="Google" className="w-6 h-6 mr-3" />
                                Google로 계속하기
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-2 hover:bg-yellow-50 hover:border-yellow-300"
                                size="lg"
                                onClick={() => handleLogin("kakao")}
                            >
                                <img src={kakaoLogo} alt="Kakao" className="w-6 h-6 mr-3" />
                                카카오로 계속하기
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-2 hover:bg-green-50 hover:border-green-300"
                                size="lg"
                                onClick={() => handleLogin("naver")}
                            >
                                <img src={naverLogo} alt="Naver" className="w-6 h-6 mr-3 rounded" />
                                네이버로 계속하기
                            </Button>

                            {/* <Button
                                variant="outline"
                                className="w-full h-12 rounded-xl border-2 hover:bg-gray-50"
                                size="lg"
                                onClick={() => handleSocialLogin("Apple")}
                                disabled={isLoading !== null}
                            >
                                <img src={appleLogo} alt="Apple" className="w-6 h-6 mr-3" />
                                {isLoading === "Apple" ? "로그인 중..." : "Apple로 계속하기"}
                            </Button> */}
                        </div>

                        {/* Footer */}
                        <div className="text-center space-y-4">
                            {/* <div className="text-xs text-gray-500">
                                로그인하면 <span className="text-[var(--talktail-orange)]">이용약관</span> 및 <span className="text-[var(--talktail-orange)]">개인정보처리방침</span>에 동의합니다
                            </div> */}

                            <button
                                onClick={() => {
                                    if (setLoginModal) {
                                        setLoginModal(false);
                                    } else {
                                        navigate("/");
                                    }
                                }}
                                className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                            >
                                ← 홈으로 돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}