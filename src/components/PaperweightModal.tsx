import React from "react";

interface PaperweightItem {
  id: number;
  PetName: string;
}

interface UserType {
  Paperweight: PaperweightItem[];
  // Add any other properties needed from UserType, if applicable
}

interface PaperweightModalProps {
  user: UserType;
  onClose: () => void;
  onDetail: (id: number) => void;
}


export default function PaperweightModal({ user, onClose, onDetail }: PaperweightModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">분석 기록</h2>
        {user.Paperweight.length === 0 && (
          <p className="text-gray-500 text-center py-4">분석 기록이 없습니다.</p>
        )}
        {user.Paperweight.map((p: { id: React.Key | null | undefined; PetName: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | Iterable<React.ReactNode> | null | undefined; }) => (
          <div key={p.id} className="flex justify-between items-center border-b py-2">
            <span>{p.PetName}</span>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => {
                if (typeof p.id === "number") {
                  onDetail(p.id);
                }
              }}
              disabled={typeof p.id !== "number"}
            >
              상세보기
            </button>
          </div>
        ))}
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
