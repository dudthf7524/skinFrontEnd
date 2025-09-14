import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface DiagnosisData {
  condition: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
  urgency: 'normal' | 'urgent' | 'emergency';
}

interface DiagnosisResultProps {
  diagnosis: DiagnosisData;
  onContinue: () => void;
}

export function DiagnosisResult({ diagnosis, onContinue }: DiagnosisResultProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'medium': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
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

  return (
    <div className="w-full max-w-full space-y-3 sm:space-y-4 md:space-y-6">
      <div className="text-center mb-4 sm:mb-6 md:mb-8 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-orange-700 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 leading-tight">
          🤖 AI 진단 결과
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-2 sm:mb-3 md:mb-4">
          고도화된 AI 분석을 통한 예상 진단 결과입니다
        </p>
        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
          <span className="text-orange-500">🔬</span>
          <span className="text-[10px] sm:text-xs md:text-sm text-orange-700 font-medium">정밀 AI 분석 완료</span>
        </div>
      </div>

      {/* 주요 진단 결과 */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50">
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg sm:text-xl font-bold text-gray-900">🎯 예상 진단</span>
            <Badge className={`${getSeverityColor(diagnosis.severity)} font-bold px-3 sm:px-4 py-2 rounded-2xl border-2`}>
              {diagnosis.severity === 'low' && '경미'}
              {diagnosis.severity === 'medium' && '보통'}
              {diagnosis.severity === 'high' && '심각'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-orange-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{diagnosis.condition}</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{diagnosis.description}</p>
            </div>
            
            <div className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-orange-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm sm:text-base font-bold text-gray-800">AI 신뢰도</span>
                <span className="text-lg sm:text-xl font-bold text-orange-600">{diagnosis.confidence}%</span>
              </div>
              <div className="relative">
                <div className="h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ 
                      width: `${diagnosis.confidence}%`, 
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

      {/* 응급도 안내 */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center space-x-4 sm:space-x-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500 shadow-lg flex-shrink-0">
              {getUrgencyIcon(diagnosis.urgency)}
            </div>
            <div className="flex-1">
              <p className="text-base sm:text-lg font-bold text-gray-900 mb-2">🚨 응급도 안내</p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {getUrgencyMessage(diagnosis.urgency)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 권장사항 */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="pb-3 sm:pb-4 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50">
          <CardTitle className="flex items-center space-x-3 text-gray-900">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}>
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold">💡 권장사항</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {diagnosis.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl border border-orange-200">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center mt-0.5 shadow-md flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}>
                  <span className="text-white text-xs sm:text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-sm sm:text-base text-gray-700 flex-1 leading-relaxed font-medium">{rec}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 주의사항 */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-200 rounded-3xl shadow-lg">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-white text-lg sm:text-xl">⚠️</span>
          </div>
          <div>
            <p className="text-sm sm:text-base text-orange-800 font-bold mb-2">🔍 중요 안내사항</p>
            <p className="text-xs sm:text-sm text-orange-700 leading-relaxed">
              이 결과는 AI 예측이며 정확한 진단을 위해서는 반드시 수의사의 진료를 받으시기 바랍니다.
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={onContinue}
        className="w-full h-12 sm:h-14 text-white shadow-xl rounded-2xl font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}
      >
        <span className="text-base sm:text-lg">다음 단계로 진행하기 →</span>
      </Button>
    </div>
  );
}