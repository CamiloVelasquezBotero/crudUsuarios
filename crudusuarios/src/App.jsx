import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './components/Inicio'
import Pokemons from './components/Pokemons'
import './App.css'
/* Context */
import { UsuariosProvider } from './context/usuariosProvider'

function App() {

  return (
    <BrowserRouter>
      <UsuariosProvider>
        <Routes>
          <Route path='/' element={<Inicio />}></Route>
          <Route path='/pokemons' element={<Pokemons />}></Route>
        </Routes>
      </UsuariosProvider>
    </BrowserRouter>
  )
}

export default App
