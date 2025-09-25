import { X } from "lucide-react";
import { Button } from "./ui/button";

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">이용약관</h2>
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
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제1조 [목적]</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    본 약관은 주식회사 크림오프(이하 "회사")가 제공하는 반려동물 피부질환 분석 웹서비스 "Talktail"(이하 "서비스")의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항, 서비스 이용조건 및 절차 등을 규정함을 목적으로 합니다.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제2조 [용어의 정의]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">"서비스"란 회사가 운영하는 PC, 모바일 웹 및 앱을 통해 반려동물 피부 사진을 업로드하고, AI 기반으로 분석 결과 및 건강 관련 정보를 제공하는 온라인 서비스를 의미한다.</p>
                                    <p className="mb-2">"이용자"란 본 약관에 동의하고 서비스를 이용하는 자로서, 회원(반려동물 보호자) 및 제휴기관·관리자를 포함한다.</p>
                                    <p className="mb-2">"회원"이란 소셜 계정으로 가입하여 서비스를 이용하는 개인을 의미한다.</p>
                                    <p className="mb-2">"관리자/제휴기관"이란 회사와 협력하여 서비스를 활용하거나 제공하는 사업자·기관을 의미한다.</p>
                                    <p className="mb-2">"아이디(ID)"란 이용자 식별 및 서비스 이용을 위해 소셜 계정과 연동되는 이메일 주소를 의미한다.</p>
                                    <p className="mb-2">"분석 데이터"란 이용자가 업로드한 반려동물 피부 이미지, 입력한 반려동물 정보 및 그에 대한 AI 분석 결과를 의미한다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제3조 [약관의 명시 및 개정]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있다.</p>
                                    <p className="mb-2">회사는 약관을 개정하는 경우 개정 내용과 시행일자를 명시하여 서비스 내 공지사항 또는 이메일을 통해 사전 공지한다.</p>
                                    <p className="mb-2">이용자는 개정 약관에 동의하지 않을 경우 적용일 이전까지 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제4조 [서비스 이용계약]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">서비스 이용계약은 이용자가 약관에 동의하고 소셜 계정으로 가입 신청 후 회사가 이를 승인함으로써 체결된다.</p>
                                    <p className="mb-2">이용자는 가입 시 본인의 정확한 정보를 제공해야 하며, 허위 정보를 기재할 경우 서비스 이용이 제한될 수 있다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제5조 [서비스 이용 및 유료 결제]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">기본적인 분석 서비스는 무료로 제공될 수 있으나, 회사의 정책에 따라 일부 고급 기능은 유료로 제공될 수 있다.</p>
                                    <p className="mb-2">유료 서비스 이용 시 이용자는 회사가 정한 결제 방법에 따라 요금을 납부해야 한다.</p>
                                    <p className="mb-2">회사는 운영 및 정책 변경에 따라 유료 서비스의 요금을 조정할 수 있으며, 사전 공지를 통해 안내한다.</p>
                                    <p className="mb-2">이용자가 요금을 납부하지 않을 경우 해당 유료 서비스 이용이 제한될 수 있다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제6조 [서비스의 변경 및 중단]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">회사는 운영상 또는 기술적 필요에 따라 서비스의 일부 또는 전체를 변경하거나 중단할 수 있으며, 사전에 공지한다.</p>
                                    <p className="mb-2">다만, 천재지변, 시스템 장애 등 불가항력적인 사유로 인해 서비스 제공이 어려운 경우 사전 공지 없이 서비스를 중단할 수 있다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제7조 [이용자의 의무]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">이용자는 본 약관 및 회사의 공지사항을 준수해야 하며, 다음과 같은 행위를 금지한다.</p>
                                    <ul className="ml-4 mb-2 list-disc">
                                        <li>타인의 계정을 도용하는 행위</li>
                                        <li>서비스 운영을 방해하는 행위</li>
                                        <li>회사 또는 제3자의 지식재산권을 침해하는 행위</li>
                                        <li>반려동물과 무관한 불법 또는 부적절한 이미지를 업로드하는 행위</li>
                                        <li>기타 불법적이거나 부당한 행위</li>
                                    </ul>
                                    <p className="mb-2">이용자가 본 조를 위반한 경우 회사는 사전 통보 없이 서비스 이용을 제한하거나 계약을 해지할 수 있다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제8조 [개인정보 보호]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">회사는 이용자의 개인정보를 보호하기 위해 관련 법령 및 별도의 개인정보 처리방침을 준수한다.</p>
                                    <p className="mb-2">이용자는 본인의 개인정보가 변경된 경우 즉시 수정해야 하며, 이를 소홀히 하여 발생한 불이익에 대해서는 회사가 책임지지 않는다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제9조 [저작권 및 콘텐츠 권리]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">이용자가 업로드한 이미지 및 입력 정보는 분석 목적에 한하여 사용되며, 회사는 이를 무단으로 영리 활용하지 않는다.</p>
                                    <p className="mb-2">단, 이용자가 별도 동의한 경우에 한하여, 가명 또는 익명 처리된 데이터는 AI 알고리즘 고도화 및 연구 개발 목적으로 활용될 수 있다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제10조 [면책조항]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">회사는 천재지변, 네트워크 장애 등 불가항력적인 사유로 인해 서비스 제공이 어려운 경우 책임을 지지 않는다.</p>
                                    <p className="mb-2">서비스는 참고용 정보 제공 목적이며, 의학적 진단이나 치료를 대신할 수 없다. 이용자는 필요시 반드시 전문 수의사의 진료를 받아야 한다.</p>
                                    <p className="mb-2">이용자가 본 약관을 위반하거나 부정한 방법으로 서비스를 이용하여 발생한 문제에 대해 회사는 책임을 지지 않는다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제11조 [계약해지 및 환불]</h3>
                                <div className="text-gray-700 leading-relaxed">
                                    <p className="mb-2">이용자는 언제든지 서비스 이용 계약을 해지할 수 있으며, 해지 시 서비스 이용이 종료된다.</p>
                                    <p className="mb-2">유료 서비스 이용자가 계약 해지를 원하는 경우, 회사의 환불 정책에 따라 환불이 진행된다.</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">제12조 [준거법 및 관할]</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련하여 발생한 분쟁은 서울중앙지방법원을 전속 관할 법원으로 한다.
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