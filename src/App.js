import React from "react";
import "App.css";
import { CurrencyForm } from "components/CurrencyForm";

const API_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        Currency converter
      </header>
      <CurrencyForm url={API_URL} />
    </div>
  );
}

export default App;
