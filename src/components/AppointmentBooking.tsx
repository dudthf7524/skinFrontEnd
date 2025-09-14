import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Calendar,
  Clock,
  User,
  Heart,
  Phone,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
}

interface AppointmentBookingProps {
  hospital: Hospital;
  onBookingComplete: () => void;
}

interface BookingForm {
  ownerName: string;
  ownerPhone: string;
  petName: string;
  petSpecies: string;
  petAge: string;
  selectedDate: string;
  selectedTime: string;
  symptoms: string;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];

export function AppointmentBooking({ hospital, onBookingComplete }: AppointmentBookingProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BookingForm>({
    ownerName: '',
    ownerPhone: '',
    petName: '',
    petSpecies: '',
    petAge: '',
    selectedDate: '',
    selectedTime: '',
    symptoms: ''
  });

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 실제 예약 API 호출
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => {
        onBookingComplete();
      }, 3000);
    }, 1000);
  };

  const isFormValid = () => {
    return formData.ownerName && 
           formData.ownerPhone && 
           formData.petName && 
           formData.petSpecies && 
           formData.selectedDate && 
           formData.selectedTime;
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                  예약 완료!
                </h2>
                <p className="text-gray-600">
                  예약이 성공적으로 접수되었습니다.
                  <br />병원에서 곧 연락드릴 예정입니다.
                </p>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">병원</span>
                    <span className="font-medium text-gray-900">{hospital.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">예약일시</span>
                    <span className="font-medium text-gray-900">{formData.selectedDate} {formData.selectedTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">반려동물</span>
                    <span className="font-medium text-gray-900">{formData.petName}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
          예약하기
        </h2>
        <p className="text-gray-600">
          {hospital.name}에 예약을 신청합니다
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 보호자 및 반려동물 정보 */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}>
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-900">예약 정보</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ownerName" className="text-sm font-medium text-gray-700 mb-2 block">
                  보호자명 *
                </Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="h-10 bg-white/50 backdrop-blur-sm border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="ownerPhone" className="text-sm font-medium text-gray-700 mb-2 block">
                  연락처 *
                </Label>
                <Input
                  id="ownerPhone"
                  type="tel"
                  value={formData.ownerPhone}
                  onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                  placeholder="010-1234-5678"
                  className="h-10 bg-white/50 backdrop-blur-sm border-gray-200 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="petName" className="text-sm font-medium text-gray-700 mb-2 block">
                  반려동물명 *
                </Label>
                <Input
                  id="petName"
                  value={formData.petName}
                  onChange={(e) => handleInputChange('petName', e.target.value)}
                  placeholder="이름"
                  className="h-10 bg-white/50 backdrop-blur-sm border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="petSpecies" className="text-sm font-medium text-gray-700 mb-2 block">
                  종류 *
                </Label>
                <Input
                  id="petSpecies"
                  value={formData.petSpecies}
                  onChange={(e) => handleInputChange('petSpecies', e.target.value)}
                  placeholder="개/고양이"
                  className="h-10 bg-white/50 backdrop-blur-sm border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="petAge" className="text-sm font-medium text-gray-700 mb-2 block">
                  나이
                </Label>
                <Input
                  id="petAge"
                  value={formData.petAge}
                  onChange={(e) => handleInputChange('petAge', e.target.value)}
                  placeholder="3세"
                  className="h-10 bg-white/50 backdrop-blur-sm border-gray-200 rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 예약 일시 */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2a9d8f 0%, #1e7b6b 100%)' }}>
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-900">예약 일시</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div>
              <Label htmlFor="selectedDate" className="text-sm font-medium text-gray-700 mb-2 block">
                날짜 *
              </Label>
              <Input
                id="selectedDate"
                type="date"
                value={formData.selectedDate}
                onChange={(e) => handleInputChange('selectedDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="h-10 bg-white/50 backdrop-blur-sm border-gray-200 rounded-lg"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">시간 *</Label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant="outline"
                    className={`h-10 text-sm font-medium transition-all duration-200 rounded-lg ${
                      formData.selectedTime === time 
                        ? 'text-white border-transparent shadow-md' 
                        : 'bg-white/50 hover:bg-orange-50 border-gray-200'
                    }`}
                    style={formData.selectedTime === time ? { background: 'linear-gradient(90deg, #f0663f 0%, #d45a2f 100%)' } : {}}
                    onClick={() => handleInputChange('selectedTime', time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 증상 및 병원 정보 */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f4a261 0%, #e76f51 100%)' }}>
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-900">추가 정보</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">증상 설명</Label>
              <Textarea
                value={formData.symptoms}
                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                placeholder="피부 상태, 증상 등을 간단히 적어주세요"
                rows={3}
                className="text-sm bg-white/50 backdrop-blur-sm border-gray-200 rounded-lg"
              />
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">병원</span>
                  <span className="font-medium text-gray-900">{hospital.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">연락처</span>
                  <span className="font-medium text-gray-900">{hospital.phone}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full h-12 text-white shadow-lg rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
          style={{ background: 'linear-gradient(90deg, #f0663f 0%, #d45a2f 100%)' }}
          disabled={!isFormValid()}
        >
          {isFormValid() ? '예약 신청하기' : '필수 정보를 입력해 주세요'}
        </Button>
      </form>
    </div>
  );
}