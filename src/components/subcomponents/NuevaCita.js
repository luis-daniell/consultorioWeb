import React, {useEffect, useState, useContext} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import {useFormik} from 'formik';
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';
import {FirebaseContext} from '../../firebase/Auth';




const NuevaCita = () => {



    const [expedientes, guardarExpedientes] = useState([]);

    //Datos del paciente de acuerdo a su correo
    const [datoExpediente, guardarDatoExpediente] = useState({});






    //Nombre del paciente
    const [nombrePaciente, guardarNombrePaciente] = useState('');

    //Apellidos del paciente
    const [apellidos, guardarApellidos] = useState('');

    //Correo del paciente
    const [correo, guardarCorreo] = useState('');

    //Object de Expediente 
    const [objectExpediente, guardarObjectExpediente] = useState({});





    const {firebase} = useContext(FirebaseContext);

    const history = useHistory();


    let idExpediente = ''; 

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

                //Se pasa el id del cliente
                //idExpediente = cita.paciente;

                //Consultar datos para obtener el nombre y cooreo 
                cita.atendida = false;
                
                obtenerDatoExpediente(cita.paciente, cita.fecha, cita.hora, cita.descripcion, cita.atendida);
               // console.log(objectExpediente);



                
                //firebase.db.collection('citas').add(cita);

               /* history.push({
                    pathname: "/visualizar-citas",
                    //state: { detail: perfil }
                });*/
                

            } catch (error) {
                console.log(error);
            }
        }

    });


    async function obtenerDatoExpediente (id, fecha, hora, descripcion, atendida) {
        console.log(id)

        const expRef = await firebase.db.collection('expedientes').doc(id);
        const getDoc = await expRef.get();
        
            if (!getDoc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', getDoc.data());
                console.log(getDoc.data().nombre);
                console.log(getDoc.data().apellidos);
                console.log(getDoc.data().correo);  
                const egt = await firebase.db.collection('citas').add({
                    nombre: getDoc.data().nombre,
                    apellido: getDoc.data().apellidos,
                    correo: getDoc.data().correo,
                    fecha: fecha,
                    hora: hora,
                    descripcion: descripcion,
                    atendida: atendida,

                });        
            }

        
            


        
        
        /*const data = await firebase.db.collection('expedientes').doc('RFJax3cInniAWz6dBr6z');
        //console.log(data);
        const dataExpediente = await data.get();
        //const dat = await dataExpediente.get();

        guardarDatoExpediente(dataExpediente.data());
        console.log(datoExpediente);

        if(dataExpediente.exists) {
           guardarDatoExpediente(dataExpediente);
           console.log(datoExpediente);
           //guardarConsultarDB(false);
           
        } else {
            console.log(datoExpediente);
            console.log("No existe");
            //guardarError( true );
            //guardarConsultarDB(false);
        }*/
    }

    

    return ( 
        <div className="">
        <Sidebar/>

        <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-screen">
            <Barra/>

            <div className=" flex">

                <div className=" w-1/2 flex justify-start items-center">
                    <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Nueva Cita</p>
                </div>
                
                <div className="w-1/2 flex justify-end items-center pr-12 pt-6">

                   
                    <button
                        className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                        onClick={formik.handleSubmit}
                        type="submit"
                        //onClick={() => abrirNuevaCita()}
                    >
                    Guardar</button>
                    
                    
                </div>
            </div>


            <div className="flex justify-center">





                    <form 
                    className="bg-white mt-10 w-11/12 pb-20"
                   // onSubmit={handleSubmit}
                    >





                        <div className="">
                            <p className="font-source font-bold text-xl pl-12 pt-3">Ingresa los datos para la cita</p>
                        </div>


                        <div className=" flex mt-6">

                            <label className="w-3/12 font-source text-tercerColor pl-12">Nombre de paciente: </label>

                            <select
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                id="paciente"
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



                        <div className=" flex mt-6">

                            <label className="w-3/12 font-source text-tercerColor pl-12">Fecha</label>
                            <input
                                type="date"
                                name="fecha"
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                value={formik.values.fecha}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                
                            
                            />

                        </div>


                        <div className=" flex mt-6">

                            <label className="w-3/12 font-source text-tercerColor pl-12">Hora</label>
                            <input
                                type="time"
                                name="hora"
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                value={formik.values.hora}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                
                            />
                        </div>












                        <div className=" flex mt-6">
                            <label htmlFor="descripcion" className="w-3/12 font-source text-tercerColor pl-12">Descripción: </label>
                            <textarea
                                className="shadow appearance-none border-2 w-8/12 py-2 px-3"
                                placeholder="Descripción"
                                id="descripcion"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                

                            ></textarea>
                        </div>






                    </form>
                </div>

        </div>
    </div>
     );
}
 
export default NuevaCita;