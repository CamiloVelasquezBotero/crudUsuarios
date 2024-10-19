import { useState, useEffect } from 'react'
import useUsuarios from '../hooks/useUsuarios'
import RegistroUsuarios from "./RegistroUsuarios"

const Inicio = () => {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [telefono, setTelefono] = useState("")
    const [direccion, setDireccion] = useState("")

    /* const [mensaje, setMensaje] = useState("") */
    const [estadoBoton, setEstadoBoton] = useState("Agregar")

    const [ telefonoUsuario, setTelefonoUsuario] = useState("");
    
    const { usuarios,
        crearUsuario, obtenerUsuarios,
        isTableOpen, openTable,
        openBuscar, isBuscarOpen,
        buscarUsuario, editarUsuario, eliminarUsuario
        } = useUsuarios()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(estadoBoton == "Agregar") {
            const datos = {
                nombre,
                email,
                telefono,
                direccion
            }
            crearUsuario(datos);
            
        } else if(estadoBoton == "Editar") {
            const usuarioEncontrado = await usuarios.filter(usuario => usuario.telefono == telefono);
            
            const datos = {
                "id": usuarioEncontrado[0].id,
                "nombre": nombre,
                "email": email,
                "telefono": telefono,
                "direccion": direccion
            }
            editarUsuario(datos);
        }
    }

    const handleAbrirTabla = () => {
        openTable()
    }
    const handleBuscar = () => {
        openBuscar()
    }
    const handleAgregar = () => {
        if(isBuscarOpen) {
            openBuscar()
        }
        setEstadoBoton("Agregar") 
        /* Reiniciar campos */
        setNombre("")
        setEmail("")
        setTelefono("")
        setDireccion("")
    }
    const handleEditar = () => {
        setEstadoBoton("Editar")
    }
    const handleEliminar = async () => {
        eliminarUsuario(telefono)
    }
    const handleSubmitBuscar = async(e) => {
        e.preventDefault();
        const busqueda = await buscarUsuario(telefonoUsuario);
        
        if (busqueda.encontrado){
            setNombre(busqueda.usuario.nombre)
            setEmail(busqueda.usuario.email)
            setTelefono(busqueda.usuario.telefono)
            setDireccion(busqueda.usuario.direccion)
        } else {
            console.log("No fue encontrado")
        }
    }


  return (
    <div className={`flex duration-500 ${isTableOpen ? 'translate-x-0 justify-between' : 'justify-center items-center'}`}>

        {/* -------- Form de Registro */}
        <section className={`w-full flex flex-col items-center `}>
            <div className='flex-col w-4/5'>
            
                <div className=''>
                    <h1 className='rounded-xl my-2 bg-blue-500 justify-center text-3xl p-3 font-bold'>Aministrador De Usuarios</h1>
                </div>
                <div className='bg-gray-300 mt-10 p-5 rounded-xl'>
                    {isBuscarOpen && (
                        <form action="" name='buscar'>
                            <label htmlFor="buscar" className='font-bold text-xl mr-5'>Buscar:</label>
                            <input type="text" value={telefonoUsuario} onChange={e => setTelefonoUsuario(e.target.value)} 
                            id='buscar' placeholder='Email Usuario' className='border border-black p-1'/>
                            <button type='submit' className='ml-4 p-2 bg-green-500 rounded-md' onClick={handleSubmitBuscar}>Buscar</button>
                        </form>
                    )}
                    <form action="" className='flex-col '>
                        <div className='m-5 text-xl'>
                            <label htmlFor="nombre" className='bg-blue-400 p-1 rounded-xl mr-5'>Nombre</label>
                            <input className={isTableOpen ? 'border border-black' : 'p-1 border border-black '} name='nombre' id='nombre' type="text" value={nombre} onChange={e => setNombre(e.target.value)}/>
                        </div>
                        <div className='mt-5 text-xl'>
                            <label htmlFor="nombre" className='mr-12 bg-blue-400 p-1 rounded-xl mr-5 justify-start'>Email</label>
                            <input className={isTableOpen ? 'border border-black' : 'p-1 border border-black '} name='email' id='nombre' type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className={isTableOpen ? ' m-5 text-xl' : 'm-5 text-xl'}>
                            <label htmlFor="nombre" className='bg-blue-400 p-1 rounded-xl mr-5'>Telefono</label>
                            <input className={isTableOpen ? 'border border-black' : 'ml-1 p-1 border border-black '} name='telefono' id='nombre' type="text" value={telefono} onChange={e => setTelefono(e.target.value)}/>
                        </div>
                        <div className='m-5 text-xl'>
                            <label htmlFor="nombre" className={isTableOpen ? '-ml-3 bg-blue-400 p-1 rounded-xl mr-5' : 'bg-blue-400 p-1 rounded-xl mr-5'}>Direccion</label>
                            <input className={isTableOpen ? 'border border-black' : 'p-1 border border-black '} name='direccion' id='nombre' type="text" value={direccion} onChange={e => setDireccion(e.target.value)}/>
                        </div>
                        <button type='submit'className='bg-green-500 rounded-lg p-3 text-xl' onClick={handleSubmit}>{estadoBoton}</button>
                    </form>
                </div>

                <button className='mt-10 p-5 bg-green-500 rounded-md font-bold text-xl' onClick={handleAbrirTabla}>Abrir Tabla De Registros</button>
            </div>
        </section>

        <section className={isTableOpen ? 'flex flex-col mt-20 -ml-5 mr-5 duration-300 translate-x-0' : 'translate-x-10 flex flex-col mr-40'}>
            <p className='p-2 bg-blue-500 font-bold text-xl rounded-md mb-10'>Opciones</p>

            <button className='bg-green-500 p-2 rounded-md m-1' onClick={handleBuscar}>Buscar</button>
            <button className='bg-green-500 p-2 rounded-md m-1' onClick={handleAgregar}>Agregar</button>
            <button className='bg-green-700 p-2 rounded-md m-1' onClick={handleEditar}>Editar</button>
            <button className='bg-red-400 p-2 rounded-md m-1' onClick={handleEliminar}>Eliminar</button>
        </section>

        {/* -------- Listado de Usuarios */}
        <section className={`transition duration-500 ${isTableOpen ? 'translate-x-0 md:w-3/6' : 'translate-x-full'}`}>
            {isTableOpen && (
                <div>
                    <RegistroUsuarios /> 
                </div>
            )}
        </section>

    </div>
  )
}

export default Inicio