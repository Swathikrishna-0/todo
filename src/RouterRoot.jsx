// src/RouterRoot.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Gate from "./routes/Gate";
import Play from "./routes/Play";
import Spectate from "./routes/Spectate";

export default function RouterRoot() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/gate" element={<Gate />} />
        <Route path="/play" element={<Play />} />
        <Route path="/spectate" element={<Spectate />} />
        <Route path="*" element={<Navigate to="/gate" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
