import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "dm_todos_v1";

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path
        d="M1 4L3.5 6.5L9 1"
        stroke="#0f0e0c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M2 3.5h10M5.5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M12 3.5l-.8 7.2a1 1 0 01-1 .8H3.8a1 1 0 01-1-.8L2 3.5"
        stroke="#888"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TodoApp() {
  const [tasks, setTasks] = useState(loadTasks);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const inputRef = useRef(null);

  // Persist to localStorage on every tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks((prev) => [{ id: Date.now(), text, completed: false }, ...prev]);
    setInput("");
    inputRef.current?.focus();
  };

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );


  const filtered =
    filter === "all" ? tasks : tasks.filter((t) => t.completed);

  const completedCount = tasks.filter((t) => t.completed).length;
  const remaining = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center px-5 py-16">
      <div className="w-full max-w-[520px]">

        {/* ── Header ── */}
        <div className="mb-10">

          <h1
            className="text-[52px] text-[#0f0e0c] leading-none mb-1"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Tasks
          </h1>
          <p className="font-mono text-xs text-[#555]">
            {completedCount} of {tasks.length} completed
          </p>
        </div>

        {/* ── Input ── */}
        <div className="flex items-center gap-2 bg-[#555] border border-[#555] rounded-xl px-4 py-2 mb-7">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task…"
            className="flex-1 bg-transparent border-none outline-none text-white] font-mono text-sm placeholder-white caret-[#c8b89a]"
          />
          <button
            onClick={addTask}
            className="bg-white text-[#0f0e0c] font-mono text-xs font-medium tracking-wide rounded-lg px-4 py-2 shrink-0 hover:bg-[#f0f0f0] transition-colors"
          >
            + Add
          </button>
        </div>

        {/* ── Filters ── */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {["all", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-[11px] tracking-widest uppercase px-4 py-1.5 rounded-lg border transition-colors ${
                filter === f
                  ? "bg-[#555] text-white border-[#c8b89a]"
                  : "bg-[#1a1916] text-[#555] border-[#2a2926] hover:text-[#999]"
              }`}
            >
              {f}
            </button>
          ))}

        </div>

        {/* ── Task List ── */}
        <div className="flex flex-col gap-2">
          {filtered.length === 0 && (
            <p className="text-center font-mono text-sm italic text-[#333] py-12">
              {filter === "completed"
                ? "Nothing completed yet."
                : "No tasks yet — add one above."}
            </p>
          )}

          {filtered.map((task) => (
            <div
              key={task.id}
              className={`group flex items-center gap-4 bg-[#555] rounded-xl px-4 py-3.5 border transition-colors ${
                task.completed
                  ? "border-[#1f1e1c]"
                  : "border-[#252320] hover:border-[#2e2c29]"
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTask(task.id)}
                title={task.completed ? "Mark incomplete" : "Mark complete"}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  task.completed
                    ? "bg-white border-white"
                    : "border-white hover:border-white"
                }`}
              >
                {task.completed && <CheckIcon />}
              </button>

              {/* Text */}
              <span
                className={`flex-1 font-mono text-sm leading-relaxed transition-all ${
                  task.completed
                    ? "line-through text-white opacity-40 select-none"
                    : "text-white"
                }`}
              >
                {task.text}
              </span>

              {/* Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                title="Delete task"
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-[#2a2926] transition-all"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        {tasks.length > 0 && (
          <p className="mt-8 text-center font-mono text-[10px] tracking-[0.15em] uppercase text-[#333]">
            {remaining} remaining
          </p>
        )}
      </div>
    </div>
  );
}