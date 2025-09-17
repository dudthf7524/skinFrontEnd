import { Button } from "./ui/button";
import { Camera, Sparkles, MapPin } from "lucide-react";

interface propsType {
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
}

export function HeroSection({ setCurrent }: propsType) {
  return (
    <section className="bg-gradient-to-br from-[var(--talktail-beige)] to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-[var(--talktail-mint)] rounded-full text-sm text-gray-700">
                <Sparkles className="w-4 h-4 mr-2 text-[var(--talktail-orange)]" />
                AI 피부 질병 스크리닝 서비스
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                AI와 웨어러블로
                <br />
                <span className="text-[var(--talktail-orange)]">
                  반려동물 건강을
                </span>
                <br />
                지겨보세요
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                간편한 사진 업로드로 반려동물의 피부 질병을 빠르게 확인하고,
                <br />
                전문 수의사와 연결해보세요.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setCurrent("diagnosis")}>
                <Button
                  size="lg"
                  className="bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-white px-8 py-4 text-lg rounded-xl"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  지금 바로 진단하기
                </Button>
              </button>
              <button onClick={() => setCurrent("vets")}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[var(--talktail-orange)] text-[var(--talktail-orange)] hover:bg-[var(--talktail-orange)] hover:text-white px-8 py-4 text-lg rounded-xl"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  병원 찾기
                </Button>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--talktail-orange)]">
                  10,000+
                </div>
                <div className="text-sm text-gray-600">누적 진단</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--talktail-orange)]">
                  95%
                </div>
                <div className="text-sm text-gray-600">정확도</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--talktail-orange)]">
                  500+
                </div>
                <div className="text-sm text-gray-600">제휴 병원</div>
              </div>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-6 relative overflow-hidden">
                {/* Mock phone interface */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">AI 분석 중...</div>
                    <div className="w-6 h-6 bg-[var(--talktail-orange)] rounded-full animate-pulse"></div>
                  </div>

                  {/* Mock pet image */}
                  <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="text-6xl">🐕</div>
                  </div>

                  {/* Mock results */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm">습진 (Eczema)</span>
                      <span className="text-sm font-medium text-green-600">
                        85%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm">알레르기</span>
                      <span className="text-sm font-medium text-yellow-600">
                        12%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--talktail-mint)] rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[var(--talktail-orange)]" />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-[var(--talktail-mint)] rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[var(--talktail-orange)] rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
