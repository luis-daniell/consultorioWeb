import React, {useEffect, useState, useContext} from 'react';
import { useHistory} from "react-router-dom";
import CitasMostrar from '../ui/CitasMostrar';
import {FirebaseContext} from '../../firebase/Auth';
import lupa from '../../img/lupa.svg';
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




    const [ busqueda, guardarBusqueda] = useState('');

    const buscarCita = e => {
        e.preventDefault();

        if(busqueda.trim() === '') return;

        // redireccionar a /buscar
        history.push({
            pathname: "/buscarCita", 
            search:`?q=${busqueda}`,
            state: { detail: citas }
        })
    }

    return ( 
        <div className="">
        <Sidebar/>

        <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-auto">
            <Barra/>

            <div className=" flex justify-center">

                <div className=" w-6/12 flex justify-start items-center">
                    <p className="font-source content-center text-2xl font-bold pt-6">Citas</p>
                </div>
                
                <div className="w-5/12 flex justify-end items-center sm:pr-12 pt-6">

                   
                    <button
                        className=" bg-tercerColor focus:outline-none hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                        onClick={() => abrirNuevaCita()}
                    >
                    Nuevo</button>
                    
                    
                </div>
            </div>

            <form
                    onSubmit={buscarCita}
                    className="flex justify-center sm:hidden mt-4"
                >
                    <div className="bg-colorFondo flex items-center w-11/12 border-black border">
                        <i className="pl-2"><img src={lupa} width="15" alt="lupa"/></i>
                        <input
                            required
                            type="search" 
                            placeholder="Buscar..." 
                            className="bg-colorFondo w-11/12 flex justify-center pl-2 lg:w-40 h-10 text-black focus:outline-none"
                            onChange={e =>  guardarBusqueda(e.target.value) }
                        />

                    </div>    
            </form>



            <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20 pt-6">

                        <div className="hidden sm:flex">
                            <div className=" flex w-1/2 justify-start items-center">
                                <p className="font-source font-bold text-xl pl-12 pt-3">Citas</p>
                            </div>

                            <form
                                onSubmit={buscarCita}
                                className="hidden sm:flex mr-6 sm:w-1/2 sm:pr-4 sm:justify-end pt-6"
                            >
                                <div className="bg-colorFondo flex items-center">
                                    <i className="pl-2"><img src={lupa} width="15" alt="lupa"/></i>
                                    <input
                                        required
                                        type="search" 
                                        placeholder="Buscar..." 
                                        className="w-full lg:w-40 h-10 pl-2 bg-colorFondo focus:outline-none"
                                        onChange={e =>  guardarBusqueda(e.target.value) }
                                    />
                                </div>
                            </form>


                        </div>

                        <div className="text-colorBoton hidden sm:flex sm:justify-center lg:flex lg:justify-center">
                            <div className="w-1/12  border-black border-b-2 mb-4">
                                
                            </div>

                            <div className="w-3/12 sm:w-2/12  border-black border-b-2 mb-4">
                                <p>Paciente</p>
                            </div>

                            <div className="w-4/12 sm:w-2/12  border-black border-b-2 mb-4">
                                <p>Fecha</p>
                            </div>

                            <div className="w-3/12 sm:w-6/12  border-black border-b-2 mb-4">
                                <p>Hora</p>
                            </div>

                            <div className="hidden sm:w-1/12  border-black border-b-2 mb-4">
                                
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