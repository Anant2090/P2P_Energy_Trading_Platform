import "./App.css";
import Home from "./components/pages/Home/Home";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import NoPage from "./components/pages/Nopage/NoPage";
import Layout from "./components/Layout";
import ProfilePictureCropper from "./components/pages/Profile Edit/ProfilePictureCropper";
import BuySell from "./components/pages/BuySell/Buysell";
import Search from "./components/pages/Search/Search";
import Tutorial from "./components/pages/Tutorial/Tutorial";

function App() {
  return (
    <div className="App " >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Trade" element={<BuySell/>} />
          <Route path="/About" element={<About />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Tutorial" element={<Tutorial />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Profile" element={<ProfilePictureCropper/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
{/* <Link to="/">Home</Link>
<Link to="/Trade">Trade</Link>
<Link to="/Tutorial">Search</Link>
<Link to="/Search">Tutorial</Link>
<Link to="/Contact">Contact</Link>
<Link to="/About">About</Link> */}