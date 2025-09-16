import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  Share2,
  Mail,
  Link,
  Copy,
  MapPin,
  Clock,
  Phone,
  Star,
  CheckCircle,
  ExternalLink,
  Map,
  Navigation,
  Users,
  Activity
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
  lat?: number;
  lng?: number;
}

interface DiagnosisData {
  condition: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  description: string;
  recommendations: string[];
  urgency: "normal" | "urgent" | "emergency";
}

interface QuestionnaireData {
  petName: string;
  petBirthDate: string;
  petBreed: string;
  customBreed?: string;
  itchLevel: 'none' | 'moderate' | 'severe' | '';
  hasOdor: boolean | null;
  hasHairLoss: boolean | null;
  hasWeightChange: boolean | null;
  affectedAreas: string[];
  ownerEmail: string;
  consentToUpdates: boolean;
}

interface ResultShareProps {
  hospitals?: Hospital[];
  diagnosis: DiagnosisData;
  questionnaireData: QuestionnaireData;
  onComplete: () => void;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

export function ResultShare({ hospitals = [], diagnosis, questionnaireData, onComplete }: ResultShareProps) {
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [shareEmail, setShareEmail] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [actualHospitals, setActualHospitals] = useState<Hospital[]>(hospitals);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ["places"],
    language: "ko"
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'medium': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'low': return '경미';
      case 'medium': return '중등도';
      case 'high': return '심각';
      default: return '미확정';
    }
  };

  function getDistanceKm(
    placeLat: number,
    placeLng: number,
    myLat: number,
    myLng: number
  ): number {
    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371; // 지구 반경 (km)
    const dLat = toRad(placeLat - myLat);
    const dLon = toRad(placeLng - myLng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(myLat)) *
        Math.cos(toRad(placeLat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // km 단위
  }

  // 위치 정보 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setHasLocationPermission(true);
          setIsLoadingLocation(false);
        },
        (err) => {
          console.error("위치 가져오기 실패:", err);
          setIsLoadingLocation(false);
          setHasLocationPermission(false);
          // 위치 권한이 없을 경우 서울 시청으로 기본값 설정
          setPosition({
            lat: 37.5665,
            lng: 126.9780,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setIsLoadingLocation(false);
      setHasLocationPermission(false);
      // Geolocation을 지원하지 않는 경우 서울 시청으로 기본값 설정
      setPosition({
        lat: 37.5665,
        lng: 126.9780,
      });
    }
  }, []);

  // 주변 동물병원 검색
  useEffect(() => {
    if (position && isLoaded && hasLocationPermission && !isLoadingLocation) {
      setIsLoadingHospitals(true);
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.nearbySearch(
        {
          location: position,
          radius: 5000, // 반경을 늘려서 더 많은 병원 검색
          type: "veterinary_care",
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setPlaces(results);

            const hospitalPromises = results.slice(0, 10).map((place) => { // 최대 10개만 처리
              return new Promise<Hospital>((resolve) => {
                if (place.place_id) {
                  service.getDetails(
                    {
                      placeId: place.place_id,
                      fields: [
                        "name",
                        "formatted_address",
                        "formatted_phone_number",
                        "geometry",
                        "opening_hours",
                        "rating",
                        "user_ratings_total",
                      ],
                    },
                    (detail, detailStatus) => {
                      if (
                        detailStatus === google.maps.places.PlacesServiceStatus.OK &&
                        detail
                      ) {
                        const lat = place.geometry?.location?.lat() || 0;
                        const lng = place.geometry?.location?.lng() || 0;
                        const distance = getDistanceKm(
                          position.lat,
                          position.lng,
                          lat,
                          lng
                        );

                        const newHospital: Hospital = {
                          id: place.place_id || Date.now().toString(),
                          name: detail.name || "이름 없음",
                          address: detail.formatted_address || "주소 없음",
                          distance: `${distance.toFixed(1)}km`,
                          rating: detail.rating || 0,
                          reviewCount: detail.user_ratings_total || 0,
                          phone: detail.formatted_phone_number || "전화번호 없음",
                          openHours: detail.opening_hours
                            ? detail.opening_hours.open_now
                              ? "영업중"
                              : "영업종료"
                            : "정보 없음",
                          specialties: ["동물병원", "일반진료"],
                          isOpen: detail.opening_hours?.open_now || false,
                          estimatedWaitTime: "정보 없음",
                          lat: lat,
                          lng: lng,
                        };
                        resolve(newHospital);
                      } else {
                        resolve({
                          id: Date.now().toString(),
                          name: "이름 없음",
                          address: "주소 없음",
                          distance: "0km",
                          rating: 0,
                          reviewCount: 0,
                          phone: "전화번호 없음",
                          openHours: "정보 없음",
                          specialties: ["동물병원"],
                          isOpen: false,
                          estimatedWaitTime: "정보 없음"
                        });
                      }
                    }
                  );
                } else {
                  resolve({
                    id: Date.now().toString(),
                    name: "이름 없음",
                    address: "주소 없음",
                    distance: "0km",
                    rating: 0,
                    reviewCount: 0,
                    phone: "전화번호 없음",
                    openHours: "정보 없음",
                    specialties: ["동물병원"],
                    isOpen: false,
                    estimatedWaitTime: "정보 없음"
                  });
                }
              });
            });

            Promise.all(hospitalPromises).then((hospitalData) => {
              const sortedHospitals = hospitalData
                .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
                .slice(0, 3); // 가장 가까운 3개만 선택
              setActualHospitals(sortedHospitals);
              setIsLoadingHospitals(false);
            });
          } else {
            setIsLoadingHospitals(false);
          }
        }
      );
    }
  }, [isLoaded, position, hasLocationPermission, isLoadingLocation]);

  const handleEmailShare = async () => {
    if (!shareEmail) return;
    
    setIsSharing(true);
    
    // 이메일 전송 시뮬레이션
    setTimeout(() => {
      setIsSharing(false);
      alert(`🎉 진단 결과가 ${shareEmail}로 전송되었습니다!\n\n전송 내용:\n- ${questionnaireData.petName}의 진단 결과\n- AI 분석 리포트\n- 추천 병원 정보\n- 관리 가이드`);
    }, 2000);
  };

  const handleLinkShare = async () => {
    setIsSharing(true);
    
    // 링크 생성 및 복사 시뮬레이션
    const shareLink = `https://petcare.app/result/${Date.now()}`;
    
    setTimeout(() => {
      setIsSharing(false);
      // 실제로는 navigator.clipboard.writeText(shareLink) 사용
      alert(`🔗 공유 링크가 클립보드에 복사되었습니다!\n\n${shareLink}\n\n이 링크를 통해 다른 사람과 진단 결과를 공유할 수 있습니다.`);
    }, 1000);
  };

  const handleHospitalContact = (hospital: Hospital, action: 'call' | 'navigate') => {
    setSelectedHospital(hospital);
    
    if (action === 'call') {
      // 실제로는 tel: 링크 사용
      alert(`📞 ${hospital.name}에 전화를 거시겠습니까?\n\n전화번호: ${hospital.phone}\n운영시간: ${hospital.openHours}\n예상 대기시간: ${hospital.estimatedWaitTime}`);
    } else if (action === 'navigate') {
      // 실제로는 지도 앱 연결
      alert(`🗺️ ${hospital.name}로 길찾기를 시작합니다.\n\n주소: ${hospital.address}\n거리: ${hospital.distance}\n예상 소요시간: 도보 ${parseInt(hospital.distance) * 12}분`);
    }
  };

  const toggleMapView = () => {
    setShowMap(!showMap);
    // 지도로 전환할 때 병원 검색 시작
    if (!showMap && position && isLoaded && hasLocationPermission && !isLoadingLocation && actualHospitals.length === 0) {
      setIsLoadingHospitals(true);
    }
  };

  return (
    <div className="w-full max-w-full space-y-3 sm:space-y-4 md:space-y-6">
      <div className="text-center mb-4 sm:mb-6 md:mb-8 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-orange-700 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 leading-tight">
          🎉 진단 완료
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-2 sm:mb-3 md:mb-4">
          {questionnaireData.petName}의 피부 상태 분석 결과입니다
        </p>
        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-50 rounded-full border border-green-200">
          <span className="text-green-500">✅</span>
          <span className="text-[10px] sm:text-xs md:text-sm text-green-700 font-medium">분석 완료</span>
        </div>
      </div>

      {/* 진단 결과 요약 카드 */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50">
          <CardTitle className="flex items-center justify-between">
            <span className="text-lg sm:text-xl font-bold text-gray-900">📋 진단 결과 요약</span>
            <Badge className={`${getSeverityColor(diagnosis.severity)} font-bold px-3 sm:px-4 py-2 rounded-2xl border-2`}>
              {getSeverityLabel(diagnosis.severity)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-orange-200">
            <h3 className="text-lg sm:text-xl font-bold text-orange-900 mb-3">{diagnosis.condition}</h3>
            <p className="text-sm sm:text-base text-orange-800 mb-4 leading-relaxed">{diagnosis.description}</p>
            <div className="flex items-center space-x-3 text-sm sm:text-base text-orange-700 bg-white/60 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-orange-600" />
              <span className="font-bold">AI 신뢰도: {diagnosis.confidence}%</span>
            </div>
          </div>

          <div className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-orange-100">
            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
              <span className="text-orange-500">💡</span>
              <span>핵심 권장사항</span>
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {diagnosis.recommendations.slice(0, 3).map((rec, index) => (
                <li key={index} className="flex items-start space-x-3 text-sm sm:text-base text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="leading-relaxed font-medium">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* GPS 기반 병원 추천 */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">📍 주변 추천 병원</span>
            </div>
            <Button
              onClick={toggleMapView}
              variant="outline"
              className="bg-white/70 border-2 border-blue-200 hover:bg-blue-50 rounded-2xl font-bold"
            >
              <Map className="w-4 h-4 mr-2" />
              {showMap ? '리스트 보기' : '지도로 보기'}
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6">
          {!showMap ? (
            <div className="space-y-3 sm:space-y-4">
              {isLoadingLocation ? (
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 sm:p-8 text-center border-2 border-blue-200">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">📍 위치 확인 중</h3>
                  <p className="text-sm sm:text-base text-blue-800">
                    GPS를 통해 현재 위치를 확인하고 있습니다...
                  </p>
                </div>
              ) : isLoadingHospitals ? (
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 sm:p-8 text-center border-2 border-blue-200">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">🏥 병원 검색 중</h3>
                  <p className="text-sm sm:text-base text-blue-800">
                    주변 동물병원을 검색하고 있습니다...
                  </p>
                </div>
              ) : !hasLocationPermission ? (
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 sm:p-8 text-center border-2 border-orange-200">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-orange-900 mb-2">⚠️ 위치 권한 필요</h3>
                  <p className="text-sm sm:text-base text-orange-800">
                    주변 병원을 찾기 위해 위치 권한이 필요합니다.<br />
                    브라우저에서 위치 권한을 허용해주세요.
                  </p>
                </div>
              ) : actualHospitals.length === 0 ? (
                <div className="bg-gradient-to-r from-gray-100 to-slate-100 rounded-2xl p-6 sm:p-8 text-center border-2 border-gray-200">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">🔍 병원을 찾을 수 없음</h3>
                  <p className="text-sm sm:text-base text-gray-800">
                    주변에서 동물병원을 찾을 수 없습니다.<br />
                    다른 지역에서 검색해보세요.
                  </p>
                </div>
              ) : (
                actualHospitals.map((hospital, index) => (
                <div key={hospital.id} className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200 rounded-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-base sm:text-lg font-bold text-blue-900">{hospital.name}</h4>
                        {hospital.isOpen && <Badge className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">영업중</Badge>}
                      </div>
                      <p className="text-sm sm:text-base text-blue-800 mb-2 font-medium">{hospital.address}</p>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-blue-700 mb-3">
                        <div className="flex items-center space-x-1">
                          <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="font-medium">{hospital.distance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{hospital.rating} ({hospital.reviewCount})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="font-medium">{hospital.estimatedWaitTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="font-medium">{hospital.specialties[0]}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {hospital.specialties.map((specialty, idx) => (
                          <Badge key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 sm:space-x-3">
                    <Button
                      onClick={() => handleHospitalContact(hospital, 'call')}
                      className="flex-1 h-10 sm:h-11 text-white text-sm sm:text-base rounded-xl font-bold"
                      style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      전화하기
                    </Button>
                    <Button
                      onClick={() => handleHospitalContact(hospital, 'navigate')}
                      variant="outline"
                      className="flex-1 h-10 sm:h-11 bg-white/70 border-2 border-blue-200 hover:bg-blue-50 rounded-xl font-bold"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      길찾기
                    </Button>
                  </div>
                </div>
                ))
              )}
            </div>
          ) : (
            <div>
              {isLoaded && position ? (
                <div className="bg-white rounded-2xl border-2 border-blue-200 overflow-hidden">
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={position}
                    zoom={14}
                  >
                    {/* 현재 위치 마커 */}
                    <Marker
                      position={position}
                      icon={{
                        url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNmMzY2M2YiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
                        scaledSize: new google.maps.Size(20, 20)
                      }}
                      title="내 위치"
                    />

                    {/* 주변 동물병원 마커 */}
                    {places.map((place, idx) =>
                      place.geometry?.location ? (
                        <Marker
                          key={idx}
                          position={{
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                          }}
                          icon={{
                            url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDlDNSAxNC4yNSAxMiAyMiAxMiAyMkMxMiAyMiAxOSAxNC4yNSAxOSA5QzE5IDUuMTMgMTUuODcgMiAxMiAyWk0xMiAxMS41QzEwLjYyIDExLjUgOS41IDEwLjM4IDkuNSA5UzkuNjIgNi41IDEyIDYuNUMxMy4zOCA2LjUgMTQuNSA3LjYyIDE0LjUgOUMxNC41IDEwLjM4IDEzLjM4IDExLjUgMTIgMTEuNVoiIGZpbGw9IiMzYjgyZjYiLz4KPC9zdmc+',
                            scaledSize: new google.maps.Size(30, 30)
                          }}
                          title={place.name}
                        />
                      ) : null
                    )}
                  </GoogleMap>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 sm:p-8 text-center border-2 border-blue-200">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Map className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">🗺️ 지도 로딩 중</h3>
                  <p className="text-sm sm:text-base text-blue-800 mb-4">
                    {position ? '지도를 불러오고 있습니다...' : 'GPS 위치 서비스를 활성화하고 있습니다...'}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 결과 공유하기 - 주석처리 */}
      {/* <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50">
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">📤 결과 공유하기</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="bg-orange-50 p-4 sm:p-5 rounded-2xl border-2 border-orange-200">
            <Label className="text-sm sm:text-base font-bold text-orange-800 mb-3 block flex items-center space-x-2">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>📧 이메일로 결과 받기</span>
            </Label>
            <div className="flex space-x-2 sm:space-x-3">
              <Input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 h-11 sm:h-12 bg-white/70 backdrop-blur-sm border-2 border-orange-200 rounded-xl text-sm sm:text-base font-medium focus:border-orange-400"
              />
              <Button
                onClick={handleEmailShare}
                disabled={!shareEmail || isSharing}
                className="h-11 sm:h-12 text-white px-4 sm:px-6 rounded-xl font-bold"
                style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}
              >
                {isSharing ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">전송</span>
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-orange-700 mt-2 font-medium">
              💌 상세한 진단 리포트와 관리 가이드를 이메일로 받아보세요
            </p>
          </div>

          <div className="bg-blue-50 p-4 sm:p-5 rounded-2xl border-2 border-blue-200">
            <Label className="text-sm sm:text-base font-bold text-blue-800 mb-3 block flex items-center space-x-2">
              <Link className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>🔗 링크로 공유하기</span>
            </Label>
            <Button
              onClick={handleLinkShare}
              disabled={isSharing}
              className="w-full h-11 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-bold"
            >
              {isSharing ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>공유 링크 복사하기</span>
                </>
              )}
            </Button>
            <p className="text-xs sm:text-sm text-blue-700 mt-2 font-medium">
              🌐 가족이나 수의사와 쉽게 결과를 공유할 수 있어요
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200 rounded-2xl">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-gray-400 to-slate-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm sm:text-base">ℹ️</span>
              </div>
              <div className="flex-1">
                <p className="text-sm sm:text-base font-bold text-gray-800 mb-2">📋 공유되는 정보</p>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                  <li>• {questionnaireData.petName}의 진단 결과 및 AI 분석</li>
                  <li>• 권장 치료 방법 및 관리 가이드</li>
                  <li>• 주변 추천 동물병원 정보</li>
                  <li>• 추후 관리를 위한 체크리스트</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      <div className="flex space-x-3 sm:space-x-4">
        <Button
          onClick={onComplete}
          className="flex-1 h-12 sm:h-14 text-white shadow-xl rounded-2xl font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}
        >
          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          <span className="text-base sm:text-lg">새로운 진단 시작하기</span>
        </Button>
      </div>
    </div>
  );
}