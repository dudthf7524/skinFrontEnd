import React, { useEffect } from 'react';
import style from "../styles/Login.module.css";
import apple from "../assets/img/apple.png";
import axios from 'axios';

declare global {
  interface Window {
    AppleID: {
      auth: {
        init: (config: any) => void;
        signIn: () => Promise<any>;
      };
    };
  }
}

const AppleLogin = () => {
  useEffect(() => {
    // Apple Sign In JS SDK 로드
    const script = document.createElement('script');
    script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const loginWithApple = async (e: React.MouseEvent) => {
    e.preventDefault();
    window.AppleID.auth.init({
      clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
      scope: import.meta.env.VITE_APPLE_SCOPE,
      redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI,
      state: import.meta.env.VITE_APPLE_STATE,
      nonce: import.meta.env.VITE_APPLE_NONCE,
      usePopup: true,
    });

    try {
      const res = await window.AppleID.auth.signIn();
      console.log("res", res);

      const payload = {
        code: res?.authorization?.code,
        id_token: res?.authorization?.id_token,
        state: res?.authorization?.state,
        // 최초 1회만 내려오는 user(이름/이메일)는 참고용으로 같이 보낼 수 있음
        user: res?.user ?? null,
        // nonce, // 우리가 요청 시 생성했던 nonce도 함께 전달(서버 검증용)
      };

      console.log("payload", payload);

      const resp = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/apple/callback`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // 서버가 httpOnly 쿠키를 심어줄 수 있게
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.sns_login_button} onClick={loginWithApple}>
      <img src={apple} alt="apple" />
    </div>
  );
};

export default AppleLogin;