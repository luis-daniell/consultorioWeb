import React, {useState, useContext, useEffect} from 'react';
//import {FirebaseContext } from '../../firebase';
import HistorialMostrar from '../ui/HistorialMostrar';
import Barra from "../ui/Barra";
import Sidebar from "../ui/Sidebar";
import {useHistory} from "react-router-dom";
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
            
            <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-screen">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Historial</p>
                    </div>
                    
                </div>
                
                

               
                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20">

                        <div className="flex">
                            <div className=" flex w-1/2 justify-start items-center">
                                <p className="font-source font-bold text-xl pl-12 pt-3">Pacientes</p>
                            </div>

                            <div className=" flex w-1/2 justify-end items-center pr-12 pt-6">
                                <input placeholder="Buscar..." className="w-40 h-10 bg-colorFondo text-black"/>
                            </div>


                        </div>

                        <div className="text-colorBoton flex justify-center">
                            
                            <div className="w-1/12  border-black border-b-2 mb-4">
                                
                            </div>

                            <div className="w-1/12  border-black border-b-2 mb-4">
                                <p>Nombre</p>
                            </div>

                            <div className="w-2/12  border-black border-b-2 mb-4">
                                <p>Teléfono</p>
                            </div>

                            <div className="w-3/12  border-black border-b-2 mb-4">
                                <p>Correo</p>
                            </div>

                            <div className="w-4/12  border-black border-b-2 mb-4">
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
 