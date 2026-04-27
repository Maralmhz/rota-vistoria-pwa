import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import DetalheOficina from './pages/DetalheOficina'
import CadastroOficina from './pages/CadastroOficina'
import CadastroVeiculo from './pages/CadastroVeiculo'
import DetalheVeiculo from './pages/DetalheVeiculo'
import Backup from './pages/Backup'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:24,color:'red',background:'#0f172a',minHeight:'100vh'}}>
          <h1 style={{color:'#ef4444'}}>Erro ao carregar app</h1>
          <pre style={{color:'#fca5a5',fontSize:12,whiteSpace:'pre-wrap'}}>
            {this.state.error?.toString()}
            {this.state.error?.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}
