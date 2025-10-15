import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileBar from "../components/ProfileBar";

interface TableProps<T> {
  columns: { key: keyof T | string; label: string }[];
  data: T[];
}

function Table<T extends object>({ columns, data }: TableProps<T>) {
  if (!Array.isArray(data)) return <p>데이터가 없습니다.</p>;

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-2 border-b font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center text-gray-500 py-4">
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-2 border-b">
                    {
                      // @ts-expect-error dynamic key access
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

interface UserType {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  hasPayment: boolean;
  hasAnalysis: boolean;
}

interface RecordType {
  id: number;
  createdBy: number;
  PetName: string;
  breed: string;
  Weight: string;
  itchiness: string;
  smell: boolean;
  alopecia: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [records, setRecords] = useState<RecordType[]>([]);
  const [activeTab, setActiveTab] = useState<"users" | "records">("users");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ 사용자 정보 가져오기
        const userRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/userinfo`, {
          credentials: "include",
        });
        const userJson = await userRes.json();

        if (Array.isArray(userJson.users)) {
          const parsedUsers = userJson.users.map((u: any) => ({
            id: u.id,
            email: u.email,
            createdAt: new Date(u.createdAt).toLocaleString(),
            updatedAt: new Date(u.updatedAt).toLocaleString(),
            hasPayment: u.Payment.length > 0,
            hasAnalysis: u.Paperweight.length > 0,
          }));
          setUsers(parsedUsers);
        } else {
          console.error("Unexpected user data structure:", userJson);
        }

        // ✅ 분석 리스트 가져오기
        const recordRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/list`, {
          credentials: "include",
        });
        const recordJson = await recordRes.json();

        if (Array.isArray(recordJson.data?.result)) {
          const parsedRecords = recordJson.data.result.map((r: any) => ({
            id: r.id,
            createdBy: r.createdBy,
            PetName: r.PetName,
            breed: r.breed,
            Weight: r.Weight,
            itchiness: r.itchiness,
            smell: r.smell,
            alopecia: r.alopecia,
            createdAt: new Date(r.createdAt).toLocaleString(),
          }));
          setRecords(parsedRecords);
        } else {
          console.error("Unexpected record data structure:", recordJson);
        }
      } catch (err) {
        console.error("❌ Admin data fetch failed:", err);
      }
    };

    fetchData();
  }, []);

  const handleDetail = (id: number) => {
    navigate(`/admin/detail/${id}`);
  };

  const userColumns = [
    { key: "id", label: "ID" },
    { key: "email", label: "이메일" },
    { key: "hasPayment", label: "결제 내역" },
    { key: "hasAnalysis", label: "분석 내역" },
    { key: "createdAt", label: "가입일" },
    { key: "updatedAt", label: "수정일" },
    { key: "actions", label: "상세보기" },
  ];

  const recordColumns = [
    { key: "id", label: "ID" },
    { key: "createdBy", label: "사용자 ID" },
    { key: "PetName", label: "반려동물 이름" },
    { key: "breed", label: "품종" },
    { key: "Weight", label: "몸무게" },
    { key: "itchiness", label: "가려움 정도" },
    { key: "smell", label: "냄새 여부" },
    { key: "alopecia", label: "탈모 여부" },
    { key: "createdAt", label: "등록일" },
  ];

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
            activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          사용자 리스트
        </button>
        <button
          onClick={() => setActiveTab("records")}
          className={`px-6 py-2 rounded-md font-semibold transition ${
            activeTab === "records" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
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
                      u.hasPayment ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
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
                      u.hasAnalysis ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
                    }`}
                    disabled={!u.hasAnalysis}
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
