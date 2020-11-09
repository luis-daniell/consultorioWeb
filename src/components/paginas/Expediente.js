import React, {useState, useContext, useEffect, useCallback} from 'react';
import {FirebaseContext } from '../../firebase';
import ExpedientesMostrar from '../ui/ExpedientesMostrar';
import Barra from "../ui/Barra";
import Sidebar from "../ui/Sidebar";


export const Expediente = props => {

    //Definir el state para los expedientes 
    const [expedientes, guardarExpedientes] = useState([]);

    const {firebase} = useContext(FirebaseContext);


    const [visibilidad, setVisibilidad] = useState(false)

    //const navigate = useNavigate();
    const redireccionar = () => {
        props.history.push("/nuevo-expediente");
    }


    //Consultar la base de datos al cargar 
    useEffect(() => {
        const obtenerExpedientes =  () => {
            firebase.db.collection('expedientes').onSnapshot(manejarSnapshot);//Snapshot para ver los cambios en tiempo real y get para ver solamnente los cambios
            
        }
        obtenerExpedientes();

    },[]);



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
            
            <div className="bg-colorFondo w-4/5 box-border left-auto float-right">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Expediente</p>
                    </div>
                    
                    <div className="w-1/2 flex justify-end items-center pr-12 pt-6">
                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => redireccionar()}
                        >
                        Nuevo</button>
                    </div>
                </div>
                
                

                <div className="bg-red-800">
                    {expedientes.map(expediente => (
                        <ExpedientesMostrar
                            key={expediente.id}
                            expediente={expediente}
                        /> 
                    ))}
                </div>

            </div>
            

        </div>
        
        
     );
}
 