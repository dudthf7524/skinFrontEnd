import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Download, Calendar, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import Navbar from "./Navbar";

export function MyRecordsPage() {
  const petProfile = {
    name: "멍멍이",
    age: "3세",
    breed: "골든 리트리버",
    gender: "수컷",
    weight: "28kg",
    image: "🐕"
  };

  const diagnosisHistory = [
    {
      id: 1,
      date: "2024.12.28",
      condition: "아토피 피부염",
      severity: "중간",
      confidence: 87,
      status: "치료 중",
      symptoms: ["가려움", "발적", "털 빠짐"],
      recommendation: "수의사 진료 권장",
      vetVisit: "서울동물의료센터 방문함",
      image: "📷"
    },
    {
      id: 2,
      date: "2024.12.15",
      condition: "접촉성 피부염",
      severity: "낮음",
      confidence: 72,
      status: "완치",
      symptoms: ["부분적 발적", "경미한 가려움"],
      recommendation: "경과 관찰",
      vetVisit: null,
      image: "📷"
    },
    {
      id: 3,
      date: "2024.11.30",
      condition: "진균 감염",
      severity: "중간",
      confidence: 91,
      status: "완치",
      symptoms: ["원형 탈모", "비늘 같은 피부"],
      recommendation: "항진균 치료 필요",
      vetVisit: "반려동물피부클리닉 방문함",
      image: "📷"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "치료 중":
        return <Badge className="bg-yellow-100 text-yellow-800">치료 중</Badge>;
      case "완치":
        return <Badge className="bg-green-100 text-green-800">완치</Badge>;
      case "경과 관찰":
        return <Badge className="bg-blue-100 text-blue-800">경과 관찰</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "높음": return "text-red-600";
      case "중간": return "text-yellow-600";
      case "낮음": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--talktail-gray)] to-white">
      <Navbar currentPage="record" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">내 기록</h1>
          <p className="text-xl text-gray-600">반려동물의 건강 기록을 관리하세요</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pet Profile */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4 text-4xl bg-[var(--talktail-beige)]">
                  <AvatarFallback className="text-4xl">{petProfile.image}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{petProfile.name}</h2>
                <p className="text-gray-600">{petProfile.breed}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">나이</span>
                  <span className="font-medium">{petProfile.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">성별</span>
                  <span className="font-medium">{petProfile.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">체중</span>
                  <span className="font-medium">{petProfile.weight}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[var(--talktail-beige)] rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-[var(--talktail-orange)]" />
                  건강 요약
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>총 진단 횟수</span>
                    <span className="font-medium">{diagnosisHistory.length}회</span>
                  </div>
                  <div className="flex justify-between">
                    <span>완치</span>
                    <span className="font-medium text-green-600">
                      {diagnosisHistory.filter(d => d.status === "완치").length}회
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>치료 중</span>
                    <span className="font-medium text-yellow-600">
                      {diagnosisHistory.filter(d => d.status === "치료 중").length}회
                    </span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6 bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)]">
                <Download className="w-4 h-4 mr-2" />
                PDF 리포트 다운로드
              </Button>
            </Card>
          </div>

          {/* Diagnosis History */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">진단 이력</h2>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                필터
              </Button>
            </div>

            <div className="space-y-4">
              {diagnosisHistory.map((record) => (
                <Card key={record.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {record.image}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{record.condition}</h3>
                        <p className="text-gray-600">{record.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      {getStatusBadge(record.status)}
                      <div className="text-right">
                        <div className="text-sm text-gray-600">신뢰도</div>
                        <div className="text-lg font-bold text-[var(--talktail-orange)]">{record.confidence}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">증상</h4>
                      <div className="space-y-1">
                        {record.symptoms.map((symptom, index) => (
                          <div key={index} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-[var(--talktail-orange)] rounded-full mr-2"></div>
                            {symptom}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">권장사항</h4>
                      <div className="text-sm text-gray-600 flex items-start">
                        <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-[var(--talktail-orange)]" />
                        {record.recommendation}
                      </div>
                      {record.vetVisit && (
                        <div className="text-sm text-green-600 flex items-center mt-2">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {record.vetVisit}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">심각도:</span>
                      <span className={`text-sm font-medium ${getSeverityColor(record.severity)}`}>
                        {record.severity}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">상세 보기</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty state message */}
            {diagnosisHistory.length === 0 && (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">아직 진단 기록이 없습니다</h3>
                <p className="text-gray-600 mb-6">첫 번째 AI 진단을 받아보세요</p>
                <Button className="bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)]">
                  지금 진단하기
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}