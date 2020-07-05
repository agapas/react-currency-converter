import React from "react";
import "App.css";
import { DataController } from "components/DataController";

export const API_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        Currency converter
      </header>
      <DataController url={API_URL} />
    </div>
  );
}

export default App;
