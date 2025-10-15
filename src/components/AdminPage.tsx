import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileBar from "../components/ProfileBar";

interface TableProps<T> {
  columns: { key: keyof T | string; label: string }[];
  data: T[];
}

export function Table<T extends object>({ columns, data }: TableProps<T>) {
  if (!Array.isArray(data)) return <p>데이터가 없습니다.</p>;

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-2 border-b">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-gray-500 py-4"
              >
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-2 border-b">
                    {
                      // @ts-expect-error dynamic key
                      row[col.key]
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

interface RecordType {
  id: number;
  user: string;
  analysisType: string;
  result: string;
  createdAt: string;
}

interface UserType {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  hasPayment: boolean;
  hasAnalysis: boolean;
}

export default function AdminPage() {
  const [records, setRecords] = useState<RecordType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [activeTab, setActiveTab] = useState<"users" | "records">("users");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const recordRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/admin/list`,
          { credentials: "include" }
        );
        const recordData = await recordRes.json();
        setRecords(Array.isArray(recordData) ? recordData : []);

        const userRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/admin/userinfo`,
          { credentials: "include" }
        );
        const userData = await userRes.json();
        setUsers(Array.isArray(userData) ? userData : []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const recordColumns = [
    { key: "id", label: "ID" },
    { key: "user", label: "사용자" },
    { key: "analysisType", label: "분석 종류" },
    { key: "result", label: "결과" },
    { key: "createdAt", label: "생성일" },
  ];

  const userColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "이름" },
    { key: "email", label: "이메일" },
    { key: "hasPayment", label: "결제 내역" },
    { key: "hasAnalysis", label: "분석 내역" },
    { key: "createdAt", label: "가입일" },
    { key: "updatedAt", label: "수정일" },
    { key: "actions", label: "상세보기" },
  ];

  const handleDetail = (id: number) => {
    navigate(`/admin/detail/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <ProfileBar />
      </header>

      {/* 탭바 */}
      <div className="flex justify-center space-x-6 mt-6">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-6 py-2 rounded-md font-semibold transition ${
            activeTab === "users"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          사용자 리스트
        </button>
        <button
          onClick={() => setActiveTab("records")}
          className={`px-6 py-2 rounded-md font-semibold transition ${
            activeTab === "records"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          분석 리스트
        </button>
      </div>

      <main className="p-6 space-y-10">
        {activeTab === "users" ? (
          <section>
            <h2 className="text-2xl font-bold mb-4">사용자 리스트</h2>
            <Table
              columns={userColumns}
              data={users.map((u) => ({
                ...u,
                hasPayment: (
                  <button
                    className={`px-3 py-1 rounded-md font-semibold ${
                      u.hasPayment
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                    disabled={!u.hasPayment}
                  >
                    {u.hasPayment ? "활성화" : "비활성화"}
                  </button>
                ),
                hasAnalysis: (
                  <button
                    onClick={() => handleDetail(u.id)}
                    className={`px-3 py-1 rounded-md font-semibold ${
                      u.hasAnalysis
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {u.hasAnalysis ? "보기" : "비활성화"}
                  </button>
                ),
                actions: (
                  <button
                    onClick={() => handleDetail(u.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    상세보기
                  </button>
                ),
              }))}
            />
          </section>
        ) : (
          <section>
            <h2 className="text-2xl font-bold mb-4">분석 기록 리스트</h2>
            <Table columns={recordColumns} data={records} />
          </section>
        )}
      </main>
    </div>
  );
}
