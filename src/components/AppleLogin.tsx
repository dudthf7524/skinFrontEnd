import React, { useEffect } from 'react';
import style from "../styles/Login.module.css";
import apple from "../assets/img/apple.png";

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

    console.log('sign in with apple');

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
      console.log(res);
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