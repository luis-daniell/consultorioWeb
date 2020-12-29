import React from 'react';
import {useLocation, useHistory} from "react-router-dom";
import Sidebar from '../ui/Sidebar';
import Barra from '../ui/Barra';
import usuarioPerfil from '../../img/usuarioPerfil.svg';


const VisualizarExpediente = () => {

    const location = useLocation();
    const history = useHistory();

    const {nombre, apellidos, antecedentes, correo, diagnostico, domicilio, estilos, id, peso, presion, sexo, talla, telefono} = location.state.detail;

    const expediente = {
        nombre2: nombre, 
        apellidos2: apellidos,
        antecedentes2: antecedentes,
        correo2: correo,
        diagnostico2: diagnostico, 
        domicilio2: domicilio,
        estilos2: estilos,
        id2: id,
        peso2: peso,
        presion2: presion,
        sexo2: sexo, 
        talla2: talla,
        telefono2: telefono
    }

    const abrirPagina = () => {
     
        
        history.push({

            pathname: "/modificar-expediente",
            state: { detail: expediente }

        });
     }

    return ( 
        <div className="">
            <Sidebar/>

            <div className="bg-colorFondo lg:w-4/5 lg:box-border lg:left-auto lg:float-right lg:h-auto">
                <Barra/>
                <div className=" flex justify-center">

                    <div className="w-11/12 sm:w-1/2 flex justify-start items-center">
                        <p className="font-source content-center text-2xl font-bold sm:pl-12 pt-6">Expediente</p>
                    </div>
                    
                    <div className="hidden sm:flex sm:w-1/2 sm:justify-end sm:items-center sm:pr-12 sm:pt-6">
                        <button
                            className=" bg-tercerColor focus:outline-none hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => abrirPagina()}
                        >
                        Modificar</button>
                    </div>
                </div>

                <div className="flex justify-center items-center flex-col sm:flex-row">
                    <div className="bg-white w-11/12 mt-10 pb-20 flex justify-center h-full mb-10">

                        <div className="w-10/12">

                            <div className="bg-tercerColor border-1 border-black h-24 sm:h-32 flex justify-center pt-6 rounded-t-extra text-white font-source font-bold text-xl sm:text-2xl mt-6">
                                <p>{nombre +" " + apellidos}</p>
                            </div>

                            <div className="bg-colorFondo flex content-center justify-center ">
                                <img src={usuarioPerfil} className=" -mt-10 sm:-mt-12 w-20 sm:w-28" alt="Usuario Perfil"/>                             
                            </div>


                            <div className="bg-colorFondo pb-12 rounded-b-extra">
                                    
                                <div className=" flex flex-col justify-center items-center sm:flex-row h-auto content-center sm:justify-around">
                                    
                                    <div className="w-11/12 sm:w-3/12 flex items-center flex-col pt-4 ">
                                        <p className="text-tercerColor text-lg">Domicilio</p>
                                        <p className="break-words pt-2 font-bold ">{domicilio}</p>
                                    </div>

                                    <div className="w-11/12 sm:w-3/12 flex items-center flex-col pt-4">
                                        <p className="text-tercerColor text-lg">Teléfono</p>
                                       <p className="pt-2 font-bold ">{telefono}</p>
                                    </div>

                                    <div className="w-11/12 sm:w-3/12 flex items-center flex-col pt-4">
                                        <p className="text-tercerColor text-lg">Sexo</p>
                                        <p className="pt-2 font-bold ">{sexo}</p>
                                    </div>
                                
                                </div>   
                                
                                <div className="bg-colorFondo flex flex-col items-center sm:flex-row h-auto justify-around mt-4">       
                                    
                                    <div className="w-11/12 sm:w-3/12 flex items-center flex-col pt-4">
                                        <p className="text-tercerColor text-lg">Diagnóstico</p>
                                        <p className="pt-2 font-bold break-words ">{diagnostico}</p>
                                    </div>

                                    <div className="w-11/12 sm:w-3/12 flex items-center flex-col pt-4">
                                        <p className="text-tercerColor text-lg">Antecedentes Familiares</p>
                                        <p className="break-words pt-2 font-bold">{antecedentes}</p>
                                    </div>

                                    <div className="w-11/12 sm:w-3/12 flex items-center flex-col pt-4">
                                        <p className="text-tercerColor text-lg">Estilos de Vida</p>
                                        <p className="break-words pt-2 font-bold">{estilos}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center sm:flex-row content-center justify-around mt-4">

                                    <div className="w-11/12 sm:w-3/12 flex items-center flex-col pt-4">
                                        <p className="text-tercerColor text-lg">Correo Electrónico</p>
                                        <p className="break-words pt-2 font-bold">{correo}</p>
                                    </div>

                                    {presion === "" ? null : 
                                        <div className="w-11/12 sm:w-3/12 flex items-center flex-col pt-4">
                                            <p className="text-tercerColor text-lg">Presión</p>
                                            <p className="break-words pt-2 font-bold">{presion}</p>
                                        </div>
                                    }
                                    
                                   {peso === "" ? null : 
                                   <div className="w-11/12 sm:w-3/12 flex items-center flex-col pt-4">
                                        <p className="text-tercerColor text-lg">Peso</p>
                                        <p className="break-words pt-2 font-bold">{peso}</p>
                                    </div>}

                                </div> 

                                <div className="flex sm:flex-row flex-col items-center content-center justify-around mt-4">

                                    {talla === "" ? null : 
                                        <div className="w-11/12 sm:w-3/12 flex items-center flex-col pt-4">
                                            <p className="text-tercerColor text-lg">Talla</p>
                                            <p className="break-words pt-2 font-bold">{talla}</p>
                                        </div>
                                    }

                                    <div className="w-11/12 sm:w-3/12">
                                    </div>

                                    <div className="w-11/12 sm:w-3/12">
                                    </div>

                                </div>

                            </div>
                        </div>


                        
                    </div>

                    <div className="flex sm:hidden mb-10">
                        <button
                            className=" bg-tercerColor focus:outline-none hover:bg-blue-dark text-white px-4 rounded-full cursor-pointer font-source w-40 h-8"
                            onClick={() => abrirPagina()}
                        >
                        Modificar</button>
                    </div>


                </div>
            </div>
        </div>
    );
}
 
export default VisualizarExpediente;