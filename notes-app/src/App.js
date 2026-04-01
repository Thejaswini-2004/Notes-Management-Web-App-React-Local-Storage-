import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes"));
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    setActiveNote(null);
    setContent("");
  };

  const saveNote = () => {
    if (content.trim() === "") return;

    if (activeNote !== null) {
      const updated = [...notes];
      updated[activeNote] = content;
      setNotes(updated);
    } else {
      setNotes([...notes, content]);
    }

    setContent("");
    setActiveNote(null);
  };

  const editNote = (index) => {
    setActiveNote(index);
    setContent(notes[index]);
  };

  const deleteNote = (index) => {
    const filtered = notes.filter((_, i) => i !== index);
    setNotes(filtered);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Notes</h2>
        <button onClick={createNewNote}>+ New Note</button>

        {notes.map((note, index) => (
          <div key={index} className="note-item">
            <p onClick={() => editNote(index)}>
              {note.substring(0, 20)}...
            </p>
            <button onClick={() => deleteNote(index)}>X</button>
          </div>
        ))}
      </div>

      <div className="editor">
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={saveNote}>Save</button>
      </div>
    </div>
  );
}

export default App;