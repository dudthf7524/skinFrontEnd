// import { useEffect } from "react";
// import { logEvent } from "@/utils/logger";

// export function useExitLogger() {
//     useEffect(() => {
//         const handleUnload = () => {
//             navigator.sendBeacon(
//                 "/api/log",
//                 JSON.stringify({
//                     event: "EXIT_SITE",
//                     ts: Date.now(),
//                     userId: localStorage.getItem("user_id"),
//                 })
//             );
//         };

//         window.addEventListener("beforeunload", handleUnload);
//         document.addEventListener("visibilitychange", () => {
//             if (document.visibilityState === "hidden") handleUnload();
//         });

//         return () => {
//             window.removeEventListener("beforeunload", handleUnload);
//         };
//     }, []);
// }
