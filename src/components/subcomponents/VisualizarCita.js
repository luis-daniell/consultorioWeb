import React, {useEffect, useState, useContext} from 'react';
import {useLocation, useHistory} from "react-router-dom";
import CitasMostrar from '../ui/CitasMostrar';
import {FirebaseContext} from '../../firebase/Auth';
import Sidebar from "../ui/Sidebar";
import Barra from "../ui/Barra";

const VisualizarCita = (props) => {



    const history = useHistory();

    const abrirNuevaCita = () => {     
        history.push({
            pathname: "/nueva-cita",
            //state: { detail: perfil }
        });
     }


     const [citas, guardarCitas] = useState([]);
     const {firebase} = useContext(FirebaseContext);


     useEffect(() => {
        const obtenerCitas =  () => {
            firebase.db.collection('citas').where('atendida', '==', false).onSnapshot(manejarSnapshot);//Snapshot para ver los cambios en tiempo real y get para ver solamnente los cambios
            
        }
        obtenerCitas();

    },[firebase]);



    //Snapshop nos permite usar la base de datos en tiempo real de firestore
    function manejarSnapshot(snapshot) {
        const cita = snapshot.docs.map(doc => {
            return{
                id: doc.id,
                ...doc.data()
            }
        });

        //Almacenar los resultados en el state
        guardarCitas(cita);
    }






    return ( 
        <div className="">
        <Sidebar/>

        <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-auto">
            <Barra/>

            <div className=" flex">

                <div className=" w-1/2 flex justify-start items-center">
                    <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Citas</p>
                </div>
                
                <div className="w-1/2 flex justify-end items-center pr-12 pt-6">

                   
                    <button
                        className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                        onClick={() => abrirNuevaCita()}
                    >
                    Nuevo</button>
                    
                    
                </div>
            </div>


            <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20">

                        <div className="flex">
                            <div className=" flex w-1/2 justify-start items-center">
                                <p className="font-source font-bold text-xl pl-12 pt-3">Citas</p>
                            </div>

                            <div className=" flex w-1/2 justify-end items-center pr-12 pt-6">
                                <input placeholder="Buscar..." className="w-40 h-10 bg-colorFondo text-black"/>
                            </div>


                        </div>

                        <div className="text-colorBoton flex justify-center">
                            <div className="w-1/12  border-black border-b-2 mb-4">
                                
                            </div>

                            <div className="w-2/12  border-black border-b-2 mb-4">
                                <p>Paciente</p>
                            </div>

                            <div className="w-2/12  border-black border-b-2 mb-4">
                                <p>Fecha</p>
                            </div>

                            <div className="w-5/12  border-black border-b-2 mb-4">
                                <p>Hora</p>
                            </div>

                            <div className="w-1/12  border-black border-b-2 mb-4">
                                
                            </div>
                        </div>
                        

                        {citas.map(cita => (
                                <CitasMostrar
                                    key={cita.id}
                                    cita={cita}
                                    props = {props}
                                /> 
                            ))}
                        
                        
                    </div>
                </div>

        </div>
    </div>


     );
}
 
export default VisualizarCita;