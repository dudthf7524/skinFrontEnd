// src/pages/AdminPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileBar from "../../components/ProfileBar";
import PaperweightModal from "../PaperweightModal";
import PaymentModal from "../PaymentModal";

/* -------------------------------------------
 * 공용 API 헬퍼
 * ----------------------------------------- */
const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    ...init,
  });
  const json = await res.json();
  if (!res.ok) {
    const msg = (json && (json.message || json.error)) || "요청 실패";
    throw new Error(msg);
  }
  return json;
}

/* -------------------------------------------
 * 범용 테이블
 * ----------------------------------------- */
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

/* -------------------------------------------
 * 타입들
 * ----------------------------------------- */
type Role = "ADMIN" | "USER";

interface UserType {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  hasPayment: any[];
  hasAnalysis: any[];
}

interface RecordType {
  id: number;
  createdBy: number;
  PetName: string;
  breed: string;
  Weight: string;
  itchiness: string;
  smell: string;
  alopecia: string;
  createdAt: string;
}

type AdminUserRow = {
  id: number;
  email: string;
  role: Role;
  aiTokenInfinite: boolean;
  createdAt: string;
};

type CouponRow = {
  id: number;
  code: string;
  tokens: number;
  endsAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: { redemptions: number };
};

/* -------------------------------------------
 * 권한 관리 섹션 (컴포넌트 내부)
 * ----------------------------------------- */
function AdminRoleManager() {
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await api<{ users: any[] }>("/admin/users/admins");
      const rows = (data.users || []).map((u) => ({
        id: u.id,
        email: u.email,
        role: u.role as Role,
        aiTokenInfinite: !!u.aiTokenInfinite,
        createdAt: new Date(u.createdAt).toLocaleString(),
      })) as AdminUserRow[];
      setUsers(rows);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = useMemo(
    () =>
      users.filter(
        (u) =>
          u.email.toLowerCase().includes(q.toLowerCase()) ||
          String(u.id).includes(q)
      ),
    [users, q]
  );

  const makeAdmin = async (id: number) => {
    await api(`/admin/users/${id}/make-admin`, { method: "PATCH", body: JSON.stringify({}) });
    await fetchUsers();
  };

  const revokeAdmin = async (id: number) => {
    await api(`/admin/users/${id}/revoke-admin`, { method: "PATCH", body: JSON.stringify({}) });
    await fetchUsers();
  };

  const toggleInfinite = async (id: number, next: boolean) => {
    await api(`/admin/users/${id}/admin-flags`, {
      method: "PATCH",
      body: JSON.stringify({ aiTokenInfinite: next }),
    });
    await fetchUsers();
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">권한 관리</h2>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="이메일/ID 검색"
            className="px-3 py-2 border rounded-md"
          />
          <button
            onClick={fetchUsers}
            className="px-4 py-2 rounded-md bg-gray-800 text-white"
          >
            새로고침
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">이메일</th>
              <th className="px-4 py-2 border-b">역할</th>
              <th className="px-4 py-2 border-b">무한토큰</th>
              <th className="px-4 py-2 border-b">가입일</th>
              <th className="px-4 py-2 border-b">액션</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-500">불러오는 중…</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-gray-500">데이터가 없습니다.</td></tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{u.id}</td>
                  <td className="px-4 py-2 border-b">{u.email}</td>
                  <td className="px-4 py-2 border-b">{u.role}</td>
                  <td className="px-4 py-2 border-b">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={u.aiTokenInfinite}
                        onChange={(e) => toggleInfinite(u.id, e.target.checked)}
                      />
                      <span>{u.aiTokenInfinite ? "ON" : "OFF"}</span>
                    </label>
                  </td>
                  <td className="px-4 py-2 border-b">{u.createdAt}</td>
                  <td className="px-4 py-2 border-b">
                    {u.role === "ADMIN" ? (
                      <button
                        onClick={() => revokeAdmin(u.id)}
                        className="px-3 py-1 rounded-md bg-red-600 text-white"
                      >
                        관리자 회수
                      </button>
                    ) : (
                      <button
                        onClick={() => makeAdmin(u.id)}
                        className="px-3 py-1 rounded-md bg-blue-600 text-white"
                      >
                        관리자 부여
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* -------------------------------------------
 * 쿠폰 관리 섹션 (컴포넌트 내부)
 * ----------------------------------------- */
function CouponManager() {
  const [items, setItems] = useState<CouponRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | "valid" | "expired">("");
  const [active, setActive] = useState<"" | "true" | "false">("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  // form
  const [tokens, setTokens] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [endsAt, setEndsAt] = useState<string>(""); // datetime-local

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (search) qs.set("search", search);
      if (status) qs.set("status", status);
      if (active) qs.set("active", active);
      if (sort) qs.set("sort", sort);
      qs.set("page", String(page));
      qs.set("limit", String(limit));

      const data = await api<{
        ok: boolean;
        items: CouponRow[];
        pagination: { pages: number };
      }>(`/admin/coupons?${qs.toString()}`);

      setItems(data.items || []);
      setTotalPages(data.pagination?.pages || 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort]);

  const onSearch = () => {
    setPage(1);
    fetchCoupons();
  };

  const createCoupons = async () => {
    if (!endsAt) return alert("유효기간(endsAt)을 입력하세요.");
    if (tokens <= 0) return alert("토큰 수는 1 이상이어야 합니다.");
    if (count <= 0 || count > 1000) return alert("생성 개수는 1~1000 사이여야 합니다.");

    // datetime-local → ISO
    const isoEndsAt = new Date(endsAt).toISOString();

    const data = await api<{ ok: boolean; count: number; items: CouponRow[] }>(
      "/admin/coupon",
      {
        method: "POST",
        body: JSON.stringify({ tokens, endsAt: isoEndsAt, count }),
      }
    );
    alert(`쿠폰 ${data.count}개 생성 완료`);
    setEndsAt("");
    setTokens(1);
    setCount(1);
    fetchCoupons();
  };

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    alert("코드가 복사되었습니다.");
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">쿠폰 관리</h2>

      {/* 생성 폼 */}
      <div className="bg-white shadow rounded-lg p-4 space-y-3">
        <div className="grid md:grid-cols-4 gap-3">
          <label className="flex flex-col">
            <span className="text-sm text-gray-600">토큰 수</span>
            <input
              type="number"
              min={1}
              value={tokens}
              onChange={(e) => setTokens(parseInt(e.target.value || "0", 10))}
              className="px-3 py-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-gray-600">생성 개수</span>
            <input
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value || "0", 10))}
              className="px-3 py-2 border rounded-md"
            />
          </label>
          <label className="flex flex-col md:col-span-2">
            <span className="text-sm text-gray-600">유효기간 (endsAt)</span>
            <input
              type="datetime-local"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button onClick={createCoupons} className="px-4 py-2 rounded-md bg-blue-600 text-white">
            쿠폰 생성
          </button>
        </div>
      </div>

      {/* 필터/정렬 */}
      <div className="bg-white shadow rounded-lg p-4 grid md:grid-cols-6 gap-3 items-end">
        <label className="flex flex-col">
          <span className="text-sm text-gray-600">검색(코드)</span>
          <input className="px-3 py-2 border rounded-md" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-gray-600">상태</span>
          <select className="px-3 py-2 border rounded-md" value={status} onChange={(e) => setStatus(e.target.value as any)}>
            <option value="">전체</option>
            <option value="valid">유효</option>
            <option value="expired">만료</option>
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-gray-600">활성</span>
          <select className="px-3 py-2 border rounded-md" value={active} onChange={(e) => setActive(e.target.value as any)}>
            <option value="">전체</option>
            <option value="true">활성</option>
            <option value="false">비활성</option>
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-gray-600">정렬</span>
          <select className="px-3 py-2 border rounded-md" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">최신 생성</option>
            <option value="oldest">오래된 생성</option>
            <option value="endsAt">유효기간 오름차순</option>
            <option value="-endsAt">유효기간 내림차순</option>
            <option value="code">코드 오름차순</option>
            <option value="redemptions">사용 수 내림차순</option>
          </select>
        </label>
        <button onClick={onSearch} className="px-4 py-2 rounded-md bg-gray-800 text-white">검색</button>
      </div>

      {/* 목록 */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">코드</th>
              <th className="px-4 py-2 border-b">토큰</th>
              <th className="px-4 py-2 border-b">유효기간</th>
              <th className="px-4 py-2 border-b">활성</th>
              <th className="px-4 py-2 border-b">사용 수</th>
              <th className="px-4 py-2 border-b">생성일</th>
              <th className="px-4 py-2 border-b">액션</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-6 text-center text-gray-500">불러오는 중…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-6 text-center text-gray-500">데이터가 없습니다.</td></tr>
            ) : (
              items.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-mono">{c.code}</td>
                  <td className="px-4 py-2 border-b">{c.tokens}</td>
                  <td className="px-4 py-2 border-b">{new Date(c.endsAt).toLocaleString()}</td>
                  <td className="px-4 py-2 border-b">{c.isActive ? "활성" : "비활성"}</td>
                  <td className="px-4 py-2 border-b">{c._count?.redemptions ?? 0}</td>
                  <td className="px-4 py-2 border-b">{new Date(c.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 border-b">
                    <button onClick={() => copyCode(c.code)} className="px-3 py-1 rounded-md bg-gray-200">
                      코드 복사
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
        >
          이전
        </button>
        <span className="text-sm text-gray-600">
          {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </section>
  );
}

/* -------------------------------------------
 * 메인 AdminPage (기존 users/records + roles/coupons 탭 포함)
 * ----------------------------------------- */
export default function AdminPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [records, setRecords] = useState<RecordType[]>([]);
  const [activeTab, setActiveTab] = useState<"users" | "records" | "roles" | "coupons">("users");
  const navigate = useNavigate();

  // 모달 상태
  const [selectedPaperUser, setSelectedPaperUser] = useState<UserType | null>(null);
  const [selectedPaymentUser, setSelectedPaymentUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 정보
        const userRes = await fetch(`${API_BASE}/admin/userinfo`, { credentials: "include" });
        const userJson = await userRes.json();

        if (Array.isArray(userJson.users)) {
          const parsedUsers = userJson.users.map((u: any) => ({
            id: u.id,
            email: u.email,
            createdAt: new Date(u.createdAt).toLocaleString(),
            updatedAt: new Date(u.updatedAt).toLocaleString(),
            hasPayment: u.Payment,
            hasAnalysis: u.Paperweight,
          }));
          setUsers(parsedUsers);
        } else {
          console.error("Unexpected user data structure:", userJson);
        }

        // 분석 리스트
        const recordRes = await fetch(`${API_BASE}/admin/list`, { credentials: "include" });
        const recordJson = await recordRes.json();

        if (Array.isArray(recordJson.data?.result)) {
          const parsedRecords = recordJson.data.result.map((r: any) => ({
            id: r.id,
            createdBy: r.createdBy,
            PetName: r.PetName,
            breed: r.breed,
            Weight: r.Weight,
            itchiness: r.itchiness,
            smell: r.smell === true ? "있음" : "없음",
            alopecia: r.alopecia === true ? "있음" : "없음",
            createdAt: new Date(r.createdAt).toLocaleString(),
          }));
          setRecords(parsedRecords);
        } else {
          console.error("Unexpected record data structure:", recordJson);
          return navigate("/");
        }
      } catch (err) {
        console.error("❌ Admin data fetch failed:", err);
      }
    };

    fetchData();
  }, [navigate]);

  const handlePaperweightDetail = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (user) setSelectedPaperUser(user);
  };
  const handlePaymentDetail = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (user) setSelectedPaymentUser(user);
  };
  const closePaperweightModal = () => setSelectedPaperUser(null);
  const closePaymentModal = () => setSelectedPaymentUser(null);

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

  function clickPaymentButton(user: UserType) {
    setSelectedPaymentUser(user);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <ProfileBar />
      </header>

      {/* 탭바 */}
      <div className="flex justify-center flex-wrap gap-3 mt-6">
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
        <button
          onClick={() => setActiveTab("roles")}
          className={`px-6 py-2 rounded-md font-semibold transition ${
            activeTab === "roles" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          권한 관리
        </button>
        <button
          onClick={() => setActiveTab("coupons")}
          className={`px-6 py-2 rounded-md font-semibold transition ${
            activeTab === "coupons" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          쿠폰 관리
        </button>
      </div>

      {/* 본문 */}
      <main className="p-6 space-y-10">
        {activeTab === "roles" ? (
          <AdminRoleManager />
        ) : activeTab === "coupons" ? (
          <CouponManager />
        ) : activeTab === "users" ? (
          <section>
            <h2 className="text-2xl font-bold mb-4">사용자 리스트</h2>
            <Table
              columns={userColumns}
              data={users.map((u) => ({
                ...u,
                hasPayment: (
                  <div className="flex justify-center">
                    <button
                      className={`px-3 py-1 rounded-md font-semibold ${
                        u.hasPayment && u.hasPayment.length > 0
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                      disabled={!u.hasPayment || u.hasPayment.length === 0}
                      onClick={() => clickPaymentButton(u)}
                    >
                      {u.hasPayment && u.hasPayment.length > 0 ? "보기" : "데이터 없음"}
                    </button>
                  </div>
                ),
                hasAnalysis: (
                  <div className="flex justify-center">
                    <button
                      onClick={() => handlePaperweightDetail(u.id)}
                      className={`px-3 py-1 rounded-md font-semibold ${
                        u.hasAnalysis && u.hasAnalysis.length > 0
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                      disabled={!u.hasAnalysis || u.hasAnalysis.length === 0}
                    >
                      {u.hasAnalysis && u.hasAnalysis.length > 0 ? "보기" : "데이터 없음"}
                    </button>
                  </div>
                ),
                actions: (
                  <div className="flex justify-center text-gray-400 text-xs">—</div>
                ),
              }))}
            />

            {/* 모달 */}
            {selectedPaperUser && (
              <PaperweightModal
                user={{
                  ...selectedPaperUser,
                  Paperweight: selectedPaperUser.hasAnalysis || [],
                }}
                onClose={closePaperweightModal}
                onDetail={() => {}}
              />
            )}
            {selectedPaymentUser && (
              <PaymentModal
                user={{
                  ...selectedPaymentUser,
                  Payment: selectedPaymentUser.hasPayment || [],
                }}
                onClose={closePaymentModal}
              />
            )}
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
