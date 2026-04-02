import { useState, useEffect } from "react";
import TaskModal from "../components/TaskDetail";
import { useParams } from "react-router-dom";

const STORAGE_KEY = "dm_todos_v1";

function loadTasks() {
  try {
     const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : []; 
  } catch {
    return [];
  }
}

export default function Tasks() {
const [tasks, setTasks] = useState(() => loadTasks());
  const [selectedTask, setSelectedTask] = useState(null);

  const { id } = useParams();

useEffect(() => {
  if (!id) return;

  const saved = loadTasks();
  const task = saved.find((t) => t.id === Number(id));
  if (task) { setSelectedTask(task);}
}, [id]);

  return (
    <div className="p-10 grid grid-cols-2 gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          onClick={() => setSelectedTask(task)}
          className="bg-[#555] text-white p-4 rounded cursor-pointer"
        >
          <h3 className="text-lg">{task.text}</h3>
          <p>{task.completed ? "✅ Completed" : "❌ Not yet"}</p>
        </div>
      ))}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}