// src/components/Map.tsx
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const Map: React.FC = ({setHospitalDetail}) => {
  const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ["places"],
    language: "ko"
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("위치 가져오기 실패:", err);
        }
      );
    }
  }, []);

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

  useEffect(() => {
    if (position && isLoaded) {
      const service = new google.maps.places.PlacesService(
        document.createElement("div")
      );
  
      service.nearbySearch(
        {
          location: position,
          radius: 3000,
          type: "veterinary_care",
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            setPlaces(results)
           
            results.forEach((place) => {
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
                      ],
                    },
                    (detail, detailStatus) => {
                      
                      if (
                        detailStatus === google.maps.places.PlacesServiceStatus.OK &&
                        detail
                      ) {
                        const newClinic = {
                          id: Date.now(), 
                          name: detail.name || "이름 없음",
                          specialties: [],
                          rating: detail.rating || 0,
                          distance: getDistanceKm(
                            position.lat,
                            position.lng,
                            place.geometry?.location?.lat ? place.geometry.location.lat() : 0,
                            place.geometry?.location?.lng ? place.geometry.location.lng() : 0
                          ).toFixed(1),
                          hospitalLat: place.geometry?.location?.lat ? place.geometry.location.lat() : 0,
                          hospitalLng: place.geometry?.location?.lng ? place.geometry.location.lng() : 0,
                          address: detail.formatted_address || "주소 없음",
                          phone: detail.formatted_phone_number || "전화번호 없음",
                          hours: detail.opening_hours
                            ? detail.opening_hours.open_now
                              ? "영업중"
                              : "영업종료"
                            : "정보 없음",
                          isOpen: detail.opening_hours?.open_now || false,
                          is24h: false,
                          hasEmergency: false,
                          image: "🏥",
                        };
                        setHospitalDetail((prev) => [...prev, newClinic]);
                      }
                    }
                  );                  
              }
            });
          }
        }
      );
    }
  }, [isLoaded, position]);
  

  return (
    <>
      {isLoaded && position && (
        <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={14}>
          {/* 현재 위치 마커 */}
          <Marker position={position} label="내 위치" />

          {/* 주변 동물병원 마커 */}
          {places.map((place, idx) =>
            place.geometry?.location ? (
              <Marker
                key={idx}
                position={{
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }}
                label={place.name}
              />
            ) : null
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
