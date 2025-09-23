import React, { useState } from 'react';
import { DogBreedSelector, DogBreedDisplay, useDogBreedTranslation } from './DogBreedTranslation';

// 사용 예시 컴포넌트
export const DogBreedExample: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>(''); // 한글 품종명으로 저장
  const { translateBreed, getTranslatedBreeds } = useDogBreedTranslation();

  // 백엔드로 전송할 때의 예시
  const handleSubmit = () => {
    const dataToSend = {
      petBreed: selectedBreed, // 한글 품종명이 백엔드로 전송됨
      // 다른 데이터들...
    };

    console.log('백엔드로 전송될 데이터:', dataToSend);
    alert(`선택된 품종 (한글): ${selectedBreed}\n화면 표시: ${translateBreed(selectedBreed)}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">개 품종 번역 예시</h2>

      {/* 품종 선택 드롭다운 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          품종 선택:
        </label>
        <DogBreedSelector
          value={selectedBreed}
          onChange={setSelectedBreed}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 선택된 품종 표시 */}
      {selectedBreed && (
        <div className="mb-4 p-3 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-600">선택된 품종:</p>
          <p className="font-semibold">
            <DogBreedDisplay breed={selectedBreed} />
          </p>
          <p className="text-xs text-gray-500 mt-1">
            (저장된 값: {selectedBreed})
          </p>
        </div>
      )}

      {/* 제출 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!selectedBreed}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        데이터 전송 테스트
      </button>

      {/* 사용 가능한 품종 목록 (개발 참고용) */}
      <details className="mt-6">
        <summary className="text-sm text-gray-600 cursor-pointer">
          사용 가능한 품종 목록 보기
        </summary>
        <div className="mt-2 text-xs text-gray-500 max-h-32 overflow-y-auto">
          {getTranslatedBreeds().map(({ korean, translated }) => (
            <div key={korean} className="flex justify-between">
              <span>{translated}</span>
              <span className="text-gray-400">({korean})</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
};

export default DogBreedExample;