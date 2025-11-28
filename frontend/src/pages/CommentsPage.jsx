import React, { useState, useEffect } from "react";
import { Filter } from "bad-words";
import { useNavigate } from "react-router-dom";
import "../App.css";

const filter = new Filter();

function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("myCyberNotes");
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
  if (comments.length > 0) {
    localStorage.setItem("myCyberNotes", JSON.stringify(comments));
  }
}, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const cleanText = filter.clean(text);

    const newNote = {
      id: Date.now(),
      text: cleanText,
      timestamp: new Date().toISOString(),
    };

    setComments([newNote, ...comments]);
    setText("");
  };

  const handleDelete = (id) => {
    const updated = comments.filter((c) => c.id !== id);
    setComments(updated);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all notes?")) {
      setComments([]);
      localStorage.removeItem("myCyberNotes");
    }
  };

  const handleExit = () => {
    if (window.confirm("Exit My Cyber Notes and return home?")) {
      navigate("/");
    }
  };

  return (
    <div className="cyber-container bg-gradient-primary">
      <h2
        className="text-gradient-primary flex-center"
        style={{
          fontSize: "2.5rem",
          padding: "20px 0",
          letterSpacing: "2px",
          animation: "pulse 2s infinite",
        }}
      >
        My Cyber Notes
      </h2>

      {/* Guidelines */}
      <div className="glass-card guidelines" style={{ marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "12px" }}>Tips & Topics to Write About</h3>
        <ul style={{ lineHeight: "1.8", fontSize: "1.1rem" }}>
          <li>🌟 Daily reflections — what went well today?</li>
          <li>🎯 Goals — short-term or long-term plans you want to track.</li>
          <li>💡 Ideas — creative sparks, project concepts, or inventions.</li>
          <li>📚 Learning notes — summarize something new you discovered.</li>
          <li>😊 Gratitude list — things you’re thankful for right now.</li>
          <li>🕹️ Fun memories — favorite games, shows, or personal experiences.</li>
          <li>🚀 Challenges — obstacles you’re facing and how you might overcome them.</li>
        </ul>
      </div>

      {/* Note form */}
      <form onSubmit={handleSubmit} className="comment-form glass-card" style={{ marginBottom: "20px" }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts..."
          rows="3"
          className="input-field"
          style={{ marginBottom: "10px" }}
        />
        <button type="submit" className="btn-primary">
          Save Note
        </button>
      </form>

      {/* Notes list */}
      <div className="comments-list">
        {comments.map((c) => (
          <div key={c.id} className="comment-card glass-card" style={{ marginBottom: "15px" }}>
            <p className="comment-text">{c.text}</p>
            <small className="text-secondary">
              {new Date(c.timestamp).toLocaleString()}
            </small>
            <button
              onClick={() => handleDelete(c.id)}
              className="btn-secondary small-btn"
              style={{ marginTop: "8px" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Bottom controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        {comments.length > 0 && (
          <button
            onClick={handleClearAll}
            className="btn-secondary small-btn"
          >
            Clear All Notes
          </button>
        )}
        <button
          onClick={handleExit}
          className="btn-exit"
        >
          Exit
        </button>
      </div>
    </div>
  );
}

export default CommentsPage;
