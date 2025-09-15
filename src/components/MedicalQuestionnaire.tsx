import React, { useState, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Heart,
  Calendar,
  User,
  AlertCircle,
  MapPin,
  CheckCircle,
  ChevronRight,
  Search,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { DateInput } from "./DateInput";

interface QuestionnaireData {
  petName: string;
  petBirthDate: string;
  petBreed: string;
  customBreed?: string;
  weight: string;
  pruritus: string; // '없음', '보통', '심함'
  alopecia: boolean; // 탈모
  odor: boolean; // 냄새
  affectedAreas: string[];
  ownerEmail?: string;
}

interface MedicalQuestionnaireProps {
  onComplete: (data: QuestionnaireData) => void;
}

const dogBreedKeys = [
  "goldenRetriever",
  "labradorRetriever",
  "germanShepherd",
  "beagle",
  "bulldog",
  "poodle",
  "shibaInu",
  "jindo",
  "maltese",
  "pomeranian",
  "chihuahua",
  "cockerSpaniel",
  "shihTzu",
  "bichonFrise",
  "yorkshireTerrier",
  "dachshund",
  "husky",
  "rottweiler",
  "doberman",
  "saintBernard",
  "borderCollie",
  "welshCorgi",
  "papillon",
  "spitz",
];

const catBreedKeys = [
  "persian",
  "russianBlue",
  "siamese",
  "maineCoon",
  "britishShorthair",
  "americanShorthair",
  "bengal",
  "abyssinian",
  "scottishFold",
  "ragdoll",
  "norwegianForest",
  "turkishAngora",
  "siamCat",
  "highlandFold",
  "sphinx",
];

const getAffectedAreaCategories = (t: (key: string) => string) => [
  {
    value: "head_face",
    label: t("face"),
    subAreas: [t("ears"), t("eyeArea"), t("noseArea"), t("mouthArea"), t("snoutChin")]
  },
  {
    value: "body",
    label: t("back"),
    subAreas: [t("neck"), t("shoulders"), t("upperBack"), t("lowerBack"), t("sides")]
  },
  {
    value: "legs",
    label: t("legs"),
    subAreas: [t("frontLegs"), t("hindLegs"), t("paws"), t("betweenToes"), t("kneeJoint")]
  },
  {
    value: "belly",
    label: t("belly"),
    subAreas: [t("chest"), t("upperBelly"), t("lowerBelly"), t("groin")]
  },
  {
    value: "other",
    label: t("other"),
    subAreas: [t("tail"), t("analArea"), t("wholebody"), t("genitalArea")]
  }
];

export const MedicalQuestionnaire = React.memo(
  function MedicalQuestionnaire({
    onComplete,
  }: MedicalQuestionnaireProps) {
    const { t } = useLanguage();
    const [currentSection, setCurrentSection] = useState(0);
    const [formData, setFormData] = useState<QuestionnaireData>(
      {
        petName: "",
        petBirthDate: "",
        petBreed: "",
        customBreed: "",
        weight: "",
        pruritus: "",
        alopecia: false,
        odor: false,
        affectedAreas: [],
        ownerEmail: "",
      },
    );
    const [showCustomBreed, setShowCustomBreed] = useState(false);
    const [selectedAreaCategory, setSelectedAreaCategory] = useState("");
    console.log(formData)
    const affectedAreaCategories = useMemo(() => getAffectedAreaCategories(t), [t]);
    const sections = useMemo(() => [
      { title: t("step1Title"), icon: Heart },
      { title: t("step2Title"), icon: AlertCircle },
    ], [t]);

    const handleInputChange = useCallback(
      (field: keyof QuestionnaireData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      },
      [],
    );

    const handlePruritusChange = useCallback((value: string) => {
      setFormData((prev) => ({
        ...prev,
        pruritus: value,
      }));
    }, []);

    const handleAlopeciaChange = useCallback((value: boolean) => {
      setFormData((prev) => ({
        ...prev,
        alopecia: value,
      }));
    }, []);

    const handleOdorChange = useCallback((value: boolean) => {
      setFormData((prev) => ({
        ...prev,
        odor: value,
      }));
    }, []);

    const handleAreaToggle = useCallback((area: string) => {
      setFormData((prev) => ({
        ...prev,
        affectedAreas: prev.affectedAreas.includes(area)
          ? prev.affectedAreas.filter((a) => a !== area)
          : [...prev.affectedAreas, area],
      }));
    }, []);

    const isCurrentSectionValid = useMemo(() => {
      switch (currentSection) {
        case 0:
          const breedValid =
            formData.petBreed &&
            (formData.petBreed !== "other" ||
              (formData.customBreed &&
                formData.customBreed.trim()));
          return (
            formData.petName &&
            formData.petBirthDate &&
            breedValid &&
            formData.weight.trim()
          );
        case 1:
          return (
            formData.pruritus !== "" &&
            formData.affectedAreas.length > 0
          );
        default:
          return false;
      }
    }, [currentSection, formData]);

    // const submitToBackend = async (data: QuestionnaireData) => {
    //   try {
    //     const response = await fetch('/api/medical-questionnaire', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     });

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const result = await response.json();
    //     console.log('백엔드 전송 성공:', result);
    //     return result;
    //   } catch (error) {
    //     console.error('백엔드 전송 실패:', error);
    //     throw error;
    //   }
    // };

    const handleNext = async () => {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        try {
          // await submitToBackend(formData);
          onComplete(formData);
        } catch (error) {
          alert('데이터 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };

    const handlePrevious = () => {
      if (currentSection > 0) {
        setCurrentSection(currentSection - 1);
      }
    };

    const renderSection = () => {
      switch (currentSection) {
        case 0:
          return (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <Label className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3 block flex items-center space-x-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                  <span>{t("petName")} {t("required")}</span>
                </Label>
                <Input
                  value={formData.petName}
                  onChange={(e) =>
                    handleInputChange("petName", e.target.value)
                  }
                  placeholder={t("namePlaceholder")}
                  className="h-12 sm:h-14 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-base sm:text-lg font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-200/50 transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div>
                  <Label className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3 block flex items-center space-x-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                    <span>{t("birthDate")} {t("required")}</span>
                  </Label>
                  <DateInput
                    value={formData.petBirthDate}
                    onChange={(value) =>
                      handleInputChange(
                        "petBirthDate",
                        value,
                      )
                    }
                    placeholder={t("datePlaceholder")}
                    className="h-11 bg-white/50 backdrop-blur-sm border-gray-200 rounded-xl"
                  />
                  <p className="text-sm text-gray-600 mt-2 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
                    💡 {t("dateFormat")}
                  </p>
                </div>

                <div>
                  <Label className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3 block flex items-center space-x-2">
                    <span className="text-orange-500">⚖️</span>
                    <span>{t("weight")} {t("required")}</span>
                  </Label>
                  <Input
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    placeholder={t("weightPlaceholder")}
                    type="number"
                    step="0.1"
                    className="h-12 sm:h-14 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-base sm:text-lg font-medium focus:border-orange-400 focus:ring-4 focus:ring-orange-200/50 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm sm:text-base font-bold text-gray-800 mb-2 sm:mb-3 flex items-center space-x-2">
                  <span>{t("breed")} {t("required")}</span>
                  <span className="text-lg sm:text-xl">🐕</span>
                  <span className="text-lg sm:text-xl">🐱</span>
                </Label>
                <Select
                  value={formData.petBreed}
                  onValueChange={(value) => {
                    handleInputChange("petBreed", value);
                    if (value === "other") {
                      setShowCustomBreed(true);
                    } else {
                      setShowCustomBreed(false);
                      handleInputChange("customBreed", "");
                    }
                  }}
                >
                  <SelectTrigger className="h-11 bg-white/50 backdrop-blur-sm border-gray-200 rounded-xl">
                    <SelectValue placeholder={t("breedPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 bg-white">
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-500 mb-2 px-2">
                        {t("dogCategory")}
                      </p>
                      {dogBreedKeys.map((breedKey) => (
                        <SelectItem
                          key={breedKey}
                          value={t(breedKey)}
                          className="text-sm"
                        >
                          {t(breedKey)}
                        </SelectItem>
                      ))}
                    </div>
                    <div className="p-2 border-t">
                      <p className="text-xs font-medium text-gray-500 mb-2 px-2">
                        {t("catCategory")}
                      </p>
                      {catBreedKeys.map((breedKey) => (
                        <SelectItem
                          key={breedKey}
                          value={t(breedKey)}
                          className="text-sm"
                        >
                          {t(breedKey)}
                        </SelectItem>
                      ))}
                    </div>
                    <div className="p-2 border-t">
                      <SelectItem
                        value="other"
                        className="text-sm font-medium text-orange-600"
                      >
                        {t("otherBreed")}
                      </SelectItem>
                    </div>
                  </SelectContent>
                </Select>

                {showCustomBreed && (
                  <div className="mt-3">
                    <Input
                      value={formData.customBreed || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "customBreed",
                          e.target.value,
                        )
                      }
                      placeholder={t("customBreedPlaceholder")}
                      className="h-11 bg-white/50 backdrop-blur-sm border-orange-200 rounded-xl focus:border-orange-400"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t("customBreedHelper")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );

        case 1:
          return (
            <div className="space-y-6">
              {/* Main Symptoms Section with new image-based design */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/30">
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)",
                    }}
                  >
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <Label className="font-medium text-gray-900">{t("mainSymptoms")}</Label>
                </div>
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  {t("symptomsDescription")}
                  <span className="ml-1">😯</span>
                </p>

                {/* New Symptom Questions based on user requirements */}
                <div className="space-y-4">
                  {/* 2-1. 가려움 정도 */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-800">반려동물이 가려워하나요?</span>
                      <span className="text-xl">😟</span>
                    </div>
                    <div className="space-y-2">
                      <div
                        className={`p-3 bg-white rounded-lg border-2 cursor-pointer transition-all ${formData.pruritus === "없음"
                          ? "border-orange-400 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                        onClick={() => handlePruritusChange("없음")}
                      >
                        <p className="text-sm font-medium text-gray-800 mb-1">없음</p>
                        <p className="text-xs text-gray-600">가려워하지 않아요</p>
                      </div>
                      <div
                        className={`p-3 bg-white rounded-lg border-2 cursor-pointer transition-all ${formData.pruritus === "보통"
                          ? "border-orange-400 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                        onClick={() => handlePruritusChange("보통")}
                      >
                        <p className="text-sm font-medium text-gray-800 mb-1">보통</p>
                        <p className="text-xs text-gray-600">가끔 긁거나 핥아요</p>
                      </div>
                      <div
                        className={`p-3 bg-white rounded-lg border-2 cursor-pointer transition-all ${formData.pruritus === "심함"
                          ? "border-orange-400 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                          }`}
                        onClick={() => handlePruritusChange("심함")}
                      >
                        <p className="text-sm font-medium text-gray-800 mb-1">심함</p>
                        <p className="text-xs text-gray-600">계속 긁고 핥아요</p>
                      </div>
                    </div>
                  </div>

                  {/* 2-2. 피부 냄새 */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-800">피부에서 냄새가 나나요?</span>
                      <span className="text-xl">👃</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleOdorChange(true)}
                        className={`p-3 rounded-xl border-2 transition-all ${formData.odor === true
                          ? "bg-orange-50 border-orange-400 text-orange-800"
                          : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="text-center">
                          <div className="text-lg font-bold mb-1">O</div>
                          <div className="text-xs">기름지고 냄새남</div>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOdorChange(false)}
                        className={`p-3 rounded-xl border-2 transition-all ${formData.odor === false
                          ? "bg-orange-50 border-orange-400 text-orange-800"
                          : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="text-center">
                          <div className="text-lg font-bold mb-1">X</div>
                          <div className="text-xs">냄새 없음</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* 2-3. 털빠짐 */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-800">털이 많이 빠지나요?</span>
                      <span className="text-xl">🪶</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleAlopeciaChange(true)}
                        className={`p-3 rounded-xl border-2 transition-all ${formData.alopecia === true
                          ? "bg-orange-50 border-orange-400 text-orange-800"
                          : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="text-center">
                          <div className="text-lg font-bold mb-1">O</div>
                          <div className="text-xs">털이 많이 빠짐</div>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAlopeciaChange(false)}
                        className={`p-3 rounded-xl border-2 transition-all ${formData.alopecia === false
                          ? "bg-orange-50 border-orange-400 text-orange-800"
                          : "bg-white border-gray-200 hover:border-gray-300"
                          }`}
                      >
                        <div className="text-center">
                          <div className="text-lg font-bold mb-1">X</div>
                          <div className="text-xs">정상적인 털빠짐</div>
                        </div>
                      </button>
                    </div>
                  </div>

                </div>

                {formData.pruritus && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl">
                    <p className="text-sm font-medium text-orange-800 mb-2">
                      선택된 증상
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {formData.pruritus && (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                          {formData.pruritus}
                        </Badge>
                      )}
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                        {formData.odor ? 'O' : 'X'} 냄새
                      </Badge>
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                        {formData.alopecia ? 'O' : 'X'} 털빠짐
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              {/* Affected Area Section */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/30">
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)",
                    }}
                  >
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <Label className="font-medium text-gray-900">{t("affectedAreas")}</Label>
                </div>

                {/* Category Dropdown */}
                <div className="mb-3">
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    {t("categorySelect")}
                  </Label>
                  <Select
                    value={selectedAreaCategory}
                    onValueChange={setSelectedAreaCategory}
                  >
                    <SelectTrigger className="h-11 bg-white/70 backdrop-blur-sm border-gray-200 rounded-xl">
                      <SelectValue placeholder={t("selectAreaPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {affectedAreaCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sub-areas multi-select */}
                {selectedAreaCategory && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      {t("subAreaSelect")}
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {affectedAreaCategories
                        .find(cat => cat.value === selectedAreaCategory)
                        ?.subAreas.map((area) => (
                          <div
                            key={area}
                            className="flex items-center space-x-2 p-2 bg-white/30 rounded-lg"
                          >
                            <Checkbox
                              checked={formData.affectedAreas.includes(area)}
                              onCheckedChange={() => handleAreaToggle(area)}
                            />
                            <span className="text-sm text-gray-700 flex-1">
                              {area}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {formData.affectedAreas.length > 0 && (
                  <div className="mt-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl">
                    <p className="text-sm font-medium text-orange-800 mb-2">
                      선택된 부위 ({formData.affectedAreas.length}개)
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {formData.affectedAreas.slice(0, 3).map((area, index) => (
                        <Badge
                          key={`${area}-${index}`}
                          className="bg-orange-100 text-orange-700 border-orange-200 text-xs"
                        >
                          {area}
                        </Badge>
                      ))}
                      {formData.affectedAreas.length > 3 && (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                          +{formData.affectedAreas.length - 3}개 더
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="w-full max-w-full">
        <div className="mb-4 sm:mb-6 md:mb-8 text-center px-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-orange-700 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 leading-tight">
            {sections[currentSection].title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-2 sm:mb-3 md:mb-4">
            {currentSection === 0
              ? t("step1Description")
              : t("step2Description")
            }
          </p>
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
            <span className="text-orange-500">💡</span>
            <span className="text-xs sm:text-sm text-orange-700 font-medium">
              {t("accurateInfo")}
            </span>
          </div>
        </div>

        {/* 향상된 진행 상태 */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-3 sm:p-4 md:p-6 shadow-xl border border-white/30">
            <div className="flex items-center justify-center">
              {sections.map((section, index) => {
                const Icon = section.icon;
                const isActive = currentSection === index;
                const isCompleted = currentSection > index;

                const sectionLabels = ["기본정보", "증상입력"];

                return (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-1"
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive
                          ? "text-white shadow-xl scale-110 ring-4 ring-orange-200/50"
                          : isCompleted
                            ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                          }`}
                        style={
                          isActive
                            ? {
                              background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)",
                            }
                            : {}
                        }
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>

                      {/* 단계 라벨 */}
                      <div className={`mt-3 text-xs font-bold transition-all duration-300 ${isActive ? "text-orange-600" : isCompleted ? "text-emerald-600" : "text-gray-400"
                        }`}>
                        {sectionLabels[index]}
                      </div>

                      {/* 활성 상태 애니메이션 */}
                      {isActive && (
                        <>
                          <div
                            className="absolute top-0 left-0 w-12 h-12 rounded-2xl animate-ping opacity-20"
                            style={{
                              background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)",
                            }}
                          ></div>
                          <div
                            className="absolute top-1 left-1 w-10 h-10 rounded-xl animate-pulse opacity-30"
                            style={{
                              background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)",
                            }}
                          ></div>
                        </>
                      )}
                    </div>
                    {index < sections.length - 1 && (
                      <div className="flex-1 h-1.5 mx-6 rounded-full overflow-hidden bg-gray-100 relative self-start mt-6">
                        <div
                          className={`h-full transition-all duration-700 ease-out rounded-full ${isCompleted
                            ? "w-full bg-gradient-to-r from-emerald-400 to-green-500"
                            : isActive
                              ? "w-1/3 bg-gradient-to-r from-orange-400 to-orange-500 animate-pulse"
                              : "w-0"
                            }`}
                        />
                        {/* 진행 중 글리터 효과 */}
                        {isActive && (
                          <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-center">

            </div>
          </div>
        </div>

        {/* 향상된 메인 콘텐츠 */}
        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl mb-4 sm:mb-6 md:mb-8 rounded-3xl overflow-hidden">
          <CardHeader className="pb-3 sm:pb-4 md:pb-6 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50">
            <CardTitle className="flex items-center space-x-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)",
                }}
              >
                {React.createElement(
                  sections[currentSection].icon,
                  { className: "w-6 h-6 text-white" },
                )}
              </div>
              <span className="text-xl font-bold text-gray-900">
                {sections[currentSection].title}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {renderSection()}
          </CardContent>
        </Card>

        {/* 향상된 네비게이션 버튼 */}
        <div className="flex space-x-3 sm:space-x-4">
          {currentSection > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              className="flex-1 h-12 sm:h-14 bg-white/70 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-2xl font-bold transition-all duration-300 hover:shadow-lg"
            >
              {t("previous")}
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isCurrentSectionValid}
            className="flex-1 h-12 sm:h-14 text-white shadow-xl rounded-2xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:scale-105"
            style={{
              background: isCurrentSectionValid
                ? "linear-gradient(135deg, #f0663f 0%, #d45a2f 100%)"
                : "linear-gradient(135deg, #cccccc 0%, #999999 100%)",
            }}
          >
            {currentSection === sections.length - 1 ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-base sm:text-lg">{t("complete")}</span>
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-base sm:text-lg">{t("next")}</span>
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            )}
          </Button>
        </div>
      </div>
    );
  },
);