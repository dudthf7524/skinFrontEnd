import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Eye, Search, Calendar, FileText, Filter } from 'lucide-react';
import axios from 'axios';

// 번역용 훅 (예시, 추후 실제 다국어 처리 시스템과 연동)
function useTranslation() {
  // 실제 번역 구현/라이브러리로 교체 필요
  const t = (key: string) => {
    const dict: Record<string, string> = {
      'admin_dashboard': '관리자 대시보드',
      'admin_petSurveyDesc': '반려동물 피부 진단 문진표 관리',
      'admin_searchPlaceholder': '반려동물 이름으로 검색...',
      'admin_all': '전체',
      'admin_birth': '생년월일',
      'admin_weight': '체중',
      'admin_reception': '접수일',
      'admin_itchiness': '가려움',
      'admin_itchiness_high': '심함',
      'admin_itchiness_medium': '보통',
      'admin_itchiness_none': '없음',
      'admin_alopecia': '털빠짐',
      'admin_odor': '냄새',
      'admin_area': '부위',
      'admin_viewDetail': '상세보기',
      'admin_noData': '문진 결과가 없습니다',
    };
    return dict[key] || key;
  };
  return { t };
}

interface QuestionnaireData {
  id: string;
  PetName: string;
  birthday: string;
  breed: string;
  Weight: string;
  itchiness: string;
  alopecia: boolean;
  odor: boolean;
  affectedAreas: string[];
  createdAt: string;
  lesionSites: string[] | string;
  diagnosisResult?: {
    condition: string;
    predictClass?: string;
    confidence: number;
    severity: 'low' | 'medium' | 'high';
    description: string;
  };
}

export function AdminListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [questionnaireList, setQuestionnaireList] = useState<QuestionnaireData[]>([]);
  const getAdminList = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${apiBaseUrl}/admin/list`);
      const result = response.data.data.result.map((item: any) => ({
        ...item,
        lesionSites: item.lesionSites
          ? Array.isArray(item.lesionSites)
            ? item.lesionSites
            : JSON.parse(item.lesionSites)
          : [],
      }));

      setQuestionnaireList(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdminList();
  }, []);

  // 필터링된 데이터
  const filteredData = questionnaireList.filter(item => {
    const matchesSearch = item.PetName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 증상 번역
  const translateItchiness = (itchiness: string) => {
    if (itchiness === '심함' || itchiness === 'high') return t('admin_itchiness_high');
    if (itchiness === '보통' || itchiness === 'medium') return t('admin_itchiness_medium');
    if (itchiness === '없음' || itchiness === 'none') return t('admin_itchiness_none');
    return itchiness;
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 drop-shadow-lg">{t('admin_dashboard')}</h1>
          <p className="text-sm sm:text-base text-gray-800 drop-shadow">{t('admin_petSurveyDesc')}</p>
        </div>

        {/* 검색 및 필터 - 유리 효과 */}
        <div className="mb-6 p-4 sm:p-6 rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
              <Input
                placeholder={t('admin_searchPlaceholder')}
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
                <span className="text-sm sm:text-base">{t('admin_all')} ({questionnaireList.length})</span>
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
                    <h3 className="text-xl font-bold text-gray-900 drop-shadow-lg">{item.PetName}</h3>
                    <div className="px-3 py-1 rounded-xl bg-white/20 backdrop-blur-xl border border-white/30 text-gray-800 text-sm font-medium">
                      {item.breed}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-xl">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span>{t('admin_birth')}: {item.birthday}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-xl">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <span>{t('admin_weight')}: {item.Weight}kg</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-xl">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span>{t('admin_reception')}: {formatDate(item.createdAt)}</span>
                    </div>
                  </div>

                  {/* 증상 정보 */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-xl border border-white/20 text-gray-800 text-xs font-medium">
                        {t('admin_itchiness')} : {translateItchiness(item.itchiness)}
                      </div>
                      {item.alopecia && (
                        <div className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-xl border border-white/20 text-gray-800 text-xs font-medium">
                          {t('admin_alopecia')}
                        </div>
                      )}
                      {item.odor && (
                        <div className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-xl border border-white/20 text-gray-800 text-xs font-medium">
                          {t('admin_odor')}
                        </div>
                      )}
                      <div className="px-3 py-1 rounded-lg bg-white/15 backdrop-blur-xl border border-white/20 text-gray-800 text-xs font-medium">
                        {t('admin_area')}: {Array.isArray(item.lesionSites) ? item.lesionSites.join(", ") : ""}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => handleViewDetail(item.id)}
                  className="w-full lg:w-auto lg:ml-6 h-12 px-6 bg-white/20 backdrop-blur-xl border border-white/30 text-gray-900 rounded-2xl hover:bg-white/30 hover:border-white/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-lg"
                >
                  <Eye className="w-4 h-4" />
                  {t('admin_viewDetail')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl">
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 mb-3 drop-shadow">{t('admin_noData')}</h3>
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