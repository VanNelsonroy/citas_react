import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarID = () => {
    const random = Math.random().toString(36).substring(2) 
    const fecha = Date.now().toString(36) 
    return fecha + random
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //validacion de form para campos vacios
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true)
      return;
    }

    //si todos los campos estan llenos oculta el msj de error
    setError(false)

    //objeto paciente creado desde el formulario
    const objPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id){
      //Editando registro
      objPaciente.id = paciente.id
      //recorre todos los pacientes, creando un nuevo objeto de pacientes y reemplazando el paciente ediatado
      const pacientesActu = pacientes.map( pacienteState => 
        pacienteState.id === paciente.id ? objPaciente : pacienteState)

        //Establece la nueva lista de pacientes.
        setPacientes(pacientesActu)
        
        //limpia el objeto de paciente seleccionado.
        setPaciente({})
    }else{
      //Nuevo registro
      /*los tres puntos en setPacientes, indican que sacamos copia del arreglo pacientes 
        y luego insertamos el nuevo objeto pacientes*/
      objPaciente.id = generarID()
      setPacientes([...pacientes, objPaciente])
    }

    //despues de insertar el objeto en la cola, se reinicia el form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">Añade Pacientes{' '}
        <span className="text-indigo-600 font-bold">administralos</span>
      </p>
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
          { error && <Error><p>Todos los campos son obligatorios test</p></Error> }
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota</label>
          <input id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
          <input id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
          <input id="email"
            type="email"
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Alta</label>
          <input id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}/>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Sintomas</label>
          <textarea id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)} />
        </div>
        <input type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={ paciente.id ? "Editar paciente" : "Agregar paciente" }
        />
      </form>
    </div>
  )
}

export default Formulario