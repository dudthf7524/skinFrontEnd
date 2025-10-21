// src/pages/CouponManager.tsx
import { useEffect, useMemo, useState } from "react";
import { API } from "../lib/api";

type CouponRow = {
  id: number;
  code: string;
  tokens: number;
  endsAt: string;
  isActive: boolean;
  createdAt: string;
  _count?: { redemptions: number };
};

export default function CouponManager() {
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

      const data = await API.request<{
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
  }, [page, sort]); // 검색/필터는 아래의 검색 버튼으로 트리거

  const onSearch = () => {
    setPage(1);
    fetchCoupons();
  };

  const createCoupons = async () => {
    if (!endsAt) return alert("유효기간(endsAt)을 입력하세요.");
    if (tokens <= 0) return alert("토큰 수는 1 이상이어야 합니다.");
    if (count <= 0 || count > 1000) return alert("생성 개수는 1~1000 사이여야 합니다.");

    // datetime-local → ISO
    // endsAt는 KST 기준 입력 시 그대로 전송(백엔드가 Date로 파싱)
    const isoEndsAt = new Date(endsAt).toISOString();

    const data = await API.request<{ ok: boolean; count: number; items: CouponRow[] }>(
      "/admin/coupons",
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
                  <td className="px-4 py-2 border-b">{new Date(c.endsAt).getTime() > Date.now() ? "활성" : "유효기간 만료"}</td>
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
