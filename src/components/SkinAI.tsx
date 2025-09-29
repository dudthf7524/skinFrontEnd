import { useEffect, useState } from "react";
import { PhotoUpload } from "./PhotoUpload";
import { MedicalQuestionnaire } from "./MedicalQuestionnaire";
import { DiagnosisResult } from "./DiagnosisResult";
import { ResultShare } from "./ResultShare";
import { Stethoscope } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { useTokenCheck } from "../hooks/useTokenCheck";

type Step =
  | "questionnaire"
  | "upload"
  | "diagnosis"
  | "complete";

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  reviewCount: number;
  phone: string;
  openHours: string;
  specialties: string[];
  isOpen: boolean;
  estimatedWaitTime: string;
}

interface DiagnosisData {
  condition: string;
  predictClass?: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  description: string;
  recommendations: string[];
  urgency: "normal" | "urgent" | "emergency";
}

interface QuestionnaireData {
  petName: string;
  petBirthDate: string;
  petBreed: string;
  customBreed?: string;
  weight: string;
  pruritus: string; // '없음', '보통', '심함'
  alopecia: boolean; // 탈모
  odor: boolean; // 냄새
  affectedAreas: string[];
  ownerEmail?: string;
}

const SkinAIContent = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Step>("questionnaire");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiagnosisData | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 모의 진단 데이터
  const mockDiagnosis: DiagnosisData = {
    condition: "아토피성 피부염",
    confidence: 87,
    severity: "medium",
    description:
      "알레르기 반응으로 인한 피부 염증으로 보입니다. 가려움증과 발적이 주요 증상입니다.",
    recommendations: [
      "알레르기 유발 요소 제거",
      "규칙적인 목욕과 보습",
      "수의사 처방 항히스타민제 복용",
      "스트레스 관리",
    ],
    urgency: "urgent",
  };

  // 모의 병원 데이터
  const mockHospitals: Hospital[] = [
    {
      id: "1",
      name: "메디펫 동물병원",
      address: "서울시 강남구 테헤란로 123",
      distance: "0.8km",
      rating: 4.8,
      reviewCount: 156,
      phone: "02-1234-5678",
      openHours: "09:00 - 21:00",
      specialties: ["피부과", "내과", "외과"],
      isOpen: true,
      estimatedWaitTime: "15-20분",
    },
    {
      id: "2",
      name: "사랑 동물병원",
      address: "서울시 강남구 논현로 456",
      distance: "1.2km",
      rating: 4.6,
      reviewCount: 89,
      phone: "02-9876-5432",
      openHours: "10:00 - 19:00",
      specialties: ["피부과", "치과"],
      isOpen: true,
      estimatedWaitTime: "10-15분",
    },
    {
      id: "3",
      name: "24시 펫클리닉",
      address: "서울시 서초구 강남대로 789",
      distance: "1.5km",
      rating: 4.7,
      reviewCount: 203,
      phone: "02-5555-7777",
      openHours: "24시간 운영",
      specialties: ["응급의료", "피부과", "내과"],
      isOpen: true,
      estimatedWaitTime: "5-10분",
    },
  ];

  const { checkUserToken } = useTokenCheck();

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

  useEffect(() => {
    handleSkinAiPage();
  }, [])

  const handleQuestionnaireComplete = (data: QuestionnaireData) => {
    console.log('문진표 완료 데이터:', data);
    setQuestionnaireData(data);
    setCurrentStep("upload");
  };

  const uploadPhotoToBackend = async (original: File, croped?: File) => {
    try {
      console.log('업로드 시 questionnaireData 상태:', questionnaireData);

      const formData = new FormData();


      const userName = "kimsinwoo";

      // 언어 정보 추가
      formData.append('language', language);

      // 문진표 데이터를 개별 필드로 전송
      if (questionnaireData) {
        formData.append('userName', userName);
        formData.append('petName', questionnaireData.petName);
        formData.append('petBirthDate', questionnaireData.petBirthDate);
        formData.append('petBreed', questionnaireData.petBreed);
        formData.append('customBreed', questionnaireData.customBreed || '');
        formData.append('weight', questionnaireData.weight);
        formData.append('pruritus', questionnaireData.pruritus);
        formData.append('alopecia', questionnaireData.alopecia.toString());
        formData.append('odor', questionnaireData.odor.toString());
        formData.append('affectedAreas', JSON.stringify(questionnaireData.affectedAreas));
        formData.append('ownerEmail', questionnaireData.ownerEmail || '');
        console.log('문진표 데이터 개별 필드로 추가됨:', questionnaireData);
      } else {
        console.warn('문진표 데이터가 없습니다!');
      }
      formData.append('original', original, "original.png");
      if (croped) {
        formData.append('croped', croped, "croped.png");
      }

      console.log('FormData 내용 : ', formData);
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }



      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${apiBaseUrl}/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        validateStatus: function (status) {
          // 모든 상태 코드를 성공으로 처리하여 catch로 가지 않게 함
          return status < 500;
        }
      });

      // 403 상태 코드면 403을 반환
      if (response.status === 403) {
        console.log('사진 업로드 결과: 403 (사람 이미지 감지)');
        return 403;
      }

      const result = response.data;
      console.log('사진 업로드 성공:', result);
      return result;
    } catch (error) {
      console.error('사진 업로드 실패:', error);
      throw error;
    }
  };

  const handlePhotoUpload = async (original: File, croped?: File) => {
    const fileToUse = croped || original;
    setUploadedFile(fileToUse);

    // 이미지 URL 생성 (미리보기용)
    const imageUrl = URL.createObjectURL(fileToUse);
    setUploadedImageUrl(imageUrl);

    setIsLoading(true);

    try {
      const uploadResult = await uploadPhotoToBackend(original, croped);
      console.log("uploadResult", uploadResult);

      // 403 상태 코드 확인 (사람 이미지 감지)
      if (uploadResult === 403 || (typeof uploadResult === 'object' && uploadResult.status === 403)) {
        setIsLoading(false);
        alert('사람 이미지로 판단되었습니다.\n사진을 다시 선택해주세요.');
        return;
      }

      // 백엔드 응답을 DiagnosisData 형태로 변환
      if (uploadResult.data) {
        const backendData = uploadResult.data;
        const diagnosisData: DiagnosisData = {
          condition: backendData.disease_name || "진단 결과 없음",
          predictClass: backendData.predict_class || "",
          confidence: Math.round((backendData.confidence || 0) * 100),
          severity: "medium", // 백엔드에서 제공하지 않으므로 기본값
          description: backendData.description || "설명이 없습니다.",
          recommendations: [], // 빈 배열로 설정
          urgency: "normal", // 기본값
        };
        setDiagnosis(diagnosisData);
        setIsLoading(false);
        setCurrentStep("diagnosis");
      } else {
        // 백엔드에서 데이터가 없으면 모의 데이터 사용
        setDiagnosis(mockDiagnosis);
        setIsLoading(false);
        setCurrentStep("diagnosis");
      }
    } catch (error: any) {
      console.error('업로드 중 오류 발생:', error);
      setIsLoading(false);

      // 403 에러 (사람 이미지 감지) 처리
      if (error.response && error.response.status === 403) {
        alert('사람 이미지로 판단되었습니다.\n사진을 다시 선택해주세요.');
      } else {
        alert('사진 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleDiagnosisComplete = () => {
    // 새로운 AI 분석을 위해 모든 상태 초기화하고 첫 번째 단계로 이동
    setCurrentStep("questionnaire");
    setUploadedFile(null);
    setUploadedImageUrl(null);
    setQuestionnaireData(null);
    setDiagnosis(null);
    setSelectedHospital(null);
    setIsLoading(false);
  };

  const handleRestart = () => {
    setCurrentStep("questionnaire");
    setUploadedFile(null);
    setUploadedImageUrl(null);
    setQuestionnaireData(null);
    setDiagnosis(null);
    setSelectedHospital(null);
    setIsLoading(false);
  };

  const goBack = () => {
    switch (currentStep) {
      case "upload":
        setCurrentStep("questionnaire");
        break;
      case "diagnosis":
        setCurrentStep("upload");
        setDiagnosis(null);
        setIsLoading(false);
        break;
    }
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-red-50 flex flex-col relative">
      <Navbar currentPage="skinai" />

      {/* 향상된 진행 상태 표시 */}
      {currentStep !== "complete" && (
        <div className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex-shrink-0 relative z-10">
          <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-3 sm:p-4 md:p-6 md:px-10 shadow-xl border border-white/30 max-w-2xl mx-auto">
            <div className="flex items-center justify-between max-w-full">
              {/* 단계 1: 정보입력 */}
              <div className="flex flex-col items-center">
                <div className="relative flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold transition-all duration-500 ${currentStep === "questionnaire"
                      ? "text-white shadow-xl scale-110 ring-2 sm:ring-4 ring-orange-200/50"
                      : ["questionnaire", "upload", "diagnosis"].indexOf(currentStep) > 0
                        ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                      }`}
                    style={
                      currentStep === "questionnaire"
                        ? { background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)" }
                        : {}
                    }
                  >
                    {["questionnaire", "upload", "diagnosis"].indexOf(currentStep) > 0 ? "✓" : "1"}
                  </div>
                  <div className={`mt-1 sm:mt-1.5 md:mt-2 text-[8px] sm:text-[10px] md:text-xs font-medium transition-all duration-300 text-center whitespace-nowrap ${currentStep === "questionnaire" ? "text-orange-600" : ["questionnaire", "upload", "diagnosis"].indexOf(currentStep) > 0 ? "text-emerald-600" : "text-gray-400"
                    }`}>
                    {t("infoInput")}
                  </div>
                  {/* {currentStep === "questionnaire" && (
                    <>
                      <div className="absolute top-0 left-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-2xl animate-ping opacity-20" style={{ background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)" }}></div>
                      <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-xl animate-pulse opacity-30" style={{ background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)" }}></div>
                    </>
                  )} */}
                </div>
              </div>

              {/* 연결선 1 */}
              {/* <div className="flex items-center justify-center self-start mt-2.5 sm:mt-3 md:mt-4">
                <div className="w-12 sm:w-20 md:w-28 lg:w-36 xl:w-44 h-0.5 sm:h-1 md:h-1.5 rounded-full overflow-hidden bg-gray-100 relative">
                  <div className={`h-full transition-all duration-700 ease-out rounded-full ${currentStep === "questionnaire"
                    ? "w-1/2 bg-gradient-to-r from-orange-400 to-orange-500 animate-pulse"
                    : ["questionnaire", "upload", "diagnosis"].indexOf(currentStep) > 0
                      ? "w-full bg-gradient-to-r from-emerald-400 to-green-500"
                      : "w-0"
                    }`} />
                  {currentStep === "questionnaire" && (
                    <div className="absolute top-0 left-0 h-full w-4 sm:w-6 md:w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
                  )}
                </div>
              </div> */}

              {/* 단계 2: 사진업로드 */}
              <div className="flex flex-col items-center">
                <div className="relative flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold transition-all duration-500 ${currentStep === "upload"
                      ? "text-white shadow-xl scale-110 ring-2 sm:ring-4 ring-orange-200/50"
                      : ["questionnaire", "upload", "diagnosis"].indexOf(currentStep) > 1
                        ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                      }`}
                    style={
                      currentStep === "upload"
                        ? { background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)" }
                        : {}
                    }
                  >
                    {["questionnaire", "upload", "diagnosis"].indexOf(currentStep) > 1 ? "✓" : "2"}
                  </div>
                  <div className={`mt-1 sm:mt-1.5 md:mt-2 text-[8px] sm:text-[10px] md:text-xs font-medium transition-all duration-300 text-center whitespace-nowrap ${currentStep === "upload" ? "text-orange-600" : ["questionnaire", "upload", "diagnosis"].indexOf(currentStep) > 1 ? "text-emerald-600" : "text-gray-400"
                    }`}>
                    {t("photoUpload")}
                  </div>
                  {currentStep === "upload" && (
                    <>
                      <div className="absolute top-0 left-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-2xl animate-ping opacity-20" style={{ background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)" }}></div>
                      <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-xl animate-pulse opacity-30" style={{ background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)" }}></div>
                    </>
                  )}
                </div>
              </div>

              {/* 연결선 2 */}
              {/* <div className="flex items-center justify-center self-start mt-2.5 sm:mt-3 md:mt-4">
                <div className="w-12 sm:w-20 md:w-28 lg:w-36 xl:w-44 h-0.5 sm:h-1 md:h-1.5 rounded-full overflow-hidden bg-gray-100 relative">
                  <div className={`h-full transition-all duration-700 ease-out rounded-full ${currentStep === "upload"
                    ? "w-1/2 bg-gradient-to-r from-orange-400 to-orange-500 animate-pulse"
                    : ["questionnaire", "upload", "diagnosis"].indexOf(currentStep) > 1
                      ? "w-full bg-gradient-to-r from-emerald-400 to-green-500"
                      : "w-0"
                    }`} />
                  {currentStep === "upload" && (
                    <div className="absolute top-0 left-0 h-full w-4 sm:w-6 md:w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
                  )}
                </div>
              </div> */}

              {/* 단계 3: 진단결과 */}
              <div className="flex flex-col items-center">
                <div className="relative flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold transition-all duration-500 ${currentStep === "diagnosis"
                      ? "text-white shadow-xl scale-110 ring-2 sm:ring-4 ring-orange-200/50"
                      : ["questionnaire", "upload", "diagnosis"].indexOf(currentStep) > 2
                        ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                      }`}
                    style={
                      currentStep === "diagnosis"
                        ? { background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)" }
                        : {}
                    }
                  >
                    {["questionnaire", "upload", "diagnosis"].indexOf(currentStep) > 2 ? "✓" : "3"}
                  </div>
                  <div className={`mt-1 sm:mt-1.5 md:mt-2 text-[8px] sm:text-[10px] md:text-xs font-medium transition-all duration-300 text-center whitespace-nowrap ${currentStep === "diagnosis" ? "text-orange-600" : ["questionnaire", "upload", "diagnosis"].indexOf(currentStep) > 2 ? "text-emerald-600" : "text-gray-400"
                    }`}>
                    {t("diagnosisResult")}
                  </div>
                  {currentStep === "diagnosis" && (
                    <>
                      <div className="absolute top-0 left-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-2xl animate-ping opacity-20" style={{ background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)" }}></div>
                      <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-xl animate-pulse opacity-30" style={{ background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)" }}></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 메인 콘텐츠 */}
      <main className="flex-1 relative z-10 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className={`w-full mx-auto ${currentStep === "complete" ? "max-w-4xl" : "max-w-2xl"}`}>
          {currentStep === "questionnaire" && (
            <MedicalQuestionnaire onComplete={handleQuestionnaireComplete} onBack={goHome} />
          )}

          {currentStep === "upload" && !isLoading && (
            <PhotoUpload onPhotoUploaded={handlePhotoUpload} onBack={goBack} />
          )}

          {currentStep === "upload" && isLoading && (
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/30 max-w-md mx-auto">
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6">
                  {/* 애니메이션 아이콘 */}
                  <div className="relative">
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-xl"
                      style={{
                        background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)",
                      }}
                    >
                      <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white animate-bounce" />
                    </div>
                    {/* 회전하는 링 */}
                    <div className="absolute -inset-2 rounded-2xl border-2 border-orange-200 animate-spin opacity-60"></div>
                    <div className="absolute -inset-4 rounded-2xl border border-orange-100 animate-ping opacity-40"></div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight px-2">
                      {questionnaireData?.petName
                        ? t("petSkinAnalysis", { petName: questionnaireData.petName })
                        : t("aiAnalysisInProgress")
                      }
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xs mx-auto px-2">
                      {t("advancedAiAnalysis")}
                    </p>
                  </div>

                  {/* 향상된 진행 바 */}
                  <div className="w-full max-w-xs space-y-2">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden relative">
                      <div
                        className="h-full rounded-full animate-pulse relative"
                        style={{
                          background: "linear-gradient(90deg, #f0663f 0%, #d45a2f 100%)",
                          animation: "progress 2s ease-in-out infinite"
                        }}
                      ></div>
                      {/* 글리터 효과 */}
                      <div className="absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
                    </div>
                    <div className="flex justify-between text-[10px] sm:text-xs text-gray-500">
                      <span>{t("imageAnalysis")}</span>
                      <span>{t("patternRecognition")}</span>
                      <span>{t("diagnosisComplete")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === "diagnosis" && diagnosis && (
            <DiagnosisResult
              diagnosis={diagnosis}
              onContinue={handleDiagnosisComplete}
              onBack={goBack}
              uploadedImage={uploadedImageUrl}
              hospitals={mockHospitals}
              questionnaireData={questionnaireData}
            />
          )}

          {currentStep === "complete" && diagnosis && questionnaireData && (
            <ResultShare
              hospitals={mockHospitals}
              diagnosis={diagnosis}
              questionnaireData={questionnaireData}
              onComplete={handleRestart}
            />
          )}
        </div>
      </main>

      {/* 향상된 푸터 */}
      <footer className="border-t border-orange-100/30 bg-white/70 backdrop-blur-xl flex-shrink-0 relative z-10 mt-auto">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4">
          <div className="text-center">
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 flex items-center justify-center space-x-2 font-medium px-2">
              <span className="text-orange-500 flex-shrink-0">💡</span>
              <span className="leading-relaxed">
                {t("disclaimer")}
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function SkinAI() {
  return <SkinAIContent />;
}