import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import DetalheOficina from './pages/DetalheOficina'
import CadastroOficina from './pages/CadastroOficina'
import CadastroVeiculo from './pages/CadastroVeiculo'
import DetalheVeiculo from './pages/DetalheVeiculo'
import Backup from './pages/Backup'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/oficina/:id" element={<DetalheOficina />} />
      <Route path="/oficina/nova" element={<CadastroOficina />} />
      <Route path="/oficina/:id/editar" element={<CadastroOficina />} />
      <Route path="/oficina/:oficinaId/veiculo/novo" element={<CadastroVeiculo />} />
      <Route path="/veiculo/:id/editar" element={<CadastroVeiculo />} />
      <Route path="/veiculo/:id" element={<DetalheVeiculo />} />
      <Route path="/backup" element={<Backup />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
