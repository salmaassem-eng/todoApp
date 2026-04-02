export default function TaskModal({ task, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-75">
        <h2 className="text-xl font-bold mb-2">{task.text}</h2>

        {/* Extra Data */}
        <p>Status: {task.completed ? "Completed" : "Pending"}</p>
        <p>ID: {task.id}</p>
        <p>Created: {new Date(task.id).toLocaleString()}</p>

        <button
          onClick={onClose}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}