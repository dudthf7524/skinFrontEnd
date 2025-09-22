import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowLeft, User, Calendar, Weight, MapPin, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface QuestionnaireData {
  id: string;
  petName: string;
  petBirthDate: string;
  petBreed: string;
  weight: string;
  pruritus: string;
  alopecia: boolean;
  odor: boolean;
  affectedAreas: string[];
  ownerEmail?: string;
  createdAt: string;
  diagnosisResult?: {
    condition: string;
    predictClass?: string;
    confidence: number;
    severity: 'low' | 'medium' | 'high';
    description: string;
    recommendations?: string[];
    urgency?: 'normal' | 'urgent' | 'emergency';
  };
}

export function AdminDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<QuestionnaireData | null>(null);
  const [loading, setLoading] = useState(true);

  // 모의 데이터 - 실제로는 API에서 가져와야 함
  useEffect(() => {
    const mockData: QuestionnaireData[] = [
      {
        id: '1',
        petName: '멍멍이',
        petBirthDate: '2020-05-15',
        petBreed: '골든 리트리버',
        weight: '25.5',
        pruritus: 'severe',
        alopecia: true,
        odor: false,
        affectedAreas: ['face', 'legs'],
        ownerEmail: 'owner1@example.com',
        createdAt: '2024-01-15T10:30:00Z',
        diagnosisResult: {
          condition: '아토피성 피부염',
          predictClass: '구진,플라크',
          confidence: 85,
          severity: 'medium',
          description: '알레르기성 피부 질환으로 보입니다. 환경적 요인이나 음식 알레르기가 원인일 수 있습니다.',
          recommendations: [
            '알레르기 유발 요소 제거',
            '항히스타민제 투여 고려',
            '피부 보습 관리',
            '정기적인 목욕과 관리'
          ],
          urgency: 'urgent'
        }
      },
      {
        id: '2',
        petName: '냥냥이',
        petBirthDate: '2021-03-10',
        petBreed: '페르시안',
        weight: '4.2',
        pruritus: 'moderate',
        alopecia: false,
        odor: true,
        affectedAreas: ['ears', 'neck'],
        ownerEmail: 'owner2@example.com',
        createdAt: '2024-01-14T14:20:00Z',
        diagnosisResult: {
          condition: '외이염',
          predictClass: '상피성잔고리',
          confidence: 92,
          severity: 'low',
          description: '세균성 외이염으로 추정됩니다. 습한 환경이나 귀 청소 부족이 원인일 수 있습니다.',
          recommendations: [
            '귀 청소 및 건조 유지',
            '항생제 치료',
            '염증 완화 치료',
            '정기적인 귀 검진'
          ],
          urgency: 'normal'
        }
      },
      {
        id: '3',
        petName: '보리',
        petBirthDate: '2019-08-22',
        petBreed: '말티즈',
        weight: '3.8',
        pruritus: 'none',
        alopecia: true,
        odor: false,
        affectedAreas: ['back', 'sides'],
        ownerEmail: 'owner3@example.com',
        createdAt: '2024-01-13T09:15:00Z'
      },
      {
        id: '4',
        petName: '루루',
        petBirthDate: '2022-01-05',
        petBreed: '비글',
        weight: '12.0',
        pruritus: 'severe',
        alopecia: false,
        odor: true,
        affectedAreas: ['belly', 'legs'],
        ownerEmail: 'owner4@example.com',
        createdAt: '2024-01-12T16:45:00Z',
        diagnosisResult: {
          condition: '세균성 피부염',
          predictClass: '농포, 여드름',
          confidence: 78,
          severity: 'high',
          description: '심각한 세균 감염이 의심됩니다. 즉시 치료가 필요한 상태입니다.',
          recommendations: [
            '즉시 병원 방문',
            '항생제 치료 시작',
            '상처 부위 소독',
            '스트레스 관리',
            '면역력 강화'
          ],
          urgency: 'emergency'
        }
      }
    ];

    const foundData = mockData.find(item => item.id === id);
    setData(foundData || null);
    setLoading(false);
  }, [id]);

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">높음</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">중간</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">낮음</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default: return <CheckCircle className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getUrgencyMessage = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return '즉시 응급실 방문이 필요합니다';
      case 'urgent': return '빠른 시일 내 병원 방문을 권장합니다';
      default: return '정기적인 관리가 필요합니다';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">데이터를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-4">요청하신 문진표 정보가 존재하지 않습니다.</p>
          <Button onClick={() => navigate('/admin/list')}>
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
          <Button
            variant="outline"
            onClick={() => navigate('/admin/list')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로 돌아가기
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">문진표 상세보기</h1>
          <p className="text-gray-600">접수일: {formatDate(data.createdAt)}</p>
        </div>

        <div className="space-y-6">
          {data.diagnosisResult ? (
            <>
              {/* 예측 클래스 */}
              <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50">
                  <CardTitle className="flex items-center">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">🔍 분석결과</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="">
                  <div className="text-left mb-4">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">피부 상태 분류</span>
                  </div>

                  <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl border-2 border-blue-200 mb-6">
                    <div className="text-center">
                      <p className="text-base sm:text-lg font-semibold text-blue-800 mt-2">{data.diagnosisResult.predictClass}</p>
                    </div>
                  </div>

                  {/* 예상 진단 내용 */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg sm:text-xl font-bold text-gray-900">예상 진단</span>
                    </div>

                    <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-orange-200">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{data.diagnosisResult.condition}</h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{data.diagnosisResult.description}</p>
                    </div>

                    <div className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-orange-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm sm:text-base font-bold text-gray-800">AI 신뢰도</span>
                        <span className="text-lg sm:text-xl font-bold text-orange-600">{data.diagnosisResult.confidence}%</span>
                      </div>
                      <div className="relative">
                        <div className="h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${data.diagnosisResult.confidence}%`,
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
            </>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">진단 결과 없음</h3>
                <p className="text-gray-600">아직 AI 진단이 완료되지 않았습니다.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}