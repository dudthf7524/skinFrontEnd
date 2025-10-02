import {
    Coins,
    LogOut,
    Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserInfo } from "../type/type";
import { useLanguage } from "../LanguageContext";

type ProfileSettingsProps = {
    userInfoData: UserInfo;
};
export function MyCard({ userInfoData }: ProfileSettingsProps) {
    const navigate = useNavigate();
    const { t } = useLanguage();
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
                alert(t("mypage_logoutSuccess"));
                navigate("/")
            }
        } catch (error) {
            console.error(error)
        }
    }


    const handlePurchaseToken = () => {
        navigate("/token")
    }

    return (
        <div className="space-y-6">
            {/* Profile Card with Orange Background */}
            <div className="overflow-hidden rounded-xl  bg-gradient-to-br from-[#FF8C42] to-[#FF6B35]">
                <div className="p-4 sm:p-6 md:p-8">
                    {/* Profile Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-3 mb-4 sm:mb-6">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white rounded-full overflow-hidden flex items-center justify-center bg-white">
                                <img
                                    src={userInfoData.profileImage || "https://ssl.pstatic.net/static/pwe/address/img_profile.png"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-white">
                                <h2 className="text-xl sm:text-2xl font-bold mb-1">{userInfoData.name}</h2>
                                <p className="text-white/90 text-xs sm:text-sm">{userInfoData.email}</p>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="text-white flex items-center space-x-1 self-end sm:self-start"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-xs sm:text-sm font-medium">{t("mypage_logout")}</span>
                        </button>
                    </div>

                    {/* Stats Bar */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            {/* 보유토큰 */}
                            <div className="flex items-center justify-between sm:flex-1">
                                <div className="flex items-center space-x-2">
                                    <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    <span className="text-white text-sm sm:text-base font-medium">{t("mypage_currentTokens")}</span>
                                </div>
                                <span className="text-white text-lg sm:text-xl font-bold">{userInfoData.aiTokenCurrent}</span>
                            </div>

                            {/* 충전 버튼 */}
                            <button
                                type="button"
                                onClick={() => handlePurchaseToken()}
                                className="flex items-center justify-center space-x-2 bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium w-full sm:w-auto"
                            >
                                <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>{t("mypage_recharge")}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
