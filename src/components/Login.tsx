import React, { useEffect } from "react";
import style from "../styles/Login.module.css";
import kakaotalk from "../assets/img/kakaotalk.png";
import naver from "../assets/img/naver.jpg";
import google from "../assets/img/Google__G__logo.svg.webp";
import apple from "../assets/img/apple.png";
import cancle_icon from "../assets/img/cancle_icon.png";

interface propsType {
  setLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginPage({ setLoginModal }: propsType) {
  const handlerClose = () => {
    setLoginModal(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    const pathParts = window.location.pathname.split("/");
    const type = pathParts[pathParts.length - 1]; // 예: /login/kakao

    if (code && type) {
      const fetchToken = async () => {
        try {
          const res = await fetch(
            `http://localhost:4000/auth/${type}/callback?code=${code}`
          );
          console.log(res)
          window.location.href = "/login";
        } catch (err) {
          console.error("OAuth 처리 중 오류:", err);
        }
      };
      fetchToken();
    }
  }, []);

  const handleLogin = (type: "kakao" | "google" | "naver" | "apple") => {
    localStorage.clear()
    localStorage.setItem('loginType', type)
    window.location.href = `http://localhost:4000/auth/login?provider=${type}`;
  };

  return (
    <div className={style.container}>
      <div className={style.login_container}>
        {/* 닫기 버튼 */}
        <button className={style.cancle_button} onClick={handlerClose}>
          <img src={cancle_icon} alt="close" />
        </button>

        {/* 제목 */}
        <div className={style.title}>
          <h2>Talktail</h2>
          <h4>반려동물 건강을 지켜보세요!</h4>
        </div>

        {/* SNS 로그인 */}
        <div className={style.sns_login_box}>
          <span>간편 로그인으로 시작하기</span>
          <hr />
          <div className={style.sns_login_container}>
            <div
              className={style.sns_login_button}
              onClick={() => handleLogin("kakao")}
            >
              <img src={kakaotalk} alt="kakao" />
            </div>
            <div
              className={style.sns_login_button}
              onClick={() => handleLogin("naver")}
            >
              <img src={naver} alt="naver" />
            </div>
            <div
              className={style.sns_login_button}
              onClick={() => handleLogin("google")}
            >
              <img src={google} alt="google" />
            </div>
            <div
              className={style.sns_login_button}
              onClick={() => handleLogin("apple")}
            >
              <img src={apple} alt="apple" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
