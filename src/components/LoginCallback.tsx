import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "../styles/LoginCallback.module.css";
import { Heart, Menu } from "lucide-react";
import Navbar from "./Navbar";

export default function LoginCallback() {
  const navigate = useNavigate();
  const handleCallback = async (code: string, type: string) => {
    const callBackUrl = import.meta.env.VITE_CALLBACK_URL;
    try {
      const res = await axios.get(
        `${callBackUrl}/auth/callback/${type}?code=${code}`,
        { withCredentials: true }
      );

      if (res.status === 200) {
        // JWT 토큰 저장
        localStorage.setItem("accessToken", res.data.user.accessToken);

        // 사용자 정보 저장
        localStorage.setItem("user", JSON.stringify(res.data.user));

        console.log("로그인 성공:", res.data);

        // 홈 페이지로 이동
        navigate("/");
      } else {
      }
    } catch (err: any) {
      console.error("로그인 실패:", err);
    }
  };

  // useEffect(() => {
  //   const loginType = localStorage.getItem("loginType");
  //   setSnsType(loginType);
  // }, []);

  // useEffect(() => {
  //   if (snsType) {
  //     const params = new URLSearchParams(window.location.search);
  //     const code = params.get("code");

  //     if (code) {
  //       handleCallback(code, snsType);
  //     }
  //   }
  // }, [snsType]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    // URL에서 state 파라미터나 referrer 확인하여 로그인 타입 판단
    const state = params.get("state");
    let type = localStorage.getItem("loginType") || "kakao";

    if (state && state.includes("google")) {
      type = "google";
    } else if (state && state.includes("naver")) {
      type = "naver";
    } else if (window.location.search.includes("google") ||
      document.referrer.includes("google") ||
      document.referrer.includes("accounts.google.com")) {
      type = "google";
    } else if (window.location.search.includes("naver") ||
      document.referrer.includes("naver") ||
      document.referrer.includes("nid.naver.com")) {
      type = "naver";
    }
    // localStorage에 정확한 타입 저장
    localStorage.setItem("loginType", type);

    if (code) {
      handleCallback(code, type);
    }
  }, []);

  return (
    <div className={style.container} id="home">
      <Navbar />
    </div>
  );
}
