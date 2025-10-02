import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Eye } from "lucide-react";

export function DiagnosisRecords({ recordData }: any) {
  const navigate = useNavigate();
  console.log(recordData)
  // const diagnosisRecords: DiagnosisRecord[] = [
  //   {
  //     id: "diag_001",
  //     date: "2024-03-15",
  //     petName: "멍멍이",
  //     petType: "골든리트리버",
  //     bodyPart: "얼굴",
  //     diagnosis: "아토피 피부염",
  //     confidence: 87,
  //     severity: "중간",
  //     status: "재진필요",
  //     image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
  //     vetVisit: true,
  //     notes: "수의사 진료 후 약물 치료 시작"
  //   },
  //   {
  //     id: "diag_002",
  //     date: "2024-03-14",
  //     petName: "나비",
  //     petType: "페르시안",
  //     bodyPart: "발가락",
  //     diagnosis: "접촉성 피부염",
  //     confidence: 92,
  //     severity: "낮음",
  //     status: "완료",
  //     image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=400&fit=crop"
  //   },
  //   {
  //     id: "diag_003",
  //     date: "2024-03-10",
  //     petName: "구름이",
  //     petType: "말티즈",
  //     bodyPart: "등",
  //     diagnosis: "습진",
  //     confidence: 74,
  //     severity: "높음",
  //     status: "진행중",
  //     image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
  //     vetVisit: false
  //   }
  // ];
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
          <h3 className="font-bold text-gray-900">진단 기록</h3>
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
                        가려움 : {record.itchiness === '심함' ? '심함' : record.itchiness === '보통' ? '보통' : '없음'}
                      </p>
                      {record.alopecia && (
                        <p className="text-sm text-gray-600">
                          털빠짐
                        </p>
                      )}
                      {record.smell && (
                        <p className="text-sm text-gray-600">
                          냄새
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        부위: {record.lesionSites
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
                        상세보기
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
