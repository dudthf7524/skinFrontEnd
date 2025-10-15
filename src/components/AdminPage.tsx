import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import PaperweightModal from "./PaperweightModal";

interface User {
  id: number;
  name: string;
  email: string;
  hasPayment: boolean;
  hasAnalysis: boolean;
}

const mockUsers: User[] = [
  { id: 1, name: "김신우", email: "sinwoo@example.com", hasPayment: true, hasAnalysis: true },
  { id: 2, name: "홍길동", email: "hong@example.com", hasPayment: false, hasAnalysis: true },
  { id: 3, name: "이서준", email: "lee@example.com", hasPayment: true, hasAnalysis: false },
];

export default function AdminPage() {
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

  const handlePaymentClick = (user: User) => {
    if (!user.hasPayment) return;
    setSelectedUser(user);
    setIsPaymentOpen(true);
  };

  const handleAnalysisClick = (user: User) => {
    if (!user.hasAnalysis) return;
    setSelectedUser(user);
    setIsAnalysisOpen(true);
  };

  const handleDetail = (userId: number) => {
    navigate(`/admin/detail/${userId}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">사용자 리스트</h1>

      <table className="w-full border-collapse bg-white shadow-sm rounded-xl overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">이름</th>
            <th className="p-3">이메일</th>
            <th className="p-3 text-center">결제 내역</th>
            <th className="p-3 text-center">분석 내역</th>
            <th className="p-3 text-center">상세 보기</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50 transition-colors">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => handlePaymentClick(user)}
                  disabled={!user.hasPayment}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    user.hasPayment
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  결제 내역
                </button>
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => handleAnalysisClick(user)}
                  disabled={!user.hasAnalysis}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    user.hasAnalysis
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  분석 내역
                </button>
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => handleDetail(user.id)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-700 text-white hover:bg-gray-800"
                >
                  상세 보기
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPaymentOpen && selectedUser && (
        <PaymentModal user={selectedUser} onClose={() => setIsPaymentOpen(false)} />
      )}

      {isAnalysisOpen && selectedUser && (
        <PaperweightModal
          user={selectedUser}
          onClose={() => setIsAnalysisOpen(false)}
          onDetail={() => {
            setIsAnalysisOpen(false);
            handleDetail(selectedUser.id);
          }}
        />
      )}
    </div>
  );
}
