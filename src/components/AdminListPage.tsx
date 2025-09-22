import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, Search, Calendar, FileText, Filter } from 'lucide-react';

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
  };
}

export function AdminListPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [questionnaireList, setQuestionnaireList] = useState<QuestionnaireData[]>([]);

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
          description: '알레르기성 피부 질환으로 보입니다.'
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
          description: '세균성 외이염으로 추정됩니다.'
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
          description: '심각한 세균 감염이 의심됩니다.'
        }
      }
    ];
    setQuestionnaireList(mockData);
  }, []);

  // 필터링된 데이터
  const filteredData = questionnaireList.filter(item => {
    const matchesSearch = item.petName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetail = (id: string) => {
    navigate(`/admin/detail/${id}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* iOS 스타일 단색 배경 */}
      <div className="absolute inset-0 bg-gray-100"></div>

      {/* 블러 효과를 위한 배경 패턴 */}
      

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* 헤더 - 유리 효과 */}
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 drop-shadow-lg">관리자 대시보드</h1>
          <p className="text-sm sm:text-base text-gray-800 drop-shadow">반려동물 피부 진단 문진표 관리</p>
        </div>

        {/* 검색 및 필터 - 유리 효과 */}
        <div className="mb-6 p-4 sm:p-6 rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
              <Input
                placeholder="반려동물 이름으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl text-gray-900 placeholder-gray-600 focus:bg-white/25 focus:border-white/50 transition-all duration-300"
              />
            </div>
            <div>
              <Button
                className="flex items-center justify-center gap-2 h-12 px-4 sm:px-6 rounded-2xl font-medium transition-all duration-300 bg-white/30 text-gray-900 border-white/50 backdrop-blur-xl shadow-lg"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm sm:text-base">전체 ({questionnaireList.length})</span>
              </Button>
            </div>
          </div>
        </div>

        {/* 데이터 리스트 - 유리 효과 카드들 */}
        <div className="grid gap-6">
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className="group p-4 sm:p-6 rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl hover:bg-white/20 hover:border-white/40 hover:shadow-3xl hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 ease-out"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                    <h3 className="text-xl font-bold text-gray-900 drop-shadow-lg">{item.petName}</h3>
                    <div className="px-3 py-1 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 text-gray-800 text-sm font-medium">
                      {item.petBreed}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-xl">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span>생년월일: {item.petBirthDate}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-xl">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <span>체중: {item.weight}kg</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-xl">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span>접수일: {formatDate(item.createdAt)}</span>
                    </div>
                  </div>

                  {/* 증상 정보 */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-xl border border-white/20 text-gray-800 text-xs font-medium">
                        가려움: {item.pruritus === 'severe' ? '심함' : item.pruritus === 'moderate' ? '보통' : '없음'}
                      </div>
                      {item.alopecia && (
                        <div className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-xl border border-white/20 text-gray-800 text-xs font-medium">
                          털빠짐
                        </div>
                      )}
                      {item.odor && (
                        <div className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-xl border border-white/20 text-gray-800 text-xs font-medium">
                          냄새
                        </div>
                      )}
                      <div className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-xl border border-white/20 text-gray-800 text-xs font-medium">
                        부위: {item.affectedAreas.join(', ')}
                      </div>
                    </div>
                  </div>

                </div>

                <Button
                  onClick={() => handleViewDetail(item.id)}
                  className="w-full lg:w-auto lg:ml-6 h-12 px-6 bg-white/20 backdrop-blur-xl border border-white/30 text-gray-900 rounded-2xl hover:bg-white/30 hover:border-white/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  상세보기
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl">
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3 drop-shadow">검색 결과가 없습니다</h3>
            <p className="text-gray-700">다른 검색어를 사용하거나 필터를 변경해보세요.</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}