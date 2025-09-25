import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../styles/LoginCallback.module.css";
import { Heart, Menu } from "lucide-react";

export default function LoginCallback() {
  const navigate = useNavigate();
  const handleCallback = async (code: string, type: string) => {
    const callBackUrl = import.meta.env.VITE_CALLBACK_URL;
    try {
      const res = await axios.get(
        `${callBackUrl}/auth/callback/${type}?code=${code}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        // JWT 토큰 저장
        localStorage.setItem("accessToken", res.data.user.accessToken);

        // 사용자 정보 저장
        localStorage.setItem("user", JSON.stringify(res.data.user));

        console.log("로그인 성공:", res.data);

        // 홈 페이지로 이동
        navigate("/");
      } else {
      }
    } catch (err: any) {
      console.error("로그인 실패:", err);
    }
  };

  // useEffect(() => {
  //   const loginType = localStorage.getItem("loginType");
  //   setSnsType(loginType);
  // }, []);

  // useEffect(() => {
  //   if (snsType) {
  //     const params = new URLSearchParams(window.location.search);
  //     const code = params.get("code");

  //     if (code) {
  //       handleCallback(code, snsType);
  //     }
  //   }
  // }, [snsType]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    // URL에서 state 파라미터나 referrer 확인하여 로그인 타입 판단
    const state = params.get("state");
    let type = localStorage.getItem("loginType") || "kakao";

    if (state && state.includes("google")) {
      type = "google";
    } else if (state && state.includes("naver")) {
      type = "naver";
    } else if (window.location.search.includes("google") ||
      document.referrer.includes("google") ||
      document.referrer.includes("accounts.google.com")) {
      type = "google";
    } else if (window.location.search.includes("naver") ||
      document.referrer.includes("naver") ||
      document.referrer.includes("nid.naver.com")) {
      type = "naver";
    }
    // localStorage에 정확한 타입 저장
    localStorage.setItem("loginType", type);

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
      {/* <div className={style.hero_section}>
        <HeroSection setCurrent={setCurrentPage} />
      </div> */}
    </div>
  );
}
