import React, { useState, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Camera, Upload, X, Crop as CropIcon, Check } from 'lucide-react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useLanguage } from './LanguageContext';

interface PhotoUploadProps {
  onPhotoUploaded: (originalFile: File, croppedFile?: File) => void;
  onBack?: () => void;
}

export function PhotoUpload({ onPhotoUploaded, onBack }: PhotoUploadProps) {
  const { t } = useLanguage();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // 이미지를 캔버스에서 크롭하여 Blob으로 변환하는 함수
  const getCroppedImg = useCallback((
    image: HTMLImageElement,
    crop: PixelCrop,
    fileName: string
  ): Promise<File> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = 224;
    canvas.height = 224;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      224,
      224
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Failed to create blob');
        }
        const file = new File([blob], fileName, { type: 'image/jpeg' });
        resolve(file);
      }, 'image/jpeg', 0.8);
    });
  }, []);

  const handleFileSelect = (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert(t('upload_errorImageOnly'));
      return;
    }

    // 10MB 크기 제한 체크
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      alert(t('upload_errorFileSize'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setOriginalFile(file);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
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

  // 이미지 로드 완료 시 초기 크롭 영역 설정 (224x224 정사각형)
  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 60,
        },
        1, // 1:1 비율 (정사각형)
        width,
        height
      ),
      width,
      height
    );
    setCrop(crop);
  }, []);

  // 크롭 완료 처리
  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current || !originalFile) return;

    try {
      const newCroppedFile = await getCroppedImg(
        imgRef.current,
        completedCrop,
        `cropped_${originalFile.name}`
      );

      // 크롭된 이미지를 미리보기용으로 설정
      const reader = new FileReader();
      reader.onload = (e) => {
        setCroppedImage(e.target?.result as string);
        setCroppedFile(newCroppedFile);
        setShowCropModal(false);
      };
      reader.readAsDataURL(newCroppedFile);
    } catch (error) {
      console.error('Crop processing error:', error);
    }
  };

  // 진단하기 버튼 클릭 시 실행
  const handleDiagnosis = () => {
    if (originalFile && croppedFile) {
      onPhotoUploaded(originalFile, croppedFile);
    }
  };

  // 크롭 취소
  const handleCropCancel = () => {
    setShowCropModal(false);
    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  const clearImage = () => {
    setUploadedImage(null);
    setCroppedImage(null);
    setCroppedFile(null);
    setOriginalFile(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setShowCropModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-full">
      <div className="mb-4 sm:mb-6 md:mb-8 text-center px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-orange-700 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 leading-tight">
          {t('upload_title')}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-2 sm:mb-3 md:mb-4">
          {t('upload_description')}
        </p>
        <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
          <span className="text-orange-500">💡</span>
          <span className="text-[10px] sm:text-xs md:text-sm text-orange-700 font-medium text-center">{t('upload_tip')}</span>
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          {!uploadedImage ? (
            <div
              className={`border-3 border-dashed rounded-3xl p-6 sm:p-8 lg:p-12 text-center transition-all duration-500 cursor-pointer group ${isDragOver
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
                    {t('upload_dragOrClick')}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {t('upload_fileFormat')}
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
                  {t('upload_selectFile')}
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
              {/* 크롭된 이미지 또는 업로드된 이미지 */}
              <div className={`relative overflow-hidden rounded-3xl shadow-2xl group ${croppedImage ? 'h-80 flex justify-center items-center bg-white' : ''}`}>
                <img
                  src={croppedImage || uploadedImage}
                  alt={croppedImage ? t('upload_cropCompleted') : t('upload_completed')}
                  className={croppedImage
                    ? "object-cover transition-transform duration-300 group-hover:scale-105 rounded-2xl shadow-lg"
                    : "w-full h-56 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  }
                  style={croppedImage ? { width: '224px', height: '224px' } : {}}
                />
                {!croppedImage && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
                )}

                {/* 이미지 오버레이 정보 */}
                {!croppedImage && (
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3 shadow-lg">
                      <p className="text-xs sm:text-sm font-medium text-gray-800">{t('upload_completed')}</p>
                      <p className="text-xs text-gray-600">{t('upload_cropReady')}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 크롭된 이미지 정보 - 흰박스 밖 */}
              {croppedImage && (
                <div className="mt-4 mb-4 text-center w-full">
                  <div className="inline-block bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-lg">
                    <p className="text-sm font-medium text-gray-800">{t('upload_cropCompleted')}</p>
                    <p className="text-xs text-gray-600 mt-1">{t('upload_optimized')}</p>
                  </div>
                </div>
              )}

              {/* 삭제 버튼 */}
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-3 sm:top-4 right-3 sm:right-4 rounded-2xl w-9 h-9 sm:w-10 sm:h-10 p-0 bg-red-500/90 hover:bg-red-600 shadow-xl backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-110"
                onClick={clearImage}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>

              {/* 크롭 버튼 또는 진단하기 버튼 */}
              {!croppedImage ? (
                <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-3xl shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <CropIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-blue-800 font-bold text-base sm:text-lg">{t('upload_cropNeeded')}</p>
                        <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                          {t('upload_cropDescription')}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setShowCropModal(true)}
                      className="text-white shadow-xl rounded-2xl px-4 sm:px-6 py-2 sm:py-3 font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}
                    >
                      <CropIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      {t('upload_cropButton')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border-2 border-emerald-200 rounded-3xl shadow-lg">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                        <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-emerald-800 font-bold text-base sm:text-lg">{t('upload_diagnosisReady')}</p>
                        <p className="text-emerald-700 text-xs sm:text-sm leading-relaxed">
                          {t('upload_imageOptimized')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleDiagnosis}
                    className="w-full text-white shadow-xl rounded-2xl px-4 sm:px-6 py-3 sm:py-4 font-bold transition-all duration-300 hover:shadow-2xl hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {t('upload_startDiagnosis')}
                  </Button>
                </div>
              )}
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
              <p className="font-bold text-orange-900 mb-2 sm:mb-3 text-base sm:text-lg">{t('upload_photographyGuide')}</p>
              <ul className="text-orange-800 space-y-1.5 sm:space-y-2">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span className="font-medium text-sm sm:text-base">{t('upload_guideBrightLight')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span className="font-medium text-sm sm:text-base">{t('upload_guideClearCapture')}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  <span className="font-medium text-sm sm:text-base">{t('upload_guideCloseShot')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 크롭 모달 */}
      {showCropModal && uploadedImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{t('upload_cropModal_title')}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCropCancel}
                  className="rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {t('upload_cropModal_description')}
              </p>

              <div className="relative">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  minWidth={50}
                  minHeight={50}
                >
                  <img
                    ref={imgRef}
                    alt={t('upload_cropModal_imageAlt')}
                    src={uploadedImage}
                    style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={handleCropCancel}
                  className="rounded-xl"
                >
                  {t('upload_cropModal_cancel')}
                </Button>
                <Button
                  onClick={handleCropComplete}
                  disabled={!completedCrop}
                  className="text-white rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)' }}
                >
                  <CropIcon className="w-4 h-4 mr-2" />
                  {t('upload_cropModal_complete')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 이전 버튼 */}
      {onBack && (
        <div className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full h-10 sm:h-12 bg-white/70 border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 rounded-2xl font-medium transition-all duration-300 hover:shadow-lg text-orange-600"
          >
            {t('upload_backToPrevious')}
          </Button>
        </div>
      )}
    </div>
  );
}