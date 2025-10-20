// src/pages/CouponRedeemPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export default function CouponRedeemPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChange = (v: string) => {
    const normalized = v.slice(0, 6);
    setCode(normalized);
  };

  const submit = async () => {
    setMsg(null);
    setError(null);

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/coupon/redeem`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      // 백엔드 JSON 응답 가정
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || data?.error || "쿠폰 적용 실패");
      }

      // 예: { ok: true, addedTokens: 5, newBalance: 12, coupon: {...} }
      const added = data?.addedTokens ?? 0;
      const balance = data?.newBalance;
      setMsg(`쿠폰이 적용되었습니다. +${added}토큰 (보유: ${balance}토큰)`);

      // 잠깐 표시 후 마이페이지로
      setTimeout(() => {
        navigate("/mypage"); // 라우트 이름 프로젝트에 맞게 변경
      }, 1200);
    } catch (e: any) {
      setError(e?.message ?? "쿠폰 적용 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow rounded-xl p-6 space-y-5">
        <h1 className="text-xl font-bold">쿠폰 코드 입력</h1>
        <p className="text-sm text-gray-600">
          받은 6자리 숫자 쿠폰 코드를 입력하면 토큰이 충전됩니다.
        </p>

        <input
          pattern="\d*"
          placeholder="예) 123456"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg text-center tracking-widest text-lg font-mono"
          maxLength={6}
        />

        <button
          disabled={loading || code.length !== 6}
          onClick={submit}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-50"
        >
          {loading ? "적용 중..." : "쿠폰 적용"}
        </button>

        {msg && <div className="text-green-600 text-sm">{msg}</div>}
        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          onClick={() => navigate(-1)}
          className="w-full py-2 rounded-lg bg-gray-100 text-gray-700"
        >
          뒤로가기
        </button>
      </div>
    </div>
  );
}
