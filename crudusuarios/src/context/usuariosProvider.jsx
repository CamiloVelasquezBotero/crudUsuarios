import { createContext, useState, useEffect, Children } from 'react';
import axios from 'axios'

const UsuariosContext = createContext();

const UsuariosProvider = ({children}) => {
    const [usuarios, setUsuarios] = useState([]);
    const [isTableOpen, setIsTableOpen] = useState(false);
    const [isBuscarOpen, setlIsBuscarOpen] = useState(false);

    const crearUsuario = async datos => {
        try {
            const respuesta = await axios.post('http://localhost/conexion/consultas.php', datos, {
                headers: {
                    'Content-Type': 'application/json' // Especificamos que estás enviando JSON
                }
            });
            console.log(respuesta);
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerUsuarios = async () => {
        try {
            const respuesta = await axios('http://localhost/conexion/consultas.php');
            setUsuarios(respuesta.data)
        } catch (error) {
            console.log(error)
        }
    }

    const buscarUsuario = async (usuarioTelefono) => {
        await obtenerUsuarios();

        const encontrado = await usuarios.find(usuario => usuario.telefono === usuarioTelefono);
        
        if(encontrado) {
            const datos = {
                encontrado: true,
                usuario: encontrado
            }
            return datos
        } else {
            const datos = {
                encontrado: false,
                "message": "Usuario no encontrado"
            }
            return datos
        }
    }

    const editarUsuario = async datos => {
        await obtenerUsuarios();

        const encontrado = await usuarios.find(usuario => usuario.telefono === datos.telefono);

        if(encontrado) {
            try {
                const respuesta = await axios.put('http://localhost/conexion/consultas.php', datos, {
                    headers: {
                        'Content-Type': 'application/json' // Especificamos que estás enviando JSON
                    }
                });
                console.log(respuesta);
            } catch (error) {
                console.log(error)
            }
        } else {
            const datos = {
                validacion: false,
                "mensaje": "Usuario no encontrado"
            }
            return datos
        }

    }

    const eliminarUsuario = async (usuarioTelefono) => {
        try {
            const respuesta = await axios.delete(`http://localhost/conexion/consultas.php?id=${usuarioTelefono}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: { id: usuarioTelefono } // Enviamos el ID en el cuerpo de la solicitud
            });
            console.log(respuesta.data);
            // Actualizamos la lista de usuarios después de la eliminación
            obtenerUsuarios();
        } catch (error) {
            console.log(error);
        }
    };
    
    const openTable = () => {
        setIsTableOpen(!isTableOpen);
    }
    const openBuscar = () => {
        setlIsBuscarOpen(!isBuscarOpen);
    }


    return (
        <UsuariosContext.Provider
            value={{
                usuarios,
                crearUsuario,
                obtenerUsuarios,
                isTableOpen,
                openTable,
                isBuscarOpen,
                openBuscar,
                buscarUsuario,
                editarUsuario,
                eliminarUsuario
            }}
        >
            {children}
        </UsuariosContext.Provider>
    )
}

export { UsuariosProvider }
export default UsuariosContext