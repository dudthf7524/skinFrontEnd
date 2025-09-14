import { Upload, Brain, Hospital } from "lucide-react";
import { Card } from "./ui/card";

export function ProcessSteps() {
  const steps = [
    {
      icon: Upload,
      title: "사진 업로드",
      description: "반려동물의 피부 문제 부위를 사진으로 촬영하여 업로드하세요.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Brain,
      title: "AI 분석",
      description: "고도화된 AI가 피부 상태를 분석하여 질병 가능성을 진단합니다.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Hospital,
      title: "병원 연결",
      description: "분석 결과를 바탕으로 주변 전문 병원을 추천하고 예약을 도와드립니다.",
      color: "bg-green-50 text-green-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            간단한 3단계로 <span className="text-[var(--talktail-orange)]">완료</span>
          </h2>
          <p className="text-xl text-gray-600">
            복잡한 절차 없이 쉽고 빠르게 반려동물의 피부 건강을 확인하세요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-8 text-center h-full border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-gray-50">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-[var(--talktail-orange)] text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${step.color}`}>
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </Card>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-[var(--talktail-orange)]"></div>
                  <div className="absolute -right-1 -top-1 w-0 h-0 border-l-4 border-l-[var(--talktail-orange)] border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-[var(--talktail-beige)] rounded-full text-[var(--talktail-orange)] font-medium">
            💡 평균 분석 시간: 30초 이내
          </div>
        </div>
      </div>
    </section>
  );
}