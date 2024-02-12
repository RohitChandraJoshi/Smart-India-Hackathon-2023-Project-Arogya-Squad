import React, { useState } from "react";
import "../../../css/UserProfile/user.css";
import { Configuration, OpenAIApi } from "openai";
import { isAlphaOnly } from "../../js/isAlpha";
export default function TopicRecommendation() {
  const [text, setText] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [specilization, setspecilization] = useState("");
  const [keywords, setKeywords] = useState("");
  const [summarizedtext, setSummarizedtext] = useState("");
  const [loading, setLoading] = useState(false);
  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const handleSubmit = (e) => {
    console.log(process.env);
    setLoading(true);
    e.preventDefault();
    if (
      !isValidInput(areaOfInterest) ||
      !isValidInput(keywords) ||
      !isValidInput(specilization)
    ) {
      alert("please enter values for area of Interest and keywords");
      setLoading(false);
      return;
    }
    if (!isNaN(areaOfInterest) || !isNaN(keywords)) {
      alert("Please enter alphabets for keywords and area of interest");
      setLoading(false);
      return;
    }

    const prompt = generatePrompt(areaOfInterest, specilization, keywords);
    console.log(prompt);
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
        max_tokens: 100,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setSummarizedtext(res?.data?.choices[0]?.text);
        }
      })
      .catch((err) => {
        console.log(err, "An error occurred");
      });
  };

  const isValidInput = (input, fieldName) => {
    const isValid = typeof input === "string" && input.trim() !== "";
    if (!isValid) {
      console.error(
        `${fieldName} is invalid. Type: ${typeof input}, Value: "${input}"`
      );
    }
    return isValid;
  };

  const generatePrompt = (areaOfInterest, specilization, keywords) => {
    return `recomend 5 research topics for area of interest : ${areaOfInterest}\n ${specilization} and \nKeywords: ${keywords}\n`;
  };

  return (
    <div className="App_">
      <div className="topicheader">
        <h1 >
          Topic Recommender
        </h1>
        <h2  >
          Get Recommended Topic for your Research work using AI.
        </h2>
      </div>
      <div className="container">
        <div className="text_form">
          <form>
            <label>Area of Interest</label>
            <input
              type="text"
              placeholder="Enter your area of interest"
              value={areaOfInterest}
              onChange={(e) => setAreaOfInterest(e.target.value)}
            />
            <label>specilization</label>
            <input
              type="text"
              placeholder="Enter your Specilization"
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
              <button type="button" onClick={handleSubmit}>
                {loading ? "Loading..." : "Topics"}
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
            value={summarizedtext}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
