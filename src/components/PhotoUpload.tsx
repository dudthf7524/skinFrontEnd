import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Camera, Upload, X } from 'lucide-react';

interface PhotoUploadProps {
  onPhotoUploaded: (file: File) => void;
}

export function PhotoUpload({ onPhotoUploaded }: PhotoUploadProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onPhotoUploaded(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const clearImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-full">
      <div className="mb-4 sm:mb-6 md:mb-8 text-center px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-orange-700 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 leading-tight">
          피부 상태 사진 업로드 📸
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-2 sm:mb-3 md:mb-4">
          문제가 있는 피부 부위의 선명한 사진을 업로드해 주세요
        </p>
        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
          <span className="text-orange-500">💡</span>
          <span className="text-[10px] sm:text-xs md:text-sm text-orange-700 font-medium text-center">자연광에서 근접 촬영하시면 더 정확한 분석이 가능합니다</span>
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          {!uploadedImage ? (
            <div
              className={`border-3 border-dashed rounded-3xl p-6 sm:p-8 lg:p-12 text-center transition-all duration-500 cursor-pointer group ${
                isDragOver
                  ? 'border-orange-400 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 scale-[1.02] shadow-xl'
                  : 'border-gray-300 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50 hover:via-amber-50 hover:to-red-50 hover:shadow-lg'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                {/* 애니메이션이 적용된 아이콘 */}
                <div className="relative">
                  <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110" 
                    style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}
                  >
                    <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:animate-bounce" />
                  </div>
                  {/* 회전하는 링 */}
                  <div className="absolute -inset-2 rounded-3xl border-2 border-orange-200 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-300"></div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                    사진을 드래그하거나 클릭하여 업로드
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    JPG, PNG 파일만 지원됩니다 (최대 10MB)
                  </p>
                </div>
                
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="text-white shadow-xl rounded-2xl px-6 sm:px-8 py-3 sm:py-4 font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105 group-hover:animate-pulse"
                  style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}
                >
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  파일 선택하기
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* 업로드된 이미지 */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <img
                  src={uploadedImage}
                  alt="업로드된 반려동물 사진"
                  className="w-full h-56 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
                
                {/* 이미지 오버레이 정보 */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3 shadow-lg">
                    <p className="text-xs sm:text-sm font-medium text-gray-800">업로드 완료</p>
                    <p className="text-xs text-gray-600">AI 분석 준비 완료</p>
                  </div>
                </div>
              </div>
              
              {/* 삭제 버튼 */}
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-3 sm:top-4 right-3 sm:right-4 rounded-2xl w-9 h-9 sm:w-10 sm:h-10 p-0 bg-red-500/90 hover:bg-red-600 shadow-xl backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110"
                onClick={clearImage}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              
              {/* 성공 메시지 */}
              <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border-2 border-emerald-200 rounded-3xl shadow-lg">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-white text-base sm:text-lg">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-emerald-800 font-bold text-base sm:text-lg">업로드 완료!</p>
                    <p className="text-emerald-700 text-xs sm:text-sm leading-relaxed">
                      사진이 성공적으로 업로드되었습니다. AI 분석을 시작할 준비가 완료되었습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {!uploadedImage && (
        <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 backdrop-blur-xl border-2 border-orange-200 rounded-3xl shadow-lg">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="text-white text-base sm:text-lg">💡</span>
            </div>
            <div>
              <p className="font-bold text-orange-900 mb-2 sm:mb-3 text-base sm:text-lg">촬영 가이드</p>
              <ul className="text-orange-800 space-y-1.5 sm:space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span className="font-medium text-sm sm:text-base">밝은 자연광에서 촬영해 주세요</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span className="font-medium text-sm sm:text-base">병변 부위를 선명하게 포착해 주세요</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span className="font-medium text-sm sm:text-base">흔들림 없이 근접 촬영해 주세요</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}