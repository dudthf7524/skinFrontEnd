import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage, Language } from "./LanguageContext";

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const privacyContent: Record<Language, { title: string; effectiveDate: string; sections: Array<{ title: string; content: string | string[] }> }> = {
    ko: {
        title: "개인정보 처리방침",
        effectiveDate: "본 방침은 2025년 9월 25일부터 시행됩니다.",
        sections: [
            {
                title: "제1조 [개인정보의 처리목적]",
                content: [
                    "Talktail Care(이하 '회사')는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.",
                    "• 회원가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리",
                    "• 서비스 제공: AI 기반 반려동물 피부 진단 서비스 제공, 콘텐츠 제공, 맞춤서비스 제공",
                    "• 마케팅 및 광고: 이벤트 및 광고성 정보 제공 및 참여기회 제공"
                ]
            },
            {
                title: "제2조 [개인정보의 처리 및 보유기간]",
                content: [
                    "회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.",
                    "각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:",
                    "• 회원가입 및 관리: 회원 탈퇴 시까지",
                    "• 서비스 제공: 서비스 이용 종료 시까지",
                    "• 진단 기록: 5년 (의료법에 따른 기록 보존)",
                    "• 마케팅 정보 수신: 동의 철회 시까지"
                ]
            },
            {
                title: "제3조 [처리하는 개인정보 항목]",
                content: [
                    "회사는 다음의 개인정보 항목을 처리하고 있습니다:",
                    "",
                    "▶ 필수항목",
                    "• 이름, 이메일주소, 전화번호",
                    "• 반려동물 정보 (이름, 종류, 나이, 품종)",
                    "• 진단 관련 정보 (증상, 사진)",
                    "",
                    "▶ 선택항목",
                    "• 프로필 사진",
                    "• 추가 연락처",
                    "• 마케팅 수신 동의"
                ]
            },
            {
                title: "제4조 [개인정보의 제3자 제공]",
                content: [
                    "회사는 정보주체의 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.",
                    "",
                    "회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다:",
                    "• 제공받는 자: 제휴 동물병원",
                    "• 제공목적: 진료 예약 및 상담 서비스 제공",
                    "• 제공항목: 반려동물 정보, 진단 결과 (이용자 동의 시에만)",
                    "• 보유 및 이용기간: 서비스 제공 완료 시까지"
                ]
            },
            {
                title: "제5조 [개인정보처리의 위탁]",
                content: [
                    "회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:",
                    "",
                    "▶ 위탁받는 자: 클라우드 서비스 제공업체",
                    "• 위탁업무: 서버 관리 및 데이터 저장",
                    "• 위탁기간: 서비스 제공 기간",
                    "",
                    "▶ 위탁받는 자: 결제대행업체",
                    "• 위탁업무: 결제 처리 및 정산",
                    "• 위탁기간: 결제 완료 후 5년"
                ]
            },
            {
                title: "제6조 [정보주체의 권리·의무 및 행사방법]",
                content: [
                    "정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:",
                    "",
                    "• 개인정보 처리정지 요구",
                    "• 개인정보 열람요구",
                    "• 개인정보 정정·삭제요구",
                    "• 개인정보 처리정지 요구",
                    "",
                    "위의 권리 행사는 회사에 대해 개인정보보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다."
                ]
            },
            {
                title: "제7조 [개인정보의 파기]",
                content: [
                    "회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.",
                    "",
                    "파기절차 및 방법은 다음과 같습니다:",
                    "• 파기절차: 불필요한 개인정보 및 개인정보파일은 개인정보보호책임자의 승인하에 파기합니다.",
                    "• 파기방법: 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 로우레벨포멧(Low Level Format) 등의 방법을 이용하여 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다."
                ]
            },
            {
                title: "제8조 [개인정보 보호책임자]",
                content: [
                    "회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:",
                    "",
                    "▶ 개인정보 보호책임자",
                    "• 성명: 개인정보보호담당자",
                    "• 직책: 개인정보보호팀장",
                    "• 연락처: privacy@talktailcare.com",
                    "",
                    "정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다."
                ]
            },
            {
                title: "제9조 [개인정보의 안전성 확보조치]",
                content: [
                    "회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:",
                    "",
                    "• 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등",
                    "• 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치 등",
                    "• 물리적 조치: 전산실, 자료보관실 등의 접근통제"
                ]
            },
            {
                title: "제10조 [권익침해 구제방법]",
                content: [
                    "정보주체는 아래의 기관에 대해 개인정보 침해신고를 할 수 있습니다. 아래의 기관은 재단법인 대한민국과는 별개의 기관으로서, 회사의 자체적인 개인정보 불만처리, 피해구제 결과에 만족하지 못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다.",
                    "",
                    "▶ 개인정보 침해신고센터 (한국인터넷진흥원 운영)",
                    "• 소관업무: 개인정보 침해신고 접수 및 처리, 피해구제 신청 등",
                    "• 홈페이지: privacy.go.kr",
                    "• 전화: (국번없이) 182",
                    "",
                    "▶ 개인정보 분쟁조정위원회",
                    "• 소관업무: 개인정보 분쟁조정신청, 집단분쟁조정 등",
                    "• 홈페이지: privacy.go.kr",
                    "• 전화: (국번없이) 1833-6972"
                ]
            }
        ]
    },
    en: {
        title: "Privacy Policy",
        effectiveDate: "This policy is effective from September 25, 2025.",
        sections: [
            {
                title: "Article 1 [Purpose of Personal Information Processing]",
                content: [
                    "Talktail Care (hereinafter referred to as 'Company') processes personal information for the following purposes. The personal information being processed will not be used for purposes other than the following, and if the purpose of use changes, necessary measures such as obtaining separate consent will be implemented in accordance with Article 18 of the Personal Information Protection Act.",
                    "• Member registration and management: Confirming membership registration intent, identifying and authenticating individuals for membership services, maintaining and managing membership qualifications",
                    "• Service provision: Providing AI-based pet skin diagnosis services, content provision, customized service provision",
                    "• Marketing and advertising: Providing event and advertising information and participation opportunities"
                ]
            },
            {
                title: "Article 2 [Processing and Retention Period of Personal Information]",
                content: [
                    "The Company processes and retains personal information within the period of retention and use of personal information according to laws or within the period of retention and use of personal information consented to when collecting personal information from data subjects.",
                    "The processing and retention periods for each personal information are as follows:",
                    "• Member registration and management: Until membership withdrawal",
                    "• Service provision: Until service use termination",
                    "• Diagnosis records: 5 years (record preservation according to Medical Law)",
                    "• Marketing information reception: Until consent withdrawal"
                ]
            },
            {
                title: "Article 3 [Items of Personal Information Processed]",
                content: [
                    "The Company processes the following personal information items:",
                    "",
                    "▶ Required Items",
                    "• Name, email address, phone number",
                    "• Pet information (name, type, age, breed)",
                    "• Diagnosis-related information (symptoms, photos)",
                    "",
                    "▶ Optional Items",
                    "• Profile photo",
                    "• Additional contact information",
                    "• Marketing reception consent"
                ]
            },
            {
                title: "Article 4 [Provision of Personal Information to Third Parties]",
                content: [
                    "The Company processes personal information of data subjects only within the scope specified in Article 1 (Purpose of Personal Information Processing), and provides personal information to third parties only in cases corresponding to Article 17 of the Personal Information Protection Act, such as consent of data subjects and special provisions of laws.",
                    "",
                    "The Company provides personal information to third parties as follows:",
                    "• Recipients: Partner veterinary hospitals",
                    "• Purpose: Providing appointment and consultation services",
                    "• Items: Pet information, diagnosis results (only with user consent)",
                    "• Retention and use period: Until service provision completion"
                ]
            },
            {
                title: "Article 5 [Consignment of Personal Information Processing]",
                content: [
                    "The Company consigns personal information processing tasks as follows for smooth personal information processing:",
                    "",
                    "▶ Consignee: Cloud service provider",
                    "• Consigned work: Server management and data storage",
                    "• Consignment period: Service provision period",
                    "",
                    "▶ Consignee: Payment agency",
                    "• Consigned work: Payment processing and settlement",
                    "• Consignment period: 5 years after payment completion"
                ]
            },
            {
                title: "Article 6 [Rights and Obligations of Data Subjects and Methods of Exercise]",
                content: [
                    "Data subjects may exercise the following personal information protection-related rights against the Company at any time:",
                    "",
                    "• Request to stop personal information processing",
                    "• Request to view personal information",
                    "• Request to correct or delete personal information",
                    "• Request to stop personal information processing",
                    "",
                    "The exercise of the above rights can be made to the Company in writing, email, facsimile transmission (FAX), etc. according to Article 41, Paragraph 1 of the Enforcement Decree of the Personal Information Protection Act, and the Company will take action without delay."
                ]
            },
            {
                title: "Article 7 [Destruction of Personal Information]",
                content: [
                    "The Company destroys the relevant personal information without delay when personal information becomes unnecessary, such as when the retention period expires or the processing purpose is achieved.",
                    "",
                    "The destruction procedures and methods are as follows:",
                    "• Destruction procedure: Unnecessary personal information and personal information files are destroyed under the approval of the personal information protection officer.",
                    "• Destruction method: Personal information recorded and stored in electronic file format is destroyed using methods such as low-level format so that records cannot be reproduced, and personal information recorded and stored in paper documents is destroyed by shredding with a shredder or incineration."
                ]
            },
            {
                title: "Article 8 [Personal Information Protection Officer]",
                content: [
                    "The Company designates a personal information protection officer as follows to take overall responsibility for personal information processing and to handle complaints and remedy damages related to personal information processing:",
                    "",
                    "▶ Personal Information Protection Officer",
                    "• Name: Privacy Protection Manager",
                    "• Position: Privacy Protection Team Leader",
                    "• Contact: privacy@talktailcare.com",
                    "",
                    "Data subjects can contact the personal information protection officer and department for all personal information protection-related inquiries, complaint handling, damage relief, etc. that occur while using the Company's services."
                ]
            },
            {
                title: "Article 9 [Security Measures for Personal Information]",
                content: [
                    "The Company takes the following measures to ensure the security of personal information:",
                    "",
                    "• Administrative measures: Establishment and implementation of internal management plans, regular employee training, etc.",
                    "• Technical measures: Access authority management of personal information processing systems, installation of access control systems, encryption of unique identification information, installation of security programs, etc.",
                    "• Physical measures: Access control of computer rooms, data storage rooms, etc."
                ]
            },
            {
                title: "Article 10 [Remedy for Rights Infringement]",
                content: [
                    "Data subjects can report personal information infringement to the following institutions. The following institutions are separate from the Republic of Korea Foundation, so if you are not satisfied with the Company's own personal information complaint handling and damage relief results or need more detailed help, please contact them.",
                    "",
                    "▶ Personal Information Protection Center (operated by Korea Internet & Security Agency)",
                    "• Duties: Personal information infringement report reception and processing, damage relief application, etc.",
                    "• Website: privacy.go.kr",
                    "• Phone: 182 (without area code)",
                    "",
                    "▶ Personal Information Dispute Mediation Committee",
                    "• Duties: Personal information dispute mediation application, collective dispute mediation, etc.",
                    "• Website: privacy.go.kr",
                    "• Phone: 1833-6972 (without area code)"
                ]
            }
        ]
    },
    ja: {
        title: "プライバシーポリシー",
        effectiveDate: "本方針は2025年9月25日から施行されます。",
        sections: [
            {
                title: "第1条 [個人情報の処理目的]",
                content: [
                    "Talktail Care（以下「当社」）は以下の目的のために個人情報を処理します。処理している個人情報は以下の目的以外の用途には利用されず、利用目的が変更される場合には個人情報保護法第18条に従って別途の同意を得るなど必要な措置を履行予定です。",
                    "• 会員登録及び管理：会員登録意思確認、会員制サービス提供に伴う本人識別・認証、会員資格維持・管理",
                    "• サービス提供：AIベースのペット皮膚診断サービス提供、コンテンツ提供、カスタマイズサービス提供",
                    "• マーケティング及び広告：イベント及び広告性情報提供及び参加機会提供"
                ]
            },
            {
                title: "第2条 [個人情報の処理及び保有期間]",
                content: [
                    "当社は法令による個人情報保有・利用期間または情報主体から個人情報を収集する際に同意を得た個人情報保有・利用期間内で個人情報を処理・保有します。",
                    "各個人情報処理及び保有期間は以下の通りです：",
                    "• 会員登録及び管理：会員脱退時まで",
                    "• サービス提供：サービス利用終了時まで",
                    "• 診断記録：5年（医療法による記録保存）",
                    "• マーケティング情報受信：同意撤回時まで"
                ]
            },
            {
                title: "第3条 [処理する個人情報項目]",
                content: [
                    "当社は以下の個人情報項目を処理しています：",
                    "",
                    "▶ 必須項目",
                    "• 氏名、メールアドレス、電話番号",
                    "• ペット情報（名前、種類、年齢、品種）",
                    "• 診断関連情報（症状、写真）",
                    "",
                    "▶ 選択項目",
                    "• プロフィール写真",
                    "• 追加連絡先",
                    "• マーケティング受信同意"
                ]
            },
            {
                title: "第4条 [個人情報の第三者提供]",
                content: [
                    "当社は情報主体の個人情報を第1条（個人情報の処理目的）で明示した範囲内でのみ処理し、情報主体の同意、法律の特別な規定など個人情報保護法第17条に該当する場合にのみ個人情報を第三者に提供します。",
                    "",
                    "当社は以下のように個人情報を第三者に提供しています：",
                    "• 提供先：提携動物病院",
                    "• 提供目的：診療予約及び相談サービス提供",
                    "• 提供項目：ペット情報、診断結果（利用者同意時のみ）",
                    "• 保有及び利用期間：サービス提供完了時まで"
                ]
            },
            {
                title: "第5条 [個人情報処理の委託]",
                content: [
                    "当社は円滑な個人情報業務処理のために以下のように個人情報処理業務を委託しています：",
                    "",
                    "▶ 委託先：クラウドサービス提供業者",
                    "• 委託業務：サーバー管理及びデータ保存",
                    "• 委託期間：サービス提供期間",
                    "",
                    "▶ 委託先：決済代行業者",
                    "• 委託業務：決済処理及び精算",
                    "• 委託期間：決済完了後5年"
                ]
            },
            {
                title: "第6条 [情報主体の権利・義務及び行使方法]",
                content: [
                    "情報主体は当社に対していつでも以下の個人情報保護関連権利を行使できます：",
                    "",
                    "• 個人情報処理停止要求",
                    "• 個人情報閲覧要求",
                    "• 個人情報訂正・削除要求",
                    "• 個人情報処理停止要求",
                    "",
                    "上記権利行使は当社に対して個人情報保護法施行令第41条第1項に従って書面、電子メール、ファクシミリ送信（FAX）などを通じて行うことができ、当社はこれに対して遅滞なく措置いたします。"
                ]
            },
            {
                title: "第7条 [個人情報の破棄]",
                content: [
                    "当社は個人情報保有期間の経過、処理目的達成など個人情報が不要になった時には遅滞なく該当個人情報を破棄します。",
                    "",
                    "破棄手続き及び方法は以下の通りです：",
                    "• 破棄手続き：不要な個人情報及び個人情報ファイルは個人情報保護責任者の承認下で破棄します。",
                    "• 破棄方法：電子的ファイル形態で記録・保存された個人情報は記録を再生できないようにローレベルフォーマット（Low Level Format）などの方法を利用して破棄し、紙文書に記録・保存された個人情報は破砕機で破砕するか焼却して破棄します。"
                ]
            },
            {
                title: "第8条 [個人情報保護責任者]",
                content: [
                    "当社は個人情報処理に関する業務を総括して責任を負い、個人情報処理と関連した情報主体の苦情処理及び被害救済のために以下のように個人情報保護責任者を指定しています：",
                    "",
                    "▶ 個人情報保護責任者",
                    "• 氏名：個人情報保護担当者",
                    "• 職責：個人情報保護チーム長",
                    "• 連絡先：privacy@talktailcare.com",
                    "",
                    "情報主体の皆様は当社のサービスを利用されながら発生したすべての個人情報保護関連お問い合わせ、苦情処理、被害救済などに関する事項を個人情報保護責任者及び担当部署にお問い合わせいただけます。"
                ]
            },
            {
                title: "第9条 [個人情報の安全性確保措置]",
                content: [
                    "当社は個人情報の安全性確保のために以下のような措置を取っています：",
                    "",
                    "• 管理的措置：内部管理計画樹立・施行、定期的職員教育など",
                    "• 技術的措置：個人情報処理システムなどのアクセス権限管理、アクセス制御システム設置、固有識別情報などの暗号化、セキュリティプログラム設置など",
                    "• 物理的措置：電算室、資料保管室などのアクセス制御"
                ]
            },
            {
                title: "第10条 [権益侵害救済方法]",
                content: [
                    "情報主体は以下の機関に対して個人情報侵害申告をすることができます。以下の機関は財団法人大韓民国とは別個の機関として、当社の自体的な個人情報苦情処理、被害救済結果に満足されないか、より詳細な助けが必要でしたらお問い合わせください。",
                    "",
                    "▶ 個人情報侵害申告センター（韓国インターネット振興院運営）",
                    "• 所管業務：個人情報侵害申告受付及び処理、被害救済申請など",
                    "• ホームページ：privacy.go.kr",
                    "• 電話：（局番なし）182",
                    "",
                    "▶ 個人情報紛争調停委員会",
                    "• 所管業務：個人情報紛争調停申請、集団紛争調停など",
                    "• ホームページ：privacy.go.kr",
                    "• 電話：（局番なし）1833-6972"
                ]
            }
        ]
    },
    zh: {
        title: "隐私政策",
        effectiveDate: "本政策自2025年9月25日起施行。",
        sections: [
            {
                title: "第1条 [个人信息的处理目的]",
                content: [
                    "Talktail Care（以下简称\"公司\"）为以下目的处理个人信息。所处理的个人信息不会用于以下目的以外的用途，如使用目的发生变更，将根据个人信息保护法第18条获得单独同意等必要措施。",
                    "• 会员注册及管理：确认会员注册意向、会员制服务提供中的本人识别·认证、会员资格维持·管理",
                    "• 服务提供：提供基于AI的宠物皮肤诊断服务、内容提供、定制服务提供",
                    "• 营销及广告：提供活动及广告性信息及参与机会提供"
                ]
            },
            {
                title: "第2条 [个人信息的处理及保有期间]",
                content: [
                    "公司在法令规定的个人信息保有·使用期间或从信息主体收集个人信息时同意的个人信息保有·使用期间内处理·保有个人信息。",
                    "各个人信息处理及保有期间如下：",
                    "• 会员注册及管理：直到会员退出",
                    "• 服务提供：直到服务使用结束",
                    "• 诊断记录：5年（根据医疗法的记录保存）",
                    "• 营销信息接收：直到同意撤回"
                ]
            },
            {
                title: "第3条 [处理的个人信息项目]",
                content: [
                    "公司处理以下个人信息项目：",
                    "",
                    "▶ 必需项目",
                    "• 姓名、邮箱地址、电话号码",
                    "• 宠物信息（姓名、种类、年龄、品种）",
                    "• 诊断相关信息（症状、照片）",
                    "",
                    "▶ 选择项目",
                    "• 个人资料照片",
                    "• 附加联系方式",
                    "• 营销接收同意"
                ]
            },
            {
                title: "第4条 [个人信息的第三方提供]",
                content: [
                    "公司仅在第1条（个人信息的处理目的）明示的范围内处理信息主体的个人信息，仅在符合个人信息保护法第17条的情况下（如信息主体同意、法律特别规定等）向第三方提供个人信息。",
                    "",
                    "公司按如下方式向第三方提供个人信息：",
                    "• 接收方：合作动物医院",
                    "• 提供目的：提供诊疗预约及咨询服务",
                    "• 提供项目：宠物信息、诊断结果（仅在用户同意时）",
                    "• 保有及使用期间：直到服务提供完成"
                ]
            },
            {
                title: "第5条 [个人信息处理的委托]",
                content: [
                    "公司为顺利处理个人信息业务，按如下方式委托个人信息处理业务：",
                    "",
                    "▶ 受托方：云服务提供商",
                    "• 委托业务：服务器管理及数据存储",
                    "• 委托期间：服务提供期间",
                    "",
                    "▶ 受托方：支付代理商",
                    "• 委托业务：支付处理及结算",
                    "• 委托期间：支付完成后5年"
                ]
            },
            {
                title: "第6条 [信息主体的权利·义务及行使方法]",
                content: [
                    "信息主体可随时对公司行使以下个人信息保护相关权利：",
                    "",
                    "• 个人信息处理停止要求",
                    "• 个人信息查阅要求",
                    "• 个人信息更正·删除要求",
                    "• 个人信息处理停止要求",
                    "",
                    "上述权利行使可根据个人信息保护法施行令第41条第1项，通过书面、电子邮件、传真（FAX）等方式向公司提出，公司将立即采取措施。"
                ]
            },
            {
                title: "第7条 [个人信息的销毁]",
                content: [
                    "公司在个人信息保有期间届满、处理目的达成等个人信息变为不必要时，将立即销毁相应个人信息。",
                    "",
                    "销毁程序及方法如下：",
                    "• 销毁程序：不必要的个人信息及个人信息文件在个人信息保护负责人批准下销毁。",
                    "• 销毁方法：以电子文件形式记录·保存的个人信息使用低级格式化（Low Level Format）等方法销毁，使记录无法再现，纸质文档记录·保存的个人信息通过碎纸机粉碎或焚烧销毁。"
                ]
            },
            {
                title: "第8条 [个人信息保护负责人]",
                content: [
                    "公司指定个人信息保护负责人，负责个人信息处理相关业务的总体责任，并为处理与个人信息处理相关的信息主体投诉及损害救济，指定如下个人信息保护负责人：",
                    "",
                    "▶ 个人信息保护负责人",
                    "• 姓名：个人信息保护负责人",
                    "• 职务：个人信息保护团队长",
                    "• 联系方式：privacy@talktailcare.com",
                    "",
                    "信息主体在使用公司服务过程中发生的所有个人信息保护相关咨询、投诉处理、损害救济等事项，可向个人信息保护负责人及负责部门咨询。"
                ]
            },
            {
                title: "第9条 [个人信息的安全性确保措施]",
                content: [
                    "公司为确保个人信息安全性采取以下措施：",
                    "",
                    "• 管理措施：制定·实施内部管理计划、定期员工教育等",
                    "• 技术措施：个人信息处理系统等的访问权限管理、安装访问控制系统、唯一识别信息等的加密、安装安全程序等",
                    "• 物理措施：机房、资料保管室等的访问控制"
                ]
            },
            {
                title: "第10条 [权益侵害救济方法]",
                content: [
                    "信息主体可向以下机构举报个人信息侵害。以下机构是与大韩民国财团法人不同的独立机构，如果对公司自身的个人信息投诉处理、损害救济结果不满意或需要更详细帮助，请联系咨询。",
                    "",
                    "▶ 个人信息侵害举报中心（韩国互联网振兴院运营）",
                    "• 主管业务：个人信息侵害举报受理及处理、损害救济申请等",
                    "• 网站：privacy.go.kr",
                    "• 电话：（无区号）182",
                    "",
                    "▶ 个人信息纠纷调解委员会",
                    "• 主管业务：个人信息纠纷调解申请、集体纠纷调解等",
                    "• 网站：privacy.go.kr",
                    "• 电话：（无区号）1833-6972"
                ]
            }
        ]
    }
};

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
    const { language, t } = useLanguage();
    const privacy = privacyContent[language];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">{privacy.title}</h2>
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
                            {privacy.sections.map((section, index) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h3>
                                    {Array.isArray(section.content) ? (
                                        <div className="text-gray-700 leading-relaxed">
                                            {section.content.map((item, itemIndex) => (
                                                <p key={itemIndex} className="mb-2">{item}</p>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-700 leading-relaxed">{section.content}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>
                                    {language === 'ko' ? '시행일' :
                                     language === 'en' ? 'Effective Date' :
                                     language === 'ja' ? '施行日' : '施行日期'}
                                </strong> {privacy.effectiveDate}
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
                            {t('confirm')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}