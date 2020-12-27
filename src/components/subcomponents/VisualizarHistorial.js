import React, {useState, useContext, useEffect} from 'react';
import {FirebaseContext} from '../../firebase/Auth';
import MostrarDato from '../ui/MostrarDato';
import {useLocation} from "react-router-dom";
import usuarioPerfil from '../../img/usuarioPerfil.svg';
import Sidebar from '../ui/Sidebar';
import MedicamentosRecetados from '../ui/MedicamentosRecetados';
import Barra from '../ui/Barra';
import ProximaCita from '../ui/ProximaCita';

const VisualizarHistorial = ({props}) => {

    const location = useLocation();
    const {firebase} = useContext(FirebaseContext);
    const {id} = location.state.detail;

    //Expedientes
    const [expediente, guardarExpediente] = useState([]);
    //Recetas
    const [receta, guardarReceta] = useState([]);
    //Citas
    const [cita, guardarCita] = useState([]);
    //Citas No atendidas
    const [citaNOATENDIDA, guardarCITANOATENDIDA] = useState([]);

    useEffect(() => {

        const obtenerExpedientes = async () => {
            const expedienteQ = await firebase.db.collection('expedientes').doc(id);
            const expediente = await expedienteQ.get();
            guardarExpediente(expediente.data());
        }

        const obtenerRecetas = async () => {
            await firebase.db.collection('recetas').where('pacienteId','==', id).onSnapshot(manejarSnapshot2);

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
            await firebase.db.collection('citas').where('idPaciente','==', id).onSnapshot(manejarSnapshot3);  
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

        const obtenerCitasNoAtendidas = async () => {
            await firebase.db.collection('citas').where('idPaciente','==', id).where('atendida','==', false).onSnapshot(manejarSnapshot4);  
        }

        function manejarSnapshot4(snapshot) {
            const cita = snapshot.docs.map(doc => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });
    
            //Almacenar los resultados en el state
            guardarCITANOATENDIDA(cita);
        }
        obtenerCitasNoAtendidas();
        obtenerExpedientes();
        obtenerRecetas();
        obtenerCitas();

    },[firebase, id]);

    return ( 

        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-auto">
                <Barra/>

                <div className=" flex w-11/12 justify-center items-center content-center">
                    <div className="w-11/12 flex ">
                        <p className="font-source content-center text-xl sm:text-2xl font-bold pt-6">Historial</p>
                    </div>
                </div>

                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center h-full mb-12">

                        <div className="w-10/12">
                            <div className="bg-tercerColor border-1 border-black h-24 sm:h-32 flex justify-center pt-6 rounded-t-extra text-white font-source font-bold text-xl sm:text-2xl mt-6">
                                <p>{expediente.nombre}</p>
                            </div>

                            <div className="bg-colorFondo flex content-center justify-center ">
                                <img src={usuarioPerfil} className="-mt-10 sm:-mt-12 w-20 sm:w-28" alt="Usuario Perfil"/>
                            </div>

                            <div className="bg-colorFondo w-full pt-4 flex justify-center justify-items-center items-center">
                                <div className="border-2 border-black w-3/12 flex justify-center">
                                    Fecha
                                </div>

                                <div className="border-2 border-black w-3/12 flex justify-center">
                                    Hora
                                </div>

                                <div className="border-2 border-black w-3/12 flex justify-center">
                                    Atendida
                                </div>
                            </div>

                            <div className="bg-colorFondo flex flex-col justify-center justify-items-center items-center">
                                {cita.map(cita => (
                                    <MostrarDato
                                        key={cita.id}
                                        cita={cita}
                                        props = {props}
                                    /> 
                                ))}
                            </div>

                            <div className="bg-colorFondo pt-4 flex justify-center justify-items-center items-center">
                               <p>Medicamentos Recetados:</p>
                            </div>

                            <div className="bg-colorFondo pt-5 ">
                                {receta.map(receta => (
                                    <MedicamentosRecetados
                                        key={receta.id}
                                        receta={receta}
                                        props = {props}
                                    /> 
                                ))}
                            </div>

                            <div className="bg-colorFondo pt-4 flex justify-center justify-items-center items-center">
                               <p>Proximas Citas:</p>
                            </div>

                            <div className="bg-colorFondo pt-5 pb-12 rounded-b-extra ">
                                {citaNOATENDIDA.map(cita => (
                                    <ProximaCita
                                        key={cita.id}
                                        cita={cita}
                                        props = {props}
                                    /> 
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default VisualizarHistorial;