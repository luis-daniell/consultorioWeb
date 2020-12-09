import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from '../../firebase/Auth';
import {useHistory} from "react-router-dom";
import {useFormik} from 'formik';
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';


const NuevaReceta = () => {



    const history = useHistory();




    const [expedientes, guardarExpedientes] = useState([]);

    //Para la nueva cita
    const [cita, guardarCita] = useState(true);

    //Si cita esta en false entonces generamos una nueva cita




    //Guardar el id cuando este se seleccione:
    const [dato, guardarDato] = useState('');


    //Expediente de acuerdo a su id
    const [expediente, guardarExpediente] = useState([]);

    //console.log(expediente);

    //State de diagnostico de acuerdo a su id
    const [diagnostico, guardarDiagnostico] = useState('-- Seleccione el paciente --');

    //State para guardar descripcion de la cita
    const [descripcion, guardarDescripcion] = useState('');

  



    const {firebase} = useContext(FirebaseContext);
        

        useEffect(() => {
            const obtenerExpedientes =  () => {
                
                firebase.db.collection('expedientes').onSnapshot(manejarSnapshot);//Snapshot para ver los cambios en tiempo real y get para ver solamnente los cambios
           
            }

            const obtenerExpedienteID = async () => {

                const expedienteQ = await firebase.db.collection('expedientes').doc(dato);
                const expediente = await expedienteQ.get();
                guardarExpediente(expediente.data());
                guardarDiagnostico(expediente.data().diagnostico);

            }


            const obtenerCitas = async () => {

                await firebase.db.collection('citas').where('idPaciente', '==', dato ).onSnapshot(manejarSnapshot2);
                //const cita = await citasQ.get();
                //guardarDescripcion(cita);
                //console.log(cita);

            }


            function manejarSnapshot2(snapshot) {
                const cita = snapshot.docs.map(doc => {
                    return{
                        id: doc.id,
                        ...doc.data()
                    }
                });
        
                //Almacenar los resultados en el state
                guardarDescripcion(cita[0].descripcion);
                
            }


            
            if(dato !== ''){
                //console.log(dato);
                obtenerExpedienteID();
                
            }else{
                console.log('No se ha seleccionado el id aun');
            }

            if(cita === false ){
                obtenerCitas();
                

            }


            obtenerExpedientes();
        },[firebase, dato, cita]);



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


console.log(descripcion);


    const formik = useFormik({
        initialValues : {
            observacion: '',
            medicamentos: '',
            fecha: '',
            hora: '',
        },

        onSubmit: receta => {


            if(cita === false){
                ///Se va a crear una nueva cita
                receta.idPaciente = dato;
                receta.nombrePaciente = expediente.nombre;
                receta.apellidosPaciente = expediente.apellidos;
                receta.telefonoPaciente = expediente.telefono;
                receta.diagnosticoPaciente = expediente.diagnostico;
                receta.descripcionCita = descripcion;
                receta.correoPaciente = expediente.correo;
                receta.nuevaCita= cita;
                



                history.push({
                    pathname: "/previsualizacion",
                    state: { detail: receta }
                });



            }else{
                receta.idPaciente = dato;
                receta.nombrePaciente = expediente.nombre;
                receta.apellidosPaciente = expediente.apellidos;
                receta.telefonoPaciente = expediente.telefono;
                receta.diagnosticoPaciente = expediente.diagnostico;
                receta.nuevaCita = cita;



                history.push({
                    pathname: "/previsualizacion",
                    state: { detail: receta }
                });

            }


            
            /*try {
                firebase.db.collection('expedientes').add(expediente);
                
                

            } catch (error) {
                console.log(error);
            }*/
        }

    });


    return ( 


        <div className="">
        <Sidebar/>

        <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-screen">
            <Barra/>



            <div className="flex justify-center">

                    <form 
                    className="w-11/12 pb-20"
                   onSubmit={formik.handleSubmit}
                    >



            <div className=" flex">

                <div className=" w-1/2 flex justify-start items-center">
                    <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Datos de la consulta</p>
                </div>
                
                <div className="w-1/2 flex justify-end items-center pr-12 pt-6">

                   
                    <button
                        className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                        
                        type="submit"
                        //onClick={() => abrirNuevaCita()}
                    >
                    Guardar</button>
                    
                    
                </div>
            </div>



            <div className="bg-white mt-8 pb-8">
            

                        <div className="">
                            <p className="font-source font-bold text-xl pl-12 pt-3">Ingresa los datos para la receta</p>
                        </div>

                        <div className=" flex mt-6">

                            <label className="w-3/12 font-source text-tercerColor pl-12">Nombre de paciente: </label>

                            <select
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                id="paciente"
                                //value={formik.values.paciente}
                                //onChange={formik.handleChange}
                                //onBlur={formik.handleBlur}
                                onChange={e => guardarDato(e.target.value)}
                                required
                                //value={dato}
                            >

                                <option value="">- Seleccione -</option>
                                {expedientes.map(expediente => (
                                    <option key={expediente.id} value={expediente.id}>{expediente.nombre +" "}{expediente.apellidos}</option>
                                ))}
                                


                            </select>

                        </div>


                        
                        <div className=" flex mt-6">

                            <label className="w-3/12 font-source text-tercerColor pl-12">Motivo de consulta: </label>

                            <select
                                required
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                id="paciente"
                                //value={formik.values.paciente}
                                //onChange={formik.handleChange}
                                //onBlur={formik.handleBlur}
                            >

                                <option value={diagnostico}>{diagnostico}</option>
                                


                            </select>

                        </div>



                        <div className=" flex mt-6">
                            <label htmlFor="descripcion" className="w-3/12 font-source text-tercerColor pl-12">Observaciones: </label>
                            <textarea
                                required
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                placeholder="Observaciones"
                                id="observacion"
                                value={formik.values.observacion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                

                            ></textarea>
                        </div>


                        <div className=" flex mt-6">
                            <label htmlFor="descripcion" className="w-3/12 font-source text-tercerColor pl-12">Medicamentos recetados: </label>
                            <textarea
                                required
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                placeholder="Medicamentos"
                                id="medicamentos"
                                value={formik.values.medicamentos}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                

                            ></textarea>
                        </div>






                        
                           { cita 
                           ? (  <div className="flex justify-around pr-12 pt-6">
                                    <button
                                        className="bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                                        onClick={() => guardarCita(false)}

                                    >Próxima cita</button>
                                </div>)
                            :


                            <div className=" flex mt-6">

                                <label className="w-3/12 font-source text-tercerColor pl-12">Fecha</label>
                                <input
                                    required
                                    type="date"
                                    name="fecha"
                                    className="w-3/12 shadow appearance-none border-2 py-2 px-3"
                                    value={formik.values.fecha}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                                <label className="w-2/12 font-source text-tercerColor pl-12">Hora</label>
                                <input
                                    required
                                    type="time"
                                    name="hora"
                                    className="shadow appearance-none border-2 w-3/12 py-2 px-3"
                                    value={formik.values.hora}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    
                                />

                            </div>

                            }

                        </div>


                    </form>
                </div>

        </div>
    </div>
     );
}
 
export default NuevaReceta;