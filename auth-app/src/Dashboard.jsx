import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const API = "https://6phth3bmdc.execute-api.ap-south-1.amazonaws.com/dev/notes"; // 🔥 yaha apna URL daal

function Dashboard({ user }) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const res = await fetch(API);
    const data = await res.json();

    // 🔥 user-wise filter (important)
    const filtered = data.filter((n) => n.email === user.email);
    setNotes(filtered);
  };

  const addNote = async () => {
    if (!note) return;

    await fetch(API, {
      method: "POST",
      body: JSON.stringify({
        note,
        email: user.email, // 🔥 user attach
      }),
    });

    setNote("");
    getNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    getNotes();
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#1e1b4b] via-[#4c1d95] to-[#0f172a] text-white">
      <div className="max-w-md mx-auto">

        <h1 className="text-2xl mb-2">Welcome {user.email}</h1>

        <button
          onClick={logout}
          className="mb-4 bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>

        {/* Add note */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 p-2 rounded text-black"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter note..."
          />
          <button
            onClick={addNote}
            className="bg-green-500 px-3 rounded"
          >
            Add
          </button>
        </div>

        {/* Notes list */}
        {notes.map((n) => (
          <div
            key={n.id}
            className="flex justify-between bg-white/10 p-2 mb-2 rounded"
          >
            <span>{n.note}</span>
            <button
              onClick={() => deleteNote(n.id)}
              className="bg-red-500 px-2 rounded"
            >
              X
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Dashboard;