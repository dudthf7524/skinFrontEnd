import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Activity,
  CheckCircle,
  Heart,
  Eye,
  X
} from "lucide-react";

interface DiagnosisRecord {
  id: string;
  date: string;
  petName: string;
  petType: string;
  bodyPart: string;
  diagnosis: string;
  confidence: number;
  severity: "높음" | "중간" | "낮음";
  status: "진행중" | "완료" | "재진필요";
  image: string;
  vetVisit?: boolean;
  notes?: string;
  description?: string;
}

// 진단명에 따른 설명 매핑
const diagnosisDescriptions: Record<string, string> = {
  "아토피 피부염": "아토피 피부염은 만성적이고 재발성이 있는 염증성 피부 질환입니다. 주로 가려움증을 동반하며, 환경적 알레르겐에 대한 과민반응으로 발생합니다. 정기적인 목욕과 보습, 알레르기 원인 제거가 중요합니다.",
  "접촉성 피부염": "접촉성 피부염은 특정 물질과의 접촉으로 인해 발생하는 피부 염증입니다. 자극성 물질이나 알레르기 유발 물질과의 접촉을 피하고, 증상 부위를 깨끗이 관리하는 것이 중요합니다.",
  "습진": "습진은 피부가 건조하고 가려우며 염증이 생기는 상태를 말합니다. 다양한 원인으로 발생할 수 있으며, 적절한 보습과 자극 물질 회피가 필요합니다. 증상이 심한 경우 수의사의 처방이 필요할 수 있습니다."
};

export function DiagnosisRecords() {
  const [selectedRecord, setSelectedRecord] = useState<DiagnosisRecord | null>(null);
  const diagnosisRecords: DiagnosisRecord[] = [
    {
      id: "diag_001",
      date: "2024-03-15",
      petName: "멍멍이",
      petType: "골든리트리버",
      bodyPart: "얼굴",
      diagnosis: "아토피 피부염",
      confidence: 87,
      severity: "중간",
      status: "재진필요",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
      vetVisit: true,
      notes: "수의사 진료 후 약물 치료 시작"
    },
    {
      id: "diag_002",
      date: "2024-03-14",
      petName: "나비",
      petType: "페르시안",
      bodyPart: "발가락",
      diagnosis: "접촉성 피부염",
      confidence: 92,
      severity: "낮음",
      status: "완료",
      image: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=400&h=400&fit=crop"
    },
    {
      id: "diag_003",
      date: "2024-03-10",
      petName: "구름이",
      petType: "말티즈",
      bodyPart: "등",
      diagnosis: "습진",
      confidence: 74,
      severity: "높음",
      status: "진행중",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
      vetVisit: false
    }
  ];
  return (
    <div className="space-y-4">
      <Card className="bg-white">
        <div className="p-4 sm:p-6 border-b">
          <h3 className="font-bold text-gray-900">진단 기록</h3>
        </div>
        <div className="divide-y">
          {diagnosisRecords.map((record) => (
            <div key={record.id} className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={record.image} alt={`${record.petName} 진단 사진`} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{record.diagnosis}</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        {record.petName} ({record.petType}) • {record.bodyPart} • {record.date}
                      </p>
                      <p className="text-sm text-[var(--talktail-orange)] font-medium">
                        정확도: {record.confidence}%
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRecord(record)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        상세보기
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 상세보기 모달 */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">진단 상세 정보</h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* 이미지 */}
              <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedRecord.image}
                  alt={`${selectedRecord.petName} 진단 사진`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 진단 정보 */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-2xl font-bold text-gray-900">{selectedRecord.diagnosis}</h4>
                </div>
                <p className="text-gray-600">
                  {selectedRecord.petName} ({selectedRecord.petType}) • {selectedRecord.bodyPart}
                </p>
                <p className="text-sm text-gray-500 mt-1">진단일: {selectedRecord.date}</p>
                <p className="text-[var(--talktail-orange)] font-semibold mt-2">
                  정확도: {selectedRecord.confidence}%
                </p>
              </div>

              {/* 진단 설명 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">진단 설명</h5>
                <p className="text-gray-700 leading-relaxed">
                  {diagnosisDescriptions[selectedRecord.diagnosis] || "해당 진단에 대한 설명이 없습니다."}
                </p>
              </div>

              {/* 메모 */}
              {selectedRecord.notes && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">메모</h5>
                  <p className="text-gray-700">📝 {selectedRecord.notes}</p>
                </div>
              )}

              {/* 수의사 방문 여부 */}
              {selectedRecord.vetVisit && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-medium">✓ 수의사 진료 완료</p>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t p-4">
              <Button
                onClick={() => setSelectedRecord(null)}
                className="w-full bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-white"
              >
                닫기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
