import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  AlertTriangle,
  Info,
  Thermometer,
  Bug,
  Zap,
  Heart,
  CircleMinus,
} from "lucide-react";
import { DiseaseInfoDetailModal } from "./DiseaselnfoDetailModal";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

interface propsType {
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
}

interface detailType {
  img: string
  name: string
  description: string
  symptoms: string[]
  severity: string
  prevalence: string
}

export function DiseaseInfoPage() {
  const [isDetailModal, setIsDetailModal] = useState<boolean>(false)
  const [detailData, setDetailData] = useState<detailType>()

  const diseaseCategories = [
    {
      id: "1",
      name: "구진,플라크",
      icon: Thermometer,
      color: "bg-red-50 border-red-200 text-red-700",
      iconColor: "text-red-600",
      description:
        "알레르기, 박테리아 감염으로 인하여 발생할 수 있는 질병 입니다.",
      symptoms: [
        "가려움",
        "붉어짐(발적)",
        "털빠짐",
        "각질 및 비듬",
        "진물 및 딱지",
      ],
      severity: "중간",
      prevalence: "높음",
    },
    {
      id: "2",
      name: "상피성잔고리(비듬, 각질)",
      icon: Bug,
      color: "bg-yellow-50 border-yellow-200 text-yellow-700",
      iconColor: "text-yellow-600",
      description:
        "곰팡이 감염에 의하여 대부분 발생하는 질병이며 비듬, 각질등과 관련한 질환의 일부로 나타날 수 있습니다.",
      symptoms: ["가려움", "딱지", "건조함", "고리 모양의 붉은 반점"],
      severity: "중간",
      prevalence: "높음",
    },
    {
      id: "3",
      name: "태선화, 과다색소침착",
      icon: Zap,
      color: "bg-orange-50 border-orange-200 text-orange-700",
      iconColor: "text-orange-600",
      description: "곰팡이 감염으로 인하여 발생한 질환",
      symptoms: [
        "냄새 및 악취취",
        "털 빠짐",
        "귀가 붉어짐",
        "검은색 귀지가 나옴옴",
        "가려움",
      ],
      severity: "낮음",
      prevalence: "중간",
    },
    {
      id: "4",
      name: "농포, 여드름",
      icon: AlertTriangle,
      color: "bg-yellow-50 border-yellow-200 text-yellow-700",
      iconColor: "text-yellow-600",
      description:
        "세균 감염, 면역력 저하, 개인 위생 소홀로 인하여서 발생하는 질병 입니다.",
      symptoms: [
        "붉은 발적과 부기",
        "좁쌀 모양의 종기",
        "고름",
        "털빠짐",
        "가려움",
      ],
      severity: "높음",
      prevalence: "높음",
    },
    {
      id: "5",
      name: "미란, 궤양",
      icon: Heart,
      color: "bg-orange-50 border-orange-200 text-orange-700",
      iconColor: "text-orange-600",
      description: "외상, 알레르기, 바이러스 감염으로 발생하는 질병 입니다.",
      symptoms: [
        "눈곱 및 눈물 증가",
        "눈 비비기 및 자극",
        "각막 혼탁",
        "눈 충혈",
      ],
      severity: "높음",
      prevalence: "높음",
    },
    {
      id: "6",
      name: "결절, 종괴",
      icon: CircleMinus,
      color: "bg-yellow-50 border-yellow-200 text-yellow-700",
      iconColor: "text-yellow-600",
      description:
        "피부 및 피하 조직 문제, 장기 종양, 노령성 변화로 인하여서 발생하는 질병 입니다.",
      symptoms: ["피부 멍울", "호흡곤란", "절뚝거림", "체중 감소", "식욕부진"],
      severity: "높음",
      prevalence: "높음",
    },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "높음":
        return <Badge className="bg-red-100 text-red-800">높음</Badge>;
      case "중간":
        return <Badge className="bg-yellow-100 text-yellow-800">중간</Badge>;
      case "낮음":
        return <Badge className="bg-green-100 text-green-800">낮음</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getPrevalenceBadge = (prevalence: string) => {
    switch (prevalence) {
      case "높음":
        return (
          <Badge variant="outline" className="border-red-200 text-red-700">
            흔함
          </Badge>
        );
      case "중간":
        return (
          <Badge
            variant="outline"
            className="border-yellow-200 text-yellow-700"
          >
            보통
          </Badge>
        );
      case "낮음":
        return (
          <Badge variant="outline" className="border-green-200 text-green-700">
            드뭄
          </Badge>
        );
      default:
        return <Badge variant="outline">{prevalence}</Badge>;
    }
  };

  const handlerDetail = (
    img: string,
    name: string,
    description: string,
    symptoms: string[],
    severity: string,
    prevalence: string
  ): void => {
    setIsDetailModal(true);
    setDetailData({
      img,
      name,
      description,
      symptoms,
      severity,
      prevalence,
    });
  };

  useEffect(() => {
    if (isDetailModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDetailModal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--talktail-gray)] to-white ">

      <Navbar currentPage="info" />

      {isDetailModal && detailData && (
        <DiseaseInfoDetailModal
          img={detailData.img}
          name={detailData.name}
          description={detailData.description}
          symptoms={detailData.symptoms}
          severity={detailData.severity}
          prevalence={detailData.prevalence}
          setIsDetailModal={setIsDetailModal}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            피부 질병 정보
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            반려동물에게 흔한 피부 질병들에 대해 알아보세요
          </p>

          <div className="inline-flex items-center px-6 py-3 bg-blue-50 border border-blue-200 rounded-full text-blue-700">
            <Info className="w-4 h-4 mr-2" />
            정확한 진단은 전문 수의사와 상담하세요
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseaseCategories.map((disease) => (
            <Card
              key={disease.id}
              className={`p-6 hover:shadow-lg transition-shadow cursor-pointer ${disease.color} border-2`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white`}
                >
                  <disease.icon className={`w-6 h-6 ${disease.iconColor}`} />
                </div>
                <div className="flex flex-col space-y-2">
                  {getSeverityBadge(disease.severity)}
                  {getPrevalenceBadge(disease.prevalence)}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{disease.name}</h3>
              <p className="text-sm mb-4 opacity-80">{disease.description}</p>

              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">주요 증상</h4>
                  <div className="space-y-1">
                    {disease.symptoms.map((symptom, index) => (
                      <div key={index} className="text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-current rounded-full mr-2"></div>
                        {symptom}
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => handlerDetail(disease.id, disease.name, disease.description, disease.symptoms, disease.severity, disease.prevalence)}>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-current text-current hover:bg-white/50"
                    size="sm"
                  >
                    자세히 보기
                  </Button>
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Emergency notice */}
        <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 mb-2">응급 상황</h3>
              <p className="text-red-800 mb-4">
                다음 증상이 나타나면 즉시 수의사와 상담하세요:
              </p>
              <ul className="text-red-800 space-y-1 text-sm">
                <li>• 급격한 부종이나 호흡곤란</li>
                <li>• 지속적인 출혈이나 고름</li>
                <li>• 심한 통증으로 인한 행동 변화</li>
                <li>• 식욕 감퇴나 무기력함</li>
              </ul>
              <button onClick={() => setCurrent("vets")}>
                <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white">
                  응급 병원 찾기기
                </Button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
