import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { AlertTriangle, CheckCircle, MapPin, Share2, Mail, Navigation, Star, Clock, Activity, Map, Phone, Download, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useLanguage } from './LanguageContext';
import { useNavigate } from 'react-router-dom';

interface DiagnosisData {
  condition: string;
  predictClass?: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendations: string[];
  urgency: 'normal' | 'urgent' | 'emergency';
}

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

interface QuestionnaireData {
  petName: string;
  petBirthDate: string;
  petBreed: string;
  customBreed?: string;
  weight: string;
  pruritus: string;
  alopecia: boolean;
  odor: boolean;
  affectedAreas: string[];
  ownerEmail?: string;
}

interface DiagnosisResultProps {
  diagnosis: DiagnosisData;
  onContinue: () => void;
  onBack?: () => void;
  uploadedImage?: string;
  hospitals?: Hospital[];
  questionnaireData?: QuestionnaireData;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

export function DiagnosisResult({ diagnosis, onContinue, onBack, uploadedImage, hospitals = [], questionnaireData }: DiagnosisResultProps) {
  const { t } = useLanguage();
  const [shareEmail, setShareEmail] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const [actualHospitals, setActualHospitals] = useState<Hospital[]>(hospitals);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const navigate = useNavigate();

  const resultCardRef = useRef<HTMLDivElement>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ["places"],
    language: "ko"
  });

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


  function handleskinpage() {
    window.location.href = "/skinai"
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
          console.error("Failed to get location:", err);
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

  const toggleMapView = () => {
    setShowMap(!showMap);
    // 지도로 전환할 때 병원 검색 시작
    if (!showMap && position && isLoaded && hasLocationPermission && !isLoadingLocation && actualHospitals.length === 0) {
      setIsLoadingHospitals(true);
    }
  };

  const handleEmailShare = async () => {
    if (!shareEmail) return;

    setIsSharing(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const emailData = {
        user_email: shareEmail,
      };

      const response = await axios.post(`${apiBaseUrl}/email/send`, emailData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response);

      setIsSharing(false);
      alert(`🎉 ${t('diagnosis_emailSentSuccess', { email: shareEmail })}`);
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      setIsSharing(false);
      alert(t('diagnosis_emailSentError'));
    }
  };

  const handleLinkShare = async () => {
    setIsSharing(true);

    const shareLink = `https://petcare.app/result/${Date.now()}`;

    setTimeout(() => {
      setIsSharing(false);
      alert(`🔗 공유 링크가 클립보드에 복사되었습니다!\n\n${shareLink}\n\n이 링크를 통해 다른 사람과 진단 결과를 공유할 수 있습니다.`);
    }, 1000);
  };

  const handleHospitalContact = (hospital: Hospital, action: 'call' | 'navigate') => {
    if (action === 'call') {
      alert(`📞 ${t('diagnosis_hospitalContactCall', {
        hospitalName: hospital.name,
        phone: hospital.phone,
        openHours: hospital.openHours,
        waitTime: hospital.estimatedWaitTime
      })}`);
    } else if (action === 'navigate') {
      alert(`🗺️ ${t('diagnosis_hospitalContactNavigate', {
        hospitalName: hospital.name,
        address: hospital.address,
        distance: hospital.distance,
        walkTime: parseInt(hospital.distance) * 12
      })}`);
    }
  };

  // 인앱 브라우저 감지 함수
  const isInAppBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return userAgent.includes('kakaotalk') ||
      userAgent.includes('line') ||
      userAgent.includes('wechat') ||
      userAgent.includes('facebook') ||
      userAgent.includes('instagram') ||
      userAgent.includes('naver') ||
      userAgent.includes('daum');
  };

  const handleSaveAsImage = async () => {
    console.log('resultCardRef.current:', resultCardRef.current);
    console.log('예측 클래스 존재:', !!diagnosis.predictClass);

    if (!resultCardRef.current) {
      alert(`⚠️ ${t('diagnosis_saveImageError')}`);
      return;
    }

    // 인앱 브라우저에서 Chrome으로 이동 안내
    if (isInAppBrowser()) {
      const isConfirmed = confirm(`📱 ${t('diagnosis_inAppBrowserWarning')}`);
      if (!isConfirmed) {
        return;
      }
    }

    setIsCapturing(true);

    try {
      console.log('html2canvas 시작...');
      const canvas = await html2canvas(resultCardRef.current, {
        scale: isInAppBrowser() ? 1 : 2, // 인앱 브라우저에서는 낮은 해상도 사용
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        removeContainer: false,
        logging: false, // 인앱 브라우저에서는 로깅 비활성화
        width: resultCardRef.current.scrollWidth,
        height: resultCardRef.current.scrollHeight,
      });

      console.log('캔버스 생성 완료:', canvas.width, 'x', canvas.height);

      // File System Access API를 지원하는 브라우저에서 저장 위치 선택
      if ('showSaveFilePicker' in window && !isInAppBrowser()) {
        try {
          const fileHandle = await (window as any).showSaveFilePicker({
            suggestedName: `${questionnaireData?.petName || '반려동물'}_진단결과_${new Date().toLocaleDateString('ko-KR').replace(/\./g, '')}.png`,
            types: [{
              description: 'PNG 이미지',
              accept: { 'image/png': ['.png'] }
            }]
          });

          const writable = await fileHandle.createWritable();
          canvas.toBlob(async (blob) => {
            if (blob) {
              await writable.write(blob);
              await writable.close();
              alert(`📷 ${t('diagnosis_imageSavedSuccess')}`);
            }
          }, 'image/png');
        } catch (err) {
          // 사용자가 저장을 취소한 경우
          if ((err as Error).name !== 'AbortError') {
            throw err;
          }
        }
      } else {
        // 기존 방식 (자동 다운로드) - 인앱 브라우저 호환
        try {
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `${questionnaireData?.petName || '반려동물'}_진단결과_${new Date().toLocaleDateString('ko-KR').replace(/\./g, '')}.png`;
          link.href = dataUrl;

          // 인앱 브라우저에서는 target="_blank" 추가
          if (isInAppBrowser()) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
          }

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          if (isInAppBrowser()) {
            alert(`📷 ${t('diagnosis_imageOpenedInNewTab')}`);
          } else {
            alert(`📷 ${t('diagnosis_imageDownloadedSuccess')}`);
          }
        } catch (downloadError) {
          console.error('다운로드 오류:', downloadError);
          // 대체 방법: 새 창에서 이미지 열기
          const dataUrl = canvas.toDataURL('image/png');
          const newWindow = window.open('', '_blank');
          if (newWindow) {
            newWindow.document.write(`
              <html>
                <head><title>진단 결과 이미지</title></head>
                <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh; background:#f5f5f5;">
                  <img src="${dataUrl}" style="max-width:100%; max-height:100%; object-fit:contain;" alt="진단 결과"/>
                </body>
              </html>
            `);
            alert(`📷 ${t('diagnosis_imageOpenedInNewTab')}`);
          } else {
            throw downloadError;
          }
        }
      }
    } catch (error) {
      console.error('이미지 저장 중 오류:', error);
      alert(`⚠️ ${t('diagnosis_imageSaveGeneralError')}`);
    } finally {
      setIsCapturing(false);
    }
  };
  console.log("diagnosis", diagnosis)

  return (
    <div className="w-full max-w-full space-y-3 sm:space-y-4 md:space-y-6">

      {/* 예측 클래스 */}
      <div ref={resultCardRef} style={{ display: diagnosis.predictClass ? 'block' : 'none' }}>
        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50">
            <CardTitle className="flex items-center">
              <span className="text-lg sm:text-xl font-bold text-gray-900">🔍 {t('diagnosis_analysisResult')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="text-left mb-4">
              <span className="text-lg sm:text-xl font-bold text-gray-900">{t('diagnosis_skinConditionClassification')}</span>
            </div>

            {uploadedImage && (
              <div className="flex items-center justify-center mb-4">
                <img
                  src={uploadedImage}
                  alt={t('diagnosis_uploadedSkinPhoto')}
                  className="object-cover rounded-xl border-2 border-blue-300 shadow-lg"
                  style={{ width: '224px', height: '224px' }}
                />
              </div>
            )}

            <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-2xl border-2 border-blue-200 mb-6">
              <div className="text-center">
                <p className="text-base sm:text-lg font-semibold text-blue-800 mt-2">{diagnosis.predictClass}</p>
              </div>
            </div>

            {/* 예상 진단 내용 추가 */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl font-bold text-gray-900">{t('diagnosis_expectedDiagnosis')}</span>
                {/* <Badge className={`${getSeverityColor(diagnosis.severity)} font-bold px-3 sm:px-4 py-2 rounded-2xl border-2`}>
                  {diagnosis.severity === 'low' && t('diagnosis_severityLow')}
                  {diagnosis.severity === 'medium' && t('diagnosis_severityMedium')}
                  {diagnosis.severity === 'high' && t('diagnosis_severityHigh')}
                </Badge> */}
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl border-2 border-orange-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{diagnosis.condition}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{diagnosis.description}</p>
              </div>

              <div className="bg-white/60 p-4 sm:p-5 rounded-2xl border border-orange-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm sm:text-base font-bold text-gray-800">{t('diagnosis_aiConfidence')}</span>
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
      </div>

      {/* 주변 추천 병원 */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">{t('diagnosis_nearbyRecommendedHospitals')}</span>
            </div>
            <Button
              onClick={toggleMapView}
              variant="outline"
              className="bg-white/70 border-2 border-blue-200 hover:bg-blue-50 rounded-2xl font-bold"
            >
              <Map className="w-4 h-4 mr-2" />
              {showMap ? t('diagnosis_listView') : t('diagnosis_mapView')}
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
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">📍 {t('diagnosis_locationChecking')}</h3>
                  <p className="text-sm sm:text-base text-blue-800">
                    {t('diagnosis_gpsLocationChecking')}
                  </p>
                </div>
              ) : isLoadingHospitals ? (
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 sm:p-8 text-center border-2 border-blue-200">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">🏥 {t('diagnosis_hospitalSearching')}</h3>
                  <p className="text-sm sm:text-base text-blue-800">
                    {t('diagnosis_searchingNearbyHospitals')}
                  </p>
                </div>
              ) : !hasLocationPermission ? (
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 sm:p-8 text-center border-2 border-orange-200">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-orange-900 mb-2">⚠️ {t('diagnosis_locationPermissionRequired')}</h3>
                  <p className="text-sm sm:text-base text-orange-800">
                    {t('diagnosis_locationPermissionMessage').split('\n').map((line, i) => (<span key={i}>{line}{i === 0 && <br />}</span>))}
                  </p>
                </div>
              ) : actualHospitals.length === 0 ? (
                <div className="bg-gradient-to-r from-gray-100 to-slate-100 rounded-2xl p-6 sm:p-8 text-center border-2 border-gray-200">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">🔍 {t('diagnosis_noHospitalsFound')}</h3>
                  <p className="text-sm sm:text-base text-gray-800">
                    {t('diagnosis_noHospitalsFoundMessage').split('\n').map((line, i) => (<span key={i}>{line}{i === 0 && <br />}</span>))}
                  </p>
                </div>
              ) : (
                actualHospitals.map((hospital, index) => (
                  <div key={hospital.id} className="p-4 sm:p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-2 border-blue-200 rounded-2xl">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-base sm:text-lg font-bold text-blue-900">{hospital.name}</h4>
                          {hospital.isOpen && <Badge className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{t('diagnosis_operatingNow')}</Badge>}
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
                        {t('diagnosis_callHospital')}
                      </Button>
                      <Button
                        onClick={() => handleHospitalContact(hospital, 'navigate')}
                        variant="outline"
                        className="flex-1 h-10 sm:h-11 bg-white/70 border-2 border-blue-200 hover:bg-blue-50 rounded-xl font-bold"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        {t('diagnosis_getDirections')}
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
                      title={t('diagnosis_myLocation')}
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
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2">🗺️ {t('diagnosis_mapLoading')}</h3>
                  <p className="text-sm sm:text-base text-blue-800 mb-4">
                    {position ? t('diagnosis_loadingMapMessage') : t('diagnosis_activatingGpsMessage')}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 결과 공유하기 */}
      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="pb-4 sm:pb-6 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50">
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">{t('diagnosis_shareResults')}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="bg-purple-50 p-4 sm:p-5 rounded-2xl border-2 border-purple-200">
            <Label className="text-sm sm:text-base font-bold text-purple-800 mb-3 block flex items-center space-x-2">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{t('diagnosis_saveAsImage')}</span>
            </Label>
            <Button
              onClick={handleSaveAsImage}
              disabled={isCapturing}
              className="w-full h-11 sm:h-12 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white rounded-xl font-bold"
            >
              {isCapturing ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>{t('diagnosis_saveImageFile')}</span>
                </>
              )}
            </Button>
            <p className="text-xs sm:text-sm text-purple-700 mt-2 font-medium">
              {t('diagnosis_saveImageDescription')}
            </p>
          </div>

          <div className="bg-orange-50 p-4 sm:p-5 rounded-2xl border-2 border-orange-200">
            <Label className="text-sm sm:text-base font-bold text-orange-800 mb-3 block flex items-center space-x-2">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{t('diagnosis_emailSubscription')}</span>
            </Label>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <Input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder={t('diagnosis_emailPlaceholder')}
                className="w-full h-11 sm:h-12 bg-white/70 backdrop-blur-sm border-2 border-orange-200 rounded-xl text-sm sm:text-base font-medium focus:border-orange-400"
              />
              <Button
                onClick={handleEmailShare}
                disabled={!shareEmail || isSharing}
                className="w-full sm:w-auto h-11 sm:h-12 text-white px-4 sm:px-6 rounded-xl font-bold"
                style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}
              >
                {isSharing ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span>{t('diagnosis_subscribe')}</span>
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-orange-700 mt-2 font-medium">
              {t('diagnosis_emailDescription')}
            </p>
          </div>

          {/* <div className="bg-blue-50 p-4 sm:p-5 rounded-2xl border-2 border-blue-200">
            <Label className="text-sm sm:text-base font-bold text-blue-800 mb-3 block flex items-center space-x-2">
              <Link className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>링크로 공유하기</span>
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
              가족이나 수의사와 쉽게 결과를 공유할 수 있어요
            </p>
          </div> */}
        </CardContent>
      </Card>

      {/* 응급도 안내 - 주석처리 */}
      {/* <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
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
      </Card> */}

      {/* 권장사항 - 주석처리 */}
      {/* <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-3xl overflow-hidden">
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
      </Card> */}

      {/* 주의사항 */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-200 rounded-3xl shadow-lg">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-white text-lg sm:text-xl">⚠️</span>
          </div>
          <div>
            <p className="text-sm sm:text-base text-orange-800 font-bold mb-2">🔍 {t('diagnosis_importantNotice')}</p>
            <p className="text-xs sm:text-sm text-orange-700 leading-relaxed">
              {t('diagnosis_disclaimerMessage')}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <Button
          onClick={handleskinpage}
          className="w-full h-12 sm:h-14 text-white shadow-xl rounded-2xl font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}
        >
          <span className="text-base sm:text-lg">{t('diagnosis_newAnalysis')}</span>
        </Button>
      </div>
    </div>
  );
}