import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  Navigation,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  reviewCount: number;
  phone: string;
  openHours: string;
  specialties: string[];
  isOpen: boolean;
  estimatedWaitTime: string;
}

interface HospitalRecommendationProps {
  hospitals: Hospital[];
  onSelectHospital: (hospital: Hospital) => void;
}

export function HospitalRecommendation({ 
  hospitals, 
  onSelectHospital 
}: HospitalRecommendationProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const handleSelectHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    onSelectHospital(hospital);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
          추천 병원
        </h2>
        <p className="text-gray-600">
          현재 위치 기준으로 가까운 동물병원입니다
        </p>
      </div>

      <div className="space-y-4">
        {hospitals.map((hospital) => (
          <Card 
            key={hospital.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl bg-white/70 backdrop-blur-sm border-0 ${
              selectedHospital?.id === hospital.id 
                ? 'ring-2 shadow-xl scale-[1.02]' 
                : 'hover:scale-[1.01]'
            }`}
            style={selectedHospital?.id === hospital.id ? { ringColor: '#f0663f' } : {}}
            onClick={() => handleSelectHospital(hospital)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">{hospital.name}</CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-gray-700">{hospital.rating}</span>
                      <span className="text-gray-500 text-sm">({hospital.reviewCount})</span>
                    </div>
                    <Badge 
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        hospital.isOpen 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-neutral-50 text-neutral-600 border-neutral-200'
                      }`}
                    >
                      {hospital.isOpen ? '영업중' : '영업종료'}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  selectedHospital?.id === hospital.id ? 'rotate-90' : ''
                }`} />
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
              {/* 주소 및 거리 */}
              <div className="flex items-start space-x-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#f0663f' }} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">{hospital.address}</p>
                  <p className="text-sm font-medium" style={{ color: '#f0663f' }}>{hospital.distance}</p>
                </div>
              </div>

              {/* 영업시간과 대기시간 */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-neutral-50 to-stone-50 rounded-xl">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-stone-500" />
                  <span className="text-sm font-medium text-gray-700">{hospital.openHours}</span>
                </div>
                {hospital.isOpen && (
                  <div className="px-2 py-1 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium">
                    대기: {hospital.estimatedWaitTime}
                  </div>
                )}
              </div>

              {/* 전문분야 */}
              <div className="flex flex-wrap gap-2">
                {hospital.specialties.slice(0, 3).map((specialty, index) => (
                  <Badge key={index} className="bg-amber-50 text-amber-700 border-amber-200 px-3 py-1 rounded-full text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>

              {/* 액션 버튼들 */}
              <div className="flex space-x-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 flex items-center justify-center space-x-2 h-10 border-stone-300 hover:bg-stone-50 rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    // 길찾기 기능
                  }}
                >
                  <Navigation className="w-4 h-4" />
                  <span className="text-sm font-medium">길찾기</span>
                </Button>
                
                <Button
                  className="flex-1 flex items-center justify-center space-x-2 h-10 text-white rounded-xl shadow-md transition-all duration-200 hover:opacity-90"
                  style={{ background: 'linear-gradient(90deg, #f0663f 0%, #d45a2f 100%)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectHospital(hospital);
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">예약하기</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedHospital && (
        <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <p className="font-medium text-emerald-800">
                {selectedHospital.name} 선택됨
              </p>
              <p className="text-sm text-emerald-600">예약 페이지로 이동합니다</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}