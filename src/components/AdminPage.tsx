import { useEffect, useState } from "react";
import ProfileBar from "../components/ProfileBar";
import axios from "axios";

// Table 컴포넌트
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
        {data.map((row, idx) => (
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
        ))}
      </tbody>
    </table>
  );
}

// 타입 정의
interface RecordType {
  id: number;
  user: string;
  analysisType: string;
  result: string;
  createdAt: string;
}

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

  const [records, setRecords] = useState<RecordType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUserAnalysis, setSelectedUserAnalysis] = useState<RecordType[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/admin/list`, { withCredentials: true });
      setRecords(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiBaseUrl}/admin/userinfo`, { withCredentials: true });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserAnalysisDetail = async (userId: number) => {
    try {
      const res = await axios.get(`${apiBaseUrl}/admin/detail/${userId}`, {
        withCredentials: true,
      });
      setSelectedUserAnalysis(res.data);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchUsers();
  }, []);

  const recordColumns: TableColumn<RecordType>[] = [
    { key: "id", label: "ID" },
    { key: "user", label: "사용자" },
    { key: "analysisType", label: "분석 종류" },
    { key: "result", label: "결과" },
    { key: "createdAt", label: "생성일" },
  ];

  const userColumns: TableColumn<UserType>[] = [
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

        {/* 탭 내용 */}
        {selectedTab === "records" && <Table<RecordType> columns={recordColumns} data={records} />}
        {selectedTab === "users" && (
          <Table<UserType>
            columns={userColumns}
            data={users.map((user) => ({
              ...user,
              Payment: user.Payment.length ? "활성화" : "비활성화",
              Paperweight: user.Paperweight.length ? "활성화" : "비활성화",
            }))}
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
      {showModal && selectedUserAnalysis && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full p-6 overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-bold mb-4">분석 내용</h2>
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-lg"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <Table<RecordType>
              columns={[
                { key: "id", label: "ID" },
                { key: "analysisType", label: "분석 종류" },
                { key: "result", label: "결과" },
                { key: "createdAt", label: "생성일" },
              ]}
              data={selectedUserAnalysis}
            />
          </div>
        </div>
      )}
    </div>
  );
}
