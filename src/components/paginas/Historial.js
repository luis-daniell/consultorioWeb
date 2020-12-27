import React, {useState, useContext, useEffect} from 'react';
import HistorialMostrar from '../ui/HistorialMostrar';
import Barra from "../ui/Barra";
import Sidebar from "../ui/Sidebar";
import {FirebaseContext} from '../../firebase/Auth';


export const Historial = props => {

    //Definir el state para los expedientes 
    const [expedientes, guardarExpedientes] = useState([]);

    const {firebase} = useContext(FirebaseContext);

    

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

                <div className=" flex justify-center">

                    <div className=" w-11/12 flex justify-start items-center">
                        <p className="font-source content-center text-xl sm:text-2xl font-bold  pt-6">Historial</p>
                    </div>
                    
                </div>

                <div className="flex justify-center sm:hidden mt-4">
                    <input placeholder="Buscar..." className="flex w-11/12 justify-center  border-white border-4 lg:w-40 h-10 bg-colorFondo text-black"/>
                </div>
                
               
                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20 pt-6 sm:pt-0">

                        <div className="flex">
                            <div className=" hidden sm:flex sm:w-1/2 sm:justify-start sm:items-center lg:flex lg:w-1/2 lg:justify-start lg:items-center">
                                <p className="font-source font-bold text-xl pl-12 pt-3">Pacientes</p>
                            </div>

                            <div className=" hidden sm:flex sm:w-1/2 justify-end items-center lg:pr-12 pr-4 pt-6">
                                <input placeholder="Buscar..." className="w-40 h-10 bg-colorFondo text-black"/>
                            </div>


                        </div>

                        <div className="text-colorBoton hidden sm:flex justify-center">
                            
                            <div className="w-1/12  border-black border-b-2 mb-4">
                                
                            </div>

                            <div className="w-3/12 sm:w-2/12 lg:w-1/12  border-black border-b-2 mb-4">
                                <p>Nombre</p>
                            </div>

                            <div className="hidden sm:flex sm:pl-4 sm:w-3/12 lg:w-2/12 border-black border-b-2 mb-4">
                                <p>Teléfono</p>
                            </div>

                            <div className="hidden lg:flex lg:w-3/12  lg:border-black lg:border-b-2 lg:mb-4">
                                <p>Correo</p>
                            </div>

                            <div className="pl-4 w-7/12 sm:w-5/12 lg:w-4/12  border-black border-b-2 mb-4">
                                <p>Diagnostico</p>
                            </div>
                        </div>
                        
                        {expedientes.map(expediente => (
                                <HistorialMostrar
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
 