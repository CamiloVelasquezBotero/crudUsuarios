import { createContext, useState, useEffect } from 'react';
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
            obtenerUsuarios()
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
        const encontrado = usuarios.find(usuario => usuario.id === datos.id);
        if(encontrado) {
            try {
                const respuesta = await axios.put('http://localhost/conexion/consultas.php', datos, {
                    headers: {
                        'Content-Type': 'application/json' // Especificamos que estás enviando JSON
                    }
                });
                obtenerUsuarios();
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

    const eliminarUsuario = async (telefono) => {
        const encontrado = await usuarios.filter(usuario => usuario.telefono == telefono)
        const id = encontrado[0].id;
        try {
            // Hacemos la solicitud DELETE a la API
            const respuesta = await axios.delete('http://localhost/conexion/consultas.php', {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: { id } // Enviamos el ID en el cuerpo de la solicitud
            });
    
            console.log(respuesta.data); // Verificar la respuesta del servidor
            // Actualizamos la lista de usuarios después de la eliminación
            obtenerUsuarios(); // Vuelve a cargar la lista de usuarios
            return {
                "validacion": true,
                "mensaje":"Eliminado"
            }
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