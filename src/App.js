import { useState, useEffect } from "react";
import "./App.css";
import Attribution from "./components/Attribution";
import Header from "./components/Header";
import List from "./components/List";

function App() {
  const DARKMODE = localStorage.getItem("DARKMODE")
    ? JSON.parse(localStorage.getItem("DARKMODE"))
    : false;
  const [darkMode, setDarkMode] = useState(DARKMODE);

  // Add App Theme To Local Storage
  useEffect(() => {
    localStorage.setItem("DARKMODE", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    document.body.className = DARKMODE ? "dark-theme" : "";
  }, []);

  function handleMoonClick() {
    setDarkMode(true);
    document.body.classList.add("dark-theme");
  }

  function handleSunClick() {
    setDarkMode(false);
    document.body.classList.remove("dark-theme");
  }

  return (
    <div className="container">
      <Header
        darkMode={darkMode}
        handleMoonClick={handleMoonClick}
        handleSunClick={handleSunClick}
      />
      <List />
      <Attribution />
    </div>
  );
}

export default App;
