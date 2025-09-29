import { useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { CreditCard, Coins, Check, Gift, Crown, Cookie } from "lucide-react";
import axios from "axios";

interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  popular?: boolean;
  bonus?: number;
  description: string;
  features: string[];
}
const params = new URLSearchParams(window.location.search);
const token = params.get("token");
console.log(token)
export function TokenPurchasePage() {
  const tokenPackages: TokenPackage[] = [
    { id: "starter", name: "시작하기", tokens: 1, price: 1, description: "처음 사용해보는 분들을 위한 기본 패키지", features: ["1회 AI 진단"] },
    { id: "standard", name: "표준", tokens: 5, price: 5, popular: true, description: "가장 인기 있는 패키지", features: ["5회 AI 진단"] },
    { id: "premium", name: "프리미엄", tokens: 10, price: 10, description: "헤비 유저를 위한 대용량", features: ["10회 AI 진단", "프리미엄 질병 정보"] },
  ];


  // 주문 생성
  const handlePurchase = async (price: number, retry = true) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const { data } = await axios.post(
        `${apiBaseUrl}/paypal/order`,
        { current: price },
        {
          withCredentials: true
        }
      );

      const approveUrl = data.approveUrl;
      if (!approveUrl) {
        alert("주문 생성 실패");
        return;
      }

      window.location.href = approveUrl; // PayPal 페이지로 이동
    } catch (err: any) {
      console.error("결제 요청 실패:", err);

      if (err.response?.status === 401 && retry) {
        try {
          const refreshRes = await axios.post(
            `${apiBaseUrl}/auth/refresh-token`,
            {},
            { withCredentials: true }
          );

          if (refreshRes.data.success) {
            console.log("AccessToken 갱신 성공 → 재시도");
            await handlePurchase(price, false);
          } else {
            alert("토큰 갱신 실패. 다시 로그인 해주세요.");
          }
        } catch (refreshErr) {
          console.error("토큰 갱신 실패:", refreshErr);
          alert("토큰 갱신 중 오류 발생. 다시 로그인 해주세요.");
        }
      } else {
        console.error("결제 요청 상세 오류:", err);
        alert(`결제 요청 중 오류가 발생했습니다.\n오류 내용: ${err.response?.data?.message || err.message || '알 수 없는 오류'}`);
      }
    }
  };
  // 토큰 리다이렉트 로직 제거 (홈에서 처리됨)


  // const capturePayment = async () => {
  //   const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  //   if (token) {
  //     try {
  //       const { data } = await axios.post(
  //         `${apiBaseUrl}/paypal/capture/${token}`,
  //         {},
  //         { withCredentials: true }
  //       );

  //       if (data.success) {
  //         alert("결제 완료! 토큰이 충전되었습니다.");
  //         window.location.href = "/"; // 원래 화면(메인페이지)으로 이동
  //       } else {
  //         alert("결제 완료 처리 실패");
  //       }
  //     } catch (err) {
  //       console.error("캡처 실패:", err);
  //       alert("결제 완료 처리 중 오류 발생");
  //     }
  //   } else {
  //     alert("토큰이 없습니다.");
  //   }
  // };

  // useEffect(() => {
  //   capturePayment();
  // }, [token])



  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      const capturePayment = async () => {
        try {
          const { data } = await axios.post(
            `${apiBaseUrl}/paypal/capture/${token}`,
            {},
            { withCredentials: true }
          );

          if (data.success) {
            alert("결제 완료! 토큰이 충전되었습니다.");
            window.location.href = "/"; // 원래 화면(메인페이지)으로 이동
          } else {
            alert("결제 완료 처리 실패");
          }
        } catch (err) {
          console.error("캡처 실패:", err);
          alert("결제 완료 처리 중 오류 발생");
        }
      };
      capturePayment();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--talktail-gray)] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">토큰 구매</h1>
              <p className="text-gray-600 text-sm sm:text-base">AI 진단에 필요한 토큰을 구매하세요</p>
            </div>
          </div>
        </div>

        {/* 이벤트 카드 */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-[var(--talktail-mint)] to-white border-0">
          <div className="flex items-center">
            <Gift className="w-8 h-8 text-[var(--talktail-orange)] mr-3" />
            <div>
              <h3 className="font-bold text-gray-900 mb-1">🎉 신규 회원 특가 이벤트</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                첫 구매 시 <span className="font-bold text-[var(--talktail-orange)]">20% 할인</span> +{" "}
                <span className="font-bold text-[var(--talktail-orange)]">보너스 토큰 증정</span>
              </p>
            </div>
          </div>
        </Card>

        {/* 패키지 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokenPackages.map((pkg) => (
            <Card key={pkg.id} className={`relative p-6 border-2 transition-all duration-300 hover:shadow-xl ${pkg.popular
              ? "border-[var(--talktail-orange)] bg-gradient-to-b from-orange-50 to-white"
              : "border-gray-200 bg-white hover:border-[var(--talktail-orange)]"
              }`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[var(--talktail-orange)] text-white px-4 py-1 flex items-center">
                    <Crown className="w-4 h-4 mr-1" /> 인기
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  <Coins className="w-5 h-5 text-[var(--talktail-orange)] mr-2" />
                  <span className="text-2xl font-bold text-[var(--talktail-orange)]">
                    {pkg.tokens}{pkg.bonus && <span className="text-lg text-green-600">+{pkg.bonus}</span>}
                  </span>
                  <span className="text-gray-600 ml-1">토큰</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{pkg.price}$</div>
              </div>

              <p className="text-gray-600 text-center mb-4">{pkg.description}</p>

              <ul className="space-y-2 mb-6">
                {pkg.features.map((f, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" /> {f}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePurchase(pkg.price)}
                className={pkg.popular
                  ? "w-full py-3 bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-white"
                  : "w-full py-3 bg-gray-100 hover:bg-[var(--talktail-orange)] hover:text-white text-gray-700"}
              >
                <CreditCard className="w-4 h-4 mr-2" /> 구매하기
              </Button>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
