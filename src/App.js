import React, { useState } from "react";
import FAQEditor from "./components/FAQEditor";
import FAQList from "./components/FAQList";
import axios from "axios";

const App = () => {
  const [faqs, setFaqs] = useState([]);
  const [notification, setNotification] = useState("");

  const handleAddFAQ = async (question, answer) => {
    try {
      const response = await axios.post("https://faq-backend-pl9a.onrender.com/api/faqs", { question, answer });
      setNotification("FAQ added successfully");
      setFaqs([...faqs, response.data]);
      setTimeout(() => {
        setNotification("");
      }, 3000);
    } catch (error) {
      console.error("Error adding FAQ:", error);
      setNotification("Error adding FAQ");
      setTimeout(() => {
        setNotification("");
      }, 3000);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>FAQ Management</h1>
      {notification && <div style={{ marginBottom: "20px", color: "green" }}>{notification}</div>}
      <FAQEditor onSubmit={handleAddFAQ} />
      <FAQList faqs={faqs} setFaqs={setFaqs} />
    </div>
  );
};

export default App;