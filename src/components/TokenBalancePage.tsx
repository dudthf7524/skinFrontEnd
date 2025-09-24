import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Coins, CheckCircle } from "lucide-react";

// 거래 내역 타입 정의
type TokenTransaction = {
  id: string;
  type: "purchase";
  amount: number;
  description: string;
  date: string;
  status: "completed";
  orderId?: string;
};

// 거래 상태 뱃지 함수
function getStatusBadge(status: string) {
  if (status === "completed") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 ml-2">
        완료
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 ml-2">
      {status}
    </span>
  );
}

// 거래 아이콘 함수
function getTransactionIcon(type: string) {
  if (type === "purchase") {
    return (
      <Coins className="w-6 h-6 text-[var(--talktail-orange)] mr-2" />
    );
  }
  return (
    <CheckCircle className="w-6 h-6 text-gray-400 mr-2" />
  );
}

export function TokenBalancePage() {
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [loadingRefund, setLoadingRefund] = useState<string | null>(null); // 환불 로딩 상태

  const list = async () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const res = await axios.get(`${apiBaseUrl}/paypal/list`, {
        withCredentials: true,
      });
      const completedTx = res.data.payments.filter((tx: any) => tx.status === "COMPLETED");
      const mapped: TokenTransaction[] = completedTx.map((tx: any) => ({
        id: tx.id.toString(),
        type: "purchase",
        amount: Number(tx.amount),
        description: `PayPal 결제 (${tx.currency})`,
        date: new Date(tx.createdAt).toLocaleString(),
        status: "completed",
        orderId: tx.orderId, // 환불 시 필요
      }));
      setTransactions(mapped);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    list();
  }, []);

  // ✅ 환불 함수
  const handleRefund = async (orderId: string) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    if (!window.confirm("정말로 환불하시겠습니까?")) return;
    setLoadingRefund(orderId);
    try {
      const res = await axios.post(
        `${apiBaseUrl}/paypal/refund`,
        { orderId },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("환불 성공!");
        // 환불 완료 후 목록 다시 불러오기
        await list();
      } else {
        alert("환불 실패");
      }
    } catch (err) {
      console.error("환불 오류:", err);
      alert("환불 중 오류가 발생했습니다.");
    } finally {
      setLoadingRefund(null);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--talktail-gray)] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">토큰 관리</h1>

        <Card className="bg-white">
          <div className="p-4 sm:p-6 border-b">
            <h3 className="font-bold text-gray-900">거래 내역</h3>
          </div>
          <div className="divide-y">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <div key={tx.id} className="p-4 sm:p-6 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(tx.type)}
                    <div>
                      <p className="font-medium text-gray-900">{tx.description}</p>
                      <p className="text-sm text-gray-600">{tx.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className={`font-bold ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {tx.amount > 0 ? "+" : ""}
                        {tx.amount} 토큰
                      </div>
                      {getStatusBadge(tx.status)}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-4"
                      disabled={loadingRefund === tx.orderId}
                      onClick={() => handleRefund(tx.orderId!)}
                    >
                      {loadingRefund === tx.orderId ? "환불 중..." : "환불"}
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">완료된 거래 내역이 없습니다.</div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
