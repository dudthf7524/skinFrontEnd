// src/pages/AdminRoleManager.tsx
import { useEffect, useMemo, useState } from "react";
import { API } from "../lib/api";

type Role = "ADMIN" | "USER";
type UserRow = {
  id: number;
  email: string;
  role: Role;
  aiTokenInfinite: boolean;
  createdAt: string;
};

export default function AdminRoleManager() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await API.request<{ users: any[] }>("/admin/users");
      const rows = (data.users || []).map((u) => ({
        id: u.id,
        email: u.email,
        role: u.role as Role,
        aiTokenInfinite: !!u.aiTokenInfinite,
        createdAt: new Date(u.createdAt).toLocaleString(),
      })) as UserRow[];
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
    await API.request(`/admin/users/${id}/make-admin`, { method: "PATCH", body: JSON.stringify({}) });
    await fetchUsers();
  };

  const revokeAdmin = async (id: number) => {
    await API.request(`/admin/users/${id}/revoke-admin`, { method: "PATCH", body: JSON.stringify({}) });
    await fetchUsers();
  };

  const toggleInfinite = async (id: number, next: boolean) => {
    await API.request(`/admin/users/${id}/admin-flags`, {
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
