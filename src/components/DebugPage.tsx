// /pages/DebugPage.tsx
import { useEffect, useMemo, useState } from "react";

type EventItem = {
  type: string;
  timestamp: string;
  data: Record<string, any>;
};

const MAX_ITEMS = 500;

export default function DebugPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [filter, setFilter] = useState<string>(""); // click, keydown 등 필터

  // 커스텀 이벤트 수신
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<EventItem>;
      setEvents((prev) => {
        const next = [ce.detail, ...prev];
        if (next.length > MAX_ITEMS) next.length = MAX_ITEMS;
        return next;
      });
    };
    window.addEventListener("__tracked_event__", handler as EventListener);
    return () => window.removeEventListener("__tracked_event__", handler as EventListener);
  }, []);

  // 필터 적용
  const filtered = useMemo(() => {
    if (!filter) return events;
    const f = filter.toLowerCase();
    return events.filter((ev) =>
      ev.type.toLowerCase().includes(f) ||
      JSON.stringify(ev.data).toLowerCase().includes(f)
    );
  }, [events, filter]);

  const clear = () => setEvents([]);
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `events_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: 16, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Admin · Live Debug Events</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="filter: type or text… (e.g., click)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 8, flex: 1 }}
        />
        <button onClick={clear} style={btnStyle}>Clear</button>
        <button onClick={downloadJson} style={btnStyle}>Download JSON</button>
      </div>

      <div style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        height: "70vh"
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "140px 120px 1fr", background: "#f9fafb", padding: "8px 12px", fontSize: 12, fontWeight: 600 }}>
          <div>Time</div>
          <div>Type</div>
          <div>Data</div>
        </div>
        <div style={{ height: "calc(70vh - 36px)", overflowY: "auto" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 16, color: "#6b7280", fontSize: 12 }}>No events.</div>
          ) : filtered.map((ev, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 120px 1fr", borderTop: "1px solid #f3f4f6", padding: "8px 12px", fontSize: 12 }}>
              <div style={{ color: "#6b7280" }}>{new Date(ev.timestamp).toLocaleTimeString()}</div>
              <div style={{ fontWeight: 600 }}>{ev.type}</div>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{JSON.stringify(ev.data, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "8px 12px",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  background: "white",
  fontSize: 12,
  cursor: "pointer",
};
