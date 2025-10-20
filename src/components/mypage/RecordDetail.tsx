import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ArrowLeft, User, Calendar, Weight, MapPin, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../LanguageContext';

interface QuestionnaireData {
  id: string;
  imagePath: string;
  confidence: string;
  description: string;
  diseaseName: string;
  predictName: string;
  createdAt: string;
}

export function RecordDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [data, setData] = useState<QuestionnaireData | null>(null);
  const [loading, setLoading] = useState(true);

  const convertPredictName = (value?: string): string => {
    if (!value) return "";
    const map: Record<string, string> = {
      A1: "구진 및 플라크",
      A2: "인설성 질환 (비듬, 각질, 상피성 잔고리)",
      A3: "태선화 및 과다색소침착",
      A4: "농포 및 면포",
      A5: "피부 결손",
      A6: "결절 및 종괴",
    };
    return map[value] ?? value; // 매핑 없으면 원래 값 반환
  };

  const postRecordDetail = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${apiBaseUrl}/user/record-detail/${id}`, {
        withCredentials: true,
      });
      console.log('백엔드 응답:', response.data);
      setData(response.data.data)
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  }


  useEffect(() => {
    postRecordDetail();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  console.log("data", data)

  const buildImgSrc = (p?: string) => {
    if (!p) return "";
    if (/^(https?:)?\/\//i.test(p) || /^(data:|blob:)/i.test(p)) return p;
    return p.startsWith("/") ? p : `/${p.replace(/^(\.\/|\/)?/, "")}`;
  };

  // 질병 키를 소문자 카멜케이스로 변환하는 함수
  const getDiseaseKey = (diseaseName: string) => {
    return diseaseName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  };

  // 섹션별 설명 키 반환 함수
  const getDescriptionKey = (predictName: string, diseaseKey: string) => {
    if (predictName === 'A2' && diseaseKey === 'superficialpyoderma') {
      return `${diseaseKey}A2Desc`;
    }
    // 다른 섹션에 대한 추가 조건이 필요하면 여기에 추가
    return `${diseaseKey}Desc`;
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("mypage_dataNotFound")}</h2>
          <p className="text-gray-600 mb-4">{t("mypage_diagnosisInfoNotExist")}</p>
          <Button onClick={() => navigate('/mypage', { state: { tab: 'diagnosis' } })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("mypage_backToList")}
          </Button>
        </div>
      </div>
    );
  }



  const diseaseKey = getDiseaseKey(data.diseaseName);
  const translatedDiseaseName = t(`${diseaseKey}Name`);
  const descriptionKey = getDescriptionKey(data.predictName, diseaseKey);
  const translatedDescription = t(descriptionKey);

  return (
    <div className="min-h-screen bg-white from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/mypage', { state: { tab: 'diagnosis' } })}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("mypage_backToList")}
          </Button>
          <div className="p-7 bg-white rounded-2xl border border-gray-200 shadow-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("mypage_diagnosisDetailView")}</h1>
            <p className="text-gray-600">{t("mypage_receptionDate")} {formatDate(data.createdAt)}</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50">
              <CardTitle className="flex items-center">
                <span className="text-lg sm:text-xl font-bold text-gray-900">{t("mypage_analysisResult")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="">

              <div className="flex items-center justify-center mb-4">
                <img
                  src={buildImgSrc(data?.imagePath)}
                  className="object-cover rounded-xl border-2 border-blue-300 shadow-lg"
                  style={{ width: '224px', height: '224px' }}
                />
              </div>

              <div className="text-left mb-4">
                <span className="text-lg sm:text-xl font-bold text-gray-900">{t("mypage_skinConditionClassification")}</span>
              </div>


              <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl border-2 border-blue-200 mb-6">
                <div className="text-center">
                  <p className="text-base sm:text-lg font-semibold text-blue-800 mt-2">{convertPredictName(data.predictName)}</p>
                </div>
              </div>

              {/* 예상 진단 내용 */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">{t("mypage_expectedDiagnosis")}</span>
                </div>

                <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-orange-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{translatedDiseaseName}</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{translatedDescription}</p>
                </div>

                <div className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-orange-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm sm:text-base font-bold text-gray-800">{t("mypage_aiConfidence")}</span>
                    <span className="text-lg sm:text-xl font-bold text-orange-600">{data.confidence}%</span>
                  </div>
                  <div className="relative">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${data.confidence}%`,
                          background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)',
                          boxShadow: '0 0 20px rgba(240, 102, 63, 0.4)'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}