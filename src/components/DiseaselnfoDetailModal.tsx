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
import { useLanguage } from './LanguageContext';

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
  const { t } = useLanguage();
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
        return <Badge className={style.severityHigh}>{t('riskLevel')}: {t('high')}</Badge>;
      case "중간":
        return <Badge className={style.severityMedium}>{t('riskLevel')}: {t('medium')}</Badge>;
      case "낮음":
        return <Badge className={style.severityLow}>{t('riskLevel')}: {t('low')}</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getPrevalenceBadge = (prevalence: string) => {
    switch (prevalence) {
      case "높음":
        return <Badge className={style.prevalenceHigh}>{t('common')}</Badge>;
      case "중간":
        return <Badge className={style.prevalenceMedium}>{t('normal')}</Badge>;
      case "낮음":
        return <Badge className={style.prevalenceLow}>{t('rare')}</Badge>;
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
              {t('description')}
            </h3>
            <p className={style.description}>{description}</p>
          </div>

          {/* 증상 */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>
              <AlertTriangle className={style.alertIcon} />
              {t('mainSymptoms')}
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
              {t('checkOtherDiseases')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
