// import { useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import { logEvent } from "@/utils/logger";

// export function usePageLogger() {
//     const location = useLocation();
//     const prevPath = useRef<string | null>(null);

//     useEffect(() => {
//         const from = prevPath.current;
//         const to = location.pathname;

//         logEvent("PAGE_VIEW", { from, to });
//         prevPath.current = to;
//     }, [location]);
// }
