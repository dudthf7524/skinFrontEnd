import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage, Language } from "./LanguageContext";

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const termsContent: Record<Language, { title: string; effectiveDate: string; sections: Array<{ title: string; content: string | string[] }> }> = {
    ko: {
        title: "이용약관",
        effectiveDate: "본 방침은 2025년 9월 25일부터 시행됩니다.",
        sections: [
            {
                title: "제1조 [목적]",
                content: "본 약관은 주식회사 크림오프(이하 \"회사\")가 제공하는 반려동물 피부질환 분석 웹서비스 \"Talktail\"(이하 \"서비스\")의 이용과 관련하여 회사와 이용자의 권리, 의무 및 책임사항, 서비스 이용조건 및 절차 등을 규정함을 목적으로 합니다."
            },
            {
                title: "제2조 [용어의 정의]",
                content: [
                    "\"서비스\"란 회사가 운영하는 PC, 모바일 웹 및 앱을 통해 반려동물 피부 사진을 업로드하고, AI 기반으로 분석 결과 및 건강 관련 정보를 제공하는 온라인 서비스를 의미한다.",
                    "\"이용자\"란 본 약관에 동의하고 서비스를 이용하는 자로서, 회원(반려동물 보호자) 및 제휴기관·관리자를 포함한다.",
                    "\"회원\"이란 소셜 계정으로 가입하여 서비스를 이용하는 개인을 의미한다.",
                    "\"관리자/제휴기관\"이란 회사와 협력하여 서비스를 활용하거나 제공하는 사업자·기관을 의미한다.",
                    "\"아이디(ID)\"란 이용자 식별 및 서비스 이용을 위해 소셜 계정과 연동되는 이메일 주소를 의미한다.",
                    "\"분석 데이터\"란 이용자가 업로드한 반려동물 피부 이미지, 입력한 반려동물 정보 및 그에 대한 AI 분석 결과를 의미한다."
                ]
            },
            {
                title: "제3조 [약관의 명시 및 개정]",
                content: [
                    "회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있다.",
                    "회사는 약관을 개정하는 경우 개정 내용과 시행일자를 명시하여 서비스 내 공지사항 또는 이메일을 통해 사전 공지한다.",
                    "이용자는 개정 약관에 동의하지 않을 경우 적용일 이전까지 서비스 이용을 중단하고 회원 탈퇴를 요청할 수 있다."
                ]
            },
            {
                title: "제4조 [서비스 이용계약]",
                content: [
                    "서비스 이용계약은 이용자가 약관에 동의하고 소셜 계정으로 가입 신청 후 회사가 이를 승인함으로써 체결된다.",
                    "이용자는 가입 시 본인의 정확한 정보를 제공해야 하며, 허위 정보를 기재할 경우 서비스 이용이 제한될 수 있다."
                ]
            },
            {
                title: "제5조 [서비스 이용 및 유료 결제]",
                content: [
                    "기본적인 분석 서비스는 무료로 제공될 수 있으나, 회사의 정책에 따라 일부 고급 기능은 유료로 제공될 수 있다.",
                    "유료 서비스 이용 시 이용자는 회사가 정한 결제 방법에 따라 요금을 납부해야 한다.",
                    "회사는 운영 및 정책 변경에 따라 유료 서비스의 요금을 조정할 수 있으며, 사전 공지를 통해 안내한다.",
                    "이용자가 요금을 납부하지 않을 경우 해당 유료 서비스 이용이 제한될 수 있다."
                ]
            },
            {
                title: "제6조 [서비스의 변경 및 중단]",
                content: [
                    "회사는 운영상 또는 기술적 필요에 따라 서비스의 일부 또는 전체를 변경하거나 중단할 수 있으며, 사전에 공지한다.",
                    "다만, 천재지변, 시스템 장애 등 불가항력적인 사유로 인해 서비스 제공이 어려운 경우 사전 공지 없이 서비스를 중단할 수 있다."
                ]
            },
            {
                title: "제7조 [이용자의 의무]",
                content: [
                    "이용자는 본 약관 및 회사의 공지사항을 준수해야 하며, 다음과 같은 행위를 금지한다.",
                    "• 타인의 계정을 도용하는 행위",
                    "• 서비스 운영을 방해하는 행위",
                    "• 회사 또는 제3자의 지식재산권을 침해하는 행위",
                    "• 반려동물과 무관한 불법 또는 부적절한 이미지를 업로드하는 행위",
                    "• 기타 불법적이거나 부당한 행위",
                    "이용자가 본 조를 위반한 경우 회사는 사전 통보 없이 서비스 이용을 제한하거나 계약을 해지할 수 있다."
                ]
            },
            {
                title: "제8조 [개인정보 보호]",
                content: [
                    "회사는 이용자의 개인정보를 보호하기 위해 관련 법령 및 별도의 개인정보 처리방침을 준수한다.",
                    "이용자는 본인의 개인정보가 변경된 경우 즉시 수정해야 하며, 이를 소홀히 하여 발생한 불이익에 대해서는 회사가 책임지지 않는다."
                ]
            },
            {
                title: "제9조 [저작권 및 콘텐츠 권리]",
                content: [
                    "이용자가 업로드한 이미지 및 입력 정보는 분석 목적에 한하여 사용되며, 회사는 이를 무단으로 영리 활용하지 않는다.",
                    "단, 이용자가 별도 동의한 경우에 한하여, 가명 또는 익명 처리된 데이터는 AI 알고리즘 고도화 및 연구 개발 목적으로 활용될 수 있다."
                ]
            },
            {
                title: "제10조 [면책조항]",
                content: [
                    "회사는 천재지변, 네트워크 장애 등 불가항력적인 사유로 인해 서비스 제공이 어려운 경우 책임을 지지 않는다.",
                    "서비스는 참고용 정보 제공 목적이며, 의학적 진단이나 치료를 대신할 수 없다. 이용자는 필요시 반드시 전문 수의사의 진료를 받아야 한다.",
                    "이용자가 본 약관을 위반하거나 부정한 방법으로 서비스를 이용하여 발생한 문제에 대해 회사는 책임을 지지 않는다."
                ]
            },
            {
                title: "제11조 [계약해지 및 환불]",
                content: [
                    "이용자는 언제든지 서비스 이용 계약을 해지할 수 있으며, 해지 시 서비스 이용이 종료된다.",
                    "유료 서비스 이용자가 계약 해지를 원하는 경우, 회사의 환불 정책에 따라 환불이 진행된다."
                ]
            },
            {
                title: "제12조 [준거법 및 관할]",
                content: "본 약관은 대한민국 법령에 따라 해석되며, 서비스 이용과 관련하여 발생한 분쟁은 서울중앙지방법원을 전속 관할 법원으로 한다."
            }
        ]
    },
    en: {
        title: "Terms of Service",
        effectiveDate: "This policy is effective from September 25, 2025.",
        sections: [
            {
                title: "Article 1 [Purpose]",
                content: "These terms and conditions aim to define the rights, obligations and responsibilities of the company and users, service conditions and procedures related to the use of the pet skin disease analysis web service \"Talktail\" (hereinafter referred to as \"Service\") provided by Cream Off Co., Ltd. (hereinafter referred to as \"Company\")."
            },
            {
                title: "Article 2 [Definition of Terms]",
                content: [
                    "\"Service\" means an online service that uploads pet skin photos through PC, mobile web and apps operated by the company and provides AI-based analysis results and health-related information.",
                    "\"User\" means a person who agrees to these terms and uses the service, including members (pet guardians) and affiliated institutions/administrators.",
                    "\"Member\" means an individual who signs up with a social account and uses the service.",
                    "\"Administrator/Affiliate\" means a business or institution that cooperates with the company to utilize or provide services.",
                    "\"ID\" means an email address linked to a social account for user identification and service use.",
                    "\"Analysis Data\" means pet skin images uploaded by users, entered pet information, and AI analysis results thereof."
                ]
            },
            {
                title: "Article 3 [Specification and Amendment of Terms]",
                content: [
                    "The company may amend these terms within the scope that does not violate relevant laws.",
                    "When the company amends the terms, it will specify the amended content and effective date and notify in advance through service notices or emails.",
                    "If users do not agree to the amended terms, they may stop using the service and request membership withdrawal before the application date."
                ]
            },
            {
                title: "Article 4 [Service Use Agreement]",
                content: [
                    "The service use agreement is concluded when the user agrees to the terms and applies for membership with a social account, and the company approves it.",
                    "Users must provide accurate information when signing up, and service use may be restricted if false information is provided."
                ]
            },
            {
                title: "Article 5 [Service Use and Paid Payment]",
                content: [
                    "Basic analysis services may be provided free of charge, but some advanced features may be provided for a fee according to the company's policy.",
                    "When using paid services, users must pay fees according to the payment method determined by the company.",
                    "The company may adjust the fees for paid services according to operational and policy changes, and will notify in advance.",
                    "If users do not pay the fees, the use of the corresponding paid services may be restricted."
                ]
            },
            {
                title: "Article 6 [Service Changes and Suspension]",
                content: [
                    "The company may change or suspend part or all of the service according to operational or technical needs, and will notify in advance.",
                    "However, in cases where it is difficult to provide services due to force majeure such as natural disasters or system failures, services may be suspended without prior notice."
                ]
            },
            {
                title: "Article 7 [User Obligations]",
                content: [
                    "Users must comply with these terms and the company's notices, and the following acts are prohibited:",
                    "• Stealing others' accounts",
                    "• Interfering with service operations",
                    "• Infringing on the intellectual property rights of the company or third parties",
                    "• Uploading illegal or inappropriate images unrelated to pets",
                    "• Other illegal or unfair acts",
                    "If users violate this article, the company may restrict service use or terminate the contract without prior notice."
                ]
            },
            {
                title: "Article 8 [Privacy Protection]",
                content: [
                    "The company complies with relevant laws and separate privacy policies to protect users' personal information.",
                    "Users must immediately correct their personal information if it changes, and the company is not responsible for any disadvantages caused by neglecting this."
                ]
            },
            {
                title: "Article 9 [Copyright and Content Rights]",
                content: [
                    "Images and input information uploaded by users are used only for analysis purposes, and the company does not use them for commercial purposes without permission.",
                    "However, only with separate consent from users, pseudonymized or anonymized data may be used for AI algorithm advancement and research and development purposes."
                ]
            },
            {
                title: "Article 10 [Disclaimer]",
                content: [
                    "The company shall not be liable when it is difficult to provide services due to force majeure such as natural disasters or network failures.",
                    "The service is for reference information purposes and cannot replace medical diagnosis or treatment. Users must receive professional veterinary care when necessary.",
                    "The company shall not be liable for problems arising from users violating these terms or using the service in an improper manner."
                ]
            },
            {
                title: "Article 11 [Contract Termination and Refund]",
                content: [
                    "Users may terminate the service use contract at any time, and service use ends upon termination.",
                    "If paid service users want to terminate the contract, refunds will be processed according to the company's refund policy."
                ]
            },
            {
                title: "Article 12 [Governing Law and Jurisdiction]",
                content: "These terms shall be interpreted according to the laws of the Republic of Korea, and disputes arising in relation to service use shall have Seoul Central District Court as the exclusive jurisdiction court."
            }
        ]
    },
    ja: {
        title: "利用規約",
        effectiveDate: "本方針は2025年9月25日から施行されます。",
        sections: [
            {
                title: "第1条 [目的]",
                content: "本規約は、株式会社クリームオフ（以下「会社」）が提供するペット皮膚疾患分析ウェブサービス「Talktail」（以下「サービス」）の利用に関して、会社と利用者の権利、義務及び責任事項、サービス利用条件及び手続き等を規定することを目的とします。"
            },
            {
                title: "第2条 [用語の定義]",
                content: [
                    "「サービス」とは、会社が運営するPC、モバイルウェブ及びアプリを通じてペット皮膚写真をアップロードし、AIベースで分析結果及び健康関連情報を提供するオンラインサービスを意味する。",
                    "「利用者」とは、本規約に同意してサービスを利用する者として、会員（ペット保護者）及び提携機関・管理者を含む。",
                    "「会員」とは、ソーシャルアカウントで加入してサービスを利用する個人を意味する。",
                    "「管理者/提携機関」とは、会社と協力してサービスを活用または提供する事業者・機関を意味する。",
                    "「ID」とは、利用者識別及びサービス利用のためにソーシャルアカウントと連動するメールアドレスを意味する。",
                    "「分析データ」とは、利用者がアップロードしたペット皮膚イメージ、入力したペット情報及びそれに対するAI分析結果を意味する。"
                ]
            },
            {
                title: "第3条 [規約の明示及び改定]",
                content: [
                    "会社は関連法令に違反しない範囲で本規約を改定することができる。",
                    "会社は規約を改定する場合、改定内容と施行日時を明示してサービス内お知らせまたはメールを通じて事前告知する。",
                    "利用者は改定規約に同意しない場合、適用日以前までサービス利用を中断し会員脱退を要請することができる。"
                ]
            },
            {
                title: "第4条 [サービス利用契約]",
                content: [
                    "サービス利用契約は利用者が規約に同意しソーシャルアカウントで加入申請後、会社がこれを承認することで締結される。",
                    "利用者は加入時に本人の正確な情報を提供する必要があり、虚偽情報を記載した場合サービス利用が制限される場合がある。"
                ]
            },
            {
                title: "第5条 [サービス利用及び有料決済]",
                content: [
                    "基本的な分析サービスは無料で提供される場合があるが、会社の方針により一部高級機能は有料で提供される場合がある。",
                    "有料サービス利用時、利用者は会社が定めた決済方法に従って料金を納付する必要がある。",
                    "会社は運営及び方針変更により有料サービスの料金を調整することができ、事前告知を通じて案内する。",
                    "利用者が料金を納付しない場合、該当有料サービス利用が制限される場合がある。"
                ]
            },
            {
                title: "第6条 [サービスの変更及び中断]",
                content: [
                    "会社は運営上または技術的必要により、サービスの一部または全体を変更または中断することができ、事前に告知する。",
                    "ただし、天災地変、システム障害など不可抗力的な事由によりサービス提供が困難な場合、事前告知なしにサービスを中断することができる。"
                ]
            },
            {
                title: "第7条 [利用者の義務]",
                content: [
                    "利用者は本規約及び会社のお知らせを遵守する必要があり、次のような行為を禁止する。",
                    "• 他人のアカウントを盗用する行為",
                    "• サービス運営を妨害する行為",
                    "• 会社または第三者の知的財産権を侵害する行為",
                    "• ペットと無関係な違法または不適切な画像をアップロードする行為",
                    "• その他違法的または不当な行為",
                    "利用者が本条に違反した場合、会社は事前通報なしにサービス利用を制限または契約を解除することができる。"
                ]
            },
            {
                title: "第8条 [個人情報保護]",
                content: [
                    "会社は利用者の個人情報を保護するため関連法令及び別途の個人情報処理方針を遵守する。",
                    "利用者は本人の個人情報が変更された場合即座に修正する必要があり、これを怠って発生した不利益については会社が責任を負わない。"
                ]
            },
            {
                title: "第9条 [著作権及びコンテンツ権利]",
                content: [
                    "利用者がアップロードした画像及び入力情報は分析目的に限って使用され、会社はこれを無断で営利活用しない。",
                    "ただし、利用者が別途同意した場合に限り、仮名または匿名処理されたデータはAIアルゴリズム高度化及び研究開発目的で活用される場合がある。"
                ]
            },
            {
                title: "第10条 [免責条項]",
                content: [
                    "会社は天災地変、ネットワーク障害など不可抗力的な事由によりサービス提供が困難な場合、責任を負わない。",
                    "サービスは参考用情報提供目的であり、医学的診断や治療に代わることはできない。利用者は必要時に必ず専門獣医師の診療を受ける必要がある。",
                    "利用者が本規約に違反したり不正な方法でサービスを利用して発生した問題について会社は責任を負わない。"
                ]
            },
            {
                title: "第11条 [契約解除及び返金]",
                content: [
                    "利用者はいつでもサービス利用契約を解除することができ、解除時サービス利用が終了する。",
                    "有料サービス利用者が契約解除を希望する場合、会社の返金方針により返金が進行される。"
                ]
            },
            {
                title: "第12条 [準拠法及び管轄]",
                content: "本規約は大韓民国法令により解釈され、サービス利用と関連して発生した紛争はソウル中央地方法院を専属管轄法院とする。"
            }
        ]
    },
    zh: {
        title: "使用条款",
        effectiveDate: "本政策自2025年9月25日起施行。",
        sections: [
            {
                title: "第1条 [目的]",
                content: "本条款旨在规定奶油关闭股份有限公司（以下简称\"公司\"）提供的宠物皮肤疾病分析网络服务\"Talktail\"（以下简称\"服务\"）使用相关的公司与用户的权利、义务及责任事项、服务使用条件及程序等。"
            },
            {
                title: "第2条 [术语定义]",
                content: [
                    "\"服务\"是指公司运营的PC、移动网络及应用程序，用户可通过其上传宠物皮肤照片，并提供基于AI的分析结果及健康相关信息的在线服务。",
                    "\"用户\"是指同意本条款并使用服务的人，包括会员（宠物监护人）及合作机构·管理员。",
                    "\"会员\"是指通过社交账户注册并使用服务的个人。",
                    "\"管理员/合作机构\"是指与公司合作利用或提供服务的商业者·机构。",
                    "\"ID\"是指为用户识别及服务使用而与社交账户关联的电子邮件地址。",
                    "\"分析数据\"是指用户上传的宠物皮肤图像、输入的宠物信息及其AI分析结果。"
                ]
            },
            {
                title: "第3条 [条款的明示及修改]",
                content: [
                    "公司可在不违反相关法令的范围内修改本条款。",
                    "公司修改条款时，将明示修改内容和施行日期，通过服务内公告或邮件进行事前通知。",
                    "用户不同意修改条款时，可在适用日前停止使用服务并申请退会。"
                ]
            },
            {
                title: "第4条 [服务使用合同]",
                content: [
                    "服务使用合同在用户同意条款并通过社交账户申请加入后，公司批准时成立。",
                    "用户加入时必须提供本人准确信息，如填写虚假信息可能限制服务使用。"
                ]
            },
            {
                title: "第5条 [服务使用及付费支付]",
                content: [
                    "基本分析服务可能免费提供，但根据公司政策，部分高级功能可能收费提供。",
                    "使用付费服务时，用户必须按照公司规定的支付方式缴纳费用。",
                    "公司可根据运营及政策变更调整付费服务费用，并通过事前通知进行说明。",
                    "用户未缴纳费用时，相应付费服务使用可能受到限制。"
                ]
            },
            {
                title: "第6条 [服务的变更及中断]",
                content: [
                    "公司可根据运营或技术需要变更或中断服务的部分或全部，并事前通知。",
                    "但因天灾、系统故障等不可抗力事由导致服务提供困难时，可在未事前通知的情况下中断服务。"
                ]
            },
            {
                title: "第7条 [用户义务]",
                content: [
                    "用户必须遵守本条款及公司的通知事项，禁止以下行为：",
                    "• 盗用他人账户的行为",
                    "• 妨碍服务运营的行为",
                    "• 侵犯公司或第三方知识产权的行为",
                    "• 上传与宠物无关的违法或不当图像的行为",
                    "• 其他违法或不当行为",
                    "用户违反本条时，公司可在未事前通报的情况下限制服务使用或解除合同。"
                ]
            },
            {
                title: "第8条 [个人信息保护]",
                content: [
                    "公司为保护用户个人信息，遵守相关法令及单独的个人信息处理方针。",
                    "用户本人个人信息发生变更时必须立即修正，因疏忽而产生的不利后果公司不承担责任。"
                ]
            },
            {
                title: "第9条 [著作权及内容权利]",
                content: [
                    "用户上传的图像及输入信息仅用于分析目的，公司不会未经授权进行营利利用。",
                    "但仅在用户单独同意的情况下，假名或匿名处理的数据可用于AI算法高级化及研究开发目的。"
                ]
            },
            {
                title: "第10条 [免责条款]",
                content: [
                    "因天灾、网络故障等不可抗力事由导致服务提供困难时，公司不承担责任。",
                    "服务为参考信息提供目的，不能代替医学诊断或治疗。用户必要时必须接受专业兽医诊疗。",
                    "对于用户违反本条款或以不正当方法使用服务而产生的问题，公司不承担责任。"
                ]
            },
            {
                title: "第11条 [合同解除及退款]",
                content: [
                    "用户可随时解除服务使用合同，解除时服务使用终止。",
                    "付费服务用户希望解除合同时，将根据公司退款政策进行退款。"
                ]
            },
            {
                title: "第12条 [准据法及管辖]",
                content: "本条款按大韩民国法令解释，服务使用相关发生的纠纷以首尔中央地方法院为专属管辖法院。"
            }
        ]
    }
};

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
    const { language, t } = useLanguage();
    const terms = termsContent[language];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">{terms.title}</h2>
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
                            {terms.sections.map((section, index) => (
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
                                </strong> {terms.effectiveDate}
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