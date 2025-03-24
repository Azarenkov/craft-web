// frontend/src/App.tsx
import React from "react";
import SignInSide from "./sign-in-side/SignInSide";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <span>ASCII Art Generator</span>
        </nav>
      </header>
      <SignInSide />
    </div>
  );
};

export default App;
