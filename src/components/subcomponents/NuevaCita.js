import React, {useEffect, useState, useContext} from 'react';
import {agregarEvento} from '../../helper';
import {useHistory} from "react-router-dom";
import {useFormik} from 'formik';
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';
import {FirebaseContext} from '../../firebase/Auth';


const NuevaCita = () => {

    const [expedientes, guardarExpedientes] = useState([]);
    const {firebase} = useContext(FirebaseContext);

    const history = useHistory();

     //Consultar la base de datos al cargar 
     useEffect(() => {
        const obtenerExpedientes =  () => {
            
            firebase.db.collection('expedientes').onSnapshot(manejarSnapshot);//Snapshot para ver los cambios en tiempo real y get para ver solamnente los cambios
       
        }
        obtenerExpedientes();
    },[firebase]);


    //Snapshop nos permite usar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const expedientes = snapshot.docs.map(doc => {
            return{
                id: doc.id,
                ...doc.data()
            }
        });
        //Almacenar los resultados en el state
        guardarExpedientes(expedientes);
    }

    const formik = useFormik({
        initialValues : {
            paciente: '',
            fecha: '',
            hora: '',
            descripcion: '',
        },


        onSubmit: cita => {
            try {
                const mes = obtenerMes(cita.fecha);
                const year = obtenerYear(cita.fecha);

                cita.year = year;
                cita.mes = mes;
                

                //Se pasa el id del cliente
                //idExpediente = cita.paciente;

                //Consultar datos para obtener el nombre y cooreo 
                cita.atendida = false;
                
                obtenerDatoExpediente(cita.paciente, cita.fecha, cita.hora, cita.descripcion, cita.atendida, cita.year, cita.mes);
               // console.log(objectExpediente);

                //firebase.db.collection('citas').add(cita);

            } catch (error) {
                console.log(error);
            }
        }

    });

    function obtenerYear(fecha){
        console.log(fecha);
        const fechaq = fecha;


        const result = fechaq.slice(0,4);

        return result;

    }

    function obtenerMes(fecha){
        console.log(fecha);
        const fechaq = fecha;


        const result = fechaq.slice(5,7);

        return result;

    }

    async function obtenerDatoExpediente (id, fecha, hora, descripcion, atendida,  year, mes) {
        

        const expRef = await firebase.db.collection('expedientes').doc(id);
        const getDoc = await expRef.get();
        
            if (!getDoc.exists) {
                console.log('No such document!');
            } else {
                //console.log('Document data:', getDoc.data());
                ///console.log(getDoc.data().nombre);
               /// console.log(getDoc.data().apellidos);
                ///console.log(getDoc.data().correo); 

                await firebase.db.collection('citas').add({
                    idPaciente: id,
                    nombre: getDoc.data().nombre,
                    apellido: getDoc.data().apellidos,
                    correo: getDoc.data().correo,
                    fecha: fecha,
                    hora: hora,
                    descripcion: descripcion,
                    atendida: atendida,
                    yearCita: year,
                    mesCita: mes,

                });  
                //Validar si quiere agregarlo a su calendario
                agregarEvento(getDoc.data().nombre, getDoc.data().apellidos, getDoc.data().correo, fecha, hora, descripcion);
                history.push({
                    pathname: "/visualizar-citas",
                    //state: { detail: perfil }
                });
            }
    }


    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-screen">
                <Barra/>

                <div className="flex justify-center">

                    <form 
                        className="w-11/12 pb-20"
                        onSubmit={formik.handleSubmit}
                    >

                        <div className=" flex">

                            <div className=" w-1/2 flex justify-start items-center">
                                <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Nueva Cita</p>
                            </div>
                            
                            <div className="hidden sm:w-1/2 sm:flex sm:justify-end sm:items-center sm:pr-12 sm:pt-6">
                                <button
                                    className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                    type="submit"
                                >
                                Guardar</button>
                            </div>

                        </div>

                        <div className="bg-white mt-8 pb-8">

                            <div className="">
                                <p className="font-source font-bold text-xl pl-12 pt-3">Ingresa los datos para la cita</p>
                            </div>

                            <div className="flex justify-center sm:justify-start mt-6">
                                <label className="hidden sm:flex sm:w-3/12 font-source text-tercerColor sm:pl-12">Nombre de paciente: </label>
                                <select
                                    className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                    id="paciente"
                                    required
                                    value={formik.values.paciente}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">- Seleccione -</option>
                                    {expedientes.map(expediente => (
                                        <option key={expediente.id} value={expediente.id}>{expediente.nombre +" "}{expediente.apellidos}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-center sm:justify-start mt-6">

                                <label className="hidden sm:flex sm:w-3/12 font-source text-tercerColor pl-12">Fecha</label>
                                <input
                                    required
                                    type="date"
                                    name="fecha"
                                    className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                    value={formik.values.fecha}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                            </div>

                            <div className="flex justify-center sm:justify-start mt-6">
                                <label className="hidden sm:flex sm:w-3/12 font-source text-tercerColor pl-12">Hora</label>
                                <input
                                    required
                                    type="time"
                                    name="hora"
                                    className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                    value={formik.values.hora}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    
                                />
                            </div>

                            <div className="flex justify-center sm:justify-start mt-6">
                                <label htmlFor="descripcion" className="hidden sm:flex sm:w-3/12 font-source text-tercerColor pl-12">Descripción: </label>
                                <textarea
                                    required
                                    className="shadow appearance-none border-2 w-11/12 sm:w-8/12 py-2 px-3"
                                    placeholder="Descripción"
                                    id="descripcion"
                                    value={formik.values.descripcion}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                            </div>
                        </div>

                        <div className=" w-11/12 sm:hidden pt-8 flex justify-center">
                                <button
                                    className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                    type="submit"
                                >
                                Guardar</button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
     );
}
 
export default NuevaCita;