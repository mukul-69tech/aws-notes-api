import { useState, useEffect } from "react";

const API = "https://6phth3bmdc.execute-api.ap-south-1.amazonaws.com/dev/notes";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setNotes(data);
  };

  const addNote = async () => {
    if (!note) return;

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note })
    });

    setNote("");
    getNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    getNotes();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white">
      
      {/* Glass Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-6 animate-fadeIn">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          Notes App 🔥
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your note..."
            className="flex-1 px-3 py-2 rounded-lg bg-white/20 outline-none placeholder-gray-300 focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            onClick={addNote}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-all duration-200 shadow-md"
          >
            Add
          </button>
        </div>

        {/* Notes List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {notes.map((n) => (
            <div
              key={n.id}
              className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              <span className="text-sm">{n.note}</span>
              <button
                onClick={() => deleteNote(n.id)}
                className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition-all duration-200"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;