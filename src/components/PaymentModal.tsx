import { Dialog } from "@headlessui/react";
import { useEffect } from "react";

interface Props {
  user: { id: number; name: string };
  onClose: () => void;
}

export default function PaymentModal({ user, onClose }: Props) {
  useEffect(() => {
    // 서버에서 결제 내역 fetch
    // 예: fetch(`/api/payment/${user.id}`)
  }, [user.id]);

  return (
    <Dialog open onClose={onClose} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white p-6 rounded-xl shadow-xl w-[400px]">
        <h2 className="text-lg font-semibold mb-4">{user.name}님의 결제 내역</h2>
        <div className="space-y-2">
          <p>• 2025-10-01 — 프리미엄 플랜 ₩9,900</p>
          <p>• 2025-09-01 — 기본 플랜 ₩4,900</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          닫기
        </button>
      </div>
    </Dialog>
  );
}
