import React, {useState, useContext, useEffect} from 'react';
import HistorialMostrar from '../ui/HistorialMostrar';
import lupa from '../../img/lupa.svg'
import Barra from "../ui/Barra";
import Sidebar from "../ui/Sidebar";
import {useHistory} from "react-router-dom";
import {FirebaseContext} from '../../firebase/Auth';


export const Historial = props => {

    const history = useHistory();

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

    const [ busqueda, guardarBusqueda] = useState('');

    const buscarHistorial = e => {
        e.preventDefault();

        if(busqueda.trim() === '') return;

        // redireccionar a /buscar
        history.push({
            pathname: "/buscarHistorial", 
            search:`?q=${busqueda}`,
            state: { detail: expedientes }
        })
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

                <form
                    onSubmit={buscarHistorial}
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
                    <div className="bg-white w-11/12 mt-10 pb-20 pt-6 sm:pt-0">

                        <div className="flex">
                            <div className=" hidden sm:flex sm:w-1/2 sm:justify-start sm:items-center lg:flex lg:w-1/2 lg:justify-start lg:items-center">
                                <p className="font-source font-bold text-xl pl-12 pt-3">Pacientes</p>
                            </div>

                            <form
                                onSubmit={buscarHistorial}
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
 