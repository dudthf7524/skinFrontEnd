import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SkinAI from "./components/SkinAI";
import { DiseaseInfoPage } from "./components/DiseaseInfoPage";
import { VetFinderPage } from "./components/VetFinderPage";
import { LanguageProvider } from "./components/LanguageContext";
import LoginCallback from "./components/LoginCallback";
import { LoginPage } from "./components/LoginPage";
import { MyRecordsPage } from "./components/MyRecordsPage";

export default function App() {
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
        </Routes>
      </Router>
    </LanguageProvider>
  );
}