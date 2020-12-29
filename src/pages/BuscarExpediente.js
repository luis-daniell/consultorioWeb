import React,{useState, useEffect} from 'react';
import ExpedientesMostrar from '../components/ui/ExpedientesMostrar';
import Barra from '../components/ui/Barra';
import Sidebar from "../components/ui/Sidebar";
import {useHistory, useLocation} from "react-router-dom";

const BuscarExpediente = (props) => {

    const location = useLocation();
    const [expedientes, guardarExpedientes]= useState([]);
    const history = useHistory();
    

    useEffect(() => {
        //console.log(location.pathname); // result: '/secondpage'
        let busqued = location.search; // result: '?query=abc'
        let palabra = busqued.substr(3)

        const busqueda = palabra.toLowerCase();//palabra de busqueda.
    
        const filtro = location.state.detail.filter(expedientes => {
            return (
            expedientes.nombre.toLowerCase().includes(busqueda) || 
            expedientes.apellidos.toLowerCase().includes(busqueda)
            )
        });
        guardarExpedientes(filtro);
      

    }, [ location ]);

    const redireccionar = () => {
        history.push("/expediente");
    }


    return ( 
        <div className="">
            <Sidebar/>
            
            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-screen">
                <Barra/>

                <div className=" flex justify-center">

                    <div className="w-6/12 flex justify-start items-center">
                        <p className="font-source content-center text-xl lg:text-2xl font-bold pt-6">Expediente</p>
                    </div>
                    
                    <div className="w-5/12 flex justify-end items-center pr-12 pt-6">
                        <button
                            className=" bg-tercerColor hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => redireccionar()}
                        >
                        Volver</button>
                    </div>
                </div>

               
                
                <div className="flex justify-center ">
                    <div className="bg-white w-11/12 mt-10 pb-20 pt-6 sm:pt-0">

                        <div className="flex items-center justify-end">


                        </div>

                        <div className="text-colorBoton hidden sm:flex sm:justify-center lg:flex lg:justify-center pt-14">
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
 
export default BuscarExpediente;