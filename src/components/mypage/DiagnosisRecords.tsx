import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Eye } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export function DiagnosisRecords({ recordData }: any) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  console.log(recordData)
 
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return (
    <div className="space-y-4">
      <Card className="bg-white">
        <div className="p-4 sm:p-6 border-b">
          <h3 className="font-bold text-gray-900">{t("mypage_diagnosisRecords")}</h3>
        </div>
        <div className="divide-y">
          {recordData.map((record: any) => (
            <div key={record.id} className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={record.image} alt={`${record.petName} 진단 사진`} className="w-full h-full object-cover" />
                </div> */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="font-semibold text-gray-900">{record.PetName}</div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {record.breed} • {record.Weight}kg
                      </p>

                      <p className="text-sm text-gray-600">
                        {t("mypage_itching")} : {record.itchiness === '심함' ? t("mypage_severe") : record.itchiness === '보통' ? t("mypage_moderate") : t("mypage_none")}
                      </p>
                      {record.alopecia && (
                        <p className="text-sm text-gray-600">
                          {t("mypage_hairLoss")}
                        </p>
                      )}
                      {record.smell && (
                        <p className="text-sm text-gray-600">
                          {t("mypage_smell")}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        {t("mypage_area")}: {record.lesionSites
                          ? JSON.parse(record.lesionSites).join(", ")
                          : ""}
                      </p>
                      <p className="text-sm text-[var(--talktail-orange)] font-medium">
                        {formatDate(record.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="inline-flex items-center justify-center gap-2"
                        onClick={() => navigate(`/record/detail/${record.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {t("mypage_viewDetails")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card >
    </div >
  );
}
