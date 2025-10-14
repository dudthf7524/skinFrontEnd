import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

export default function PurchaseSuccess() {
    const { t } = useLanguage();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        setTimeout(() => {
            window.location.href = "/skinai"
        }, 2000)
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {show && (
                <div className="text-center p-5 rounded-lg bg-white shadow-lg animate-fadeIn">
                    <svg
                        width="100"
                        height="100"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto"
                    >
                        <path
                            d="M5 13l4 4L19 7"
                            stroke="#4CAF50"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="animate-drawCheck"
                        />
                    </svg>
                    <h2 className="text-green-500 mt-2 text-2xl font-bold animate-slideUp">{t('purchaseSuccess_title')}</h2>
                    <p className="text-gray-700 mt-2 animate-slideUp delay-200">{t('purchaseSuccess_message')}</p>
                </div>
            )}
            <style>{`
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }

                .animate-drawCheck {
                    stroke-dasharray: 100;
                    stroke-dashoffset: 100;
                    animation: drawCheck 0.5s ease-out forwards 0.5s;
                }
                @keyframes drawCheck {
                    to { stroke-dashoffset: 0; }
                }

                .animate-slideUp {
                    animation: slideUp 0.5s ease-out forwards;
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .delay-200 {
                    animation-delay: 0.2s;
                }
            `}</style>
        </div>
    );
}