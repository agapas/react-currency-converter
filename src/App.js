import React from "react";
import "App.css";
import { DataController } from "components/DataController";

// export const API_URL = "https://api.exchangeratesapi.io/latest";
/*
  "https://api.exchangeratesapi.io/latest" doesn't work since 1st April 2021
  and currently it returns:
  {
    "success": false,
    "error": {
      "code": 101,
      "type": "missing_access_key",
      "info": "You have not supplied an API Access Key. [Required format: access_key=YOUR_ACCESS_KEY]"
    }
  }
*/

const API_ACCESS_KEY = "YOUR_API_ACCESS_KEY";
export const API_URL = `https://api.exchangeratesapi.io/v1/latest?access_key=${API_ACCESS_KEY}`;

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
