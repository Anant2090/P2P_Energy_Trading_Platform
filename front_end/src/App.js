import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import NoPage from "./components/pages/NoPage";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
