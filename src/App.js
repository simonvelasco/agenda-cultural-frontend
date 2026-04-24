import "./App.css";
import { Home } from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EventsForm } from "./components/EventsForm";
import { LocalsForm } from "./components/LocalsForm";
import { ControlPanel } from "./components/ControlPanel";
import { EventDetail } from "./components/EventDetail";
import { Locals } from "./components/Locals";
import { LocalDetail } from "./components/LocalDetail";
import { Categorys } from "./components/Categorys";

function App() {
  return (
    <>
      <div className="frame">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-event" element={<EventsForm />} />
          <Route path="/add-local" element={<LocalsForm />} />
          <Route path="/admin" element={<ControlPanel />} />
          <Route path="/event-details/:eventId" element={<EventDetail />} />
          <Route path="/locals" element={<Locals/>} />
          <Route path="/local-details/:localName" element={<LocalDetail />} />
          <Route path="/category/:category" element={<Categorys />} /> 
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
