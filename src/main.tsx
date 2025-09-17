
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 사용자 행동 트래킹 함수
const trackEvent = (eventType: string, eventData: Record<string, any>) => {
  const payload = {
    type: eventType,
    timestamp: new Date().toISOString(),
    data: eventData,
  };
  console.log("Tracked Event:", payload);
};

// 전역 이벤트 리스너 등록
const registerGlobalTracking = () => {
  // 클릭 이벤트
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    trackEvent("click", {
      tag: target.tagName,
      id: target.id,
      classes: target.className,
      text: target.innerText,
    });
  });

  // 키보드 이벤트
  document.addEventListener("keydown", (e) => {
    trackEvent("keydown", {
      key: e.key,
      code: e.code,
      altKey: e.altKey,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
    });
  });
};

registerGlobalTracking();

createRoot(document.getElementById("root")!).render(<App />);
