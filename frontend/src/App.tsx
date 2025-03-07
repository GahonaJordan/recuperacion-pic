import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Inicio } from "./pages/Inicio";
import { Roles } from "./pages/Roles";
import { Usuarios } from "./pages/Usuario";
import { Talleres } from "./pages/Taller";
import { Vehiculos } from "./pages/Vehiculo";
import { Servicios } from "./pages/Servicio";
import { Notificaciones } from "./pages/Notificacion";
import { Reportes } from "./pages/Reporte";
import { Asignarroles } from "./pages/asignarrol";
import { Dashboard } from "./pages/dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-m-4">
        <Routes>
          <Route path="/" element={<Inicio />} /> 
          <Route path="/roles" element={<Roles />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/asignarrol" element={<Asignarroles />} />
          <Route path="/talleres" element={<Talleres />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/servicio_taller" element={<Servicios />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;