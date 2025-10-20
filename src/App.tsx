import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SkinAI from "./components/SkinAI";
import { DiseaseInfoPage } from "./components/DiseaseInfoPage";
import { VetFinderPage } from "./components/VetFinderPage";
import { LanguageProvider } from "./components/LanguageContext";
import LoginCallback from "./components/LoginCallback";
import { LoginPage } from "./components/LoginPage";
import Login from "./components/Login";
import { MyRecordsPage } from "./components/MyRecordsPage";
import { AdminListPage } from "./components/admin/AdminListPage";
import { AdminDetailPage } from "./components/admin/AdminDetailPage";
import { TokenPurchasePage } from "./components/TokenPurchasePage";
import { TokenBalancePage } from "./components/TokenBalancePage";
import DebugPage from "./components/DebugPage";
import { MyPage } from "./components/mypage/MyPage";
import { RecordDetail } from "./components/mypage/RecordDetail";
import PurchaseSuccess from "./components/PurchaseSuccess";
import AdminPage from "./components/admin/AdminPage";
import CouponRedeemPage from "./components/mypage/CouponRedeemPage";
// import { usePageLogger } from "./hooks/usePageLogger";
// import { useExitLogger } from "./hooks/useExitLogger";

export default function App() {
  // usePageLogger();
  // useExitLogger();
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skinai" element={<SkinAI />} />
          <Route path="/info" element={< DiseaseInfoPage />} />
          <Route path="/search" element={< VetFinderPage />} />
          <Route path="/login" element={<LoginCallback />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/record" element={<MyRecordsPage />} />
          <Route path="/token" element={<TokenPurchasePage />} />
          <Route path="/token/balance" element={<TokenBalancePage />} />
          <Route path="/admin/list" element={<AdminListPage />} />
          <Route path="/admin/detail/:id" element={<AdminDetailPage />} />
          <Route path="/admin/debug" element={<DebugPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/record/detail/:id" element={<RecordDetail />}/>
          <Route path="/token/purchase/success" element={<PurchaseSuccess/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/coupon" element={<CouponRedeemPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}