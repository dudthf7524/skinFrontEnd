import { useEffect, useState } from "react";
import ProfileBar from "../components/ProfileBar";

// Table 컴포넌트: 데이터 타입 안전성 보장 + 방어적 렌더링
type ColumnKey<T> = keyof T | "actions";
interface TableColumn<T> {
  key: ColumnKey<T>;
  label: string;
}
interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
}

function Table<T extends Record<string, any>>({ columns, data, renderActions }: TableProps<T>) {
  // data가 배열이 아니면 안내 메시지
  if (!Array.isArray(data)) {
    return <p className="text-gray-500 py-8 text-center">데이터가 없습니다.</p>;
  }

  return (
    <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50 transition">
              {columns.map((col) =>
                col.key === "actions" ? (
                  <td key="actions" className="px-4 py-2 text-sm text-center">
                    {renderActions && renderActions(row)}
                  </td>
                ) : (
                  <td key={String(col.key)} className="px-4 py-2 text-sm text-gray-800">
                    {typeof row[col.key as keyof T] === "boolean"
                      ? row[col.key as keyof T]
                        ? "O"
                        : "X"
                      : row[col.key as keyof T] ?? ""}
                  </td>
                )
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="text-center py-6 text-gray-400">
              데이터가 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

// 타입 정의 (result/list에 맞춤)
interface PaperweightType {
  id: number;
  createdBy: number;
  PetName: string;
  breed: string;
  Weight: string;
  customBreed: string;
  itchiness: string;
  smell: boolean;
  alopecia: boolean;
  birthday: string;
  lesionSites: string;
  imageId: number;
  createdAt: string;
  updatedAt?: string; // list에만 없음
}

// 기존 RecordType은 제거하고, "분석 기록" 탭에서 사용할 테이블 컬럼들을 PaperweightType 기준으로 세팅

interface PaymentType {
  id: number;
  userId: number;
  orderId: string;
  transactionId: string | null;
  amount: string;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface UserType {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  Payment: PaymentType[];
  Paperweight: PaperweightType[];
}

type TabType = "records" | "users";

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<TabType>("records");

  // 분석 기록(분석 리스트) - PaperweightType
  const [records, setRecords] = useState<PaperweightType[]>([]);
  // users: api에서 users로 감싸져서 옴
  const [users, setUsers] = useState<UserType[]>([]);
  // 상세 - Paperweight
  const [selectedUserAnalysis, setSelectedUserAnalysis] = useState<PaperweightType[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // ✅ API 호출 시 응답 데이터의 실제 구조에 맞춰 매핑
  useEffect(() => {
    (async () => {
      try {
        // 분석기록 = list 결과 result 배열
        const analysisRes = await fetch(`${apiBaseUrl}/admin/list`, { credentials: "include" });
        const analysisJson = await analysisRes.json();
        // result가 올바른 형태인지 체크
        setRecords(
          Array.isArray(analysisJson?.data?.result)
            ? analysisJson.data.result
            : []
        );

        // 유저 목록 데이터 users 배열
        const userRes = await fetch(`${apiBaseUrl}/admin/userinfo`, { credentials: "include" });
        const userJson = await userRes.json();
        setUsers(
          Array.isArray(userJson?.users)
            ? userJson.users
            : []
        );
      } catch (err) {
        setRecords([]);
        setUsers([]);
        // 에러 핸들링 로깅 등
        console.error(err);
      }
    })();
  }, [apiBaseUrl]);

  // 상세 모달 (PaperweightType 배열)
  const fetchUserAnalysisDetail = async (userId: number) => {
    try {
      const res = await fetch(`${apiBaseUrl}/admin/detail/${userId}`, { credentials: "include" });
      const json = await res.json();
      // 상세는 {data: {result: [...]}} 구조
      setSelectedUserAnalysis(
        Array.isArray(json?.data?.result)
          ? json.data.result
          : []
      );
      setShowModal(true);
    } catch (error) {
      setSelectedUserAnalysis([]);
      setShowModal(true);
      console.error(error);
    }
  };

  // "분석 기록 리스트" 컬럼 (Paperweight 기준)
  const recordColumns: TableColumn<PaperweightType>[] = [
    { key: "id", label: "ID" },
    { key: "PetName", label: "이름" },
    { key: "breed", label: "견종" },
    { key: "Weight", label: "몸무게(kg)" },
    { key: "itchiness", label: "가려움" },
    { key: "smell", label: "냄새" },
    { key: "alopecia", label: "탈모" },
    { key: "birthday", label: "생일" },
    { key: "lesionSites", label: "병변 부위" },
    { key: "createdAt", label: "분석일" },
  ];

  // "사용자 리스트" 컬럼
  const userColumns: TableColumn<UserType | any>[] = [
    { key: "id", label: "ID" },
    { key: "email", label: "이메일" },
    { key: "createdAt", label: "가입일" },
    { key: "updatedAt", label: "업데이트 날짜" },
    { key: "Payment", label: "결제 내역" },
    { key: "Paperweight", label: "분석 기록" },
    { key: "actions", label: "보기" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <ProfileBar />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 🔶 탭바 (새 디자인) */}
        <div className="relative flex justify-center border-b border-gray-200 mb-8">
          {(["records", "users"] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`relative px-8 py-3 text-lg font-semibold transition-all duration-200
                ${
                  selectedTab === tab
                    ? "text-orange-600"
                    : "text-gray-500 hover:text-orange-400"
                }`}
            >
              {tab === "records" ? "분석 기록 리스트" : "사용자 리스트"}
              {selectedTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 rounded-t-md animate-slideIn"></span>
              )}
            </button>
          ))}
        </div>

        {/* 탭 내용: 분석 기록 */}
        {selectedTab === "records" && (
          <Table<PaperweightType>
            columns={recordColumns}
            data={Array.isArray(records) ? records : []}
          />
        )}
        {/* 탭 내용: 사용자 리스트 */}
        {selectedTab === "users" && (
          <Table<any>
            columns={userColumns}
            data={
              Array.isArray(users)
                ? users.map((user) => ({
                    ...user,
                    Payment: Array.isArray(user.Payment) && user.Payment.length
                      ? `활성화(${user.Payment.length})`
                      : "비활성화",
                    Paperweight: Array.isArray(user.Paperweight) && user.Paperweight.length
                      ? `활성화(${user.Paperweight.length})`
                      : "비활성화"
                  }))
                : []
            }
            renderActions={(user) => (
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={() => fetchUserAnalysisDetail(user.id)}
              >
                보기
              </button>
            )}
          />
        )}
      </main>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-bold mb-4">분석 내용</h2>
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-lg"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <Table<PaperweightType>
              columns={[
                { key: "id", label: "ID" },
                { key: "PetName", label: "이름" },
                { key: "breed", label: "견종" },
                { key: "Weight", label: "몸무게(kg)" },
                { key: "itchiness", label: "가려움" },
                { key: "smell", label: "냄새" },
                { key: "alopecia", label: "탈모" },
                { key: "birthday", label: "생일" },
                { key: "lesionSites", label: "병변 부위" },
                { key: "createdAt", label: "분석일" },
              ]}
              data={Array.isArray(selectedUserAnalysis) ? selectedUserAnalysis : []}
            />
          </div>
        </div>
      )}
    </div>
  );
}
