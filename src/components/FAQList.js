import React, { useState, useEffect } from "react";
import axios from "axios";

const FAQList = ({ faqs, setFaqs }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const { data } = await axios.get(`https://faq-backend-pl9a.onrender.com/api/faqs/?lang=${language}`);
        if (data?.cachedFaqs?.length > 0) setFaqs(data?.cachedFaqs);
        else setFaqs(data?.translatedFaqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFAQs();
  }, [language, setFaqs]);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
       <button onClick={() => setLanguage("hi")} style={{ marginRight: "10px" }}>FAQs in Hindi</button>
        <button onClick={() => setLanguage("en")} style={{ marginRight: "10px" }}>FAQs in English</button>
        <button onClick={() => setLanguage("bn")}>FAQs in Bengali</button>
      </div>

      {faqs?.length > 0 ? (
        <div>
          {faqs.map((faq, index) => (
            <div key={index} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
              <h3>{faq.question}</h3>
              <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          ))}
        </div>
      ) : (
        <div>No FAQs found</div>
      )}
    </div>
  );
};

export default FAQList;