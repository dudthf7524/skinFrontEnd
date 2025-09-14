import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  AlertTriangle,
  Info,
  X,
  CheckCircle2,
} from "lucide-react";

import papule from "../assets/img/구진.jpg";
import Pyoderma from "../assets/img/농피증.png";
import lichenification from "../assets/img/태선화.jpg";
import tumors from "../assets/img/결절.jpg";
import erosive from "../assets/img/미란.jpg";

import style from "../styles/DetialModal.module.css";

interface propsType {
  img: string;
  name: string;
  description: string;
  symptoms: string[];
  severity: string;
  prevalence: string;
  setIsDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DiseaseInfoDetailModal({
  img,
  name,
  description,
  symptoms,
  severity,
  prevalence,
  setIsDetailModal,
}: propsType) {
  function handlerImg(img: string) {
    switch (img) {
      case "1":
        return papule;
      case "2":
        return lichenification;
      case "3":
        return lichenification;
      case "4":
        return Pyoderma;
      case "5":
        return erosive;
      case "6":
        return tumors;
      default:
        return "";
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "높음":
        return <Badge className={style.severityHigh}>위험도: 높음</Badge>;
      case "중간":
        return <Badge className={style.severityMedium}>위험도: 중간</Badge>;
      case "낮음":
        return <Badge className={style.severityLow}>위험도: 낮음</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getPrevalenceBadge = (prevalence: string) => {
    switch (prevalence) {
      case "높음":
        return <Badge className={style.prevalenceHigh}>흔함</Badge>;
      case "중간":
        return <Badge className={style.prevalenceMedium}>보통</Badge>;
      case "낮음":
        return <Badge className={style.prevalenceLow}>드뭄</Badge>;
      default:
        return <Badge variant="outline">{prevalence}</Badge>;
    }
  };

  return (
    <div className={style.overlay}>
      <Card className={style.modalCard}>
        {/* 닫기 버튼 */}
        <button
          onClick={() => setIsDetailModal(false)}
          className={style.closeButton}
        >
          <X className={style.closeIcon} />
        </button>

        <CardHeader>
          <CardTitle className={style.title}>
            {name}
            {getSeverityBadge(severity)}
            {getPrevalenceBadge(prevalence)}
          </CardTitle>
        </CardHeader>

        <CardContent className={style.content}>
          {/* 이미지 */}
          <div className={style.imageWrapper}>
            <img
              src={handlerImg(img)}
              alt={name}
              className={style.image}
            />
          </div>

          {/* 설명 */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>
              <Info className={style.infoIcon} />
              설명
            </h3>
            <p className={style.description}>{description}</p>
          </div>

          {/* 증상 */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>
              <AlertTriangle className={style.alertIcon} />
              주요 증상
            </h3>
            <ul className={style.symptomList}>
              {symptoms.map((symptom, idx) => (
                <li key={idx} className={style.symptomItem}>
                  <CheckCircle2 className={style.symptomIcon} />
                  {symptom}
                </li>
              ))}
            </ul>
          </div>

          {/* 닫기 버튼 */}
          <div className={style.footer}>
            <Button
              variant="outline"
              onClick={() => setIsDetailModal(false)}
              className={style.footerButton}
            >
              다른 질병 확인하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
