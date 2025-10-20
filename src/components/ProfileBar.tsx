import { useState, useRef } from "react";
import ProfileImage from "./ui/profileImage";
import { Button } from "./ui/button";
import { Globe, User } from "lucide-react";
import axios from "axios";
import { useLanguage } from "./LanguageContext";
import { useNavigate } from "react-router-dom";

export default function ProfileBar() {
    const { t } = useLanguage();
    const navigation = useNavigate();

    // 안전하게 파싱
    let user: any = null;
    let profileImage = "";
    let name = "";
    let role = "";

    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            user = JSON.parse(userStr);
            name = user?.name || "";
            profileImage = user?.profileImage || "";
            role = user?.role || "";
        } catch (e) {
            name = "";
            profileImage = "";
            role = "";
        }
    }

    const handlerClickProfile = () => {
        navigation("/mypage");
    };

    // 드롭다운 상태 및 타이머 ref
    const [showLogout, setShowLogout] = useState(false);
    const hideTimer = useRef<number | null>(null);

    // 드롭다운을 바로 보여줌
    const handleMouseEnter = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
        }
        setShowLogout(true);
    };

    // 드롭다운을 약간의 딜레이 후 숨김 (주석 처리된 부분은 미사용)
    const handleMouseLeave = () => {
        // hideTimer.current = setTimeout(() => {
        //     setShowLogout(false);
        // }, 120);
    };

    // 로그아웃 처리 함수
    const handleLogout = async () => {
        localStorage.removeItem('user');
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        try {
            const response = await axios.post(
                `${apiBaseUrl}/auth/logout`,
                {},
                {
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                alert(response.data.message);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center space-x-2 md:space-x-4 relative group">
            {/* 어드민 버튼: user가 존재하고 role이 ADMIN일 때만 */}
            {role === "ADMIN" && (
                <button
                    onClick={() => navigation("/admin")}
                    className="px-4 py-2 bg-orange-200 rounded text-orange-900 font-bold hover:bg-orange-300 transition"
                >
                    어드민 페이지
                </button>
            )}

            {/* 프로필 이미지 */}
            <div
                className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 cursor-pointer"
                onClick={handlerClickProfile}
            >
                {profileImage ? (
                    <ProfileImage />
                ) : (
                    <div className="w-full h-full bg-orange-50 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-orange-500" />
                    </div>
                )}
            </div>
            {/* 아래 인사말, 로그아웃 버튼 등은 필요에 따라 해제 */}
            {/* 
            <div className="hidden md:flex flex-col">
                <span className="font-semibold text-base md:text-lg">{name}님,</span>
                <span className="text-sm md:text-base text-gray-500">안녕하세요!</span>
            </div>
            <div className="flex flex-col md:hidden">
                <span className="font-semibold text-sm">{name}님</span>
            </div>
            <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="hidden sm:flex h-8 px-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-700 text-sm font-normal shadow-sm"
            >
                <span className="text-sm">{t('logout')}</span>
            </Button>
            <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 bg-white border border-gray-200 rounded shadow-lg px-4 py-2 min-w-[120px] text-center"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <button
                    className="w-full py-2 text-red-500 font-semibold hover:underline text-base rounded"
                    style={{ minWidth: "100px" }}
                    onClick={handleLogout}
                >
                    로그아웃
                </button>
            </div> 
            */}
        </div>
    );
}