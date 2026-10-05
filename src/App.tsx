import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SinglePageLayout } from "./layouts/SinglePageLayout";

/** Canonical site: single scroll on `/`. Legacy `/m/*` redirects home. */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SinglePageLayout />} />
        <Route path="/m/*" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
