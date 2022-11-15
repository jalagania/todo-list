import { useState } from "react";
import "./App.css";
import Attribution from "./components/Attribution";
import Header from "./components/Header";
import List from "./components/List";

function App() {
  const [darkMode, setDarkMode] = useState(false);

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
