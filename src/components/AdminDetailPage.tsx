import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

interface QuestionnaireData {
  id: string;
  imagePath: string;
  confidence: number;
  description: string | { ko: string; en?: string; ja?: string; zh?: string };
  diseaseName: string | { ko: string; en?: string; ja?: string; zh?: string };
  predictName: string;
  createdAt: string;
}

export function AdminDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<QuestionnaireData | null>(null);

  const convertPredictName = (value?: string): string => {
    if (!value) return '';
    const map: Record<string, string> = {
      A1: '구진 및 플라크',
      A2: '인설성 질환 (비듬, 각질, 상피성 잔고리)',
      A3: '태선화 및 과다색소침착',
      A4: '농포 및 면포',
      A5: '피부 결손',
      A6: '결절 및 종괴',
    };
    return map[value] ?? value;
  };

  const postAdminDetail = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${apiBaseUrl}/admin/detail/${id}`);
      console.log('백엔드 응답:', response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    }
  };

  useEffect(() => {
    postAdminDetail();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const buildImgSrc = (p?: string) => {
    if (!p) return '';
    if (/^(https?:)?\/\//i.test(p) || /^(data:|blob:)/i.test(p)) return p;
    return p.startsWith('/') ? p : `/${p.replace(/^(\.\/|\/)?/, '')}`;
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">데이터를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-4">요청하신 문진표 정보가 존재하지 않습니다.</p>
          <Button onClick={() => navigate('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 헤더 */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/admin')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </Button>
          <div className="p-7 bg-white rounded-2xl border border-gray-200 shadow-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">문진표 상세보기</h1>
            <p className="text-gray-600">접수일 {formatDate(data.createdAt)}</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50">
              <CardTitle className="flex items-center">
                <span className="text-lg sm:text-xl font-bold text-gray-900">🔍 분석결과</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* 이미지 */}
              <div className="flex items-center justify-center mb-4">
                <img
                  src={buildImgSrc(data.imagePath)}
                  className="object-cover rounded-xl border-2 border-blue-300 shadow-lg"
                  style={{ width: '224px', height: '224px' }}
                />
              </div>

              {/* 피부 상태 */}
              <div className="text-left mb-4">
                <span className="text-lg sm:text-xl font-bold text-gray-900">피부 상태 분류</span>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl border-2 border-blue-200 mb-6">
                <div className="text-center">
                  <p className="text-base sm:text-lg font-semibold text-blue-800 mt-2">
                    {convertPredictName(data.predictName)}
                  </p>
                </div>
              </div>

              {/* 예상 진단 */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">예상 진단</span>
                </div>

                <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-orange-200">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                    {typeof data.diseaseName === 'object' ? data.diseaseName.ko : data.diseaseName}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {typeof data.description === 'object' ? data.description.ko : data.description}
                  </p>
                </div>

                {/* AI 신뢰도 */}
                <div className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-orange-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm sm:text-base font-bold text-gray-800">AI 신뢰도</span>
                    <span className="text-lg sm:text-xl font-bold text-orange-600">{data.confidence}%</span>
                  </div>
                  <div className="relative">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${data.confidence}%`,
                          background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)',
                          boxShadow: '0 0 20px rgba(240, 102, 63, 0.4)',
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
