import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

type TabType = "tokens" | "diagnosis" | "profile";

export function MyPage() {
  const [selectedTab, setSelectedTab] = useState<TabType>("profile");
  const navigate = useNavigate();

  const [userInfoData, setUserInfoData] = useState<UserInfo | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('로그인이 필요합니다.');
      navigate('/signin');
    }
  }, [navigate]);

  const userMyPageAPI = async () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await axios.get(`${apiBaseUrl}/user/mypage`, {
        withCredentials: true,
      });
      console.log(response.data.userData.userInfo)
      setUserInfoData(response.data.userData.userInfo);
    } catch (error) {
      console.error(error);
    }
  }

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
              <span className="hidden sm:inline">프로필</span>
            </div>
            <div
              className={`flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 p-4 cursor-pointer transition-colors ${selectedTab === "diagnosis" ? "bg-orange-50 border-b-2 border-orange-500" : "bg-white"
                }`}
              onClick={() => setSelectedTab("diagnosis")}
            >
              <FileText className="w-5 h-5" />
              <span className="hidden sm:inline">진단 기록</span>
            </div>
            <div
              className={`flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 p-4 cursor-pointer transition-colors ${selectedTab === "tokens" ? "bg-orange-50 border-b-2 border-orange-500" : "bg-white"
                }`}
              onClick={() => setSelectedTab("tokens")}
            >
              <Coins className="w-5 h-5" />
              <span className="hidden sm:inline">토큰 관리</span>
            </div>
          </div>
          {userInfoData && selectedTab === "profile" && <ProfileSettings userInfoData={userInfoData} />}
          {selectedTab === "tokens" && <TokenManagement />}
          {selectedTab === "diagnosis" && <DiagnosisRecords />}

        </div>
      </div>
    </div>
  );
}
