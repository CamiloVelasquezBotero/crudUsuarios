import { useContext } from 'react'
import UsuariosContext from '../context/usuariosProvider'

const useUsuarios = () => {
    return useContext(UsuariosContext)
}

export default useUsuarios