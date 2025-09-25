import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Filter,
  Search,
} from "lucide-react";
import { Status } from "@googlemaps/react-wrapper";
import Map from "./ui/google-maps";
import Navbar from "./Navbar";
import { useLanguage } from "./LanguageContext";

interface filtersType {
  id: string;
  label: string;
  color: string;
}

interface vetClinicsType {
  id: number;
  name: string;
  specialties: string[];
  rating: number;
  distance: number;
  address: string;
  phone: string;
  hours: string;
  isOpen: boolean;
  is24h: boolean;
  hasEmergency: boolean;
  image: string;
}

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return "로딩중...";
    case Status.FAILURE:
      return "에러 발생";
    case Status.SUCCESS:
      return "로드 성공";
  }
};

export function VetFinderPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  // hospitalDetail의 타입을 vetClinicsType[]으로 변경
  const [hospitalDetail, setHospitalDetail] = useState<vetClinicsType[]>([]);
  const [filterListData, setFilterListData] = useState<vetClinicsType[]>([])

  const filters: filtersType[] = [
    { id: "isOpen", label: t("vetFinder_filterOpen"), color: "bg-blue-100 text-blue-800" },
  ];

  const vetClinics: vetClinicsType[] = hospitalDetail;

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const [filteredClinics, setFilteredClinics] = useState<vetClinicsType[]>([]);

  // 검색 및 필터링 로직
  const getFilteredClinics = () => {
    let filtered = hospitalDetail;

    // 검색어 필터링
    if (searchQuery.trim()) {
      filtered = filtered.filter(clinic =>
        clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.specialties.some(specialty =>
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // 필터 적용
    if (selectedFilters.includes("isOpen")) {
      filtered = filtered.filter(clinic => clinic.isOpen);
    }

    return filtered;
  };

  // 실제로 표시할 클리닉 목록
  const displayClinics = getFilteredClinics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--talktail-gray)] to-white">
      <Navbar currentPage="search" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("vetFinder_pageTitle")}</h1>
          <p className="text-xl text-gray-600">
            {t("vetFinder_pageDescription")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-96 lg:h-[600px]">
              {/* setHospitalDetail의 타입이 맞게 전달 */}
              <Map setHospitalDetail={setHospitalDetail} />
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="space-y-6">
            {/* Search */}
            <Card className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder={t("vetFinder_searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </Card>

            {/* Filters */}
            <Card className="p-4">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                {t("vetFinder_filtersTitle")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <Badge
                    key={filter.id}
                    className={`cursor-pointer transition-all ${selectedFilters.includes(filter.id)
                      ? filter.color
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    onClick={() => toggleFilter(filter.id)}
                  >
                    {filter.label}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Clinic List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {displayClinics.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {hospitalDetail.length === 0 ?
                    t("vetFinder_noHospitalsFound") || "병원을 찾을 수 없습니다." :
                    t("vetFinder_noResultsFound") || "검색 결과가 없습니다."
                  }
                </div>
              ) : (
                displayClinics.map((clinic) => (
                  <Card
                    key={clinic.id}
                    className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{clinic.image}</div>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {clinic.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center text-yellow-500">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm ml-1">
                                {clinic.rating}
                              </span>
                            </div>
                            <Badge
                              className={`text-xs ${clinic.isOpen
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                }`}
                            >
                              {clinic.isOpen ? t("vetFinder_statusOpen") : t("vetFinder_statusClosed")}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {clinic.distance}km
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex flex-wrap gap-1">
                        {clinic.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {clinic.address}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {clinic.hours}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {clinic.phone}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)]"
                      >
                        {t("vetFinder_reserveButton")}
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
