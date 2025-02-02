import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FAQEditor = ({ onSubmit }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit(question, answer);
      setQuestion("");
      setAnswer("");
    } catch (error) {
      console.error("Error submitting FAQ:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <label>Question:</label>
        <input
          type="text"
          placeholder="Enter question in either English, Hindi, or Bengali language!"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Answer:</label>
        <ReactQuill
          value={answer}
          onChange={setAnswer}
          style={{ height: "200px", marginTop: "5px" }}
        />
      </div>
      <div style={{ textAlign: "right" }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "10px 20px",
            backgroundColor: isSubmitting ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            marginTop: "40px",
          }}
        >
          {isSubmitting ? "Adding..." : "Add FAQ"}
        </button>
      </div>
    </form>
  );
};

export default FAQEditor;
