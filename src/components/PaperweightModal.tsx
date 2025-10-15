import { Dialog } from "@headlessui/react";

interface Props {
  user: { id: number; name: string };
  onClose: () => void;
  onDetail: () => void;
}

export default function PaperweightModal({ user, onClose, onDetail }: Props) {
  return (
    <Dialog open onClose={onClose} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white p-6 rounded-xl shadow-xl w-[400px]">
        <h2 className="text-lg font-semibold mb-4">{user.name}님의 분석 내역</h2>
        <div className="space-y-2">
          <p>• 분석 ID: 1029 — AI 분석 결과</p>
          <p>• 분석 ID: 1044 — 패턴 인식 분석</p>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            닫기
          </button>
          <button
            onClick={onDetail}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            상세 보기
          </button>
        </div>
      </div>
    </Dialog>
  );
}
