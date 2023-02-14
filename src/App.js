import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Results from "./components/Results";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Results />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
