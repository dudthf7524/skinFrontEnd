import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../styles/LoginCallback.module.css";
import { Heart, Menu } from "lucide-react";
import { HeroSection } from "./HeroSection";
import { ProcessSteps } from "./ProcessSteps";
import ProfileBar from "./ProfileBar";

type Page = "home" | "diagnosis" | "diseases" | "vets" | "login" | "record";

export default function LoginCallback() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
    const navigate = useNavigate();
    const [statusText, setStatusText] = useState<string>("로그인 처리 중...");

    const handleCallback = async (code: string, type: string) => {
      try {
        setStatusText("로그인 처리 중...");

        const res = await axios.get(
          `http://localhost:4000/auth/${type}/callback?code=${code}`
        );

        if (res.status === 200) {
          // JWT 토큰 저장
          localStorage.setItem("token", res.data.token);

          // 사용자 정보 저장
          localStorage.setItem("user", JSON.stringify(res.data.user));

          setStatusText("로그인 성공! 페이지 이동 중...");
          console.log("로그인 성공:", res.data);

          // 홈 페이지로 이동
          navigate("/");
        } else {
          setStatusText(`로그인 실패: 서버 응답 ${res.status}`);
        }
      } catch (err: any) {
        console.error("로그인 실패:", err);
        setStatusText(`로그인 오류: ${err.response?.data?.message || err.message}`);
      }
    };

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const type = localStorage.getItem("loginType") || "kakao"; // 로그인 타입

      if (code) {
        handleCallback(code, type);
      }
    }, []);

  return (
    <div className={style.container} id="home">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer">
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
              <button className="transition-colors text-gray-700 hover:text-[var(--talktail-orange)]">
                홈
              </button>
              <button className="transition-colors text-gray-700 hover:text-[var(--talktail-orange)]">
                AI 진단
              </button>
              <button className="transition-colors text-gray-700 hover:text-[var(--talktail-orange)]">
                질병 정보
              </button>
              <button className="transition-colors text-gray-700 hover:text-[var(--talktail-orange)]">
                병원 찾기
              </button>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 md:space-x-4 relative">
                {/* 프로필 이미지 */}
                <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                  <div
                    className={`${style.skeleton} ${style.circle} w-full h-full`}
                  />
                </div>

                {/* 데스크탑용 인사말 */}
                <div className="hidden md:flex flex-col">
                  <div className={`${style.skeleton} ${style.nameLine}`} />
                  <div className={`${style.skeleton} ${style.greetingLine}`} />
                </div>

                {/* 모바일용 인사말 */}
                <div className="flex flex-col md:hidden">
                  <div className={`${style.skeleton} ${style.nameLine}`} />
                </div>
              </div>
              {/* Mobile menu button */}
              <button className="md:hidden p-2">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-2 space-y-1">
            <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50">
              홈
            </button>
            <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50">
              AI 진단
            </button>
            <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50">
              질병 정보
            </button>
            <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 hover:text-[var(--talktail-orange)] hover:bg-gray-50">
              병원 찾기
            </button>

            {/* Mobile CTA buttons */}
            <div className="pt-2 border-t border-gray-100 mt-2">
              <div className="flex items-center space-x-2 relative">
                <div className="w-10 h-10 flex-shrink-0">
                  <div
                    className={`${style.skeleton} ${style.circle} w-full h-full`}
                  />
                </div>
                <div className="flex flex-col">
                  <div className={`${style.skeleton} ${style.nameLine}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className={style.hero_section}>
        {/* <HeroSection setCurrent={setCurrentPage} /> */}
      </div>

      {/* Main Content */}
      <main>
        {/* 필요하면 ProcessSteps 등 다른 컴포넌트도 여기에 Skeleton 처리 가능 */}
      </main>
    </div>
  );
}
