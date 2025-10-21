import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Coins,
  FileText,
  Settings
} from "lucide-react";
import Navbar from "../Navbar";
import { TokenManagement } from "./TokenManagement";
import { DiagnosisRecords } from "./DiagnosisRecords";
import { ProfileSettings } from "./ProfileSettings";
import { MyCard } from "./MyCard";
import axios from "axios";
import { UserInfo } from "../type/type";
import { useLanguage } from "../LanguageContext";

type TabType = "tokens" | "diagnosis" | "profile";

export function MyPage() {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<TabType>(
    location.state?.tab || "profile"
  );
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [userInfoData, setUserInfoData] = useState<UserInfo | null>(null);
  const [recordData, setRecordData] = useState(null);
  const [userPaymentData, setUserPaymentData] = useState(null);


  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert(t('loginRequiredAlert'));
      navigate('/signin');
    }
  }, [navigate, t]);

  const userMyPageAPI = async (retryCount = 0): Promise<void> => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const MAX_RETRIES = 3; // ✅ 최대 재시도 횟수
    const RETRY_DELAY = 1000; // ✅ 재시도 간격(ms) — 1초
  
    try {
      const response = await axios.get(`${apiBaseUrl}/user/mypage`, {
        withCredentials: true,
      });
  
      console.log(response.data);
      setRecordData(response.data.recordData.paperweights);
      setUserInfoData(response.data.userData.userInfo);
      setUserPaymentData(response.data.userPaymentData.userPayment);
    } catch (error) {
      console.error(`userMyPageAPI 실패 (시도 ${retryCount + 1}회):`, error);
      if (retryCount < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY)); // 잠깐 대기
        return userMyPageAPI(retryCount + 1); // 재귀적으로 재시도
      }
      alert("서버 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  

  useEffect(() => {
    userMyPageAPI();
  }, [])



  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-6">
        <div className="w-full">
          {userInfoData && <MyCard userInfoData={userInfoData} />}
          <div className="grid w-full grid-cols-3 mb-6 mt-6">
            <div
              className={`flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 p-4 cursor-pointer transition-colors ${selectedTab === "profile" ? "bg-orange-50 border-b-2 border-orange-500" : "bg-white"
                }`}
              onClick={() => setSelectedTab("profile")}
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">{t("mypage_profile")}</span>
            </div>
            <div
              className={`flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 p-4 cursor-pointer transition-colors ${selectedTab === "diagnosis" ? "bg-orange-50 border-b-2 border-orange-500" : "bg-white"
                }`}
              onClick={() => setSelectedTab("diagnosis")}
            >
              <FileText className="w-5 h-5" />
              <span className="hidden sm:inline">{t("mypage_diagnosisRecords")}</span>
            </div>
            <div
              className={`flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 p-4 cursor-pointer transition-colors ${selectedTab === "tokens" ? "bg-orange-50 border-b-2 border-orange-500" : "bg-white"
                }`}
              onClick={() => setSelectedTab("tokens")}
            >
              <Coins className="w-5 h-5" />
              <span className="hidden sm:inline">{t("mypage_tokenManagement")}</span>
            </div>
          </div>

          {userInfoData && selectedTab === "profile" && <ProfileSettings userInfoData={userInfoData} />}

          {recordData && selectedTab === "diagnosis" && <DiagnosisRecords recordData={recordData} />}

          {userPaymentData && selectedTab === "tokens" && <TokenManagement userPaymentData={userPaymentData} />}

        </div>
      </div>
    </div>
  );
}
