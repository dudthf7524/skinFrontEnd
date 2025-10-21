import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, Sparkles, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import Navbar from "../Navbar";
import { useLanguage } from "../LanguageContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export default function CouponRedeemPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChange = (v: string) => {
    const normalized = v.replace(/\D/g, "").slice(0, 6);
    setCode(normalized);
  };

  const submit = async () => {
    setMsg(null);
    setError(null);
    if (code.length !== 6) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/user/redeem/coupon`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "쿠폰 적용 실패");

      const added = data?.granted ?? 0;

      setMsg(`✅ 쿠폰이 적용되었습니다! +${added}토큰`);

      setTimeout(() => {
        navigate("/mypage");
      }, 1500);
    } catch (e: any) {
      setError(e?.message ?? "쿠폰 적용 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--talktail-beige)] via-white to-[var(--talktail-mint-light)] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[var(--talktail-orange-light)] p-8 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-28 h-28 bg-[var(--talktail-orange)] opacity-10 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[var(--talktail-mint)] opacity-10 rounded-tr-full"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-[var(--talktail-mint)] text-[var(--talktail-orange-dark)] px-4 py-2 rounded-full font-medium mb-4 shadow-sm">
              <Ticket className="w-4 h-4 mr-2" />
              쿠폰 교환 페이지
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              쿠폰 코드 입력
            </h1>
            <p className="text-sm text-gray-600">
              받은 6자리 숫자 코드를 입력하여 토큰을 충전하세요.
            </p>
          </div>

          {/* Input */}
          <div className="space-y-4">
            <input
              pattern="\d*"
              inputMode="numeric"
              placeholder="예: 45AKV"
              value={code}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl text-center tracking-widest text-lg font-mono focus:ring-4 focus:ring-[var(--talktail-orange-light)] focus:border-[var(--talktail-orange)] outline-none transition-all"
              maxLength={6}
            />

            <button
              disabled={loading || code.length !== 6}
              onClick={submit}
              className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
                loading || code.length !== 6
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-[var(--talktail-orange)] to-[var(--talktail-orange-light)] hover:from-[var(--talktail-orange-dark)] hover:to-[var(--talktail-orange)] shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? "적용 중..." : "쿠폰 적용하기"}
            </button>
          </div>

          {/* Messages */}
          {msg && (
            <div className="mt-5 flex items-center text-green-600 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 mr-2" /> {msg}
            </div>
          )}
          {error && (
            <div className="mt-5 flex items-center text-red-600 text-sm font-medium">
              <XCircle className="w-4 h-4 mr-2" /> {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => navigate("/mypage")}
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--talktail-mint)] hover:bg-[var(--talktail-mint-dark)] text-[var(--talktail-orange-dark)] py-2 rounded-xl font-semibold transition-all"
            >
              마이페이지로 돌아가기
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl font-semibold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              뒤로가기
            </button>
          </div>

          {/* Footer Sparkle */}
          <div className="absolute -bottom-2 right-3 opacity-30">
            <Sparkles className="w-8 h-8 text-[var(--talktail-orange)] animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}

// 귀여운 심볼용 커스텀 하트 (lucide Heart이 너무 커서 깔끔한 svg)
function HeartIcon() {
  return (
    <svg
      className="w-4 h-4 text-[var(--talktail-orange-dark)]"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18l-6.828-7.172a4 4 0 010-5.656z" />
    </svg>
  );
}
