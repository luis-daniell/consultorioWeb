import React, {useState, useContext, useEffect} from 'react';
import {FirebaseContext} from '../../firebase/Auth';
import {useLocation, useHistory} from "react-router-dom";
import usuarioPerfil from '../../img/usuarioPerfil.svg';
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';

const VisualizarHistorial = () => {

    const location = useLocation();
    const history = useHistory();

    const {firebase} = useContext(FirebaseContext);
    const {id} = location.state.detail;


    //Expedientes
    const [expediente, guardarExpediente] = useState([]);
    //Recetas
    const [receta, guardarReceta] = useState([]);
    //Citas
    const [cita, guardarCita] = useState([]);



    useEffect(() => {

        const obtenerExpedientes = async () => {
            const expedienteQ = await firebase.db.collection('expedientes').doc(id);
            const expediente = await expedienteQ.get();
            guardarExpediente(expediente.data());
        }

        const obtenerRecetas = async () => {
            const recetaQ = await firebase.db.collection('recetas').where('pacienteId','==', id).onSnapshot(manejarSnapshot2);

        }

        function manejarSnapshot2(snapshot) {
            const receta = snapshot.docs.map(doc => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });
            //Almacenar los resultados en el state
            guardarReceta(receta);
        }



        const obtenerCitas = async () => {
            const citaQ = await firebase.db.collection('citas').where('id','==', id).onSnapshot(manejarSnapshot3);  
        }

        function manejarSnapshot3(snapshot) {
            const cita = snapshot.docs.map(doc => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });
    
            //Almacenar los resultados en el state
            guardarCita(cita);
        }

        obtenerExpedientes();
        obtenerRecetas();
        obtenerCitas();

    },[firebase]);


    console.log("Datos Expediente: ",expediente);
    console.log("Datos Recetas: ",receta);
    console.log("Datos Citas: ",cita);


    return ( 

        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo w-4/5 box-border left-auto float-right h-auto">
                <Barra/>

                <div className=" flex">

                    <div className=" w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold pl-12 pt-6">Historial</p>
                    </div>
                
                </div>


                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center h-full mb-12">


                        <div className="w-10/12">

                            <div className="bg-tercerColor border-1 border-black h-32 flex justify-center pt-6 rounded-t-extra text-white font-source font-bold text-3xl mt-6">
                                <p>{expediente.nombre}</p>
                            </div>


                            <div className="bg-colorFondo flex content-center justify-center ">
 
                                <img src={usuarioPerfil} className="-mt-12" width="120" height="120"/>
                                
                            </div>


                        
                            <div className="bg-colorFondo pb-12 rounded-b-extra">
                                <p>Hello</p>
                            </div>





                           
                        </div>

                        
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default VisualizarHistorial;