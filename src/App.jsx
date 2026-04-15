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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ note })
    });

    setNote("");
    getNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });
    getNotes();
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Notes App 🔥</h2>

      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter note"
      />
      <button onClick={addNote}>Add</button>

      <ul>
        {notes.map((n) => (
          <li key={n.id}>
            {n.note}
            <button onClick={() => deleteNote(n.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
