import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SkinAI from "./components/SkinAI";
import { DiseaseInfoPage } from "./components/DiseaseInfoPage";
import { VetFinderPage } from "./components/VetFinderPage";
import { LanguageProvider } from "./components/LanguageContext";

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skinai" element={<SkinAI />} />
          <Route path="/info" element={< DiseaseInfoPage />} />
          <Route path="/search" element={< VetFinderPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}