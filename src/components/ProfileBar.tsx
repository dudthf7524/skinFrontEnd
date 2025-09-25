import { useState, useRef } from "react";
import ProfileImage from "./ui/profileImage"
import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import axios from "axios";

// interface propsType {
//     handleNavigation: (page: string) => void;
// }

export default function ProfileBar() {
    // localStorage에서 user 정보를 가져오고, JSON 파싱
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const profileImage = user?.profileImage
    let name = "";
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            name = user.name || "";
        } catch (e) {
            name = "";
        }
    }
    const handlerClickProfile = () => {
        // handleNavigation("record");
    }
    // 드롭다운 상태 및 타이머 ref
    const [showLogout, setShowLogout] = useState(false);
    // NodeJS.Timeout 대신 number로 타입 지정 (브라우저 환경)
    const hideTimer = useRef<number | null>(null);

    // 드롭다운을 바로 보여줌
    const handleMouseEnter = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
            // hideTimr.current = null;
        }
        setShowLogout(true);
    };

    // 드롭다운을 약간의 딜레이 후 숨김
    const handleMouseLeave = () => {
        // hideTimer.current = setTimeout(() => {
        //     setShowLogout(false);
        // }, 120); // 120ms 딜레이 (너무 짧으면 200~300ms로 조정 가능)
    };

    // 로그아웃 처리 함수
    const handleLogout = async () => {
        localStorage.removeItem('user');
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        try {
            const response = await axios.post(`${apiBaseUrl}/auth/logout`,
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
        <div
            className="flex items-center space-x-2 md:space-x-4 relative group"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        >
            {/* 프로필 이미지 */}
            <div
                className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 cursor-pointer"
                onClick={handlerClickProfile}
            >
                {
                    profileImage ? (<ProfileImage />) : (<div></div>)
                }

            </div>
            {/* 데스크탑용 인사말 */}
            {/* <div className="hidden md:flex flex-col">
                <span className="font-semibold text-base md:text-lg">{name}님,</span>
                <span className="text-sm md:text-base text-gray-500">안녕하세요!</span>
            </div> */}
            {/* 모바일용 인사말 */}
            {/* <div className="flex flex-col md:hidden">
                <span className="font-semibold text-sm">{name}님</span>
            </div> */}
            {/* 호버 시 로그아웃 버튼 */}
            <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="hidden sm:flex h-8 px-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-700 text-sm font-normal shadow-sm"
            >
                <span className="text-sm">로그아웃</span>
            </Button>
            {/* <div
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
            </div> */}

        </div>
    )
}