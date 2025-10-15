import React from "react";

type Payment = {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
};

type UserType = {
  Payment: Payment[];
};

interface PaymentModalProps {
  user: UserType;
  onClose: () => void;
}

export default function PaymentModal({ user, onClose }: PaymentModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">결제 내역</h2>
        {user.Payment.length === 0 && (
          <p className="text-gray-500 text-center py-4">결제 내역이 없습니다.</p>
        )}
        {user.Payment.map((p) => (
          <div key={p.id} className="flex justify-between items-center border-b py-2">
            <span>주문ID: {p.orderId}</span>
            <span>금액: {p.amount} {p.currency}</span>
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
