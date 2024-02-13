import React, { useState } from "react";
import "../../../css/UserProfile/user.css";
import { Configuration, OpenAIApi } from "openai"; // Updated import statement

export default function TopicRecommendation() {
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [specilization, setspecilization] = useState("");
  const [keywords, setKeywords] = useState("");
  const [summarizedText, setSummarizedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (!isValidInput(areaOfInterest) || !isValidInput(keywords) || !isValidInput(specilization)) {
      alert("Please enter values for area of interest, specialization, and keywords.");
      setLoading(false);
      return;
    }

    if (!isAlphaOnly(areaOfInterest) || !isAlphaOnly(specilization) || !isAlphaOnly(keywords)) {
      alert("Please enter alphabets only for area of interest, specialization, and keywords.");
      setLoading(false);
      return;
    }

    const prompt = generatePrompt(areaOfInterest, specilization, keywords);

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_KEY,
    });
    const openai = new OpenAIApi(configuration);

    openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 100,
    })
    .then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setSummarizedText(res?.data?.choices[0]?.text);
      }
    })
    .catch((err) => {
      console.error("An error occurred:", err);
    });
  };

  const isValidInput = (input) => {
    return typeof input === "string" && input.trim() !== "";
  };

  const isAlphaOnly = (input) => {
    const regex = /^[a-zA-Z\s,]+$/;
    return regex.test(input);
  };

  const generatePrompt = (areaOfInterest, specialization, keywords) => {
    return `Recommend 5 research topics for Area of Interest: ${areaOfInterest}, Specialization: ${specialization}, Keywords: ${keywords}`;
  };

  return (
    <div className="App_">
      <div className="topicheader">
        <h1>Topic Recommender</h1>
        <h2>Get Recommended Topics for Your Research Work using AI</h2>
      </div>
      <div className="container">
        <div className="text_form">
          <form onSubmit={handleSubmit}>
            <label>Area of Interest</label>
            <input
              type="text"
              placeholder="Enter your area of interest"
              value={areaOfInterest}
              onChange={(e) => setAreaOfInterest(e.target.value)}
            />
            <label>Specialization</label>
            <input
              type="text"
              placeholder="Enter your specialization"
              value={specilization}
              onChange={(e) => setspecilization(e.target.value)}
            />
            <label>Keywords</label>
            <input
              type="text"
              placeholder="Enter keywords (comma-separated)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
            <div>
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Recommend Topics"}
              </button>
            </div>
          </form>
        </div>
        <div className="summarized_text">
          <label>Recommended Topics</label>
          <textarea
            placeholder="Topics"
            cols={80}
            rows={14}
            value={summarizedText}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
