// src/RouterRoot.jsx
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Gate from "./routes/Gate";
import Play from "./routes/Play";
import Spectate from "./routes/Spectate";

export default function RouterRoot() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/gate" element={<Gate />} />
        <Route path="/play" element={<Play />} />
        <Route path="/spectate" element={<Spectate />} />
        <Route path="*" element={<Navigate to="/gate" replace />} />
      </Routes>
    </HashRouter>
  );
}
