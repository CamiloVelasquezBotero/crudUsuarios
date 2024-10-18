import { useEffect } from 'react'
import useUsuarios from "../hooks/useUsuarios"

const RegistroUsuarios = () => {
const { usuarios, obtenerUsuarios } = useUsuarios();

  useEffect(() => {
    /* Obtener usuarios apenas se recargue la pagina */
    obtenerUsuarios();
  },[])

  return (
    <div className="container p-4 w-full">
            <h1 className="text-2xl font-bold mb-4">Registro de Usuarios</h1>

            {/* Table */}
            <div className="overflow-y-auto h-96 pr-5 pb-5 rounded-xl">
                <table className="min-w-full bg-gray-100 p-10">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">Nombre</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Teléfono</th>
                            <th className="py-2 px-4">Dirección</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios?.length ? (
                          usuarios.map(usuario => (
                            <tr key={usuario.id} className="text-center border-b">
                              <td className="py-2 px-4">{usuario.id}</td>
                              <td className="py-2 px-4">{usuario.nombre || 'Sin Nombre'}</td>
                              <td className="py-2 px-4">{usuario.email || 'Sin Email'}</td>
                              <td className="py-2 px-4">{usuario.telefono || 'Sin Teléfono'}</td>
                              <td className="py-2 px-4">{usuario.direccion || 'Sin Dirección'}</td>
                            </tr>
                          ))
                        ) : (
                          <p className="my-5 p-10">No hay usuarios registrados, ingresa uno</p>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default RegistroUsuarios