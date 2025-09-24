import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SkinAI from "./components/SkinAI";
import { DiseaseInfoPage } from "./components/DiseaseInfoPage";
import { VetFinderPage } from "./components/VetFinderPage";
import { LanguageProvider } from "./components/LanguageContext";
import LoginCallback from "./components/LoginCallback";
import LoginPage from "./components/Login";
import { MyRecordsPage } from "./components/MyRecordsPage";
import { AdminListPage } from "./components/AdminListPage";
import { AdminDetailPage } from "./components/AdminDetailPage";
import { TokenPurchasePage } from "./components/TokenPurchasePage";
import { TokenBalancePage } from "./components/TokenBalancePage";

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skinai" element={<SkinAI />} />
          <Route path="/info" element={< DiseaseInfoPage />} />
          <Route path="/search" element={< VetFinderPage />} />
          <Route path="/login/page" element={<LoginPage />} />
          <Route path="/login" element={<LoginCallback/>} />
          {/* <Route path="/signin" element={<LoginPage />} /> */}
          <Route path="/record" element={<MyRecordsPage />} />
          <Route path="/admin/list" element={<AdminListPage />} />
          <Route path="/admin/detail/:id" element={<AdminDetailPage />} />
          <Route path="/token/purchase" element={<TokenPurchasePage/>} />
          <Route path="/token/balance" element={<TokenBalancePage/>} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}