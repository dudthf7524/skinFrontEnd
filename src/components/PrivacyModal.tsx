import { X } from "lucide-react";
import { Button } from "./ui/button";

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">개인정보 처리방침</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
                    <div className="prose prose-gray max-w-none">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제1조 [총칙]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">주식회사 크림오프(이하 "회사")는 「개인정보 보호법」, 「전자상거래 등에서의 소비자보호에 관한 법률」, 「통신비밀보호법」 등 관련 법령을 준수하며, 이용자의 개인정보 보호를 최우선으로 합니다.</p>
                                    <p>본 방침은 회사가 제공하는 <strong>반려동물 피부질환 분석 웹서비스(이하 "서비스")</strong>와 관련하여 개인정보의 수집, 이용, 보관 및 파기 절차를 명확히 규정하기 위한 것입니다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제2조 [수집하는 개인정보의 항목 및 수집 방법]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-3">회사는 서비스 이용 과정에서 아래의 개인정보를 수집합니다.</p>

                                    <div className="mb-4">
                                        <p className="font-semibold mb-1">1) 회원 가입 및 관리</p>
                                        <p className="mb-1"><strong>수집 항목</strong> : 소셜 계정(구글, 카카오, 네이버)으로부터 제공되는 이름, 이메일, 프로필 이미지, 연락처</p>
                                        <p className="mb-1"><strong>수집 방법</strong> : 소셜 로그인 및 회원가입 절차에서 자동 연동</p>
                                        <p className="mb-1"><strong>이용 목적</strong> : 회원 식별, 본인 인증, 서비스 제공, 고객 응대</p>
                                        <p><strong>보유 기간</strong> : 회원 탈퇴 시 또는 최종 이용일로부터 5년이 경과한 시점까지</p>
                                    </div>

                                    <div className="mb-4">
                                        <p className="font-semibold mb-1">2) 반려동물 피부질환 분석 서비스</p>
                                        <p className="mb-1"><strong>수집 항목</strong> : 반려동물 피부 이미지(사진/영상), 반려동물 정보(이름, 품종, 성별, 생년월일, 증상 설명 등), 서비스 이용 기록(분석 요청, 접속 로그, 결과 조회 등)</p>
                                        <p className="mb-1"><strong>수집 방법</strong> : 웹페이지 내 업로드 및 입력을 통해 수집</p>
                                        <p className="mb-1"><strong>이용 목적</strong> : 분석 결과 제공, 고객 지원, 서비스 품질 개선, 부정 이용 방지</p>
                                        <p className="mb-1"><strong>보유 기간</strong> : 분석 완료 후 3년간 보관(분쟁 대응 목적), 이후 즉시 파기</p>
                                        <p><strong>선택 동의 시</strong> : 가명·익명 처리된 데이터를 AI 알고리즘 고도화 및 연구 개발 목적으로 최대 5년간 추가 활용 가능</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold mb-1">3) 제휴 및 관리자(사업자) 등록</p>
                                        <p className="mb-1"><strong>수집 항목</strong> : 이름, 연락처, 이메일, 기관명·매장명 등</p>
                                        <p className="mb-1"><strong>수집 방법</strong> : 제휴 신청서, 전화/이메일 문의, 가입 신청</p>
                                        <p className="mb-1"><strong>이용 목적</strong> : 신규 제휴·협력 검토, 서비스 제공, 민원 처리, 마케팅 활용</p>
                                        <p><strong>보유 기간</strong> : 동의 철회 또는 회원 탈퇴 시까지</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제3조 [개인정보의 보유 및 파기]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">회사는 관련 법령 및 본 방침에서 정한 기간 동안 개인정보를 보유하며, 목적 달성 후 지체 없이 안전한 방법으로 파기합니다.</p>
                                    <p>법령에 따른 주요 보유 기간은 다음과 같습니다.</p>
                                    <ul className="ml-4 mt-2 list-disc">
                                        <li>서비스 접속 기록(IP 포함): 3개월 (통신비밀보호법)</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제8조 [기술적·관리적 보호조치]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2"><strong>기술적 조치</strong> : 데이터 암호화, 전송구간 보안(HTTPS), 접근 통제, 방화벽, 로그 모니터링, 백업 및 재해복구 시스템</p>
                                    <p><strong>관리적 조치</strong> : 최소 권한 원칙, 정기적 보안 교육, 접근 권한 점검, 수탁사 관리·감독</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제9조 [14세 미만 아동의 개인정보]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">본 서비스는 원칙적으로 만 14세 미만 아동의 이용을 제한합니다.</p>
                                    <p>부득이하게 법정대리인의 동의가 필요한 경우, 관련 법령에 따른 절차를 거쳐 개인정보를 수집·이용합니다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제10조 [국외 이전 고지]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">서비스 운영을 위해 국외 인프라 또는 도구를 사용할 경우, 이전 국가, 항목, 목적, 보유 기간 등을 사전 고지하고 동의를 받습니다.</p>
                                    <p>현재 국외 이전이 발생하는 경우, 웹페이지 공지 및 본 방침 부칙을 통해 상세히 안내합니다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제11조 [개인정보 처리방침의 변경]</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    회사는 본 방침의 변경 시 시행일 7일 전(이용자 권리에 중대한 영향을 미치는 경우 30일 전) 웹페이지 공지 및 이메일 등을 통해 사전 안내합니다.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>시행일</strong> 본 방침은 2025년 9월 25일부터 시행됩니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-end">
                        <Button
                            onClick={onClose}
                            className="bg-[var(--talktail-orange)] hover:bg-[var(--talktail-orange-dark)] text-white"
                        >
                            확인
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}