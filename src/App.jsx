import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import MemberDetail from "./components/MemberDetail"; // Importere den nye profilsiden
import "./styles/Layout.scss";

function App() {
  return (
    <Router> {/*Pakker inn hele appen med Router slik at routing fungerer*/}
      <Header /> {/*Header vises alltid uansett hvilken route vi er på*/}
      <Routes>
        <Route path="/" element={<Home />} />  {/*Route for forsiden som viser gruppemedlemmene*/}
        <Route path="/team/:slug" element={<MemberDetail />} /> {/* Rute for individuelle profiler basert på slug*/}
      </Routes>
    </Router>
  );
}

export default App;