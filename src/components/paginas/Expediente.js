import React, {useState, useContext, useEffect} from 'react';
//import {FirebaseContext } from '../../firebase';
import ExpedientesMostrar from '../ui/ExpedientesMostrar';
import Barra from "../ui/Barra";
import Sidebar from "../ui/Sidebar";
import {useHistory} from "react-router-dom";
import {FirebaseContext} from '../../firebase/Auth';


export const Expediente = props => {

    const history = useHistory();
    //Definir el state para los expedientes 
    const [expedientes, guardarExpedientes] = useState([]);

    const {firebase} = useContext(FirebaseContext);

    //const navigate = useNavigate();
    const redireccionar = () => {
        history.push("/nuevo-expediente");
    }


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


    return ( 
        <div className="">
            <Sidebar/>
            
            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-screen">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center lg:text-2xl font-bold pl-12 pt-6">Expediente</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">
                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => redireccionar()}
                        >
                        Nuevo</button>
                    </div>
                </div>
                
                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20">

                        <div className="flex items-center justify-end">

                            <div className="hidden sm:flex sm:w-1/2 sm:justify-start sm:items-center">
                                <p className="font-source font-bold text-xl sm:pl-10 lg:pl-12 pt-3">Pacientes</p>
                            </div>

                            <div className="mr-6 sm:flex sm:w-1/2 sm:justify-end sm:items-center sm:pr-12 pt-6">
                                <input placeholder="Buscar..." className="w-full sm:w-40 lg:w-40 h-10 bg-colorFondo text-black"/>
                            </div>

                        </div>

                        <div className="text-colorBoton hidden sm:flex sm:justify-center lg:flex lg:justify-center">
                            <div className="w-1/12  border-black border-b-2 mb-4">
                                
                            </div>

                            <div className="w-2/12 sm:w-3/12 md:w-2/12 border-black border-b-2 mb-4">
                                <p>Nombre</p>
                            </div>

                            <div className="w-2/12 sm:w-6/12 md:w-2/12 border-black border-b-2 mb-4">
                                <p>Teléfono</p>
                            </div>

                            <div className="hidden md:w-5/12 md:flex md:border-black md:border-b-2 md:mb-4 lg:w-5/12 lg:flex  lg:border-black lg:border-b-2 lg:mb-4">
                                <p>Correo</p>
                            </div>

                            <div className="w-1/12  border-black border-b-2 mb-4">
                                
                            </div>
                        </div>

                        {expedientes.map(expediente => (
                                <ExpedientesMostrar
                                    key={expediente.id}
                                    expediente={expediente}
                                    props = {props}
                                /> 
                            ))}
                        
                    </div>
                </div>
            </div>
        </div>
     );
}
 