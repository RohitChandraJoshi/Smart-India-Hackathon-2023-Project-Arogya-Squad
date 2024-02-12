import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@material-ui/core";
import Body from "./home-body";
import Footer from "../Common/Footer";
import Popup from "./popup"; // Import your Popup component
import LogoLeft from "G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/Components/Dashboard/Home/Assets/ministryofayushlogo.jpg"; // Import your left logo
import LogoRight from "G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/Components/Dashboard/Home/Assets/sihlogo.jpg"; // Import your right logo

function WelcomeText() {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #000000, #3b3b3b)",
        color: "white",
        padding: "10px",
        textAlign: "center",
        fontSize: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "bold",
        letterSpacing: "-1px", // Adjust letter spacing here
      }}
    >
      <div style={{ border: "2px solid black", padding: "5px" }}>
        <img src={LogoLeft} alt="Left Logo" style={{ height: "70px" }} />
      </div>
      <h1 style={{ fontSize: "30px", fontWeight: "500", textTransform: "uppercase", color: "white" }}>
        <span style={{ backgroundColor: "#c50000", borderRadius: "0.25rem", display: "inline-block", height: "0.25rem", width: "42px", marginBottom: "1.25rem" }}></span>
        Welcome to Smart University Portal
      </h1>
      <div style={{ border: "2px solid black", padding: "5px" }}>
        <img src={LogoRight} alt="Right Logo" style={{ height: "70px" }} />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <section style={{ backgroundColor: "#F5F5F5" }}>
      <WelcomeText />
      <Popup /> {/* Add the Popup component */}
      <Body />
      <Footer />
    </section>
  );
}

export default HomePage;
