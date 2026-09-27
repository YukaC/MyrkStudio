import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MULTI_BASE } from "./content";
import { MultiPageLayout } from "./layouts/MultiPageLayout";
import { SinglePageLayout } from "./layouts/SinglePageLayout";
import { CanalesPage } from "./pages/CanalesPage";
import { EscaletaPage } from "./pages/EscaletaPage";
import { EstudioPage } from "./pages/EstudioPage";
import { FaqPage } from "./pages/FaqPage";
import { LorePage } from "./pages/LorePage";
import { MultiHomePage } from "./pages/MultiHomePage";
import { SeriePage } from "./pages/SeriePage";
import { StaffPage } from "./pages/StaffPage";
import { WhitelistPage } from "./pages/WhitelistPage";

/**
 * Demo variants:
 *   `/`     — classic single-page scroll
 *   `/m/*`  — one section = one page (despejado)
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SinglePageLayout />} />

        <Route path={MULTI_BASE} element={<MultiPageLayout />}>
          <Route index element={<MultiHomePage />} />
          <Route path="serie" element={<SeriePage />} />
          <Route path="lore" element={<LorePage />} />
          <Route path="escaleta" element={<EscaletaPage />} />
          <Route path="estudio" element={<EstudioPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="canales" element={<CanalesPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="whitelist" element={<WhitelistPage />} />
          {/* Legacy aliases from first multi draft */}
          <Route path="equipo" element={<Navigate to={`${MULTI_BASE}/staff`} replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
